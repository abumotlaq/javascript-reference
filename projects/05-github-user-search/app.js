
const API_BASE_URL = "https://api.github.com";
const STORAGE_KEY = "javascript-reference-github-username";

const searchForm = document.querySelector("#searchForm");
const usernameInput = document.querySelector("#usernameInput");
const searchButton = document.querySelector("#searchButton");

const searchError = document.querySelector("#searchError");
const statusMessage = document.querySelector("#statusMessage");
const profileSection = document.querySelector("#profileSection");

const avatar = document.querySelector("#avatar");
const nameElement = document.querySelector("#name");
const usernameElement = document.querySelector("#username");
const profileLink = document.querySelector("#profileLink");
const bio = document.querySelector("#bio");

const locationElement = document.querySelector("#location");
const companyElement = document.querySelector("#company");
const blogElement = document.querySelector("#blog");

const publicReposElement = document.querySelector("#publicRepos");
const followersElement = document.querySelector("#followers");
const followingElement = document.querySelector("#following");
const publicGistsElement = document.querySelector("#publicGists");

const repositoryCount = document.querySelector("#repositoryCount");
const repositoryList = document.querySelector("#repositoryList");
const repositoryEmpty = document.querySelector("#repositoryEmpty");

let activeController = null;

const githubHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2026-03-10"
};

function loadSavedUsername() {
  try {
    return localStorage.getItem(STORAGE_KEY) || "";
  } catch (error) {
    console.error("Failed to load saved username:", error);
    return "";
  }
}

function saveUsername(username) {
  try {
    localStorage.setItem(STORAGE_KEY, username);
  } catch (error) {
    console.error("Failed to save username:", error);
  }
}

function showStatus(message) {
  statusMessage.textContent = message;
  statusMessage.hidden = false;
}

function hideStatus() {
  statusMessage.textContent = "";
  statusMessage.hidden = true;
}

function showError(message) {
  searchError.textContent = message;
  searchError.hidden = false;
}

function hideError() {
  searchError.textContent = "";
  searchError.hidden = true;
}

function setLoading(isLoading) {
  searchButton.disabled = isLoading;

  searchButton.textContent = isLoading
    ? "Loading..."
    : "Search";
}

async function fetchGitHub(url, signal) {
  const response = await fetch(url, {
    headers: githubHeaders,
    signal
  });

  if (response.status === 404) {
    throw new Error("GitHub user not found.");
  }

  if (response.status === 403) {
    throw new Error(
      "GitHub API rate limit reached. Try again later."
    );
  }

  if (!response.ok) {
    throw new Error(
      `GitHub API request failed with status ${response.status}.`
    );
  }

  return response.json();
}

async function getUser(username, signal) {
  return fetchGitHub(
    `${API_BASE_URL}/users/${encodeURIComponent(username)}`,
    signal
  );
}

async function getRepositories(username, signal) {
  const params = new URLSearchParams({
    sort: "updated",
    direction: "desc",
    per_page: "6",
    page: "1"
  });

  const url =
    `${API_BASE_URL}/users/` +
    `${encodeURIComponent(username)}/repos?${params}`;

  return fetchGitHub(url, signal);
}

async function loadUser(username) {
  if (activeController) {
    activeController.abort();
  }

  activeController = new AbortController();

  const { signal } = activeController;

  setLoading(true);
  hideError();
  showStatus("Loading GitHub profile...");

  try {
    const [user, repositories] = await Promise.all([
      getUser(username, signal),
      getRepositories(username, signal)
    ]);

    saveUsername(username);
    renderProfile(user);
    renderRepositories(repositories);

    profileSection.hidden = false;
    hideStatus();
  } catch (error) {
    if (error.name === "AbortError") {
      return;
    }

    profileSection.hidden = true;
    hideStatus();
    showError(error.message);

    console.error("GitHub request failed:", error);
  } finally {
    setLoading(false);
  }
}

function setOptionalText(element, value, fallback) {
  element.textContent = value || fallback;
}

function renderProfile(user) {
  avatar.src = user.avatar_url;
  avatar.alt = `${user.login} avatar`;

  nameElement.textContent =
    user.name || user.login;

  usernameElement.textContent =
    `@${user.login}`;

  usernameElement.href =
    user.html_url;

  profileLink.href =
    user.html_url;

  setOptionalText(
    bio,
    user.bio,
    "No public bio available."
  );

  setOptionalText(
    locationElement,
    user.location,
    "No public location"
  );

  setOptionalText(
    companyElement,
    user.company,
    "No public company"
  );

  if (user.blog) {
    blogElement.textContent = user.blog;
  } else {
    blogElement.textContent =
      "No public website";
  }

  publicReposElement.textContent =
    user.public_repos;

  followersElement.textContent =
    user.followers;

  followingElement.textContent =
    user.following;

  publicGistsElement.textContent =
    user.public_gists;
}

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  repositoryCount.textContent =
    `${repositories.length} displayed`;

  repositoryEmpty.hidden =
    repositories.length !== 0;

  if (repositories.length === 0) {
    return;
  }

  const fragment =
    document.createDocumentFragment();

  repositories.forEach((repository) => {
    const article =
      document.createElement("article");

    article.className = "repository-card";

    const header =
      document.createElement("div");

    header.className = "repository-header";

    const title =
      document.createElement("h4");

    title.className = "repository-name";

    const link =
      document.createElement("a");

    link.href =
      repository.html_url;

    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent =
      repository.name;

    title.appendChild(link);
    header.appendChild(title);

    const description =
      document.createElement("p");

    description.className =
      "repository-description";

    description.textContent =
      repository.description ||
      "No description available.";

    const meta =
      document.createElement("div");

    meta.className =
      "repository-meta";

    const language =
      document.createElement("span");

    language.textContent =
      repository.language ||
      "No language";

    const stars =
      document.createElement("span");

    stars.textContent =
      `${repository.stargazers_count} stars`;

    const forks =
      document.createElement("span");

    forks.textContent =
      `${repository.forks_count} forks`;

    meta.append(
      language,
      stars,
      forks
    );

    article.append(
      header,
      description,
      meta
    );

    fragment.appendChild(article);
  });

  repositoryList.appendChild(fragment);
}

searchForm.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    const username =
      usernameInput.value.trim();

    hideError();

    if (!username) {
      showError(
        "Please enter a GitHub username."
      );

      usernameInput.focus();
      return;
    }

    await loadUser(username);
  }
);

const savedUsername =
  loadSavedUsername();

if (savedUsername) {
  usernameInput.value =
    savedUsername;

  loadUser(savedUsername);
}