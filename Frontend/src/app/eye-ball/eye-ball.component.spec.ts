import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeBallComponent } from './eye-ball.component';

describe('EyeBallComponent', () => {
  let component: EyeBallComponent;
  let fixture: ComponentFixture<EyeBallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EyeBallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EyeBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
