import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementDashboardComponent } from './statement-dashboard.component';

describe('StatementDashboardComponent', () => {
  let component: StatementDashboardComponent;
  let fixture: ComponentFixture<StatementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatementDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
