import { generateHomePage } from "./login.js"
import { loginBtn } from "./login.js"
import { logoutBtn } from "./login.js"

function hideModal(){
modal.style.visibility = "hidden"
modal.style.transform = "scale(0)"
modal.style.opacity = "0"
}

export function handleEditionPage(){
    //Regénération de la page d'acceuil avec la fonction generateHomePage
    generateHomePage()

    // Génération de la marge comprenant le bouton d'édition en haut de page
                    
    const editButton = document.createElement("div")
    editButton.classList.add("edit-section")

    const header = document.querySelector("header")
    header.insertAdjacentElement("beforebegin", editButton)

    editButton.innerHTML = `<div class="edit-btn"><i class="fa-solid fa-pen-to-square"></i> Mode édition</div>`

    loginBtn.style.display = "none"
    logoutBtn.style.display = "block"
   

    // Génération du bouton modifier
    const modifyButton = document.createElement("div")

    const titleProjects = document.querySelector(".projects-title")
    titleProjects.appendChild(modifyButton)

    modifyButton.innerHTML = `<div class="modify-btn"><i class="fa-solid fa-pen-to-square"></i> Modifier</div>`
    modifyButton.addEventListener("click", ()=>{
        modal.style.visibility = "visible"
        modal.style.transform = "scale(1)"
        modal.style.opacity = "1"
    })
}


const closeXmark = document.querySelector(".fa-xmark")
closeXmark.addEventListener("click",(event)=>{
   hideModal()
})

modal.addEventListener("click", (event)=>{
    //Vérifie si un élément cliqué ou un de ses parents ou ancêtres a la classe .modal-wrapper
    const isModalWrapper = event.target.closest(".modal-wrapper");
    if (!isModalWrapper) {
    // Si l'élément n'a pas la classe .modal-wrapper, active la fonction hidemodal
    hideModal()
    }
})










