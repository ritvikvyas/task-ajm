import { Component, ViewChild, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatBottomSheet } from '@angular/material';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { ApiService } from './services/api.service';
import { Result } from './interfaces/result';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private api: ApiService,
    private bottomSheet: MatBottomSheet) {}

  displayedColumns: string[] = [
    'firstName', 'lastName', 'dob', 'department',
    'basicSalary', 'bonusPlan', 'designation'
  ];
  isLoadingResults = true;
  pageSize = 0;
  resultsLength = 0;
  search = '';
  data = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getData(0, '');
    this.paginator.page.subscribe(
      () => {
        this.getData(this.paginator.pageIndex, this.search);
      }
    );
  }

  createEmployeeForm(): void {
    this.bottomSheet.open(CreateEmployeeComponent).afterDismissed()
    .subscribe(() => this.getData(0, ''));
  }

  getData(page, search): void {
    this.isLoadingResults = true;
    this.api.get('/employee?p=' + page + '&q=' + search)
    .pipe(map(res => res.json()))
    .subscribe((response: Result) => {
        const data = response.data;
        this.data = data.result;
        this.pageSize = data.pageSize;
        this.resultsLength = data.total;
        this.isLoadingResults = false;
      },
      error => console.log(error)
    );
  }
}
