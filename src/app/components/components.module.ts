import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import {IdentificationComponent, NgbdModalIdentificationContent} from './identification/identification.component';
import {CommonModule} from '@angular/common';
import {ComponentsComponent} from './components.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    JwBootstrapSwitchNg2Module,
    ReactiveFormsModule
  ],
    declarations: [
        ComponentsComponent,
        RegistrationComponent,
        IdentificationComponent,
        NgbdModalIdentificationContent
    ],
    entryComponents: [NgbdModalIdentificationContent],
    exports: [ ComponentsComponent ]
})
export class ComponentsModule { }
