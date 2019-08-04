import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-repos-container',
  templateUrl: './repos-container.component.html',
  styleUrls: ['./repos-container.component.sass']
})
export class ReposContainerComponent implements OnInit {

  organisation:string;

  constructor(private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params : ParamMap)=> {
      this.organisation = params.get('org')
    });

  }

}
