import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'memory-match', pathMatch: 'full' },
  { path: 'memory-match', loadChildren: () => import('./memory-match/memory-match.module').then(m => m.MemoryMatchModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
