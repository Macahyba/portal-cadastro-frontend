import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QuotationModel } from 'src/app/model/quotation.model';
import { QuotationService } from 'src/app/service/quotation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orcamento-list',
  templateUrl: './orcamento-list.component.html',
  styleUrls: ['./orcamento-list.component.scss']
})
export class OrcamentoListComponent implements OnInit {
  displayedColumns: string[] = [
    'label', 'name', 'equipment', 'serialNumber', 'totalPrice',
     'totalDiscount', 'status', 'creationDate'
  ];
  dataSource: MatTableDataSource<QuotationModel>;
  barFetch: boolean;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _http: QuotationService, private router: Router) {}

  quotations: Array<QuotationModel>;

  ngOnInit() {
    this._http.getQuotations().subscribe(apiData => {
      this.quotations = apiData.slice().reverse();
      this.dataSource = new MatTableDataSource(this.quotations);
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return this.nestedCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = (item, property) => {
        // return this.nestedCheck(null, item, property);
        switch(property){
          case 'name' : return item.customer.name;
          case 'equipment' : return item.equipment.name;
          case 'serialNumber' : return item.equipment.serialNumber;
          case 'status' : return item.status.status;
          default: return item[property];
        }
      };
      this.dataSource.sort = this.sort;
      this.barFetch = false;
    });
    this.barFetch = true;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  nestedCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  openDetail(id: string){
    this.router.navigate([`orcamentos/${id}`]);
  }

  downloadCsv(){
    return this._http.downloadCsv();
  }

}
