var apiKey = "342d3061b70d2747a1e159ae9a7e9a36";

function getTvInfo() {
  $.ajax({
    url: "https://api.themoviedb.org/3/tv/" + tvId,
    data: {
      api_key: apiKey,
      append_to_response: "content_ratings,external_ids",
    },
    success: function (data) {
      var title = data.name;
      var tagline = data.tagline;
      var runtime = formatRuntime(data.episode_run_time[0]);
      var genres = data.genres.map((genre) => genre.name).join(", ");
      var networks = data.networks.map((network) => network.name).join(", ");
      var posterUrl = "https://image.tmdb.org/t/p/w500" + data.poster_path;
      var overview = data.overview;
      $("#overview").html(overview);
      var firstAirDate = formatDate(data.first_air_date);
      var lastAirDate = formatDate(data.last_air_date);
      var seasonNumber = data.number_of_seasons;
      var episodeNumber = data.number_of_episodes;
      var tmdbId = data.id || "N/A";
      var imdbId = data.external_ids.imdb_id;
      var imdbUrl =
        imdbId !== "N/A" ? `https://www.imdb.com/title/${imdbId}` : "";

      $("#imdbId").html(`
              <div class="media">
                <p class="source">source: </p>
                <div class="media-body">
                  <span><a href="${imdbUrl}" target="_blank">imdb.com</a></span> &
                  <span><a href="https://www.themoviedb.org/tv/${tmdbId}" target="_blank">themoviedb.org</a></span>
                </div>
              </div>
            `);

      var homepage = data.homepage || "N/A";
      var status = data.status || "N/A";
      var rating = data.vote_average || 0;
      var ratingPercentage = (rating / 10) * 100;
      var mediaType = "TV";
      var homePage = data.homepage;
      var productionCountries = data.production_countries
        .map((country) => country.name)
        .join(", ");
      var director = data.created_by[0].name;
      var producer = data.created_by[0].name;
      var writer = data.created_by[0].name;

      $("#poster-container").html(`
              <img class='poster' src='${posterUrl}' alt='${title} Poster'>
              <div class="status-rating">
                <div class="progress-circle" data-progress="${ratingPercentage}">
                  <svg class="progress-circle__svg" viewBox="0 0 100 100">
                    <circle class="progress-circle__background" cx="50" cy="50" r="45"></circle>
                    <circle class="progress-circle__progress" cx="50" cy="50" r="45"></circle>
                  </svg>
                  <div class="rating">
                    ${rating.toFixed(1)}
                  </div>
                </div>
                <div class="status">
                  <span class="status-media">${mediaType}</span>
                   <span class="certification"></span>
                  <div>${status}</div>
                </div>

              </div>
            `);

      // Dapatkan sertifikasi melalui permintaan HTTP GET lainnya menggunakan jQuery AJAX
      $.ajax({
        url: `https://api.themoviedb.org/3/tv/${tvId}/content_ratings`,
        type: "GET",
        data: {
          api_key: apiKey,
        },
        success: function (contentData) {
          var certifications = contentData.results;
          var certification = "N/A";

          for (var i = 0; i < certifications.length; i++) {
            if (certifications[i].iso_3166_1 === "US") {
              certification = certifications[i].rating;
              break;
            }
          }

          $(".certification").html(certification);
        },
        error: function (error) {
          console.log("Terjadi kesalahan:", error);
        },
      });

      $("#movie-details").html(`
              <table id="movie-details">
                <tr>
                  <td class="title">Title</td>
                  <td class="titik2">:</td>
                  <td class="info">${title}</td>
                </tr>
                <tr>
                  <td class="title">Tagline</td>
                  <td class="titik2">:</td>
                  <td class="info">${tagline}</td>
                </tr>
                <tr>
                  <td class="title">Runtime</td>
                  <td class="titik2">:</td>
                  <td class="info">${runtime}</td>
                </tr>
                <tr>
                  <td class="title">Genres</td>
                  <td class="titik2">:</td>
                  <td class="info">${genres}</td>
                </tr>
                <tr>
                  <td class="title">First Air Date</td>
                  <td class="titik2">:</td>
                  <td class="info">${firstAirDate}</td>
                </tr>
                <tr>
                  <td class="title">Last Air Date</td>
                  <td class="titik2">:</td>
                  <td class="info">${lastAirDate}</td>
                </tr>
                <tr>
                  <td class="title">Number of Season</td>
                  <td class="titik2">:</td>
                  <td class="info">${seasonNumber}</td>
                </tr>
                <tr>
                  <td class="title">Number of Episode</td>
                  <td class="titik2">:</td>
                  <td class="info">${episodeNumber}</td>
                </tr>
                <tr>
                  <td class="title">Creator</td>
                  <td class="titik2">:</td>
                  <td class="info">${director}</td>
                </tr>
                <tr>
                  <td class="title">Country</td>
                  <td class="titik2">:</td>
                  <td class="info">${productionCountries}</td>
                </tr>

                <tr>
                  <td class="title">Networks</td>
                  <td class="titik2">:</td>
                  <td class="info">${networks}</td>
                </tr>
                  <td class="title">Home Page</td>
                  <td class="titik2">:</td>
                  <td class="info"><a href="${homepage}" target="_blank">${homepage}</a></td>
                </tr>
              </table>
            `);

      // Mendapatkan daftar musim (seasons)
      getSeasons();
      getCriticReviews();
      getMovieCredits();
      getCast();
      getCrew();
      getImages();
      getTrailers();
      getReviews();
      getAlternatives();
    },
  });
}

