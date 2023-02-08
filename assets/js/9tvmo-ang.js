var app = angular.module("app", []);

app.controller(
  "DetailsController",
  function ($scope, $http) {
    var API_KEY = "50479b124e0923c371395234e579d901";
    var backdropUrl = "https://image.tmdb.org/t/p/w1280";
    var posterUrl = "https://image.tmdb.org/t/p/w300";
    var fileUrl = "https://image.tmdb.org/t/p/w500";
    const apiUrl =
      "https://api.themoviedb.org/3/" +
      ENTITY_TYPE +
      "/" +
      ENTITY_ID +
      "?api_key=" +
      API_KEY +
      "&language=en-US&append_to_response=alternative_titles,changes,credits,images,keywords,lists,releases,reviews,similar,translations,videos";

    $http.get(apiUrl).then(function (response) {
      $scope.details = response.data;
      console.log($scope.details);
      console.log($scope.seasons);
      $scope.id = response.data.id;
      $scope.imdb_id = response.data.homepage;
      $scope.title = response.data.title || response.data.name;
      $scope.titleori =
        response.data.original_title || response.data.original_name;
      $scope.tagline = response.data.tagline;
      $scope.synopsis = response.data.overview;
      $scope.rating = response.data.vote_average;
      $scope.vote = response.data.vote_count;
      $scope.release = response.data.release_date;
      $scope.firstair = response.data.first_air_date;
      $scope.lastair = response.data.last_air_date;
      $scope.numbsea = response.data.number_of_seasons;
      $scope.numbeps = response.data.number_of_episodes;
      $scope.genre = response.data.genres.map((i) => i.name).join(", ");
      $scope.year = response.data.release_date || response.data.last_air_date;
      $scope.companies =
        (response.data.production_companies &&
          response.data.production_companies.map((i) => i.name).join(", ")) ||
        "";
      $scope.country =
        (response.data.production_countries &&
          response.data.production_countries.map((i) => i.name).join(", ")) ||
        "";
      $scope.network =
        (response.data.networks &&
          response.data.networks.map((i) => i.name).join(", ")) ||
        "";
      $scope.run_time = response.data.episode_run_time;
      $scope.runtime = response.data.runtime;
      $scope.uri = response.data.backdrop_path;
      $scope.media =
        response.data.media_type || (response.data.name ? "TV" : "Movie");
      $scope.fullmt =
        response.data.media_type ||
        (response.data.name ? "Full Episode" : "Full Movie");
      $scope.logonet =
        response.data.networks && response.data.networks.length > 0
          ? response.data.networks[0].logo_path
          : "";
      $scope.logom =
        response.data.production_companies &&
        response.data.production_companies.length > 0
          ? response.data.production_companies[0].logo_path
          : "";
      $scope.keywords = response.data.keywords;
      $scope.keywordM = response.data.keywords;
      $scope.alttitles = response.data.alternative_titles;
      $scope.alttitlesM = response.data.alternative_titles;
    });

    $scope.min2Hour = function (minutes) {
      let hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
      let hourString = hours > 0 ? hours + " hours " : "";
      let minuteString = minutes > 0 ? minutes + " min" : "";
      return hourString + minuteString;
    };

    $http({
      method: "GET",
      url:
        "https://api.themoviedb.org/3/" +
        ENTITY_TYPE +
        "/" +
        ENTITY_ID +
        "/credits?api_key=" +
        API_KEY +
        "",
    }).then(
      function successCallback(response) {
        $scope.actors = response.data.cast;
        $scope.directing = response.data.crew
          .filter(function (item) {
            return item.department === "Directing";
          })
          .map((i) => i.name);

        $scope.director = response.data.crew
          .filter(function (item) {
            return (
              item.known_for_department === "Directing" ||
              ("Director" && item.job === "Producer")
            );
          })
          .map((i) => i.name)
          .join(", ");
      },
      function errorCallback(response) {
        console.log("Error: " + response.data);
      }
    );

    $http({
      method: "GET",
      url:
        "https://api.themoviedb.org/3/" +
        ENTITY_TYPE +
        "/" +
        ENTITY_ID +
        "/images?api_key=" +
        API_KEY +
        "",
    }).then(
      function successCallback(response) {
        $scope.filebackdrop = response.data.backdrops;
        $scope.fileposter = response.data.posters;
      },
      function errorCallback(response) {
        console.log("Error: " + response.data);
      }
    );
  },

  function (error) {
    console.error(error);
  }
);
