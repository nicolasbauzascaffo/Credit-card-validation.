var formulario = document.getElementById("form");
var inputs = document.querySelectorAll("#form input");
var parrafos = document.querySelectorAll("#form p");

const regExp = {
  name: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
  card: /^\d{16}$/ /* 16 dígitos en total */,
  month: /^(0?[1-9]|1[0-2])$/,
  year: /^(20[2-9][4-9]|[3-9]\d{3})$/ /* valida años del 2024 hacia arriba */,
  cvc: /^\d{3}$/,
};

const campos = {
  name: false,
  card: false,
  month: false,
  year: false,
  cvc: false,
};

const validar = (e) => {
  switch (e.target.name) {
    case "name":
      validacionCampos(regExp.name, e.target, "name");
      break;
    case "card":
      validacionCampos(regExp.card, e.target, "card");
      break;
    case "month":
      validacionCampos(regExp.month, e.target, "month");
      break;
    case "year":
      validacionCampos(regExp.year, e.target, "year");
      break;
    case "cvc":
      validacionCampos(regExp.cvc, e.target, "cvc");
      break;
  }
};

const validacionCampos = (expresion, input, campo) => {
  var elemento = document.getElementById(`${campo}`);
  if (expresion.test(input.value)) {
    elemento.classList.add("green");
    elemento.classList.remove("red");
    campos[campo] = true;
  } else {
    elemento.classList.add("red");
    elemento.classList.remove("green");
    campos[campo] = false;
  }
};

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (campos.card && campos.cvc && campos.month && campos.name && campos.year) {
    formulario.reset();
    parrafos.forEach((parrafo) => {
      parrafo.textContent = "";
    });
    inputs.forEach((input) => {
      input.classList.remove("green");
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thank you",
      showConfirmButton: false,
      timer: 2000,
      customClass: {
        container: "swal-font",
      },
    });
    document.getElementById("card-name").innerHTML = "Name";
    document.getElementById("card-number").innerHTML = "0000000000000000";
    document.getElementById("card-month").innerHTML = "00";
    document.getElementById("card-year").innerHTML = "00";
    document.getElementById("cvc-card").innerHTML = "123";
  } else {
    for (var campo in campos) {
      if (!campos[campo] || campos[campo].value === "") {
        document.getElementById(`${campo}`).classList.add("red");
        document.getElementById(`${campo}-error`).textContent =
          "Check the info !";
      } else {
        document.getElementById(`${campo}-error`).textContent = "";
        document.getElementById(`${campo}`).classList.remove("red");
      }
    }
  }
});

inputs.forEach((input) => {
  input.addEventListener("keyup", validar);
  input.addEventListener("blur", validar);
});

var inputs_card = [
  { input: "name", target: "card-name" },
  { input: "card", target: "card-number" },
  { input: "month", target: "card-month" },
  { input: "year", target: "card-year" },
  { input: "cvc", target: "cvc-card" },
];

inputs_card.forEach((input) => {
  var inputElement = document.getElementById(input.input);
  var inputText = document.getElementById(input.target);

  inputElement.addEventListener("input", (e) => {
    inputText.textContent = e.target.value;
  });
});
const giroTarjeta = () => {
  const input_name = document.getElementById("name");
  const input_number = document.getElementById("card");
  const input_month = document.getElementById("month");
  const input_year = document.getElementById("year");
  const input_cvc = document.getElementById("cvc");
  const carta = document.querySelector(".carta");

  const isCvcInput = (event) => {
    return event.target === input_cvc;
  };

  const rotateCard = () => {
    if (isCvcInput(event)) {
      carta.style.transform = "rotateY(180deg)";
    } else {
      carta.style.transform = "rotateY(0deg)";
    }
  };

  input_name.addEventListener("keydown", rotateCard);
  input_number.addEventListener("keydown", rotateCard);
  input_month.addEventListener("keydown", rotateCard);
  input_year.addEventListener("keydown", rotateCard);
  input_cvc.addEventListener("keydown", rotateCard);
};

giroTarjeta();
