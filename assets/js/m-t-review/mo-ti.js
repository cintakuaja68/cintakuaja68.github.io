/* TMDB STYLE */
.cast-details {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 98%;
  /* background-color: rgba(0, 0, 0, 0.8); */
  color: #fff;
  padding: 0;
  font-size: 12px;
}

p.artist-name {
  margin: 0;
  background: #00000091;
}

.artist-job {
  margin: 0;
  background: #007bff91;
}
.cast-item {
  flex: 0 0 calc(20% - 35px);
  position: relative;
  display: inline-block;
  margin: 4px;
  background: #357a4b47;
  text-align: center;
}

.cast-item img {
  display: block;
  max-width: 124px;
  height: auto;
}
div#cast-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: -webkit-center;
}

#button-container {
  margin-top: 10px;
  text-align: center;
}

#poster-container {
  float: left;
  margin-right: 20px !important;
  width: 100%;
  max-width: 220px; /* Atur lebar maksimum poster sesuai kebutuhan Anda */
  margin: 0 auto; /* Pusatkan poster di tengah */
}

#poster-container img {
  width: 220px;
  height: auto;
  display: block;
}

#fath-image {
  float: left;
  margin-right: 20px !important;
  width: 100%;
  margin: 0 auto; /* Pusatkan gambar Fath di tengah */
}

#fath-image img {
  width: 100%;
  height: auto;
  display: block;
}

#movie-details {
  margin-top: 10px; /* Berikan jarak di atas movie details */
}

/* Media queries untuk perangkat seluler */
@media (max-width: 767px) {
  #poster-container {
    float: none; /* Hilangkan float pada perangkat seluler */
    max-width: 100%; /* Atur lebar maksimum poster menjadi 100% */
    text-align: -webkit-center;
  }

  #fath-image {
    float: none; /* Hilangkan float pada perangkat seluler */
    max-width: 100%; /* Atur lebar maksimum gambar Fath menjadi 100% */
    text-align: -webkit-center;
  }

  #movie-details {
    margin-top: 20px; /* Berikan jarak yang lebih besar di atas movie details */
  }

  #movie-details td.detail {
    width: 25% !important;
  }
}

#movie-details td.detail {
  width: 18%;
  padding: 6px;
  vertical-align: top;
}
#movie-details td.isi-detail {
  padding: 6px;
}
#movie-info {
  overflow: auto;
  font-size: 11px;
  line-height: 20px;
  background: #c1c1c1;
}

#other-crew-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: -webkit-center;
}

#crew-table {
  width: 100%;
}

#crew-table td {
  padding: 2px;
  border: 2px solid white;
}

#crew-table td.job {
  background-color: #c1c1c1; /* Latar belakang untuk kolom pekerjaan */
}

#crew-table td.name {
  background-color: #e0e0e0; /* Latar belakang untuk kolom nama orang */
}
td.title {
  width: 126px;
  vertical-align: top;
  font-weight: 600;
  /* text-shadow: 1px 0px #17eaea; */
  box-shadow: inset 0px -1px 0px 0px #80808047;
  background: #121fcf;
  background: linear-gradient(to right, #121fcf 0%, #cf1512 55%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
td.titik2 {
  width: 5%;
  vertical-align: top;
}
td.info {
  padding-bottom: 5px;
  vertical-align: top;
  box-shadow: inset 0px -1px 0px 0px #80808047;
  /* width: 126px; */
  vertical-align: top;
  font-weight: 600;
  /* text-shadow: 1px 0px #17eaea; */
  box-shadow: inset 0px -1px 0px 0px #80808047;
  background: #121fcf;
  background: linear-gradient(to right, #121fcf 0%, #cf1512 55%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#movie-details tr:hover {
  box-shadow: inset 0px 0px 77px -40px #00000096;
}
div.row {
  margin-left: 0px;
}
.img-responsive {
  display: block;
  max-width: 100%;
  height: auto;
}
.nav-tabs .nav-link {
  border: 1px solid transparent;
  color: black;
  font-weight: 600;
}

.critic-review {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}

.author-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.author-profile-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
}

.author-name {
  margin: 0;
  font-weight: bold;
  color: orange;
  padding-right: 15px;
}
.review {
  padding-top: 20px;
}
.review-content {
  margin-bottom: 10px;
  font-size: 13px;
}

.review-date {
  margin-left: auto;
  margin-right: 0;
  font-size: 11px;
  color: blue;
}

.status-rating {
  text-align: center;
  padding-top: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}
.status {
  text-shadow: 1px 0px #17eaea;
  font-weight: bold;
  display: grid;
}
/* Progress Circle Animation */
.progress-circle {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  background-color: #eee;
  border-radius: 50%;
  overflow: hidden;
}

.progress-circle .progress-circle__background,
.progress-circle .progress-circle__progress {
  fill: none;
  stroke-width: 5;
  transition: stroke-dashoffset 0.3s;
}

.progress-circle .progress-circle__background {
  stroke: #bbb;
}

.progress-circle .progress-circle__progress {
  fill: none;
  stroke: #007bff;
  stroke-width: 10px;
  stroke-dasharray: 105 !important;
  stroke-dashoffset: 5 !important;
  transform-origin: center;
  transition: stroke-dashoffset 1s ease-out;
}

.progress-circle .rating {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: bold;
  text-shadow: 2px 0px 0px rgb(0 123 255);
}

.alternatives {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
}

.alternatives ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.alternatives li {
  margin-bottom: 5px;
}
.certification {
  font-weight: 700;
  color: #a1520e;
  padding: 0 5px 0;
  box-shadow: inset 0 0 0 2px #007bff;
  border-radius: 5px;
}
.status-media {
  box-shadow: 0 3px 0px 0px #007bff;
}
.badge {
  padding: 0.5em 0.5em;
}
.badge-secondary {
  margin: 3px;
  /* border: 1px solid #007bff; */
  color: #323232;
  background-color: transparent !important;
  box-shadow: 0 0 4px 0px #007bff;
}
p.source {
  margin-right: 15px;
}
.carousel-control-next-icon,
.carousel-control-prev-icon {
  border: 3px solid #00e1ffa3;
  border-radius: 50%;
  background-color: #00e1ffa3;
  width: 33px;
  height: 33px;
}
.critical-reviews {
  display: flex;
  align-items: center;
}
.btn-more {
  padding-left: 15px;
}
.rev-content {
  box-shadow: inset 0 0 182px 1px #0000ff3d;
  padding: 10px;
  border-radius: 16px;
}
#season-info {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
img.poster.tv {
  width: 100%;
}
.date-episode {
  font-size: 0.8rem;
  font-weight: 600;
  color: blue;
}
ul#episode-list {
  padding-left: 18px;
}

.numb-se-ep {
  box-shadow: 0px 2px 0px 0px #213d8f;
}

.downl-detail {
  margin: 20px 0;
}
#episode-list li {
  box-shadow: inset 0px -1px 0px 0px #80808047;
}
.imglogonet {
  width: 46px;
}
.span-lang {
  color: black;
}

/* TMDB STYLE END */
