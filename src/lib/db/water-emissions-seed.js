const { Prisma, PrismaClient } = require("@prisma/client");
const fs = require("fs");
const axios = require("axios");
// specify the path of the CSV file
const path = "./src/lib/db/water.csv";
const api = new axios.Axios();
const prisma = new PrismaClient();
async function main() {
  await prisma.$connect();
  await prisma.waterEmission.deleteMany();
  fs.createReadStream(path).on("data", async (data) => {
    const file = data.toString();
    const rows = file.split("\n");
    let i = 0;
    for (const r of rows) {
      console.log(++i);
      const [name, size, ttw] = r.split(",");
      const wtt = Number(ttw) / 5;
      await prisma.waterEmission.create({
        data: { name, size, ttw: Number(ttw), wtt },
      });
    }
  });

  // const coastalDistances = await prisma.coastalDistances.findMany();
  // const places = Array.from(new Set(coastalDistances.map((d) => d.origin)));
  // console.log(places);
}

main()
  .catch((e) => console.log(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
