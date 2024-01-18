async function userLogin(){
    const responseLogin = await fetch("http://localhost:5678/api/users/login", {
    method: 'POST', 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }, //J'oublie toujours la virgule ici!
    body: JSON.stringify({
        email: "sophie.bluel@test.tld",
        password: "S0phie",
    })
    })

    if (responseLogin.ok) {
    const dataLogin = await responseLogin.json()
    console.log(dataLogin)
    const connectedToken = dataLogin.token
        if(connectedToken){
        //Stocke le token dans le localstorage
        window.localStorage.setItem("token", connectedToken);
            }else {
        console.log("Token not received. Login failed.");
        }
    }else{
        console.log("incorrect")
    }
}


userLogin()

//Récupration de la section login au sein d'une variable globale 
const loginSection = document.getElementById("login-section")

const loginLink = document.getElementById("link-login")
loginLink.addEventListener("click", ()=>{
    console.log("clicked on login link")
    //Récupération des éléments à effacer au clic
    const introElement = document.getElementById("introduction")
    const portfolioElement = document.getElementById("portfolio")
    const contactElement = document.getElementById("contact")
    //Suppression des éléments au clic
    introElement.innerHTML=""
    portfolioElement.innerHTML=""
    contactElement.innerHTML=""
    //Permet à la login-section d'apparaître en utilisant les classes et CSS (position absolute to relative, transform scale 0 to 1)
    loginSection.classList.add('active');
    // Récupération du formulaire de la login-section et ajout d'un eventlistener
    // sur l'input submit (bouton 'envoyer')
    let loginForm = document.getElementById('login-form')
    loginForm.addEventListener('submit', function (event) {
    event.preventDefault()
    let emailInput = document.getElementById("emailInput")
    let passwordInput = document.getElementById("passwordInput")
    console.log("Email:", emailInput.value);
    console.log("Password:", passwordInput.value);
    
    userLogin()
});
})

let emailInput = document.getElementById('emailInput')
emailInput.addEventListener("input", function () {
    console.log('Email Input Value:', emailInput.value)
})
let passwordInput = document.getElementById("passwordInput")
passwordInput.addEventListener("input", function(){
    console.log('Password Input Value:', passwordInput.value)
})
