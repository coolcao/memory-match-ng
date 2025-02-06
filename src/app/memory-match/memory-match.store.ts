import { computed, Injectable, signal, WritableSignal } from "@angular/core";
import { Cell } from "./memory-match.types";

const smileys = ['😀', '😃', '😆', '🙂', '😊', '😉', '🤗', '😝', '😛', '😑', '😐', '😚', '😙', '😰', '😨', '😮', '😲', '😵', '😍', '🥰'];

@Injectable({
  providedIn: 'root'
})
export class MemoryMatchStore {

  private _cells: WritableSignal<Cell[][]> = signal([]);

  readonly cells = this._cells.asReadonly();

  readonly openedCount = computed(() => {
    return this._cells().reduce((count, row) => {
      return count + row.filter(cell => cell.isOpen && cell.value != '').length;
    }, 0);
  });

  readonly isCompleted = computed(() => {
    return this._cells().reduce((count, row) => {
      return count + row.filter(cell => cell.value != '').length;
    }, 0) === 0;
  });

  initCells(rows: number, cols: number) {
    // 计算总的单元格数量
    const totalCells = rows * cols;
    // 确保总数是偶数，否则无法配对
    if (totalCells % 2 !== 0) {
      throw new Error('总单元格数量必须为偶数以确保可以配对');
    }

    // 创建需要的表情数组，每个表情出现两次
    const neededPairs: string[] = [];
    const pairsCount = totalCells / 2;

    // 随机选择表情并确保每个都出现两次
    for (let i = 0; i < pairsCount; i++) {
      const emoji = smileys[Math.floor(Math.random() * smileys.length)];
      neededPairs.push(emoji, emoji);
    }

    // 打乱表情数组
    for (let i = neededPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [neededPairs[i], neededPairs[j]] = [neededPairs[j], neededPairs[i]];
    }

    // 创建二维数组并填充打乱后的表情
    const cells: Cell[][] = [];
    let pairIndex = 0;

    for (let i = 0; i < rows; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          value: neededPairs[pairIndex++],
        });
      }
      cells.push(row);
    }

    this._cells.set(cells);
  }


  openCell(row: number, col: number) {
    const cells = [...this._cells()];
    cells[row][col].isOpen = true;
    this._cells.set(cells);
  }

  closeCell(row: number, col: number) {
    const cells = [...this._cells()];
    cells[row][col].isOpen = false;
    this._cells.set(cells);
  }

  removeCell(row: number, col: number) {
    const cells = [...this._cells()];
    cells[row][col].value = '';
    this._cells.set(cells);
  }


}
