//API KEY = 4309543d


const buttonSearch = document.getElementById('button-search-movies')
const inputField = document.getElementById('input-field')
const movieContainer = document.getElementById('movies-container')



const key = "73df7a97"

// const url = "http://www.omdbapi.com/?i=tt3896198&apikey=73df7a97"
// console.log(url)




 buttonSearch.addEventListener("click", e => { 
     const movie = inputField.value
     const url = `http://www.omdbapi.com/?s=${movie}&plot=full&page=1&apikey=73df7a97`
    

     fetch(url)
       .then(res => {
           return res.json()
        })
       .then(data => {
        
          if(data.Response == 'False') {
             document.getElementById('main').style.height = "779px"
             movieContainer.style.height = "571px"
              movieContainer.innerHTML = `
                <p class="p-false-response">Unable to find what you’re looking for. Please try another search.</p>
              `
              return
          }
           
           document.getElementById('main').style.height = "auto"
           movieContainer.style.height = "auto"
           movieContainer.innerHTML = ""
           let arrayResults = data.Search
           let movieId = arrayResults.map(movie => {
              return movie.imdbID
           })
     
            let watchlistList = []
            let i = 0

            movieId.map( id => {
               fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=73df7a97`)
                 .then(res => res.json())
                 .then(movie => {
                     let { Title, imdbRating, Runtime, Plot, Genre, Poster } = movie

                     let divHtml = `
                     <div class="list-result">
                             <img class="image-result" src="${Poster}" alt="movi-image"/>
                             <div class="text-container-result">
                                 <h2 class="title">${Title}  <span class="rating">${imdbRating}</span></h2>
                                 <div class="details">
                                     <p>${Runtime}</p>
                                     <p>${Genre}</p>
                                     <img class="add-watchlist-btn" src="./images/add-button.png"/>
                                     <p class="watchlist-text" id="add-button">Watchlist</p>
                                 </div>
                                 <p class="sinopsis">${Plot}</p>
                             </div>
                     </div>
                     `   
                     watchlistList.push(divHtml)
                     i++

                     movieContainer.innerHTML += divHtml
                        
                 })
            })
            return movieContainer
        })
        setTimeout(function() {
            let divs = Array.from(movieContainer.children)
            divs.map(div => {
                const textToDisplay = div.innerHTML
                const btn = div.querySelector('.add-watchlist-btn')
                btn.onclick = addToWatchlist.bind(this, textToDisplay)
            })
        }, 1000)   
    })

   
    let contentArray = JSON.parse(localStorage.getItem("content"))
       

    let addToWatchlist = function (node) {
        if (contentArray == null) {
            contentArray = []
            contentArray.push(node)
            localStorage.setItem("content", JSON.stringify(contentArray))
        } else {
            contentArray.push(node)
            localStorage.setItem("content", JSON.stringify(contentArray))
        }        
    }

    

    

