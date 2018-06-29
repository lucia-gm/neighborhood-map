const api = "https://api.foursquare.com/v2/venues"

export const categories = [
  {"Restaurant": "4bf58dd8d48988d1c4941735"},
  {"Church": "4bf58dd8d48988d132941735"},
  {"Clothing Store": "4bf58dd8d48988d108951735"},
  {"Hotel": "4bf58dd8d48988d1fa931735"},
  {"Nightlife": "4bf58dd8d48988d116941735"},
  {"Park": "4bf58dd8d48988d163941735"}
]

const categoriesId = categories.map(category => Object.values(category))

const apiParams = {
 areaLatLng: "42.880419,-8.545693",
 radius: "500",     //Meters
 intent: "browse",  //To find venues in a given area
 clientId: "3P4X2ESFH3NOOSCM1NAMXLBURGCKHLSWD3H3YHDDMEK4T4JC",
 clientSecret: "BQLAUTTC4OENGUL3WKB3MB3PPCDV0LXTXT20DVO53355KF5F",
 version: "20180626",
 categoryId: categoriesId
}

export const getAll = () =>
  fetch(`${api}/search?ll=${apiParams.areaLatLng}&radius=${apiParams.radius}&intent=${apiParams.intent}&client_id=${apiParams.clientId}&client_secret=${apiParams.clientSecret}&v=${apiParams.version}&categoryId=${apiParams.categoryId}`)
   .then(response => response.json())

export const getPhoto = (venue) =>
  fetch(`${api}/${venue}/photos?client_id=${apiParams.clientId}&client_secret=${apiParams.clientSecret}&v=${apiParams.version}&limit=1`)
    .then(response => response.json())
    .then(data => data.response.photos) //To get photo details

