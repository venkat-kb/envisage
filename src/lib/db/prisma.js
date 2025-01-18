const { object } = require("zod");

const prismaObj = require("@prisma/client").PrismaClient;
const prisma = new prismaObj();
const path = "/root/documents/work/iimb/temt-v2/src/lib/db/airports.csv";
// const fs = require("node:fs");
async function main() {
  //   const airports = (
  //     await prisma.airport.findMany({
  //       select: {
  //         iata: true,
  //         name: true,
  //       },
  //     })
  //   ).map((item) => `${item.iata} - ${item.name}`);
  //   console.log(airports.join("\n"));
  //   fs.writeFile(path, airports.join("\n"), (err) => console.log(err));
  console.log(
    (
      await prisma.coastalDistances.findMany({
        select: {
          origin: true,
        },
        distinct: ["origin"],
      })
    )
      .map((item) => item.origin)
      .join("\n")
  );
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
