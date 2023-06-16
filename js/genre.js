// displaying checkboxs of genres
checkbox();
// displaying list of years
radio();
document.getElementById("search").addEventListener("click", () => {
  document.getElementById("cards").innerHTML = "";
  getData(getGenr(), getYear());
});

// creat check boxs
function checkbox() {
  let xhttp = new XMLHttpRequest();
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTY3NmRlOWI0YTAzYTdlOGQ0ODZjNTY3MWQ2N2UyNCIsInN1YiI6IjY0NDU3NzQzYWQ4N2Y3MTc2YTcyNzRjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vQ0wTEOjweUUodHiy9LNTnkC0iwgnWzKofNhCbJ3R1M"
  );
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.response).genres;
      data.forEach((el) => {
        let lbl = `<div class='form-check cbox '><input type="checkbox" name="genre" value="${el.id}" class="form-check-input gr" id="flexCheckChecked">
                  <label class="form-check-label" for="flexCheckChecked">${el.name}</label></div>`;
        document.getElementById("container").innerHTML += lbl;
      });
    }
  };
}

function getGenr() {
  let boxs = document.querySelectorAll(".gr:checked");
  var val = [];
  boxs.forEach((e, i) => {
    val[i] = e.value;
  });
  return val;
}
// end of check boxs and thier values
// creat list of years
function radio() {
  for (let i = 1950; i < 2022; i++) {
    let radioBox = `<div class="form-check m-1">
    <input class="form-check-input " type="radio" name="flexRadioDefault"  value="${i}">
    <label class="form-check-label " >${i} </label>`;
    let cont = document.getElementById("container_1");
    cont.innerHTML += radioBox;
  }
}
function getYear() {
  let y = document.querySelector("input[type='radio']:checked");
  return y.value;
}
// end
function getData(genre, year) {
  let gr = genre.join("%2C");
  const url1 = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=1&region=us&with_genres=${gr}&year=${year}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTY3NmRlOWI0YTAzYTdlOGQ0ODZjNTY3MWQ2N2UyNCIsInN1YiI6IjY0NDU3NzQzYWQ4N2Y3MTc2YTcyNzRjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vQ0wTEOjweUUodHiy9LNTnkC0iwgnWzKofNhCbJ3R1M",
    },
  };
  getApi(url1, options);
}
function makeCard(data) {
  let card = `<div class="card" style="width: 18rem;">
    <img class="card-img-top" src="https://image.tmdb.org/t/p/original${data.poster_path}" alt="1.jpg">
    <div class="card-body">
      <h5 class="card-title">${data.title} :: ${data.release_date}</h5>
      <div class="para" id='pr'>
        <p class="card-text"> ${data.overview}</p>
      </div>
      <span class="btn btn-primary spn" id="more"> Read more...</span>
    </div>
  </div>`;

  let cards = document.getElementById("cards");
  cards.innerHTML += card;
}
async function getApi(url, opt) {
  const response = await fetch(url, opt);
  let movie = await response.json();
  let data = movie.results;
  data.forEach((e) => {
    makeCard(e);
    imgErr();
    read();
  });
}
function imgErr() {
  $(".card-img-top").each((il, el) => {
    el.addEventListener("error", function handleError() {
      const defaultImage = "../img/cover.jfif";

      el.src = defaultImage;
      el.alt = "default";
    });
  });
}
function read() {
  $(".spn").each((il, el) => {
    el.addEventListener("click", () => {
      $("p").parent().toggleClass("para");
    });
  });
}
