import api from "./api";

// MAIN API AXIOS GAMES METHODS:
// GET
function get() {
  return api.get("/api/games");
}
// GET BY ID

// POST

// PUT

// DELETE

const gamesService = {
  get,
};

export default gamesService;
