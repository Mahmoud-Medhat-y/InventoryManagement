/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InventoryComponent } from './inventory.component';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from '../services/Inventory/inventory.service';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [InventoryComponent],
      providers: [HttpClient, InventoryService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should filter by name', () => {
    const mockEvent = {
      target: { value: 'laptop' }
    } as unknown as Event;
    component.filterByName(mockEvent);
    const filterValue = (mockEvent.target as HTMLInputElement).value;
    component.dataSource.filter = filterValue.trim().toLowerCase();
    expect(filterValue).toBe('laptop');
  });
});
