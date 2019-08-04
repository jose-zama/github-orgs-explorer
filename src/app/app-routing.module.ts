import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ReposContainerComponent}      from './repos-container/repos-container.component';

const routes: Routes = [
  {path: 'orgs/:org', component: ReposContainerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
