import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistoutilizadorComponent } from './registoutilizador.component';

describe('RegistoutilizadorComponent', () => {
  let component: RegistoutilizadorComponent;
  let fixture: ComponentFixture<RegistoutilizadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistoutilizadorComponent]
    });
    fixture = TestBed.createComponent(RegistoutilizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
