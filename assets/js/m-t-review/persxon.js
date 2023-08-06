// Fungsi untuk menyembunyikan data person
function hideResults() {
  document.getElementById("results").style.display = "none";
}

      const API_KEY = "50479b124e0923c371395234e579d901";

      // Function to fetch name suggestions based on user input
      async function fetchNameSuggestions(query) {
        const url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${query}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          return data.results.map((person) => person.name);
        } catch (error) {
          console.error("Error fetching name suggestions: ", error);
        }
      }

      // Function to display name suggestions
      function displaySuggestions(suggestions) {
        const suggestionsContainer = document.getElementById("suggestions");
        suggestionsContainer.innerHTML = "";

        suggestions.forEach((name) => {
          const suggestionItem = document.createElement("div");
          suggestionItem.className = "suggestion-item";
          suggestionItem.textContent = name;
          suggestionItem.addEventListener("click", () => {
            document.getElementById("searchInput").value = name;
            suggestionsContainer.innerHTML = "";
            searchPerson();
          });

          suggestionsContainer.appendChild(suggestionItem);
        });
      }

      // Add event listener for input on search box
      const searchInput = document.getElementById("searchInput");
      searchInput.addEventListener("input", async () => {
        const query = searchInput.value;
        if (query.length > 2) {
          // Only fetch suggestions if query is at least 3 characters long
          const suggestions = await fetchNameSuggestions(query);
          displaySuggestions(suggestions);
        } else {
          document.getElementById("suggestions").innerHTML = "";
        }
      });

      // Function to search for a person
      async function searchPerson() {
        const searchInput = document.getElementById("searchInput").value;
        const url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${searchInput}`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const person = data.results[0];
            const personId = person.id;
            const personDetails = await getPersonDetails(personId);
            displayPersonInfo(person, personDetails);
            displayKnownFor(person);
          } else {
            // Clear the content if no results
            document.getElementById("results").style.display = "none";
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }

      // Function to get additional person details
      async function getPersonDetails(personId) {
        const url = `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching person details: ", error);
        }
      }

      // Function to display the person's COMBINED CREDIT for details
      // Deklarasi variabel global untuk menyimpan data kombinasi lengkap dan batas awal yang akan ditampilkan
let allCombinedCredits = [];
let initialLimit = 5;

