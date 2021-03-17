import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletesComponent } from './completes.component';

describe('CompletesComponent', () => {
  let component: CompletesComponent;
  let fixture: ComponentFixture<CompletesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
