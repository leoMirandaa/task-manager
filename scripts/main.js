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
    // $("#form").css({display: 'none'})
    $("#form").removeClass("show-form")
    $("#form").addClass("hide-form")

    $("#btnVisibility").text("Show Form")
    isPanelVisible = false
  }
  else {
    // $("#form").css({display: 'block'})

    $("#form").removeClass("hide-form")
    $("#form").addClass("show-form")

    $("#btnVisibility").text("Hide Form")

    isPanelVisible = true
  }
}

function saveTask() {
  //Read values
  let important = $("#iImportant").val()
  let title = $("#txtTitle").val();
  let description = $("#txtDescription").val();
  let dueDate = $("#selDueDate").val();
  let startDate = $("#selStartDate").val();
  let category = $("#selCategory").val();
  let color = $("#txtColor").val();
  important = !isImportant;

  //data validations
  //if the title is empty, show an error and DO NOT continue
  if(title.length < 5) {
    $("#alertError").removeClass("hide");

    setTimeout(function() {
      $("#alertError").addClass("hide");
    },5000 );
    return;
  }
  console.log('leo');
  let task = new Task (important, title, description, dueDate, startDate, category, color)

  //send the task to server
  sendTaskToServer(task)

  //display the task
  // displayTask(task);

    //clear form
  // clearForm();
}

//send the task to server
function sendTaskToServer(task) {

  let jsonData = JSON.stringify(task); //encode the obj to a json string
  // console.log("jsonData ",jsonData);

  $.ajax({
    type:"POST",
    url : "https://fsdiapi.azurewebsites.net/api/tasks/",
    data: jsonData,
    contentType: "application/json",//specify

    success: function(data) {
      console.log("success... ", data);
      displayTask(task);
      clearForm();
    },
    error: function(errorDetails) {
      console.log("errorDetails... ", errorDetails);
      //show an error
    },
  });
  //display the task
  // displayTask(task);
}

function clearForm() {
  let important = $("#iImportant").val()
  let title = $("#txtTitle").val("");
  let description = $("#txtDescription").val("");
  let dueDate = $("#selDueDate").val("");
  let startDate = $("#selStartDate").val("");
  let category = $("#selCategory").val("");
  let color = $("#txtColor").val("#000000");
}


// <!--h1>important: ${task.important}</!--h1>
function displayTask(task) {
  let category = getCategory(task.category)
  let icon = task.important ? 'fas fa-thumbs-up' : ''

  let syntax = `
    <div class="task" style="border-left: solid .5rem ${task.color}">
      <i class="${icon} icon-important-task"></i>
      <div class="info">
        <h5>${task.title}</h5>
        <h4>${category}</h4>

        <div class="dates">
          <label class="date">${task.startDate}</label> <b>|</b>
          <label class="date">Due date: ${task.dueDate}</label>
        </div>
      </div>

      <div class="description">
        <p>${task.description}</p>
      </div>

    </div>
  `

  $("#taskContainer").append(syntax)
}

function getCategory(categoryId) {
  let category;

  if(categoryId == 1) {
    category = "Home"
  }
  else if(categoryId == 2) {
    category = "Work"
  }
  else if(categoryId ==3) {
    category = "Personal"
  }
  else {
    category = "Family"
  }

  return category
}

function loadTasks() {
  $.ajax({
    type: "GET",
    url : "https://fsdiapi.azurewebsites.net/api/tasks",
    success: function(jsonData) {
      console.log('success... ', jsonData);

      let data = JSON.parse(jsonData)
      console.log('data... ', data);

      //travel the array, get every element foromthe array()

      for (let i = 0; i < data.length; i++) {
        // task.owner === "Leo" && displayTask(task)

        let task = data[i]

        // if the task  belong to me, then
        if(task.owner === "Leo") {
          displayTask(task)
        }
      }
      //send the task to be displayed on screen
    },
    error: function(errorDetails) {
      console.log('error... ',errorDetails);
    }


  })
}

function init() {
  console.log("Task manager");

  loadTasks();

  //load data

  //hook events
  $("#iImportant").click(toggleImportance)
  $("#btnSave").click(saveTask)
}


function test() {
  $.ajax({
    type: "GET",
    url: "https://restclass.azurewebsites.net/api/test",
    success: function(response) {
      console.log('Server says... ', response);
    },
    error: function (errorDetails) {
      console.log("error.. ", errorDetails);
    }
  });
}
window.onload = init;