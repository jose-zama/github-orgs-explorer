import { Component } from '@angular/core';
import {  Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Hola!';

  constructor(
    private router: Router,
  ) {}

  listRepositories(org:string){
    this.router.navigate(['/orgs',org]);
  }
}
