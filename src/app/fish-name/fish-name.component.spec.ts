import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishNameComponent } from './fish-name.component';

describe('FishNameComponent', () => {
  let component: FishNameComponent;
  let fixture: ComponentFixture<FishNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FishNameComponent]
    });
    fixture = TestBed.createComponent(FishNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
