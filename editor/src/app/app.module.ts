import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { ItemComponent } from './item/item.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NbThemeModule, NbLayoutModule, NbButtonModule, 
  NbDialogModule, NbDatepickerModule, NbTimepickerModule, 
  NbCardModule, NbInputModule, NbContextMenuModule,
  NbMenuModule, 
  NbIconModule} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { StorageService } from './service/storage-service';
import { NbMomentDateModule } from '@nebular/moment';
import { ItemCardComponent } from './item-card/item-card.component';


@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    ViewComponent,
    ItemComponent,
    ItemCardComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbButtonModule,
    NbDialogModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbMomentDateModule,
    NbTimepickerModule.forRoot(),
    NbCardModule,
    NbInputModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    FormsModule,
    NbIconModule
  ],
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
