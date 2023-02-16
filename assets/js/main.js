// ---------------------------- VARIABLES ---------------------------- //

var local_date = document.querySelector(".local-date")
var local_time = document.querySelector(".local-time")
var day = document.querySelectorAll(".day")
var hour = document.querySelectorAll(".hour")
var cells = document.querySelectorAll("calendar-cells")
var calendar_cells = document.querySelectorAll("textarea")
var app_data = { time : "", date : "", day : "", today : "", current_hour : 0, user_data : {}}

// ---------------------------- FUNCTION ---------------------------- //

// Get local date
function get_local_date(){

  let date = new Date()
  let d = date.toDateString()
  let day = d.slice(0, 3)
  local_date.innerText = d

  if (day !== app_data.today){
    app_data.today = day
    update_day()

  }

}

// Get local time
function get_local_time(){

  let add_zero = (num) => {

    return num < 10 ? "0" + num : num

  }

  let date = new Date()
  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()

  local_time.innerText = app_data.time = ( add_zero(h) + ":" + add_zero(m) + ":" + add_zero(s) )

  if (h !== app_data.current_hour){

    app_data.current_hour = h
    animation()

  }

}

// Check and select the current hour
function select_hour(index){

  hour[index].classList.remove("selected-hour")
  if(index === app_data.current_hour) hour[index].classList.add("selected-hour")

}

// Calendar cells animation
function animation(){

  let rest_cells = () => {

    setTimeout(() => {

      for(let index = 0; index<calendar_cells.length; index++){

        calendar_cells[index].classList.remove("animate-cell")

      }

    }, 1000)

  }

  let index = 0;
  let loop = setInterval( () => {

    select_hour(index)

    calendar_cells[index].classList.add("animate-cell")
    index++
    
    if(index === calendar_cells.length){
      rest_cells()
      clearInterval(loop)
    }

  }, 50)

}

// Setup days function
function setup_day(){

  Array.from(day).forEach( (day_button) => {

    day_button.onclick = () => {
      document.querySelector(".selected-day").classList.remove("selected-day")
      day_button.classList.add("selected-day")
      app_data.day = day_button.getAttribute("day")
      update_calendar()
    } 
  })

}

// update current day
function update_day(){

  for(let index=0; index<day.length; index++){

    day[index].classList.remove("selected-day")
    if(day[index].getAttribute("day") === app_data.today)
      day[index].classList.add("selected-day")

  }

}

// Setup calendar cells
function setup_calendar(){

  for(let index=0; index<calendar_cells.length; index++){

    calendar_cells[index] = app_data.user_data[app_data.today][index]

  }

  for(let index=0; index<calendar_cells.length; index++){

    calendar_cells[index].onchange = () => {
      app_data.user_data[app_data.today][index] = calendar_cells[index].value
      localStorage.setItem("user_data", JSON.stringify(app_data.user_data))
    }

  }

}

// Update calendar data
function update_calendar(){

  let data = app_data.user_data[app_data.day];
  Array.from(calendar_cells).forEach( (cell, index) => {
    cell.value = data[index]
  })

}

function intial_user_data(){

  let day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  for(let i=0; i<7; i++){
    app_data["user_data"][day[i]] = []
    for(let j=0; j<24; j++){
      app_data["user_data"][day[i]].push("")
    }
  }

}

function load_user_data(){
  if(localStorage.getItem("user_data")){
    app_data["user_data"] = JSON.parse(localStorage.getItem("user_data"))
  }else{
    intial_user_data()
    localStorage.setItem("user_data", JSON.stringify(app_data["user_data"]))
  }
}

function clear_user_data(){
  localStorage.clear()
}

// Save user data
function save(){

  localStorage.setItem("user_data", JSON.stringify(app_data.user_data))

}

// Setup application
function setup_app(){

  get_local_date()
  get_local_time()

  setInterval(() => {
    get_local_date()
    get_local_time()
  }, 1000)

  get_local_date()
  get_local_time()
  intial_user_data()
  load_user_data()
  setup_day()
  setup_calendar()

}

// Setup application on window load
window.onload = () => {

  setup_app()

}

// Save user data on window cancel
window.oncancel = () => {

  save()
  
}