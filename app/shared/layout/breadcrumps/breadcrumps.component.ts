import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../../core/services/core.service';

@Component({
  selector: 'app-breadcrumps',
  templateUrl: './breadcrumps.component.html',
  styleUrls: ['./breadcrumps.component.scss']
})
export class BreadcrumpsComponent implements OnInit {
  constructor(public _coreService: CoreService) {
   }

  ngOnInit() {
  }

}
