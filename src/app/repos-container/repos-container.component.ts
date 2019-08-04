import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {GitService} from "../services/git.service";

@Component({
  selector: 'app-repos-container',
  templateUrl: './repos-container.component.html',
  styleUrls: ['./repos-container.component.sass'],
})
export class ReposContainerComponent implements OnInit {

  organisation: string;

  constructor(private route: ActivatedRoute,
              private gitService: GitService,) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.organisation = params.get('org');
      this.gitService.getRepositories(this.organisation).subscribe(res => {
        console.log(res);
      });
    });

  }

}
