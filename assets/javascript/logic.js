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

// Capture Add Train Button On-Click
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

    // Alert that train was added
    alert("Train successfully added!");

    // Clears the values that within the text boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#traintime-input").val("");
    $("#frequency-input").val("");
});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {
    
    // Stores everything into variables
    var trainName = snapshot.val().name;
    var trainDestination = snapshot.val().destination;
    var trainTime = snapshot.val().time;
    var trainFrequency = snapshot.val().frequency;

    // Convert the first train time to military time
    var firstTimeConverted = moment(trainTime, "HH:mm");
    console.log("FIRST TRAIN TIME: " + moment(trainTime, "HH:mm").format("HH:mm"));

    // Current time in military time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times (in minutes)
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // trainRemainder variable is the remainder of the difference between times divided by the train frequency
    var trainRemainder = diffTime % trainFrequency;
    console.log(trainRemainder);

    // tMinutesTillTrain variable = minutes until the train arrives
    var tMinutesTillTrain = trainFrequency - trainRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train variable takes the current time and adds the minutes until the train arrives to it
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));

    // Appends all the rows with our database output to the table 
    $("tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + moment(nextTrain).format("hh:mm A") + "</td><td>" + tMinutesTillTrain + "</td><td></tr>");
});