function displayKnownFor(person) {
  const personId = person.id;
  const url = `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allCombinedCredits = data.cast; // Simpan semua data kombinasi ke variabel global
      showMoreCredits(); // Tampilkan 5 data pertama
    })
    .catch((error) => console.error("Error fetching combined credits: ", error));
}

// Function to show more combined credits
function showMoreCredits() {
  const combinedCreditsList = document.getElementById("combinedCreditsForList");
  combinedCreditsList.innerHTML = "";
  combinedCreditsList.classList.add("credits-list"); // Add class to the ul

  // Ambil 5 data pertama atau data yang masih tersedia jika kurang dari 5
  const creditsToShow = allCombinedCredits.slice(0, initialLimit);

  creditsToShow.forEach((credit) => {
    const title = credit.title || credit.name;
    const href =
      credit.media_type === "movie"
        ? "/search/label/Movie"
        : "/search/label/TV%20Show";

    const listItem = document.createElement("li");
    listItem.classList.add("credit-item");
    listItem.innerHTML = `
      <a href="${href}" target="_blank">
        <img
          src="${
            credit.poster_path
              ? "https://image.tmdb.org/t/p/w185/" + credit.poster_path
              : "https://cintakuaja68.github.io/assets/img/no-cover.png"
          }"
          alt="${title}"
          class="credit-poster"
        />
        <h3 class="credit-title">${title}</h3>
        <p class="credit-media-type">${credit.media_type.toUpperCase()}</p>
      </a>
    `;
    combinedCreditsList.appendChild(listItem);
  });

  // Tampilkan tombol "Show More" jika ada lebih banyak data yang belum ditampilkan
  if (initialLimit < allCombinedCredits.length) {
    const showMoreButton = document.createElement("button");
    showMoreButton.classList.add("show-more-button");
    showMoreButton.textContent = "Show more related";
    showMoreButton.addEventListener("click", toggleReadMore);
    combinedCreditsList.appendChild(showMoreButton);
  }
}

// Function to toggle "Show More" button and display more credits
function toggleReadMore() {
  initialLimit += 5; // Tambah batas tampilan dengan 5 data

  // Tampilkan data tambahan jika masih ada data yang tersedia
  if (initialLimit <= allCombinedCredits.length) {
    showMoreCredits();
  } else {
    // Jika tidak ada data tambahan yang tersedia
    initialLimit -= 5; // Set ulang batas tampilan ke jumlah awal (5 data)
    showMoreCredits(); // Tampilkan data awal saja
    const showMoreButton = document.querySelector(".show-more-button");
    showMoreButton.textContent = "Less More"; // Ubah teks tombol menjadi "Less More"
    showMoreButton.removeEventListener("click", toggleReadMore);
    showMoreButton.addEventListener("click", toggleLessMore);
  }
}

// Function to toggle "Less More" button and display less credits
function toggleLessMore() {
  initialLimit = 5; // Set ulang batas tampilan ke jumlah awal (5 data)
  showMoreCredits(); // Tampilkan data awal saja
  const showMoreButton = document.querySelector(".show-more-button");
  showMoreButton.textContent = "Show more related"; // Ubah teks tombol menjadi "Show More"
  showMoreButton.removeEventListener("click", toggleLessMore);
  showMoreButton.addEventListener("click", toggleReadMore);
}

      // Function to display person information
      function displayPersonInfo(person, personDetails) {
        const birthday = personDetails.birthday;
        const birthDate = new Date(birthday);
        const birthMonth = birthDate.toLocaleString("default", {
          month: "long",
        });
        const birthDay = birthDate.getDate();
        const birthYear = birthDate.getFullYear();
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;

        const deathday = personDetails.deathday;
        let deathInfo = "";
        if (deathday) {
          const deathDate = new Date(deathday);
          const deathMonth = deathDate.toLocaleString("default", {
            month: "long",
          });
          const deathDay = deathDate.getDate();
          const deathYear = deathDate.getFullYear();
          deathInfo = `Dead - ${deathMonth} ${deathDay}, ${deathYear}`;
        }

        document.getElementById("posterImg").src = person.profile_path
          ? `https://image.tmdb.org/t/p/w300/${person.profile_path}`
          : "https://cintakuaja68.github.io/assets/img/no-cover.png";
        document.getElementById("personName").innerText = person.name;
        document.getElementById("alsoKnownAs").innerText =
          personDetails.also_known_as.join(", ");
        document.getElementById(
          "birthday"
        ).innerText = `${birthMonth} ${birthDay}, ${birthYear} (age ${age})`;
        document.getElementById("deathday").innerText = deathInfo;
        document.getElementById("genre").innerText =
          person.known_for_department;
        document.getElementById("placeOfBirth").innerText =
          personDetails.place_of_birth;
        document.getElementById("gender").innerText =
          person.gender === 1 ? "Female" : "Male";
        document.getElementById("popularity").innerText = person.popularity;
        document.getElementById("biography").innerText =
          personDetails.biography;

        document.getElementById("results").style.display = "block";
      }

      // Add event listener for search button
      document
        .getElementById("searchButton")
        .addEventListener("click", searchPerson);

      // Function to close suggestions when clicked outside
      document.addEventListener("click", (event) => {
        const suggestionsContainer = document.getElementById("suggestions");
        const searchInput = document.getElementById("searchInput");
        if (
          !suggestionsContainer.contains(event.target) &&
          !searchInput.contains(event.target)
        ) {
          suggestionsContainer.innerHTML = "";
        }
      });

      // Fetch dan tampilkan daftar popular people saat halaman dimuat
      document.addEventListener("DOMContentLoaded", () => {
        fetchAndDisplayPopularPeople();
        fetchAndDisplayTrendingPeople(); // Tampilkan daftar trending people
      });

      // Function to fetch and display popular people
      async function fetchAndDisplayPopularPeople() {
        const url = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const popularPeople = data.results;
            displayPopularPeople(popularPeople);
          }
        } catch (error) {
          console.error("Error fetching popular people: ", error);
        }
      }

      // Function to display popular people
      function displayPopularPeople(popularPeople) {
        const popularPeopleList = document.getElementById("popularPeopleList");
        popularPeopleList.innerHTML = "";

        popularPeople.forEach((person) => {
          const li = document.createElement("li");
          li.className = "popular-person";
          li.style.listStyleType = "none";

          const img = document.createElement("img");
          img.className = "imgPopular"; // Tambahkan kelas imgPopular
          img.src = person.profile_path
            ? `https://image.tmdb.org/t/p/w200/${person.profile_path}`
            : "https://cintakuaja68.github.io/assets/img/no-cover.png";
          img.alt = person.name;
          li.appendChild(img);

          const name = document.createElement("p");
          name.className = "personName"; // Tambahkan kelas personName
          name.textContent = person.name;
          li.appendChild(name);

          popularPeopleList.appendChild(li);
        });
      }

      // Function to fetch and display trending people
      async function fetchAndDisplayTrendingPeople() {
        const url = `https://api.themoviedb.org/3/trending/person/week?api_key=${API_KEY}`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const trendingPeople = data.results;
            displayTrendingPeople(trendingPeople);
          }
        } catch (error) {
          console.error("Error fetching trending people: ", error);
        }
      }

      // Function to display trending people
      function displayTrendingPeople(trendingPeople) {
        const trendingPeopleList =
          document.getElementById("trendingPeopleList");
        trendingPeopleList.innerHTML = "";

        trendingPeople.forEach((person) => {
          const li = document.createElement("li");
          li.className = "trending-person";
          li.style.listStyleType = "none";

          const img = document.createElement("img");
          img.className = "imgPopular"; // Tambahkan kelas imgPopular
          img.src = person.profile_path
            ? `https://image.tmdb.org/t/p/w200/${person.profile_path}`
            : "https://cintakuaja68.github.io/assets/img/no-cover.png";
          img.alt = person.name;
          li.appendChild(img);

          const name = document.createElement("p");
          name.className = "personName"; // Tambahkan kelas personName
          name.textContent = person.name;
          li.appendChild(name);

          trendingPeopleList.appendChild(li);
        });
      }

      // OVERLAY VIEW DETAIL //
      // Function to create overlay with "View Detail" button
      function createOverlay(person) {
        const overlay = document.createElement("div");
        overlay.className = "overlay-details";

        const viewDetailBtn = document.createElement("button");
        viewDetailBtn.className = "btn btn-primary overlay-button";
        viewDetailBtn.textContent = "See details";
        viewDetailBtn.setAttribute("data-bs-toggle", "modal");
        viewDetailBtn.setAttribute("data-bs-target", "#personModal");
        viewDetailBtn.dataset.personId = person.id;

        overlay.appendChild(viewDetailBtn);
        return overlay;
      }

      // Function to display person detail
      async function displayPersonDetail(person) {
        const personDetails = await getPersonDetails(person.id);
        displayPersonInfo(person, personDetails);
        displayKnownFor(person);
      }

      function displayPopularPeople(popularPeople) {
        const popularPeopleList = document.getElementById("popularPeopleList");
        popularPeopleList.innerHTML = "";

        popularPeople.forEach((person) => {
          const li = document.createElement("li");
          li.className = "popular-person";
          li.style.listStyleType = "none";

          const img = document.createElement("img");
          img.className = "imgPopular";
          img.src = person.profile_path
            ? `https://image.tmdb.org/t/p/w200/${person.profile_path}`
            : "https://cintakuaja68.github.io/assets/img/no-cover.png";
          img.alt = person.name;

          const overlay = createOverlay(person);
          li.appendChild(img);
          li.appendChild(overlay);

          const name = document.createElement("p");
          name.className = "personName";
          name.textContent = person.name;
          li.appendChild(name);

          popularPeopleList.appendChild(li);
        });
      }

      // Function to display trending people
      function displayTrendingPeople(trendingPeople) {
        const trendingPeopleList =
          document.getElementById("trendingPeopleList");
        trendingPeopleList.innerHTML = "";

        trendingPeople.forEach((person) => {
          const li = document.createElement("li");
          li.className = "trending-person";
          li.style.listStyleType = "none";

          const img = document.createElement("img");
          img.className = "imgPopular";
          img.src = person.profile_path
            ? `https://image.tmdb.org/t/p/w200/${person.profile_path}`
            : "https://cintakuaja68.github.io/assets/img/no-cover.png";
          img.alt = person.name;

          const overlay = createOverlay(person);
          li.appendChild(img);
          li.appendChild(overlay);

          const name = document.createElement("p");
          name.className = "personName";
          name.textContent = person.name;
          li.appendChild(name);

          trendingPeopleList.appendChild(li);
        });
      }

      // Fungsi untuk mengambil data detail person dari API TMDB (MODAL)
      async function fetchPersonDetail(personId) {
        const apiUrl = `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching person detail:", error);
          return null;
        }
      }

      // Fungsi untuk mengambil data combined credits dari API TMDB
      async function fetchCombinedCredits(personId) {
        const apiUrl = `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${API_KEY}`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          return data.cast;
        } catch (error) {
          console.error("Error fetching combined credits:", error);
          return null;
        }
      }

      // Fungsi untuk menampilkan detail person di modal
      async function displayPersonDetailInModal(personId) {
        const personDetail = await fetchPersonDetail(personId);
        const combinedCredits = await fetchCombinedCredits(personId);

        if (personDetail && combinedCredits) {
          const modalBody = document.getElementById("modalBody");
          modalBody.innerHTML = "";

          // Buat elemen-elemen untuk menampilkan informasi
          const row = document.createElement("div");
          row.className = "row";

          const profileCol = document.createElement("div");
          profileCol.className = "col-md-2";
          const profileImage = document.createElement("img");
          profileImage.src = personDetail.profile_path
            ? `https://image.tmdb.org/t/p/w200/${personDetail.profile_path}`
            : "https://cintakuaja68.github.io/assets/img/no-cover.png";
          profileImage.alt = personDetail.name;
          profileImage.className = "modal-poster";
          profileCol.appendChild(profileImage);
          row.appendChild(profileCol);

          const personInfoCol = document.createElement("div");
          personInfoCol.className = "col-md-6 person-info";

          // Buat elemen tabel
          const table = document.createElement("table");
          table.className = "table table-hover table-sm";
          const tbody = document.createElement("tbody");

          // Baris Nama
          const namaRow = document.createElement("tr");
          const namaHeaderCell = document.createElement("th");
          namaHeaderCell.setAttribute("colspan", "3");
          const namaHeader = document.createElement("h2");
          namaHeader.className = "title-head";
          namaHeader.textContent = personDetail.name;

          // Tambahkan Deathday jika tersedia
          if (personDetail.deathday) {
            const deathdaySpan = document.createElement("span");
            deathdaySpan.textContent = ` (Dead)`;
            namaHeader.appendChild(deathdaySpan);
          }

          namaHeaderCell.appendChild(namaHeader);
          namaRow.appendChild(namaHeaderCell);
          tbody.appendChild(namaRow);

// Baris Tanggal Lahir
const birthday = personDetail.birthday;
function formatDateToReadable(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}
function calculateAge(birthDate) {
  const birthYear = new Date(birthDate).getFullYear();
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
}
const formattedBirthday = formatDateToReadable(birthday);
const age = calculateAge(birthday);

const birthdayRow = document.createElement("tr");
const birthdayHeaderCell = document.createElement("th");
birthdayHeaderCell.className = "detail-name";
birthdayHeaderCell.textContent = "Birthday";
const birthdayValueCell = document.createElement("td");
birthdayValueCell.className = "detail-isi";
birthdayValueCell.setAttribute("colspan", "2");
const birthdayValue = document.createElement("div");
birthdayValue.textContent = formattedBirthday + ` (age ${age})`;
birthdayValueCell.appendChild(birthdayValue);
birthdayRow.appendChild(birthdayHeaderCell);
birthdayRow.appendChild(birthdayValueCell);
tbody.appendChild(birthdayRow);

          // Baris Tempat Lahir
          const birthplaceRow = document.createElement("tr");
          const birthplaceHeaderCell = document.createElement("th");
          birthplaceHeaderCell.className = "detail-name";
          birthplaceHeaderCell.textContent = "Place of Birth";
          const birthplaceValueCell = document.createElement("td");
          birthplaceValueCell.className = "detail-isi";
          birthplaceValueCell.setAttribute("colspan", "2");
          const birthplaceValue = document.createElement("div");
          birthplaceValue.textContent = personDetail.place_of_birth;
          birthplaceValueCell.appendChild(birthplaceValue);
          birthplaceRow.appendChild(birthplaceHeaderCell);
          birthplaceRow.appendChild(birthplaceValueCell);
          tbody.appendChild(birthplaceRow);

          // Baris Jenis Kelamin
          const genderRow = document.createElement("tr");
          const genderHeaderCell = document.createElement("th");
          genderHeaderCell.className = "detail-name";
          genderHeaderCell.textContent = "Gender";
          const genderValueCell = document.createElement("td");
          genderValueCell.className = "detail-isi";
          genderValueCell.setAttribute("colspan", "2");
          const genderValue = document.createElement("div");
          genderValue.textContent =
            personDetail.gender === 1 ? "Female" : "Male ";
          genderValueCell.appendChild(genderValue);
          genderRow.appendChild(genderHeaderCell);
          genderRow.appendChild(genderValueCell);
          tbody.appendChild(genderRow);

          // Baris Departemen yang Dikenal
          const knownForDepartmentRow = document.createElement("tr");
          const knownForDepartmentHeaderCell = document.createElement("th");
          knownForDepartmentHeaderCell.className = "detail-name";
          knownForDepartmentHeaderCell.textContent = "Job";
          const knownForDepartmentValueCell = document.createElement("td");
          knownForDepartmentValueCell.className = "detail-isi";
          knownForDepartmentValueCell.setAttribute("colspan", "2");
          const knownForDepartmentValue = document.createElement("div");
          knownForDepartmentValue.textContent =
            personDetail.known_for_department;
          knownForDepartmentValueCell.appendChild(knownForDepartmentValue);
          knownForDepartmentRow.appendChild(knownForDepartmentHeaderCell);
          knownForDepartmentRow.appendChild(knownForDepartmentValueCell);
          tbody.appendChild(knownForDepartmentRow);

          // Baris Popularity
          const popularityRow = document.createElement("tr");
          const popularityHeaderCell = document.createElement("th");
          popularityHeaderCell.className = "detail-name";
          popularityHeaderCell.textContent = "Popularity";
          const popularityValueCell = document.createElement("td");
          popularityValueCell.className = "detail-isi";
          popularityValueCell.setAttribute("colspan", "2");
          const popularityValue = document.createElement("div");
          popularityValue.textContent = personDetail.popularity;
          popularityValueCell.appendChild(popularityValue);
          popularityRow.appendChild(popularityHeaderCell);
          popularityRow.appendChild(popularityValueCell);
          tbody.appendChild(popularityRow);

          // Tambahkan baris ke tabel
          table.appendChild(tbody);
          personInfoCol.appendChild(table);
          row.appendChild(personInfoCol);

          // Buat elemen untuk "Juga Dikenal Sebagai"
          const alsoKnownAsCol = document.createElement("div");
          alsoKnownAsCol.className = "col-md-4";
          const alsoKnownAsHeader = document.createElement("h2");
          alsoKnownAsHeader.className = "title-head";
          alsoKnownAsHeader.textContent = "Also Known As:";
          const alsoKnownAsList = document.createElement("p");
          alsoKnownAsList.className = "also-known-as-list";

          if (
            personDetail.also_known_as &&
            personDetail.also_known_as.length > 0
          ) {
            const alsoKnownAsText = personDetail.also_known_as.join(", ");
            alsoKnownAsList.textContent = alsoKnownAsText;
            alsoKnownAsCol.appendChild(alsoKnownAsHeader);
            alsoKnownAsCol.appendChild(alsoKnownAsList);
            row.appendChild(alsoKnownAsCol);
          }

          // Buat elemen untuk biografi
          const biographyCol = document.createElement("div");
          biographyCol.className = "col-md-12";

          const biographyHeader = document.createElement("h2");
          biographyHeader.className = "title-head";
          biographyHeader.textContent = "Biography:";

          const biographyText = document.createElement("p");
          biographyText.classList.add("biography-text"); // Adding class to <p> element

          const biographyReadMore = document.createElement("a");
          biographyReadMore.textContent = "Read More";
          biographyReadMore.href = "#";
          biographyReadMore.classList.add("read-more-link"); // Adding class to <a> element

          let isBiographyFull = false;

          biographyText.appendChild(biographyReadMore);

          function toggleBiography() {
            if (isBiographyFull) {
              biographyText.textContent =
                personDetail.biography.substring(0, 120) + "...";
              biographyReadMore.textContent = "Read More";
            } else {
              biographyText.textContent = personDetail.biography;
              biographyReadMore.textContent = "Less More";
            }
            isBiographyFull = !isBiographyFull;
          }

          biographyReadMore.addEventListener("click", toggleBiography);

          if (personDetail.biography.length <= 100) {
            biographyText.textContent = personDetail.biography;
          } else {
            biographyText.textContent =
              personDetail.biography.substring(0, 100) + "...";
          }

          biographyCol.appendChild(biographyHeader);
          biographyCol.appendChild(biographyText);
          row.appendChild(biographyCol);
          row.appendChild(biographyReadMore);

          // Buat elemen untuk combined credits
          const creditsCol = document.createElement("div");
          creditsCol.className = "col-md-12";

          const creditsHeader = document.createElement("h2");
          creditsHeader.className = "title-head";
          creditsHeader.textContent = "Related Movies/TV :";

          const creditsList = document.createElement("ul");
          creditsList.className = "credits-list";

          combinedCredits.forEach((credit) => {
            const creditItem = document.createElement("li");
            creditItem.className = "credit-item";

            // Tambahkan elemen <a> sebagai wadah untuk keseluruhan credit-item
            const creditLink = document.createElement("a");
            creditLink.href =
              credit.media_type === "movie"
                ? "/search/label/Movie"
                : "/search/label/TV%20Show";
            creditLink.target = "_blank"; // Menambahkan atribut target="_blank" agar tautan membuka halaman baru

            const poster = document.createElement("img");
            poster.className = "credit-poster";
            poster.src = credit.poster_path
              ? `https://image.tmdb.org/t/p/w200/${credit.poster_path}`
              : "https://cintakuaja68.github.io/assets/img/no-cover.png";
            poster.alt = credit.title || credit.original_name;

            const title = document.createElement("h3");
            title.className = "credit-title";
            title.textContent = credit.title || credit.original_name;

            const mediaType = document.createElement("p");
            mediaType.className = "credit-media-type";
            mediaType.textContent = `${credit.media_type}`;

            creditLink.appendChild(poster);
            creditLink.appendChild(title);
            creditLink.appendChild(mediaType);

            creditItem.appendChild(creditLink);
            creditsList.appendChild(creditItem);
          });

          creditsCol.appendChild(creditsHeader);
          creditsCol.appendChild(creditsList);
          row.appendChild(creditsCol);

          // Tambahkan elemen-elemen ke dalam modalBody
          modalBody.appendChild(row);
        }
      }

      // Event listener untuk membuka modal dan menampilkan informasi detail
      document
        .getElementById("personModal")
        .addEventListener("show.bs.modal", function (event) {
          const button = event.relatedTarget;
          const personId = button.dataset.personId;
          displayPersonDetailInModal(personId);
        });

      // Simulasi pemanggilan fungsi untuk menampilkan data awal
      const initialPersonId = "123"; // Ganti dengan ID yang sesuai
      displayPersonDetailInModal(initialPersonId);
