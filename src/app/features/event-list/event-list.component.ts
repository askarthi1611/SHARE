import { Component, OnInit } from '@angular/core';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events:any[]=[];

  constructor(private eventService:EventService){}

  ngOnInit(): void {
    this.loadEvents()
  }

  loadEvents(){
    this.eventService.getEvents()
    .subscribe((res:any)=>{
      this.events=res
    })
  }

  deleteEvent(id:string){

    if(confirm("Delete this event?")){
      this.eventService.deleteEvent(id)
      .subscribe(()=>{
        this.loadEvents()
      })
    }

  }

}