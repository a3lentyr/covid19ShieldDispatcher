import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NewArticleComponentComponent } from './new-article-component/new-article-component.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PrinterPageComponent } from './printer-page/printer-page.component';
import { AuthServiceService } from './auth-service.service';
import { HelpPageComponent } from './help-page/help-page.component';
import { PrinterAdvanceDialogComponent } from './printer-advance-dialog/printer-advance-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NewArticleComponentComponent,
    HomePageComponent,
    PrinterPageComponent,
    HelpPageComponent,
    PrinterAdvanceDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAngularModule,
    NoopAnimationsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  entryComponents: [
    NewArticleComponentComponent,
    PrinterAdvanceDialogComponent
  ],

  providers: [
    AmplifyService,
    AuthServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
