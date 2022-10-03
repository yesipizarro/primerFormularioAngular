import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormularioNuevoComponent } from './formulario-nuevo/formulario-nuevo.component';


@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    FormularioNuevoComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
