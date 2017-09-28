import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleSliderComponent } from './middle-slider.component';

describe('MiddleSliderComponent', () => {
  let component: MiddleSliderComponent;
  let fixture: ComponentFixture<MiddleSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddleSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
