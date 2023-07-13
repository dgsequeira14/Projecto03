import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarmodalComponent } from './eliminarmodal.component';

describe('EliminarmodalComponent', () => {
  let component: EliminarmodalComponent;
  let fixture: ComponentFixture<EliminarmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarmodalComponent]
    });
    fixture = TestBed.createComponent(EliminarmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
