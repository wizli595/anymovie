$(document).ready(function () {
  $("#txt").keyup(function (e) {
    $(".keys").empty();
    let strt = $("#txt").val().replace(" ", "+");
    do {
      if (strt == "") return;
      const url1 = `https://api.themoviedb.org/3/search/keyword?query=${strt}&language=en-US&page=1`;
      const options1 = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTY3NmRlOWI0YTAzYTdlOGQ0ODZjNTY3MWQ2N2UyNCIsInN1YiI6IjY0NDU3NzQzYWQ4N2Y3MTc2YTcyNzRjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vQ0wTEOjweUUodHiy9LNTnkC0iwgnWzKofNhCbJ3R1M",
        },
      };

      getKey(url1, options1);
    } while (false);
  });
  $("#btn").click(() => {
    // new
    $(".info").empty();
    $(".corr").empty();
    let inp = $("#txt").val().replace(" ", "%20");
    const url = `https://api.themoviedb.org/3/search/movie?query=${inp}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTY3NmRlOWI0YTAzYTdlOGQ0ODZjNTY3MWQ2N2UyNCIsInN1YiI6IjY0NDU3NzQzYWQ4N2Y3MTc2YTcyNzRjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vQ0wTEOjweUUodHiy9LNTnkC0iwgnWzKofNhCbJ3R1M",
      },
    };
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        apikey: "eZkdD4rr8KWHzDD7fuwaV97WowyJA97C",
      },
    };
    const urlSpl = `https://api.apilayer.com/spell/spellchecker?q=${inp}`;
    spellCheck(urlSpl, requestOptions);
    getApi(url, options);
  });
});
function makeCard(data) {
  let card = `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4 img">
      <img src="https://image.tmdb.org/t/p/original${data.poster_path}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <p class="card-text">${data.overview}</p>
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
      imgErr();
    });
  } else {
    errMsg =
      "<p id='errMsg'>WOW sorry not found try again or check what you typed ;)</p>";
    $(".info").append(errMsg);
  }
}
async function getKey(url, opt) {
  const response = await fetch(url, opt);
  let movie = await response.json();
  let data = movie.results;
  let errMsg = "";
  if (data.length >= 1) {
    data.forEach((e) => {
      // makeCard(e);
      $(".keys").append(
        `<div class="key"><span onclick="insert(this)">${e.name}</span></div>`
      );
      // imgErr();
    });
  } else {
    $(".keys").empty();
    errMsg = "<p id='errMsg'>no suggestions</p>";
    $(".keys").append(errMsg);
  }
}
async function spellCheck(url, opt) {
  const response = await fetch(url, opt);
  let spell = await response.json();
  let correction = $(".corr");
  if (spell.corrections.length != 0) {
    correction.append("<p>did you mean :</p>");
    spell.corrections.forEach((e) => {
      e.candidates.forEach((el) => {
        let exp = `<div class="mea">${el};</div>`;
        correction.append(exp);
      });
    });
    return true;
  } else {
    return false;
  }
}
function insert(e) {
  $("#txt").val(e.innerHTML);
}
