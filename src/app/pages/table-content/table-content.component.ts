import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Entry } from 'src/app/models/entry.model';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ShowDetailsComponent } from 'src/app/components/show-details/show-details.component';



@Component({
  selector: 'app-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.css']
})
export class TableContentComponent implements OnInit {

  isLoading = true;
  entries!: MatTableDataSource<Entry>;
  displayedColumns = ['API', 'Description', 'Auth', 'HTTPS', 'Cors', 'Link', 'Category', 'Action'];
  apiResponse: Entry[] = [];

  myControl = new FormControl();
  APIoptions: any[] = [];
  filteredApiOptions!: Observable<string[]>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;


  constructor(private fetchDataService: FetchDataService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.fetchDataService.fetchData().subscribe((res: any) => {
      this.apiResponse = res["entries"].slice(0, 100);
      this.apiResponse.forEach(item => {
        return this.APIoptions.push(item.API);
      });
      this.entries= new MatTableDataSource(res["entries"].slice(0, 100));
      this.isLoading = false;
      this.entries.paginator = this.paginator;
      this.entries.sort = this.matSort;
    });

    this.filteredApiOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.APIoptions.filter(APIoption => APIoption.toLowerCase().includes(filterValue));
  }





  onChangeCors(value: string){
    let selectedData = this.apiResponse.filter((item)=>{
      return item.Cors == value.toLowerCase();
    });
    this.entries = new MatTableDataSource(selectedData);
    this.entries.paginator = this.paginator;
    this.entries.sort = this.matSort;
  }

  onChangeCatgory(value: string){
    let selectedData = this.apiResponse.filter((item)=>{
      return item.Category == value;
    });
    this.entries = new MatTableDataSource(selectedData);
    this.entries.paginator = this.paginator;
    this.entries.sort = this.matSort;
  }

  keyDownFunc($event: any){
     this.entries.filter = $event.target.value;

  }

  filterDataAPIKey(option: string) {
    //  this.entries.filter = $event.target.value;
    // console.log(this.entries.filter)
     this.entries.filteredData.filter((item)=>{
      return item.API === option;

    });

  }

  openDialog(element: Entry): void {
    let dialogRef = this.dialog.open(ShowDetailsComponent, {
      // width: '450px',
      // height: '450p',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      element = result;
    });
  }





}
