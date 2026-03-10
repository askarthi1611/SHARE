import { Component } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'Team Meeting'
    },
    {
      start: new Date(2026, 2, 10),
      end: new Date(2026, 2, 10),
      title: 'Project Deadline',
      color: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
      }
    },
    {
      start: new Date(2026, 2, 15),
      title: 'Doctor Appointment',
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
      }
    },
    {
      start: new Date(2026, 2, 20),
      end: new Date(2026, 2, 22),
      title: 'Vacation',
      color: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
      }
    }
  ];
}
