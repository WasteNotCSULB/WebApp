import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showDropDown = false;
  stateForm: FormGroup;

  states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District of Columbia', 'Florida'
    , 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky'
    , 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
    'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pizza', 'Pennsylvania', 'Puerto Rico',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'];

  searchTerm = '';
  isCollapsed = true;
  //name = new FormControl('');

  constructor(
    private router: Router,
    private data: DataService,
    private fb: FormBuilder
  ) {
    this.initForm();
    this.data.getProfile();
  }

  initForm(): FormGroup {
    return this.stateForm = this.fb.group({
      search: [null]
    })
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

  getSearchValue() {
    return this.stateForm.value.search;
  }

  selectValue(value) {
    this.stateForm.patchValue({ "search": value });
    this.showDropDown = false;
  }

  openDropDown() {
    this.showDropDown = false;
  }
  closeDropDown() {
    this.showDropDown = !this.showDropDown;
  }

}