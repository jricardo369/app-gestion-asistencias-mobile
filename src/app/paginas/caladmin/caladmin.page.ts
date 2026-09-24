import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, IonicModule } from '@ionic/angular/lazy';
import { Storage } from '@ionic/storage-angular';
import { LOGO } from 'src/app/app.config';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-caladmin',
    templateUrl: './caladmin.page.html',
    styleUrls: ['./caladmin.page.scss'],
    imports: [IonicModule, FormsModule]})
export class CaladminPage implements OnInit {

  logo: string = LOGO;
  date: any;
  fechacal: any;
  fechaf: any;
  fecha: any;
  idUser: any;
  sociedad: any;
  idRol: any;

  usuario: any;

  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    private storage: Storage,
    private cdr: ChangeDetectorRef,
    private loadingController: LoadingController
  ) {
    this.storage.get('DatosUsuario').then((user) => {
      this.usuario = user;
      console.log('Datos del usuario en caladmin:', this.usuario);
      this.idUser = this.usuario.respuesta.idUsuario;
      this.sociedad = this.usuario.respuesta.sociedad;
      this.idRol = this.usuario.respuesta.idRol;
      console.log('ID del usuario en caladmin', this.idUser);
    });
  }

  ngOnInit() {
    this.loadingInicio();
  }

  fechaSeleccionada(date: any) {
    this.fechaf = this.date.substring(0, 10);

    console.log('cambios pendientes');

    console.log('Click en fecha ', this.fechaf);

    this.navCtrl.navigateRoot(
      '/horariosadmin/' +
        this.fechaf +
        '/' +
        this.idUser +
        '/' +
        this.sociedad +
        '/' +
        this.idRol
    );
  }

  onClick(date: any, fechaf: string) {
    this.fechacal = this.date.substring(0, 10);

    this.navCtrl.navigateRoot(
      '/horariosadmin/' +
        fechaf +
        '/' +
        this.idUser +
        '/' +
        this.sociedad +
        '/' +
        this.idRol
    );
    console.log(fechaf);
  }

  async loadingInicio() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      message: 'Cargando',
      duration: 700});
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
}
