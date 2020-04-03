import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AmplifyService } from 'aws-amplify-angular';

import { } from 'googlemaps';
import { NewArticleComponentComponent } from '../new-article-component/new-article-component.component';
import { DialogData } from '../types';
import { AuthServiceService } from '../auth-service.service';

import { Router } from '@angular/router';
import { PrinterAdvanceDialogComponent } from '../printer-advance-dialog/printer-advance-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  demandList = [];

  // For auth
  user: { id: string; username: string; email: string };
  signedIn: boolean = false;


  // For map
  @ViewChild('gmap', { static: true }) gmapElement: any;
  map: google.maps.Map;

  ownMarker: google.maps.Marker;

  constructor(public dialog: MatDialog, public amplifyService: AmplifyService, public auth: AuthServiceService, public router: Router) {


  }

  ngOnInit() {

    this.auth.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        this.signedIn = isLoggedIn;
        this.updateList();
      }
    );

    this.auth.auth$.subscribe(({ id, username, email }) => {
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
    if (!this.signedIn) {
      this.auth.onSignIn();
      return
    }
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

  onRemoveDialog(demand) {
    if (!this.signedIn) {
      this.auth.onSignIn();
      return
    }
    const dialogRef = this.dialog.open(PrinterAdvanceDialogComponent, {
      width: '500px',
      data: { email: this.user.email, demand: demand }
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      if (result) {
        if (result.status == -1) {
          this.onRemove(result);

        } else {
          this.onUpdate(result);

        }

      }
    });
  }

  onUpdate(demand) {
    let demandId = demand.demandId;
    this.amplifyService.api().put('demandAPI', '/demand/object/' + demandId, {}).then(data => {
      this.updateList();
    });

  }

  onRemove(demand) {
    let demandId = demand.demandId;
    this.amplifyService.api().del('demandAPI', '/demand/object/' + demandId, {}).then(data => {
      this.updateList();
    });

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


  onPrinterClick() {
    this.router.navigateByUrl('/printer');
  };

  onHelpClick() {
    this.router.navigateByUrl('/help');
  };

}
