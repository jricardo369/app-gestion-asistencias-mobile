import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, IonicModule } from '@ionic/angular/lazy';
import { LoginService } from 'src/app/servicios/login.service';
import { NgForm, FormsModule } from '@angular/forms';
import { API_URL } from 'src/app/app.config';

@Component({
    selector: 'app-recuperar',
    templateUrl: './recuperar.page.html',
    styleUrls: ['./recuperar.page.scss'],
    imports: [IonicModule, FormsModule],
})
export class RecuperarPage implements OnInit {
  rp = {
    email: '',
  };

  mensaje: any;
  codigo: any;
  listado: any;
  submitted = false;

  constructor(
    private navCtrl: NavController,
    private servicio: LoginService,
    private loaginCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  recuperarPass(form: NgForm) {
    let obj = {
      email: this.rp.email,
    };
    this.submitted = true;

    this.servicio
      .getData(API_URL + 'Usuarios/' + this.rp.email)
      .subscribe((data) => {
        console.log(data);
        this.listado = data;
        this.codigo = this.listado.codigo;
        this.mensaje = this.listado.descripcion;

        if (this.codigo === 200) {
          this.cambiopassLoading();
          this.navCtrl.navigateRoot('/login');
        } else {
          this.erroPass();
          this.clearForm();
        }
      });
  }

  async cambiopassLoading() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: this.mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async erroPass() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: this.mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  clearForm() {
    this.rp.email = '';
  }

  atras() {
    this.navCtrl.navigateRoot('/login');
  }

  ngOnInit() {}
}
