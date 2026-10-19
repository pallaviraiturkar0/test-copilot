"use strict";

(() => {
  const { projects, filterProjects, toggleSaved } = window.Launchpad;
  const state = { query: "", category: "all", savedOnly: false, savedIds: new Set() };
  const grid = document.querySelector("#project-grid");
  const search = document.querySelector("#search");
  const filters = document.querySelectorAll("[data-category]");
  const savedFilter = document.querySelector("#saved-filter");
  const savedCount = document.querySelector("#saved-count");
  const status = document.querySelector("#results-status");
  const emptyState = document.querySelector("#empty-state");

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function createCard(project) {
    const card = createElement("article", "project-card");
    const art = createElement("div", `card-art ${project.color}`);
    art.setAttribute("aria-hidden", "true");
    art.append(createElement("span", "card-symbol", project.symbol));
    const body = createElement("div", "card-body");
    const bottom = createElement("div", "card-bottom");
    const button = createElement("button", "save-button");
    button.type = "button";
    button.dataset.projectId = project.id;
    updateSaveButton(button, project);
    bottom.append(createElement("span", "card-duration", project.duration), button);
    body.append(
      createElement("p", "card-category", project.category),
      createElement("h3", "", project.title),
      createElement("p", "card-description", project.description),
      bottom,
    );
    card.append(art, body);
    return card;
  }

  function updateSaveButton(button, project) {
    const saved = state.savedIds.has(project.id);
    button.textContent = saved ? "Saved" : "Save idea";
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute("aria-label", `${saved ? "Unsave" : "Save"} ${project.title}`);
  }

  function render() {
    const visibleProjects = filterProjects(projects, state);
    grid.replaceChildren(...visibleProjects.map(createCard));
    emptyState.hidden = visibleProjects.length !== 0;
    status.textContent = `${visibleProjects.length} ${visibleProjects.length === 1 ? "idea" : "ideas"} to explore`;
    savedCount.textContent = state.savedIds.size;
    savedFilter.setAttribute("aria-pressed", String(state.savedOnly));
    filters.forEach((button) => {
      const active = button.dataset.category === state.category;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  search.addEventListener("input", () => {
    state.query = search.value;
    render();
  });

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      render();
    });
  });

  savedFilter.addEventListener("click", () => {
    state.savedOnly = !state.savedOnly;
    render();
  });

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-project-id]");
    if (!button) return;
    const project = projects.find((item) => item.id === button.dataset.projectId);
    toggleSaved(state.savedIds, project.id);
    if (state.savedOnly) {
      const index = [...grid.querySelectorAll(".save-button")].indexOf(button);
      render();
      const remainingButtons = grid.querySelectorAll(".save-button");
      const nextFocus = remainingButtons[Math.min(index, remainingButtons.length - 1)];
      (nextFocus || document.querySelector("#reset-filters")).focus();
    } else {
      updateSaveButton(button, project);
      savedCount.textContent = state.savedIds.size;
    }
    const count = filterProjects(projects, state).length;
    status.textContent = `${count} ${count === 1 ? "idea" : "ideas"} to explore. ${project.title} ${state.savedIds.has(project.id) ? "saved" : "removed from saved ideas"}.`;
  });

  document.querySelector("#reset-filters").addEventListener("click", () => {
    state.query = "";
    state.category = "all";
    state.savedOnly = false;
    search.value = "";
    render();
    search.focus();
  });

  render();
})();
