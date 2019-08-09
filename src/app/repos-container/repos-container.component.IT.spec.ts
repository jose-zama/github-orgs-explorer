import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReposContainerComponent} from './repos-container.component';
import {ActivatedRoute} from '@angular/router';
import {GitService} from "../services/git.service";
import {ActivatedRouteStub} from "../../testing/ActivatedRouteStub";
import {
  MatIconModule, MatBadgeModule, MatCardModule, MatButtonToggleModule,
  MatProgressSpinnerModule, MatSelectModule
} from "@angular/material";
import {GithubService} from "../services/github.service";
import {HttpClient} from "@angular/common/http";
import {HttpTestingController, HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ScrollingModule} from "@angular/cdk/scrolling";

describe('ReposContainerComponentIT', () => {

  let component: ReposContainerComponent;
  let fixture: ComponentFixture<ReposContainerComponent>;
  let activatedRoute: ActivatedRouteStub;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    //we will test the integration of this component with the git service
    //therefore we will mock only http calls and angular router
    //NO service mocking:
    // githubService = new GithubService();

    //there must be an org as param when loading the component
    const activatedRouteStub = new ActivatedRouteStub({
      org: 'some_org'
    });

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        MatBadgeModule,
        MatCardModule,
        MatButtonToggleModule,
        RouterTestingModule,
        ScrollingModule,
        MatProgressSpinnerModule,
        MatSelectModule
      ],
      providers: [
        {provide: GitService, useClass: GithubService},
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
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should load organisation repositories', () => {
    //setup
    const repos = [
      {name: 'my repo'},
      {name: 'my repo 2'},
      {name: 'my repo 3'},
    ];

    //resolve the observable with the mocked repository
    const req = httpTestingController.expectOne('https://api.github.com/orgs/some_org/repos?page=1&per_page=100');
    req.flush(repos);

    //assert
    expect(component.organisation.repos).toEqual(repos);

  });

  it('should warn that the org does not exist if http returns 404', () => {
    //setup
    const errorBody = [
      {message: 'Not Found'}
    ];

    //resolve the observable with the mocked repository
    const req = httpTestingController.expectOne('https://api.github.com/orgs/some_org/repos?page=1&per_page=100');
    req.flush('error', {status: 404, statusText: 'Not Found'});

    //assert
    expect(component.error).toEqual('Organisation not found');

  });


});
