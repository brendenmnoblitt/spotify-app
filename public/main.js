CLIENT_ID = "ab5c52b6285a45638647911ec91e9e54";
CLIENT_SECRET = "632235f4d25346d6a551d12e500ba70a";

function fetchSpotifyToken() {
  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
  })
    .then((response) => response.json())
    .then((data) => data.access_token)
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

async function handleSearch(event) {
  event.preventDefault();
  const searchQuery = document.getElementById("searchInput").value;

  try {
    const spotifyToken = await fetchSpotifyToken();
    searchTracks(searchQuery, spotifyToken);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function searchTracks(query, spotifyToken) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
        },
      }
    );

    const data = await response.json();
    const tracks = data.tracks.items;

    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";

    for (let track of tracks) {
      const image = track.album.images[0].url;
      const title = track.name;
      const album = track.album.name;
      const albumReleaseDate = track.album.release_date;
      const trackUrl = track.external_urls.spotify;

      const trackElement = document.createElement("div");
      trackElement.classList.add("track");
      resultsContainer.appendChild(trackElement);

      const trackUrlElement = document.createElement("a");
      trackUrlElement.href = trackUrl;
      trackUrlElement.classList.add("track-url");
      trackUrlElement.target = "_blank";
      trackElement.appendChild(trackUrlElement);

      const imageElement = document.createElement("img");
      imageElement.src = image;
      imageElement.classList.add("track-image");
      trackUrlElement.appendChild(imageElement);

      const titleLabelElement = document.createElement("p");
      titleLabelElement.textContent = "Title";
      titleLabelElement.classList.add("track-title-label");
      trackElement.appendChild(titleLabelElement);

      const titleElement = document.createElement("p");
      titleElement.textContent = title;
      titleElement.classList.add("track-title");
      trackElement.appendChild(titleElement);

      const albumLabelElement = document.createElement("p");
      albumLabelElement.textContent = "Album";
      albumLabelElement.classList.add("track-album-label");
      trackElement.appendChild(albumLabelElement);

      const albumElement = document.createElement("p");
      albumElement.textContent = album;
      albumElement.classList.add("track-album");
      trackElement.appendChild(albumElement);

      const albumReleaseDateLabelElement = document.createElement("p");
      albumReleaseDateLabelElement.textContent = "Release Date";
      albumReleaseDateLabelElement.classList.add("track-release-date-label");
      trackElement.appendChild(albumReleaseDateLabelElement);

      const albumReleaseDateElement = document.createElement("p");
      albumReleaseDateElement.textContent = albumReleaseDate;
      albumReleaseDateElement.classList.add("track-release-date");
      trackElement.appendChild(albumReleaseDateElement);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
