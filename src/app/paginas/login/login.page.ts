import { Component, OnInit, signal } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  IonicModule,
} from '@ionic/angular/lazy';
import { LoginService } from 'src/app/servicios/login.service';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { API_URL } from 'src/app/app.config';
import { LOGO } from 'src/app/app.config';
import { LOGO_BLANCO } from 'src/app/app.config';
import { COMPANIA } from 'src/app/app.config';
import { FONDO } from 'src/app/app.config';
import { EstadoUsuarioService } from 'src/app/servicios/estado-usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  login = signal({
    usuario: '',
    contrasenia: '',
  });

  compania: string = COMPANIA;
  logo: string = LOGO;
  logoBlanco: string = LOGO_BLANCO;
  fondo: string = FONDO;
  
  mensaje = signal<any>(null);
  Rol = signal<any>(null);
  usuario = signal<any>(null);
  terminos = signal<any>(null);
  codigo = signal<any>(null);

  submitted = false;

  constructor(
    private servicio: LoginService,
    private loadingController: LoadingController,
    private storage: Storage,
    private navCtrl: NavController,
    public alertController: AlertController,
    private estadoUsuario: EstadoUsuarioService
  ) {}

  onLogin(form: NgForm) {
    const currentLogin = this.login();
    let obj = {
      usuario: currentLogin.usuario,
      contrasenia: currentLogin.contrasenia,
    };
    this.submitted = true;

    if (form.valid) {
      this.servicio.loginPost(obj).subscribe((response: any) => {
        let data = response;
        this.storage.set('DatosUsuario', data);
        this.codigo.set(response.codigo);

        if (response.codigo == 200) {
          this.mensaje.set(response.mensaje);
          this.Rol.set(response.respuesta.idRol);
          this.usuario.set(response.respuesta.usuario);
          this.terminos.set(response.respuesta.terminos);

          this.estadoUsuario.setUsuario(response.respuesta);
          this.presentLoading();

          if (this.Rol() === 1) {
            this.navCtrl.navigateRoot('/admin');
          } else if (this.Rol() === 2) {
            if(this.terminos() === 'aceptados'){
              this.navCtrl.navigateRoot('/admin');
            }else{
              this.navCtrl.navigateRoot('/terminos');
            }
            this.clearForm();
          } else if (this.Rol() === 3) {
            this.navCtrl.navigateRoot('/admin');
            this.clearForm();
          }

          if (this.Rol() === null) {
            this.clearForm();
          }
        } else if (response.codigo === 500) {
          this.errorLogin(response.descripcion);
        }
      });
    } else {
      this.todoslosCampos();
    }
  }

  async errorLogin(msj: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async todoslosCampos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Todos los campos son necesarios',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      translucent: true,
      message: 'Bienvenido' + ' ' + this.usuario(),
      duration: 1000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async Loadingdatosinc(msj: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }

  clearForm() {
    this.login.set({ contrasenia: '', usuario: '' });
  }

  async showAlert(msj: any) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: msj,
      buttons: ['Aceptar'],
    });
    alert.present();
  }

  async userDesactivado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atencion !',
      message: 'Usuario desactivado, contactate con el administrador.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {
    this.estadoUsuario.init();
    this.storage.get('DatosUsuario').then((data) => {
      this.usuario.set(data);
      if (data !== null) {
        if (data.respuesta.idRol === 1) {
          this.navCtrl.navigateRoot('/admin');
        }

        if (data.respuesta.idRol === 2) {
          if(data.respuesta.terminos === 'aceptados'){
            this.navCtrl.navigateRoot('/admin');
          }else{
            this.navCtrl.navigateRoot('/terminos');
          }
        } else if (data.respuesta.idRol === 2) {
          this.bloqueado(data.respuesta.idUsuario);
        }
      }
    });
  }

  recuperar() {
    this.navCtrl.navigateRoot('/recuperar');
  }

  bloqueado(usuario: any) {
    this.servicio
      .getData(
        API_URL + 'Usuarios/bloqueo-por-pago/' + usuario
      )
      .subscribe((data: any) => {
        this.usuario.set(data);

        if (this.usuario()?.codigo === 500) {
          this.storage.clear();
          this.navCtrl.navigateRoot('/login');
          this.msjBloqueado(this.usuario()?.descripcion);
        } else {
          this.servicio.getUsuario(usuario).subscribe((response: any) => {
            this.terminos.set(response.respuesta[0].terminos);
            if(this.terminos() === 'aceptados'){
              this.navCtrl.navigateRoot('/admin');
            }else{
              this.navCtrl.navigateRoot('/terminos');
            }
          });
        }
      });

    return;
  }

  async msjBloqueado(descripcion: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atencion !',
      message: descripcion,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
