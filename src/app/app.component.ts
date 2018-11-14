import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs';
import * as fromStateItem from 'src/app/store/item/item.state';
import { Items } from 'src/app/models/items';
import * as itemActions from 'src/app/store/item/item.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dashboard-dreaminglab';

  constructor(private store$: Store<fromStateItem.State>) {
  }

  ngOnInit() {
   
  }
}
