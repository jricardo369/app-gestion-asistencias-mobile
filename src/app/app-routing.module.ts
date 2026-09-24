import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./paginas/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'admin',
    loadComponent: () => import('./paginas/admin/admin.page').then(m => m.AdminPage)
  },
  {
    path: 'recuperar',
    loadComponent: () => import('./paginas/recuperar/recuperar.page').then(m => m.RecuperarPage)
  },
  {
    path: 'caladmin',
    loadComponent: () => import('./paginas/caladmin/caladmin.page').then(m => m.CaladminPage)
  },
  {
    path: 'paquetes/:idUsuario/:sociedad',
    loadComponent: () => import('./paginas/paquetes/paquetes.page').then(m => m.PaquetesPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./paginas/perfil/perfil.page').then(m => m.PerfilPage)
  },
  {
    path: 'user',
    loadComponent: () => import('./paginas/user/user.page').then(m => m.UserPage)
  },
  {
    path: 'calalumno',
    loadComponent: () => import('./paginas/calalumno/calalumno.page').then(m => m.CalalumnoPage)
  },
  {
    path: 'clases',
    loadComponent: () => import('./paginas/clases/clases.page').then(m => m.ClasesPage)
  },
  {
    path: 'asuetos',
    loadComponent: () => import('./paginas/asuetos/asuetos.page').then(m => m.AsuetosPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./paginas/registro/registro.page').then(m => m.RegistroPage)
  },
  {
    path: 'crearclase',
    loadComponent: () => import('./paginas/crearclase/crearclase.page').then(m => m.CrearclasePage)
  },
  {
    path: 'editarperfil/:idUsuario/:idRol/:usuario/:sexo/:correoElectronico/:nombre/:telefono/:contrasenia/:estatus/:totalMultas',
    loadComponent: () => import('./paginas/editarperfil/editarperfil.page').then(m => m.EditarperfilPage)
  },
  {
    path: 'editarclase/:idClase/:horaInicio/:horaFin/:horario/:nombre/:profesor/:personas/:estatus/:dia',
    loadComponent: () => import('./paginas/editarclase/editarclase.page').then(m => m.EditarclasePage)
  },
  {
    path: 'nuevoasueto',
    loadComponent: () => import('./paginas/nuevoasueto/nuevoasueto.page').then(m => m.NuevoasuetoPage)
  },
  {
    path: 'crearpaquete/:idUsuario/:sociedad/:idRol',
    loadComponent: () => import('./paginas/crearpaquete/crearpaquete.page').then(m => m.CrearpaquetePage)
  },
  {
    path: 'cambiarpass',
    loadComponent: () => import('./paginas/cambiarpass/cambiarpass.page').then(m => m.CambiarpassPage)
  },
  {
    path: 'clasesalumnos',
    loadComponent: () => import('./paginas/clasesalumnos/clasesalumnos.page').then(m => m.ClasesalumnosPage)
  },
  {
    path: 'asisalumno',
    loadComponent: () => import('./paginas/asisalumno/asisalumno.page').then(m => m.AsisalumnoPage)
  },
  {
    path: 'asistentes/:idClase/:nombre/:profesor/:fechaf/:profesorNombre/:descripcionHorario',
    loadComponent: () => import('./paginas/asistentes/asistentes.page').then(m => m.AsistentesPage)
  },
  {
    path: 'horarios/:fechaf',
    loadComponent: () => import('./paginas/horarios/horarios.page').then(m => m.HorariosPage)
  },
  {
    path: 'horariosadmin/:fechaf/:idUser/:sociedad/:idRol',
    loadComponent: () => import('./paginas/horariosadmin/horariosadmin.page').then(m => m.HorariosadminPage)
  },
  {
    path: 'lugares/:fechaf/:descripcionHorario/:idClase/:asistencia/:lugar/:claseLlena/:isListaEspera',
    loadComponent: () => import('./paginas/lugares/lugares.page').then(m => m.LugaresPage)
  },
  {
    path: 'modal-inf-ea',
    loadComponent: () => import('./paginas/modal-inf-ea/modal-inf-ea.page').then(m => m.ModalInfEaPage)
  },
  {
    path: 'asistenciasusuario',
    loadComponent: () => import('./asistenciasusuario/asistenciasusuario.page').then(m => m.AsistenciasusuarioPage)
  },
  {
    path: 'terminos',
    loadComponent: () => import('./paginas/terminos/terminos.page').then(m => m.TerminosPage)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
