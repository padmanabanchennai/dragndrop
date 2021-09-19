import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';


const routes: Routes = [
  {path: 'formbuilder', component: FormBuilderComponent},
  {path: '', component: FormBuilderComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
