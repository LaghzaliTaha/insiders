import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumpsComponent } from './breadcrumps/breadcrumps.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [HeaderComponent, SidebarComponent, FooterComponent, BreadcrumpsComponent],
  exports: [HeaderComponent, SidebarComponent, FooterComponent, BreadcrumpsComponent],

})

export class LayoutModule { }
