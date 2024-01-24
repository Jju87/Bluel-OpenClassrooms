import { generateHomePage, loginBtn, logoutBtn } from "./login.js";
import { generateData } from "./script.js";

let token = localStorage.getItem('token');

// function pour cacher le modal
function hideModal(){
modal.style.visibility = "hidden"
modal.style.transform = "scale(0)"
modal.style.opacity = "0"
}

/****** Génération des éléments dans le mode édition ******/

export function handleEditionPage(){
    //Regénération de la page d'acceuil avec la fonction generateHomePage
    generateHomePage()
    // On demande de vérifier si le edit-section existe
    let editSection = document.querySelector(".edit-section");

    // Si il n'existe pas...
    if (!editSection) {
    // ...on le crée
     editSection = document.createElement("div")
     editSection.classList.add("edit-section")
    
     const header = document.querySelector("header")
     header.insertAdjacentElement("beforebegin", editSection)
    
     // On crée l'affichacge de Mode édition à l'intérieur de editSection
     editSection.innerHTML = `<div class="edit-msg"><i class="fa-solid fa-pen-to-square"></i> Mode édition</div>`
    
    }
    // Affichage du bouton logout et disparition du bouton login
    loginBtn.style.display = "none"
    logoutBtn.style.display = "block"
   

    // Génération du bouton modifier
    const modifyButton = document.createElement("div")

    const titleProjects = document.querySelector(".projects-title")
    titleProjects.appendChild(modifyButton)

    // Le bouton modifier est généré avec un addEventListener qui affiche le modal
    modifyButton.innerHTML = `<div class="modify-btn"><i class="fa-solid fa-pen-to-square"></i> Modifier</div>`
    modifyButton.addEventListener("click", ()=>{
        modal.style.visibility = "visible"
        modal.style.transform = "scale(1)"
        modal.style.opacity = "1"
    })
}

// Le clisk sur la croix ferme le modal
const closeXmark = document.querySelector(".fa-xmark")
closeXmark.addEventListener("click",(event)=>{
   hideModal()
})

// Le click au dehors du modal ferme le modal
modal.addEventListener("click", (event)=>{
    //Vérifie si un élément cliqué ou un de ses parents ou ancêtres a la...
    // ...classe .modal-wrapper grace à closest
    const isModalWrapper = event.target.closest(".modal-wrapper");
    if (!isModalWrapper) {
    // Si l'élément n'a pas la classe .modal-wrapper, active la fonction hidemodal
    hideModal()
    }
})

//******* Suppression de photos ********/


//Création de la fonction supprimer un élément par son ID
async function eraseElementByID(id) {
    // Création des variables pour le modal de confirmation
    const confirmationModal = document.getElementById('confirmationModal');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');

    // Attente de la réponse de l'utilisateur
    // Promesse pour attendre la réponse de l'utilisateur
    const confirmation = await new Promise((resolve) => {
        // Resolve est une fonction qui permet de résoudre la promesse et 
        // de renvoyer une valeur (true ou false) à l'endroit où la promesse a été créée

        //Apparition du modal de confirmation
        confirmationModal.style.display = 'block';

        // Si l'utilisateur clique sur le bouton "Oui", supprimer l'élément
        // et fermer le modal de confirmation (resolve(true)
        yesButton.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
            resolve(true);
        });
        // Si l'utilisateur clique sur le bouton "Non", ne pas supprimer l'élément
        // et fermer le modal de confirmation (resolve(false)
        noButton.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
            resolve(false);
        });
    });

    // Si la confirmation est true, supprimer l'élément en faisant une requête DELETE
    // avev le token dans le header (try/catch)
    try {
        // Ici try/catch car on fait une requête DELETE qui peut échouer si 
        // le token n'est pas valide
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // Si la requête est ok, afficher un message dans la console
        if (response.ok) {
            console.log(`Element with data-id ${id} deleted successfully`);
            // Remove the image from the gallery
            // Création des variables pour l'image et la corbeille
            const imageElement = document.querySelector(`.modal-gallery__image[data-id="${id}"]`)
            const trashCanElement = document.querySelector(`.fa-trash-can[data-id="${id}"]`)    
             // remove a été rajouté parce que  le trashcan ne se supprimait pas de la modal  
            if (imageElement) {
                imageElement.remove()
                trashCanElement.remove()
                }

            // nouvelle requête GET pour récupérer les données à jour après la suppression
            const response = await fetch("http://localhost:5678/api/works");
            const newDataAfterDelete = await response.json();
            console.log('Updated data:', newDataAfterDelete);
                // Génération des données sur la page web après la suppression
            generateData(newDataAfterDelete);

            // Vériication si le token est présent dans le localStorage
            let token = localStorage.getItem("token");
            if (token) {
                // Si présent, afficher la page d'édition
                handleEditionPage();
            }
            // Messages d'erreur si la requête n'est pas ok
        } else {
            console.log("Could not delete element");
        }
        //Message d'erreur si la requête n'est pas ok
    } catch (error) {
        console.error("Error deleting element:", error);
    }
}


const response = await fetch("http://localhost:5678/api/works")
const data = await response.json()

function generateImagesInModal() {
  for (let i = 0; i < data.length; i++) {
    const designProjects = data[i];

    const eraserGalleryImage = document.querySelector(".modal-gallery__eraser");

    const imageForModal = document.createElement("div")
    imageForModal.classList.add("image-container")

    const img = document.createElement("img")
    img.src = designProjects.imageUrl
    img.classList.add("modal-gallery__image")

    const eraserButton = document.createElement("i")
    eraserButton.classList.add("fa-solid", "fa-trash-can")

    // Set the data-id attribute
    const idNumber = designProjects.id 
    img.dataset.id = idNumber
    eraserButton.dataset.id = idNumber
    
    // Attach click event listener to the eraserButton
    eraserButton.addEventListener("click", (event) => {
      console.log("Clicked on ID number " + idNumber)
      eraseElementByID(idNumber)
    });

    // Append img and eraserButton to the container div
    imageForModal.appendChild(img)
    imageForModal.appendChild(eraserButton)

    // Append the container div to the gallery
    eraserGalleryImage.appendChild(imageForModal)
  }
}

generateImagesInModal()

//******* Ajout de photos ********/

// Gestion du display des modal d'ajout d'images 
// et de suppression d'images

const arrowBack = document.querySelector(".fa-arrow-left")
const accessToAddImagesBtn = document.querySelector(".access-to-add-images")

const modalGallery = document.getElementById("modal-gallery")
const modalSend = document.getElementById("modal-send")

// Au click sur le bouton d'ajout d'images, le modal apparait
// et le modal de suppression disparait

accessToAddImagesBtn.addEventListener("click", ()=>{
    modalGallery.style.display = "none"
    modalSend.style.visibility = "visible"
    modalSend.style.transform = "scale(1)"
    modalSend.style.opacity = "1"
    arrowBack.style.opacity = "1"
})

// Au click sur la flèche, le modal d'ajout d'images disparait
// et le modal de suppression apparait

arrowBack.addEventListener("click", ()=>{
    modalGallery.style.display = "flex"
    modalSend.style.visibility = "hidden"
    modalSend.style.transform = "scale(0)"
    modalSend.style.opacity = "0"
    arrowBack.style.opacity = "0"
})














