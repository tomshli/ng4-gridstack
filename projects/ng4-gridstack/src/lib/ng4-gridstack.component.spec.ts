import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng4GridstackComponent } from './ng4-gridstack.component';

describe('Ng4GridstackComponent', () => {
  let component: Ng4GridstackComponent;
  let fixture: ComponentFixture<Ng4GridstackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ng4GridstackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng4GridstackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
