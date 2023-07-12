import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoutilizadoresComponent } from './gestaoutilizadores.component';

describe('GestaoutilizadoresComponent', () => {
  let component: GestaoutilizadoresComponent;
  let fixture: ComponentFixture<GestaoutilizadoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestaoutilizadoresComponent]
    });
    fixture = TestBed.createComponent(GestaoutilizadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
