// TEST SCRIPT PERSON

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

// Function to display person information
function displayPersonInfo(person, personDetails) {
  const birthday = personDetails.birthday;
  const birthDate = new Date(birthday);
  const birthMonth = birthDate.toLocaleString("default", { month: "long" });
  const birthDay = birthDate.getDate();
  const birthYear = birthDate.getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  const deathday = personDetails.deathday;
  let deathInfo = "";
  if (deathday) {
    const deathDate = new Date(deathday);
    const deathMonth = deathDate.toLocaleString("default", { month: "long" });
    const deathDay = deathDate.getDate();
    const deathYear = deathDate.getFullYear();
    deathInfo = ` - ${deathMonth} ${deathDay}, ${deathYear}`;
  }

  document.getElementById("posterImg").src = person.profile_path
    ? `https://image.tmdb.org/t/p/w300/${person.profile_path}`
    : "https://cintakuaja68.github.io/assets/img/no-cover.png";
  document.getElementById("personName").innerText = person.name;
  document.getElementById("alsoKnownAs").innerText =
    personDetails.also_known_as.join(", ");
  document.getElementById(
    "birthday"
  ).innerText = `${birthMonth} ${birthDay}, ${birthYear} (${age} years old)`;
  document.getElementById("deathday").innerText = deathInfo;
  document.getElementById("genre").innerText = person.known_for_department;
  document.getElementById("placeOfBirth").innerText =
    personDetails.place_of_birth;
  document.getElementById("gender").innerText =
    person.gender === 1 ? "Female" : "Male";
  document.getElementById("popularity").innerText = person.popularity;
  document.getElementById("biography").innerText = personDetails.biography;

  document.getElementById("results").style.display = "block";
}

function displayKnownFor(person) {
  const knownForList = document.getElementById("knownForList");
  knownForList.innerHTML = "";

  person.known_for.forEach((item) => {
    const li = document.createElement("li");
    li.className = "known-for-item";

    const posterImg = document.createElement("img");
    posterImg.src = item.poster_path
      ? `https://image.tmdb.org/t/p/w200/${item.poster_path}`
      : "https://cintakuaja68.github.io/assets/img/no-cover.png";
    posterImg.alt = item.title || item.name;

    const title = document.createElement("div");
    title.textContent = item.title || item.name;
    title.classList.add("titlePosterKnown");

    li.appendChild(posterImg);
    li.appendChild(title);
    knownForList.appendChild(li);
  });
}

// Add event listener for search button
document.getElementById("searchButton").addEventListener("click", searchPerson);

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
  const trendingPeopleList = document.getElementById("trendingPeopleList");
  trendingPeopleList.innerHTML = "";

  trendingPeople.forEach((person) => {
    const li = document.createElement("li");
    li.className = "trending-person";

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
