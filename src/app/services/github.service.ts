import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {GitService} from "./git.service";

@Injectable({
  providedIn: 'root'
})
export class GithubService implements GitService{

  githubURL: string = 'https://api.github.com';

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/vnd.github.v3+json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getRepositories(organisationName: string) {
    return this.http.get(this.githubURL + '/orgs/' + organisationName + '/repos', this.httpOptions);
  }
}
