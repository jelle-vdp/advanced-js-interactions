const carouselContainer = document.querySelector(".carouselContainer");
const carouselImgs = document.querySelectorAll(".carouselContainer .carousel-img");
const carouselArrowBack = document.querySelector(".carousel-back");
const carouselArrowForward = document.querySelector(".carousel-forward");
let activeCarouselImg = 0;

const collageImgs = document.querySelectorAll(".collage img");

const pokemons = document.querySelectorAll(".poke");

const chaseBox = document.querySelector(".chasebox");
const chaser = document.querySelector(".chaser");

const runBox = document.querySelector(".runbox");
const runner = document.querySelector(".runner");

const letters = document.querySelectorAll(".letter")

let lightModus = true;
const lightModusBtn = document.querySelector(".mode")

const activateCarousel = () => {

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

const carouselInterval = setInterval(activateCarousel, 4000);


carouselArrowBack.addEventListener("click", () => {
    clearInterval(carouselInterval);
    if (activeCarouselImg !== 0){
        carouselImgs[activeCarouselImg].classList.remove("carousel-img--selected");
        activeCarouselImg--;
        carouselImgs[activeCarouselImg].classList.add("carousel-img--selected");
    } else {
        carouselImgs[activeCarouselImg].classList.remove("carousel-img--selected");
        activeCarouselImg = carouselImgs.length - 1;
        carouselImgs[activeCarouselImg].classList.add("carousel-img--selected");
    }
});

carouselArrowForward.addEventListener("click", () => {
    clearInterval(carouselInterval);
    if (activeCarouselImg !== carouselImgs.length - 1){
        carouselImgs[activeCarouselImg].classList.remove("carousel-img--selected");
        activeCarouselImg++;
        carouselImgs[activeCarouselImg].classList.add("carousel-img--selected");
    } else {
        carouselImgs[activeCarouselImg].classList.remove("carousel-img--selected");
        activeCarouselImg = 0;
        carouselImgs[activeCarouselImg].classList.add("carousel-img--selected");
    }
});




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
    } else if (relativePositionCursorX < 25) {
        chaser.style.left = "0px"
    } else {
        chaser.style.left = `${relativePositionCursorX - 25}px`
    }

    if (relativePositionCursorY > maxTop){
        chaser.style.top = `${maxTop}px`
    } else if (relativePositionCursorY < 25) {
        chaser.style.top = "0px"
    } else {
        chaser.style.top = `${relativePositionCursorY - 25}px`
    }
    
});


// const runRight = () => {
//     runner.style.left = `${+runner.style.left.slice(0, -2) + 1}px`
// }

// const runLeft = () => {
//     runner.style.left = `${+runner.style.left.slice(0, -2) - 1}px`
// }

// const runUp = () => {
//     runner.style.top = `${+runner.style.top.slice(0, -2) - 1}px`
// }

// const runDown = () => {
//     runner.style.top = `${+runner.style.top.slice(0, -2) + 1}px`
// }

// runBox.addEventListener("mousemove", (e) => {
    
//     let relativePositionCursorX = e.clientX - runBox.getBoundingClientRect().left;
//     let relativePositionCursorY = e.clientY - runBox.getBoundingClientRect().top;

//     const maxLeft = runBox.getBoundingClientRect().right - runBox.getBoundingClientRect().left - 50;
//     const maxTop = runBox.getBoundingClientRect().bottom - runBox.getBoundingClientRect().top - 50;

//     let relativePositionCircleX = +runner.style.left.slice(0, -2);
//     let relativePositionCircleY = +runner.style.left.slice(0, -2);

//     if (relativePositionCursorX > maxLeft){
//         runner.style.left = `${maxLeft}px`
//     } else if (relativePositionCursorX < 50) {
//         runner.style.left = "0px";
//     } else if (relativePositionCursorX > relativePositionCircleX) {
//         if (relativePositionCircleX !== 0){
//             runLeft();
//         } else {
//             runRight()
//         }
//     } else {
//         if (relativePositionCircleX !== maxLeft){
//             runRight();
//         } else {
//             runLeft()
//         }
//     }

//     if (relativePositionCursorY > maxTop){
//         runner.style.top = `${maxTop}px`
//     } else if (relativePositionCursorY < 50) {
//         runner.style.top = "0px";
//     } else if (relativePositionCursorY > relativePositionCircleY) {
//         if (relativePositionCircleY !== 0){
//             runUp();
//         } else {
//             runDown()
//         }
//     } else {
        
//         if (relativePositionCircleY !== maxTop){
//             runDown();
//         } else {
//             runUp()
//         }
//     }
    
// });


Array.from(document.querySelectorAll(".letter")).forEach(el => {
   el.innerText = randomLetter();
});

function randomLetter(){
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return alphabet[Math.floor(Math.random() * alphabet.length)]
}

document.addEventListener("keypress", (e) => {
    letters.forEach((span) => {
        if (span.innerText === e.key){
            span.classList.add("letter--big");
            setTimeout(() => span.classList.remove("letter--big"), 3000)
        }
    })
})

letters.forEach((span) => {
    span.addEventListener("click", () => {
        span.classList.add("letter--rotate");
        setTimeout(() => span.classList.remove("letter--rotate"), 3000)
    })
});

lightModusBtn.addEventListener("click", () => {
    lightModus = !lightModus
    if (lightModus){
        document.querySelector("body").classList.remove("darkMode");
        document.querySelector("body").classList.add("lightMode");
    } else {
        document.querySelector("body").classList.remove("lightMode");
        document.querySelector("body").classList.add("darkMode");
    }
})
