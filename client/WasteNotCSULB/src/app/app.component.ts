import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './data.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { environment } from "../environments/environment";
import { RestApiService } from './rest-api.service';


const BACKEND_URL = environment.api;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  itemData: any;
  totalItems: any;
  page = 1;


  countrylist: any[] = [
    { "name": "Afghanistan", "code": "AF" },
    { "name": "Åland Islands", "code": "AX" },
    { "name": "Albania", "code": "AL" },
    { "name": "Algeria", "code": "DZ" },
    { "name": "American Samoa", "code": "AS" },
    { "name": "AndorrA", "code": "AD" },
    { "name": "Angola", "code": "AO" },
    { "name": "Anguilla", "code": "AI" },
    { "name": "Antarctica", "code": "AQ" },
    { "name": "Antigua and Barbuda", "code": "AG" },
    { "name": "Argentina", "code": "AR" },
    { "name": "Armenia", "code": "AM" },
    { "name": "Aruba", "code": "AW" },
    { "name": "Australia", "code": "AU" },
    { "name": "Austria", "code": "AT" },
    { "name": "Azerbaijan", "code": "AZ" },
    { "name": "Bahamas", "code": "BS" },
    { "name": "Bahrain", "code": "BH" },
    { "name": "Bangladesh", "code": "BD" },
    { "name": "Pizza", "code": "PZ" }
  ];
  selected: string = "";


  searchTerm = '';
  isCollapsed = true;
  //name = new FormControl('');

  constructor(
    private router: Router,
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private rest: RestApiService
  ) {
    this.data.getProfile();
    this.activatedRoute.params.subscribe(res => {
      this.getItems();
    });
  }

  get token() {
    return localStorage.getItem('token');
  }

  collapse() {
    this.isCollapsed = true;
  }

  closeDropdown(dropdown) {
    dropdown.close();
  }

  logout() {
    this.data.user = {};
    localStorage.clear();
    this.router.navigate(['']);
  }

  search() {
    if (this.searchTerm) {
      this.collapse();
      this.router.navigate(['search', { query: this.searchTerm }]);
    }
    this.searchTerm = null; // https://stackoverflow.com/questions/41483914/clearing-an-input-text-field-in-angular2
  }

  jumpToTopPage() {
    window.scrollTo(0, 0);
  }

  selectCountryName(name) {
    console.log(name);
    console.log("this selected: " + this.selected);


    if (name) {
      this.collapse();
      this.router.navigate(['search', { query: name }]);
    }
    this.selected = null; // 

  }

  onChange(deviceValue) {
    console.log(deviceValue);
  }

  async getItems(event?: any) {
    if (event) {
      this.itemData = null;
    }
    try {
      const data = await this.rest.get(
        BACKEND_URL + `/items/?page=${this
          .page - 1}` ,
        //"http://wastenotcsulb-env.aewuadnmmg.us-east-1.elasticbeanstalk.com/api/items"
      );
      data['success']
        ? (this.itemData = data)
        : this.data.error(data['message']);
      console.log(this.itemData);
    } catch (error) {
      this.data.error(error['message']);
    }
  }

}