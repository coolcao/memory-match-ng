import { Component, inject, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { MemoryMatchStore } from '../memory-match.store';

@Component({
  selector: 'app-memory-match-board',
  standalone: false,

  templateUrl: './memory-match-board.component.html',
  styleUrl: './memory-match-board.component.css'
})
export class MemoryMatchBoardComponent implements OnInit {

  rows = 4;
  cols = 4;

  // 标记第一次点击的单元格
  clicked = {
    value: '',
    x: -1,
    y: -1,
  };

  clickedCount = 0;

  store = inject(MemoryMatchStore);

  cells = this.store.cells;

  ngOnInit(): void {
    this.store.initCells(this.rows, this.cols);
  }

  clickCell(x: number, y: number, value: string) {
    if (value == '') {
      return;
    }
    if (this.clickedCount == 2) {
      return;
    }

    // 先打开
    this.store.openCell(x, y);
    this.clickedCount++;
    // 第一次点击，打开第一个做标记
    if (this.clicked.value == '') {
      this.setClicked(x, y, value);
      return;
    }
    // 如果遇到相同的，就消除
    if (this.clicked.value == value && (this.clicked.x != x || this.clicked.y != y)) {
      timer(500).subscribe(() => {
        this.store.removeCell(x, y);
        this.store.removeCell(this.clicked.x, this.clicked.y);
        this.resetClicked();
        this.clickedCount = 0;
      });
      return;
    }

    // 否则，关闭重新点击
    timer(1000).subscribe(() => {
      this.store.closeCell(this.clicked.x, this.clicked.y);
      this.store.closeCell(x, y);
      this.resetClicked();
      this.clickedCount = 0;
    });

  }

  private resetClicked() {
    this.setClicked(-1, -1, '');
  }

  private setClicked(x: number, y: number, value: string) {
    this.clicked = {
      value,
      x,
      y,
    };
  }


}
