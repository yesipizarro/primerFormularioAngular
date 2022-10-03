import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormularioService, ICliente } from '../formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  mostrareditar = false;
  mostraragregar = true;

  nombre: string;
  edad: number;
  cedula: string;


  constructor(private formularioService: FormularioService) { }

  ngOnInit(): void {
    this.formularioService.obtenerCliente();
    this.formularioService.agregarClienteFormularioNuevo();
  }

  get listaClientes() {
    return this.formularioService.clientes;

  }

  agregarClienteBoton() {
    const cliente: ICliente = {
      cedula: this.cedula,
      nombre: this.nombre,
      edad: this.edad
    };
    this.formularioService.agregarCliente(cliente);
  }


  eliminarClienteBoton() {
    this.formularioService.eliminar();

  }

  eliminarUnCliente(c: ICliente) {
    this.formularioService.eliminar(c);
  }



  editarCliente(c: ICliente) {

    this.nombre = c.nombre
    this.cedula = c.cedula
    this.edad = c.edad

  }

  editarClientes() {
    const clienteNuevo: ICliente = {
      cedula: this.cedula,
      nombre: this.nombre,
      edad: this.edad
    };
    this.formularioService.editarClientes(clienteNuevo);
  }

  buscar() {

  }
}
