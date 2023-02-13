var local_date = document.querySelector(".local-date")
var local_time = document.querySelector(".local-time")
var days = document.querySelectorAll(".days")
var hours = document.querySelectorAll(".hour")
var cells = document.querySelectorAll("calendar-cells")
var calendar_cells = document.querySelectorAll("textarea")
var sh = null
var app_data = {
  selected_day : "Mon",
  time : "",
  date : "",
  user_data : {}
}

function check_current_hour(index){

  hours[index].classList.remove("selected-hour")
  if(hours[index].innerText.slice(0, 2) === sh) hours[index].classList.add("selected-hour")
  
}

function animation(){

  let index = 0;
  let loop = setInterval(() => {

    check_current_hour(index)
    calendar_cells[index].classList.add("animate-cell")
    index++
    if(index === calendar_cells.length){
      setTimeout(() => {
        for(let index = 0; index<calendar_cells.length; index++){
          calendar_cells[index].classList.remove("animate-cell")
        }
      }, 1000)
      clearInterval(loop)
    }

  }, 50)

}

function get_local_date(){
  let DATE = new Date()
  local_date.innerText = app_data["date"] = DATE.toDateString()
}

function get_local_time(){

  function addZero(num) {
    return num < 10 ? "0" + num : String(num)
  }

  let DATE = new Date()
  let h = addZero(DATE.getHours())
  let m = addZero(DATE.getMinutes())
  let s = addZero(DATE.getSeconds())
  local_time.innerText = app_data["time"] = h + ":" + m + ":" + s
  
  if (sh !== h){
    sh = h
    animation()
  }

}

function setup_aside(){
  app_data["selected_day"] = app_data["date"].slice(0, 3)
  Array.from(days).forEach( (button) => {
    if(button.getAttribute("day") === app_data["selected_day"]) button.classList.add("selected-day")
    button.onclick = () => {
      document.querySelector(".selected-day").classList.remove("selected-day")
      button.classList.add("selected-day")
      app_data["selected_day"] = button.getAttribute("day")
      update_calendar()
    } 
  })
}

function setup_calendar(){
  Array.from(calendar_cells).forEach( (cell, index) => {
    cell.value = app_data["user_data"][app_data["selected_day"]][index]
  })
  Array.from(calendar_cells).forEach( (cell, index) => {
    cell.onchange = () => {
      app_data["user_data"][app_data["selected_day"]][index] = cell.value
      localStorage.setItem("user_data", JSON.stringify(app_data["user_data"]))
    }
  })
}

function update_calendar(){
  let data = app_data.user_data[app_data.selected_day];
  Array.from(calendar_cells).forEach( (cell, index) => {
    cell.value = data[index]
  })
}

function intial_user_data(){

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  for(let i=0; i<7; i++){
    app_data["user_data"][days[i]] = []
    for(let j=0; j<24; j++){
      app_data["user_data"][days[i]].push("")
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

function setup(){
  get_local_date()
  get_local_time()
  intial_user_data()
  load_user_data()
  setup_aside()
  setup_calendar()
  setInterval(() => {
    get_local_date()
    get_local_time()
  }, 1000)
}

window.onload = () => {
  setup()
}