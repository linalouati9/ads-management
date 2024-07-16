import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiensComponent } from './biens.component';

describe('BiensComponent', () => {
  let component: BiensComponent;
  let fixture: ComponentFixture<BiensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BiensComponent]
    });
    fixture = TestBed.createComponent(BiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
