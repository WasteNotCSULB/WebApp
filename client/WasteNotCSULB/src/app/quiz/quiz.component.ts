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

  btnDisabled = true;


  items: any = null;
  objTEST: any = null;

  obj3: any = [{
    answered: false
  }];

  obj4: any = {
    answered: false
  }

  question0: any = '';
  question1: any = '';
  question2: any = '';
  question3: any = '';
  question4: any = '';
  question5: any = '';
  question6: any = '';
  question7: any = '';
  question8: any = '';
  question9: any = '';

  questionResultRight: any = null;
  questionResultWrong: any = null;
  totalRight: number = 0.0;
  scorePercent: number = 0.0;

  quizFinished: boolean = false;

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
         // this.question1 = this.items[0];
          var obj2 = {
            answered : false
          }
          this.items.forEach(element => {
           element= Object.assign(element, this.obj4 );

           console.log(JSON.stringify(element));

         });
         this.shuffle(this.items);

        } else {
          console.log("TTTT error"); 
        }
      } catch (error) {
        this.data.error(error['message']);
      }
    }

    myFunction(){
      
      if (this.idx >= 9) {
      //  this.btnDisabled = true;
        this.quizFinished = true;
      } 
      this.btnDisabled = true;
      this.questionResultRight = null;
      this.questionResultWrong = null;
      this.idx += 1;
    }

    submitAnswer(itemIndex: number, choiceNum: number ){

      var tempChoice: string = '';
      
       console.log("8383submitAnswer " + itemIndex);
       console.log("8383submitAnswer2 " + choiceNum);

       if(choiceNum === 7){
        console.log("8383submit Compost");
        tempChoice = 'compost';
       }
       if(choiceNum === 8){
        console.log("8383submit Recycle");
        tempChoice = 'recycle';

       }
       if(choiceNum === 9){
        console.log("8383submit Landfill");
        tempChoice = 'landfill';
       }

       console.log("title of item is " + this.items[itemIndex].title);
       console.log("category of item is " + this.items[itemIndex].category.name);
       console.log("title of tempChoice is " + tempChoice);
       console.log("comparing item_binchoice and tempchoice:  " + tempChoice.includes(this.items[itemIndex].category.name));

       if(tempChoice.includes(this.items[itemIndex].category.name)){
            console.log("DING DING you are correct");
            this.questionResultRight = "correct";
            this.totalRight += 1;
       } else {
            console.log("Incorrect choice");
            this.questionResultWrong = "incorrect";
       }

       this.items[itemIndex].answered = true;
       if( this.items[itemIndex].answered ) {
         this.btnDisabled = false;
       }

       if (this.totalRight > 0){
        this.scorePercent = (this.totalRight/(itemIndex + 1) * 100); 
       } else {
        this.scorePercent = 0;
       }
      
       console.log("item answered is " + this.items[itemIndex].answered);
       console.log("score percent " + (this.scorePercent));

       if(itemIndex > 9){
        this.quizFinished = true;
       }
  
    } //submitAnswer


    shuffle(array) : void {

      console.log("444shufffling" );
      let counter = array.length;
  
      // While there are elements in the array
      while (counter > 0) {
          // Pick a random index
          let index = Math.floor(Math.random() * counter);
  
          // Decrease counter by 1
          counter--;
  
          // And swap the last element with it
          let temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }
  
  }


}


