// Title constructor function
function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () {
  return this.mytitle;
}

var socialMedia = {
  facebook: 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com',
};

var t = new Title("CONNECT WITH ME!");

// Full Name and NUID
const fullName = "Aditi Jaiswal"; // Replace with your full name
const nuid = "002375809";        // Replace with your NUID

// Display Full Name and NUID when the page loads
window.onload = function () {
  const infoDiv = document.getElementById("info");
  if (infoDiv) {
    infoDiv.textContent = `Full Name: ${fullName}, NUID: ${nuid}`;
  }
};

// Table functionality
const tableElement = document.getElementById("myTable");
let selectedRowCount = 0;

// Disable submit button initially
const submitButton = document.getElementById("button");
submitButton.style.backgroundColor = "gray";
submitButton.disabled = true;

// Function to initialize table state
function initializeTable() {
  const checkboxes = tableElement.getElementsByTagName("input");
  for (let i = 0; i < checkboxes.length; i++) {
    const row = checkboxes[i].closest("tr");
    if (!checkboxes[i].checked) {
      row.querySelectorAll("td")[8].classList.add("hiddenColumn");
      row.querySelectorAll("td")[9].classList.add("hiddenColumn");
    }
  }
}

// Function to handle checkbox selection
function handleCheckboxSelection() {
  const checkboxes = tableElement.getElementsByTagName("input");
  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    const row = checkbox.closest("tr");

    checkbox.addEventListener("click", () => {
      if (checkbox.checked) {
        selectedRowCount++;
        row.style.backgroundColor = "yellow";
        row.querySelectorAll("td")[8].innerHTML =
          `<button onClick="deleteRow(this)">Delete</button>`;
        row.querySelectorAll("td")[9].innerHTML =
          `<button onClick="editRow(this)">Edit</button>`;
        submitButton.style.backgroundColor = "orange";
        submitButton.disabled = false;
      } else {
        selectedRowCount--;
        row.style.backgroundColor = "white";
        row.querySelectorAll("td")[8].innerHTML = "";
        row.querySelectorAll("td")[9].innerHTML = "";
        if (selectedRowCount === 0) {
          submitButton.style.backgroundColor = "gray";
          submitButton.disabled = true;
        }
      }
    });
  }
}

// Function to add a new row with dummy values
function addNewRow() {
  try {
    const mainRows = Array.from(tableElement.rows).filter(
      (row) => !row.classList.contains("dropDownTextArea")
    );

    const newRowIndex = mainRows.length;

    // Add a new main row
    const newRow = tableElement.insertRow(tableElement.rows.length);


    newRow.innerHTML = `
      <td><input type="checkbox" /><br /><br /><img onClick="toggleRowDetails(this)" src="down.png" width="25px" /></td>
      <td>Student ${newRowIndex}</td>
      <td>Teacher ${newRowIndex}</td>
      <td>Approved</td>
      <td>Fall</td>
      <td>TA</td>
      <td>${Math.ceil(Math.random() * 100000)}</td>
      <td>100%</td>
      <td></td>
      <td></td>
    `;

    // Add a corresponding hidden details row
    const detailRow = tableElement.insertRow(tableElement.rows.length);
    detailRow.classList.add("dropDownTextArea");
    detailRow.style.display = "none";
    detailRow.innerHTML = `
      <td colspan="10">
        Advisor:<br /><br />
        Award Details<br />
        Summer 1-2014(TA)<br />
        Budget Number:<br />
        Tuition Number:<br />
        Comments:<br /><br /><br />
        Award Status:<br /><br /><br />
      </td>
    `;

    alert(`Student ${newRowIndex} Record added successfully!`);
    handleCheckboxSelection();
    initializeTable();
  } catch (error) {
    alert(`Error adding record: ${error.message}`);
  }
}

// Function to delete a row
function deleteRow(button) {
  try {
    // Get the current row where the delete button was clicked
    const currentRow = button.closest("tr");

    // Get the student name from the second cell (index 1) of the current row
    const studentName = currentRow.cells[1].textContent;

    // Delete the current row and its corresponding detail row
    const rowIndex = currentRow.rowIndex;
    tableElement.deleteRow(rowIndex); // Delete main row
    tableElement.deleteRow(rowIndex); // Delete detail row

    // Show popup with the student's name
    alert(`${studentName} Record deleted successfully!`);
  } catch (error) {
    alert(`Error deleting record: ${error.message}`);
  }
}


// Function to edit a row
function editRow(button) {
  try {
    // Get the current row where the edit button was clicked
    const currentRow = button.closest("tr");

    // Get all the cell values of the current row
    const cells = currentRow.cells;
    const studentName = cells[1].textContent;
    const advisor = cells[2].textContent;
    const awardStatus = cells[3].textContent;
    const semester = cells[4].textContent;
    const type = cells[5].textContent;
    const budget = cells[6].textContent;
    const percentage = cells[7].textContent;

    // Populate the modal content with student details
    document.getElementById("modalTitle").textContent = `Edit details of ${studentName}`;
    document.getElementById("modalContent").innerHTML = `
      <p><strong>Student Name:</strong> ${studentName}</p>
      <p><strong>Advisor:</strong> ${advisor}</p>
      <p><strong>Award Status:</strong> ${awardStatus}</p>
      <p><strong>Semester:</strong> ${semester}</p>
      <p><strong>Type:</strong> ${type}</p>
      <p><strong>Budget:</strong> ${budget}</p>
      <p><strong>Percentage:</strong> ${percentage}</p>
    `;

    // Show the modal and overlay
    document.getElementById("editModal").style.display = "block";
    document.getElementById("modalOverlay").style.display = "block";

    // Add event listener for Update button
    document.getElementById("updateButton").onclick = function () {
      alert(`${studentName} data updated successfully`);
      closeModal();
    };

    // Add event listener for Cancel button
    document.getElementById("cancelButton").onclick = function () {
      closeModal();
    };
  } catch (error) {
    alert(`Error editing record: ${error.message}`);
  }
}

// Function to close the modal
function closeModal() {
  document.getElementById("editModal").style.display = "none";
  document.getElementById("modalOverlay").style.display = "none";
}





// Function to toggle row details
function toggleRowDetails(button) {
  const currentRow = button.closest("tr");
  const detailRow = currentRow.nextElementSibling;

  if (detailRow && detailRow.classList.contains("dropDownTextArea")) {
    if (detailRow.style.display === "none" || detailRow.style.display === "") {
      detailRow.style.display = "table-row"; // Show details
    } else {
      detailRow.style.display = "none"; // Hide details
    }
  }
}

// Initialize table functionality on page load
initializeTable();
handleCheckboxSelection();
