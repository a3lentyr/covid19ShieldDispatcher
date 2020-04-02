import { Injectable } from '@angular/core';

import Auth from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AmplifyService } from 'aws-amplify-angular';

export interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  id: string | null;
  email: string | null;
}

const initialAuthState = {
  isLoggedIn: false,
  username: null,
  id: null,
  email: null
};

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly _authState = new BehaviorSubject<AuthState>(
    initialAuthState
  );

  /** AuthState as an Observable */
  readonly auth$ = this._authState.asObservable();

  /** Observe the isLoggedIn slice of the auth state */
  readonly isLoggedIn$ = this.auth$.pipe(map(state => state.isLoggedIn));

  constructor(public amplifyService: AmplifyService) {
    // Get the user on creation of this service
    Auth.currentAuthenticatedUser().then(
      (user: any) => this.setUser(user),
      _err => this._authState.next(initialAuthState)
    );

    // Use Hub channel 'auth' to get notified on changes
    Hub.listen('auth', ({ payload: { event, data, message } }) => {
      if (event === 'signIn') {
        // On 'signIn' event, the data is a CognitoUser object
        this.setUser(data);
      } else {
        this._authState.next(initialAuthState);
      }
    });
  }


  private setUser(user: any) {
    if (!user) {
      return;
    }
    if (!user.attributes) {

      Auth.currentAuthenticatedUser().then(
        (user: any) => this.setUser(user),
        _err => this._authState.next(initialAuthState)
      );
      return;

    }

    const {
      attributes: { sub: id, email },
      username
    } = user;

    this._authState.next({ isLoggedIn: true, id, username, email });
  }



  onSignIn() {
    this.amplifyService.auth().federatedSignIn();
  }

  onLogout() {
    this.amplifyService.auth().signOut();
  }
}
