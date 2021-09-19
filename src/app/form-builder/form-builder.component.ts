import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {NgbModal, ModalDismissReasons} 
      from '@ng-bootstrap/ng-bootstrap';

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
  closeResult = '';

  formFields = [];
  arr= [];
  
  constructor(private fb: FormBuilder,private modalService: NgbModal) { 
    this.myForm = this.fb.group({
      formfields: this.fb.array([])
    })
  }

  open(content) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result)  => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.formFields = this.myForm.value.formfields;
    this.arr= this.formFields.map((data)=>{
     if(data.formfield.includes("textbox")){
      return "textbox"
     }else if(data.formfield.includes("dropdown")){
      return "dropdown"
     }
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  deleteFormField(index) {
    let control = <FormArray>this.myForm.controls.formfields;
    control.removeAt(index)
  }

  ngOnInit(): void {
  }

  index =1;
  dropdownIndex =1;

  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if(data === "textbox"){
     let control = <FormArray>this.myForm.controls.formfields;
     control.push(
       this.fb.group({
        formfield: ['textbox' + this.index]
       })
     )
     this.index++;
    }else if(data === "dropdown"){
      let control = <FormArray>this.myForm.controls.formfields;
      control.push(
        this.fb.group({
          formfield: ['dropdown' + this.dropdownIndex]
        })
      )
      this.dropdownIndex++;
    }
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

}
