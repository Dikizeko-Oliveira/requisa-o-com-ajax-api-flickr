$(document).ready(function() {
  var strUrl =
    "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ca370d51a054836007519a00ff4ce59e&per_page=10&format=json&nojsoncallback=1";

  var dataId = []; // recebe o id pelo qual faz a segunda requisição para obter as fotos
  var tam = 6; // limita apenas 6 fotos

  // faz a primeira requisação (obtem os Id's)
  $.ajax({
    url: strUrl,
    type: "get",
    dataType: "json",
    success: function(data) {
      for (var index = 0; index < tam; index++) {
        dataId.push(data.photos.photo[index].id);
      }

      loadPhotos();
    },
    error: function(erro) {
      console.log(erro);
    }
  });

  function loadPhotos() {
    for (var index = 0; index < dataId.length; index++) {
      var element = dataId[index];
      var strUrl2 =
        "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ca370d51a054836007519a00ff4ce59e&photo_id=" +
        element +
        "&format=json&nojsoncallback=1";

      // faz a segunda requisação (obtem o link das fotos)
      $.ajax({
        url: strUrl2,
        type: "get",
        dataType: "json",
        success: function(data) {
          var divContent = document.querySelector(".images-content");

          images = `
          <img src="${data.sizes.size[5].source}" class="images" alt=""/>
          `;
          var divImg = document.createElement("div");
          divImg.classList.add("box-img");
          divImg.innerHTML = images;

          divContent.appendChild(divImg);
          console.log(divContent);
        },
        error: function(erro) {
          console.log(erro);
        }
      });
    }
  }
});
