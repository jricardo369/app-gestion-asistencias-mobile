export const VERSION_PORTAL = 'Versión 2025.09.27-10:37';
export const EMPRESA_PORTAL = '© / 2025';

var compania = 'lua'; // 'iroda' o 'lua'
var logo: string = 'undefined-image.png';
var logoBlanco: string = 'undefined-image.png';
var fondo: string = 'undefined-image.png';
var avatarh: string = 'undefined-image.png';
var avatarm: string = 'undefined-image.png';

if ('lua' === compania) {
    logo = 'luaLogo.png';
    logoBlanco = 'luaLogoWhite.png';
    fondo = "LUAstudioPhoto.png";
    avatarh = 'avatar-h-lua.png';
    avatarm = 'avatar-m-lua.png';
} else if ('iroda' === compania) {
    logo = 'iiroda.png';
    fondo = "fondoLoginiRoda.jpeg";
    avatarh = 'avatar-h-iroda.png';
    avatarm = 'avatar-m-iroda.png';
}

var urlPro = 'http://3.18.216.78:8080/clock-in-api/';
var urlQas = 'http://ec2-54-176-17-249.us-west-1.compute.amazonaws.com:8080/control_asistencias_api/';
var urlLocal = 'http://localhost:8080/clock-in-api/';
var pro = true;
var qas = false;

/*console.log('es pro? '+pro);
console.log('api pro '+urlPro);

console.log('api qas '+urlQas);
console.log('es qas '+qas);
console.log('api local '+urlLocal);*/

let documentBsaeUriWithoutLanguage = document.baseURI
    .replace("/es/", "")
    .replace("/en/", "");

var API_F = '';
if (pro) {
    API_F = urlPro;
} else {
    API_F = qas ? urlQas : urlLocal;
}
export const LOGO = logo;
export const LOGO_BLANCO = logoBlanco;
export const FONDO = fondo;
export const API_URL = API_F;
export const COMPANIA = compania;
export const AVATARM = avatarm;
export const AVATARH = avatarh;

