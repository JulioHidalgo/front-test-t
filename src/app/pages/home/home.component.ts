import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SideMenuComponent } from '../../components/shared/side-menu/side-menu.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule,MatIconModule,SideMenuComponent,],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
