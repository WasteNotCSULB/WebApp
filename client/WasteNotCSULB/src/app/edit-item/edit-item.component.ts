import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {


    item = {
      title: '',
      categoryId: '',
      description: '',
      item_picture: ''
    };
  
    categories: any;
    btnDisabled = false;
  
    constructor(
      private data: DataService,
      private rest: RestApiService,
      private router: Router,
      private activatedRoute: ActivatedRoute
    ) { }
  
 


    ngOnInit() { //ngOnInit() will be run everytime the page(item) is visited
      this.activatedRoute.params.subscribe(res => {
        this.rest
          .get(`http://localhost:3030/api/item/${res['id']}`)
          .then(data => {
            data['success']
              ? (this.item = data['item'])
              : this.router.navigate(['/']);
            if(data['success']){
              console.log(  "ngOnInit in editItem component"
              );
  
            }  
          })
          .catch(error => this.data.error(error['message']));
      });
    }; //ngOnInit
  
    validate(item) {
  
     // console.log("33post-item " + item);
     //  console.log(JSON.stringify(item));
      if (item.title) {
          if (item.categoryId) {
            if (item.item_picture) {
              if (item.description ) {
                return true;
              } else {
                this.data.error('Please enter description.');
              }
            } else {
              this.data.error('Please enter a link for the item.');
            }
          } else {
            this.data.error('Please select category.');
          }
        
      } else {
        this.data.error('Please enter a title.');
      }
    }
  
  
  
    async post() {
      this.btnDisabled = true;
      try {
        if (this.validate(this.item)) {
  
          console.log("$$$$ categoryID is " + this.item.categoryId);
          const data = await this.rest.post(
            'http://localhost:3030/api/admin/items',
            { category: this.item.categoryId,
              title: this.item.title,
              description: this.item.description,
              image: this.item.item_picture }
          );
          data['success']
            ? this.router.navigate(['/profile/'])
              .then(() => this.data.success(data['message']))
              .catch(error => this.data.error(error))
            : this.data.error(data['message']);
        }
      } catch (error) {
        this.data.error(error['message']);
      }
      this.btnDisabled = false;
    }
  
  }
  
