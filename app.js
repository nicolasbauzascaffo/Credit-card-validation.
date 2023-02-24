var formulario = document.getElementById("formulario");
var inputs = document.querySelectorAll("#formulario input");

const regExp = {
  name: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/ /* Expresión regular para validar nombre */,
  number:
    /^\d{16}$/ /* Expresión regular para valdiar número de tarjeta de crédito de 16 dígitos */,
  month:
    /^(0[1-9]|1[0-2])$/ /* Expresión regular que valida mes de 2 dígitos (a partir del 1/1/24 ) */,
  year: /^202[5-9]|20[3-9][0-9]|21[0-9]{2,}$/ /* Expresión regular que valida año a partir del 2025 */,
  cvc: /^\d{3}$/ /* Expresión regular que valida CVC de 3 dígitos */,
};

const campos = {
  name: false,
  number: false,
  month: false,
  year: false,
  cvc: false,
};

const validar = (e) => {
  switch (e.target.name) {
    case "name":
      validación(regExp.name, e.target, "name");
      break;
    case "number":
      validación(regExp.number, e.target, "number");
      break;
    case "month":
      validación(regExp.month, e.target, "month");
      break;
    case "year":
      validación(regExp.year, e.target, "year");
      break;
    case "cvc":
      validación(regExp.cvc, e.target, "cvc");
      break;
  }
};

const validación = (exp, input, campo) => {
  const element = document.getElementById(`${campo}`);
  if (exp.test(input.value)) {
    element.classList.add("green");
    element.classList.remove("red");
    campos[campo] = true;
  } else {
    element.classList.add("red");
    element.classList.remove("green");
    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validar);
  input.addEventListener("blur", validar);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    campos.number &&
    campos.name &&
    campos.year &&
    campos.month &&
    campos.cvc
  ) {
    formulario.reset();
    const elements = document.querySelectorAll(".green");
    elements.forEach((element) => {
      element.classList.remove("green");
      document.getElementById("formulario").classList.remove("red");
    });
    document.getElementById("card-name").textContent = "Name";
    document.getElementById("card-number").textContent = "0000000000000000";
    document.getElementById("card-month").textContent = "01";
    document.getElementById("card-year").textContent = "2025";
    document.getElementById("Cvc").textContent = "123";
  } else {
    document.getElementById("formulario").classList.add("red");
  }
});

/* Eventos para que cada vez que escriba en el input se vaya sobreescribiendo en la tarjeta */
var inputs_card = [
  { input: "name", target: "card-name" },
  { input: "number", target: "card-number" },
  { input: "month", target: "card-month" },
  { input: "year", target: "card-year" },
  { input: "cvc", target: "card-cvc" },
];

inputs_card.forEach((input) => {
  let inputElement = document.getElementById(input.input);
  let targetElement = document.getElementById(input.target);

  inputElement.addEventListener("input", (e) => {
    targetElement.textContent = e.target.value;
  });
});

/* El evento gira la tarjeta cuando se esta escribiendo en el CVC (código de seguridad) */

document.getElementById("cvc").addEventListener("input", () => {
  tarjeta.classList.add("flipped");
});

document.getElementById("cvc").addEventListener("blur", () => {
  tarjeta.classList.remove("flipped");
});
