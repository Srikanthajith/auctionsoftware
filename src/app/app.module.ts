import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//angular imports
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//custom components
import { AppComponent } from './app.component';
import {LoginuserComponent} from './components/loginuser/loginuser.component';
import {PaginationComponent} from './components/pagination/pagination.component';


//primeng components
import {PaginatorModule} from 'primeng/paginator';
import { FilterPipeModule } from 'ngx-filter-pipe';

//services
import { LoginserviceService } from './services/loginservice.service';

//routing

import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    LoginuserComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    routing,
    PaginatorModule,
    FilterPipeModule
  ],
  providers: [LoginserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
