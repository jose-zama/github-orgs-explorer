import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class GitService {
    abstract getRepositories(organisationName: string);
}
