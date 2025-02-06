export interface Cell {
  value: string;
  isOpen?: boolean;     // 是否打开，打开即为显示，关闭即为隐藏
}
export enum CellType {
  Smileys = 1,
  Animals = 2,
}
