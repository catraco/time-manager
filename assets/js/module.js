"use strict";

// ********* SECTION - GLOBAL VARIABLES & CONSTANTS ********* //

const WEEKDAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const USER_NAME = "user";

// ********* SECTION - CLASSES ********* //

export default class App_data {

  constructor(){

    this.user_data = {};
    this.setup();

  }

  setup(){

    this.load_user_data();

  }

  load_user_data(){

    if(localStorage.getItem(USER_NAME)) this.user_data = JSON.parse(localStorage.getItem(USER_NAME));
    else this.create_user_data();

  }

  create_user_data(){

    for(let index in WEEKDAY){

      this.user_data[ WEEKDAY[index] ] = [];
      for(let j=0; j<24; j++) this.user_data[ WEEKDAY[index] ].push("");

    }

    localStorage.setItem(USER_NAME, JSON.stringify(this.user_data));
  
  }

  delete_user_data(){

    localStorage.removeItem(USER_NAME);

  }

  get current_date(){

    let date = new Date();
    return date.toDateString();

  }

  get current_day(){

    let date = new Date();
    return WEEKDAY[date.getDay()];

  }

  get current_time(){

    let date = new Date();
    let add_zero = (num) => { return num < 10 ? "0" + num : num }
    return ( add_zero(date.getHours()) + ":" + add_zero(date.getMinutes()) + ":" + add_zero(date.getSeconds()) );

  }

  get current_hour(){

    let date = new Date();
    let add_zero = (num) => { return num < 10 ? "0" + num : num }
    return add_zero(date.getHours());

  }

}