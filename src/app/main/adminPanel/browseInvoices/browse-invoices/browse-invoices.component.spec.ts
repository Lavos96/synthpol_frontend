import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseInvoicesComponent } from './browse-invoices.component';

describe('BrowseInvoicesComponent', () => {
  let component: BrowseInvoicesComponent;
  let fixture: ComponentFixture<BrowseInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
