$(document).ready(function () {
  $("#btn").click(() => {
    $(".info").empty();
    let inp = $("#txt").val().replace(" ", "%20");
    const url = `https://api.themoviedb.org/3/search/keyword?query=${inp}&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTY3NmRlOWI0YTAzYTdlOGQ0ODZjNTY3MWQ2N2UyNCIsInN1YiI6IjY0NDU3NzQzYWQ4N2Y3MTc2YTcyNzRjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vQ0wTEOjweUUodHiy9LNTnkC0iwgnWzKofNhCbJ3R1M",
      },
    };
    getApi(url, options);
  });
});
function makeCard(data) {
  let card = `<div class="card mb-3 cls" >
  <div class="row g-0">
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <span class="card-text"><a href="https://www.imdb.com/title/tt${data.id}" target="_blank">more info</a></span>
      </div>
    </div>
  </div>
</div>`;

  $(".info").append(card);
}
function imgErr() {
  $(".rounded-start").each((il, el) => {
    el.addEventListener("error", function handleError() {
      const defaultImage = "../img/cover.jfif";

      el.src = defaultImage;
      el.alt = "default";
    });
  });
}
async function getApi(url, opt) {
  const response = await fetch(url, opt);
  let movie = await response.json();
  let data = movie.results;
  let errMsg = "";
  if (data.length >= 1) {
    data.forEach((e) => {
      makeCard(e);
      console.log(e);
      imgErr();
    });
  } else {
    errMsg =
      "<p id='errMsg'>WOW sorry not found try again or check what you typed ;)</p>";
    $(".info").append(errMsg);
  }
}
