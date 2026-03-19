import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { HttpClient } from '@angular/common/http';
import { addDays, subDays, addWeeks, subWeeks, addMonths, subMonths } from 'date-fns';
import { environment } from '../../../environment';

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

    this.http.get<any[]>(environment.apiBaseUrl + '/events')
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

    this.http.get<any[]>(environment.apiBaseUrl + '/expenses')
      .subscribe(res => {

        const grouped: any = {}
        //date ascending
        res.sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate())


        res.forEach(expense => {

          const date = new Date(expense.date).toDateString();

          if (!grouped[date]) {
            grouped[date] = {
              total: 0,
              items: []
            }
          }

          grouped[date].total += expense.amount * 1
          grouped[date].items.push(expense)

        })
        console.log('grouped[date].items::', grouped);

        const expenseEvents: any[] = []

        Object.keys(grouped).forEach(date => {

          const dayData = grouped[date]

          let listring: any = [];
          dayData.items.forEach((expense: any) => {

            const color = this.categoryColors[expense.category] || this.categoryColors['Other']
            listring.push({ name: expense.category, amount: expense.amount });
            expenseEvents.push({
              start: new Date(date),
              title: `${expense.category}: ₹${expense.amount} \n`,
              color: color,
              meta: expense
            })

          })
console.log('listring::' , listring);
listring.push({ name: 'Total', amount: dayData.total });
listring = listring.map((item: any) => `<li><div>${item.name} </div> <div>: ₹${item.amount}</div></li>`).join('');
          expenseEvents.push({
            start: new Date(date),
            title: `<ul class="list-group">${listring}</ul>`,
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

  previous() {

    if (this.view === CalendarView.Month) {
      this.viewDate = subMonths(this.viewDate, 1);
    }

    if (this.view === CalendarView.Week) {
      this.viewDate = subWeeks(this.viewDate, 1);
    }

    if (this.view === CalendarView.Day) {
      this.viewDate = subDays(this.viewDate, 1);
    }

  }

  next() {

    if (this.view === CalendarView.Month) {
      this.viewDate = addMonths(this.viewDate, 1);
    }

    if (this.view === CalendarView.Week) {
      this.viewDate = addWeeks(this.viewDate, 1);
    }

    if (this.view === CalendarView.Day) {
      this.viewDate = addDays(this.viewDate, 1);
    }

  }

  today() {
    this.viewDate = new Date();
  }

}