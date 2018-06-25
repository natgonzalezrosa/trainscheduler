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
$("#add-train").on("click", function (event) {

    event.preventDefault();

    // Grabbed values from text boxes
    var trainName = $("#name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = moment($("#traintime-input").val().trim(), "HH:mm").format("HH:mm");
    var trainFrequency = $("#frequency-input").val().trim();

    // Code for handling the push
    database.ref().push( {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    });

    // Logs everything to console
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);
    console.log("------------------");

    // Alert
    alert("Train successfully added!");

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#traintime-input").val("");
    $("#frequency-input").val("");
});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {
    
    // Store everything into a variable
    var trainName = snapshot.val().name;
    var trainDestination = snapshot.val().destination;
    var trainTime = snapshot.val().time;
    var trainFrequency = snapshot.val().frequency;

    // Convert the first train time
    var firstTimeConverted = moment(trainTime, "HH:mm");
    console.log("FIRST TRAIN TIME: " + moment(trainTime, "HH:mm").format("HH:mm"));

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var trainRemainder = diffTime % trainFrequency;
    console.log(trainRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - trainRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));

    $("tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + moment(nextTrain).format("hh:mm A") + "</td><td>" + tMinutesTillTrain + "</td><td></tr>");
});
