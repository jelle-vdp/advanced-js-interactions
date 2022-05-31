const carouselContainer = document.querySelector(".carouselContainer");
const carouselImgs = document.querySelectorAll(".carouselContainer .carousel-img");

const collageImgs = document.querySelectorAll(".collage img");

const pokemons = document.querySelectorAll(".poke");

const chaseBox = document.querySelector(".chasebox");
const chaser = document.querySelector(".chaser");

const activateCarousel = () => {
    let activeCarouselImg = 0;

    carouselImgs.forEach((img, index) => {
        if (img.classList.contains("carousel-img--selected")){
            activeCarouselImg = index;
            if (activeCarouselImg < carouselImgs.length -1){
                activeCarouselImg = index + 1;
            } else {
                activeCarouselImg = 0;
            }
            setTimeout(() => {
                img.classList.remove("carousel-img--selected");
                carouselImgs[activeCarouselImg].classList.add("carousel-img--selected")}
            , 1000)
            }
    });
};

setInterval(activateCarousel, 4000);

collageImgs.forEach(img => {
    img.addEventListener("click", () => {
        const overlayDiv = document.createElement("div");
        overlayDiv.classList.add("lightbox");
        const lightboxImg = document.createElement("img");
        lightboxImg.src = img.src;
        const lightboxDescription = document.createElement("h3");
        lightboxDescription.innerText = img.dataset.lightbox;
        const lightboxClose = document.createElement("i");
        lightboxClose.classList = "fa-solid fa-xmark";

        overlayDiv.appendChild(lightboxImg);
        overlayDiv.appendChild(lightboxDescription);
        overlayDiv.appendChild(lightboxClose);

        document.querySelector("body").appendChild(overlayDiv);

        document.querySelector(".lightbox i").addEventListener("click", () => {
            document.querySelector(".lightbox").remove();
        })

    })
})

pokemons.forEach(pokemon => {
    pokemon.addEventListener("mouseover", (e) => {

        if(e.target.className !== "poke__container" && e.target.className !== "poke__img"){
            const pokemonContainer = document.createElement("div");
            pokemonContainer.classList.add("poke__container");

            let pokemonName = pokemon.innerText.toLowerCase();

            if (pokemonName === "farfetch'd"){
                pokemonName = "83";
            }

            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
                .then(res => res.json())
                .then(data => {
                    const pokemonImg = document.createElement("img");
                    pokemonImg.src = data.sprites.front_default;
                    pokemonImg.classList.add("poke__img");
                    pokemonContainer.appendChild(pokemonImg);

                    pokemon.appendChild(pokemonContainer);

                    setTimeout(() => document.querySelector(".poke__container").remove(), 1000)
                })
        }
        
        
    });

});

chaseBox.addEventListener("mousemove", (e) => {
    
    let relativePositionCursorX = e.clientX - chaseBox.getBoundingClientRect().left;
    let relativePositionCursorY = e.clientY - chaseBox.getBoundingClientRect().top;

    const maxLeft = chaseBox.getBoundingClientRect().right - chaseBox.getBoundingClientRect().left - 50;
    const maxTop = chaseBox.getBoundingClientRect().bottom - chaseBox.getBoundingClientRect().top - 50;

    if (relativePositionCursorX > maxLeft){
        chaser.style.left = `${maxLeft}px`
    } else {
        chaser.style.left = `${relativePositionCursorX}px`
    }

    if (relativePositionCursorY > maxTop){
        chaser.style.top = `${maxTop}px`
    } else {
        chaser.style.top = `${relativePositionCursorY}px`
    }
    
});


Array.from(document.querySelectorAll(".letter")).forEach(el => {
   el.innerText = randomLetter();
});

function randomLetter(){
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return alphabet[Math.floor(Math.random() * alphabet.length)]
}