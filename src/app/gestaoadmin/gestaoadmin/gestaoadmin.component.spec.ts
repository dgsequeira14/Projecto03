import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoadminComponent } from './gestaoadmin.component';

describe('GestaoadminComponent', () => {
  let component: GestaoadminComponent;
  let fixture: ComponentFixture<GestaoadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestaoadminComponent]
    });
    fixture = TestBed.createComponent(GestaoadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
