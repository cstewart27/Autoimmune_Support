import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {
  constructor(
    private router: Router, 
    private authService: AuthService, 
    private loadingController: LoadingController, 
    private alertController: AlertController) {

  }

  async logout(event: Event){
    event.preventDefault; 
    const loading = await this.loadingController.create(); 
    await loading.present(); 
    try {
      this.authService.logout(); 
      await loading.dismiss(); 
      this.router.navigateByUrl('', {replaceUrl:true});
    } catch (error) {
      console.log(error); 
      this.showAlert('Signout failed', 'Please try again!')
    }
    
  }

  async showAlert(header: string, message: string){
    const alert = await this.alertController.create({
      header, message, buttons: ['OK'],
    });

    await alert.present(); 
  }
}
