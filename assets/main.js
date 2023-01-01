// Main Script //

function setup(){

    // Disable default events //
    document.oncontextmenu = (event) => {
        event.preventDefault();
    }

    // Build calendar //
    let calendar_table = document.getElementsByTagName("table")[0];
    let hour = "";
    let hour_count = 0;
    for(let id1=1; id1<=6; id1++){
        calendar_table.innerHTML += "<tr></tr>";
        for(let id2=1; id2<=4; id2++){
            hour = hour_count >= 10 ? String(hour_count) : "0" + String(hour_count);
            document.getElementsByTagName("tr")[id1-1].innerHTML += `<td><span>${hour}:00</span></td>`;
            hour_count++;
        }
    }

    // Remove loding page //
    setTimeout(()=>{
        document.getElementsByClassName("loading-page")[0].style.display = "none";
    }, 100);

}

window.onload = () => {

    // Setup application //
    setup();

}