/* Exercise 03 - Form */
const removeElement = (el) => el && el.parentNode.removeChild(el);
const removeErrorNodes = () => {
  removeElement(document.getElementById("nameError"));
  removeElement(document.getElementById("emailError"));
};
const isValidEmail = (email) => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    email
  );
};
const formValidations = (name, email) => {
  removeErrorNodes();

  // name validation
  let nameError = "";
  switch (name.length) {
    case 0:
      nameError = "Please enter name";
      break;
    case 1:
      nameError = "Name should be more than one letter";
      break;
    default:
      break;
  }
  if (nameError) {
    const nameErrorNode = document.createElement("p");
    nameErrorNode.setAttribute("id", "nameError");
    nameErrorNode.classList.add("mt-2", "mb-0", "text-danger");
    nameErrorNode.innerText = nameError;
    document
      .getElementById("name")
      .insertAdjacentElement("afterend", nameErrorNode);
  }
  // email validations
  const emailError = !isValidEmail(email) && "Please Enter a valid email";
  if (emailError) {
    const emailErrorNode = document.createElement("p");
    emailErrorNode.setAttribute("id", "emailError");
    emailErrorNode.classList.add("mt-2", "mb-0", "text-danger");
    emailErrorNode.innerText = emailError;
    document
      .getElementById("email")
      .insertAdjacentElement("afterend", emailErrorNode);
  }

  if (nameError || emailError) {
    return false;
  }
  return true;
};
const formSubmit = () => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const feedback = document.getElementById("feedback").value;
  const newsletter = document.getElementById("newsletter").checked;

  if (formValidations(name, email)) {
    console.group("============== Form Submission ==============");
    console.log("Name :", name);
    console.log("Email :", email);
    console.log("Feedback :", feedback || "No feedback was submitted.");
    console.log(
      "Newsletter :",
      newsletter
        ? "Yes, I would like to receive news letters"
        : "No, thank you."
    );
    console.groupEnd();
    alert("Submitted");
  }
};
