import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposContainerComponent } from './repos-container.component';

describe('ReposContainerComponent', () => {
  let component: ReposContainerComponent;
  let fixture: ComponentFixture<ReposContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReposContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReposContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
