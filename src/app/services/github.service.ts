import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {GitService} from "./git.service";

@Injectable({
  providedIn: 'root'
})
export class GithubService implements GitService {

  githubURL: string = 'https://api.github.com';

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/vnd.github.v3+json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getRepositories(organisationName: string) {
    return this.getRepositoriesPerPage(organisationName, 1);
  }


  getRepositoriesPerPage = (organisationName: string, page) => {
    return this.http.get(
      this.githubURL +
      '/orgs/' + organisationName +
      '/repos?page=' + page +
      '&per_page=100',
      this.httpOptions);
  }

  getBranches(organisationName: string, repositoryName) {
    return this.http.get(this.githubURL + '/repos/' + organisationName + '/' + repositoryName + '/branches',
      this.httpOptions);
  }
}
