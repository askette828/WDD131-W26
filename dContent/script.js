const movies = [
  {
    title: "Spider-Man: Into the Spider-Verse",
    date: "Dec 14, 2018",
    description: "Miles Morales becomes the Spider-Man of his reality and crosses paths with others from the multiverse.",
    imgSrc: "./img24.jpg",
    imgAlt: "Miles Morales swinging through the city",
    ages: "10+",
    genre: "Action/Adventure",
    stars: "⭐⭐⭐⭐⭐"
  },
  {
    title: "The Other Side of Heaven",
    date: "December 14, 2001",
    description: "Based on the true story of Elder John H. Groberg, a missionary in Tonga in the 1950s, this film tells a powerful story of faith, hardship, and miracles.",
      imgSrc: "img31.jpg",
    imgAlt: "Poster for The Other Side of Heaven showing a missionary and tropical landscape",
    ages: "10+",
    genre: "Drama/Religious",
    stars: "⭐⭐⭐⭐"
  },
  {
    title: "Luca",
    date: "June 18, 2021",
    description: "Two sea monsters experience a life-changing summer on the Italian Riviera.",
      imgSrc: "img35.jpg",
    imgAlt: "Luca and Alberto standing on the beach",
    ages: "6+",
    genre: "Family/Fantasy",
    stars: "⭐⭐⭐⭐"
  },
  {
    title: "17 Miracles",
    date: "June 3, 2011",
    description: "A moving depiction of the Willie Handcart Company's journey west in 1856, focusing on the miraculous events that helped early pioneers survive one of the harshest migrations in history.",
      imgSrc: "img39.jpg",
    imgAlt: "Movie poster for 17 Miracles showing handcart pioneers walking through snow",
    ages: "12+",
    genre: "Historical/Religious",
    stars: "⭐⭐⭐⭐"
  }
];

const movieList = document.getElementById("movie-list");

movies.forEach(movie => {
  const thumbnailHTML = movie.imgSrc
    ? `<img class="movie-thumbnail" src="${movie.imgSrc}" alt="${movie.imgAlt}" />`
    : `<div class="movie-thumbnail-placeholder" aria-label="${movie.imgAlt}">🎬</div>`;

  const cardHTML = `
    <article class="movie-card">
      ${thumbnailHTML}
      <div class="movie-info">
        <h2 class="movie-title">${movie.title}</h2>
        <p class="movie-meta-line"><span>Release Date:</span> ${movie.date}</p>
        <p class="movie-meta-line"><span>Recommended Age:</span> ${movie.ages}</p>
        <p class="movie-meta-line"><span>Genre:</span> ${movie.genre}</p>
        <p class="movie-meta-line"><span>Rating:</span> <span class="movie-stars">${movie.stars}</span></p>
      </div>
      <p class="movie-description">${movie.description}</p>
    </article>
  `;

  movieList.innerHTML += cardHTML;
});
