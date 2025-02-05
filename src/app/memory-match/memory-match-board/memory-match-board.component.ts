import { Component, inject, OnInit } from '@angular/core';
import { MemoryMatchStore } from '../memory-match.store';
import { timer } from 'rxjs';

@Component({
  selector: 'app-memory-match-board',
  standalone: false,

  templateUrl: './memory-match-board.component.html',
  styleUrl: './memory-match-board.component.css'
})
export class MemoryMatchBoardComponent implements OnInit {

  rows = 4;
  cols = 4;

  clickedValue: string = '';
  clickedX: number = -1;
  clickedY: number = -1;

  store = inject(MemoryMatchStore);

  cells = this.store.cells;

  ngOnInit(): void {
    this.store.initCells(this.rows, this.cols);
  }

  clickCell(x: number, y: number, value: string) {
    if (value == '') {
      return;
    }
    // 先打开
    this.store.openCell(x, y);
    // 第一次点击，打开第一个做标记
    if (this.clickedValue == '') {
      this.setClicked(x, y, value);
      return;
    }
    // 如果遇到相同的，就消除
    if (this.clickedValue == value && (this.clickedX != x || this.clickedY != y)) {
      timer(500).subscribe(() => {
        this.store.removeCell(x, y);
        this.store.removeCell(this.clickedX, this.clickedY);
        this.resetClicked();
      });
      return;
    }

    // 否则，关闭重新点击
    timer(1000).subscribe(() => {
      this.store.closeCell(this.clickedX, this.clickedY);
      this.store.closeCell(x, y);
      this.resetClicked();
    });

  }

  private resetClicked() {
    this.setClicked(-1, -1, '');
  }

  private setClicked(x: number, y: number, value: string) {
    this.clickedValue = value;
    this.clickedX = x;
    this.clickedY = y;
  }


}
