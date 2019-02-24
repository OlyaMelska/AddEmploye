let database = firebase.database();
console.log(database);
let name = "";
let role = "";
let startDate = "";
let email = "";
let salary = "";
let i = 0;

$("#submit").on("click", event => {
  name = $("#name")
    .val()
    .trim();

  role = $("#role")
    .val()
    .trim();
  startDate = $("#date")
    .val()
    .trim();
  email = $("#email")
    .val()
    .trim();
  salary = $("#salary")
    .val()
    .trim();

  database.ref().push({
    name: name,
    role: role,
    date: startDate,
    email: email,
    salary: salary,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

database.ref().on("child_added", snapshot => {
  i++;
  let sv = snapshot.val();
  var convertedDate = moment(sv.date, "YYYY-MM-DD");

  var dateToPrint = moment(sv.date, "YYYY-MM-DD").format("MM/DD/YYYY");
  let monthCalculated = convertedDate.diff(moment(), "months");

  console.log(sv.name);
  let newRow = $("<tr>");
  let number = $("<td>").text(i);
  let employeeName = $("<td>").text(sv.name);
  let employeeRole = $("<td>").text(sv.role);
  let employeeDate = $("<td>").text(dateToPrint);
  let mounthWorked = $("<td>").text(Math.abs(monthCalculated));
  let monthlyRate = $("<td>").text(Math.floor(sv.salary / 12));
  let salary = $("<td>").text(sv.salary);
  newRow.append(
    number,
    employeeName,
    employeeRole,
    employeeDate,
    mounthWorked,
    monthlyRate,
    salary
  );
  $("#resultDiv").append(newRow);
});
