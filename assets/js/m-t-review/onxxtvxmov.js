$(document).ready(function () {
        // API Key untuk TMDB
        const API_KEY = "50479b124e0923c371395234e579d901";

        // URL endpoint API TMDB untuk daftar film yang sedang diputar
        const NOW_PLAYING_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;

        // URL endpoint API TMDB untuk daftar acara TV yang tayang hari ini
        const AIRING_TODAY_TV_URL = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}`;

        // URL endpoint API TMDB untuk daftar film top rated
        const TOP_RATED_MOVIES_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;

        // URL endpoint API TMDB untuk daftar acara TV top rated
        const TOP_RATED_TV_URL = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`;

        // URL endpoint API TMDB untuk daftar film popular
        const POPULAR_MOVIES_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

        // URL endpoint API TMDB untuk daftar acara TV popular
        const POPULAR_TV_URL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`;

        // URL endpoint API TMDB untuk daftar film upcoming
        const UPCOMING_MOVIES_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;

        // URL endpoint API TMDB untuk daftar acara TV yang sedang tayang
        const ON_THE_AIR_TV_URL = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}`;

        // Lakukan permintaan AJAX ke API TMDB untuk film yang sedang diputar
        $.ajax({
          url: NOW_PLAYING_URL,
          method: "GET",
          dataType: "json",
          success: function (response) {
            // Tangkap daftar airing today TV shows dari response
            const nowPlayingMovies = response.results;

            // Bersihkan elemen daftar airing today TV shows sebelum menambahkan acara TV (dibatasi 4 acara)
            $("#nowPlayingMoviesList").empty();

            // Loop melalui daftar airing today TV shows dan tambahkan ke dalam elemen daftar (dibatasi 4 acara)
            $.each(nowPlayingMovies, function (index, movie) {
              const movieTitle = movie.title;
              const moviePoster = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
              const movieContainer = `
                <div class="movie-container2 col-md-3">
                  <a href="/search/label/Movie">
                  <img class="poster2Img" src="${moviePoster}" alt="${movieTitle}">
                  <div class="movie-title2">${movieTitle}</div>
                  </a>
                </div>
              `;

              $("#nowPlayingMoviesList").append(movieContainer);
            });

            // Bersihkan elemen daftar airing today TV shows tanpa batasan sebelum menambahkan acara TV
            $("#nowPlayingMoviesListLimited").empty();

            // Loop melalui daftar airing today TV shows dan tambahkan ke dalam elemen daftar tanpa batasan
            $.each(nowPlayingMovies.slice(0, 4), function (index, movie) {
              const movieTitle = movie.title;
              const moviePoster = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
              const movieContainer = `
                <div class="movie-container col-md-3">
                  <a href="/p/now-playing-movies.html">
                  <img class="poster1Img" src="${moviePoster}" alt="${movieTitle}">
                  <div class="movie-title">${movieTitle}</div>
                  </a>
                </div>
              `;
              $("#nowPlayingMoviesListLimited").append(movieContainer);
            });
          },
          error: function () {
            alert("Gagal memuat daftar film yang sedang diputar.");
          },
        });

        // Lakukan permintaan AJAX ke API TMDB untuk top rated movies
        $.ajax({
          url: TOP_RATED_MOVIES_URL,
          method: "GET",
          dataType: "json",
          success: function (response) {
            // Tangkap daftar top rated movies dari response
            const topRatedMovies = response.results;

            // Bersihkan elemen daftar top rated movies sebelum menambahkan film
            $("#topRatedMoviesList").empty();

            // Loop melalui daftar top rated movies dan tambahkan ke dalam elemen daftar
            $.each(topRatedMovies, function (index, movie) {
              const movieTitle = movie.title;
              const moviePoster = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
              const movieContainer = `
                <div class="movie-container2 col-md-3">
                  <a href="/search/label/Movie">
                  <img class="poster2Img" src="${moviePoster}" alt="${movieTitle}">
                  <div class="movie-title2">${movieTitle}</div>
                  </a>
                </div>
              `;

              $("#topRatedMoviesList").append(movieContainer);
            });
          },
          error: function () {
            alert("Gagal memuat daftar top rated movies.");
          },
        });

        // Lakukan permintaan AJAX ke API TMDB untuk top rated TV shows
        $.ajax({
          url: TOP_RATED_TV_URL,
          method: "GET",
          dataType: "json",
          success: function (response) {
            // Tangkap daftar top rated TV shows dari response
            const topRatedTVShows = response.results;

            // Bersihkan elemen daftar top rated TV shows sebelum menambahkan acara TV
            $("#topRatedTVShowsList").empty();

            // Loop melalui daftar top rated TV shows dan tambahkan ke dalam elemen daftar
            $.each(topRatedTVShows, function (index, show) {
              const showTitle = show.name;
              const showPoster = `https://image.tmdb.org/t/p/w200${show.poster_path}`;
              const showContainer = `
                <div class="tvshow-container2 col-md-3">
                  <a href="/search/label/TV%20Show">
                  <img class="poster2Img" src="${showPoster}" alt="${showTitle}">
                  <div class="tvshow-title2">${showTitle}</div>
                  </a>
                </div>
              `;

              $("#topRatedTVShowsList").append(showContainer);
            });
          },
          error: function () {
            alert("Gagal memuat daftar top rated TV shows.");
          },
        });

        // Lakukan permintaan AJAX ke API TMDB untuk popular movies
        $.ajax({
          url: POPULAR_MOVIES_URL,
          method: "GET",
          dataType: "json",
          success: function (response) {
            // Tangkap daftar popular movies dari response
            const popularMovies = response.results;

            // Bersihkan elemen daftar popular movies sebelum menambahkan film
            $("#popularMoviesList").empty();

            // Loop melalui daftar popular movies dan tambahkan ke dalam elemen daftar
            $.each(popularMovies, function (index, movie) {
              const movieTitle = movie.title;
              const moviePoster = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
              const movieContainer = `
                <div class="movie-container2 col-md-3">
                  <a href="/search/label/Movie">
                  <img class="poster2Img" src="${moviePoster}" alt="${movieTitle}">
                  <div class="movie-title2">${movieTitle}</div>
                  </a>
                </div>
              `;

              $("#popularMoviesList").append(movieContainer);
            });
          },
          error: function () {
            alert("Gagal memuat daftar popular movies.");
          },
        });

        // Lakukan permintaan AJAX ke API TMDB untuk popular TV shows
        $.ajax({
          url: POPULAR_TV_URL,
          method: "GET",
          dataType: "json",
          success: function (response) {
            // Tangkap daftar popular TV shows dari response
            const popularTVShows = response.results;

            // Bersihkan elemen daftar popular TV shows sebelum menambahkan acara TV
            $("#popularTVShowsList").empty();

            // Loop melalui daftar popular TV shows dan tambahkan ke dalam elemen daftar
            $.each(popularTVShows, function (index, show) {
              const showTitle = show.name;
              const showPoster = `https://image.tmdb.org/t/p/w200${show.poster_path}`;
              const showContainer = `
                <div class="tvshow-container2 col-md-3">
                  <a href="/search/label/TV%20Show">
                  <img class="poster2Img" src="${showPoster}" alt="${showTitle}">
                  <div class="tvshow-title2">${showTitle}</div>
                  </a>
                </div>
              `;

              $("#popularTVShowsList").append(showContainer);
            });
          },
          error: function () {
            alert("Gagal memuat daftar popular TV shows.");
          },
        });

        // Lakukan permintaan AJAX ke API TMDB untuk upcoming movies
        $.ajax({
          url: UPCOMING_MOVIES_URL,
          method: "GET",
          dataType: "json",
          success: function (response) {
            // Tangkap daftar upcoming movies dari response
            const upcomingMovies = response.results;

            // Bersihkan elemen daftar upcoming movies sebelum menambahkan film
            $("#upcomingMoviesList").empty();

            // Loop melalui daftar upcoming movies dan tambahkan ke dalam elemen daftar
            $.each(upcomingMovies, function (index, movie) {
              const movieTitle = movie.title;
              const moviePoster = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
              const movieContainer = `
                <div class="movie-container2 col-md-3">
                  <a href="/search/label/Movie">
                  <img class="poster2Img" src="${moviePoster}" alt="${movieTitle}">
                  <div class="movie-title2">${movieTitle}</div>
                  </a>
                </div>
              `;

              $("#upcomingMoviesList").append(movieContainer);
            });
          },
          error: function () {
            alert("Gagal memuat daftar upcoming movies.");
          },
        });

        // Lakukan permintaan AJAX ke API TMDB untuk on the air TV shows
        $.ajax({
          url: ON_THE_AIR_TV_URL,
          method: "GET",
          dataType: "json",
          success: function (response) {
            // Tangkap daftar on the air TV shows dari response
            const onTheAirTVShows = response.results;

            // Bersihkan elemen daftar on the air TV shows sebelum menambahkan acara TV
            $("#onTheAirTVShowsList").empty();

            // Loop melalui daftar on the air TV shows dan tambahkan ke dalam elemen daftar
            $.each(onTheAirTVShows, function (index, show) {
              const showTitle = show.name;
              const showPoster = `https://image.tmdb.org/t/p/w200${show.poster_path}`;
              const showContainer = `
                <div class="tvshow-container2 col-md-3">
                  <a href="/search/label/TV%20Show">
                  <img class="poster2Img" src="${showPoster}" alt="${showTitle}">
                  <div class="tvshow-title2">${showTitle}</div>
                  </a>
                </div>
              `;

              $("#onTheAirTVShowsList").append(showContainer);
            });
          },
          error: function () {
            alert("Gagal memuat daftar on the air TV shows.");
          },
        });

        // Lakukan permintaan AJAX ke API TMDB untuk airing today TV shows (dibatasi 4 acara)
        $.ajax({
          url: AIRING_TODAY_TV_URL,
          method: "GET",
          dataType: "json",
          success: function (response) {
            // Tangkap daftar airing today TV shows dari response
            const airingTodayTVShows = response.results;

            // Bersihkan elemen daftar airing today TV shows sebelum menambahkan acara TV (dibatasi 4 acara)
            $("#airingTodayTVShowsList").empty();

            // Loop melalui daftar airing today TV shows dan tambahkan ke dalam elemen daftar (dibatasi 4 acara)
            $.each(airingTodayTVShows.slice(0, 4), function (index, show) {
              const showTitle = show.name;
              const showPoster = `https://image.tmdb.org/t/p/w200${show.poster_path}`;
              const showContainer = `
                <div class="tvshow-container col-md-3">
                  <a href="/p/airing-today-tv-shows.html">
                  <img class="poster1Img" src="${showPoster}" alt="${showTitle}">
                  <div class="tvshow-title">${showTitle}</div>
                  </a>
                </div>
              `;

              $("#airingTodayTVShowsList").append(showContainer);
            });

            // Bersihkan elemen daftar airing today TV shows tanpa batasan sebelum menambahkan acara TV
            $("#airingTodayTVShowsListUnlimited").empty();

            // Loop melalui daftar airing today TV shows dan tambahkan ke dalam elemen daftar tanpa batasan
            $.each(airingTodayTVShows, function (index, show) {
              const showTitle = show.name;
              const showPoster = `https://image.tmdb.org/t/p/w200${show.poster_path}`;
              const showContainer = `
                <div class="tvshow-container2 col-md-3">
                  <a href="/search/label/TV%20Show">
                  <img class="poster2Img" src="${showPoster}" alt="${showTitle}">
                  <div class="tvshow-title2">${showTitle}</div>
                  </a>
                </div>
              `;

              $("#airingTodayTVShowsListUnlimited").append(showContainer);
            });
          },
          error: function () {
            alert("Gagal memuat daftar airing today TV shows.");
          },
        });
      });
