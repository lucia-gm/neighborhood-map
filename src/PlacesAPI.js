const api = "https://api.foursquare.com/v2/venues"

export const defaultList = [
  {id: 0, name: 'Catedral de Santiago de Compostela', location: {lat: 42.880596, lng: -8.544641}, categories: [{ name: "Church", id: "4bf58dd8d48988d132941735"}]},
  {id: 1, name: 'Abastos 2.0', location: {lat: 42.879965, lng: -8.541556}, categories: [{ name: "Restaurant", id: "4bf58dd8d48988d1c4941735"}]},
  {id: 2, name: 'Parque da Alameda', location: {lat: 42.876943, lng: -8.547609}, categories: [{ name: "Park", id: "4bf58dd8d48988d163941735"}]},
  {id: 3, name: 'A Maceta', location: {lat: 42.881636, lng: -8.535520}, categories: [{ name: "Restaurant", id: "4bf58dd8d48988d1c4941735"}]},
  {id: 4, name: 'Casa Marcelo', location: {lat: 42.880705, lng: -8.546967}, categories: [{ name: "Restaurant", id: "4bf58dd8d48988d1c4941735"}]},
  {id: 5, name: 'Zara', location: {lat: 42.876240, lng: -8.544688}, categories: [{ name: "Clothing Store", id: "4bf58dd8d48988d108951735"}]},
  {id: 6, name: 'A Riquela', location: {lat: 42.880043, lng: -8.542223}, categories: [{ name: "Nightlife", id: "4bf58dd8d48988d116941735"}]},
  {id: 7, name: 'Momo Pub', location: {lat: 42.879730, lng: -8.540808}, categories: [{ name: "Nightlife", id: "4bf58dd8d48988d116941735"}]},
  {id: 8, name: 'Bodeguilla de San Roque', location: {lat: 42.883752, lng: -8.541923}, categories: [{ name: "Restaurant", id: "4bf58dd8d48988d1c4941735"}]},
  {id: 9, name: 'Hostal dos reis Católicos', location: {lat: 42.881449, lng: -8.545879}, categories: [{ name: "Hotel", id: "4bf58dd8d48988d1fa931735"}]}
]

export const categories = [
  { name: "Restaurant", id: "4bf58dd8d48988d1c4941735"},
  { name: "Church", id: "4bf58dd8d48988d132941735"},
  { name: "Clothing Store", id: "4bf58dd8d48988d108951735"},
  { name: "Hotel", id: "4bf58dd8d48988d1fa931735"},
  { name: "Nightlife", id: "4bf58dd8d48988d116941735"},
  { name: "Park", id: "4bf58dd8d48988d163941735"}
]

const apiCategoriesId = categories.map(category => category.id)

const apiParams = {
  categoryId: apiCategoriesId,  
  areaLatLng: "42.880419,-8.545693",
  radius: "500",     // Meters
  intent: "browse",  // To find venues in a given area
  clientId: "3P4X2ESFH3NOOSCM1NAMXLBURGCKHLSWD3H3YHDDMEK4T4JC",
  clientSecret: "BQLAUTTC4OENGUL3WKB3MB3PPCDV0LXTXT20DVO53355KF5F",
  version: "20180626",
  limit: "30"
}

// Get the list of venues
export const getAll = () =>
  fetch(`${api}/search?ll=${apiParams.areaLatLng}&radius=${apiParams.radius}&intent=${apiParams.intent}&client_id=${apiParams.clientId}&client_secret=${apiParams.clientSecret}&v=${apiParams.version}&categoryId=${apiParams.categoryId}&limit=${apiParams.limit}`)
   .then(response => response.json())
   .then(data => data.response)

// Get photo of the venue
export const getPhoto = (venue) =>
  fetch(`${api}/${venue}/photos?client_id=${apiParams.clientId}&client_secret=${apiParams.clientSecret}&v=${apiParams.version}&limit=1`)
    .then(response => response.json())
    .then(data => data.response.photos) 

