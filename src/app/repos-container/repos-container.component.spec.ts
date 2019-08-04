import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReposContainerComponent} from './repos-container.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('ReposContainerComponent', () => {
  let component: ReposContainerComponent;
  let fixture: ComponentFixture<ReposContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
