import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarmodalComponent } from './confirmarmodal.component';

describe('ConfirmarmodalComponent', () => {
  let component: ConfirmarmodalComponent;
  let fixture: ComponentFixture<ConfirmarmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarmodalComponent]
    });
    fixture = TestBed.createComponent(ConfirmarmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
