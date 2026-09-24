import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, IonicModule } from '@ionic/angular/lazy';
import { LoginService } from 'src/app/servicios/login.service';
import { API_URL } from 'src/app/app.config';


@Component({
    selector: 'app-clasesalumnos',
    templateUrl: './clasesalumnos.page.html',
    styleUrls: ['./clasesalumnos.page.scss'],
    imports: [
    IonicModule
],
})
export class ClasesalumnosPage implements OnInit {

  listado:any;
  // usuario:any;
  idClase: any;
  
  constructor(
    private servicio : LoginService,
    public loadingController: LoadingController,
    public alertController: AlertController,    
  ) { }

  ngOnInit() {

    this.servicio.getData(API_URL + 'Clases').subscribe(data =>{
      console.log(data, "listado de clases");
      this.presentLoading();
      this.listado=data;
    });
  }
  
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: 'Por favor espere...',
      duration: 700
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'La clase esta llena',
      buttons: ['OK']
    });

    await alert.present();
  }  

}
