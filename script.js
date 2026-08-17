/* =========================================================
   FAQ ACCORDION
========================================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {

    // Close other FAQ items
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    // Toggle current FAQ item
    item.classList.toggle("active");

  });

});


/* =========================================================
   APPLICATION FORM VALIDATION
========================================================= */

const applicationForm = document.getElementById("application-form");
const formMessage = document.getElementById("form-message");


if (applicationForm) {

  applicationForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();


    /* =========================
       GET FORM VALUES
    ========================= */

    const fullName = document.getElementById("full-name").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const experience = document.getElementById("experience").value;

    const education = document.getElementById("education").value;

    const resume = document.getElementById("resume").files[0];

    const message = document.getElementById("message").value.trim();

    const agreement = document.getElementById("agreement").checked;


    /* =========================
       VALIDATION
    ========================= */

    if (fullName === "") {
      showError("Please enter your full name.");
      document.getElementById("full-name").focus();
      return;
    }


    const nameParts = fullName.split(/\s+/);

    if (nameParts.length < 2) {
      showError("Please enter your first and last name.");
      document.getElementById("full-name").focus();
      return;
    }


    /* EMAIL */

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      showError("Please enter a valid email address.");
      document.getElementById("email").focus();
      return;
    }


    /* PHONE */

    const phonePattern =
      /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {
      showError("Please enter a valid 10-digit phone number.");
      document.getElementById("phone").focus();
      return;
    }


    /* EXPERIENCE */

    if (experience === "") {
      showError("Please select your experience.");
      document.getElementById("experience").focus();
      return;
    }


    /* EDUCATION */

    if (education === "") {
      showError("Please select your highest education.");
      document.getElementById("education").focus();
      return;
    }


    /* RESUME */

    if (!resume) {
      showError("Please upload your resume.");
      document.getElementById("resume").focus();
      return;
    }


    /* FILE TYPE */

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(resume.type)) {
      showError("Please upload a PDF, DOC, or DOCX file.");
      document.getElementById("resume").focus();
      return;
    }


    /* FILE SIZE */

    const maxFileSize = 5 * 1024 * 1024;

    if (resume.size > maxFileSize) {
      showError("Resume size must be less than 5MB.");
      document.getElementById("resume").focus();
      return;
    }


    /* MESSAGE */

    if (message === "") {
      showError("Please tell us why we should hire you.");
      document.getElementById("message").focus();
      return;
    }


    if (message.length < 30) {
      showError(
        "Please provide a little more information about yourself."
      );

      document.getElementById("message").focus();

      return;
    }


    /* AGREEMENT */

    if (!agreement) {
      showError(
        "Please confirm that the information provided is accurate."
      );

      document.getElementById("agreement").focus();

      return;
    }


    /* =========================
       SUCCESS
    ========================= */

    formMessage.textContent =
      "Application submitted successfully.";

    formMessage.style.color = "#16a34a";


    /* Reset form */

    applicationForm.reset();

  });

}


/* =========================================================
   ERROR MESSAGE
========================================================= */

function showError(message) {

  formMessage.textContent = message;

  formMessage.style.color = "#dc2626";

}

const todoInput = document.getElementById("todo-input");
const addTaskButton = document.getElementById("add-task");
const todoList = document.getElementById("todo-list");
const taskCount = document.getElementById("task-count");


/* Update remaining task count */

function updateTaskCount() {

  const tasks = document.querySelectorAll(".todo-item");

  const remainingTasks = document.querySelectorAll(
    ".todo-item:not(.completed-task)"
  );

  taskCount.textContent =
    `${remainingTasks.length} task${remainingTasks.length !== 1 ? "s" : ""} remaining`;
}


/* Create a new task */

function createTask(taskText) {

  const listItem = document.createElement("li");
  listItem.classList.add("todo-item");

  const label = document.createElement("label");
  label.classList.add("todo-left");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");

  const text = document.createElement("span");
  text.classList.add("todo-text");
  text.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-task");
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";


  /* Checkbox */

  checkbox.addEventListener("change", function () {

    listItem.classList.toggle(
      "completed-task",
      checkbox.checked
    );

    updateTaskCount();

  });


  /* Delete */

  deleteButton.addEventListener("click", function () {

    listItem.remove();

    updateTaskCount();

  });


  label.appendChild(checkbox);
  label.appendChild(text);

  listItem.appendChild(label);
  listItem.appendChild(deleteButton);

  todoList.appendChild(listItem);

  updateTaskCount();
}


/* Add task */

addTaskButton.addEventListener("click", function () {

  const taskText = todoInput.value.trim();

  if (taskText === "") {
    todoInput.focus();
    return;
  }

  createTask(taskText);

  todoInput.value = "";

  todoInput.focus();
});


/* Press Enter to add */

todoInput.addEventListener("keydown", function (event) {

  if (event.key === "Enter") {
    addTaskButton.click();
  }

});


/* Existing checkboxes */

document.querySelectorAll(".task-checkbox").forEach(function (checkbox) {

  checkbox.addEventListener("change", function () {

    const task = checkbox.closest(".todo-item");

    task.classList.toggle(
      "completed-task",
      checkbox.checked
    );

    updateTaskCount();

  });

});


/* Existing delete buttons */

document.querySelectorAll(".delete-task").forEach(function (button) {

  button.addEventListener("click", function () {

    button.closest(".todo-item").remove();

    updateTaskCount();

  });

});


/* Initial count */

updateTaskCount();