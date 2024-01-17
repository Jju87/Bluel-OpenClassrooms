async function fetchData() {
    // Récupération des données GET /works
    const response = await fetch("http://localhost:5678/api/works")
    const data = await response.json()
    console.log(data)
    // Récupération des données GET /categories
    const responseCategories = await fetch("http://localhost:5678/api/categories")
    const dataCategories = await responseCategories.json()
    console.log(dataCategories)

    function generateData() {
        for (let i = 0; i < data.length; i++) {
            const designProjects = data[i];
            // Récupération de l'élément du DOM qui accueillera les cards
            const gallery = document.querySelector(".gallery");
            
            // Création d’une card qui comprendra l'image(imageUrl) et le nom(title)
            const galleryCard = document.createElement("article")
            gallery.appendChild(galleryCard)
    
            // Ajout des données issues de l'API à l'intérieur des cards (<article>) 
            
            // Ajout des images
            const imageFromDesignProjects = document.createElement("img");
            imageFromDesignProjects.src = designProjects.imageUrl;
            galleryCard.appendChild(imageFromDesignProjects)
            
            //Ajout des titres
            const titleFromDesignProjects = document.createElement("h3");
            titleFromDesignProjects.innerText = designProjects.title;
            galleryCard.appendChild(titleFromDesignProjects)  
        }
    }
    
    generateData()
    
}

fetchData()

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
  
