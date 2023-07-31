import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableData } from '../app.component';

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html',
  styleUrls: ['./entry-dialog.component.scss'],
})
export class EntryDialogComponent {
  public entryForm: FormGroup; // Declare the FormGroup

  constructor(
    public dialogRef: MatDialogRef<EntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dialogData: TableData,
    private fb: FormBuilder // Inject the FormBuilder
  ) {
    // Initialize the FormGroup and FormControls with default values from the dialogData
    this.entryForm = this.fb.group({
      userId: [dialogData?.userId ?? 0], // Set the default value to 0 if dialogData.userId is undefined or null
      id: [dialogData?.id ?? 0], // Set the default value to 0 if dialogData.id is undefined or null
      title: [dialogData?.title ?? ''], // Set the default value to an empty string if dialogData.title is undefined or null
      completed: [dialogData?.completed ?? false], // Set the default value to false if dialogData.completed is undefined or null
    });
  }

  /**
   * Saves changes and closes the dialog
   */
  onSave() {
    this.dialogRef.close(this.entryForm.value); // Use entryForm.value to get the form data and pass it as the result when closing the dialog
  }

  /**
   * Closes the dialog without saving changes
   */
  onCancel() {
    this.dialogRef.close(); // Simply close the dialog without returning any data
  }
}
