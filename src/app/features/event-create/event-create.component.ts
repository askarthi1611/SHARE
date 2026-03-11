import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  eventForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService
  ){}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title:[''],
      description:[''],
      location:[''],
      date:[''],
      startTime:[''],
      endTime:[''],
      eventType:['personal'],
      color:['#2196F3'],
      isAllDay:[false],
      reminderBefore:[30],
      userId:['1']
    })
  }

  submitEvent(){

    if(this.eventForm.valid){
      this.eventService.createEvent(this.eventForm.value)
      .subscribe((res:any)=>{
        alert("Event Created Successfully")
        this.eventForm.reset()
      })
    }

  }

}