import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilutilizadorComponent } from './perfilutilizador.component';

describe('PerfilutilizadorComponent', () => {
  let component: PerfilutilizadorComponent;
  let fixture: ComponentFixture<PerfilutilizadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilutilizadorComponent]
    });
    fixture = TestBed.createComponent(PerfilutilizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
