// Main Script File //

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var SELECTED_DAY = "Monday";
var data_time = {};
var page_loading = document.querySelector(".container-page-loading");
var date = document.querySelector(".container-header-date");
var time = document.querySelector(".container-header-time");
var aside = document.querySelector(".container-body-aside");
var table = document.querySelector(".section-table");

// @ For developer
function clear_local_userdata(){

    for(let id1=0; id1<7; id1++){
        local_userdata[DAYS[id1]] = [];
        for(let id2=0; id2<24; id2++){
            local_userdata[DAYS[id1]].push("");
        }
    }
    localStorage.setItem("local_userdata", JSON.stringify(local_userdata));
}

function disable_default_events(){

    // Disable default events
    document.oncontextmenu = (event) => {
        event.preventDefault();
    }
    document.onselectstart = (event) => {
        event.preventDefault();
    }

}

function load_local_userdata(){

    if(!localStorage.getItem("local_userdata")){ // Check if local_userdata doesn't exist

        window.local_userdata = {};
        for(let index_1=0; index_1<7; index_1++){
            local_userdata[DAYS[index_1]] = [];
            for(let index_2=0; index_2<24; index_2++){
                local_userdata[DAYS[index_1]].push("");
            }
        }
        localStorage.setItem("local_userdata", JSON.stringify(local_userdata));

    } else{ // If local_userdata exist

        window.local_userdata = JSON.parse(localStorage.getItem("local_userdata"));
        
    }

}

function edit_local_userdata(hour, value){

    local_userdata[SELECTED_DAY][hour] = value;
    localStorage.setItem("local_userdata", JSON.stringify(local_userdata));

}

function get_local_date(){

    let DATE = new Date();
    data_time = {
        "hour": DATE.getHours(),
        "day": () => {
            for(let index=0; index<7; index++){
                if(DAYS[index].includes(DATE.toDateString().slice(0, 3))){
                    SELECTED_DAY = DAYS[index];
                }
            }
            return SELECTED_DAY;
        },
        "fullTime": DATE.toLocaleTimeString(),
        "fullDate": DATE.toDateString()
    }

    // Update header
    time.innerHTML = data_time["fullTime"];
    date.innerHTML = data_time["fullDate"];

    // Update current hour
    document.getElementById(`${data_time["hour"]}`).classList.add("current-hour");

}

function init_aside(){

    // Init aside //
    for(let index=0; index<7; index++){
        aside.innerHTML += `<div class="days${DAYS[index]==SELECTED_DAY?" selected-day":""}" id="${DAYS[index]}">${DAYS[index]}</div>`;
    }

    // Add click event to days //
    Array.from(document.getElementsByClassName("days")).forEach((element)=>{
        element.addEventListener("click", ()=>{
            document.getElementById(SELECTED_DAY).classList.remove("selected-day");
            element.classList.add("selected-day");
            SELECTED_DAY = element.getAttribute("id");
            update_calendar();
        })
    });

}

function init_calendar(){

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

}

function update_calendar(){

    for(let index=0; index<24; index++){
        if (!local_userdata[SELECTED_DAY][index]) {
            document.getElementsByClassName("hours")[index].classList.add("empty-hour");
        }else if(document.getElementsByClassName("hours")[index].classList.contains("empty-hour")){
            document.getElementsByClassName("hours")[index].classList.remove("empty-hour");
        }
        document.getElementsByTagName("textarea")[index].value = local_userdata[SELECTED_DAY][index];
    }

}

function setup(){

    disable_default_events();
    load_local_userdata();
    setInterval(get_local_date, 1000);
    init_aside();
    init_calendar();
    update_calendar();

    // Remove loding page //
    setTimeout(()=>{
        page_loading.style.display = "none";
    }, 1000);

}

window.onload = () => {

    // Setup application //
    setup();

}