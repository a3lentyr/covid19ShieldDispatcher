import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AmplifyService } from 'aws-amplify-angular';
import { NewArticleComponentComponent } from './new-article-component/new-article-component.component';
import { DialogData } from './types';
import { AuthServiceService } from './auth-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  // For auth
  signedIn: boolean = false;


  constructor(public auth: AuthServiceService) {


  }

  ngOnInit() {

    this.auth.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        this.signedIn = isLoggedIn;
      }
    );
  }


  onSignIn() {
    this.auth.onSignIn()
  }

  onLogout() {
    this.auth.onLogout();
  }
}
