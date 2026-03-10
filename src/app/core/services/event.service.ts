import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn:'root'
})

export class EventService {

api="http://localhost:3000/api/events"

constructor(private http:HttpClient){}

createEvent(data:any):Observable<any>{
return this.http.post(this.api,data)
}

getEvents():Observable<any>{
return this.http.get(this.api)
}

getEventById(id:string):Observable<any>{
return this.http.get(`${this.api}/${id}`)
}

deleteEvent(id:string):Observable<any>{
return this.http.delete(`${this.api}/${id}`)
}

updateEvent(id:string,data:any):Observable<any>{
return this.http.put(`${this.api}/${id}`,data)
}

}