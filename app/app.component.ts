import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { InsidersConstants } from './core/insiders-constants';
import { LocalstorageService } from './core/services/localstorage.service';
import 'rxjs/add/observable/interval'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'app';
  counterSubscription: Subscription;
  counter: any;
  activityDate = new Date().getTime();
  timeoutID: any;
  timeoutDisplay = false;

  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e) {
    this.resetTimer();
  }
  

  constructor(private _http: HttpClient,
              private _LocalStorageService: LocalstorageService) { }

   ngOnInit() {
      this.counter = Observable.interval(1000*60*15);

      this.counterSubscription = this.counter.subscribe(
        (value) => {
          this._http.get(InsidersConstants.apiUrlUsers).subscribe();
        }); 
  }

   ngOnDestroy() {
      this.counterSubscription.unsubscribe();
  } 

   public startTimer() {
    this.timeoutID = setTimeout(()=>{
          this.goInactive();
    }, 1000*60*15);
   }

   public resetTimer() {
    clearTimeout(this.timeoutID);
 
    this.goActive();
  }

  public goInactive() {
    this.timeoutDisplay = true;
    this.counterSubscription.unsubscribe();
    this._http.get('/INSIDERS/logout').subscribe()
  }

   public  goActive() {
     this.startTimer();
  }

  public reconnect() {
    this.timeoutDisplay = false;
    this._LocalStorageService.clearLocalStorage(InsidersConstants.KEY_USER);
    const url = location.origin + '/INSIDERS/logout' ;
    window.location.href = url;

  }

}
