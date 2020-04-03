import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../types';

@Component({
  selector: 'app-printer-advance-dialog',
  templateUrl: './printer-advance-dialog.component.html',
  styleUrls: ['./printer-advance-dialog.component.scss']
})
export class PrinterAdvanceDialogComponent implements OnInit {
  mockupData: DialogData;

  autocomplete: google.maps.places.Autocomplete;

  constructor(
    public dialogRef: MatDialogRef<PrinterAdvanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {

    this.mockupData = data.demand;
    this.mockupData.printBy = data.email;
  }

  ngOnInit() {

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

  onRejectClick(): void {
    this.mockupData.status = -1;
    this.dialogRef.close(this.mockupData);
  }
}
