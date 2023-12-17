// JavaScript code for movie search
let apiKey = "b9ec01e5";

SearchMovie = (event) => {
    const searchBtn = document.getElementById("search-btn");
    searchBtn.disabled = true;
    event.preventDefault();
    const movieTitle = document.getElementById("search").value;
    fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            DisplayMovieList(data.Search);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
        .finally(() => {
            // Ensure the button is re-enabled in case of success or error
            searchBtn.disabled = false;
        });
}

document.getElementById("movie-form").addEventListener("submit", SearchMovie);

DisplayMovieList = (Movies) => {
    const movieList = document.getElementById("movie-list");
    let html = "";
    for (const movie of Movies) {
        const imageSrc = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/100x150";
        html += `
            <div class="movie-card">
                <img src="${imageSrc}" alt="${movie.Title}">
                <div class="content">
                    <h2>${movie.Title}</h2>
                    <div>
                        <span>Year: ${movie.Year}</span>
                        <span onclick="copyToClip('${movie.imdbID}')"><i class="fa fa-clipboard copy-icon"></i> IMDb ID: ${movie.imdbID}</span>
                        <button onClick="savetoLocalStorage('${movie.Title}', '${imageSrc}', '${movie.Year}', '${movie.imdbID}')">Add to Wishlist</button>

                    </div>
                </div>
            </div>
        `;
    }
    movieList.innerHTML = html;
    document.getElementById("search").value = "";
}

copyToClip = (imdbID) => {
    navigator.clipboard.writeText(imdbID);
    alert(`IMDb ID '${imdbID}' copied to clipboard!`);
}


savetoLocalStorage = (title, img, year, imdbID) => {
    // Retrieve existing wishlist from local storage
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Check if the movie is already in the wishlist
    const isAlreadyInWishlist = existingWishlist.some(item => item.imdbID === imdbID);

    if (isAlreadyInWishlist) {
        // Movie is already in the wishlist, display a message or handle as needed
        alert(`${title} is already in your wishlist`);
    } else {
        // Movie is not in the wishlist, add it to the wishlist
        const newWishlistItem = { title, img, year, imdbID };

        // Add the new wishlist item to the existing wishlist array
        existingWishlist.push(newWishlistItem);

        // Update the local storage with the updated wishlist array
        localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
        alert(`${title} is added to your wishlist`);
    }
}

