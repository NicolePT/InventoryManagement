import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {InventoryComponent} from './components/inventory/inventory.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
		InventoryComponent
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		ReactiveFormsModule,
		BrowserAnimationsModule, // required animations module
		ToastrModule.forRoot(), // ToastrModule added
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
