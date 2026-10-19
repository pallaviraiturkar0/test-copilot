"use strict";

window.Launchpad.filterProjects = function (projects, { query, category, savedOnly, savedIds }) {
  const search = query.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesCategory = category === "all" || project.category === category;
    const matchesSearch = `${project.title} ${project.description} ${project.category}`.toLowerCase().includes(search);
    return matchesCategory && matchesSearch && (!savedOnly || savedIds.has(project.id));
  });
};

window.Launchpad.toggleSaved = function (savedIds, projectId) {
  if (savedIds.has(projectId)) {
    savedIds.delete(projectId);
  } else {
    savedIds.add(projectId);
  }
};
