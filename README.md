# LUA Studio / iRoda — App Ionic + Angular

App móvil híbrida para gestión de clases, asistencias, alumnos, paquetes, horarios y usuarios de estudios de indoor cycling (marca configurable: `lua` / `iroda`).
El backend es una API REST externa (`clock-in-api` / `control_asistencias_api`).

> Versión portal actual: ver `VERSION_PORTAL` en `src/app/app.config.ts`.

---

## 1. Stack técnico

| Tecnología | Versión (ver `package.json`) |
|---|---|
| Angular | `^22.1.3` (`@angular/cli ^22.1.3`, `@angular-devkit/build-angular ^22.1.3`, `@angular/build ^22.1.5`) |
| Ionic Angular | `^9.0.0` (`@ionic/angular-toolkit ^13.0.0`) |
| Ionicons | `^8.1.0` |
| Cordova (integración activa) | `cordova-android ^14.0.1`, `cordova-ios ^7.1.1` + plugins: `device`, `splashscreen`, `statusbar`, `ionic-webview`, `ionic-keyboard` |
| Capacitor (instalado, deshabilitado en `ionic.config.json`) | core/cli `5.3.0`, plugins `app/keyboard/status-bar/haptics 5.x` |
| Storage local | `@ionic/storage-angular ^4.0.0` |
| RxJS / Zone / TS | `rxjs ~7.8.0`, `zone.js ^0.16.0`, `typescript ~6.0.3` |
| Calidad / Tests | ESLint 9 + `angular-eslint 22`, Karma + Jasmine |
| Salida de build web | `www/` (ver `angular.json` → `outputPath.base: www`) |
| ID Cordova | `com.luastudio.vjtech`, versión `1.0.31` (ver `config.xml`) |

Node verificado en este proyecto: **Node v22.23.2 + npm 10.9.8**.

---

## 2. Contenido del proyecto

```
.
├── angular.json            # Proyecto "app": build/serve/test/lint + targets ionic-cordova-build/serve
├── ionic.config.json       # name: "LUA Studio", type: angular, capacitor deshabilitado, cordova activo
├── capacitor.config.ts     # appName LUA Studio, webDir: www (solo si se migra a Capacitor)
├── config.xml              # Config Cordova: id, versión, iconos/splash, plugins, network_security_config Android
├── resources/              # Iconos y splash Android/iOS + android/xml/network_security_config.xml
├── platforms/              # Plataformas Cordova generadas (android/ios) — no editar a mano
├── www/                    # Salida compilada web (generado por ng build)
├── src/
│   ├── main.ts / polyfills.ts / zone-flags.ts
│   ├── index.html
│   ├── global.scss + theme/variables.scss
│   ├── assets/icon|img/    # Logos lua/iroda, fondos, avatares
│   ├── environments/       # environment.ts (dev) / environment.prod.ts (prod, fileReplacements)
│   └── app/
│       ├── app.config.ts           # ★ Config principal: COMPANIA, LOGO, FONDO, AVATARES, API_URL
│       ├── app-routing.module.ts   # 30+ rutas con loadComponent (lazy loading)
│       ├── app.component.*         # Shell raíz
│       ├── home/                   # Página home
│       ├── asistenciasusuario/     # Asistencias por usuario
│       ├── pipes/                  # FiltroPipe, BuscarPipe
│       ├── servicios/
│       │   ├── login.service.ts          # Llamadas API: Usuarios, Clases, AsistenciaClases,
│       │   │                             # Inscripciones, Asuetos, lista-espera, multas, login
│       │   ├── estado-usuario.service.ts # Estado global con Signals + Ionic Storage + rol
│       │   └── icons.service.ts
│       └── paginas/ (25 páginas standalone)
│           ├── login, registro, recuperar, cambiarpass, terminos
│           ├── admin, user, perfil, editarperfil
│           ├── clases, crearclase, editarclase, clasesalumnos
│           ├── caladmin, calalumno, horarios, horariosadmin, lugares
│           ├── asistentes, asisalumno, asuetos, nuevoasueto
│           ├── paquetes, crearpaquete
│           └── modal-inf-ea
├── karma.conf.js / tsconfig*.json / eslint.config.js
├── ci_post_clone.sh        # Script Xcode Cloud: npm ci + ionic cordova build ios + pod install
├── mejoras.md              # Roadmap y deuda técnica (403 any, Signals, interceptor, strict, tests, PWA)
└── .github/                # Workflows CI (si aplica)
```

