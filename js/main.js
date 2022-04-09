let elDiv = document.querySelector(".wrapper-div");
let elSpan = document.querySelector(".search-result");
let elMovieReating = document.querySelector("#movie-reating");
let elMovieYear = document.querySelector("#movie-year");
let elButton = document.querySelector("#search-button");
let elTemplate = document.querySelector("#movie-template").content;
let elCategories = document.querySelector("#categories-list")


let moviesPieces = movies.slice(0,8)

let normolizeMovies = moviesPieces.map(movieItem =>{
    return{
        title: movieItem.Title.toString(),
        categories: movieItem.Categories,
        rating: movieItem.rating,
        year: movieItem.movie_year,
        imageLink: `http://i.ytimg.com/vi/${movieItem.ytid}/hqdefault.jpg`,
        youtubeLink: `https://www.youtube.com/watch?v=${movieItem.ytid}`
    }
}) 


function generationCategories(movieCategories){
    let categoryList = []

    

    movieCategories.forEach(function(item){

        let splitItem = item.categories.split("|");

        splitItem.forEach(function(item){
            if(!categoryList.includes(item)){
                categoryList.push(item)
            }
        })
    })

    categoryList.sort()
    let categoryFragment = document.createDocumentFragment()

    categoryList.forEach(function(item){
        let categoryOption = document.createElement("option")
        categoryOption.value = item
        categoryOption.textContent = item
        categoryFragment.appendChild(categoryOption)
    })
    elCategories.appendChild(categoryFragment)
}

generationCategories(normolizeMovies)

console.log(generationCategories(normolizeMovies));


function renderMovies(sliceMovies, placePush) {
    
    placePush.innerHTML = null;
    let elFragment = document.createDocumentFragment();

    
    sliceMovies.forEach(movie => {
        let templateDiv = elTemplate.cloneNode(true);
        
        templateDiv.querySelector(".card-img-top").src = movie.imageLink;
        templateDiv.querySelector(".card-title").textContent = movie.title;
        templateDiv.querySelector(".date-movie").textContent = movie.year;
        templateDiv.querySelector(".rating-movie").textContent = movie.rating;
        templateDiv.querySelector(".btn-movie-trailer").href = movie.youtubeLink;
        
        elFragment.appendChild(templateDiv)
    });
    
    placePush.appendChild(elFragment)
    
    elSpan.innerHTML = null
    elSpan.textContent = sliceMovies.length
}

renderMovies(normolizeMovies, elDiv)

//     for (var item of sliceMovies) {
//         // new list 
//         var newList = document.createElement("li")
//         newList.classList.add("col-6", "mb-3")

//         // list wrapper
//         var newDiv = document.createElement("div")
//         newDiv.classList.add("card")

//         // card image
//         var newImg = document.createElement("img")
//         newImg.classList.add("card-img-top")
//         newImg.setAttribute("alt", "Card image")
//         newImg.src = `http://i.ytimg.com/vi/${item.ytid}/hqdefault.jpg`

//         // card body
//         var newDiv2 = document.createElement("div")
//         newDiv2.classList.add("card-body")

//         // card body heading
//         var newHeading = document.createElement("h4")
//         newHeading.classList.add("card-title")
//         newHeading.textContent = item.Title.toString()

//         // card body text
//         var newP = document.createElement("p")
//         newP.classList.add("card-text")

//         // movie year
//         var newImg2 = document.createElement("img")
//         newImg2.classList.add("me-2")
//         newImg2.setAttribute("src", "https://picsum.photos/15")

//         // movie year date
//         var newSpan = document.createElement("span")
//         newSpan.classList.add()
//         newSpan.textContent = item.movie_year
        
//         // rating wrapper
//         var newDiv3 = document.createElement("div")
//         newDiv3.classList.add("pb-3")

//         // stark image
//         var newImg3 = document.createElement("img")
//         newImg3.setAttribute("src", "https://picsum.photos/15")
//         newImg3.classList.add("me-2")

//         // rating number
//         var newSpan2 = document.createElement("span")
//         newSpan2.textContent = item.imdb_rating

//         // button wrapper
//         var newDiv4 = document.createElement("div")
//         newDiv4.setAttribute("class", "btn-group d-flex gap-4")

//         // button watch trailer
//         var newButton = document.createElement("button")
//         newButton.setAttribute("class", "btn btn-outline-primary")
//         newButton.textContent = "Watch trailer"

//         // button watch More infor
//         var newButton2 = document.createElement("button")
//         newButton2.setAttribute("class", "btn btn-outline-secondary")
//         newButton2.textContent = "More infor"

//         // button watch Bookmark
//         var newButton3 = document.createElement("button")
//         newButton3.setAttribute("class", "btn btn-outline-danger")
//         newButton3.textContent = "Bookmark"

//         // elDiv appening child
//         placePush.appendChild(newList)
//         newList.appendChild(newDiv)
//         newDiv.appendChild(newImg)
//         newDiv.appendChild(newDiv2)
//         newDiv2.appendChild(newHeading)
//         newDiv2.appendChild(newP)
//         newP.appendChild(newImg2)
//         newP.appendChild(newSpan)
//         newDiv2.appendChild(newDiv3)
//         newDiv3.appendChild(newImg3)
//         newDiv3.appendChild(newSpan2)

//         newDiv2.appendChild(newDiv4)
//         newDiv4.appendChild(newButton)
//         newDiv4.appendChild(newButton2)
//         newDiv4.appendChild(newButton3)

    


// renderMovies(moviesPieces, elDiv)

elButton.addEventListener("click", function(event){
    event.preventDefault()
    
    let selectOption = elCategories.value
    let categorisedMovies = []
    if(selectOption === "All"){
        categorisedMovies = normolizeMovies
    }
    else{
        categorisedMovies = normolizeMovies.filter(function(item){
            return item.categories.split("|").includes(selectOption)
        })
    }
    // clean elDiv

    elDiv.innerHTML = null

    // filtering
    let list = movies.filter(function(item){
        return (item.imdb_rating >= elMovieReating.value && item.movie_year >= elMovieYear.value)

    })
    
    elSpan.innerHTML = null
    elSpan.textContent = list.length
    
    renderMovies(categorisedMovies, elDiv)
})

