import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
providedIn:'root'
})

export class NotificationService{

api="http://localhost:3000/api/notifications"

constructor(private http:HttpClient){}

getNotifications():Observable<any>{
return this.http.get(this.api)
}

markAsRead(id:string):Observable<any>{
return this.http.put(`${this.api}/${id}`,{status:"read"})
}

}