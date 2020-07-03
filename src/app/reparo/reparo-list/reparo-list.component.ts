import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RepairModel } from 'src/app/model/repair.model';
import { RepairService } from 'src/app/service/repair.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reparo-list',
  templateUrl: './reparo-list.component.html',
  styleUrls: ['./reparo-list.component.scss']
})
export class ReparoListComponent implements OnInit {

  displayedColumns: string[] =
    ['creationDate', 'sapNotification', 'repairFups', 'equipment', 'serialNumber',
    'customer', 'warranty', 'tat', 'status', 'notaFiscal', 'endDate'];
  dataSource: MatTableDataSource<RepairModel>;
  barFetch: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _http: RepairService, private router: Router) { }

  repairs: Array<RepairModel>;

  ngOnInit() {
    this._http.getAll().subscribe(data =>{
      this.repairs = data.slice().reverse();
      this.repairs.forEach(repair => { this.getTat(repair)});
      this.dataSource = new MatTableDataSource(Array.from(this.repairs.values()));
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
        // return this.nestedCheck(null, item, property);
        switch(property){
          case 'customer' : return item.customer.name;
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
    this.router.navigate([`reparos/${id}`]);
  }

  getTat(repair: RepairModel){

    if (!repair.tat){

      const now = new Date().valueOf();
      const cd = new Date(repair.creationDate).valueOf();

      repair.tat = Math.round(Math.abs(now - cd)/1000/60/60/24);

    }
  }

}
