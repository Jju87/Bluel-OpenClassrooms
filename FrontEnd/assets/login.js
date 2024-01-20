//*** Gestion de la section login au sein du DOM ***/

//Récupération de la section login  
const loginSection = document.getElementById("login-section")

//Récupération du lien login et création d'un addEventlistener
const loginLink = document.getElementById("link-login")
loginLink.addEventListener("click", ()=>{
    //console.log("clicked on login link")

    //Récupération des éléments à effacer au clic de lien 'login'
    const introElement = document.getElementById("introduction")
    const portfolioElement = document.getElementById("portfolio")
    const contactElement = document.getElementById("contact")

    //Suppression des éléments au clic
    introElement.style.display = "none"
    portfolioElement.style.display = "none"
    contactElement.style.display = "none"

    //Permet à la login-section d'apparaître avec une animation en utilisant..
    //..les classes et CSS (position absolute to relative, transform scale 0 to 1)
    loginSection.classList.add('active')

    //Fonctionnement optimal du lien Contact 
    //(disparition de la section login et réapparition des sections Intro, Projets, Contacts)
    const linkContact = document.getElementById("link-contact")
    linkContact.addEventListener("click", ()=>{
    introElement.style.display = "block"
    portfolioElement.style.display = "block"
    contactElement.style.display = "block"
    loginSection.classList.remove('active')
    })

    //Fonctionnement optimal du lien Projets 
    //(disparition de la section login et réapparition des sections Intro, Projets, Contacts)
    const linkProjects = document.getElementById("link-projects")
    linkProjects.addEventListener("click", ()=>{
    introElement.style.display = "block"
    portfolioElement.style.display = "block"
    contactElement.style.display = "block"
    loginSection.classList.remove('active')
    })
})


//*** Addeventlistener du fromulaire (SUBMIT) ***//

// AddEventlistener sur l'input submit (bouton 'envoyer') du formulaire 'login-form'
let loginForm = document.getElementById('login-form')
loginForm.addEventListener('submit', function (event) {
    //Empêche le recharchement de la page par défaut lors du clic sur le submit
    event.preventDefault()


    let emailInput = document.getElementById("emailInput")
    let passwordInput = document.getElementById("passwordInput")
    console.log("Email:", emailInput.value);
    console.log("Password:", passwordInput.value)

    async function userLogin(){
        const responseLogin = await fetch("http://localhost:5678/api/users/login", {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }, //J'oublie toujours la virgule ici!
        body: JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value,
        })
        })

        if (responseLogin.ok) {
        const dataLogin = await responseLogin.json()
        console.log(dataLogin)
        const connectedToken = dataLogin.token
            if(connectedToken){
            //Stocke le token dans le localstorage
            window.localStorage.setItem("token", connectedToken)
            console.log("token stocké dans le storage local")
            window.location.href = "http://127.0.0.1:3000/FrontEnd/index.html"
                }else {
            console.log("Token not received. Login failed.")
            }
        }else{
            // Création d'une ID qui permettra,  une fois rattachée au erroMessage, 
            // de vérifier si errorMessage existe pour ne pas le dupliquer au clic
            // sur le bouton submit
            const errorMessageId = "login-error-message";
            const existingErrorMessage = document.getElementById(errorMessageId);
            
            if (!existingErrorMessage) {
                const errorMessage = document.createElement("span");
                errorMessage.innerHTML = "Vos identifiants sont incorrects.";
                errorMessage.classList.add("error-msg");
                errorMessage.id = errorMessageId;
            
                const loginTitle = document.querySelector(".login-title");
                loginTitle.insertAdjacentElement("afterend", errorMessage);
            }
            
        
        }
    }
    userLogin()
})




