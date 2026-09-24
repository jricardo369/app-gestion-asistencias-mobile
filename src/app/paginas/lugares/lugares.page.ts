import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController, IonicModule } from '@ionic/angular/lazy';
import { LoginService } from 'src/app/servicios/login.service';
import { Storage } from '@ionic/storage-angular';
import { LOGO } from 'src/app/app.config';
import { COMPANIA } from 'src/app/app.config';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-lugares',
    templateUrl: './lugares.page.html',
    styleUrls: ['./lugares.page.scss'],
    imports: [
    IonicModule,
    NgClass
]})
export class LugaresPage implements OnInit {

  logo = LOGO;
  compania = COMPANIA;
  fechaf: any;
  descripcionHorario: any;
  idClase: any;
  usuario: any;
  numeroUsuario: any;
  idUsuario: any;
  idRol: any;
  listado: any;
  lapartado: any;
  lugaresServicio: any;
  conGrid: any;
  claseLlena: any;
  mostrarLugares: any;
  listaEspera: any;
  lugar: any;
  horasCancelacion: any;

  lugarSeleccionado: any;

  lugares: any[][] = [
    [
      { numero: 19, seleccionado: false },
      { numero: 20, seleccionado: false },
      { numero: 17, seleccionado: false },
      { numero: 18, seleccionado: false },
    ],
    [
      { numero: 1, seleccionado: false },
      { numero: 2, seleccionado: false },
      { numero: 3, seleccionado: false },
      { numero: 4, seleccionado: false },
    ],
    [
      { numero: 5, seleccionado: false },
      { numero: 6, seleccionado: false },
      { numero: 7, seleccionado: false },
      { numero: 8, seleccionado: false },
    ],
    [
      { numero: 9, seleccionado: false },
      { numero: 10, seleccionado: false },
      { numero: 11, seleccionado: false },
      { numero: 12, seleccionado: false },
    ],
    [
      { numero: 13, seleccionado: false },
      { numero: 14, seleccionado: false },
      { numero: 15, seleccionado: false },
      { numero: 16, seleccionado: false },
    ],
  ];

  constructor(private cdr: ChangeDetectorRef, 
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
    private servicio: LoginService,
    private storage: Storage
  ) {
   
    this.storage.get('DatosUsuario').then((data) => {
      this.usuario = data;
      console.log('user :', data);

      console.log('El usuario en LUGARES es :', this.usuario.respuesta.nombre);
      console.log('El ID del usuario es  :', this.usuario.respuesta.idUsuario);
      console.log('El Rol del usuario es : ', this.usuario.respuesta.idRol);
      console.log('El estatus del usuario es:', this.usuario.respuesta.estatus);

      this.numeroUsuario = this.usuario.respuesta.idUsuario;
      this.idRol = this.usuario.respuesta.idRol;
    });
  }

  ngOnInit() {
    this.loadingInicio();

    this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf');
    this.descripcionHorario =
      this.activatedRoute.snapshot.paramMap.get('descripcionHorario');
    this.idClase = this.activatedRoute.snapshot.paramMap.get('idClase');
    this.lugar = this.activatedRoute.snapshot.paramMap.get('lugar');
    this.mostrarLugares = 'true';
    this.listaEspera = this.activatedRoute.snapshot.paramMap.get('isListaEspera');
    this.conGrid = this.activatedRoute.snapshot.paramMap.get('asistencia');

    this.claseLlena = this.activatedRoute.snapshot.paramMap.get('claseLlena');
    
    if (this.claseLlena === 'true') {
      this.mostrarLugares = 'false';
    }

    this.servicio.getLugares(this.idClase, this.fechaf).subscribe((data) => {
      console.log(data);
      let objUsuario = JSON.stringify(data);
      let json = JSON.parse(objUsuario);
      if (json.codigo === 200) {
        // this.loadingController.dismiss();

        // this.lugaresLoading();

        this.listado = data;
      this.cdr.detectChanges();

        console.log('listado de lugares apartados ', this.listado.respuesta);

        let arr = [];

        var l1 = this.listado.respuesta.l5;
        var l2 = this.listado.respuesta.l4;
        var l3 = this.listado.respuesta.l3;
        var l4 = this.listado.respuesta.l2;
        var l5 = this.listado.respuesta.l1;

        console.log('l5', l5);
        console.log('Tamaño de l5:', l5 ? l5.length : 0);

        arr.push(l1);
        arr.push(l5);
        arr.push(l4);
        arr.push(l3);
        arr.push(l2);
        this.lugaresServicio = arr;
        console.log('lapartado' + this.lapartado);
        console.log('arr' + l5.lenght);
        // this.lapartado = this.listado.respuesta[0].seleccionado;
        
      }

      this.servicio.configPostHorasCancelacion('HORAS-PERMITIDAS-CANCELACION').subscribe((response: any) => {
        this.horasCancelacion = response.respuesta[0].valorAbajo;
        console.log('hc:'+this.horasCancelacion);
      });
    });
  }

