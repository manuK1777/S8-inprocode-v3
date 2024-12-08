import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-dialog',
  standalone: true,
  imports: [ MaterialModule, FormsModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './event-dialog.component.html',
  styleUrl: './event-dialog.component.scss'
})
export class EventDialogComponent {
  eventForm: FormGroup;
  isEditMode: boolean;
  event: any = {};

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('DialogRef:', this.dialogRef);
    this.isEditMode = data.mode === 'edit';
  }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: [this.data.event?.title || '', [Validators.required]],
      description: [this.data.event?.description || ''],
      start_time: [this.data.event?.start_time || '', [Validators.required]],
      end_time: [this.data.event?.end_time || '', [Validators.required]],
      color: [this.data.event?.color || '#3788d8'],
    });
  }

  saveEvent(): void {
    if (this.eventForm.valid) {
      this.dialogRef.close({
        action: this.isEditMode ? 'edit' : 'add',
        event: this.eventForm.value,
      });
    }
  }

  deleteEvent(): void {
    this.dialogRef.close({ action: 'delete', event: this.data.event });
  }

  cancel(): void {
    this.dialogRef.close();
  }
  
}

