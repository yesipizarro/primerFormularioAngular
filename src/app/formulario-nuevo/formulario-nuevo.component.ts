import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormularioService, IFormulario } from '../formulario.service';

@Component({
  selector: 'app-formulario-nuevo',
  templateUrl: './formulario-nuevo.component.html',
  styleUrls: ['./formulario-nuevo.component.scss']
})


export class FormularioNuevoComponent implements OnInit {

  editando = false;

  limpiar() {
    this.editando = false;
    this.formulario.reset();
  }

  onSubmit() {
    let valoresFormulario = this.formulario.value;
    this.formularioService.addCliente(valoresFormulario);
  }

  constructor(private formularioService: FormularioService) { }

  ngOnInit(): void {
    this.formularioService.listaClientesBD();
  }

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    cedula: new FormControl(undefined, [Validators.required, Validators.minLength(6)]),
    edad: new FormControl(undefined, [Validators.required, Validators.max(60), Validators.min(18)]),
    correo: new FormControl(undefined, [Validators.required, Validators.email]),
    telefono: new FormControl(undefined, [Validators.required, Validators.maxLength(10), Validators.min(0)])
  })


  get listaClientesFormularioNuevo() {
    return this.formularioService.formularioNuevo;

  }



  editarClienteFormulartio(c: IFormulario) {
    this.editando = true;
    this.formulario.patchValue({
      nombre: c.nombre,
      cedula: c.cedula,
      edad: c.edad,
      correo: c.correo,
      telefono: c.telefono
    })

  }

  edicion() {
    this.formularioService.editarClienteFormularioSer(this.formulario.value);
    this.limpiar();
  }

  eliminarClienteFormulartio(c: IFormulario) {
    this.formularioService.eliminarClienteFormularioSer(c);
  }

}
