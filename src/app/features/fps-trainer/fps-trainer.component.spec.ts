import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpsTrainerComponent } from './fps-trainer.component';

describe('FpsTrainerComponent', () => {
  let component: FpsTrainerComponent;
  let fixture: ComponentFixture<FpsTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FpsTrainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FpsTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
