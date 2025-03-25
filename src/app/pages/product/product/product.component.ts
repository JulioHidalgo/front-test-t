import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SideMenuComponent } from '../../../components/shared/side-menu/side-menu.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule,MatIconModule,SideMenuComponent,],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

}
