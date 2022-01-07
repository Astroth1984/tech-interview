import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Entry } from 'src/app/models/entry.model';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShowDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Entry) { }

  ngOnInit(): void {
    console.log(typeof(this.data));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
