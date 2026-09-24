import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, AlertController, IonicModule } from '@ionic/angular/lazy';
import { Storage } from '@ionic/storage-angular';
import { LoginService } from 'src/app/servicios/login.service';
import { API_URL } from 'src/app/app.config';
import { COMPANIA } from 'src/app/app.config';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-horariosadmin',
    templateUrl: './horariosadmin.page.html',
    styleUrls: ['./horariosadmin.page.scss'],
    imports: [
        IonicModule,
        NgClass,
    ]})
export class HorariosadminPage implements OnInit {

  compania = COMPANIA;
  listado: any;
  usuario: any;
  idClase: any;
  fechaf: any;
  codigo: any;
  idrol: any;
  idEntrenador: any;
  bloq: any;
  idUser: any;
  sociedad: any;
  nombreProf: any;
  estatus: any;
  numeroProfesor: any;
  rolId: any;

  constructor(
    private servicio: LoginService,
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private cdr: ChangeDetectorRef,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.storage.get('DatosUsuario').then((user) => {
      this.usuario = user;
    });
  }

  ngOnInit() {
    this.horariosLoading();
    this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf');
    this.idUser = this.activatedRoute.snapshot.paramMap.get('idUser');
    this.rolId = this.activatedRoute.snapshot.paramMap.get('idRol');
    this.sociedad = this.activatedRoute.snapshot.paramMap.get('sociedad');
    console.log('idrol:' + this.rolId);

    if (this.rolId == 3) {
      this.servicio
        .getData(
          API_URL +
            'Clases' +
            '/por-fecha/profesor/' +
            this.fechaf +
            '/' +
            this.idUser +
            '?sociedad=' +
            this.sociedad
        )
        .subscribe((data) => {
          let objUsuario = JSON.stringify(data);
          let json = JSON.parse(objUsuario);
          this.codigo = json.codigo;
          console.log(objUsuario, 'objUsuario');

          if (this.codigo === 200) {
            console.log(data, 'listado de clases');
            this.loadingController.dismiss();
            this.listado = data;
      this.cdr.detectChanges();
            console.log(this.fechaf, 'fecha del ngoninit');
          } else {
            this.errorClases();
            this.navCtrl.navigateRoot('/caladmin');
          }
        });
    }

    if (this.rolId == 1) {
      this.servicio
        .getData(
          API_URL +
            'Clases/activas-para-admin/' +
            this.fechaf +
            '?sociedad=' +
            this.sociedad
        )
        .subscribe((data) => {
          let objUsuario = JSON.stringify(data);
          let json = JSON.parse(objUsuario);
          this.codigo = json.codigo;
          //console.log(objUsuario, "objUsuario");

          if (this.codigo === 200) {
            console.log(data, 'listado de clases');
            this.loadingController.dismiss();
            this.listado = data;
      this.cdr.detectChanges();
            console.log(this.fechaf, 'fecha del ngoninit');
          } else {
            this.errorClases();
            this.navCtrl.navigateRoot('/caladmin');
          }
        });
    }
  }

  atras() {
    this.navCtrl.navigateBack('/caladmin');
  }

  async horariosLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      message: 'Cargando clases'});
    await loading.present();
    // const { role, data } = await loading.onDidDismiss();
    await loading.dismiss();
  }

  async errorClases() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Error al mostrar las clases',
      buttons: ['OK']});

    await alert.present();
  }
}
