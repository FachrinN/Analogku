import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogKuComponent } from './analog-ku.component';

describe('AnalogKuComponent', () => {
  let component: AnalogKuComponent;
  let fixture: ComponentFixture<AnalogKuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalogKuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalogKuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
