import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidePictureComponent } from './ride-picture.component';

describe('RidePictureComponent', () => {
  let component: RidePictureComponent;
  let fixture: ComponentFixture<RidePictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidePictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
