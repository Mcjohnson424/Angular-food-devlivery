import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { HttpService } from '../http-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userDataForm: FormGroup
  user: any

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    public router: Router
  ) { 
    this.userDataForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
      housenumber: ['', [Validators.required]],
      streetname: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.httpService.getUser().subscribe((res: any) => {
      console.log(res);
      this.user = res;
      this.userDataForm.patchValue({
        firstname: res.firstName,
        lastname: res.lastName,
        username: res.login.username,
        password: res.login.password,
        repassword: res.login.password,
        housenumber: res.address.housenumber,
        streetname: res.address.streetname,
        city: res.address.city,
        zip: res.address.zip,
        state: res.address.state,
        country: res.address.country
      })
    })
  }

  get firstname() { return this.userDataForm.get('firstname'); }
  get lastname() { return this.userDataForm.get('lastname'); }
  get username() { return this.userDataForm.get('username'); }
  get password() { return this.userDataForm.get('password'); }
  get repassword() { return this.userDataForm.get('repassword'); }
  get housenumber() { return this.userDataForm.get('repassword'); }
  get streetname() { return this.userDataForm.get('repassword'); }
  get city() { return this.userDataForm.get('repassword'); }
  get zip() { return this.userDataForm.get('repassword'); }
  get state() { return this.userDataForm.get('repassword'); }
  get country() { return this.userDataForm.get('repassword'); }

  get g() {
    return this.userDataForm.controls
  }

  onSubmit(): void {
    const data = {
      firstName: this.userDataForm.value.firstname,
      lastName: this.userDataForm.value.lastname,
      login: {
        username: this.userDataForm.value.username,
        password: this.userDataForm.value.password
      },
      address: {
        housenumber: this.userDataForm.value.housenumber,
        streetname: this.userDataForm.value.streetname,
        state: this.userDataForm.value.state,
        zip: this.userDataForm.value.zip,
        city: this.userDataForm.value.city,
        country: this.userDataForm.value.country
      }
    }
    this.httpService.editUser(data).subscribe((response: any) => { 
      localStorage.setItem('username', this.userDataForm.value.username);
      this.router.navigate(['/home'])
    })    
  }
}
