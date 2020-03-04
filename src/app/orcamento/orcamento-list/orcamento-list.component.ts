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
  displayedColumns: string[] = ['label', 'name', 'totalPrice', 'status', 'creationDate'];
  dataSource: MatTableDataSource<QuotationModel>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _http: QuotationService, private router: Router) {}

  quotations: Set<QuotationModel>;

  ngOnInit() {
    this._http.getQuotations().subscribe(data => {
      this.quotations = <Set<QuotationModel>>data
      this.dataSource = new MatTableDataSource(Array.from(this.quotations.values()));
      this.dataSource.filterPredicate = (data, filter: string)  => {
        const accumulator = (currentTerm, key) => {
          return this.nestedCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();        
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = (item, property) => {
        return this.nestedCheck(null, item, property);
      };      
      this.dataSource.sort = this.sort;
    });

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

}