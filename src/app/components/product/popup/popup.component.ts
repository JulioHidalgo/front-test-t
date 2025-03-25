import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';


@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule
  ],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive';
  myform: FormGroup;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupComponent>,
    private buildr: FormBuilder,
    private service: ProductService,
    private http: HttpClient,
  ) {
    this.myform = this.buildr.group({
      title: this.buildr.control(''),
      description: this.buildr.control(''),
      price: this.buildr.control(''),
      category: this.buildr.control(''),
      status: this.buildr.control(true)
    });
  }


  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.code > 0) { 
      this.setpopupdata(this.inputdata.code);
    }
  }

  setpopupdata(id: any) {
    this.service.getProductById(id).subscribe(item => {
      this.editdata = item;
      this.myform.setValue({
        title: this.editdata.title,
        description: this.editdata.description,
        price: this.editdata.price,
        category: this.editdata.category,
        status: this.editdata.status
      });
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  
  createProduct(): void {
    if (this.myform.valid) {
      const productData = {
        title: this.myform.value.title,
        price: Number(this.myform.value.price),
        description: this.myform.value.description,
        category: this.myform.value.category,
      };
  
      this.service.createProduct(this.data).subscribe({
        next: (newProduct) => {
          this.ref.close(newProduct); 
        },
        error: (err) => {
          console.error('Error creating product', err);
        }
      });
    }
  }

}

