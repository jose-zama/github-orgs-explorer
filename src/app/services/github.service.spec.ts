import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {GithubService} from './github.service';
import {RouterTestingModule} from "@angular/router/testing";

describe('GithubService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: GithubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(GithubService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRepositories', () => {

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });

    it('should return 1 repository', () => {
      //setup
      const organisationName = "my-organisation";
      let expectedRepository = [{
        id: 111111,
        name: 'some_repo_name'
      }];

      //run
      let result = service.getRepositories(organisationName);

      //assert
      // angular $http client return observables,
      // which is a publish and subscribe mechanism for async programming
      result.subscribe(data => {
        expect(data).toBe(expectedRepository);
      });

      //resolve the observable with the mocked repository
      const req = httpTestingController.expectOne('https://api.github.com/orgs/my-organisation/repos?page=1&per_page=100');
      req.flush(expectedRepository);
    });

    it('should use get method', () => {
      //setup
      const organisationName = "my-organisation";

      //run
      let result = service.getRepositories(organisationName);

      //assert
      // angular $http client return observables,
      // which is a publish and subscribe mechanism for async programming
      result.subscribe(data => {});

      //resolve the observable with the mocked repository
      const req = httpTestingController.expectOne('https://api.github.com/orgs/my-organisation/repos?page=1&per_page=100');
      expect(req.request.method).toEqual('GET');
      req.flush({});
    });

    it('should request api V3', () => {
      //setup
      const organisationName = "my-organisation";

      //run
      let result = service.getRepositories(organisationName);

      //assert
      // angular $http client return observables,
      // which is a publish and subscribe mechanism for async programming
      result.subscribe(data => {});

      //resolve the observable with the mocked repository
      const req = httpTestingController.expectOne('https://api.github.com/orgs/my-organisation/repos?page=1&per_page=100');
      expect(req.request.headers.getAll('Accept')).toEqual(['application/vnd.github.v3+json']);
      req.flush({});
    });

  });
});
