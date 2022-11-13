import api from './api';

// MAIN API AXIOS GAMES METHODS:
// GET
function get() {
  return api.get('/api/games');
}

// POST - AddGames
function post(data) {
  const formData = prepareFormData(data);
  return api.post('/api/games', formData, formConfig);
}

// PUT - EditGames
function put(id, data, uploadedfile) {
  const formData = prepareFormData(data, uploadedfile);
  return api.put('/api/games/' + id, formData, formConfig);
}

// DELETE - PROFILE (Contribution)
function del(id) {
  return api.delete('/api/games/' + id);
}

const formConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

// Structuring the form data
function prepareFormData(data, uploadedfile) {
  let formData = new FormData();

  // Append reconfigured mixed data to the new object
  formData.append('title', data.title);
  formData.append('classification', data.classification);
  formData.append('description', data.description);
  formData.append('status', data.status);
  formData.append('release_date', data.release_date);
  formData.append('rating', data.rating);
  formData.append('engine', data.engine);
  formData.append('developer', data.developer);
  formData.append('trailer', data.trailer);
  formData.append('createdBy', data.createdBy);
  formData.append('cover_image', data.cover_image);

  if (uploadedfile) {
    formData.append('uploadedFile', uploadedfile);
  }

  return formData;
}

// GET BY ID - GamesDetail
function getById(id) {
  return api.get('/api/games/' + id);
}

// Create uploaded file name from downloadURL
function getFileFromUrl(downloadURL) {
  const baseURL = `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_STORAGE_BUCKET_URL}/o/`;
  console.log(baseURL);

  // Remove baseURL from downloadURL
  let fileGlob = downloadURL.replace(baseURL, '');

  // Remove everything after "?"
  const indexOfEndPath = fileGlob.indexOf('?');
  fileGlob = fileGlob.substring(0, indexOfEndPath);

  // Return existing uploaded file glob
  console.log(`Generated File Glob: ${fileGlob}`);
  return fileGlob;
}

const gamesService = {
  get,
  post,
  getById,
  put,
  del,
  getFileFromUrl,
};

export default gamesService;
