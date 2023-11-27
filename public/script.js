function addTask () {
  var taskName = document.getElementById ('taskName').value;
  if (taskName.trim () === '') {
    alert ('Task Name is empty');
  } else {
    var task = JSON.parse (localStorage.getItem ('task')) || {};

    if (task[taskName]) {
      alert ('Task Name already exists');
    } else {
      task[taskName] = {};

      // Initialize dates for the task with unchecked status
      var currentDate = new Date ().getDate ();
      for (
        var i = 1;
        i <=
        new Date (
          new Date ().getFullYear (),
          new Date ().getMonth () + 1,
          0
        ).getDate ();
        i++
      ) {
        task[taskName][i] = false;
      }

      localStorage.setItem ('task', JSON.stringify (task));
      display ();
    }
  }
}

// Function to handle checkbox change
function handleCheckboxChange (taskName, date, checkbox) {
  var task = JSON.parse (localStorage.getItem ('task')) || {};

  if (task[taskName]) {
    task[taskName][date] = checkbox.checked;
    localStorage.setItem ('task', JSON.stringify (task));
  }
}
// Function to display tasks
function display () {
  var task = JSON.parse (localStorage.getItem ('task')) || {};
  displayHeaders ();

  var tableBody = document.getElementById ('taskListBody');
  tableBody.innerHTML = '';

  taskNames = Object.keys (task);
  taskNames.forEach (taskName => {
    var row = tableBody.insertRow (-1);
    const cell = row.insertCell (-1);
    cell.innerHTML = `<input type="checkbox" value="${taskName}" onclick="deleteTask('${taskName}');" id="name"></input><br><b>${taskName}</b>`;

    currentDate = new Date ().getDate ();
    for (
      var i = 1;
      i <=
      new Date (
        new Date ().getFullYear (),
        new Date ().getMonth () + 1,
        0
      ).getDate ();
      i++
    ) {
      const checkboxCell = row.insertCell (-1);

      const checkbox = document.createElement ('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task[taskName][i];
      checkbox.addEventListener (
        'change',
        (function (date) {
          return function () {
            console.log (taskName, date, checkbox);
            handleCheckboxChange (taskName, date, checkbox);
          };
        }) (i)
      );
      checkboxCell.appendChild (checkbox);
      checkboxCell.tabIndex = -1;
      if (i === currentDate) {
        checkboxCell.classList.add ('currentDate');
        checkboxCell.focus ();
      }
    }
  });
}
function deleteTask (taskName) {
  // Call your existing Delete() function with the taskName
  Delete (taskName);
}

function Delete (taskName) {
  var task = JSON.parse (localStorage.getItem ('task'));
  delete task[taskName];
  localStorage.setItem ('task', JSON.stringify (task));
  display ();
}

function displayHeaders() {
  var tableHead = document.querySelector('thead tr');
  tableHead.innerHTML = '';
  var daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

  var th = document.createElement('th');
  th.id = 'taskColumn';
  th.textContent = 'Task';
  tableHead.appendChild(th);
  for (var i = 1; i <= daysInMonth; i++) {
  var th = document.createElement('th');
      th.id = 'dateColumn';
      var fullDate = new Date(new Date().getFullYear(), new Date().getMonth(), i);
      var formattedDate = fullDate.toLocaleDateString('en-GB');
      th.textContent = formattedDate;
      tableHead.appendChild(th);
  }
}

// Event listener for "/" key to focus on input
document.addEventListener ('keydown', function (event) {
  if (event.key === '/') {
    event.preventDefault (); // Prevents inserting the "/" character in the input
    document.getElementById ('taskName').focus ();
  }
});

window.onload = display;
