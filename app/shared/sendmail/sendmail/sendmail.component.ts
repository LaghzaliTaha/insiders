import { Component, OnInit } from '@angular/core';
import { SendmailService } from '../sendmail.service';

@Component({
  selector: 'app-sendmail',
  templateUrl: './sendmail.component.html',
  styleUrls: ['./sendmail.component.scss']
})
export class SendmailComponent implements OnInit {

  constructor(private _SendmailService: SendmailService) { }

  ngOnInit() {
  }

}

