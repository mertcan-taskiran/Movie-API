const API_URL ='https:api.themoviedb.org/4/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API ='https://api.themoviedb.org/4/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';

const form = document.getElementById('form');
const searchInput = document.getElementById('search');
const main = document.getElementById('main');
const icon = document.getElementById('icon');
const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");

getMovies(API_URL);

async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    search = searchInput.value;    

    if(search && search !== ''){
        getMovies(SEARCH_API + search);
        searchInput.value = '';
    }else{
        window.location.reload();
    }
    
});

icon.addEventListener("click", function(){
    search = searchInput.value;    

    if(search !== ''){
        getMovies(SEARCH_API + search);
        searchInput.value = '';
    }
});

function showMovies(movies){
    main.innerHTML = '';

    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview, release_date, vote_count} = movie;

        const movieCard = document.createElement("div");
        movieCard.classList.add("card","p-0", "rounded-5");
        
        movieCard.innerHTML = `
            <img id="img" src="${IMG_PATH + poster_path}" class="card-img-top rounded-top-5" alt="${title}">
            <div class="card-body text-center">
                <h2 class="card-title mb-3">${title}</h2>
                <h1 id="imdb" class="${getClassByRate(vote_average)} fs-1 text-white rounded-5 p-2">${vote_average}</h1>
                <h5>Release Date</h5>
                <h5>${release_date}</h5>
                <div class="row">
                    <h5 class="col">Imdb<br><div>${vote_average}</div></h5>
                    <h5 class="col">Vote Count<br><div>${vote_count}</div></h5>
                </div>
            </div>
            <div class="overview">
                <h3>${title}</h3>
                <p>${overview}</p>
                <a class="watch fs-4 text-white" href="#">Watch</a>
            </div>
        `;
        main.appendChild(movieCard);
    });
}

function getClassByRate(vote){
    if(vote >= 8){
        return "high";
    }else if(vote >= 6){
        return "medium";
    }else{
        return "low";
    }
}

searchBtn.onclick =()=>{
    searchBox.classList.add("active");
    searchBtn.classList.add("active");
    searchInput.classList.add("active");
    cancelBtn.classList.add("active");
    searchInput.focus();
}
cancelBtn.onclick =()=>{
    searchBox.classList.remove("active");
    searchBtn.classList.remove("active");
    searchInput.classList.remove("active");
    cancelBtn.classList.remove("active");
    searchData.classList.toggle("active");
    searchInput.value = "";
}
