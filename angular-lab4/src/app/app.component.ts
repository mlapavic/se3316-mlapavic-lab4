import { Component } from '@angular/core';
import {HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SE3316-Lab4';


  constructor(private http: HttpClient){ }

  getCourses(subjectInput,courseInput,componentInput){
    console.log(subjectInput);
    console.log(courseInput);
    console.log(componentInput);
    
  }

  createSchedule(scheduleInput){
    console.log(scheduleInput);
}

  addCourse(scheduleInput,subjectInput,courseInput){
    console.log(scheduleInput);
    console.log(subjectInput);
    console.log(courseInput);
  }

  deleteSchedule(scheduleInput){
    console.log(scheduleInput);
  }

  deleteAll(){
    console.log("All schedules deleted!");
  }

  displaySchedule(scheduleInput){
    console.log(`${scheduleInput} was displayed!`);
  }
  //End
}