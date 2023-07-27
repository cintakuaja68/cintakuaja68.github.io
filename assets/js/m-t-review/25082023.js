var app = angular.module("app", []);

app.controller("DetailsController", function ($scope, $http, $filter, $sce) {
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
    let hourString = hours > 0 ? hours + "h " : "";
    let minuteString = minutes > 0 ? minutes + "m " : "";
    return hourString + minuteString;
  };
  // Function to format the date
  $scope.formatDate = function (dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  // Function to format number to dollar format
  function formatToDollar(number) {
    return $filter("currency")(number, "$.", 2);
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

  $scope.showAllActors = false;

  // Function to toggle the value of showAllActors
  $scope.toggleShowActors = function () {
    $scope.showAllActors = !$scope.showAllActors;
  };

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
  // Function to fetch user critic reviews
  function fetchUserCriticReviews() {
    var reviewsUrl =
      "https://api.themoviedb.org/3/" +
      ENTITY_TYPE +
      "/" +
      ENTITY_ID +
      "/reviews?api_key=" +
      API_KEY +
      "&language=en-US";

    $http.get(reviewsUrl).then(function (response) {
      $scope.reviews = response.data.results;
    });
  }

  // Fetch user critic reviews when the page loads
  fetchUserCriticReviews();

  // Fetch movie/TV details and set title and genre
  $http.get(apiUrl).then(function (response) {
    $scope.details = response.data;
    console.log($scope.details);
    console.log($scope.seasons);
    $scope.title = response.data.title || response.data.name;
    $scope.genre = response.data.genres.map((i) => i.name).join(", ");
  });

  // Function to get the avatar URL
  $scope.getAvatarUrl = function (avatarPath) {
    if (avatarPath && avatarPath.includes("gravatar.com")) {
      return avatarPath.replace("/", "");
    } else if (avatarPath) {
      return fileUrl + avatarPath;
    } else {
      return noposter;
    }
  };

  // Variabel untuk melacak indeks review saat ini
  $scope.currentReviewIndex = 0;

  // Fungsi untuk menampilkan review berikutnya
  $scope.showNextReview = function () {
    if ($scope.currentReviewIndex < $scope.reviews.length - 1) {
      // Tambahkan 1 ke indeks review saat ini untuk mengganti ke review berikutnya
      $scope.currentReviewIndex += 1;
    }
  };

  // Function untuk mendapatkan review saat ini berdasarkan indeks
  $scope.getCurrentReview = function () {
    return $scope.reviews[$scope.currentReviewIndex];
  };

  // Variable untuk track apakah semua review ditampilkan atau tidak
  $scope.showAll = false;

  // Function untuk toggle showAll variable
  $scope.toggleShowAll = function () {
    $scope.showAll = !$scope.showAll;
  };

  // Function untuk mendapatkan review yang ditampilkan sesuai dengan showAll variable
  $scope.getDisplayedReviews = function () {
    return $scope.showAll ? $scope.reviews : [$scope.getCurrentReview()];
  };

  // Function to fetch trailer video URL for TV series
  function fetchTVSeriesTrailerUrl() {
    var trailerUrl =
      "https://api.themoviedb.org/3/" +
      ENTITY_TYPE +
      "/" +
      ENTITY_ID +
      "/season/" +
      ENTITY_SEASON +
      "/videos?api_key=" +
      API_KEY +
      "&language=en-US";

    $http.get(trailerUrl).then(function (response) {
      var videos = response.data.results;
      var trailerVideo = videos.find((video) => video.type === "Trailer");
      if (trailerVideo) {
        // Gunakan $sce.trustAsResourceUrl() untuk menganggap URL ini aman
        $scope.trailerUrl = $sce.trustAsResourceUrl(
          "https://www.youtube.com/embed/" + trailerVideo.key
        );
        // Trailer ditemukan, atur trailerNotAvailable menjadi false dan tampilkan elemen dengan ID "trailerContainer"
        $scope.trailerNotAvailable = false;
        $scope.showTrailerContainer = true;
      } else {
        // If trailer for the specified season is not available, fetch trailer for the TV series itself
        fetchTVSeriesTrailerUrlForSeries();
      }
    });
  }

  // Function to fetch trailer video URL for TV series (for the series itself, not specific season)
  function fetchTVSeriesTrailerUrlForSeries() {
    var trailerUrl =
      "https://api.themoviedb.org/3/" +
      ENTITY_TYPE +
      "/" +
      ENTITY_ID +
      "/videos?api_key=" +
      API_KEY +
      "&language=en-US";

    $http.get(trailerUrl).then(function (response) {
      var videos = response.data.results;
      var trailerVideo = videos.find((video) => video.type === "Trailer");
      if (trailerVideo) {
        // Gunakan $sce.trustAsResourceUrl() untuk menganggap URL ini aman
        $scope.trailerUrl = $sce.trustAsResourceUrl(
          "https://www.youtube.com/embed/" + trailerVideo.key
        );
        // Trailer ditemukan, atur trailerNotAvailable menjadi false dan tampilkan elemen dengan ID "trailerContainer"
        $scope.trailerNotAvailable = false;
        $scope.showTrailerContainer = true;
      } else {
        // If no trailer is available for the TV series itself, set trailerNotAvailable menjadi true dan sembunyikan elemen dengan ID "trailerContainer"
        $scope.trailerNotAvailable = true;
        $scope.showTrailerContainer = false;
      }
    });
  }

  // Function to fetch trailer video URL for movie
  function fetchMovieTrailerUrl() {
    var trailerUrl =
      "https://api.themoviedb.org/3/" +
      ENTITY_TYPE +
      "/" +
      ENTITY_ID +
      "/videos?api_key=" +
      API_KEY +
      "&language=en-US";

    $http.get(trailerUrl).then(function (response) {
      var videos = response.data.results;
      var trailerVideo = videos.find((video) => video.type === "Trailer");
      if (trailerVideo) {
        // Gunakan $sce.trustAsResourceUrl() untuk menganggap URL ini aman
        $scope.trailerUrl = $sce.trustAsResourceUrl(
          "https://www.youtube.com/embed/" + trailerVideo.key
        );
      }
    });
  }

  //SHOW MORE & LESS MORE POSTER / BACKDROP
  $scope.fileposter = [];
  $scope.filebackdrop = [];
  $scope.posterLimit = 4; // Menampilkan 4 poster pertama
  $scope.backdropLimit = 3; // Menampilkan 3 backdrop pertama
  $scope.showMoreTextPosters = "[ Show More ]"; // Teks awal tombol Show More untuk poster
  $scope.showMoreTextBackdrops = "[ Show More ]"; // Teks awal tombol Show More untuk backdrop
  $scope.showAll = false; // Status untuk menampilkan semua item atau hanya beberapa item pertama
  $scope.showAllActors = false; // Status untuk menampilkan semua aktor atau hanya beberapa aktor pertama

  // Function untuk menampilkan lebih banyak poster
  $scope.showMorePosters = function () {
    if ($scope.showMoreTextPosters === "[ Show More ]") {
      // Jika tombol Show More belum diklik, tampilkan semua poster
      $scope.posterLimit = $scope.fileposter.length;
      $scope.showMoreTextPosters = "[ Less More ]";
    } else {
      // Jika tombol Show More telah diklik, tampilkan hanya 4 poster pertama
      $scope.posterLimit = 4;
      $scope.showMoreTextPosters = "[ Show More ]";
    }

    // Scroll ke elemen dengan ID "navBar"
    scrollToNavBar();
  };

  // Function untuk menampilkan lebih banyak backdrop
  $scope.showMoreBackdrops = function () {
    if ($scope.showMoreTextBackdrops === "[ Show More ]") {
      // Jika tombol Show More belum diklik, tampilkan semua backdrop
      $scope.backdropLimit = $scope.filebackdrop.length;
      $scope.showMoreTextBackdrops = "[ Less More ]";
    } else {
      // Jika tombol Show More telah diklik, tampilkan hanya 3 backdrop pertama
      $scope.backdropLimit = 3;
      $scope.showMoreTextBackdrops = "[ Show More ]";
    }

    // Scroll ke elemen dengan ID "navBar"
    scrollToNavBar();
  };

  // Function untuk toggle tampilan semua item
  $scope.toggleShowAll = function () {
    $scope.showAll = !$scope.showAll;
    // Jika showAll adalah true, tampilkan semua item, jika false, tampilkan beberapa item pertama
    $scope.posterLimit = $scope.showAll ? $scope.fileposter.length : 4;
    $scope.backdropLimit = $scope.showAll ? $scope.filebackdrop.length : 3;
    // Scroll ke elemen dengan ID "navBar"
    scrollToNavBar();
  };

  // Function untuk toggle tampilan semua aktor
  $scope.toggleShowActors = function () {
    $scope.showAllActors = !$scope.showAllActors;
    // Jika showAllActors adalah true, tampilkan semua aktor, jika false, tampilkan beberapa aktor pertama
    $scope.actorLimit = $scope.showAllActors ? $scope.actors.length : 12;
    // Scroll ke elemen dengan ID "navBar"
    scrollToNavBar();
  };

  // Function untuk melakukan scroll ke elemen dengan ID "navBar"
  function scrollToNavBar() {
    // Anda dapat menggunakan smooth scrolling dengan mengganti 'auto' dengan 'smooth'
    var navBarElement = document.getElementById("navBar");
    if (navBarElement) {
      navBarElement.scrollIntoView({ behavior: "auto" });
    }
  }
  // Setelah mendapatkan data detail, panggil fungsi untuk mengambil trailer URL
  if (ENTITY_TYPE === "tv" && typeof ENTITY_SEASON !== "undefined") {
    $scope.trailerNotAvailable = false; // Defaultnya trailer tersedia
    $scope.showTrailerContainer = true; // Tampilkan elemen dengan ID "trailerContainer" secara default
    fetchTVSeriesTrailerUrl();
  } else if (ENTITY_TYPE === "movie") {
    $scope.trailerNotAvailable = false; // Defaultnya trailer tersedia
    $scope.showTrailerContainer = true; // Tampilkan elemen dengan ID "trailerContainer" secara default
    fetchMovieTrailerUrl();
  }
});
