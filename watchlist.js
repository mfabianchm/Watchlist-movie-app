
const watchlistContainer = document.getElementById('watchList-container')
let contentText = JSON.parse(localStorage.getItem("content"))


if(contentText) {
    watchlistContainer.innerHTML = ""

    contentText.map( div => {
        document.getElementById('main').style.height = "auto"
        watchlistContainer.style.height = "auto"
        watchlistContainer.innerHTML += `
        <div class="list-result">
            ${div}
        </div>
        `
    })

    const btnsRemove = Array.from(watchlistContainer.querySelectorAll('.add-watchlist-btn'))
        
    btnsRemove.map( (btn, idx) => {
        btn.src = "./images/delete-btn.png"
        btn.onclick = removeMovie.bind(this, btn, idx)
    })


    function removeMovie (u, index) {
        
       let newContent = contentText
       newContent.splice(index, 1)
       let div = u.parentNode.parentNode.parentNode
       watchlistContainer.removeChild(div)
       if(watchlistContainer.children.length == 0) {
        document.getElementById('main').style.height = "779px"
        watchlistContainer.style.height = "571px"
         watchlistContainer. innerHTML = `
         <div class="initial-content" id="initial">
           <h2>Your watchlist is looking empty</h2>
           <a href="./index.html">Let´s add some movies</a>
         </div>
         `
         localStorage.clear()
         return
        }
       localStorage.clear()
       localStorage.setItem("content", JSON.stringify(newContent))
       document.location.reload()
       
    }

} 










