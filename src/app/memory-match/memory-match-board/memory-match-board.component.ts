import { Component, effect, inject, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { MemoryMatchStore } from '../memory-match.store';
import { CellType } from '../memory-match.types';

@Component({
  selector: 'app-memory-match-board',
  standalone: false,

  templateUrl: './memory-match-board.component.html',
  styleUrl: './memory-match-board.component.css'
})
export class MemoryMatchBoardComponent implements OnInit {
  store = inject(MemoryMatchStore);
  CellType = CellType;

  type: CellType = CellType.Smileys;
  rows = 4;
  cols = 4;

  // 标记第一次点击的单元格
  clicked = {
    value: '',
    x: -1,
    y: -1,
  };

  steps = 0;

  cells = this.store.cells;
  openedCount = this.store.openedCount;
  isCompleted = this.store.isCompleted;

  showCongratulations = false;

  constructor() {
    effect(() => {
      if (this.isCompleted()) {
        this.showCongratulations = true;
      }
    });
  }

  ngOnInit(): void {
    this.store.initCells(this.rows, this.cols, this.type);
  }

  clickCell(x: number, y: number, value: string) {
    // 已消除的不再点击
    if (value == '') {
      return;
    }
    // 如果有两个已打开，则需要等待对比，不能再点击，直到对比完，防止用户连续点击多张牌
    if (this.openedCount() == 2) {
      return;
    }
    // 已经打开的不能再点击
    if (this.clicked.x == x && this.clicked.y == y) {
      return;
    }

    this.steps++;

    // 先打开
    this.store.openCell(x, y);
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
      });
      return;
    }

    // 否则，关闭重新点击
    timer(1000).subscribe(() => {
      this.store.closeCell(this.clicked.x, this.clicked.y);
      this.store.closeCell(x, y);
      this.resetClicked();
    });

  }

  changeType() {
    this.steps = 0;
    this.store.initCells(this.rows, this.cols, this.type);
  }

  closeCongratulations() {
    this.showCongratulations = false;
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
