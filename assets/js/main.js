"use strict";

import App_data from "/assets/js/module.js";

// ********* SECTION - GLOBAL VARIABLES & CONSTANTS ********* //

var  App = new App_data();
var select = document.querySelector(".select");
var current_date = document.querySelector(".date");
var current_time = document.querySelector(".time");

// ********* SECTION - GLOBAL FUNCTIONS ********* //

window.onload = () => {

  setup();
  run();

}

//> run application
function run(){

  let loop = setInterval( () => {

    show_header_data();

  }, 1000);

}

//> setup application
function setup(){

  select.onchange = () => {
    alert(select.value)
  }

  show_current_data_and_time();

}

//> show current date & time
function show_current_data_and_time(){

  current_date.innerText = App.current_date;
  current_time.innerText = App.current_time;

}