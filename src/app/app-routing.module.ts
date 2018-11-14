import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './containers/items/items.component';
import { ItemDetailsComponent } from './containers/item-details/item-details.component';
import * as fromGuards from './guards';
import { itemReducer } from './store/item/item.reducers';
import { StoreModule } from '@ngrx/store';

const routes: Routes = [
  {
    path: 'items', component: ItemsComponent, canActivate: [fromGuards.ItemsGuard], data: { title: 'List' },
  },
  {
    path: 'item', component: ItemDetailsComponent, canActivate: [fromGuards.ItemsGuard], data: { title: 'New item' }
  },
  {
    path: 'item/:id', component: ItemDetailsComponent, canActivate: [fromGuards.ItemsGuard], data: { title: 'Item details' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [...fromGuards.guards],
  exports: [RouterModule]
})
export class AppRoutingModule { }
