import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { GifsModule } from './gifs/gifs.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

import localeEsHN from '@angular/common/locales/es-HN';
import localeEsCO from '@angular/common/locales/es-CO';
import localeFrCA from '@angular/common/locales/fr-CA';

import {registerLocaleData} from '@angular/common'

registerLocaleData(localeEsHN);
registerLocaleData(localeFrCA);
registerLocaleData(localeEsCO);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GifsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'en-US'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
