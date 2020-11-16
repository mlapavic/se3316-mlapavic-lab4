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
    while((document.getElementById("timetables")).firstChild ){
      (document.getElementById("timetables")).removeChild((document.getElementById("timetables")).firstChild );
    }
    console.log(subjectInput);
    console.log(courseInput);
    console.log(componentInput);
    
    if(courseInput == "" && componentInput == ""){
      this.http.get(`http://localhost:3000/api/courses/${subjectInput}`)
      .subscribe(
        (data:any[]) => {
          console.log(data);
          const l = document.getElementById('timetables');
              data.forEach(e => {
                  const item = document.createElement('li');
                  item.appendChild(document.createTextNode(`${e.subject} ${e.catalog_nbr} ${e.className} 
                  ${e.course_info[0].ssr_component} ${e.course_info[0].start_time} ${e.course_info[0].end_time}
                  ${e.course_info[0].days}`));
                  l.appendChild(item);
              });
        }
      )
    }else{
      this.http.get(`http://localhost:3000/api/courses/${subjectInput}/${courseInput}/${componentInput}`)
      .subscribe(
        (data:any[]) => {
          console.log(data);
          const l = document.getElementById('timetables');
              data.forEach(e => {
                  const item = document.createElement('li');
                  item.appendChild(document.createTextNode(`${e.subject} ${e.catalog_nbr} ${e.className} 
                  ${e.course_info[0].ssr_component} ${e.course_info[0].start_time} ${e.course_info[0].end_time}
                  ${e.course_info[0].days}`));
                  l.appendChild(item);
              });
        }
      )
    }

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