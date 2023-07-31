import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryDialogComponent } from './entry-dialog.component';

describe('EntryDialogComponent', () => {
  let component: EntryDialogComponent;
  let fixture: ComponentFixture<EntryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntryDialogComponent]
    });
    fixture = TestBed.createComponent(EntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
