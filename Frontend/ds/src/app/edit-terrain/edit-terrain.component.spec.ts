import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTerrainComponent } from './edit-terrain.component';

describe('EditTerrainComponent', () => {
  let component: EditTerrainComponent;
  let fixture: ComponentFixture<EditTerrainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTerrainComponent]
    });
    fixture = TestBed.createComponent(EditTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
