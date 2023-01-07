// Main Script File //

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var SELECTED_DAY = "Monday";
var local_userdata = {};

// For developer //
function clear_local_userdata(){

    for(let id1=0; id1<7; id1++){
        local_userdata[DAYS[id1]] = [];
        for(let id2=0; id2<24; id2++){
            local_userdata[DAYS[id1]].push("✕");
        }
    }
    localStorage.setItem("local_userdata", JSON.stringify(local_userdata));
}

function disable_default_events(){

    // Disable default events //
    document.oncontextmenu = (event) => {
        event.preventDefault();
    }

    document.onselect = (event) => {
        event.preventDefault();
    }
    document.onselectionchange = (event) => {
        event.preventDefault();
    }
    document.onselectstart = (event) => {
        event.preventDefault();
    }

}

function load_local_userdata(){

    // Check if deosn't local_userdata exist //
    if(!localStorage.getItem("local_userdata")){
        for(let id1=0; id1<7; id1++){
            local_userdata[DAYS[id1]] = [];
            for(let id2=0; id2<24; id2++){
                local_userdata[DAYS[id1]].push("✕");
            }
        }
        localStorage.setItem("local_userdata", JSON.stringify(local_userdata));
    }
    // If local_userdata exist //
    else{
        local_userdata = JSON.parse(localStorage.getItem("local_userdata"));
    }

}

function edit_local_userdata(hour, value){

    local_userdata[SELECTED_DAY][hour] = value;
    localStorage.setItem("local_userdata", JSON.stringify(local_userdata));

}

function init_aside(){

    // Build aside //
    for(let index=0; index<7; index++){
        document.querySelector(".container-body-aside").innerHTML += `<div class="days${DAYS[index]==SELECTED_DAY?" selected-day":""}">${DAYS[index]}</div>`;
    }

    // Add click event to days //
    Array.from(document.getElementsByClassName("days")).forEach((element)=>{
        element.addEventListener("click", ()=>{
            Array.from(document.getElementsByClassName("days")).forEach((element)=>{
                if(element.classList.contains("selected-day")){
                    element.classList.remove("selected-day");
                }
            });
            element.classList.add("selected-day");
            SELECTED_DAY = element.innerText;
            update_calendar();
        })
    });

}

function init_calendar(){

    // Build calendar //
    let sub_hour = "", hour_count = 0;
    for(let index_1=1; index_1<=6; index_1++){
        document.querySelector(".section-table").innerHTML += "<tr></tr>";
        for(let index_2=1; index_2<=4; index_2++){
            sub_hour = hour_count >= 10 ? String(hour_count) : "0" + String(hour_count);
            document.getElementsByTagName("tr")[index_1-1].innerHTML += `\
            <td>\
                <span class="hours">${sub_hour}:00</span>\
                <textarea class="textarea" hour="${hour_count}"></textarea>\
            </td>`;
            hour_count++;
        }
    }

    // Add click event to days //
    Array.from(document.getElementsByClassName("textarea")).forEach((element) => {
        element.addEventListener("change", () => {
            edit_local_userdata(Number(element.getAttribute("hour")), element.value);
        });
    });

}

function update_calendar(){

    for(let index=0; index<24; index++){
        document.getElementsByTagName("textarea")[index].value = local_userdata[SELECTED_DAY][index];
    }

}

function setup(){

    disable_default_events();
    load_local_userdata();
    init_aside();
    init_calendar();
    update_calendar();

    // Remove loding page //
    setTimeout(()=>{
        document.getElementsByClassName("container-page-loading")[0].style.display = "none";
    }, 1000);

}

window.onload = () => {

    // Setup application //
    setup();

}