import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MemoryMatchRoutingModule } from './memory-match-routing.module';
import { MemoryMatchBoardComponent } from './memory-match-board/memory-match-board.component';
import { ScatterFlowersComponent } from './scatter-flowers/scatter-flowers.component';
import { MemoryMatchCardComponent } from './memory-match-card/memory-match-card.component';


@NgModule({
  declarations: [
    MemoryMatchBoardComponent,
    ScatterFlowersComponent,
    MemoryMatchCardComponent,
  ],
  imports: [
    CommonModule,
    MemoryMatchRoutingModule,
    FormsModule,
  ]
})
export class MemoryMatchModule { }
