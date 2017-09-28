import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftHuggerComponent } from './left-hugger.component';

describe('LeftHuggerComponent', () => {
  let component: LeftHuggerComponent;
  let fixture: ComponentFixture<LeftHuggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftHuggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftHuggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
