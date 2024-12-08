import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { EventDialogComponent } from 'src/app/modals/event-dialog/event-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [ FullCalendarModule, MaterialModule ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  events: Event[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
   events: [],
    dateClick: this.handleDateClick.bind(this), 
    eventClick: this.eventClickHandler.bind(this),
  };
  
  
  constructor (
    private eventService: EventService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }
  handleDateClick(arg: any): void {
    console.log('Date clicked:', arg.dateStr);
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '400px',
      data: {
        mode: 'add',
        selectedDate: arg.dateStr,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'add' && result.event) {
        this.eventService.createEvent(result.event).subscribe({
          next: () => {
            console.log('Event added successfully');
            this.loadEvents(); 
          },
          error: (err) => {
            console.error('Error adding event:', err);
          },
        });
      }
    });
  }
  

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
        console.log('Events loaded:', this.events);
        this.updateCalendarEvents();
      },
      error: (err) => {
        console.error('Error loading events:', err);
      },
    });
  }
  
  private updateCalendarEvents(): void {
    this.calendarOptions.events = this.events.map(event => ({
      title: event.title,
      start: event.start_time,
      end: event.end_time,
      color: event.color,
      extendedProps: { ...event },
    }));
  }
  
  
  eventClickHandler(eventInfo: any): void {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '400px',
      data: {
        mode: 'edit',
        event: eventInfo.event.extendedProps, // Pass the extended event data
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'edit' && result.event) {
        // Update Event
        this.eventService.updateEvent(result.event.id, result.event).subscribe({
          next: () => {
            console.log('Event updated successfully');
            this.loadEvents(); 
          },
          error: (err) => {
            console.error('Error updating event:', err);
          },
        });
      } else if (result?.action === 'delete' && result.event) {
        // Delete Event
        this.eventService.deleteEvent(result.event.id).subscribe({
          next: () => {
            console.log('Event deleted successfully');
            this.loadEvents(); 
          },
          error: (err) => {
            console.error('Error deleting event:', err);
          },
        });
      }
    });
  }
  
  }

