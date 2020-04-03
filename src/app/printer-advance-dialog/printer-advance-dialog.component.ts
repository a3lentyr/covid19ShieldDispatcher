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
  statusList = [
    { value: 0, viewValue: "Demandé" },
    { value: 10, viewValue: "Pris en charge par Printer" },
    { value: 20, viewValue: "Production démarrée" },
    { value: 30, viewValue: "En attente de livraison" },
    { value: 40, viewValue: "En attente de confirmation de réception" },
    { value: 100, viewValue: "Terminé" },
    { value: -1, viewValue: "Marqué pour rejet" },
    { value: -10, viewValue: "Rejeté" }
  ]
  constructor(
    public dialogRef: MatDialogRef<PrinterAdvanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {

    this.mockupData = JSON.parse(JSON.stringify(data.demand));
    this.mockupData.printBy = data.email;
  }

  ngOnInit() {

    var options = {

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

  onRejectClick(): void {
    this.mockupData.status = -1;
    this.dialogRef.close(this.mockupData);
  }
}
