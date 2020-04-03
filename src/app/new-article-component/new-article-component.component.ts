import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../types';
@Component({
  selector: 'app-new-article-component',
  templateUrl: './new-article-component.component.html',
  styleUrls: ['./new-article-component.component.scss']
})
export class NewArticleComponentComponent implements OnInit {
  mockupData: DialogData;

  autocomplete: google.maps.places.Autocomplete;

  constructor(
    public dialogRef: MatDialogRef<NewArticleComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {

    this.mockupData = {
      demandId: new Date().getTime() + '_' + Math.random().toString(36).substr(2, 9),
      forWho: this.data.email,
      forWhere: "",
      forWhereLong: 0,
      forWhereLat: 0,
      description: "",
      howMany: 10,
      model: "shield_v1",
      status: 0,
      printBy: "_none",
      printEstimateDate: "inconnue",
      deliveryBy: "Retrait sur place",
      deliveryWhere: "",
      deliveryWhereLong: 0,
      deliveryWhereLat: 0,
      logHistory: [],
      comment: "Aucun",
    };

    var options = {
      types: ['address'],

    };

    var input = <HTMLInputElement>document.getElementById('searchTextField');
    this.autocomplete = new google.maps.places.Autocomplete(input, options);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onValidateClick(): void {
    var place = this.autocomplete.getPlace();
    this.mockupData.forWhere = place.formatted_address;
    this.mockupData.forWhereLat = place.geometry.location.lat();
    this.mockupData.forWhereLong = place.geometry.location.lng();
    this.dialogRef.close(this.mockupData);
  }
}
