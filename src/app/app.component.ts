import { Component } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular/lazy';
import { HttpClientModule } from '@angular/common/http';
import { COMPANIA } from './app.config';
import { IconsService } from './servicios/icons.service';
import { LoginService } from './servicios/login.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonicModule, HttpClientModule]
})
export class AppComponent {
  compania = COMPANIA;

  constructor(
    private storage: Storage,
    private iconsService: IconsService
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }
}
