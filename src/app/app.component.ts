import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AmplifyService } from 'aws-amplify-angular';
import Auth from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { } from '@types/googlemaps';
import { NewArticleComponentComponent } from './new-article-component/new-article-component.component';
import { DialogData } from './types';

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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid19SDfront';

  demandList = []

  // For auth
  signedIn: boolean = false;
  user: { id: string; username: string; email: string };

  private readonly _authState = new BehaviorSubject<AuthState>(
    initialAuthState
  );

  /** AuthState as an Observable */
  readonly auth$ = this._authState.asObservable();

  /** Observe the isLoggedIn slice of the auth state */
  readonly isLoggedIn$ = this.auth$.pipe(map(state => state.isLoggedIn));


  // For map
  @ViewChild('gmap', { static: true }) gmapElement: any;
  map: google.maps.Map;

  ownMarker: google.maps.Marker;

  constructor(public dialog: MatDialog, public amplifyService: AmplifyService) {

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

  ngOnInit() {
    this.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        this.signedIn = isLoggedIn;
        this.updateList();
      }
    );

    this.auth$.subscribe(({ id, username, email }) => {
      this.user = { id, username, email };
    });

    this.updateList();

    // init map
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

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

    console.log(user);
    const {
      attributes: { sub: id, email },
      username
    } = user;

    this._authState.next({ isLoggedIn: true, id, username, email });
  }

  updateList() {

    this.amplifyService.api().get('demandAPI', '/demand', {}).then(data => {
      this.demandList = data;
      this.demandList.forEach(element => {
        let position = {
          coords: {
            latitude: element.forWhereLat,
            longitude: element.forWhereLong
          }
        };
        this.showPosition(element.marker, position, element.forWho);
      });
    });

    navigator.geolocation.getCurrentPosition((position) => {
      this.showPosition(this.ownMarker, position, "Ma position", true);
    });
  }

  onAddDialog() {
    const dialogRef = this.dialog.open(NewArticleComponentComponent, {
      width: '500px',
      data: { email: this.user.email }
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      if (result)
        this.onAdd(result);
    });
  }

  onAdd(mockupData: DialogData) {
    // test if logged in, else logon
    this.getLocation().then((position) => {

      this.amplifyService.api().post('demandAPI', '/demand', { body: mockupData }).then(data => {
        this.updateList();
      });
    })
  }

  onRemove(demand) {
    let demandId = demand.demandId;
    this.amplifyService.api().del('demandAPI', '/demand/object/' + demandId, {}).then(data => {
      this.updateList();
    });

  }

  onSignIn() {
    this.amplifyService.auth().federatedSignIn();
  }

  onLogout() {
    this.amplifyService.auth().signOut();
  }


  getLocation(): Promise<any> {
    return new Promise((resolve, reject) => {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position);
        });
      } else {
        console.log("No support for geolocation");
        reject()
      }
    });
  }

  showPosition(marker, position, title, pan = false) {

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    if (pan)
      this.map.panTo(location);

    if (!marker) {
      marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: title
      });
    }
    else {
      marker.setPosition(location);
    }
  }

}
