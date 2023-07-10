import { TestBed } from '@angular/core/testing';

import { ServprodutosService } from './servprodutos.service';

describe('ServprodutosService', () => {
  let service: ServprodutosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServprodutosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
