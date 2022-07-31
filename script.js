var validOperRegex= `[-]?[0]?[1-9]+([.][0-9]+)?([/*-+][-]?[0]?[1-9]+([.][0-9]+)?)*`;
var validDecimalEntryRegex = /[.]*[0-9]+\.[0-9]+$/;

$(document).ready(function() {
    var currentNumber;
    var lastEntry;
    clear();

    //clear
    $("#clear").click(function(){
        clear();
    });

    //begin new calculation with ancient result?
    $("#add, #subtract, #multiply, #divide").click(function(){
        let previous = $("#answer p").text();
        if(previous){
            $("#operation p").text(previous);
            $("#answer p").text("");
        }
    });
    $("#add, #subtract, #multiply, #divide").click(function(){
        let previous = $("#answer p").text();
        if(previous){
            $("#answer p").text("");
        }
    });

    //display click value on screen
    $("#one, #two, #three, #four, #five, #six, #seven, #eight, #nine").click(function(){
        if($("#operation p").text() === "0"){  //discard initial zero
            $("#operation p").text($(this).text());
        }
        else{
            $("#operation p").append($(this).text());
        }
    });

    //case of zero: don't display multiple start zero
    $("#zero").click(function(){
        currentNumber = $("#operation p").text();
        if(currentNumber.charAt(currentNumber.length - 1) === "0" 
        &&  ['-', '*', '/', '+', ''].includes(currentNumber.charAt(currentNumber.length - 2) )){
            alert("two much starting zero");
        }
        else{
            $("#operation p").append($(this).text());
        }  
    });

    //case of decimal point
    $("#decimal").click(function(){
        let currentNumber = $("#operation p").text();
        if(['-', '*', '/', '+', '.', ''].includes(currentNumber.charAt(currentNumber.length - 1)) === false
            && !validDecimalEntryRegex.test(currentNumber)){
            $("#operation p").append($(this).text());
        }
    });


    //operator
    $("#add, #multiply, #divide").click(function(){
        var entry = $("#operation p").text();
        lastEntry = entry[entry.length - 1];
        if(['-', '*', '/', '+'].includes(lastEntry)
            && ['-', '*', '/', '+'].includes(entry[entry.length - 2]) == false){
            let newEntry = entry.substring(0, entry.length-1) + $(this).text();
            $("#operation p").text(newEntry);
        }
        else if(['-', '*', '/', '+'].includes(lastEntry)
                && ['-', '*', '/', '+'].includes(entry[entry.length - 2])){
            //alert('hey');
            let newEntry = entry.substring(0, entry.length-2) + $(this).text();
            $("#operation p").text(newEntry);
        }
        else{
            $("#operation p").append($(this).text());
        }
    });
    //case of subtract
    $("#subtract").click(function(){
        var entry = $("#operation p").text();
        lastEntry = entry[entry.length - 1];
        if(lastEntry !== '-' ){
            $("#operation p").append('-');
        }
    });
    
    //calculate
    
    $("#equals").click(function(){
        let answer = eval($("#operation p").text());

        if(answer){
            $("#answer p").text(answer);
            //$("#operation p").empty();
        } else{
            $("#error").show();
        }
        //alert(answer);
    });
});

function clear() {
    $("#operation p").text(0);
    $("#answer p").text("");
    $("#error").hide();
}