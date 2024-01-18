import "./login.js";

async function fetchData() {
    // Récupération des données GET /works
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    //console.log(data);

    //Génération des données sur la page web
    function generateData(data) {
        //Selection du container gallery
        const gallery = document.querySelector(".gallery");
        //Empêche les doublons lorsque l'on clique sur un filtre
        gallery.innerHTML = ""; 
    
        for (let i = 0; i < data.length; i++) {
            const designProjects = data[i];
    
            // Création d’un élément <article> qui comprendra l'image(imageUrl) et le nom(title)
            const galleryCard = document.createElement("article");
            gallery.appendChild(galleryCard);
    
            // Ajout des images dans <article>
            const imageFromDesignProjects = document.createElement("img");
            imageFromDesignProjects.src = designProjects.imageUrl;
            galleryCard.appendChild(imageFromDesignProjects);
    
            // Ajout des titres dans <article>
            const titleFromDesignProjects = document.createElement("h3");
            titleFromDesignProjects.innerText = designProjects.title;
            galleryCard.appendChild(titleFromDesignProjects);
        }
    }
    
    generateData(data);

    //Sélection du bouton Objets et ajout d'un addEventListener
    const btnObjets = document.querySelector(".objects");
    btnObjets.addEventListener("click", function () {
        //console.log("clicked");
        // Si designProjects.category existe dans l'API, vérifier si la propiété name === "Objets". 
        const filteredObjects = data.filter(function (designProjects) {
            return designProjects.category && designProjects.category.name === "Objets";
        });

        generateData(filteredObjects);
    });

     //Sélection du bouton Appartements et ajout d'un addEventListener
     const btnAppartements = document.querySelector(".flats");
     btnAppartements.addEventListener("click", function () {
         //console.log("clicked");
         // Si designProjects.category existe dans l'API, vérifier si la propiété name === "Appartements". 
         const filteredObjects = data.filter(function (designProjects) {
             return designProjects.category && designProjects.category.name === "Appartements";
         });
 
         generateData(filteredObjects);
     });   

      //Sélection du bouton Hotels & Restaurants et ajout d'un addEventListener
      const btnHotels = document.querySelector(".hotels");
      btnHotels.addEventListener("click", function () {
          //console.log("clicked");
          // Si designProjects.category existe dans l'API, vérifier si la propiété name === "Hotels & restaurants". 
          const filteredObjects = data.filter(function (designProjects) {
              return designProjects.category && designProjects.category.name === "Hotels & restaurants";
          });
  
          generateData(filteredObjects);
      }); 
      
      //Sélection du bouton Tous et ajout d'un addEventListener
      const btnAll = document.querySelector(".all");
      btnAll.addEventListener("click", function () {
          //console.log("clicked");
          generateData(data);
          }); 
}
fetchData();

const loginLink = document.getElementById("link-login")
loginLink.addEventListener("click", ()=>{
    //console.log("clicked on login link")
    
})