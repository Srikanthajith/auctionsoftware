import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from '../../services/loginservice.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  statusFilter: any = { username: '' };
  showSpinner: Boolean = false;
  total_records: number = null;
  projectdata: any[] = [];

  constructor(
    private loginService: LoginserviceService
  ) { }

  ngOnInit() {
    this.showSpinner = true;
    this.getDatas(0, 2);
  }

  getDatas(first: number, rows: number) {
    this.loginService.getData(first, rows).subscribe(data => {
      this.showSpinner = false;
      this.projectdata = data.result;
      this.total_records = data.total_records;
    });
  }

  paginate(event) {
    this.getDatas(event.first, event.rows);
  }

}
