$(document).ready(function () {
  $("#btn").click(() => {
    $(".info").empty();
    $.ajax({
      type: "GET",
      url: "../data/movies.json",
      dataType: "json",
      success: function (response) {
        var found = false;
        var errMsg = "";
        $.each(response, (i, data) => {
          if (data.year >= 1900) {
            let txt = $("#txt").val();
            if (txt.toLowerCase() === data.title.toLowerCase()) {
              found = true;
              makeCard(data);
              imgErr();
            }
          }
        });
        if (!found || txt == "") {
          errMsg =
            "<p id='errMsg'>WOW sorry not found try again or check the name you type ;)</p>";
          $(".info").append(errMsg);
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});
function makeCard(data) {
  let card = `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4 img">
      <img src="${data.thumbnail}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <p class="card-text">${data.extract}</p>
        <p class="card-text"><small class="text-muted">${data.year}</small></p>
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
