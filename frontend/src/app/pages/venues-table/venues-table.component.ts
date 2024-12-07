import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { Location } from '../../models/location.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-venues-table',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './venues-table.component.html',
  styleUrl: './venues-table.component.scss',
})
export class VenuesTableComponent implements OnChanges {
  @Input() venues: Location[] = []; // Array of venues to display
  @Output() editVenue = new EventEmitter<{ id: number; updatedVenue: Location }>();
  @Output() deleteVenue = new EventEmitter<number>(); // Emits an event when deleting a venue

  editingVenueId: number | null = null;
  editedVenue: Location = { name: '', category: '', latitude: 0, longitude: 0 }; //

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['venues']) {
      console.log('Updated venues:', this.venues);
    }
  }

  startEditing(venue: Location): void {
    this.editingVenueId = venue.id ?? null;
    this.editedVenue = { ...venue }; // Copy the venue data to avoid direct mutation
  }

  saveEdit(): void {
    if (this.editedVenue) {
      this.editVenue.emit({ id: this.editingVenueId!, updatedVenue: this.editedVenue });
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editingVenueId = null;
    this.editedVenue = { name: '', category: '', latitude: 0, longitude: 0 };
  }

  onDelete(id: number): void {
    this.deleteVenue.emit(id); // Emit the venue ID for deletion
  }
}
