const { Prisma, PrismaClient } = require("@prisma/client");
const fs = require("fs");
const axios = require("axios");
// specify the path of the CSV file
const path = "./src/lib/db/data.csv";
const api = new axios.Axios();
const prisma = new PrismaClient();
async function main() {
  await prisma.$connect();
  const emissions = await prisma.roadVehicle.findMany();
  fs.createReadStream(path)
    // .pipe((data) => copnsole.log(data))
    .on("data", async (data) => {
      const file = data.toString();
      const rows = file.split("\n");
      const newData = [];
      let i = 0;
      for (const r of rows) {
        i++;
        if (i === 1) continue;

        const [
          startDate,
          endDate,
          origin,
          destination,
          vehicle,
          fuel,
          trips,
          rest,
        ] = r.split(",");
        const emission = emissions.find(
          (e) => e.type === vehicle && e.fuel === "Diesel"
        );
        const apiData = await (
          await fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=AIzaSyBwQ27PyhasAE4WkZxCR-gG5O8rDGkCGhA`
          )
        ).json();
        const distance = apiData.rows[0].elements[0].distance.value / 1000;

        const ttwPerTonne = emission.ttw * distance * Number(trips);
        const wttPerTonne = emission.wtt * distance * Number(trips);
        const totalEmissionPerTonne = ttwPerTonne + wttPerTonne;

        const data = [
          startDate,
          endDate,
          origin,
          destination,
          vehicle,
          fuel,
          trips,
          distance,
          ttwPerTonne,
          wttPerTonne,
          totalEmissionPerTonne,
        ];
        console.log(data.join(","));
        // newData.push(data);
      }
      //   console.log(newData);
      //   let csvContent =
      //     // "data:text/csv;charset=utf-8," +
      //     newData.map((e) => e.join(",")).join("\n");
      //   console.log(csvContent);
    })
    .on("error", (error) => {
      console.error(error);
    })
    .on("end", () => {
      console.log("done");
    });
}
main();
