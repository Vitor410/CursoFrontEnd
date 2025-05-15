import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoFormComponent } from './produto-form.component';

describe('ProdutoFormComponent', () => {
  let component: ProdutoFormComponent;
  let fixture: ComponentFixture<ProdutoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoFormComponent]
    });
    fixture = TestBed.createComponent(ProdutoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
