import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ]
})
export class ProductComponent implements OnInit{
  private _fb = inject(FormBuilder);

  public invoiceForm: FormGroup | any;

  ngOnInit() {
    this.invoiceForm = this._fb.group({
      Rows: this._fb.array([this.initRows()])
    });
  }

  get formArr() {
    return this.invoiceForm.get("Rows") as FormArray;
  }

  initRows() {
    return this._fb.group({
      name: [""]
    });
  }

  addNewRow() {
    this.formArr.push(this.initRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
}
