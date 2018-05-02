import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  item: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private rest: RestApiService,
    private router: Router,
  ) {}

  ngOnInit() { //ngOnInit() will be run everytime the page(item) is visited
    this.activatedRoute.params.subscribe(res => {
      this.rest
        .get(`http://localhost:3030/api/item/${res['id']}`)
        .then(data => {
          data['success']
            ? (this.item = data['item'])
            : this.router.navigate(['/']);
        })
        .catch(error => this.data.error(error['message']));
    });
  }
}