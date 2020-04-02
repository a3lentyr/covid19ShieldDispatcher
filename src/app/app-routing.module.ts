import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PrinterPageComponent } from './printer-page/printer-page.component';
import { HelpPageComponent } from './help-page/help-page.component';


const routes: Routes = [{
  path: 'home', component: HomePageComponent
}, {
  path: 'printer', component: PrinterPageComponent
}, {
  path: 'help', component: HelpPageComponent
},
{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
