import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Store } from '@ngrx/store';
import { Router } from '@angular/router'
import { HttpService } from '../http-service.service';
// import { getUser } from '../app.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    public router: Router,
    // private store: Store<{ count: number }>
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('username')
    localStorage.removeItem('userid')
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  get g() {
    return this.loginForm.controls
  }

  onSubmit(): void {
    this.httpService.login(this.loginForm.value).subscribe((response: any) => { 
      if(response.length > 0) {
        // this.store.dispatch(getUser(response[0]))
        localStorage.setItem('username', response[0].login.username);
        localStorage.setItem('userid', response[0].id);
        this.router.navigate(['/home'])
      }
    })    
  }

}
