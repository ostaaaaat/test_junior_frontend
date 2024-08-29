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
  NbIconModule, NbToastrModule, NbToastrService,
  NbSelectModule} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { StorageService } from './service/storage-service';
import { NbMomentDateModule } from '@nebular/moment';
import { ItemCardComponent } from './item-card/item-card.component';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from './service/notification-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    BrowserAnimationsModule,
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
    NbIconModule,
    NbSelectModule,
    HttpClientModule,
    NbToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [StorageService, TranslateService, NbToastrService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
