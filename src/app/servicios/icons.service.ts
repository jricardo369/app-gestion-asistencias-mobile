import { Injectable } from '@angular/core';
import { addIcons } from 'ionicons';

@Injectable({
  providedIn: 'root'
})
export class IconsService {

  constructor() {
    this.registerCustomIcons();
  }

  /**
   * Registra todos los íconos personalizados de la aplicación
   * Estos íconos estarán disponibles en toda la app
   */
  private registerCustomIcons(): void {
    try {
      addIcons({
        // Íconos personalizados para LUA
        'add-user-lua': '/assets/icon/add-user-lua.svg',
        'memberships': '/assets/icon/memberships.svg',
        'not-notf': '/assets/icon/not-notf.svg',
        'add-mem': '/assets/icon/add-mem.svg',
        'trash': '/assets/icon/trash.svg',
        'add': '/assets/icon/add.svg',
        'keyreset': '/assets/icon/keyreset.svg',
        'backl': '/assets/icon/backl.svg',  
        'backl2': '/assets/icon/backl2.svg',  
      });
      console.log('Íconos personalizados registrados correctamente');
    } catch (error) {
      console.error('Error al registrar íconos personalizados:', error);
      // Si falla, registrar al menos un ícono básico
      try {
        addIcons({
          'add-user-lua': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyQzE0LjIwOTEgMTIgMTYgMTAuMjA5MSAxNiA4QzE2IDUuNzkwODYgMTQuMjA5MSA0IDEyIDRDOS43OTA4NiA0IDggNS43OTA4NiA4IDhDOCAxMC4yMDkxIDkuNzkwODYgMTIgMTIgMTJaIiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPHBhdGggZD0iTTEyIDE0QzguNjg2MjkgMTQgNiAxNi42ODYzIDYgMjBIMThDMTggMTYuNjg2MyAxNS4zMTM3IDE0IDEyIDE0WiIgZmlsbD0iY3VycmVudENvbG9yIi8+CjxwYXRoIGQ9Ik0yMCAxMFYxNE0yMiAxMkgyME0yMCAxMkgxOCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo='
        });
      } catch (fallbackError) {
        console.error('Error al registrar ícono de respaldo:', fallbackError);
      }
    }
  }

  /**
   * Método para agregar íconos dinámicamente si es necesario
   * @param iconMap - Objeto con nombre del ícono y ruta del SVG
   */
  public addDynamicIcons(iconMap: { [key: string]: string }): void {
    try {
      addIcons(iconMap);
    } catch (error) {
      console.error('Error al agregar íconos dinámicos:', error);
    }
  }
}