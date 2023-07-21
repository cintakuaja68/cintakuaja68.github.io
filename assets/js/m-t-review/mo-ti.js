var app = angular.module("app", []);

app.controller("DetailsController", function ($scope, $http, $filter) {
  var API_KEY = "50479b124e0923c371395234e579d901";
  var backdropUrl = "https://image.tmdb.org/t/p/w1280";
  var posterUrl = "https://image.tmdb.org/t/p/w300";
  var fileUrl = "https://image.tmdb.org/t/p/w500";
  var noimage = "https://cintakuaja68.github.io/assets/img/no-backdrop.png";
  var noposter =
    "https://cintakuaja68.github.io/assets/img/no profil image.jpg";

  const apiUrl =
    "https://api.themoviedb.org/3/" +
    ENTITY_TYPE +
    "/" +
    ENTITY_ID +
    "?api_key=" +
    API_KEY +
    "&language=en-US&append_to_response=alternative_titles,changes,credits,images,keywords,lists,releases,reviews,similar,translations,videos,seasons,external_ids";

  $http.get(apiUrl).then(function (response) {
    $scope.details = response.data;
    console.log($scope.details);
    console.log($scope.seasons);
    $scope.title = response.data.title || response.data.name;
    $scope.titleori =
      response.data.original_title || response.data.original_name;
    $scope.tagline = response.data.tagline;
    $scope.certificationTV = "";
    $scope.certificationMovie = "";
    $scope.synopsis = response.data.overview;
    $scope.rating = response.data.vote_average;
    $scope.vote = response.data.vote_count;
    $scope.release = response.data.release_date;
    $scope.budget = formatToDollar(response.data.budget);
    $scope.revenue = formatToDollar(response.data.revenue);
    $scope.imdbId = response.data.imdb_id;
    $scope.tmdbId = response.data.id;
    $scope.wikidataId = response.data.external_ids.wikidata_id;
    $scope.homepage = response.data.homepage;
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
    var productionCountries = response.data.production_countries;
    $scope.country =
      (productionCountries &&
        productionCountries
          .map(function (country) {
            return countryMap[country.name] || country.name;
          })
          .join(", ")) ||
      "";
    var languageCode = response.data.original_language;
    $scope.language =
      languageMap[languageCode] || response.data.original_language;
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
    $scope.seasons = response.data.seasons;
    if (ENTITY_TYPE === "tv") {
      fetchSeriesData();
    } else if (ENTITY_TYPE === "movie") {
      fetchMovieData();
    }
    if (ENTITY_TYPE === "tv") {
      // Set IMDb ID for TV series
      $scope.imdbId = response.data.external_ids.imdb_id || "";
    }
  });

  // Function to set the selected season
  $scope.setSelectedSeason = function (seasonNumber) {
    $http({
      method: "GET",
      url:
        "https://api.themoviedb.org/3/" +
        ENTITY_TYPE +
        "/" +
        ENTITY_ID +
        "/season/" +
        seasonNumber +
        "?api_key=" +
        API_KEY,
    }).then(
      function successCallback(response) {
        $scope.selectedSeason = response.data;
        console.log("Selected Season:", $scope.selectedSeason); // Check the selected season object
      },
      function errorCallback(response) {
        console.log("Error: " + response.data);
      }
    );
  };

  $scope.min2Hour = function (minutes) {
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    let hourString = hours > 0 ? hours + " h " : "";
    let minuteString = minutes > 0 ? minutes + " m " : "";
    return hourString + minuteString;
  };

  // Function to format number to dollar format
  function formatToDollar(number) {
    return $filter("currency")(number, "$", 2);
  }

  $http
    .get(`https://api.themoviedb.org/3/${ENTITY_TYPE}/${ENTITY_ID}/credits`, {
      params: {
        api_key: API_KEY,
      },
    })
    .then(function successCallback(response) {
      // Handle response and assign crew data to scope variable
      $scope.crews = response.data.crew;
      // Handle response and assign data to the scope variables
      var credits = response.data;

      // Get the list of actors
      $scope.actors = credits.cast;

      // Filter and get the name of the first director
      var director = credits.crew.find(function (item) {
        return item.job === "Director";
      });

      // Filter and get the name of the first producer
      var producer = credits.crew.find(function (item) {
        return item.job === "Producer";
      });

      // Set values for director and producer
      if (director && producer && director.name === producer.name) {
        $scope.director = director.name;
        $scope.producer = "";
      } else {
        $scope.director = director ? director.name + "," : "N/A";
        $scope.producer = producer ? producer.name : "N/A";
      }
      // Set values for director, producer, and writer
      if (ENTITY_TYPE === "movie") {
        var writer = credits.crew.find(function (item) {
          return item.job === "Writer";
        });
        $scope.writer = writer ? writer.name : "N/A";
      }

      // Check if the TV Series has 'created_by' information
      if (ENTITY_TYPE === "tv") {
        $http
          .get(`https://api.themoviedb.org/3/${ENTITY_TYPE}/${ENTITY_ID}`, {
            params: {
              api_key: API_KEY,
            },
          })
          .then(function successCallback(response) {
            var tvSeriesData = response.data;
            var creators = tvSeriesData.created_by;
            // Check if there are any creators
            if (creators && creators.length > 0) {
              // Limit the number of displayed creators to 2
              var displayedCreators = creators.slice(0, 2);
              $scope.creators = displayedCreators
                .map(function (creator) {
                  return creator.name;
                })
                .join(", ");
            } else {
              $scope.creators = "N/A";
            }
          })
          .catch(function (error) {
            console.log("Error fetching TV Series data:", error);
          });
      }
    })
    .catch(function (error) {
      // Handle errors if needed
      console.log("Error fetching credits data:", error);
    });

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
      $scope.noimage = noimage;
      $scope.noposter = noposter;
    },
    function errorCallback(response) {
      console.log("Error: " + response.data);
    }
  );
  // SEASON TMDB
  if (ENTITY_TYPE === "tv" && typeof ENTITY_SEASON !== "undefined") {
    var apiUrls = `https://api.themoviedb.org/3/${ENTITY_TYPE}/${ENTITY_ID}/season/${ENTITY_SEASON}?api_key=${API_KEY}`;

    // Make the API call to fetch TV series season details
    $http
      .get(apiUrls)
      .then(function (response) {
        var data = response.data;
        $scope.poster = data.poster_path || "";
        $scope.seasonNumber = data.season_number || "";
        $scope.seasonName = data.name || "";
        $scope.episodes = data.episodes || [];
      })
      .catch(function (error) {
        console.log("Error fetching data:", error);
      });
  }
  function fetchEpisodeData() {
    // Ambil data dari API TMDB untuk setiap episode
    for (let i = 0; i < $scope.episodes.length; i++) {
      const episode = $scope.episodes[i];
      $http
        .get(
          `https://api.themoviedb.org/3/${ENTITY_TYPE}/${ENTITY_ID}/season/${ENTITY_SEASON}/episode/${episode.episode_number}`,
          {
            params: {
              api_key: API_KEY,
            },
          }
        )
        .then(
          function (response) {
            // Tangani respon dan perbarui data runtime dan release date untuk episode tertentu
            const episodeData = response.data;
            episode.runtime = episodeData.runtime;
            episode.air_date = episodeData.air_date;
          },
          function (error) {
            // Tangani kesalahan jika diperlukan
            console.log("Error fetching data:", error);
          }
        );
    }
  }

  // Ambil data dari API TMDB untuk sertifikasi seri TV
  function fetchSeriesData() {
    $http
      .get(
        `https://api.themoviedb.org/3/${ENTITY_TYPE}/${ENTITY_ID}/content_ratings`,
        {
          params: {
            api_key: API_KEY,
          },
        }
      )
      .then(
        function (response) {
          const certifications = response.data.results;
          const certificationForSeries = certifications.find(
            (cert) => cert.iso_3166_1 === "US" //
          );
          $scope.certificationTV = certificationForSeries
            ? certificationForSeries.rating
            : "Not Rated";
        },
        function (error) {
          console.log("Error fetching data:", error);
        }
      );
  }
  // Ambil data dari API TMDB untuk sertifikasi film
  function fetchMovieData() {
    $http
      .get(
        `https://api.themoviedb.org/3/${ENTITY_TYPE}/${ENTITY_ID}/release_dates`,
        {
          params: {
            api_key: API_KEY,
          },
        }
      )
      .then(
        function (response) {
          const releases = response.data.results;
          const certificationForMovie = releases.find(
            (release) => release.iso_3166_1 === "US"
          );
          $scope.certificationMovie = certificationForMovie
            ? certificationForMovie.release_dates[0].certification
            : "Not Rated";
        },
        function (error) {
          console.log("Error fetching data:", error);
        }
      );
  }
});
