async function userLogin(){
    const responseLogin = await fetch("http://localhost:5678/api/users/login", {
    method: 'POST', 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    email: "sophie.bluel@test.tld",
    password: "S0phie"
    })
    })

    if (responseLogin.ok) {
    const dataLogin = await responseLogin.json()
    console.log(dataLogin)
    } else {
    console.log("Login failed:")
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

    loginSection.style.transform = "scale(1)"

    

    


})