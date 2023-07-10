import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoprodutoComponent } from './infoproduto.component';

describe('InfoprodutoComponent', () => {
  let component: InfoprodutoComponent;
  let fixture: ComponentFixture<InfoprodutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoprodutoComponent]
    });
    fixture = TestBed.createComponent(InfoprodutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