### Rutas principales (`src/app/app-routing.module.ts`)

`'' → /login`, `/home`, `/login`, `/registro`, `/recuperar`, `/cambiarpass`, `/terminos`,
`/admin`, `/user`, `/perfil`, `/editarperfil/...`,
`/clases`, `/crearclase`, `/editarclase/...`, `/clasesalumnos`,
`/caladmin`, `/calalumno`, `/horarios/:fechaf`, `/horariosadmin/...`, `/lugares/...`,
`/asistentes/...`, `/asisalumno`, `/asistenciasusuario`,
`/asuetos`, `/nuevoasueto`, `/paquetes/:idUsuario/:sociedad`, `/crearpaquete/...`, `/modal-inf-ea`.

### Backend / API

La URL se elige en `src/app/app.config.ts`:

```ts
var compania = 'lua'; // 'iroda' o 'lua'
var urlPro = 'http://3.18.216.78:8080/clock-in-api/';
var urlQas = 'http://ec2-54-176-17-249.us-west-1.compute.amazonaws.com:8080/control_asistencias_api/';
var urlLocal = 'http://localhost:8080/clock-in-api/';
var pro = true; var qas = false;
```

`API_URL` resultante se importa en `LoginService`. Cambia `pro/qas` o las URLs según ambiente.
Ese mismo archivo define logos/fondo/avatares por compañía (`LOGO`, `FONDO`, `AVATARH`, `AVATARM`).

---

## 3. Requisitos previos

1. **Node.js LTS 22.x + npm 10.x** (versión usada aquí: Node 22.23.2).
   - NVM recomendado: `nvm install 22 && nvm use 22`.
2. **Angular CLI 22 + Ionic CLI**:
   ```bash
   npm install -g @angular/cli@22 @ionic/cli cordova-res
   ```
3. **Solo Android**: Java JDK 17, Android Studio (SDK + Platform-Tools), `ANDROID_HOME`/`ANDROID_SDK_ROOT` configurados, Gradle (lo descarga Cordova).
4. **Solo iOS (requiere macOS + Xcode)**: Xcode vigente, Command Line Tools, CocoaPods:
   ```bash
   sudo gem install cocoapods
   ```
5. Backend accesible (por defecto `http://3.18.216.78:8080/clock-in-api/`). Si usas `http://` en Android 9+, ya existe `resources/android/xml/network_security_config.xml` enlazado en `config.xml`.

Verifica con:

```bash
node --version && npm --version
ng version
ionic --version
```

---

## 4. Instalación (desde cero)

```bash
# 1. Clonar y entrar
git clone <URL_DEL_REPO>.git
cd iRodaActualizadoAngularYIonic

# 2. Instalar dependencias (usa package-lock.json)
npm ci
# alternativa si quieres actualizar: npm install

# 3. Levantar en navegador
npm start
# o: ionic serve
# abre http://localhost:8100/
```

---

## 5. Scripts disponibles (`package.json`)

| Comando | Qué hace |
|---|---|
| `npm start` | `ng serve` — dev server web |
| `npm run build` | `ng build` — build producción a `www/` (defaultConfiguration: production) |
| `npm run watch` | `ng build --watch --configuration development` |
| `npm test` | `ng test` — Karma + Jasmine (requiere Chrome) |
| `npm run lint` | `ng lint` — ESLint sobre `src/**/*.ts` y `*.html` |

Comandos útiles adicionales:

```bash
# Build dev explícito / prod explícito
ng build --configuration development
ng build --configuration production

# Tests en modo CI (sin watch)
ng test --watch=false --browsers=ChromeHeadless

# Ionic en navegador con live-reload
ionic serve
```

---

## 6. Compilar la app

### 6.1 Web (PWA / hosting estático)

