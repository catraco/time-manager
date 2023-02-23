/*
// ---------------------------- VARIABLES ---------------------------- //

var local_date = document.querySelector(".local-date")
var local_time = document.querySelector(".local-time")
var btn_day = document.querySelectorAll(".btn-day")
var hour = document.querySelectorAll(".hour")
var cells = document.querySelectorAll("calendar-cells")
var calendar_cells = document.querySelectorAll("textarea")
var app_data = { time : "", date : "", day : "", today : "", current_hour : 0, user_data : {}}

// ---------------------------- FUNCTION ---------------------------- //


// Update header data
function update_header(){

  local_date.innerText = app_data.date
  local_time.innerText = app_data.time

}

// Check and select the current hour
function select_hour(index){

  cells[index].classList.remove("selected-cell")
  if(index === app_data.current_hour) cells[index].classList.add("selected-cell")

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

  Array.from(btn_day).forEach( (day) => {

    day.onclick = () => {
      document.querySelector(".selected-day").classList.remove("selected-day")
      day.classList.add("selected-day")
      app_data.day = day.getAttribute("day")
      update_calendar()
    } 
  })

}

// update current day
function update_day(){

  for(let index=0; index<btn_day.length; index++){

    btn_day[index].classList.remove("selected-day")
    if(btn_day[index].getAttribute("day") === app_data.today)
    btn_day[index].classList.add("selected-day")

  }

}

// Setup calendar cells
function setup_calendar(){

  for(let index=0; index<calendar_cells.length; index++){

    calendar_cells[index].onchange = () => {
      app_data.user_data[app_data.today][index] = calendar_cells[index].value
      localStorage.setItem("user_data", JSON.stringify(app_data.user_data))
    }

  }

  update_calendar()

}

// Update calendar data
function update_calendar(){

  let data = app_data.user_data[app_data.day];
  Array.from(calendar_cells).forEach( (cell, index) => {
    cell.value = data[index]
  })

}

function intial_user_data(){

  let btn_day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  for(let i=0; i<7; i++){
    app_data["user_data"][btn_day[i]] = []
    for(let j=0; j<24; j++){
      app_data["user_data"][btn_day[i]].push("")
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
    update_header()
  }, 1000)

  get_local_date()
  get_local_time()
  intial_user_data()
  load_user_data()
  setup_day()
  setup_calendar()

}

*/

/*
// Save user data on window cancel
window.oncancel = () => {

  save()

}
*/