import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environment';

@Injectable({
providedIn:'root'
})

export class NotificationService{

api=environment.apiBaseUrl + "/notifications";

constructor(private http:HttpClient){}

getNotifications():Observable<any>{
return this.http.get(this.api)
}

markAsRead(id:string):Observable<any>{
return this.http.put(`${this.api}/${id}`,{status:"read"})
}

}