import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { RepairModel } from 'src/app/model/repair.model';
import { RepairService } from 'src/app/service/repair.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reparo-list',
  templateUrl: './reparo-list.component.html',
  styleUrls: ['./reparo-list.component.scss']
})
export class ReparoListComponent implements OnInit {

  displayedColumns: string[] = ['sapNotification', 'equipment', 'serialNumber', 'customer', 'warranty', 'tat', 'status', 'creationDate'];
  dataSource: MatTableDataSource<RepairModel>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _http: RepairService, private router: Router) { }

  repairs: Set<RepairModel>;

  ngOnInit() {
    this._http.getRepairs().subscribe(data =>{
      this.repairs = <Set<RepairModel>>data;
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
        return this.nestedCheck(null, item, property);
      };      
      this.dataSource.sort = this.sort;      
    })
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
      repair.tat = new Date().getDay() - new Date(repair.creationDate).getDay();
    }
  }


}
