import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternaComponent } from './interna.component';

describe('InternaComponent', () => {
  let component: InternaComponent;
  let fixture: ComponentFixture<InternaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternaComponent]
    });
    fixture = TestBed.createComponent(InternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
