import { Component, OnInit} from '@angular/core';

import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  idx : number = 0;

  btnDisabled = false;


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

        if(data['success']){
          this.question1 = this.items[0];
          var obj2 = {
            answered : false
          }
          this.items.forEach(element => {
           element= Object.assign(element, this.obj4 );

           console.log(JSON.stringify(element));

         });


        } else {
          console.log("TTTT error"); 
        }
      } catch (error) {
        this.data.error(error['message']);
      }
    }

    myFunction(){
      
      if (this.idx > 10) {
        this.btnDisabled = true;
      } else {

      this.idx += 1;

      }

    }

}


