import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Items } from 'src/app/models/items';
import {
  RootStoreState,
  ItemsStoreActions,
  ItemsStoreSelectors
} from '../../store';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items$: Observable<Items[]>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(private router: Router, private route: ActivatedRoute, private store$: Store<RootStoreState.State>) {
  }

  ngOnInit() {
    this.items$ = this.store$.select(
      ItemsStoreSelectors.selectAllItems
    )

    this.error$ = this.store$.select(
      ItemsStoreSelectors.selectItemError
    );

    this.isLoading$ = this.store$.select(
      ItemsStoreSelectors.selectItemIsLoading
    );

    this.store$.dispatch(new ItemsStoreActions.getItems('items'));
  }

  addNewItem($event) {
    this.router.navigate(['/item']);
  }

  editItem($event) {
    const item = $event.item;
    this.router.navigate(['/item', item.id], { relativeTo: this.route });
  }

  removeItem($event) {
    const item = $event.item;
    this.store$.dispatch(new ItemsStoreActions.removeItem(item.id));
    this.router.navigate(['/items']);
  }
}