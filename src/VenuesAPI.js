const api = "https://api.foursquare.com/v2/venues/"

const apiParams = {
 areaLatLng: "42.880419,-8.545693",
 radius: "500",     //Meters
 intent: "browse",  //To find venues in a given area
 clientId: "3P4X2ESFH3NOOSCM1NAMXLBURGCKHLSWD3H3YHDDMEK4T4JC",
 clientSecret: "BQLAUTTC4OENGUL3WKB3MB3PPCDV0LXTXT20DVO53355KF5F",
 version: "20180626",
 categoryId: ["4d4b7105d754a06374d81259", //Food
              "4d4b7104d754a06370d81259", //Arts & Entertainment
              "4bf58dd8d48988d103951735", //Clothing Store
              "4d4b7105d754a06376d81259"  //Nightlife Spot
            ]
}

export const getAll = () =>
  fetch(`${api}/search?ll=${apiParams.areaLatLng}&radius=${apiParams.radius}&intent=${apiParams.intent}&client_id=${apiParams.clientId}&client_secret=${apiParams.clientSecret}&v=${apiParams.version}&categoryId=${apiParams.categoryId}`)
   .then(response => response.json())