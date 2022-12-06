import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectedJobComponent } from './suspected-job.component';

describe('SuspectedJobComponent', () => {
  let component: SuspectedJobComponent;
  let fixture: ComponentFixture<SuspectedJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspectedJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspectedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
