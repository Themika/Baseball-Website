import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector(".search-bar");
  const searchInput = document.getElementById("searchInput");
  const container = document.getElementById("container");
  const readMoreButton = document.getElementById("readMoreButton");

  let loadedCards = 6; // Initial number of cards loaded

  async function loadMoreCards() {
    let result; // Declare the variable outside the try block

    const acronym = searchInput.value.trim().toUpperCase();

    const url = `https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBTeamRoster?teamAbv=${acronym}&getStats=true`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '21c98ce353msh2e77624f518ce0bp1fb9f3jsn84b6d813ebd7',
        'X-RapidAPI-Host': 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      result = await response.json(); // Assign the result inside the try block
      console.log(result);

      const newCards = result.body.roster.slice(loadedCards, loadedCards + 6).map(player => `
        <div class="card-grid">
          <div class="card card-shadow">
            <div class="card-header">${player.longName}</div>
            <div class="card-header card-image">
              <img src="${player.espnHeadshot}" alt="">
            </div>
            <div class="card-body">
              <h3>Jersey Number: ${player.jerseyNum}</h3>
              <h3>Bat: ${player.bat}</h3>
              <h3>Height: ${player.height}</h3>
              <h3>Weight: ${player.weight}\n</h3>
              <h3>Team: ${player.team}\n</h3>
              <h3>Birthday: ${player.bDay}</h3>
            </div>
            <div class="card-footer">
              <button class="btn"><a href="${player.mlbLink}">Read More</a></button>
            </div>
          </div>
        </div>
      `).join('');

      container.innerHTML += newCards;
      loadedCards += 6;

      // Move the "Read More" button to the bottom of the screen
      readMoreButton.classList.add('fixed');

    } catch (error) {
      console.error(error);
    }
  }

  readMoreButton.addEventListener('click', loadMoreCards);

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loadedCards = 6; // Reset loaded cards when performing a new search

    let result; // Declare the variable outside the try block

    const acronym = searchInput.value.trim().toUpperCase();

    const url = `https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBTeamRoster?teamAbv=${acronym}&getStats=true`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '21c98ce353msh2e77624f518ce0bp1fb9f3jsn84b6d813ebd7',
        'X-RapidAPI-Host': 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      result = await response.json(); // Assign the result inside the try block
      console.log(result);

      // Clear previous search results
      container.innerHTML = "";

      const generateCards = result.body.roster.slice(0, loadedCards).map(player => `
        <div class="card-grid">
          <div class="card card-shadow">
            <div class="card-header">${player.longName}</div>
            <div class="card-header card-image">
              <img src="${player.espnHeadshot}" alt="">
            </div>
            <div class="card-body">
              <h3>Jersey Number: ${player.jerseyNum}</h3>
              <h3>Bat: ${player.bat}</h3>
              <h3>Height: ${player.height}</h3>
              <h3>Weight: ${player.weight}\n</h3>
              <h3>Team: ${player.team}\n</h3>
              <h3>Birthday: ${player.bDay}</h3>
            </div>
            <div class="card-footer">
              <button class="btn"><a href="${player.mlbLink}">Read More</a></button>
            </div>
          </div>
        </div>
      `).join('');

      container.innerHTML += generateCards;

      // Move the "Read More" button to the bottom of the screen
      readMoreButton.classList.add('fixed');

    } catch (error) {
      console.error(error);
    }
  });
});

const url = `https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBNews?topNews=true&recentNews=true&maxItems=10`;
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '21c98ce353msh2e77624f518ce0bp1fb9f3jsn84b6d813ebd7',
    'X-RapidAPI-Host': 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com'
  }
};

try {
  const response = await fetch(url, options);
  const result = await response.json();
  console.log(result);

  // Container for all news cards
  const newsCardGrid = document.createElement("div");
  newsCardGrid.classList.add("news-card-grid");

  for (let i = 0; i < 10; i++) {
    const newsCard = `
      <div class="news-card">
        <div class="nes-card-header">${result.body[i].title}</div>
        <div class="news-card-footer">
          <button class="news-button"><a href="${result.body[i].link}">Details</a></button>
        </div>
      </div>
    `;
    // Append each news card to the newsCardGrid
    newsCardGrid.innerHTML += newsCard;
  }

  // Append the newsCardGrid to the element with id "body-card"
  document.getElementById("body-card").appendChild(newsCardGrid);

} catch (error) {
  console.error(error);
}
