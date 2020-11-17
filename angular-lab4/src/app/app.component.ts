import { Component } from '@angular/core';
import {HttpClient } from '@angular/common/http' //Necessary for Http requests

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SE3316-Lab4';


  constructor(private http: HttpClient){ }

  //Added function for get courses
  getCourses(subjectInput,courseInput,componentInput){
    //While loop is made to make sure list does not continuously add
    while((document.getElementById("timetables")).firstChild ){
      (document.getElementById("timetables")).removeChild((document.getElementById("timetables")).firstChild );
    }

    //Console log each of the user inputs for confirmation
    console.log(subjectInput);
    console.log(courseInput);
    console.log(componentInput);
    
    //If the course input and component input is empty; search by subject alone 
    if(courseInput == "" && componentInput == ""){
      this.http.get(`/api/courses/${subjectInput}`) //GET REQUEST
      .subscribe(
        (data:any[]) => {
          console.log(data);
          const l = document.getElementById('timetables');
              data.forEach(e => { //Go through the data array of the courses gain from B.E and add text
                  const item = document.createElement('li');
                  item.appendChild(document.createTextNode(`${e.subject} ${e.catalog_nbr} ${e.className} 
                  ${e.course_info[0].ssr_component} ${e.course_info[0].start_time} ${e.course_info[0].end_time}
                  ${e.course_info[0].days}`));
                  l.appendChild(item);
              });
        }
      )
    }else{ //Otherwise you may have the course code or the course code & componenent
      this.http.get(`/api/courses/${subjectInput}/${courseInput}/${componentInput}`)
      .subscribe(
        (data:any[]) => {
          console.log(data);
          const l = document.getElementById('timetables');
              data.forEach(e => { //Go through data array of the courses gained from B.E and add text
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

  //Added function for creating a schedule using F.E to B.E db.json file
  createSchedule(scheduleInput){
    //Notification to input a name
    while((document.getElementById("NoName")).firstChild ){
      (document.getElementById("NoName")).removeChild((document.getElementById("NoName")).firstChild );
    }
    var paragraph = document.getElementById("NoName");

    const notify = document.getElementById('NoName');
    if (!scheduleInput) {
      var text = document.createTextNode("Please input a name!");
      paragraph.appendChild(text);
      return;
    }

    //Console log a schedule input
    console.log(scheduleInput);

    //POST REQUEST to add a schedule
    this.http.post(`/api/schedules/${scheduleInput}`,null).subscribe();
  }

  //Added function for adding subject/course pair
  addCourse(scheduleInput,subjectInput,courseInput){
    console.log(scheduleInput);
    console.log(subjectInput);
    console.log(courseInput);
    //POST request to add subject course pair to schedule
    this.http.post(`/api/schedules/${scheduleInput}/${subjectInput}/${courseInput}`,null).subscribe();
  }

  //Added function for deleting schedule
  deleteSchedule(scheduleInput){
    console.log(scheduleInput);
    //DELETE REQUEST
    this.http.delete(`/api/schedules/${scheduleInput}`).subscribe();
  }

  //Added function to delete all schedules at once
  deleteAll(){
    console.log("All schedules deleted!");
    //DELETE REQUEST all schedules
    this.http.delete(`/api/schedules`).subscribe();
  }

  //Added function to display a single schedule 
  displaySchedule(scheduleInput){
    console.log(`${scheduleInput} was displayed!`);

    //To make sure that the schedule being displayed switches 
    while((document.getElementById("scheduleView")).firstChild ){
      (document.getElementById("scheduleView")).removeChild((document.getElementById("scheduleView")).firstChild );
    }

    //GET REQUEST of a single schedule
    this.http.get(`/api/schedules/${scheduleInput}`)
    .subscribe(
      (data:any[]) => {
        console.log(data);
        const l = document.getElementById('scheduleView');
            //data.forEach(e => {
                const item = document.createElement('li');
                item.appendChild(document.createTextNode(`${JSON.stringify(data)}`));
                l.appendChild(item);
            //});
      }
    )
  }
  //End
}