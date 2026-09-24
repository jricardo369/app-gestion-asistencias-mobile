import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, IonicModule } from '@ionic/angular/lazy';
import { LoginService } from 'src/app/servicios/login.service';
import { ModalInfEaPage } from '../modal-inf-ea/modal-inf-ea.page';
import { API_URL } from 'src/app/app.config';
import { COMPANIA } from 'src/app/app.config';


@Component({
    selector: 'app-asuetos',
    templateUrl: './asuetos.page.html',
    styleUrls: ['./asuetos.page.scss'],
    imports: [
    IonicModule
],
})
export class AsuetosPage implements OnInit {

  compania = COMPANIA;
  listado: any;
  listadoRespuesta: any;
  codigo: any;
  mensajerr: any;
  textoBuscar = '';

  constructor(
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private servicio: LoginService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.servicio.getData(API_URL + 'Asuetos').subscribe((data) => {
      let objUsuario = JSON.stringify(data);
      let json = JSON.parse(objUsuario);
      this.codigo = json.codigo;
      console.log('Codigo del get', this.codigo);

      if (this.codigo === 200) {
        console.log(data, 'listado de asuetos');
        this.listado = data;
        this.listadoRespuesta = this.listado.respuesta;
        // this.loadingController.dismiss();
        // this.asuetosLoading();
      } else {
        this.errorAsuetos();
        this.navCtrl.navigateRoot('/caladmin');
      }
    });
  }

  actualizarDatos() {
    this.servicio.getData(API_URL + 'Asuetos').subscribe((data) => {
      this.listado = data;
    });
  }

  buscarAsueto(event: any) {
    console.log(event);
    this.textoBuscar = event.detail.value;

    if (!this.textoBuscar) {
      // revert back to the original array if no query

      return (this.listado.respuesta = this.listadoRespuesta);
    } else {
      this.listado.respuesta = this.listado.respuesta.filter((user: any) => {
        return user.fechaDescripcion.includes(this.textoBuscar);
      });
    }
  }

  atras() {
    this.navCtrl.navigateRoot('/admin');
  }

  nuevoAsueto() {
    console.log('Nuevo Asueto');
    this.navCtrl.navigateRoot('/nuevoasueto');
  }

  eliminarAsueto(fecha: any) {
    this.servicio.deleteAsueto(fecha).subscribe((response: any) => {
      this.mensajerr = response.mensaje;
      if (response.codigo === 200) {
        this.deleteAsueto();
        this.actualizarDatos();
      } else {
        this.errorEliminar();
      }
      console.log(response, 'Eliminar Asueto');
    });
  }

  async mostrarModal() {
    console.log('Mostrar modal');

    const modal = await this.modalCtrl.create({
      component: ModalInfEaPage,
    });
    await modal.present();
  }

  async confirmEliminar(fecha: any) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Desea eliminar el asueto ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Boton de cancelar');
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.eliminarAsueto(fecha);
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteAsueto() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      message: 'Asueto eliminado correctamente',
      duration: 1000,
    });
    await loading.present();

    await loading.dismiss();
  }

  // quitLoading() {
  //   this.loadingController.dismiss();

  // }

  async errorAsuetos() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Error al mostrar asuetos',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async errorEliminar() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: this.mensajerr,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
