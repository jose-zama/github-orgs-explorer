import {Component, OnInit} from '@angular/core';
import {GitService} from "../services/git.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-branches-container',
  templateUrl: './branches-container.component.html',
  styleUrls: ['./branches-container.component.sass']
})
export class BranchesContainerComponent implements OnInit {

  org:string;
  repo:string;
  branches;
  error;

  constructor(private route: ActivatedRoute,
              private gitService: GitService,) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {

      this.org = params.get('org');
      this.repo = params.get('repo');

      this.gitService.getBranches(this.org,this.repo).subscribe(
        (branches) => {
          this.branches = branches;
          this.error = undefined;

          if (branches.length === 0) {
            this.error = 'Repository have no branches';
            return;
          }
        },
        (err: HttpErrorResponse) => {
          if (err.status === 404) this.error = 'Repository not found';
          else this.error = 'Something bad happened :(';
        }
      );

    });
  }
}
