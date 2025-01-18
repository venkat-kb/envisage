const addresses = [
  "Cochin Port",
  "Ennore Port",
  "Haldia Dock Complex",
  "Kolkata Port",
  "Kandla Port",
  "New Mangalore Port",
  "Mumbai Port",
  "Jawaharlal Nehru Port",
  "V.O. Chidambaranar Port",
  "Chennai Port",
  "Azheekkal Port",
  "Belekeri Port",
  "Kannur Port",
  "Dahej Port",
  "Jafrabad Port",
  "Kasaragod Port",
  "Neendakara Port",
  "Ponnani Port",
  "Thalassery Port",
  "Beypore Port",
  "Gangavaram Port",
  "Kakinada Port",
  "Navlakhi Port",
  "Sikka Port",

  // "Paradip Port",
  // "Visakhapatnam Port",
  // "Bedi Port",
  // "Pindhara Port",
  // "Hazira Port",
  // "Mormugao Port",
];
const array = [];
const axios = new (require("axios").Axios)();
async function main() {
  // console.log(addresses.length);
  // console.log(
  //   await (
  //     await fetch(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${"Mormugao Port"}&key=AIzaSyBwQ27PyhasAE4WkZxCR-gG5O8rDGkCGhA`
  //     )
  //   ).json()
  // );
  for (const address of addresses) {
    const data = await (
      await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBwQ27PyhasAE4WkZxCR-gG5O8rDGkCGhA`
      )
    ).json();
    console.log(address);
    array.push({ origin: address, ...data.results[0].geometry.location });
  }
}

main().then(() => console.log(array));