```bash
npm run build
# salida en www/
# previsualizar: npx http-server www -p 8080
```

### 6.2 Android (Cordova — vía Ionic)

```bash
# Primera vez: añadir plataforma (ya existe carpeta platforms/, normalmente no hace falta)
ionic cordova platform add android

# Debug en dispositivo/emulador
ionic cordova run android

# Release prod (APK/AAB según cordova-android 14)
ionic cordova build android --prod --release
```

Requisitos: Android Studio + SDK, Java 17, dispositivo con depuración USB o emulador creado.

### 6.3 iOS (Cordova — requiere macOS)

```bash
ionic cordova platform add ios
ionic cordova build ios --prod --release
# luego abrir platforms/ios/*.xcworkspace en Xcode para firmar y archivar
# instalar pods si falla la compilación:
cd platforms/ios && pod install --repo-update && cd ../..
```

El repo incluye `ci_post_clone.sh` para **Xcode Cloud**, que hace exactamente:

```bash
npm ci
ionic cordova build ios --prod --release
cd platforms/ios && gem install cocoapods --user-install && pod install --repo-update
```

### 6.4 Capacitor (opcional — actualmente deshabilitado)

`ionic.config.json` tiene `capacitor.enabled: false`. Para migrar:

```bash
# habilitar capacitor en ionic.config.json, luego:
npm run build
npx cap sync
npx cap open android
npx cap open ios
```

---

## 7. Configuración por ambiente

| Qué | Dónde | Cómo |
|---|---|---|
| URL del API + marca (`lua`/`iroda`) + logos | `src/app/app.config.ts` | Edita `compania`, `pro/qas`, `urlPro/urlQas/urlLocal` |
| Flag `production` | `src/environments/environment.ts` vs `environment.prod.ts` | `angular.json` hace `fileReplacements` en build prod |
| Budgets, hashing, sourcemaps | `angular.json` → `projects.app.architect.build.configurations` | `production` optimizado; `development` sin optimización + sourcemaps |
| Permisos, iconos, splash, plugins | `config.xml` + `resources/` | Regenera con `cordova-res` si cambias iconos |
| Browsers soportados | `.browserslistrc` | `baseline widely available on 2026-05-07` |
| Strict TS | `tsconfig.json` (`strict: true`, `strictTemplates: true`, etc.) | Mantener en `true` |

---

## 8. Solución de problemas

| Síntoma | Causa probable / fix |
|---|---|
| `ERR_OSSL_EVP_UNSUPPORTED` en build | Node muy nuevo con webpack viejo → usa Node 22 (este repo) o `NODE_OPTIONS=--openssl-legacy-provider` |
| `ng: command not found` | Instala CLI global o usa `npx ng ...` |
| `ionic cordova build` falla en Android | Falta JDK 17 / `ANDROID_HOME` / SDK licenses → `sdkmanager --licenses`, revisa `java -version` |
| `pod install` falla en iOS | CocoaPods desactualizado → `sudo gem install cocoapods && pod repo update` |
| Pantalla blanca en APK con API `http://` | Cleartext bloqueado → ya cubierto por `network_security_config.xml`; verifica que el `edit-config` de `config.xml` se aplicó |
| CORS / `access origin` | `config.xml` tiene `<access origin="*" />`; en web dev el backend debe permitir CORS |
| `npm ci` falla | Borra `node_modules` + `package-lock` corrupto → `rm -rf node_modules && npm install` |
| Tests no abren Chrome | Instala Chrome o usa `CHROME_BIN=$(which chromium) ng test --browsers=ChromeHeadless` |

---

## 9. Estado y roadmap

Ver `mejoras.md` para el plan pendiente: tipar los ~403 `any`, migrar todo a Signals, eliminar `FiltroPipe`/`BuscarPipe`, crear interceptor HTTP, tests reales, PWA con Service Workers y `@defer`.

Historial reciente (según `mejoras.md`): migración Angular 16→19 e Ionic 7→8, Standalone Components, Control Flow `@if/@for`, eliminación de 27 NgModules, `loadComponent` en routing, login + `EstadoUsuarioService` con Signals.
