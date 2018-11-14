import { Component, OnInit, ViewChild, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Items } from 'src/app/models/items';


interface AppState {
  items: Items;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'date', 'type', 'stored', 'actionsColumn'];
  dataSource: MatTableDataSource<Items>;

  @Input() items: Items[];
  @Output() addItem = new EventEmitter();
  @Output() editItem = new EventEmitter();
  @Output() removeItem = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const itms = changes.items;
    if (itms && itms.previousValue && itms.currentValue) {
      this.dataSource = new MatTableDataSource(itms.currentValue);
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addNewItem() {
    this.addItem.emit('addnewitem');
  }

  updateItem(item) {
    this.editItem.emit({ name: 'editItem', item: item });
  }

  deleteItem(item) {
    this.removeItem.emit({name: 'removeItem', item: item});
  }

}
