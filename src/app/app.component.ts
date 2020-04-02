import { Component } from '@angular/core';

import { AmplifyService } from 'aws-amplify-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid19SDfront';

  demandList = []

  signedIn: boolean;
  user: any;
  greeting: string;

  constructor(public amplifyService: AmplifyService) {

    let singleData = {
      forWho: "forWho",
      forWhere: "forWhere",
      howMany: 10,
      status: 0
    };

    for (let index = 0; index < 50; index++) {
      this.demandList.push(singleData);
    }

    this.amplifyService.authStateChange$
      .subscribe(authState => {
        console.log(authState)
        this.signedIn = authState.state === 'signedIn';
        if (!authState.user) {
          this.user = null;
        } else {
          this.user = authState.user;
          this.greeting = "Hello " + this.user.username;
        }
      });
  }

  ngOnInit() {

    this.amplifyService.api().get('demandAPI', '/demand', {}).then(data => {
      console.log(data);
    });

  }

  onSignIn() {
    this.amplifyService.auth().federatedSignIn();
  }

  onLogout() {
    this.amplifyService.auth().signOut();
  }


}
