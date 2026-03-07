import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'SHARE';
  deferredPrompt: any = null;
  showInstallBanner = false;  // ✅ Control banner visibility
  private destroy$ = new Subject<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initPWA();
      this.removeSplashScreen();
      this.initNotifications();
      setInterval(() => {
        this.sendTestNotification();
      }, 600000); // every 10 minutes
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** ✅ FIXED PWA Install Logic */
  private initPWA() {
    let installPromptEvent: any;

    // 1. Capture install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      // ✅ Store event (don't preventDefault here)
      installPromptEvent = e;
      console.log('✅ beforeinstallprompt captured');

      // 2. Show banner after user interaction or delay
      setTimeout(() => {
        this.deferredPrompt = installPromptEvent;
        this.showInstallBanner = true;  // ✅ Show button
      }, 3000); // 3s delay
    });

    // 3. Hide banner when installed
    window.addEventListener('appinstalled', () => {
      console.log('🎉 PWA was installed');
      this.showInstallBanner = false;
      this.deferredPrompt = null;
    });

    // 4. Dismiss banner when user clicks outside
    window.addEventListener('click', this.handleDismissBanner, true);
  }

  /** ✅ Install PWA - ALWAYS call prompt() */
  installApp() {
    if (this.deferredPrompt) {
      // ✅ CRITICAL: Always call prompt()
      this.deferredPrompt.prompt();

      // Handle user choice
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ User accepted PWA install');
          this.showInstallBanner = false;  // Hide banner
        } else {
          console.log('❌ User dismissed PWA install');
        }
        this.deferredPrompt = null;  // Clear prompt
      });
    }
  }

  /** ✅ Dismiss banner */
  private handleDismissBanner = (event: MouseEvent) => {
    const installBtn = (event.target as HTMLElement).closest('.pwa-install-btn');
    if (!installBtn && this.showInstallBanner) {
      this.showInstallBanner = false;  // Hide after user ignores
    }
  };

  private removeSplashScreen() {
    setTimeout(() => {
      const splash = document.getElementById('splash-screen');
      if (splash) {
        splash.remove();
      }
    }, 2000);
    setTimeout(() => {
      this.showInstallBanner = false;  // Hide install banner after 10 seconds
    }, 10000); // 10s delay
  }

  //Push Notifications - Always Active + Click → Create Blog
  showNotifications = false;
  permissionGranted = true;
  registration: any;

  async initPushNotifications() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      // Request permission
      const permission = await Notification.requestPermission();
      this.permissionGranted = permission === 'granted';

      if (this.permissionGranted) {
        // Register service worker for notifications
        this.registration = await navigator.serviceWorker.register('/ngsw-worker.js');
        this.showNotifications = true;
        // this.subscribeToPush();
        this.sendTestNotification();
      }
    }
  }

  subscribeToPush() {
    // Subscribe to push service (your backend API)
    this.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY' // Get from backend
    }).then((subscription: any) => {
      console.log('Push subscription:', subscription);
      // Send to your backend
      // this.blogService.savePushSubscription(subscription).subscribe();
    });
  }

  // Send notification (call anytime)
  sendTestNotification() {
    if (this.permissionGranted) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('New Blog Idea! 🚀', {
          body: 'Click to create your next viral post',
          icon: '/assets/icons/icon-192x192.png',
          badge: '/assets/icons/badge-72x72.png',
          actions: [{
            action: 'create',
            title: 'Create Blog ➕'
          }],
          data: { url: '/blog/create' }
        } as any);
      });
    }
  }

  async initNotifications() {

    if (!('Notification' in window)) {
      console.log('Notifications not supported');
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === 'granted') {

      setTimeout(() => {

        const notification = new Notification('New Blog Idea 🚀', {
          body: 'Click to create your next viral post',
          icon: '/assets/icons/icon-192x192.png'
        });

        notification.onclick = () => {
          window.open('/blog/create', '_blank');
        };

      }, 5000); // show after 5 seconds

    }
  }

}
