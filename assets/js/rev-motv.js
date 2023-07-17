//////////////////4MOVIE///////////////////
var apiKey = "342d3061b70d2747a1e159ae9a7e9a36";
var director;
var producer;
var writer;
var allReviews = [];

function getMovieInfo() {
  $.ajax({
    url: "https://api.themoviedb.org/3/movie/" + movieId,
    data: {
      api_key: apiKey,
    },
    success: function (data) {
      var title =
        data.title + " (" + moment(data.release_date).format("YYYY") + ")";
      var releaseDate = moment(data.release_date).format("MMMM DD, YYYY");
      var tagline = data.tagline || "N/A";
      var runtime = formatRuntime(data.runtime) || "N/A";
      var genres =
        data.genres && data.genres.length > 0
          ? data.genres.map((genre) => genre.name).join(", ")
          : "N/A";
      var productionCompanies =
        data.production_companies && data.production_companies.length > 0
          ? data.production_companies.map((company) => company.name).join(", ")
          : "N/A";
      var posterUrl =
        "https://image.tmdb.org/t/p/w500" + (data.poster_path || "");
      var overview = data.overview || "N/A";
      $("#overview").html(overview);
      var releaseDate = formatDate(data.release_date) || "N/A";

      var budget = data.budget ? formatCurrency(data.budget, "USD") : "N/A";
      var revenue = data.revenue ? formatCurrency(data.revenue, "USD") : "N/A";
      var tmdbId = data.id || "N/A";
      var imdbId = data.imdb_id || "N/A";
      var imdbUrl =
        imdbId !== "N/A" ? `https://www.imdb.com/title/${imdbId}` : "";

      $("#imdbId").html(
        `
              
              <div class="media">
  <p class="source">source: </p>
  <div class="media-body">
    <span><a href="${imdbUrl}" target="_blank">imdb.com</a></span> & 
    <span><a href="https://www.themoviedb.org/movie/${tmdbId}" target="_blank">themoviedb.org</a></span>
  </div>
</div>
              
              `
      );
      var homepage = data.homepage || "N/A";
      var status = data.status || "N/A";
      var rating = data.vote_average || 0;
      var ratingPercentage = (rating / 10) * 100;
      var mediaType = "Movie";

      // Dapatkan sertifikasi melalui permintaan HTTP GET lainnya menggunakan jQuery AJAX
      $.ajax({
        url: `https://api.themoviedb.org/3/movie/${movieId}/release_dates`,
        type: "GET",
        data: {
          api_key: apiKey,
        },
        success: function (releaseData) {
          var certifications = releaseData.results.filter(function (result) {
            return result.iso_3166_1 === "US"; // Filter berdasarkan kode negara (misalnya, AS)
          });
          var certification =
            certifications.length > 0
              ? certifications[0].release_dates[0].certification
              : "Tidak Tersedia";

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
                     <span>${status}</span>
                  </div>
                  <div class="certification">
                    ${certification}
                  </div>
                </div>
              `);
        },
        error: function (error) {
          console.log("Terjadi kesalahan:", error);
        },
      });

      $("#movie-details").html(`
        <table id="movie-details">
          <tr>
            <td class="title">Title:</td>
            <td class="info">${title}</td>
          </tr>
          <tr>
            <td class="title">Tagline:</td>
            <td class="info">${tagline}</td>
          </tr>
          <tr>
            <td class="title">Genres:</td>
            <td class="info">${genres}</td>
          </tr>
          <tr>
            <td class="title">Runtime:</td>
            <td class="info">${runtime}</td>
          </tr>
          <tr>
            <td class="title">Budget:</td>
            <td class="info">${budget}</td>
          </tr>
          <tr>
            <td class="title">Revenue:</td>
            <td class="info">${revenue}</td>
          </tr>
          <tr>
            <td class="title">Release Date:</td>
            <td class="info">${releaseDate}</td>
          </tr>
          <tr>
            <td class="title">Director:</td>
            <td class="info" id="director"></td>
          </tr>
          <tr>
            <td class="title">Producer:</td>
            <td class="info" id="producer"></td>
          </tr>
          <tr>
            <td class="title">Writer:</td>
            <td class="info" id="writer"></td>
          </tr>
          <tr>
            <td class="title">Production Companies:</td>
            <td class="info">${productionCompanies}</td>
          </tr>
         <tr>
         
          <tr>
            <td class="title">ID IMDb:</td>
            <td class="info">${imdbId}</td>
          </tr>
          <tr>
            <td class="title">Home Page:</td>
            <td class="info"><a href="${homepage}" target="_blank">${homepage}</a></td>
          </tr>
        </table>
      `);

      // Mendapatkan daftar pemain (cast), kru film, dan ulasan kritik
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

function formatCurrency(value, currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(value);
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

// Mengambil alternatif judul dan kata kunci dari API TMDB
var alternativeTitlesUrl =
  "https://api.themoviedb.org/3/movie/" +
  movieId +
  "/alternative_titles?api_key=" +
  apiKey;

$.ajax({
  url: alternativeTitlesUrl,
  method: "GET",
}).done(function (alternativeTitlesResponse) {
  var alternativeTitles = alternativeTitlesResponse.titles;
  var alternativeTitlesHtml = "";

  if (alternativeTitles.length > 0) {
    alternativeTitlesHtml += "<h2>Alternatif Titles:</h2>";
    alternativeTitlesHtml += "<ul>";
    alternativeTitles.forEach(function (title) {
      alternativeTitlesHtml +=
        "<span class='badge badge-secondary'>" + title.title + "</span>";
    });
    alternativeTitlesHtml += "</ul>";
  }

  // Mengambil plot keywords dari API TMDB
  var keywordsUrl =
    "https://api.themoviedb.org/3/movie/" +
    movieId +
    "/keywords?api_key=" +
    apiKey;

  $.ajax({
    url: keywordsUrl,
    method: "GET",
  }).done(function (keywordsResponse) {
    var keywords = keywordsResponse.keywords;
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

    // Menampilkan alternatif judul dan kata kunci
    var alternativesContainer = document.getElementById(
      "alternatives-container"
    );
    alternativesContainer.innerHTML = keywordsHtml + alternativeTitlesHtml;
  });
});

function getMovieCredits() {
  $.ajax({
    url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
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

function getCriticReviews() {
  $.ajax({
    url: `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
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
              ${firstReview.content}
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
  ${review.content}</div>
</div>
    `;
    })
    .join("");

  $("#critic-reviews").append(reviewHtml);
  $("#more-button").remove();
}

function getImages() {
  $.ajax({
    url: `https://api.themoviedb.org/3/movie/${movieId}/images`,
    type: "GET",
    data: {
      api_key: apiKey,
    },
    success: function (data) {
      var backdrops = data.backdrops;
      var images = "";
      var indicators = "";

      if (backdrops.length > 0) {
        for (var i = 0; i < backdrops.length; i++) {
          var imageUrl =
            "https://image.tmdb.org/t/p/w533_and_h300_bestv2" +
            (backdrops[i].file_path || "");

          images += `
            <div class="carousel-item ${i === 0 ? "active" : ""}">
              <img class="d-block w-100" src="${imageUrl}" alt="Backdrop Image ${
            i + 1
          }">
            </div>
          `;

          indicators += `
            <li data-target="#fath-image" data-slide-to="${i}" ${
            i === 0 ? 'class="active"' : ""
          }></li>
          `;
        }
      } else {
        images = "<p>No images available.</p>";
      }

      $("#fath-image .carousel-indicators").html(indicators);
      $("#fath-image .carousel-inner").html(images);
    },
    error: function (xhr, status, error) {
      console.log("Error:", error);
    },
  });
}

//  GET CAST & CREW TRAILER
function getCast() {
  $.ajax({
    url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
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
    url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
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
    url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
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
      var currentOtherCrewCount = maxOtherCrewToShow;
      var moreOtherCrewCount = crew.length - currentOtherCrewCount;

      for (var i = 0; i < crew.length; i++) {
        var member = crew[i];
        var name = member.name;
        var job = member.job;
        var profilePath = member.profile_path
          ? "https://image.tmdb.org/t/p/w185" + member.profile_path
          : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgVXZa8eCeksqwW7BY-xP4gmGdE2SkV5jnddPxWjk8eold1xHwU2Lnt8UJI5YfFbn18m05wXCSyTpXYRV6QUjRslVR3IUTvcBwKYIwBVkvKLXd3beilYL5t6ppsnlfnOVQA0w5yQparyIGIrDDeU2hEU8rIt6zlKQ6h1AwL0vDpTV8pj3FCAhhAJ1FNARkk/s1600/no-cover.png";

        if (job === "Director") {
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
        } else if (job === "Writer") {
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
        } else if (job === "Producer") {
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
          if (i < maxOtherCrewToShow) {
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
    url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
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

function getImages() {
  $.ajax({
    url: `https://api.themoviedb.org/3/movie/${movieId}/images`,
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
    url: `https://api.themoviedb.org/3/movie/${movieId}/videos`,
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

// GET CAST CREW TRAILER END
// Panggil fungsi getMovieImages saat halaman dimuat
$(document).ready(function () {
  getMovieImages();
});
$(document).ready(function () {
  getMovieInfo();
});

//////////////////4MOVIE END///////////////////
