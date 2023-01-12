
$(document).foundation();

const creds = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'qBFgx-BuuVc5NkZTKQCBYzhaYm3CAgBfniTZy0Um3DpdKg7z2SBb0GFkD_oh_zUI-4Zi8PdOiFZCwCHLw61efLuFZFmvLjFk8K6wouulsUlxuCgjU8yi6L2HzLu8Y3Yx'
  }
};

const input = $(document).search

fetch('https://api.yelp.com/v3/businesses/search?location=' + input + '&term=restaurants&radius=40000&attributes=&sort_by=best_match&limit=20', creds)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));