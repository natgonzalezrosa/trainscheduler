// Initialize Firebase

var config = {
    apiKey: "AIzaSyCxbaUWVyRBanK9lZdAbTjQOBvAf6quHAo",
    authDomain: "trainscheduler-d86ff.firebaseapp.com",
    databaseURL: "https://trainscheduler-d86ff.firebaseio.com",
    projectId: "trainscheduler-d86ff",
    storageBucket: "trainscheduler-d86ff.appspot.com",
    messagingSenderId: "329185125906"
};

firebase.initializeApp(config);

// Variable to reference the database
var database = firebase.database();

// Capture Button Click
$("#add-user").on("click", function (event) {

    event.preventDefault();

    // Grabbed values from text boxes
    var empName = $("#name-input").val().trim();
    var empRole = $("#role-input").val().trim();
    var empStart = moment($("#startdate-input").val().trim(), "DD/MM/YY").format("X");
    var empRate = $("#monthlyrate-input").val().trim();

    // Code for handling the push
    database.ref().push( {
        name: empName,
        role: empRole,
        start: empStart,
        rate: empRate
    });

    // Logs everything to console
    console.log(empName);
    console.log(empRole);
    console.log(empStart);
    console.log(empRate);

    // Alert
    alert("Employee successfully added!");

    $("#name-input").val("");
    $("#role-input").val("");
    $("#startdate-input").val("");
    $("#monthlyrate-input").val("");
});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {
    
    // Store everything into a variable
    var empName = snapshot.val().name;
    var empRole = snapshot.val().role;
    var empStart = snapshot.val().start;
    var empRate = snapshot.val().rate;

    // Convert the employee start
    var empConvertedStart = moment.unix(empStart).format("MM/DD/YY");

    // Calculate the months worked
    var empMonths = moment().diff(moment(empStart, "X"), "months");
    
    // Calculate the total billed rate
    var empBilled = empMonths * empRate;

    $("tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" + empConvertedStart + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});
