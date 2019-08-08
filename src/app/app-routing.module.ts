import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ReposContainerComponent}      from './repos-container/repos-container.component';
import {BranchesContainerComponent} from "./branches-container/branches-container.component";

const routes: Routes = [
  {path: ':org', component: ReposContainerComponent},
  {path: ':org/:repo', component: BranchesContainerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
