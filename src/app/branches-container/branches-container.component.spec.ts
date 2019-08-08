import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesContainerComponent } from './branches-container.component';
import {MatListModule, MatIconModule} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {GitService} from "../services/git.service";
import {ActivatedRouteStub} from "../../testing/ActivatedRouteStub";
import {of} from "rxjs";

describe('BranchesContainerComponent', () => {
  let component: BranchesContainerComponent;
  let fixture: ComponentFixture<BranchesContainerComponent>;


  beforeEach(async(() => {

    const gitServiceSpy = jasmine.createSpyObj('GitService', ['getBranches']);
    //mock gitService getBranches to return nothing if called
    //so that when called with some_org does not fail
    gitServiceSpy.getBranches.and.returnValue(of([]));

    //there must be a org as param when loading the component
    const activatedRouteStub = new ActivatedRouteStub({
      org: 'some_org'
    });

    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatIconModule,
      ],
      providers: [
        {provide: GitService, useValue: gitServiceSpy},
        {provide: ActivatedRoute, useValue: activatedRouteStub}
      ],
      declarations: [ BranchesContainerComponent ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
