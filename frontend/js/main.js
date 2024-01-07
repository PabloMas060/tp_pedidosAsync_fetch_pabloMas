window.onload = async() => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

try {
  let response = await fetch ('http://localhost:3031/api/movies')
  let peliculas = await response.json();


    let data = peliculas.data;

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);



      const star = document.createElement('button');
      star.setAttribute('class','botonAgregar');
      star.setAttribute('id','movie' + movie.id)
      star.innerHTML = '<i class="fa-regular fa-star"></i>'
      card.appendChild(star)

      const starFav = document.createElement('button');
      starFav.setAttribute('class','botonAgregar');
      starFav.setAttribute('id','movie' + movie.id)
      starFav.innerHTML = '<i class="fa fa-star"></i>'
      card.appendChild(starFav)
      starFav.style.display = "none";

    

   
      const link = document.createElement("a");
      link.setAttribute("class", "botonAgregar")
      link.setAttribute("href", `formulario.html?movie=${movie.id}&edit=true`)
      link.textContent = "Editar"
      card.appendChild(link);

    

      star.addEventListener("click", () => {
        const movieId = movie.id;
        const favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];

        if (favorites.includes(movieId)) {

          const movieIndex = favorites.indexOf(movieId);
          favorites.splice(movieIndex, 1);
          localStorage.setItem("favorites", JSON.stringify(favorites));
          card.classList.remove("favorite");
          starFav.style.display = "none";
          star.style.display = "inline-block";
          console.log("Película eliminada de favoritos");
        } else {

          favorites.push(movieId);
          localStorage.setItem("favorites", JSON.stringify(favorites));
          card.classList.add("favorite");
          starFav.style.display = "inline-block";
          star.style.display = "none";
          console.log("Película agregada a favoritos");
        }
      })

    starFav.addEventListener("click", () => {
      const movieId = movie.id;
      const favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];

      if (favorites.includes(movieId)) {

        const movieIndex = favorites.indexOf(movieId);
        favorites.splice(movieIndex, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        card.classList.remove("favorite");
        starFav.style.display = "none";
        star.style.display = "inline-block";
        console.log("Película eliminada de favoritos");
      }
    })
  })

} catch (error) {
  console.log(error)
}


}

