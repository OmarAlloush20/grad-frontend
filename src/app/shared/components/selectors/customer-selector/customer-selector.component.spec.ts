import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSelectorComponent } from './customer-selector.component';

describe('CustomerSelectorComponent', () => {
  let component: CustomerSelectorComponent;
  let fixture: ComponentFixture<CustomerSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
