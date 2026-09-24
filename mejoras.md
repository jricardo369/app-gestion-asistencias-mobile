# Mejoras para la Aplicación iRoda

## Estado Actual

- **Angular**: 19.2.20 (última versión) ✅
- **Ionic**: 8.8.1 (última versión) ✅
- **Standalone Components**: ✅ Implementado
- **Control Flow Syntax**: ✅ Implementado (@if, @for)
- **NgModules**: ✅ Eliminados (27 módulos de páginas)
- **Imports limpiados**: ✅ Comentarios y imports no usados eliminados
- **Signals**: ✅ Parcialmente implementado (Login + EstadoUsuarioService)

---

## 🔴 Alta Prioridad

### 1. Definir Interfaces/Tipos

**Problema**: 403 usos de `any` en el código.

**Solución**: Crear interfaces para las respuestas de la API.

```typescript
// Ejemplo: interfaces/user.interface.ts
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: 'admin' | 'user' | 'coach';
}

export interface Clase {
  idClase: number;
  nombre: string;
  profesor: string;
  horario: 'M' | 'V';
  lugaresDisponibles: number;
}
```

### 2. Migrar más Componentes a Signals

**Problema**: Solo login usa Signals.

**Solución**: Migrar los demás componentes que manejan estado.

### 3. Eliminar Pipes Personalizados

**Problema**: `FiltroPipe` y `BuscarPipe` pueden ser reemplazados por métodos en TypeScript.

**Solución**: Eliminar los pipes y usar `.filter()` y `.find()` directamente.

---

## 🟡 Media Prioridad

### 4. Crear Interceptor HTTP

**Problema**: Manejo de errores y tokens repetido en cada servicio.

**Solución**: Centralizar en un interceptor.

```typescript
// src/app/interceptors/auth.interceptor.ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Agregar token automáticamente
    // Manejar errores globalmente
  }
}
```

### 5. Habilitar Strict Mode

**Problema**: TypeScript sin restricciones estrictas.

**Solución**: En `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### 6. Agregar Tests Unitarios

**Problema**: Archivos `.spec.ts` vacíos o básicos.

**Solución**: Implementar tests con Jasmine/Karma o migrar a Jest.

---

## 🟢 Baja Prioridad

### 7. Optimizar Imágenes

- Comprimir assets en `src/assets`
- Usar formatos modernos (WebP, AVIF)
- Implementar lazy loading de imágenes

### 8. Agregar Service Workers (PWA)

**Solución**: Hacer la app instalable y funcional offline.

```bash
ng add @angular/pwa
```

### 9. Usar @defer para Lazy Loading

**Problema**: Las páginas ya tienen lazy loading, pero se puede mejorar el rendimiento con `@defer`.

```html
@defer (on viewport) {
  <app-heavy-component />
} @placeholder {
  <skeleton-loader />
}
```

### 10. Implementar Error Handling Global

**Solución**: Crear un servicio de manejo de errores y un componente de error boundary.

### 11. Documentar el Código

**Solución**: Agregar JSDoc a los servicios y métodos públicos.

---

## Historial de Cambios Realizados

| Fecha | Cambio |
|-------|--------|
| 2026-03-14 | Actualizado Angular 16 → 19 |
| 2026-03-14 | Actualizado Ionic 7 → 8 |
| 2026-03-14 | Migrado a Standalone Components |
| 2026-03-14 | Migrado a Control Flow (@if, @for) |
| 2026-03-14 | Eliminados 27 NgModules |
| 2026-03-14 | Actualizado app-routing a loadComponent |
| 2026-03-14 | Limpiados imports no usados |
| 2026-03-14 | Migrado login.page.ts a Signals |
| 2026-03-14 | Creado EstadoUsuarioService con Signals |

---

## Métricas de Progreso

| Mejora | Estado | Prioridad |
|--------|--------|-----------|
| Angular 19 | ✅ Hecho | - |
| Ionic 8 | ✅ Hecho | - |
| Standalone Components | ✅ Hecho | - |
| Control Flow (@if, @for) | ✅ Hecho | - |
| Eliminar NgModules | ✅ Hecho | - |
| Limpiar Imports | ✅ Hecho | - |
| Migrar a Signals | ✅ Parcial | Media |
| Definir Interfaces | ⏳ Pendiente | Alta |
| Eliminar Pipes | ⏳ Pendiente | Alta |
| Interceptor HTTP | ⏳ Pendiente | Media |
| Strict Mode | ⏳ Pendiente | Media |
| Tests Unitarios | ⏳ Pendiente | Media |
| PWA | ⏳ Pendiente | Baja |
| Documentación | ⏳ Pendiente | Baja |
