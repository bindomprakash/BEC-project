import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgotpswdComponent } from './components/forgotpswd/forgotpswd.component';


const HomeRoutes: Routes = [
  {
      path: "",
      redirectTo: "login",
      pathMatch: "full"
    },
    {
      path: "login",
      component: LoginComponent
    },
    {
      path: "forgotPassword",
      component: ForgotpswdComponent
    }
];


@NgModule({
  imports:
    [
      RouterModule.forChild(HomeRoutes)
    ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

