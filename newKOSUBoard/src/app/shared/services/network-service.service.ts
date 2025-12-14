import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  isOnline(): boolean {
    return navigator.onLine;
  }

  // Add a method to handle changes in network status
  monitorNetworkStatus(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const updateOnlineStatus = () => observer.next(navigator.onLine);

      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);

      // Emit the initial status
      observer.next(navigator.onLine);

      // Cleanup listeners on unsubscribe
      return () => {
        window.removeEventListener('online', updateOnlineStatus);
        window.removeEventListener('offline', updateOnlineStatus);
      };
    });
  }
}
