const { Prisma, PrismaClient } = require("@prisma/client");
const fs = require("fs");
const axios = require("axios");
// specify the path of the CSV file
const path = "./src/lib/db/data.csv";
async function main() {
  fs.createReadStream(path)
    // .pipe((data) => copnsole.log(data))
    .on("data", async (data) => {
      const file = data.toString();
      const rows = file.split("\n");
      const newData = [];
      let i = 0;
      for (const r of rows) {
        i++;
        // if (i >= 10) continue;

        const [
          startDate,
          endDate,
          origin,
          originHub,
          destinationHub,
          destination,
          load,
        ] = r.split("\t");

        try {
          const midMile = await (
            await fetch(
              `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originHub}&destinations=${destinationHub}&region=in&key=AIzaSyBwQ27PyhasAE4WkZxCR-gG5O8rDGkCGhA`
            )
          ).json();
          const lastMile = await (
            await fetch(
              `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${destinationHub}&destinations=${destination}&region=in&key=AIzaSyBwQ27PyhasAE4WkZxCR-gG5O8rDGkCGhA`
            )
          ).json();
          const distanceMid = midMile.rows[0].elements[0].distance.value / 1000;
          const distanceLast =
            lastMile.rows[0].elements[0].distance.value / 1000;
          const ttwPerTonne =
            0.063 * distanceMid * Number(load) + // TTW Mid Mile
            0.224 * distanceLast * Number(load); // TTW Last Mile / Frst Mile
          const wttPerTonne =
            0.019 * distanceLast * Number(load) +
            0.067 * distanceMid * Number(load);
          const transShipmentPerToone = 1.2 * load;
          const totalEmissionPerTonne =
            ttwPerTonne + wttPerTonne + transShipmentPerToone;

          const data = [
            startDate,
            endDate,
            origin,
            originHub,
            destinationHub,
            destination,
            load,
            0,
            distanceMid,
            distanceLast,
            distanceLast + distanceMid,
            ttwPerTonne,
            wttPerTonne,
            transShipmentPerToone,
            totalEmissionPerTonne,
          ];
        } catch (e) {
          console.log("Error");
        }
      }
    })
    .on("error", (error) => {
      console.error(error);
    })
    .on("end", () => {});
}
main();
