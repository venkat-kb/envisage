function main() {
  const originLoc = {
    lat: 28.5562,
    lng: 77.1,
  };

  const destinationLoc = {
    lat: 19.0896,
    lng: 72.8656,
  };

  if (!originLoc || !destinationLoc) {
    return 0;
  }

  const dLat = ((destinationLoc.lat - originLoc.lat) * Math.PI) / 180.0;
  const dLon = ((destinationLoc.lng - originLoc.lng) * Math.PI) / 180.0;

  // convert to radians
  originLoc.lat = (originLoc.lat * Math.PI) / 180.0;
  destinationLoc.lat = (destinationLoc.lat * Math.PI) / 180.0;

  // apply formulae
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) *
      Math.cos(originLoc.lat) *
      Math.cos(destinationLoc.lat);
  const rad = 6371;
  const c = 2 * Math.asin(Math.sqrt(a));
  console.log(rad * c);
}
main();
