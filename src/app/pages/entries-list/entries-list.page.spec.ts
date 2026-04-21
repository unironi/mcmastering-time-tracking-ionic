import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntriesListPage } from './entries-list.page';

describe('EntriesListPage', () => {
  let component: EntriesListPage;
  let fixture: ComponentFixture<EntriesListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntriesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
