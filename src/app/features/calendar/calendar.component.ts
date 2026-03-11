import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
  categoryColors: any = {

    Food: {
      primary: '#ff7043',
      secondary: '#ffe0d6'
    },

    Travel: {
      primary: '#42a5f5',
      secondary: '#d6ecff'
    },

    Entertainment: {
      primary: '#ab47bc',
      secondary: '#f3e5f5'
    },

    Shopping: {
      primary: '#ec407a',
      secondary: '#fde0ea'
    },

    Medical: {
      primary: '#ef5350',
      secondary: '#fdecea'
    },

    Utilities: {
      primary: '#66bb6a',
      secondary: '#e6f6e6'
    },

    Other: {
      primary: '#78909c',
      secondary: '#eceff1'
    }

  }
  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.loadEvents();
    this.loadExpenses();

  }

  loadEvents() {

    this.http.get<any[]>('https://asks99.onrender.com/api/events')
      .subscribe(res => {

        const apiEvents = res.map(event => ({
          start: new Date(event.date),
          title: event.title,
          color: {
            primary: event.color || '#2196F3',
            secondary: '#D1E8FF'
          },
          meta: event
        }))

        this.events = [...this.events, ...apiEvents]

      })

  }

  loadExpenses() {

    this.http.get<any[]>('https://asks99.onrender.com/api/expenses')
      .subscribe(res => {

        const grouped: any = {}

        res.forEach(expense => {

          const date = expense.date

          if (!grouped[date]) {
            grouped[date] = {
              total: 0,
              items: []
            }
          }

          grouped[date].total += expense.amount*1
          grouped[date].items.push(expense)

        })

        const expenseEvents: any[] = []

        Object.keys(grouped).forEach(date => {

          const dayData = grouped[date]

          dayData.items.forEach((expense: any) => {

            const color = this.categoryColors[expense.category] || this.categoryColors['Other']

            expenseEvents.push({
              start: new Date(date),
              title: `${expense.category}: ₹${expense.amount}`,
              color: color,
              meta: expense
            })

          })

          expenseEvents.push({
            start: new Date(date),
            title: `🧾 Total: ₹${dayData.total}`,
            allDay: true,
            color: {
              primary: '#2c3e50',
              secondary: '#ecf0f1'
            }
          })

        })

        this.events = [...this.events, ...expenseEvents]

      })

  }
}