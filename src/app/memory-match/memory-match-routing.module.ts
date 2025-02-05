import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemoryMatchBoardComponent } from './memory-match-board/memory-match-board.component';

const routes: Routes = [
  { path: '', component: MemoryMatchBoardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemoryMatchRoutingModule { }
