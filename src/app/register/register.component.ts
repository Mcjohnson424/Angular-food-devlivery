import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    public router: Router
  ) { 
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    
  }

  get firstname() { return this.registerForm.get('firstname'); }
  get lastname() { return this.registerForm.get('lastname'); }
  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get repassword() { return this.registerForm.get('repassword'); }

  get g() {
    return this.registerForm.controls
  }

  onSubmit(): void {
    const data = {
      firstName: this.registerForm.value.firstname,
      lastName: this.registerForm.value.lastname,
      login: {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password
      },
      address: {}
    }
    this.httpService.register(data).subscribe((response: any) => { 
      this.router.navigate(['/login'])
    })    
  }
}
