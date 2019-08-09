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
import { TrainingModule } from './training/training.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolBarComponent,
    SideNavComponent,
  ],
  imports: [
    SharedModule,
    AuthModule,
    AppRoutingModule,
    TrainingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
