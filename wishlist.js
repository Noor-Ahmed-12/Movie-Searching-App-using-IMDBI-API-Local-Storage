let WishList = document.getElementById("movie-list")


  // Retrieve existing wishlist from local storage
  const wishListData = JSON.parse(localStorage.getItem("wishlist"));
  let html=''
  for (const movie of wishListData.reverse()) {
    console.log(movie.title)
    const imageSrc = movie.img !== "N/A" ? movie.img : "https://via.placeholder.com/100x150";
    html += `
        <div class="movie-card">
            <img src="${imageSrc}" alt="${movie.title}">
            <div class="content">
                <h2>${movie.title}</h2>
                <div>
                    <span>year: ${movie.year}</span>
                    <span onclick="copyToClip('${movie.imdbID}')"><i class="fa fa-clipboard copy-icon"></i> IMDb ID: ${movie.imdbID}</span>
                    <button onClick="removeFromLocalStorage('${movie.imdbID}')">Remove from Wishlist</button>

                </div>
            </div>
        </div>
    `;
    WishList.innerHTML = html;
  }


  // Function to remove a movie from the wishlist in localStorage
removeFromLocalStorage = (imdbID) => {
    // Retrieve existing wishlist from local storage
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Find the index of the movie with the specified IMDb ID
    const indexToRemove = existingWishlist.findIndex(movie => movie.imdbID === imdbID);

    if (indexToRemove !== -1) {
        // Remove the movie from the array
        existingWishlist.splice(indexToRemove, 1);

        // Update the local storage with the updated wishlist array
        localStorage.setItem("wishlist", JSON.stringify(existingWishlist));

        // Update the displayed wishlist on the page
        updateWishlistDisplay(existingWishlist);

        alert(`Movie with IMDb ID ${imdbID} has been removed from the wishlist.`);
    } else {
        alert(`Movie with IMDb ID ${imdbID} not found in the wishlist.`);
    }
}

// Example function to update the displayed wishlist on the page
updateWishlistDisplay = (wishlist) => {
    // Update the displayed wishlist on the page as needed
    // For example, you might rerender the HTML with the updated wishlist
    let updatedHtml = '';
    for (const movie of wishlist.reverse()) {
        const imageSrc = movie.img !== "N/A" ? movie.img : "https://via.placeholder.com/100x150";
        updatedHtml += `
            <div class="movie-card">
                <img src="${imageSrc}" alt="${movie.title}">
                <div class="content">
                    <h2>${movie.title}</h2>
                    <div>
                        <span>Year: ${movie.year}</span>
                        <span onclick="copyToClip('${movie.imdbID}')"><i class="fa fa-clipboard copy-icon"></i> IMDb ID: ${movie.imdbID}</span>
                        <button onClick="removeFromLocalStorage('${movie.imdbID}')">Remove from Wishlist</button>
                    </div>
                </div>
            </div>
        `;
    }
    WishList.innerHTML = updatedHtml;
}