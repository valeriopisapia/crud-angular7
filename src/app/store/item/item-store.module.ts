import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ItemEffects } from './item.effects';
import { itemReducer } from './item.reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('items', itemReducer),
    EffectsModule.forFeature([ItemEffects])
  ],
  providers: [ItemEffects]
})
export class ItemsStoreModule {}