import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit , AfterViewInit {

  @ViewChild('txt') inputTxt: ElementRef;
  @ViewChild('btnTest', { static: true }) btnTest: ElementRef;
  public testo: string;
  public testoWatcher: string;
  public variabileNgStyleOrClass: number;

  columnDefs = [
    { field: 'brand', headerName: 'Brands' },
    { field: 'model', headerName: 'Models' },
    { field: 'price', headerName: 'Prices' }
  ];

  rowData = [
    { brand: 'Toyota', model: 'Celica', price: 35000 },
    { brand: 'Ford', model: 'Mondeo', price: 32000 },
    { brand: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  public gridApi;
  public columnApi;


  constructor() { }

  ngOnInit(): void {
  }

  onGridReady(evt) {
    this.gridApi = evt.api
    this.columnApi = evt.columnApi
  }

  esportAsCsv () {
    this.gridApi.exportDataAsCsv();
  }

  ngAfterViewInit () {
    // access element ref
    fromEvent(this.btnTest.nativeElement, 'click').subscribe(el => {
      this.test()
    })
  }

  testoChanged (evt: any) {
    console.log(evt)
  }

  test() {
    console.log('clicked')
  }

}

