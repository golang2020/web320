import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Data3dComponent } from './data3d.component';

describe('Data3dComponent', () => {
  let component: Data3dComponent;
  let fixture: ComponentFixture<Data3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Data3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Data3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
