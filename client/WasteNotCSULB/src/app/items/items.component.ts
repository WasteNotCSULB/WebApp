import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { environment } from "../../environments/environment";
const BACKEND_URL = environment.api;


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  searchTerm = '';
  itemData: any;
  totalItems: any;
  page = 1;

  constructor(
    private data: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rest: RestApiService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.getItems();
    });
  }



  get lower() {
    return 10 * (this.page - 1) + 1;
  }

  get upper() {
    return Math.min(10 * this.page, this.itemData.totalItems);
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

  search() {
    if (this.searchTerm) {
      this.router.navigate(['search', { query: this.searchTerm }]);
    }
    this.searchTerm = null; // https://stackoverflow.com/questions/41483914/clearing-an-input-text-field-in-angular2
  }

} // class
