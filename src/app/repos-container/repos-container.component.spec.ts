import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReposContainerComponent} from './repos-container.component';
import {ActivatedRoute} from '@angular/router';
import {GitService} from "../services/git.service";
import {of} from "rxjs";
import {ActivatedRouteStub} from "../../testing/ActivatedRouteStub";
import {MatIconModule, MatBadgeModule, MatCardModule, MatButtonToggleModule} from "@angular/material";

describe('ReposContainerComponent', () => {

  let component: ReposContainerComponent;
  let fixture: ComponentFixture<ReposContainerComponent>;
  let activatedRoute: ActivatedRouteStub;
  let gitServiceSpy: jasmine.SpyObj<GitService>;

  beforeEach(async(() => {
    const gitServiceSpy = jasmine.createSpyObj('GitService', ['getRepositories']);
    //mock gitService getRepositories to return nothing if called
    //so that when called with some_org does not fail
    gitServiceSpy.getRepositories.and.returnValue(of([]));

    //there must be a org as param when loading the component
    const activatedRouteStub = new ActivatedRouteStub({
      org: 'some_org'
    });

    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatBadgeModule,
        MatCardModule,
        MatButtonToggleModule
      ],
      providers: [
        {provide: GitService, useValue: gitServiceSpy},
        {provide: ActivatedRoute, useValue: activatedRouteStub}
      ],
      declarations: [ReposContainerComponent]
    })
     .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReposContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    activatedRoute = TestBed.get(ActivatedRoute);
    gitServiceSpy = TestBed.get(GitService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load organisation name when org changes from url', () => {
    //setup

    //run
    //route param change un URL (i.e. .../payworks/...)
    activatedRoute.setParamMap({
      org: 'payworks'
    });

    gitServiceSpy.getRepositories.and.returnValue(of({}));

    //assert
    expect(component.organisation.name).toBe('payworks');
  });

  it('should load organisation repos when org changes from url', () => {
    //setup
    const repos = [{
      name: 'my repo'
    }];

    //mock service response
    //of creates an observable
    gitServiceSpy.getRepositories.and.returnValue(of(repos));

    //run
    //update organisation name
    activatedRoute.setParamMap({
      org: 'something'
    });

    //assert
    expect(component.organisation.repos).toEqual(repos);
    expect(gitServiceSpy.getRepositories).toHaveBeenCalledWith('something');
  });

  //TODO: test exceptions like
  //not existing organization

});