  regresar() {
    this.navCtrl.navigateRoot('/horarios/' + this.fechaf);
  }

  async apartarLugarLUA(lugar: any) {
    console.log('lugar' + lugar);
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message:
        'Seguro que desea apartar el lugar ' +
        lugar +
        ' ? ' +
        ',de la clase de ' +
        this.descripcionHorario +
        ' del dia ' +
        this.fechaf,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Boton de cancelar');
          }},
        {
          text: 'Aceptar',
          handler: () => {
            //this.lugarApartado();
            this.asistir(lugar);
            this.navCtrl.navigateRoot('/calalumno');
            // this.eliminarAsueto(fecha);
          }},
      ]});
    await alert.present();
  }

  async apartarLugarIroda(lugar: any) {
    console.log('lugar' + lugar.numero);
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message:
        'Seguro que desea apartar el lugar ' +
        lugar.numero +
        ' ? ' +
        ',de la clase de ' +
        this.descripcionHorario +
        ' del dia ' +
        this.fechaf,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Boton de cancelar');
          }},
        {
          text: 'Aceptar',
          handler: () => {
            //this.lugarApartado();
            this.asistir(lugar.numero);
            this.navCtrl.navigateRoot('/calalumno');
            // this.eliminarAsueto(fecha);
          }},
      ]});
    await alert.present();
  }

  async eliminarAsistencia() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message:
        'Seguro que desea eliminar su asistencia ? ' +
        ',de la clase de ' +
        this.descripcionHorario +
        ' del dia ' +
        this.fechaf,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Boton de cancelar');
          }},
        {
          text: 'Aceptar',
          handler: () => {
            //this.lugarApartado();
            this.eliminar();
            this.navCtrl.navigateRoot('/calalumno');
            // this.eliminarAsueto(fecha);
          }},
      ]});
    await alert.present();
  }

  async agregarListaEspera() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message:
        'Seguro que desea agregar a lista espera ? ' +
        ',de la clase de ' +
        this.descripcionHorario +
        ' del dia ' +
        this.fechaf,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Boton de cancelar');
          }},
        {
          text: 'Aceptar',
          handler: () => {
            //this.lugarApartado();
            this.agregarListaEsperaAClase();
            this.navCtrl.navigateRoot('/calalumno');
            // this.eliminarAsueto(fecha);
          }},
      ]});
    await alert.present();
  }

  async eliminarListaEspera() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message:
        'Seguro que desea eliminar a lista espera ? ' +
        ',de la clase de ' +
        this.descripcionHorario +
        ' del dia ' +
        this.fechaf,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Boton de cancelar');
          }},
        {
          text: 'Aceptar',
          handler: () => {
            //this.lugarApartado();
            this.eliminarListaEsperaAClase();
            this.navCtrl.navigateRoot('/calalumno');
            // this.eliminarAsueto(fecha);
          }},
      ]});
    await alert.present();
  }

  asistir(lugar: any) {
    console.log('fecha asistir:' + this.fechaf);
    this.servicio
      .asistenciaAlumno(this.idClase, this.numeroUsuario, this.fechaf, lugar)
      .subscribe((response: any) => {
        // this.mensaje = response.respuesta;
        // this.mensajeerror = response.descripcion;
        if (response.codigo === 200) {
          console.log(response, 'Asistencia apartada');
          // this.agregadoAlert();
          console.log('id de la Clase ' + this.idClase);
          console.log('Id de usuario ' + this.numeroUsuario);
          console.log('Fecha apartado ' + this.fechaf);
          console.log('Lugar apartado ' + this.lugarSeleccionado);
          this.lugarApartado(response.respuesta);
          // this.obtenerDatos();
        } else {
          // this.usuarioEnclase();
          this.lugarApartado(response.descripcion);
        }
      });
  }

  agregarListaEsperaAClase() {
    console.log('Agregar lista espera:' + this.lugar);
    this.servicio
      .agregarListaEspera(this.idClase, this.numeroUsuario, this.fechaf)
      .subscribe((response: any) => {
        // this.mensaje = response.respuesta;
        // this.mensajeerror = response.descripcion;
        if (response.codigo === 200) {
          console.log(response, 'Se agrego lista espera');
          this.lugarApartado(response.respuesta);
        } else {
          this.lugarApartado(response.descripcion);
        }
      });
  }

  eliminarListaEsperaAClase() {
    console.log('Agregar lista espera:' + this.lugar);
    this.servicio
      .eliminarListaEspera(this.idClase, this.numeroUsuario, this.fechaf)
      .subscribe((response: any) => {
        // this.mensaje = response.respuesta;
        // this.mensajeerror = response.descripcion;
        if (response.codigo === 200) {
          console.log(response, 'Asistencia eliminada');
          this.lugarApartado(response.respuesta);
        } else {
          this.lugarApartado(response.descripcion);
        }
      });
  }


  eliminar() {
    console.log('Eliminar asistencia:' + this.lugar);
    this.servicio
      .eliminarAsistenciaAlumno(this.idClase, this.numeroUsuario, this.fechaf)
      .subscribe((response: any) => {
        // this.mensaje = response.respuesta;
        // this.mensajeerror = response.descripcion;
        if (response.codigo === 200) {
          console.log(response, 'Asistencia eliminada');
          this.lugarApartado(response.respuesta);
        } else {
          this.lugarApartado(response.descripcion);
        }
      });
  }

  async lugarApartado(mensaje: any) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: mensaje,
      buttons: ['OK']});

    await alert.present();
  }

  async lugaresLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      message: 'Cargando lugares',
      // duration: 3000
    });
    await loading.present();

    await loading.dismiss();
    // const { role, data } = await loading.onDidDismiss();
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

  // Función para verificar si un lugar específico está seleccionado
  isLugarSeleccionado(numeroLugar: number): boolean {
    // Aquí puedes implementar la lógica para verificar si el lugar está seleccionado
    // Por ejemplo, verificar en this.listado o en algún array de lugares seleccionados
    if (this.listado && this.listado.respuesta) {
      // Lógica para verificar el estado del lugar según los datos del servicio
      return false; // Cambiar por la lógica real
    }
    return this.lugarSeleccionado === numeroLugar;
  }

  // Función para verificar si un lugar específico está ocupado
  isLugarOcupado(numeroLugar: number): boolean {
    // Aquí puedes implementar la lógica para verificar si el lugar está ocupado
    // Por ejemplo, verificar en this.lugaresServicio o en this.listado
    if (this.lugaresServicio && this.lugaresServicio.length > 0) {
      // Buscar en el array de lugares del servicio
      for (let fila of this.lugaresServicio) {
        if (fila && fila.length > 0) {
          for (let lugar of fila) {
            if (lugar.numero === numeroLugar && lugar.seleccionado === true) {
              return true; // El lugar está ocupado
            }
          }
        }
      }
    }
    return false; // El lugar no está ocupado
  }
}
