import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import * as fromStateItem from '../../store/item/item.state';
import { Items } from 'src/app/models/items';
import {
  ItemsStoreActions,
  ItemsStoreSelectors
} from '../../store';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  item$: Observable<Items>;
  id: string;

  constructor(private store$: Store<fromStateItem.State>, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.item$ = this.store$.select(
      ItemsStoreSelectors.selectItemById(this.id)
    )

    this.store$.dispatch(new ItemsStoreActions.getItem('item'));
  }

  actionForm($event) {
    const id: string = $event.id;
    let updatedItem: Items = $event.values;

    updatedItem.date = moment(updatedItem.date).format('YYYY/MM/DD');

    if (id === "-1") {
      // ADD
      this.store$.dispatch(new ItemsStoreActions.createItem(updatedItem));
      this.router.navigate(['/items']);
    } else {
      // EDIT
      const payload = {
        index: id.toString(),
        updatedItem: updatedItem
      };

      this.store$.dispatch(new ItemsStoreActions.updateItem(payload));
      this.router.navigate(['/items']);
    }
  }

}
