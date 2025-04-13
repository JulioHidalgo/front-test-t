
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { Product } from '../../../models/product.model';

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
  myform: FormGroup;
  isLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupComponent>,
    private buildr: FormBuilder,
    private service: ProductService,
  ) {
    this.myform = this.buildr.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(0), Validators.max(100000)]],
      category: ['', Validators.required],
      status: [true]
    });
  }

  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.code > 0) { 
      this.loadProductData(this.inputdata.code);
    }
  }

  loadProductData(id: number): void {
    this.isLoading = true;
    this.service.getProductById(id).subscribe({
      next: (item) => {
        this.editdata = item;
        this.myform.patchValue({
          title: this.editdata.title,
          description: this.editdata.description,
          price: this.editdata.price,
          category: this.editdata.category,
          status: this.editdata.status
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading product data:', err);
        this.isLoading = false;
      }
    });
  }

  closepopup(): void {
    this.ref.close();
  }

  saveProduct(): void {
    if (this.myform.invalid) {
      this.myform.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = this.myform.value;
    const productData: Omit<Product, 'id'> = {
      title: formData.title,
      price: Number(formData.price),
      description: formData.description,
      category: formData.category
    };

    const operation = this.inputdata.code > 0
      ? this.service.updateProduct(this.inputdata.code, { ...productData, id: this.inputdata.code })
      : this.service.createProduct(productData);

    operation.subscribe({
      next: (res) => {
        this.ref.close(res);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error saving product:', err);
        this.isLoading = false;
      }
    });
  }
}