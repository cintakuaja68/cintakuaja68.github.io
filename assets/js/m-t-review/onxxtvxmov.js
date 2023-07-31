$(document).ready(function() {
      // API Key untuk TMDB
      const API_KEY = "50479b124e0923c371395234e579d901";

      // URL endpoint API TMDB untuk daftar film yang sedang diputar
      const NOW_PLAYING_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;

      // URL endpoint API TMDB untuk daftar acara TV yang tayang hari ini
      const AIRING_TODAY_TV_URL = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}`;

      // Lakukan permintaan AJAX ke API TMDB untuk film
      $.ajax({
        url: NOW_PLAYING_URL,
        method: "GET",
        dataType: "json",
        success: function(response) {
          // Tangkap daftar film dari response
          const nowPlayingMovies = response.results;

          // Bersihkan elemen daftar film sebelum menambahkan film
          $("#nowPlayingMoviesList").empty();
          $("#nowPlayingMoviesListLimited").empty();

          // Loop melalui daftar film dan tambahkan ke dalam elemen daftar
          $.each(nowPlayingMovies, function(index, movie) {
            const movieTitle = movie.title;
            const moviePoster = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
            const movieContainer = `
              <div class="movie-container col-md-3">
                <img src="${moviePoster}" alt="${movieTitle}">
                <div class="movie-title">${movieTitle}</div>
              </div>
            `;

            $("#nowPlayingMoviesList").append(movieContainer);

            // Batasi hanya menampilkan 4 film pertama di daftar kedua
            if (index < 4) {
              $("#nowPlayingMoviesListLimited").append(movieContainer);
            }
          });
        },
        error: function() {
          alert("Gagal memuat daftar film yang sedang diputar.");
        }
      });

      // Lakukan permintaan AJAX ke API TMDB untuk acara TV yang tayang hari ini (Semua)
      $.ajax({
        url: AIRING_TODAY_TV_URL,
        method: "GET",
        dataType: "json",
        success: function(response) {
          // Tangkap daftar acara TV dari response
          const airingTodayTVShows = response.results;

          // Bersihkan elemen daftar acara TV (Semua) sebelum menambahkan acara TV
          $("#airingTodayTVShowsList").empty();

          // Loop melalui daftar acara TV (Semua) dan tambahkan ke dalam elemen daftar
          $.each(airingTodayTVShows, function(index, tvShow) {
            const tvShowTitle = tvShow.name;
            const tvShowPoster = `https://image.tmdb.org/t/p/w200${tvShow.poster_path}`;
            const tvShowContainer = `
              <div class="tvshow-container col-md-3">
                <img src="${tvShowPoster}" alt="${tvShowTitle}">
                <div class="tvshow-title">${tvShowTitle}</div>
              </div>
            `;

            $("#airingTodayTVShowsList").append(tvShowContainer);
          });

          // Lakukan permintaan AJAX ke API TMDB untuk acara TV yang tayang hari ini (4 TV Show)
          $.ajax({
            url: `${AIRING_TODAY_TV_URL}&page=1`,
            method: "GET",
            dataType: "json",
            success: function(response) {
              // Tangkap daftar 4 acara TV dari response
              const airingTodayTVShowsLimited = response.results.slice(0, 4);

              // Bersihkan elemen daftar acara TV (4 TV Show) sebelum menambahkan acara TV
              $("#airingTodayTVShowsListLimited").empty();

              // Loop melalui daftar acara TV (4 TV Show) dan tambahkan ke dalam elemen daftar
              $.each(airingTodayTVShowsLimited, function(index, tvShow) {
                const tvShowTitle = tvShow.name;
                const tvShowPoster = `https://image.tmdb.org/t/p/w200${tvShow.poster_path}`;
                const tvShowContainer = `
                  <div class="tvshow-container col-md-3">
                    <img src="${tvShowPoster}" alt="${tvShowTitle}">
                    <div class="tvshow-title">${tvShowTitle}</div>
                  </div>
                `;

                $("#airingTodayTVShowsListLimited").append(tvShowContainer);
              });
            },
            error: function() {
              alert("Gagal memuat daftar 4 acara TV yang tayang hari ini.");
            }
          });
        },
        error: function() {
          alert("Gagal memuat daftar acara TV yang tayang hari ini (Semua).");
        }
      });
    });
