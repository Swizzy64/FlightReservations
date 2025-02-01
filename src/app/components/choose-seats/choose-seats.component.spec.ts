import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSeatsComponent } from './choose-seats.component';

describe('ChooseSeatsComponent', () => {
  let component: ChooseSeatsComponent;
  let fixture: ComponentFixture<ChooseSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseSeatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
