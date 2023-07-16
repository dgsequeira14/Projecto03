import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarperfilComponent } from './alterarperfil.component';

describe('AlterarperfilComponent', () => {
  let component: AlterarperfilComponent;
  let fixture: ComponentFixture<AlterarperfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlterarperfilComponent]
    });
    fixture = TestBed.createComponent(AlterarperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
