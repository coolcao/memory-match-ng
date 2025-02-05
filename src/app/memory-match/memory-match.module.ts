import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemoryMatchRoutingModule } from './memory-match-routing.module';
import { MemoryMatchBoardComponent } from './memory-match-board/memory-match-board.component';


@NgModule({
  declarations: [
    MemoryMatchBoardComponent
  ],
  imports: [
    CommonModule,
    MemoryMatchRoutingModule,
  ]
})
export class MemoryMatchModule { }
