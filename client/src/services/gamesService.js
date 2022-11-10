import api from "./api";

// MAIN API AXIOS GAMES METHODS:
// GET
function get() {
  return api.get("/api/games");
}

// POST - AddGames
function post(data) {
  console.log(data);
  const formData = prepareFormData(data);
  return api.post("/api/games", formData, formConfig);
}

const formConfig = {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
};

// Structuring the form data
function prepareFormData(data) {
  let formData = new FormData();

  // Append reconfigured mixed data to the new object
  formData.append("title", data.title);
  formData.append("classification", data.classification);
  formData.append("description", data.description);
  formData.append("status", data.status);
  formData.append("release_date", data.release_date);
  formData.append("rating", data.rating);
  formData.append("engine", data.engine);
  formData.append("developer", data.developer);
  formData.append("trailer", data.trailer);
  formData.append("createdBy", data.createdBy);
  formData.append("cover_image", data.cover_image);

  return formData;
}

const gamesService = {
  get,
  post,
};

export default gamesService;
