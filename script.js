//Global Variables

//Hours array using moment.js
    var workHours = [
moment().hour(9).format('hA'),
moment().hour(10).format('hA'),
moment().hour(11).format('hA'),
moment().hour(12).format('hA'),
moment().hour(13).format('hA'),
moment().hour(14).format('hA'),
moment().hour(15).format('hA'),
moment().hour(16).format('hA'),
moment().hour(17).format('hA')
];


//Query selectors
    var task = $('.description');
    var currentDayEl = $('#currentDay');
    var containerEl = $('.container');
    var timeBlockHour = $('col-1 hour');

//Adding text content to 'currentDay'
    var currentHour = moment().hour();
    var currentDay = moment().format('dddd, MMMM Do');
currentDayEl.text(currentDay);


//Changing/Checking timeblock depending on Past, Present, or Future hours
function auditTimeBlock(timeBlockEventSpace) {

    var currentTimeBlockHour = moment($(timeBlockHour).text().trim(), 'hA').hour();
$(timeBlockEventSpace).removeClass('past present future');


    if (currentTimeBlockHour > currentHour) {
$(timeBlockEventSpace).addClass('future');
}
    else if (currentTimeBlockHour === currentHour) {
$(timeBlockEventSpace).addClass('present');
}
    else {
$(timeBlockEventSpace).addClass('past');
}
}

//Setting item to local storage
function saveTask(hour, task) {
localStorage.setItem(hour, task);
}

//Getting item from local storage on load
function loadTask() {
    for (var i = 0; i < workHours.length; i++) {
    let task = localStorage.getItem(workHours[i])

    if (task) {
$('#' + (i + 9)).siblings().first().children().text(task);
}}}

    for (var i = 0; i < workHours.length; i++) {

    var timeBlockR = $('<div>')
.addClass('row time-block')
.attr({
id: 'row-' + (i + 9)
})


    var timeBlockHour = $('<div>')
.addClass('col-1 hour')
.text(workHours[i])
.attr({
id: i + 9
})


    var timeBlockEventSpace = $('<div>')
.addClass('col-10')
.attr({
id: 'time-block-' + (i + 9)
})


    var userInput = $('<p>')
.addClass('description')
.text(' ')
.attr({
id: 'Hour-' + (i + 9)
});


auditTimeBlock(timeBlockEventSpace);


    var saveBtn = $('<button>')
.addClass('col-1 saveBtn')
.attr({
id: 'save-button-' + (i + 9),
type: 'button',
})
.on('click', function () {

    var hour = $(this).siblings().first().text();

    var task = $(this).siblings().last().text();


saveTask(hour, task)

})


    var saveIcon = $('<i>')
.addClass('fas fa-save');


$(containerEl).append(timeBlockR);

$(timeBlockR).append(timeBlockHour);

$(timeBlockR).append(timeBlockEventSpace);

$(timeBlockEventSpace).append(userInput);

$(timeBlockR).append(saveBtn);

$(saveBtn).append(saveIcon);
}

//Lets user edit text upon click into timebox
$('.col-10').on('click', 'p', function () {

    var text = $(this)
.text()
.trim()

    var textInput = $('<textarea>')
.addClass('form-control')
.val(text);

$(this).replaceWith(textInput);

textInput.trigger('focus');
});

//Replacing user input into <p>
$('.col-10').on('blur', 'textarea', function () {

    var text = $(this)
.val()
.trim();


    var userTextP = $("<p>")
.addClass("description")
.text(text);


$(this).replaceWith(userTextP);
})

//Loads on refresh
loadTask();