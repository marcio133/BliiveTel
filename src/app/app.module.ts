import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { StorageService } from './_services/storage.service';
import { CalcRateService } from './_services/calc-rate.service';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HistoricComponent } from './historic/historic.component';
import { DataTableModule } from 'angular5-data-table';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HistoricComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    DataTableModule.forRoot()
  ],
  providers: [CalcRateService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
