import { Component, OnInit } from '@angular/core';

import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  items: any = null;
  question1: any = '';
  objTEST: any = null;

  obj3: any = [{
    answered: false
  }];

  obj4: any = {
    answered: false
  }
  constructor( 
    private data: DataService,
    private rest: RestApiService) { }

    async ngOnInit() {
      try {
        const data = await this.rest.get(
          'http://localhost:3030/api/items'
        );
        data['success']
          ? (this.items = data['items'])
          : this.data.error(data['message']);
        //data['success']
        //  ? (this.question1 = this.items[0])
        //  : console.log("TTTT error");  
        if(data['success']){
          this.question1 = this.items[0];
          var obj2 = {
            answered : false
          }
          this.items.forEach(element => {
           element= Object.assign(element, this.obj4 );

           console.log(JSON.stringify(element));

         });
        //  this.objTEST = Object.assign(this.items, this.obj3 );
        //  console.log("dfdfd " + this.objTEST);
        //  console.log(JSON.stringify(this.objTEST));
       // console.log(JSON.stringify(this.items));


        } else {
          console.log("TTTT error"); 
        }
      } catch (error) {
        this.data.error(error['message']);
      }
    }

}


