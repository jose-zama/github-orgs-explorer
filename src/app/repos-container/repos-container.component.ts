import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {GitService} from "../services/git.service";
import {Organisation} from "./Organisation";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-repos-container',
  templateUrl: './repos-container.component.html',
  styleUrls: ['./repos-container.component.sass'],
})
export class ReposContainerComponent implements OnInit {

  organisation: Organisation = new Organisation();
  repositories;
  languages;
  error: string;

  constructor(private route: ActivatedRoute,
              private gitService: GitService,) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.organisation = new Organisation();

      this.organisation.name = params.get('org');
      this.languages = new Set();

      this.gitService.getRepositories(this.organisation.name).subscribe(
        (repos) => {
          this.organisation.repos = this.repositories = repos;
          this.error=undefined;

          if(repos.length===0) {
            this.error = 'Organisation have no repository';
            return;
          }

          this.sortByNumberOfStars();
          this.repositories
            .map((repo) => repo.language)
            .filter((language) => language !== null)
            .forEach((language) => this.languages.add(language));
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          if (err.status === 404) this.error = 'Organisation not found';
          else this.error = 'Something bad happened :(';
        }
      );

    });
  }

  filterByLanguage(language: string) {
    if (language === 'all')
      this.repositories = this.organisation.repos;
    else
      this.repositories = this.organisation.repos.filter((repo) => repo.language === language);
  }

  sortByNumberOfStars() {
    this.repositories.sort((a, b) => a.stargazers_count < b.stargazers_count);
  }

  sortByNumberOfForks() {
    this.repositories.sort((a, b) => a.forks_count < b.forks_count);
  }

}