function formatRuntime(minutes) {
  var hours = Math.floor(minutes / 60);
  var remainingMinutes = minutes % 60;
  var runtimeString = "";

  if (hours > 0) {
    runtimeString += hours + "h ";
  }

  runtimeString += remainingMinutes + "m";

  return runtimeString;
}

function formatDate(dateString) {
  var date = new Date(dateString);
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString(undefined, options);
}
// menampilkan season
function getSeasons() {
  $.ajax({
    url: `https://api.themoviedb.org/3/tv/${tvId}`,
    data: {
      api_key: apiKey,
      append_to_response: "seasons",
    },
    success: function (data) {
      var seasons = data.seasons;
      seasons.forEach(function (season) {
        var seasonNumber = season.season_number;
        var seasonName = season.name;

        // Hanya menampilkan season yang sesuai dengan pilihan
        if (seasonNumber == selectedSeason) {
          var posterUrl =
            "https://image.tmdb.org/t/p/w500" + season.poster_path;
          var seasonTitle = `${data.name} - Season ${seasonNumber} - ${seasonName}`;
          $("#season-episode").html(`
                 <div><h4>${seasonTitle}</h4></div>
                      <div id="season-info">
                        <div class='col-md-3'><img class='poster tv' src='${posterUrl}' alt='${seasonTitle} Poster'></div>
                        <div class='col-md-9'>
                          <h5>All Episodes:</h5>
                          <ul id="episode-list"></ul>
                        </div>
                      </div>
                    `);

          // Mendapatkan daftar episode
          getEpisodes(seasonNumber);
        }
      });
    },
  });
}
// menampilkan episode end
function getEpisodes(seasonNumber) {
  $.ajax({
    url: `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}`,
    data: {
      api_key: apiKey,
    },
    success: function (data) {
      var episodes = data.episodes;
      episodes.forEach(function (episode) {
        var episodeNumber = episode.episode_number;
        var episodeTitle = episode.name;
        var episodeRuntime = episode.runtime;
        var episodeReleaseDate = episode.air_date;
        var formattedRuntime = formatRuntime(episodeRuntime);
        var formattedReleaseDate = formatDateEps(episodeReleaseDate);
        $("#episode-list").append(`
                    <li>Episode ${episodeNumber}: ${episodeTitle} <span class="date-episode">(${formattedRuntime}) - [${formattedReleaseDate}]</span></li>
                  `);
      });
    },
  });
}
function formatDateEps(dateString) {
  var date = new Date(dateString);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

// menampilkan image file_path & trailer
function getImages() {
  $.ajax({
    url: `https://api.themoviedb.org/3/tv/${tvId}/images`,
    type: "GET",
    data: {
      api_key: apiKey,
    },
    success: function (data) {
      var backdrops = data.backdrops;
      var images = "";

      if (backdrops.length > 0) {
        for (var i = 0; i < backdrops.length; i++) {
          var imageUrl =
            "https://image.tmdb.org/t/p/w533_and_h300_bestv2" +
            (backdrops[i].file_path || "");

          var activeClass = i === 0 ? "active" : "";

          images += `
            <div class="carousel-item ${activeClass}">
              <img class="d-block w-100 backdrop-image" src="${imageUrl}" alt="Backdrop Image ${
            i + 1
          }">
            </div>
          `;
        }
      } else {
        images = "No images available.";
      }

      $(".carousel-inner").html(images);
    },
    error: function (xhr, status, error) {
      console.log("Error:", error);
    },
  });
}

function getTrailers() {
  $.ajax({
    url: `https://api.themoviedb.org/3/tv/${tvId}/videos`,
    type: "GET",
    data: {
      api_key: apiKey,
    },
    success: function (data) {
      var trailers = data.results;
      var trailerVideos = "";

      if (trailers.length > 0) {
        for (var i = 0; i < trailers.length; i++) {
          var trailer = trailers[i];
          var videoKey = trailer.key;
          var videoSite = trailer.site;
          var videoType = trailer.type;

          if (
            videoSite.toLowerCase() === "youtube" &&
            videoType.toLowerCase() === "trailer"
          ) {
            trailerVideos += `
              <div class="trailer-card">
                <iframe
                  class="trailer-video"
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/${videoKey}"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            `;
            break; // Menambahkan break untuk hanya menampilkan trailer pertama yang memenuhi kriteria
          }
        }
      } else {
        trailerVideos = "No trailers available.";
      }

      $("#trailer-movie").html(trailerVideos);
    },
    error: function (xhr, status, error) {
      console.log("Error:", error);
    },
  });
}

// menampilkan cats dan crew
function getCast() {
  $.ajax({
    url: `https://api.themoviedb.org/3/tv/${tvId}/credits`,
    type: "GET",
    data: {
      api_key: apiKey,
    },
    success: function (data) {
      var cast = data.cast;
      var castList = "";

      var maxCastToShow = 5; // Batasan maksimal 5 cast yang akan ditampilkan
      var moreCastCount = cast.length - maxCastToShow; // Jumlah cast yang tersisa

      if (cast.length > 0) {
        for (var i = 0; i < Math.min(cast.length, maxCastToShow); i++) {
          var actor = cast[i].name;
          var character = cast[i].character;
          var profilePath = cast[i].profile_path
            ? "https://image.tmdb.org/t/p/w185" + cast[i].profile_path
            : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgVXZa8eCeksqwW7BY-xP4gmGdE2SkV5jnddPxWjk8eold1xHwU2Lnt8UJI5YfFbn18m05wXCSyTpXYRV6QUjRslVR3IUTvcBwKYIwBVkvKLXd3beilYL5t6ppsnlfnOVQA0w5yQparyIGIrDDeU2hEU8rIt6zlKQ6h1AwL0vDpTV8pj3FCAhhAJ1FNARkk/s1600/no-cover.png";

          castList += `
            <div class="cast-item">
              <div class="cast-image">
                <img src="${profilePath}" alt="${actor}">
              </div>
              <div class="cast-details">
                <p class="artist-name"><strong>${actor}</strong></p>
                <p class="artist-job"><strong>${character}</strong></p>
              </div>
            </div>
          `;
        }

        if (moreCastCount > 0) {
          castList += `
            <button id="more-cast-button" onclick="showMoreCast(${maxCastToShow}, ${moreCastCount})">More</button>
          `;
        }
      } else {
        castList = "No cast available.";
      }

      $("#cast-info").html(castList);
    },
    error: function (xhr, status, error) {
      console.log("Error:", error);
    },
  });
}

function showMoreCast(startIndex, count) {
  $.ajax({
    url: `https://api.themoviedb.org/3/tv/${tvId}/credits`,
    type: "GET",
    data: {
      api_key: apiKey,
    },
    success: function (data) {
      var cast = data.cast;
      var castList = "";

      for (var i = startIndex; i < startIndex + count; i++) {
        var actor = cast[i].name;
        var character = cast[i].character;
        var profilePath = cast[i].profile_path
          ? "https://image.tmdb.org/t/p/w185" + cast[i].profile_path
          : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgVXZa8eCeksqwW7BY-xP4gmGdE2SkV5jnddPxWjk8eold1xHwU2Lnt8UJI5YfFbn18m05wXCSyTpXYRV6QUjRslVR3IUTvcBwKYIwBVkvKLXd3beilYL5t6ppsnlfnOVQA0w5yQparyIGIrDDeU2hEU8rIt6zlKQ6h1AwL0vDpTV8pj3FCAhhAJ1FNARkk/s1600/no-cover.png";

        castList += `
          <div class="cast-item">
            <div class="cast-image">
              <img src="${profilePath}" alt="${actor}">
            </div>
            <div class="cast-details">
              <p class="artist-name"><strong>${actor}</strong></p>
              <p class="artist-job"><strong>${character}</strong></p>
            </div>
          </div>
        `;
      }

      $("#cast-info").append(castList);
      $("#more-cast-button").remove(); // Menghapus tombol "More" setelah menampilkan lebih banyak cast
    },
    error: function (xhr, status, error) {
      console.log("Error:", error);
    },
  });
}

function getCrew() {
  $.ajax({
    url: `https://api.themoviedb.org/3/tv/${tvId}/credits`,
    type: "GET",
    data: {
      api_key: apiKey,
    },
    success: function (data) {
      var crew = data.crew;
      var directorList = "";
      var writerList = "";
      var producerList = "";
      var otherCrewList = "";

      var maxOtherCrewToShow = 6;
      var currentOtherCrewCount = 0;
      var moreOtherCrewCount = crew.length - maxOtherCrewToShow;

      var directorCount = 0;

      for (var i = 0; i < crew.length; i++) {
        var member = crew[i];
        var name = member.name;
        var job = member.job;
        var profilePath = member.profile_path
          ? "https://image.tmdb.org/t/p/w185" + member.profile_path
          : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgVXZa8eCeksqwW7BY-xP4gmGdE2SkV5jnddPxWjk8eold1xHwU2Lnt8UJI5YfFbn18m05wXCSyTpXYRV6QUjRslVR3IUTvcBwKYIwBVkvKLXd3beilYL5t6ppsnlfnOVQA0w5yQparyIGIrDDeU2hEU8rIt6zlKQ6h1AwL0vDpTV8pj3FCAhhAJ1FNARkk/s1600/no-cover.png";

        if (job === "Director" && directorCount === 0) {
          directorList += `
            <div class="cast-item">
              <div class="cast-image">
                <img src="${profilePath}" alt="${name}">
              </div>
              <div class="cast-details">
                <p class="artist-name"><strong>${name}</strong></p>
                <p class="artist-job"><strong>${job}</strong></p>
              </div>
            </div>
          `;
          directorCount++;
        } else if (job === "Writer" && writerList === "") {
          writerList += `
            <div class="cast-item">
              <div class="cast-image">
                <img src="${profilePath}" alt="${name}">
              </div>
              <div class="cast-details">
                <p class="artist-name"><strong>${name}</strong></p>
                <p class="artist-job"><strong>${job}</strong></p>
              </div>
            </div>
          `;
        } else if (job === "Producer" && producerList === "") {
          producerList += `
            <div class="cast-item">
              <div class="cast-image">
                <img src="${profilePath}" alt="${name}">
              </div>
              <div class="cast-details">
                <p class="artist-name"><strong>${name}</strong></p>
                <p class="artist-job"><strong>${job}</strong></p>
              </div>
            </div>
          `;
        } else {
          if (currentOtherCrewCount < maxOtherCrewToShow) {
            otherCrewList += `
              <div class="cast-item">
                <div class="cast-image">
                  <img src="${profilePath}" alt="${name}">
                </div>
                <div class="cast-details">
                  <p class="artist-name"><strong>${name}</strong></p>
                  <p class="artist-job"><strong>${job}</strong></p>
                </div>
              </div>
            `;
            currentOtherCrewCount++;
          }
        }
      }

      if (moreOtherCrewCount > 0) {
        otherCrewList += `
          <button id="more-other-crew-button" onclick="showMoreOtherCrew(${maxOtherCrewToShow}, ${moreOtherCrewCount})">More</button>
        `;
      }

      $("#director-info").html(directorList);
      $("#writer-info").html(writerList);
      $("#producer-info").html(producerList);
      $("#other-crew-info").html(otherCrewList);
    },
    error: function (xhr, status, error) {
      console.log("Error:", error);
    },
  });
}

function showMoreOtherCrew(startIndex, count) {
  $.ajax({
    url: `https://api.themoviedb.org/3/tv/${tvId}/credits`,
    type: "GET",
    data: {
      api_key: apiKey,
    },
    success: function (data) {
      var crew = data.crew;
      var otherCrewList = "";

      for (var i = startIndex; i < startIndex + count; i++) {
        var member = crew[i];
        var name = member.name;
        var job = member.job;
        var profilePath = member.profile_path
          ? "https://image.tmdb.org/t/p/w185" + member.profile_path
          : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgVXZa8eCeksqwW7BY-xP4gmGdE2SkV5jnddPxWjk8eold1xHwU2Lnt8UJI5YfFbn18m05wXCSyTpXYRV6QUjRslVR3IUTvcBwKYIwBVkvKLXd3beilYL5t6ppsnlfnOVQA0w5yQparyIGIrDDeU2hEU8rIt6zlKQ6h1AwL0vDpTV8pj3FCAhhAJ1FNARkk/s1600/no-cover.png";

        otherCrewList += `
          <div class="cast-item">
            <div class="cast-image">
              <img src="${profilePath}" alt="${name}">
            </div>
            <div class="cast-details">
              <p class="artist-name"><strong>${name}</strong></p>
              <p class="artist-job"><strong>${job}</strong></p>
            </div>
          </div>
        `;
      }

      $("#other-crew-info").append(otherCrewList);
      $("#more-other-crew-button").remove(); // Menghapus tombol "More" setelah menampilkan lebih banyak crew
    },
    error: function (xhr, status, error) {
      console.log("Error:", error);
    },
  });
}

// Mengambil alternatif judul dan kata kunci dari API TMDB
var alternativeTitlesUrl =
  "https://api.themoviedb.org/3/tv/" +
  tvId +
  "/alternative_titles?api_key=" +
  apiKey;

$.ajax({
  url: alternativeTitlesUrl,
  method: "GET",
}).done(function (alternativeTitlesResponse) {
  var alternativeTitles = alternativeTitlesResponse.results;
  var alternativeTitlesHtml = "";

  if (alternativeTitles.length > 0) {
    alternativeTitlesHtml += "<h2>Alternative Titles:</h2>";
    alternativeTitlesHtml += "<ul>";
    alternativeTitles.forEach(function (title) {
      alternativeTitlesHtml +=
        "<span class='badge badge-secondary'>" +
        title.title +
        " (" +
        title.iso_3166_1 +
        ")</span>";
    });
    alternativeTitlesHtml += "</ul>";
  }

  // Mendapatkan keywords dari API TMDB
  var keywordsUrl =
    "https://api.themoviedb.org/3/tv/" + tvId + "/keywords?api_key=" + apiKey;

  $.ajax({
    url: keywordsUrl,
    method: "GET",
  }).done(function (keywordsResponse) {
    var keywords = keywordsResponse.results;
    var keywordsHtml = "";

    if (keywords.length > 0) {
      keywordsHtml += "<h2>Keywords:</h2>";
      keywordsHtml += "<ul>";
      keywords.forEach(function (keyword) {
        keywordsHtml +=
          "<span class='badge badge-secondary'>" + keyword.name + "</span>";
      });
      keywordsHtml += "</ul>";
    }

    // Menampilkan alternative titles dan keywords
    var alternativesContainer = document.getElementById(
      "alternatives-container"
    );
    alternativesContainer.innerHTML = keywordsHtml + alternativeTitlesHtml;
  });
});

function getMovieCredits() {
  $.ajax({
    url: `https://api.themoviedb.org/3/tv/${tvId}/credits`,
    data: {
      api_key: apiKey,
    },
    success: function (data) {
      // Memeriksa apakah data kru film tersedia
      if (data.crew && data.crew.length > 0) {
        // Mencari direktur, produser, dan penulis
        var crewList = data.crew;
        for (var i = 0; i < crewList.length; i++) {
          var crew = crewList[i];
          if (crew.job === "Director") {
            director = crew.name;
          } else if (crew.job === "Producer") {
            producer = crew.name;
          } else if (crew.job === "Writer") {
            writer = crew.name;
          }
        }
      }

      // Menetapkan nilai "N/A" jika direktur, produser, atau penulis tidak tersedia
      var directorValue = director ? director : "N/A";
      var producerValue = producer ? producer : "N/A";
      var writerValue = writer ? writer : "N/A";

      // Menampilkan nilai direktur, produser, dan penulis
      $("#director").text(directorValue);
      $("#producer").text(producerValue);
      $("#writer").text(writerValue);
    },
  });
}

// menampilkan critic review
function getCriticReviews() {
  $.ajax({
    url: `https://api.themoviedb.org/3/tv/${tvId}/reviews`,
    data: {
      api_key: apiKey,
    },
    success: function (data) {
      if (data.results && data.results.length > 0) {
        allReviews = data.results;
        var firstReview = allReviews[0];
        var avatarPath = firstReview.author_details.avatar_path;
        var avatarUrl = getAvatarUrl(avatarPath);
        var reviewHtml = `
          <div class="media review">
            <img class="mr-3 author-profile-image" src="${avatarUrl}" alt="${
          firstReview.author
        }">
               
            <div class="media-body">
              <h5 class="mt-0"><a href="https://www.themoviedb.org/review/${
                firstReview.id
              }" target="_blank" class="author-name">${firstReview.author}</a>
               <span class="align-self-center mr-3 rating"><a class="bintang">✯</a>${
                 firstReview.author_details.rating ?? "N/A"
               }</span>
              <p class="review-date">${formatDate(firstReview.created_at)}</p>
              </h5>
              <div class="rev-content">${firstReview.content}</div>
            </div>
          </div>
        `;

        if (allReviews.length > 1) {
          var remainingReviewsCount = allReviews.length - 1;
          var moreButtonHtml = `
    <button id="more-button" onclick="showMoreReviews()" type="button" class="btn btn-primary">
      <span class="badge badge-light">${remainingReviewsCount} reviews</span>
      <span class="sr-only">unread messages</span>
    </button>
  `;

          $("#review-button-container").html(moreButtonHtml);
        }

        $("#critic-reviews").html(reviewHtml);
      } else {
        $("#critic-reviews").html("<p>No critic reviews available.</p>");
      }
    },
  });
}

function getAvatarUrl(avatarPath) {
  if (
    avatarPath &&
    (avatarPath.startsWith("/https://") || avatarPath.startsWith("/http://"))
  ) {
    return avatarPath.slice(1);
  } else if (avatarPath) {
    return `https://image.tmdb.org/t/p/w200${avatarPath}`;
  } else {
    return "https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-File.png"; // Ganti dengan URL gambar avatar default Anda
  }
}

function showMoreReviews() {
  var reviewHtml = allReviews
    .slice(1)
    .map((review) => {
      var avatarPath = review.author_details.avatar_path;
      var avatarUrl = getAvatarUrl(avatarPath);
      return `
      
       <div class="media review">
  <img class="mr-3 author-profile-image" src="${avatarUrl}" alt="${
        review.author
      }">
  <div class="media-body">
    <h5 class="mt-0"><a href="https://www.themoviedb.org/review/${
      review.id
    }" target="_blank" class="author-name">${review.author}</a>
     <span class="align-self-center mr-3 rating"><a class="bintang">✯</a>${
       review.author_details.rating ?? "N/A"
     }</span>
    <p class="review-date">${formatDate(review.created_at)}</p>
    </h5>
  <div class="rev-content">${review.content}</div></div>
</div>
    `;
    })
    .join("");

  $("#critic-reviews").append(reviewHtml);
  $("#more-button").remove();
}

$(document).ready(function () {
  getTvInfo();
});
