import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [ FullCalendarModule ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  calendarOptions:CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin], 
    headerToolbar: {
      left: 'prev,next today',
      center: 'title', 
      right: 'dayGridMonth,dayGridWeek,dayGridDay', 
    },
    events: [
      { title: 'Event 1', start: '2024-12-10' },
      { title: 'Event 2', start: '2024-12-12' },
    ], // Example events
    dateClick: this.handleDateClick.bind(this), 
  };

  handleDateClick(arg: any): void {
    alert('Date clicked: ' + arg.dateStr);
  }
  }

