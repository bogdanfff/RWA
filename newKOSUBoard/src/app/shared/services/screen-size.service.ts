import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, shareReplay, Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {

  private breakpointObserver = inject(BreakpointObserver);

  private isDesktop$ = new BehaviorSubject<boolean>(false);

  isDesktop = (this.isDesktop$.asObservable().pipe(
    distinctUntilChanged(),
    shareReplay()
  ));


  /**
   * Checks screen size and emits new value for isDesktop$ behavior subject
   * 
   * @param value 
   * @return {Observable<boolean>}
   */
  checkSize(): Observable<boolean> {

    return this.breakpointObserver.observe(['(min-width: 840px)']).pipe(
      map(result => {
        // console.log(result.matches);
        
        this.isDesktop$.next(result.matches);
        return result.matches;
      })
    )

  }

}
