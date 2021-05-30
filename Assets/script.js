let hours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
let $planner = $(".container");
let currentDay = moment().format('dddd MMMM Do');
let currentTime = moment().hour();

// Set date at the top of the page to be the current date.
$("#currentDay").text(currentDay);

// If the day changes clear the local storage.
if (currentDay != localStorage.getItem("planner date")) {
    for (let i = 0; i < hours.length; i++) {
        const time = hours[i];
        localStorage.removeItem(time);
    }
}

// Save the date for the if statement above.
localStorage.setItem("planner date", currentDay);

// Save button function that saves the textarea's text to local storage with the time as the key.
function saveTask() {
    time = $(this).parent().siblings('.hour').text();
    desc = $(this).parent().siblings('.description').val();

    localStorage.setItem(time, desc);
}

// Makes and appends the rows and coloumns
for (let i = 0; i < hours.length; i++) {
    let time = hours[i];
    let $row = $('<div class="row"></div>');
    $planner.append($row);
    $row.append('<div class="col-1 hour">' + time + '</div>');

    hour = moment(time, "h A").hour();

    // Determines whether the current row is in the past, present, or future.
    let ppf = "";
    if (hour < currentTime) {
        ppf = "past";
    } else if (hour === currentTime) {
        ppf = "present";
    } else {
        ppf = "future";
    }

    // Gets the description out of local stroge for the current time.
    $textArea = $('<textarea class="col-10 description ' + ppf + '"></textarea>');
    desc = localStorage.getItem(time);
    $textArea.val(desc);

    $row.append($textArea);

    // Sets up save button.
    $saveDiv = $('<div class="col-1" style="padding-left:0px; padding-right:0px;"></div>');
    $saveButton = $('<button class="saveBtn ui-button ui-widget ui-corner-all ui-button-icon-only" title="Button with icon only"></button>');
    $saveSpan = $('<span class="ui-icon ui-icon-disk"></span>');

    $saveButton.on("click", saveTask);
    $saveButton.append($saveSpan);
    $saveDiv.append($saveButton)

    $row.append($saveDiv);

}
