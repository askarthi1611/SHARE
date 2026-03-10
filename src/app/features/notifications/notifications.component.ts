import { Component } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications: any;
  constructor(private notificationService:NotificationService){}
ngOnInit(){

this.notificationService.getNotifications()
.subscribe(data=>{

this.notifications=data

})

}
}
