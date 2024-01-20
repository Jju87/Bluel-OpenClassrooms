// Génération de la marge comprenant le bouton d'édition en haut de page
const editButton = document.createElement("div")
editButton.classList.add("edit-section")

const header = document.querySelector("header")
header.insertAdjacentElement("beforebegin", editButton)

editButton.innerHTML = `<div class="edit-btn"><i class="fa-solid fa-pen-to-square"></i> Mode édition</div>`

// Génération du bouton modifier
const modifyButton = document.createElement("div")

const titleProjects = document.querySelector(".projects-title")
titleProjects.appendChild(modifyButton)

modifyButton.innerHTML = `<div class="modify-btn"><i class="fa-solid fa-pen-to-square"></i> Modifier</div>`



