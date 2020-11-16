import { RoleGuardService } from './services/role-guard.service';
import { LoginComponent } from './views/components/login/login.component';
import { NewVoloComponent } from './gestione-volo/component/new-volo/new-volo.component';
import { PrenotazioniComponent } from './views/components/prenotazioni/prenotazioni.component';
import { VoliComponent } from './views/components/voli/voli.component';
import { AboutComponent } from './views/components/about/about.component';
import { HomeComponent } from './views/components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditVoloComponent } from './gestione-volo/component/edit-volo/edit-volo.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { // ENTRY POINT REDIRECT
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  { // ENTRY POINT
    path: 'home', component: HomeComponent
  },
  { // FREE ROUTE
    path: 'about', component: AboutComponent
  },
  { // ONLY LOGGED, ALL ROLES
    path: 'voli', component: VoliComponent, canActivate: [ AuthGuardService ]
  },
  { // ONLY LOGGED, ALL ROLES
    path: 'prenotazioni', component: PrenotazioniComponent, canActivate: [ AuthGuardService ]
  },
  { // LOGGED && ADMINS/OPERATORS ONLY
    path: 'new-volo', component: NewVoloComponent, canActivate: [ AuthGuardService, RoleGuardService ], data: { roles: ['admin', 'operator'] }
  },
  { // LOGGED && ADMINS/OPERATORS ONLY
    path: 'edit-volo/:id', component: EditVoloComponent, canActivate: [ AuthGuardService, RoleGuardService ], data: { roles: ['admin', 'operator'] }
  },
  { // LOGGED && ADMINS ONLY
    path: 'new-user', component: LoginComponent, canActivate: [ AuthGuardService, RoleGuardService ], data: { roles: ['admin'] }
  },
  { // FREE ROUTE
    path: 'login', component: LoginComponent
  },
  { // PAGE NOT FOUND REDIRECT
    path: '**', redirectTo: 'home', pathMatch: 'full'
  }

  // { NESTED ROUTING EXAMPLE. navigatwByUrl('/voli/nested-path/' + param)
  //   path: 'voli', component: VoliComponent,
  //   canActivate: [ AuthGuardService ], || canActivateChild: [ SomeGuard ]
  //   children: [
  //     { path: "nested-path/:param", component: NestedComponent }
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
