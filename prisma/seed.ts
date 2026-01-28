import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const dbUrl = process.env.DATABASE_URL ?? "";
const parsed = new URL(dbUrl);
const useSsl = parsed.searchParams.get("sslmode") !== "disable";

const adapter = new PrismaPg({
  connectionString: dbUrl,
  ssl: useSsl ? { rejectUnauthorized: false } : false,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clean existing data
  await prisma.roomType.deleteMany();
  await prisma.unit.deleteMany();

  // === UNIDADE AUTÔNOMA ===
  const autonoma = await prisma.unit.create({
    data: {
      name: "Unidade Autônoma",
      slug: "autonoma",
      description:
        "Unidade totalmente autônoma, sem atendimento presencial e sem café da manhã. A entrada no prédio é feita por reconhecimento facial e o acesso ao quarto por senha numérica. Ideal para quem busca praticidade e independência.",
      hasBreakfast: false,
      hasInPersonService: false,
      serviceHours: null,
      entryMethod: "Reconhecimento facial + senha numérica",
      commonAreas: [
        "Freezer com bebidas",
        "Micro-ondas",
        "Mesa de alimentação",
        "Descartáveis disponíveis",
        "Hall de recepção",
      ],
      commonAreaPhotos: [
        "/rooms/area-comum-autonomo/IMG_8621.jpg",
        "/rooms/area-comum-autonomo/IMG_8624.jpg",
        "/rooms/area-comum-autonomo/IMG_8625.jpg",
        "/rooms/area-comum-autonomo/IMG_8626.jpg",
        "/rooms/area-comum-autonomo/IMG_8654.jpg",
        "/rooms/area-comum-autonomo/IMG_8655.jpg",
      ],
    },
  });

  // === UNIDADE FLAT ===
  const flat = await prisma.unit.create({
    data: {
      name: "Unidade Flat",
      slug: "flat",
      description:
        "Unidade com atendimento presencial das 6h às 18h e suporte remoto 24h. Café da manhã incluso na diária. Oferece quartos com e sem cozinha, ideal para estadias mais longas ou quem busca mais conforto.",
      hasBreakfast: true,
      hasInPersonService: true,
      serviceHours: "6h às 18h (presencial) / 24h (remoto)",
      entryMethod: null,
      commonAreas: [
        "Freezers com bebidas e congelados",
        "Snacks à venda",
        "Micro-ondas",
        "Mesa de alimentação",
        "Hall de recepção com poltronas e puffs",
      ],
      commonAreaPhotos: ["/rooms/area-comum/IMG_8617.jpg"],
    },
  });

  // === QUARTOS UNIDADE AUTÔNOMA ===
  const autonomaAmenities = [
    "TV",
    "Ar-condicionado",
    "Ventilador de teto",
    "Mesa com cadeira",
    "Banheiro privativo",
  ];

  await prisma.roomType.createMany({
    data: [
      {
        unitId: autonoma.id,
        name: "Casal Autônomo",
        slug: "casal-autonomo",
        description:
          "Quarto aconchegante com uma cama de casal, ideal para casais ou viajantes individuais que preferem mais espaço. Equipado com TV, ar-condicionado, ventilador de teto, mesa com cadeira e banheiro privativo.",
        shortDescription: "Quarto com 1 cama de casal",
        photos: [
          "/rooms/casal-autonomo/IMG_8628.jpg",
          "/rooms/casal-autonomo/IMG_8629.jpg",
          "/rooms/casal-autonomo/IMG_8630.jpg",
          "/rooms/casal-autonomo/IMG_8632.jpg",
          "/rooms/casal-autonomo/IMG_8633.jpg",
          "/rooms/casal-autonomo/IMG_8634.jpg",
        ],
        maxOccupancy: 2,
        beds: "1 cama de casal",
        size: 15,
        amenities: autonomaAmenities,
        hasKitchen: false,
        displayOrder: 1,
        isActive: true,
      },
      {
        unitId: autonoma.id,
        name: "Duplo Autônomo",
        slug: "duplo-autonomo",
        description:
          "Quarto espaçoso com duas camas de solteiro, perfeito para amigos ou colegas de trabalho. Equipado com TV, ar-condicionado, ventilador de teto, mesa com cadeira e banheiro privativo.",
        shortDescription: "Quarto com 2 camas de solteiro",
        photos: [
          "/rooms/duplo-autonomo/IMG_8636.jpg",
          "/rooms/duplo-autonomo/IMG_8638.jpg",
          "/rooms/duplo-autonomo/IMG_8639.jpg",
          "/rooms/duplo-autonomo/IMG_8640.jpg",
          "/rooms/duplo-autonomo/IMG_8641.jpg",
          "/rooms/duplo-autonomo/IMG_8643.jpg",
          "/rooms/duplo-autonomo/IMG_8644.jpg",
          "/rooms/duplo-autonomo/IMG_8645.jpg",
          "/rooms/duplo-autonomo/IMG_8646.jpg",
          "/rooms/duplo-autonomo/IMG_8650.jpg",
        ],
        maxOccupancy: 2,
        beds: "2 camas de solteiro",
        size: 18,
        amenities: autonomaAmenities,
        hasKitchen: false,
        displayOrder: 2,
        isActive: true,
      },
      {
        unitId: autonoma.id,
        name: "Único Autônomo",
        slug: "unico-autonomo",
        description:
          "Quarto individual com uma cama de solteiro, ideal para viajantes solo que buscam economia e praticidade. Equipado com TV, ar-condicionado, ventilador de teto, mesa com cadeira e banheiro privativo.",
        shortDescription: "Quarto com 1 cama de solteiro",
        photos: [
          "/rooms/unico-autonomo/IMG_8650.jpg",
          "/rooms/unico-autonomo/IMG_8651.jpg",
          "/rooms/unico-autonomo/IMG_8652.jpg",
          "/rooms/unico-autonomo/IMG_8653.jpg",
        ],
        maxOccupancy: 1,
        beds: "1 cama de solteiro",
        size: 12,
        amenities: autonomaAmenities,
        hasKitchen: false,
        displayOrder: 3,
        isActive: true,
      },
    ],
  });

  // === QUARTOS UNIDADE FLAT ===
  const flatBaseAmenities = [
    "TV",
    "Ar-condicionado",
    "Mesa com cadeira",
    "Banheiro privativo",
  ];

  const flatKitchenAmenities = [
    ...flatBaseAmenities,
    "Cozinha completa",
  ];

  await prisma.roomType.createMany({
    data: [
      {
        unitId: flat.id,
        name: "Flat Duplo",
        slug: "flat-duplo",
        description:
          "Apartamento flat com duas camas de solteiro e cozinha completa. Ideal para estadias mais longas, oferecendo independência para preparar suas refeições. Café da manhã incluso na diária.",
        shortDescription: "Flat com 2 camas de solteiro + cozinha",
        photos: [
          "/rooms/duplo/d04e6803-8dc9-486a-836d-46b502e9fe18.jpg",
          "/rooms/duplo/IMG_8591.jpg",
          "/rooms/duplo/IMG_8603.jpg",
          "/rooms/duplo/IMG_8605.jpg",
          "/rooms/duplo/IMG_8610.jpg",
          "/rooms/duplo/IMG_8612.jpg",
          "/rooms/duplo/IMG_8614.jpg",
        ],
        maxOccupancy: 2,
        beds: "2 camas de solteiro",
        size: 25,
        amenities: flatKitchenAmenities,
        hasKitchen: true,
        displayOrder: 1,
        isActive: true,
      },
      {
        unitId: flat.id,
        name: "Flat Triplo",
        slug: "flat-triplo",
        description:
          "Apartamento flat espaçoso com uma cama de casal e uma de solteiro, além de cozinha completa. Perfeito para famílias pequenas ou grupos de amigos. Café da manhã incluso na diária.",
        shortDescription: "Flat com 1 casal + 1 solteiro + cozinha",
        photos: [
          "/rooms/casal/4467737e-a562-4320-b5c7-80b71218fd96.jpg",
          "/rooms/casal/7c45a775-9d44-4cc3-b9d1-e43c789bc9b3.jpg",
          "/rooms/casal/9dc0f69f-4290-43fc-a796-6a39724d7eb2.jpg",
          "/rooms/casal/b2224d7d-465c-4d1f-b92c-69b38b6b2a3e.jpg",
          "/rooms/casal/d04e6803-8dc9-486a-836d-46b502e9fe18.jpg",
          "/rooms/casal/de9c246b-123b-4d6f-acca-e7dfaf6cd378.jpg",
          "/rooms/casal/e2349efb-598a-43fd-8661-4e6eb93bdf08.jpg",
          "/rooms/casal/IMG_8610.jpg",
        ],
        maxOccupancy: 3,
        beds: "1 cama de casal + 1 cama de solteiro",
        size: 30,
        amenities: flatKitchenAmenities,
        hasKitchen: true,
        displayOrder: 2,
        isActive: true,
      },
      {
        unitId: flat.id,
        name: "Flat Quádruplo",
        slug: "flat-quadruplo",
        description:
          "O maior apartamento flat, com uma cama de casal e duas de solteiro, além de cozinha completa. Ideal para famílias ou grupos maiores que buscam conforto e autonomia. Café da manhã incluso na diária.",
        shortDescription: "Flat com 1 casal + 2 solteiro + cozinha",
        photos: [
          "/rooms/casal/4467737e-a562-4320-b5c7-80b71218fd96.jpg",
          "/rooms/casal/7c45a775-9d44-4cc3-b9d1-e43c789bc9b3.jpg",
          "/rooms/casal/9dc0f69f-4290-43fc-a796-6a39724d7eb2.jpg",
          "/rooms/casal/b2224d7d-465c-4d1f-b92c-69b38b6b2a3e.jpg",
        ],
        maxOccupancy: 4,
        beds: "1 cama de casal + 2 camas de solteiro",
        size: 35,
        amenities: flatKitchenAmenities,
        hasKitchen: true,
        displayOrder: 3,
        isActive: true,
      },
      {
        unitId: flat.id,
        name: "Único",
        slug: "unico",
        description:
          "Quarto individual com uma cama de solteiro na unidade Flat. Ideal para viajantes solo que desejam o conforto do atendimento presencial e café da manhã incluso.",
        shortDescription: "Quarto com 1 cama de solteiro",
        photos: [
          "/rooms/unico/d04e6803-8dc9-486a-836d-46b502e9fe18.jpg",
          "/rooms/unico/IMG_8591.jpg",
          "/rooms/unico/IMG_8592.jpg",
          "/rooms/unico/IMG_8603.jpg",
          "/rooms/unico/IMG_8611.jpg",
        ],
        maxOccupancy: 1,
        beds: "1 cama de solteiro",
        size: 12,
        amenities: flatBaseAmenities,
        hasKitchen: false,
        displayOrder: 4,
        isActive: true,
      },
      {
        unitId: flat.id,
        name: "Duplo",
        slug: "duplo",
        description:
          "Quarto com duas camas de solteiro na unidade Flat. Perfeito para amigos ou colegas de trabalho que desejam atendimento presencial e café da manhã incluso.",
        shortDescription: "Quarto com 2 camas de solteiro",
        photos: [
          "/rooms/duplo/d04e6803-8dc9-486a-836d-46b502e9fe18.jpg",
          "/rooms/duplo/IMG_8591.jpg",
          "/rooms/duplo/IMG_8603.jpg",
          "/rooms/duplo/IMG_8605.jpg",
          "/rooms/duplo/IMG_8610.jpg",
          "/rooms/duplo/IMG_8612.jpg",
          "/rooms/duplo/IMG_8614.jpg",
        ],
        maxOccupancy: 2,
        beds: "2 camas de solteiro",
        size: 18,
        amenities: flatBaseAmenities,
        hasKitchen: false,
        displayOrder: 5,
        isActive: true,
      },
    ],
  });

  console.log("Seed completed successfully!");
  console.log(`Created unit: ${autonoma.name} (${autonoma.id})`);
  console.log(`Created unit: ${flat.name} (${flat.id})`);

  const roomCount = await prisma.roomType.count();
  console.log(`Created ${roomCount} room types total.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
