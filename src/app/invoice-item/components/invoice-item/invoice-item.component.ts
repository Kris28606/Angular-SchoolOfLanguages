import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from 'src/app/invoice/model/invoice';
import { InvoiceItem } from '../../model/invoice-item';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.css']
})
export class InvoiceItemComponent implements OnInit {

  dataSource: InvoiceItem[]=[];
  displayedColumns: string[]=["Serial number","Course","Item value"];
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.dataSource=this.data;
  }


}
