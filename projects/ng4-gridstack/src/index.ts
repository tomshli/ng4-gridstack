import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridStackComponent } from './lib/grid-stack.component';
import { GridStackItemComponent } from './lib/grid-stack-item.component';
import { GridStackDirective } from './lib/grid-stack.directive';
import { GridStackPipe } from './lib/grid-stack.pipe';

import { GridStackOptions } from './lib/grid-stack-options.model';
import { GridStackItem } from './lib/grid-stack-item.model';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GridStackComponent,
    GridStackItemComponent,
    GridStackDirective,
    GridStackPipe
  ],
  exports: [
    GridStackComponent,
    GridStackItemComponent,
    GridStackDirective,
    GridStackPipe
  ]
})
export class GridStackModule {
}
