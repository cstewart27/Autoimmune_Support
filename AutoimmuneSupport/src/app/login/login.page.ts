import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserCredentials } from '../models/user-credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  credentials!: UserCredentials; 
  emailInputFormGroup!: FormGroup

  constructor(
    private fb: FormBuilder, 
    private loadingController: LoadingController, 
    private alertController: AlertController, 
    private authService: AuthService, 
    private router: Router
  ) { 
    
  }

  get email(){
    return this.emailInputFormGroup.get('email'); 
  }

  get password(){
    return this.emailInputFormGroup.get('password'); 
  }

  ngOnInit() {
    this.credentials = new UserCredentials('', ''); 

    this.emailInputFormGroup = this.fb.group({
      email: new FormControl(this.credentials.email, [
        Validators.required, 
        Validators.email
      ]),
      password: new FormControl(this.credentials.password, [
        Validators.required, 
        Validators.minLength(6)
      ])
    })

  }

  async register(event: Event){ 
    event.preventDefault(); 
    const loading = await this.loadingController.create(); 
    await loading.present(); 
    const user = await this.authService.register(this.email?.value, this.password?.value); 
    await loading.dismiss(); 

    if(user){
      this.router.navigateByUrl('/home', {replaceUrl: true});
    }else{
      this.showAlert('Registration failed', 'Please try again!');
    }
  }

  async login(event: Event){
    event.preventDefault(); 
    const loading = await this.loadingController.create(); 
    await loading.present(); 
    const user = await this.authService.login(this.email?.value, this.password?.value);
    await loading.dismiss(); 

    if(user){
      this.router.navigateByUrl('/home', {replaceUrl: true});
    }else{
      this.showAlert('Login Failed', 'Please try again!'); 
    }

  }

  async showAlert(header: string, message: string){
    const alert = await this.alertController.create({
      header, message, buttons: ['OK'],
    });

    await alert.present(); 
  }

}
