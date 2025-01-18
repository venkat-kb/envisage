const prismaObj = require("@prisma/client").PrismaClient;
const prisma = new prismaObj();

async function main() {
  await prisma.$connect();
  // await prisma.roadVehicle.deleteMany();
  await prisma.roadVehicle.createMany({
    data: [
      {
        type: "Light Commercial Vehicles | GVW < 3.5 MT | Payload Capacity 0.5 to 2 MT",
        fuel: "Diesel",
        ttw: 0.179,
        wtt: 0.053,
        capacity: "2 MT",
      },
      {
        type: "Light Commercial Vehicles | GVW < 3.5 MT | Payload Capacity 0.5 to 2 MT",
        fuel: "Petrol",
        ttw: 0.156,
        wtt: 0.051,
        capacity: "2 MT",
      },
      {
        type: "Light Commercial Vehicles | GVW < 3.5 MT | Payload Capacity 0.5 to 2 MT",
        fuel: "CNG",
        ttw: 0.181,
        wtt: 0.075,
        capacity: "2 MT",
      },
      {
        type: "Small Commercial Vehicles - Rigid Trucks | GVW 3 to 5 MT | Payload Capacity 2 to 3.5 MT",
        fuel: "Diesel",
        ttw: 0.138,
        wtt: 0.041,
        capacity: "3.5 MT",
      },
      {
        type: "Intermediate Commercial Vehicles - Rigid Trucks | GVW 5 to 12 MT | Payload Capacity 3.5 to 8 MT",
        fuel: "Diesel",
        ttw: 0.089,
        wtt: 0.027,
        capacity: "8 MT",
      },
      {
        type: "Intermediate Commercial Vehicles - Rigid Trucks | GVW 5 to 12 MT | Payload Capacity 3.5 to 8 MT",
        fuel: "CNG",
        ttw: 0.083,
        wtt: 0.034,
        capacity: "8 MT",
      },
      {
        type: "Medium Commercial Vehicles - Rigid Trucks | GVW 12 to 20 MT | Payload Capacity 8 to 12 MT",
        fuel: "Diesel",
        ttw: 0.063,
        wtt: 0.019,
        capacity: "12 MT",
      },
      {
        type: "Medium Commercial Vehicles - Rigid Trucks | GVW 12 to 20 MT | Payload Capacity 8 to 12 MT",
        fuel: "CNG",
        ttw: 0.074,
        wtt: 0.031,
        capacity: "12 MT",
      },
      {
        type: "Heavy Commercial Vehicles - Rigid Trucks | GVW 20 to 30 MT | Payload Capacity 12 to 20 MT",
        fuel: "Diesel",
        ttw: 0.077,
        wtt: 0.023,
        capacity: "20 MT",
      },
      {
        type: "Ultra Heavy Commercial Vehicles - Rigid Trucks | GVW 30 to 50 MT | Payload Capacity 20 to 40 MT",
        fuel: "Diesel",
        ttw: 0.048,
        wtt: 0.014,
        capacity: "40 MT",
      },
      {
        type: "Tractor Trailer Commercial Vehicles - Trailers | GVW 30 to 60 MT | Payload Capacity 20 to 50 MT",
        fuel: "Diesel",
        ttw: 0.043,
        wtt: 0.013,
        capacity: "50 MT",
      },
    ],
  });
}
main()
  .then(() => {
    console.log("seeded");
    prisma.$disconnect();
  })
  .catch((e) => console.error(e));
