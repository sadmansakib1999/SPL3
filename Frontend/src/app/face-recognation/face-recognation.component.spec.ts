import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceRecognationComponent } from './face-recognation.component';

describe('FaceRecognationComponent', () => {
  let component: FaceRecognationComponent;
  let fixture: ComponentFixture<FaceRecognationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceRecognationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceRecognationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
