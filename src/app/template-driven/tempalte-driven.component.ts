import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tempalte-driven',
  templateUrl: './tempalte-driven.component.html',
  styleUrls: ['./tempalte-driven.component.scss'],

})
export class TempalteDrivenComponent implements OnInit {


  @ViewChild('newForm') newForm: NgForm;

  password: string;
  confirmPassword: string;

  constructor() { }
  submitted = false;
  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (this.submitted && !this.newForm.valid) {
      return;
    }
    alert('you are succeed');

  }

}
