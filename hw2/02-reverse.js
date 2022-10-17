/* Exercise 02 - Reverse */

const removeElement = (el) => el && el.parentNode.removeChild(el);

// eslint-disable-next-line no-unused-vars
const reverseFunction = () => {
  // eslint-disable-next-line no-restricted-globals
  event.preventDefault();

  removeElement(document.getElementById("textElement"));

  const textElement = document.createElement("p");
  textElement.setAttribute("id", "textElement");
  textElement.classList.add("mt-2");

  const input = document.getElementById("input");

  if (input.value.length !== 8) {
    textElement.classList.add("text-danger");
    textElement.innerText = "Error : Please input an 8-digit number";
    input.insertAdjacentElement("afterend", textElement);
  } else {
    const reversedInput = [...input.value].reverse().join("");
    textElement.classList.add("text-success");
    textElement.innerText = `${input.value} -> ${reversedInput}`;
    input.insertAdjacentElement("afterend", textElement);
  }
};
