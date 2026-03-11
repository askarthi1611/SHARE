import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environment';

@Injectable({
  providedIn:'root'
})

export class ReminderService {

api=environment.apiBaseUrl + "/reminders";

constructor(private http:HttpClient){}

createReminder(data:any):Observable<any>{
return this.http.post(this.api,data)
}

getReminders():Observable<any>{
return this.http.get(this.api)
}

deleteReminder(id:string):Observable<any>{
return this.http.delete(`${this.api}/${id}`)
}

}