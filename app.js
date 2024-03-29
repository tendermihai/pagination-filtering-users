//create async function to get all users from API
async function getPersons() {
  let data = await fetch("https://randomuser.me/api/?results=10");
  let conv = await data.json();
  attachCards(conv.results);
}

let card = document.querySelector(".card");
let container = document.querySelector(".container");
let cards = document.querySelectorAll(".card");
let btnSearch = document.querySelector(".btnSearch");
let inptSearch = document.querySelector(".searchInpt");
let selectBtn = document.querySelector(".sort");
//functie care imi creeaza carduri
function createCard(person) {
  let section = document.createElement("section");
  section.classList.add("card");

  section.innerHTML = `

  <section class="card">
  <section class="img-avatar">
      <img src=${person.picture.thumbnail} class="avatar">
  </section>
  <section class="info">
      <p class="gender">${person.gender}</p>
      <p class="name">${
        person.name.title + " " + person.name.first + " " + person.name.last
      }</p>
      <p class="email">${person.email}</p>
      <p class="location">${person.location.city}</p>
  </section>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        More
    </button>
 </section>
  
  `;
  return section;
}

function attachCards(persons) {
  let container = document.querySelector(".container");
  container.innerHTML = "";
  Array.from(persons).forEach((person) => {
    container.appendChild(createCard(person));
  });

  container.addEventListener("click", (e) => {
    let obj = e.target;
    if (obj.classList.contains("card")) {
      //logica pentr crearea persoanei ce trebuie data modalului
      // console.log(obj);
    }

    if (obj.classList.contains("btn-primary")) {
      let card = obj.parentNode;

      let srcImage = card.querySelector(".avatar").src;
      let modalImage = document.querySelector(".modal-avatar");
      modalImage.src = srcImage;

      let info = card.querySelector(".info");
      let gender = card.querySelector(".gender").textContent;
      let name = card.querySelector(".name").textContent;
      let email = card.querySelector(".email").textContent;
      let location = card.querySelector(".location").textContent;

      let modalGender = document.querySelector(".modal-gender");
      modalGender.textContent = gender;

      let modalName = document.querySelector(".name-modal");
      modalName.textContent = name;

      let modalEmail = document.querySelector(".email-modal");
      modalEmail.textContent = email;

      let modalLocation = document.querySelector(".location-modal");
      modalLocation.textContent = location;
    }
  });
}

getPersons();

let btns = document.querySelector(".pg-btns");

btns.addEventListener("click", async (e) => {
  let btn = e.target;
  if (btn.classList.contains("btn-pg")) {
    console.log(btn.textContent);

    let data = await fetch(
      `https://randomuser.me/api/?page=${btn.textContent}&results=10&seed=abc`
    );
    let conv = await data.json();
    attachCards(conv.results);
  }
});

//filter by name

btnSearch.addEventListener("click", async (e) => {
  container = document.querySelector(".container");

  [].slice.call(container.children).forEach((e) => {
    let name = e.querySelector(".name").textContent.toLowerCase();

    if (!name.includes(inptSearch.value.toLowerCase())) {
      e.classList.add("hide");
    } else {
      e.classList.remove("hide");
    }
  });
});

// function sortByGender(persons, field) {
//   for (let i = 0; i < persons.length; i++) {
//     for (let j = i + 1; j < persons.length; j++) {
//       if (persons[i][field] > persons[j][field]) {
//         let aux = persons[i];
//         persons[i] = persons[j];
//         persons[j] = aux;
//       }
//     }
//   }
// }

selectBtn.addEventListener("change", async () => {
  if (selectBtn.value === "gender") {
    let data = await fetch("https://randomuser.me/api/?results=100&gender=");
    let conv = await data.json();
    attachCards(conv.results);
  } else if (selectBtn.value === "location") {
    let data = await fetch("https://randomuser.me/api/?results=100&nat=us");
    let conv = await data.json();
    attachCards(conv.results);
  }
});
