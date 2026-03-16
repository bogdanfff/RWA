// Angular core & common
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

// Angular Router
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Component, inject } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Subscription, switchMap, take, tap } from 'rxjs';
import { authUser } from '../../data-access/auth.model';
import { AuthService } from '../../data-access/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-auth-page',
  imports: [RouterLink, MatSelectModule, TranslateModule, ReactiveFormsModule, CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {
  private authService = inject(AuthService);
  private translate = inject(TranslateService);
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router);
  subscriptions: Subscription[] = []
  user!: authUser;
  form: FormGroup;
  defaultLang: string = this.translate.getCurrentLang();
  formFields = [
  { label: 'Email', control: 'username', type: 'text', required: true, error: 'Email required' ,autocomplete:'username'},
  { label: 'Password', control: 'password', type: 'password', required: true, error: 'Password required'  ,autocomplete:'current-password'}
];

languages = [
  { value: 'sr-RS', label: 'language.serbian' },
  { value: 'en-US', label: 'language.english' }
  // { value: 'ru-RU', label: 'language.russian' }
];

  constructor() {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),

    })
  }
  // $loggedUser = this.authService.initializeUser().pipe(
  //   switchMap(() => this.authService.user$), take(1),
  //   tap(user => {
  //     if (user) {
  //       this.router.navigateByUrl('statistics')
  //     }
  //   }
  //   )
  // ).subscribe()

  ngOnInit() {
    
    this.loadDefaultLanguage().then(value => {
      this.defaultLang = value ? value : 'sr-RS';
      this.translate.setFallbackLang(this.defaultLang);

    })
  }

  onSubmit() {
    this.subscriptions.push(
      this.authService.logIn(this.form.value.username, this.form.value.password).subscribe({
        next: () => {
          this._snackBar.open("Log In ", 'Successfull', { duration: 4000, });
          // this.dialogRef.close(true)
          this.router.navigate(['/home']);
        },
        error: (val:HttpErrorResponse) =>{
          this._snackBar.open(val.error.message, 'Error', { duration: 4000, });
        }
      }))
  }

  async loadDefaultLanguage() {
    const { value } = await Preferences.get({ key: 'language' });
    return value
  }

  async selectLanguage(lang: string) {

    await Preferences.set({
      key: 'language',
      value: lang
    });
    this.defaultLang = lang;
    this.translate.setDefaultLang(this.defaultLang)
    this.translate.use(this.defaultLang);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
