import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {GitService} from "./git.service";
import {mergeMap, reduce, mergeAll} from "rxjs/internal/operators";
import {forkJoin, of} from "rxjs";
import {UrlTree, Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";

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
      .pipe(mergeMap((resp: HttpResponse<Array<any>>) => {
        if (resp.headers.get('Link') === null)
          return of(resp.body);

        let last = resp.headers.get('Link').split(',').filter(x => x.endsWith('rel="last"'))[0];
        let lastPageUrl = last.substring(last.indexOf('<') + 1, last.indexOf('>'));
        let lastPageUrlTree: UrlTree = this.router.parseUrl(lastPageUrl.replace(this.githubURL, ''));
        let lastPage: number = Number.parseInt(lastPageUrlTree.queryParamMap.get('page'));

        let parallelRequests = [];

        for (let i = 2; i <= lastPage; i++) {
          parallelRequests.push(this.getRepositoriesPerPage(organisationName, i))
        }

        console.log(resp.body);
        return forkJoin(parallelRequests)
          .pipe(mergeAll(), reduce((acc, resp) => acc.concat(resp), resp.body));

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
