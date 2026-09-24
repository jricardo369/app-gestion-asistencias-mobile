import { Injectable, signal, computed, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

export interface Usuario {
  idUsuario: number;
  usuario: string;
  idRol: number;
  nombre: string;
  email?: string;
  telefono?: string;
  sociedad?: string;
  terminos?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstadoUsuarioService {
  private storage = inject(Storage);
  private router = inject(Router);

  private _usuario = signal<Usuario | null>(null);
  private _isLoading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  readonly usuario = this._usuario.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();
  
  readonly isLoggedIn = computed(() => this._usuario() !== null);
  readonly isAdmin = computed(() => this._usuario()?.idRol === 1);
  readonly isUser = computed(() => this._usuario()?.idRol === 2);
  readonly isCoach = computed(() => this._usuario()?.idRol === 3);

  async init() {
    const datos = await this.storage.get('DatosUsuario');
    if (datos?.respuesta) {
      this._usuario.set(datos.respuesta);
    }
  }

  setUsuario(data: any) {
    this._usuario.set(data);
    this._error.set(null);
  }

  setLoading(loading: boolean) {
    this._isLoading.set(loading);
  }

  setError(error: string) {
    this._error.set(error);
  }

  async logout() {
    await this.storage.remove('DatosUsuario');
    this._usuario.set(null);
    this.router.navigate(['/login']);
  }

  getRol() {
    return this._usuario()?.idRol;
  }

  getUsuarioNombre() {
    return this._usuario()?.usuario;
  }
}
