import {Component, OnInit} from '@angular/core';
import {
  Router, ActivatedRoute, ParamMap, RouterEvent, ActivationEnd, NavigationEnd,
  PRIMARY_OUTLET
} from "@angular/router";
import {filter} from "rxjs/internal/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Hola!';

  orgName: string = "";
  repo: string = "";

  constructor(private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {

    let events = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;

    events.subscribe(event => {
      console.log(event.url)
      if (this.router.parseUrl(event.url).root.children[PRIMARY_OUTLET] === undefined) return;
      let segment = this.router.parseUrl(event.url).root.children[PRIMARY_OUTLET].segments;
      this.orgName = segment[0] !== undefined ? segment[0].path : "";
      this.repo = segment[1] !== undefined ? segment[1].path : "";
    });

  }

  listRepositories(org: string) {
    this.router.navigate([org]);
  }
}
