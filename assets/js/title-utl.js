

  function getQueryStringParam(param) {
    var url = window.location.toString();
    url.match(/\?(.+)$/);
    var params = RegExp.$1;
    params = params.split("&");
    var queryStringList = {};
    for (var i = 0; i < params.length; i++) {
      var tmp = params[i].split("-");
      queryStringList[tmp[0]] = unescape(tmp[1]);
    }
    return queryStringList[param];
  }

  if (getQueryStringParam("season")) {
    var season = getQueryStringParam("season");
    document.getElementById("episode-title").innerHTML = "Season " + season;

    if (getQueryStringParam("episode")) {
      var episode = getQueryStringParam("episode");
      document.getElementById("episode-title").innerHTML +=
        " - Episode " + episode + " | Full Episode";
      document.getElementById("episode2-title").innerHTML =
        "Season " + season + " - Episode " + episode;
      document.getElementById("episode3-title").innerHTML =
        " Episode " + episode;
    } else {
      document.getElementById("episode2-title").innerHTML =
        "Season " + season + " - Full Episode";
      document.getElementById("episode3-title").innerHTML = "";
    }
  } else if (getQueryStringParam("episode")) {
    var episode = getQueryStringParam("episode");
    document.getElementById("episode-title").innerHTML =
      "Episode " + episode + " | Full Episode";
    document.getElementById("episode2-title").innerHTML = "Episode " + episode;
    document.getElementById("episode3-title").innerHTML = " Episode " + episode;
  } else {
    document.getElementById("episode-title").innerHTML = "";
    document.getElementById("episode2-title").innerHTML = "";
    document.getElementById("episode3-title").innerHTML = "";
  }

