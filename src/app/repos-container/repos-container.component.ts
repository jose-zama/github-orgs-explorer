import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params} from "@angular/router";
import {GitService} from "../services/git.service";
import {Organisation} from "./Organisation";

@Component({
  selector: 'app-repos-container',
  templateUrl: './repos-container.component.html',
  styleUrls: ['./repos-container.component.sass'],
})
export class ReposContainerComponent implements OnInit {

  organisation: Organisation = new Organisation();

  constructor(private route: ActivatedRoute,
              private gitService: GitService,) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.organisation.name = params.get('org');

      this.gitService.getRepositories(this.organisation.name).subscribe(repos => {
        repos.sort((a,b)=>a.stargazers_count<b.stargazers_count);
        this.organisation.repos = repos;
      });
    });
  }

}
