import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  data = {
    formfields: [
      {
        formfield: "dropdown"
      }
    ]
  }

  myForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.myForm = this.fb.group({
      formfields: this.fb.array([])
    })
  }

  deleteFormField(index) {
    let control = <FormArray>this.myForm.controls.formfields;
    control.removeAt(index)
  }


  ngOnInit(): void {
  }

  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if(data === "textbox"){
     let control = <FormArray>this.myForm.controls.formfields;
     control.push(
       this.fb.group({
        formfield: ['textbox']
       })
     )
    }else if(data === "dropdown"){
      let control = <FormArray>this.myForm.controls.formfields;
      control.push(
        this.fb.group({
          formfield: ['dropdown']
        })
      )
    }
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  preview(){
    console.log("json", this.myForm.value)
  }

}
