$(document).ready(function () {
  checkbox();

  $("#sub").click(() => {
    $("#cards").empty();
    $.ajax({
      type: "GET",
      url: "../data/movies.json",
      dataType: "json",
      success: function (response) {
        var found = false;
        var errMsg = "";
        $.each(response, (i, data) => {
          let lst = getGenr();
          let grs = data.genres;
          if (lst.length == grs.length) {
            if (JSON.stringify(lst) == JSON.stringify(grs)) {
              found = true;
              makeCard(data);
              read();
              imgErr();
            }
          }
        });
        if (!found) {
          errMsg =
            "<p id='errMsg'>WOW sorry not found try again or check what you choose ;)</p>";
          $("#cards").append(errMsg);
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});
function read() {
  $(".spn").each((il, el) => {
    el.addEventListener("click", () => {
      $("p").parent().toggleClass("para");
    });
  });
}
function getGenr() {
  let boxs = $(".gr");
  var val = [];
  $(".gr:checked").each(function (i) {
    val[i] = $(this).val();
  });
  return val;
}
function checkbox() {
  $.ajax({
    type: "GET",
    url: "../data/genre.json",
    dataType: "json",
    success: function (response) {
      $.each(response, (i, data) => {
        let lbl = `<div class='form-check cbox '><input type="checkbox" name="genre" value="${data}" class="form-check-input gr" id="flexCheckChecked">
        <label class="form-check-label" for="flexCheckChecked">${data}</label></div>`;
        $("#container").append(lbl);
      });
    },
  });
}
function makeCard(data) {
  let card = "";
  if (data.extract === undefined) {
    card = `<div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${data.thumbnail}" alt="1.jpg">
    <div class="card-body">
      <h5 class="card-title">${data.title}</h5>
      <div class="para">
        <p class="card-text">Not Found</p>
      </div>
    </div>
  </div>`;

    $("#cards").append(card);
  } else {
    card = `<div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${data.thumbnail}" alt="1.jpg">
    <div class="card-body">
      <h5 class="card-title">${data.title}</h5>
      <div class="para" id='pr'>
        <p class="card-text"> ${data.extract}</p>
      </div>
      <span class="btn btn-primary spn" id="more"> Read more...</span>
    </div>
  </div>`;

    $("#cards").append(card);
  }
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
