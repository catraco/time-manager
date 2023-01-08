// Main Script File //

// Variables & Constants
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var page_loading = document.querySelector(".container-page-loading");
var date = document.querySelector(".container-header-date");
var time = document.querySelector(".container-header-time");
var aside = document.querySelector(".container-body-aside");
var table = document.querySelector(".section-table");
var global_data = {};
var local_userdata = {};
var data_time = {};

// Disable default events
function disable_default_events(){

    document.oncontextmenu = (event) => {
        event.preventDefault();
    }
    document.onselectstart = (event) => {
        event.preventDefault();
    }

}

// load local userdata
function load_local_userdata(){

    // check if local_userdata doesn't exist
    if(!localStorage.getItem("local_userdata")){

        for(let index_1=0; index_1<7; index_1++){
            local_userdata[DAYS[index_1]] = [];
            for(let index_2=0; index_2<24; index_2++){
                local_userdata[DAYS[index_1]].push("");
            }
        }
        localStorage.setItem("local_userdata", JSON.stringify(local_userdata));

    }
    // if local_userdata exist
    else{

        local_userdata = JSON.parse(localStorage.getItem("local_userdata"));
        
    }

}

// Edit local userdata
function edit_local_userdata(hour, value){

    local_userdata[global_data["selected_day"]][hour] = value;
    localStorage.setItem("local_userdata", JSON.stringify(local_userdata));

}

function get_local_date(){

    DATE = new Date();

    data_time = {
        "hour": DATE.getHours(),
        "day": "",
        "fullTime": DATE.toLocaleTimeString(),
        "fullDate": DATE.toDateString()
    }

    for(let index=0; index<7; index++){
        if(DAYS[index].includes(DATE.toDateString().slice(0, 3))){
            data_time["day"] = DAYS[index];
            break;
        }
    }

}

// Init all html element
function init_html(){

    for(let index=0; index<7; index++){
        if(DAYS[index].includes(DATE.toDateString().slice(0, 3))){
            global_data["selected_day"] = DAYS[index];
            break;
        }
    }

    // Init aside //
    for(let index=0; index<7; index++){
        aside.innerHTML += `<div class="days${DAYS[index]==global_data["selected_day"]?" selected-day":""}" id="${DAYS[index]}">${DAYS[index]}</div>`;
    }

    // Add click event to days //
    Array.from(document.getElementsByClassName("days")).forEach((element)=>{
        element.addEventListener("click", ()=>{
            document.getElementById(global_data["selected_day"]).classList.remove("selected-day");
            element.classList.add("selected-day");
            global_data["selected_day"] = element.getAttribute("id");
            update_calendar();
        });
    });

    // Init calendar //
    let sub_hour = "", hour_count = 0;
    for(let index_1=1; index_1<=6; index_1++){
        table.innerHTML += "<tr></tr>";
        for(let index_2=1; index_2<=4; index_2++){
            sub_hour = hour_count >= 10 ? String(hour_count) : "0" + String(hour_count);
            document.getElementsByTagName("tr")[index_1-1].innerHTML += `\
            <td>\
                <span class="hours">${sub_hour} : 00</span>\
                <textarea class="textarea" id="${hour_count}" spellcheck="false"></textarea>\
            </td>`;
            hour_count++;
        }
    }

    // Add change event to textarea //
    Array.from(document.getElementsByClassName("textarea")).forEach((element) => {
        element.addEventListener("change", () => {
            edit_local_userdata(Number(element.getAttribute("id")), element.value);
            update_calendar();
        });
    });

    // Update calendar after init //
    update_calendar();

}

// update calendar
function update_calendar(){

    for(let index=0; index<24; index++){
        if (!local_userdata[global_data["selected_day"]][index]) {
            document.getElementsByClassName("hours")[index].classList.add("empty-hour");
        }else if(document.getElementsByClassName("hours")[index].classList.contains("empty-hour")){
            document.getElementsByClassName("hours")[index].classList.remove("empty-hour");
        }
        document.getElementsByTagName("textarea")[index].value = local_userdata[global_data["selected_day"]][index];
    }

}

// Update all html element
function update(){

    // Update header - time & date
    time.innerHTML = data_time["fullTime"];
    date.innerHTML = data_time["fullDate"];

    // Update calendar - current hour
    document.getElementById(`${data_time["hour"]}`).classList.add("current-hour");

}

// Remove loading page 
function loading_success(){

    setTimeout(()=>{
        page_loading.style.display = "none";
    }, 1000);

}

// Main loop function
function run(){

    setInterval(() => {

        get_local_date();
        update();

    }, 1000);

}

// Setup application
function setup(){

    disable_default_events();
    load_local_userdata();
    get_local_date();
    init_html();
    run();
    loading_success();

}

// On window load
window.onload = () => {

    // Setup application //
    setup();

}