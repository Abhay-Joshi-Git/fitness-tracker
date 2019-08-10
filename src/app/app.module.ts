import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ToolBarComponent } from './navigation/tool-bar/tool-bar.component';
import { SideNavComponent } from './navigation/side-nav/side-nav.component';
import { environment } from 'src/environments/environment';
import { UiModule } from './ui/ui.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, InitialAppState } from './store/state';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolBarComponent,
    SideNavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      initialState: InitialAppState
    }),
    StoreDevtoolsModule.instrument(),
    AuthModule,
    AuthModule.forFeature(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    UiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
