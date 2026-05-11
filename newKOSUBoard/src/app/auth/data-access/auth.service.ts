import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, from, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Preferences } from '@capacitor/preferences';
import { authUser } from './auth.model';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../users/models/users.model';
import { Store } from '@ngrx/store';
import { clearState } from '../../store/core/app.actions';

const user_storage = 'user_data'
// const DAILY_GIFT = 'is_daily_claimed'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl = environment.baseUrl;
  private readonly store = inject(Store);
  private readonly http = inject(HttpClient)
  private userSubject$ = new BehaviorSubject<authUser | null>(null);
  user$ = this.userSubject$.asObservable();

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();


  constructor() {

  }

  ngOnInit() {
  }



  logIn(username: string, password: string): Observable<void> {

    return this.http.post<authUser>(`${this.baseUrl}/Login`, { username, password })
      .pipe(map((user: authUser) => {
        this.storeVal(user_storage, JSON.stringify(user))
        // this.storeToken(user.token);
        this.userSubject$.next(user)
        this.loggedIn.next(true)
      }));

  }

  async logout(): Promise<{ message: string; success: boolean }> {
    try {
      await Preferences.remove({ key: user_storage });

      this.userSubject$.next(null);
      this.loggedIn.next(false);
      this.store.dispatch(clearState());
      return { message: 'Logged out', success: true };
    } catch (err) {
      return { message: "Couldn't log out", success: false };
    }
  }

  initializeUser(): Observable<authUser | null> {
    return from(this.loadVal('user_data')).pipe(
      map(storedData => {

        console.log('uslo u initialize');

        if (!storedData) {
          this.loggedIn.next(false)
          return null;

        }
        this.loggedIn.next(true)
        console.log(storedData);

        return JSON.parse(storedData) as authUser;
      }),
      tap(user => this.userSubject$.next(user))
    );
  }

  async storeVal(keyVal: string, value: any) {
    await Preferences.set({
      key: keyVal,
      value: value
    });
  }

  async loadVal(keyVal: string): Promise<string | null> {
    const { value } = await Preferences.get({ key: keyVal });
    return value || null;
  }

  refreshAccessToken(): Observable<authUser> {
    return this.userSubject$.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          return throwError(() => new Error('No user found'));
        }

        return this.http.post<any>(
          `${this.baseUrl}/Login/CheckRefreshToken`,
          { refreshToken: user.refreshToken }
        ).pipe(
          switchMap(response => {
            if (response.returnInt < 0) {
              return throwError(() => new Error('Refresh failed'));
            }

            const updatedUser: authUser = {
              ...user,
              token: response.newAccessToken,
              refreshToken: response.newRefreshToken
            };

            this.userSubject$.next(updatedUser);
            this.storeVal(user_storage, JSON.stringify(updatedUser));

            return of(updatedUser);
          })
        );
      })
    );
  }



  getTokenExpirationDate(token: string): Date {
    const decoded = jwtDecode(token);
    const date = new Date(0);

    if (decoded.exp === undefined) return date;

    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token: string): boolean {
    const date = this.getTokenExpirationDate(token).valueOf();

    if (date === undefined) return false;
    const tokenBuffer = 60 * 1000; // 1 minute buffer
    // const tokenBuffer = 0; // 1 minute buffer

    // console.log((date.valueOf() - new Date().valueOf()) / 1000, !(date.valueOf() - tokenBuffer > new Date().valueOf()));
    return !(date.valueOf() - tokenBuffer > new Date().valueOf());

  }

  public get currentUser(): authUser | null {
    return this.userSubject$.value;
  }

  getRole(): string | null {
    return this.userSubject$.value ? this.userSubject$.value.role : null
  }

  getUsername(): string | null {
    return this.userSubject$.value ? this.userSubject$.value.userName : null
  }

  getUser(): authUser | null {
    return this.userSubject$.value
  }


  // canAdd(): boolean {
  //   let canAdd = false;
  //   this.user$.pipe(map(user => user!.role), take(1)).subscribe(name => {
  //     canAdd = name === 'Administrator' || name === 'SegmentLeader';
  //   });
  //   return canAdd;
  // }

  // canSee(): boolean {
  //   let canAdd = false;
  //   this.user$.pipe(map(user => user!.role), take(1)).subscribe(name => {
  //     canAdd = name === 'Administrator' || name === 'SuperHead' || name === 'HeadOfPlant' || name === 'HeadOfProduction';
  //   });
  //   return canAdd;
  // }



}
