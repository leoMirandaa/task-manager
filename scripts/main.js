let nonImportantIcon = "fas fa-thumbs-up"
let importantIcon = "far fa-thumbs-up"
let isImportant = true;
let isPanelVisible =  true;
// let btnLabel = "Show"


function toggleImportance() {
  console.log("icon clicked");

  if(isImportant) {
    //switch to no imp
    $("#iImportant").removeClass(importantIcon).addClass(nonImportantIcon)
    // $("#iImportant").css({color: 'red'})
    isImportant = false;
  }
  else {
    $("#iImportant").removeClass(nonImportantIcon).addClass(importantIcon)
    // $("#iImportant").css({color: 'rgb(3, 123, 192)'})
    isImportant = true;
  }
}

function toggleVisibility() {
  if(isPanelVisible) {
    $("#form").css({display: 'none'})
    $("#btnVisibility").text("Show Form")
    isPanelVisible = false
  }
  else {
    $("#form").css({display: 'block'})
    $("#btnVisibility").text("Hide Form")

    isPanelVisible = true
  }
}

function init() {
  console.log("Task manager");

  //load data

  //hook events
  $("#iImportant").click(toggleImportance)
}

window.onload = init;