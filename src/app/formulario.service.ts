import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ICliente {
  nombre: string;
  edad: number;
  cedula: string;
}

export interface IFormulario {
  nombre: string;
  cedula: string;
  edad: number;
  correo: string;
  telefono: number;
}

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  formularioNuevo: IFormulario[] = []

  clientes: ICliente[] = []


  conexionURL = "https://clientes-18bc7-default-rtdb.firebaseio.com/";

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }


  obtenerCliente() {
    const url = `${this.conexionURL}clientes.json`;
    this.httpClient.get<ICliente[]>(url)
      .pipe(
        filter((cliente) => !!cliente)
      ).subscribe((cliente) => this.clientes = cliente);

  }


  agregarCliente(cliente: ICliente) {
    const url = `${this.conexionURL}clientes.json`;
    if (this.clientes.length === 0) {
      this.clientes.push(cliente)
      this.httpClient.put(url, this.clientes).subscribe();
      return;
    }
    let clienteExiste = false;
    for (let c of this.clientes) {
      if (c.cedula === cliente.cedula) {
        clienteExiste = true;
        break;
      }
    }

    if (clienteExiste) {
      this._snackBar.open("El cliente ya existe", "cerrar");
    } else {
      this.clientes.push(cliente)
      this.httpClient.put(url, this.clientes).subscribe();
    }
  }

  eliminarCliente() {
    this.clientes.pop()
    const url = `${this.conexionURL}clientes.json`;
    this.httpClient.put(url, this.clientes).subscribe();
  }

  eliminarUnCLiente(c: ICliente) {
    const url = `${this.conexionURL}clientes.json`;
    const clienteFiltrado = this.clientes.filter(item => item !== c);
    this.clientes = clienteFiltrado;
    this.httpClient.put(url, this.clientes).subscribe();
  }

  eliminar(c?: ICliente) {
    if (c) {
      const clienteFiltrado = this.clientes.filter(item => item !== c);
      this.clientes = clienteFiltrado;
    } else {
      this.clientes.pop()
    }

    const url = `${this.conexionURL}clientes.json`;
    this.httpClient.put(url, this.clientes).subscribe();
  }


  editarClientes(clienteNuevo: ICliente) {

    for (let c of this.clientes) {
      if (c.cedula === clienteNuevo.cedula) {

        c.nombre = clienteNuevo.nombre,
          c.edad = clienteNuevo.edad,
          c.cedula = clienteNuevo.cedula

      }

    }
    const url = `${this.conexionURL}clientes.json`;
    this.httpClient.put(url, this.clientes).subscribe();
  }

  listaClientesFormularioNuevo() {

  }

  agregarClienteFormularioNuevo() {
    console.log(this.agregarClienteFormularioNuevo)
  }

  addCliente(valoresFormulario: IFormulario) {
    const url = `${this.conexionURL}clientes.json`;
    if (this.formularioNuevo.length === 0) {
      this.formularioNuevo.push(valoresFormulario)
      this.httpClient.put(url, this.formularioNuevo).subscribe();
      return;
    }

    for (let c of this.formularioNuevo) {
      if (c.cedula === valoresFormulario.cedula) {
        alert("El usuario ya existe")
        return;
      } else {
        this.formularioNuevo.push(valoresFormulario)
        this.httpClient.put(url, this.formularioNuevo).subscribe();
        return;
      }
    }

  }

  listaClientesBD() {
    const url = `${this.conexionURL}clientes.json`;
    this.httpClient.get<IFormulario[]>(url).subscribe((clientes) => this.formularioNuevo = clientes);
  }

  eliminarClienteFormularioSer(c: IFormulario) {
    const url = `${this.conexionURL}clientes.json`;
    const clienteFiltrado = this.formularioNuevo.filter(item => item !== c);
    this.formularioNuevo = clienteFiltrado;
    this.httpClient.put(url, this.formularioNuevo).subscribe();
  }

  editarClienteFormularioSer(c: IFormulario) {
    for (let clienteEditar of this.formularioNuevo) {
      if (clienteEditar.cedula === c.cedula) {

        clienteEditar.nombre = c.nombre,
          clienteEditar.cedula = c.cedula,
          clienteEditar.edad = c.edad,
          clienteEditar.correo = c.correo,
          clienteEditar.telefono = c.telefono
      }
    }
    const url = `${this.conexionURL}clientes.json`;
    this.httpClient.put(url, this.formularioNuevo).subscribe();

  }

}
