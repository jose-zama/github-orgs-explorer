import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {GitService} from "./git.service";
import {map, mergeMap, reduce, mergeAll} from "rxjs/internal/operators";
import {Observable, merge, forkJoin} from "rxjs";
import {UrlTree, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GithubService implements GitService {

  githubURL: string = 'https://api.github.com';

  headers = new HttpHeaders({
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': 'Basic am9zZS16YW1hOnphbWFAR2l0aHViNw=='
  });

  constructor(private http: HttpClient, private router: Router) {
  }

  getRepositories(organisationName: string) {

    let firstPageUrl = this.githubURL +
      '/orgs/' + organisationName +
      '/repos?page=1&per_page=100';

    return this.getRepositoriesByUrl(firstPageUrl)
      .pipe(mergeMap(resp => {
        if (resp.headers.get('Link') === null)
          return this.getRepositoriesPerPage(organisationName, 1);

        let last = resp.headers.get('Link').split(',').filter(x => x.endsWith('rel="last"'))[0];
        let lastPageUrl = last.substring(last.indexOf('<') + 1, last.indexOf('>'));
        console.log(lastPageUrl);
        let lastPageUrlTree: UrlTree = this.router.parseUrl(lastPageUrl.replace(this.githubURL, ''));
        let lastPage: number = Number.parseInt(lastPageUrlTree.queryParamMap.get('page'));

        let parallelRequests = [];

        for (let i = 1; i <= lastPage; i++) {
          parallelRequests.push(this.getRepositoriesPerPage(organisationName, i))
        }
        // return this.getRepositoriesByUrl(nextPageUrl).pipe(map(resp=>resp.body));
        return forkJoin(parallelRequests)
          .pipe(mergeAll(),reduce((acc, resp) => acc.concat(resp), []));
          // .pipe(reduce((acc, resp) => acc.concat(resp)), seed);
          // .pipe(map(results=>{
          //   console.log(results);
          //   return results
          // }));

      }));

  }

  getRepositoriesByUrl = (url: string) => {
    return this.http.get(
      url,
      {
        headers: this.headers,
        observe: 'response'
      });
  };


  getRepositoriesPerPage = (organisationName: string, page) => {
    console.log(this.githubURL +
      '/orgs/' + organisationName +
      '/repos?page=' + page +
      '&per_page=100');

    return this.http.get(
      this.githubURL +
      '/orgs/' + organisationName +
      '/repos?page=' + page +
      '&per_page=100',
      {
        headers: this.headers,
      });
  };

  getBranches(organisationName: string, repositoryName) {
    return this.http.get(this.githubURL + '/repos/' + organisationName + '/' + repositoryName + '/branches',
      {headers: this.headers});
  }
}
