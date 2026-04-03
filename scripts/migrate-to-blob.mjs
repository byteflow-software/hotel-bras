import { put } from "@vercel/blob";
import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const BLOB_TOKEN = "vercel_blob_rw_1rekz9GHnpwesMbr_ff3VW6A5kczMA5Gx6N2xqUio9WQTQF";
const DATABASE_URL = "postgresql://neondb_owner:npg_fWJ3aLePtrZ9@ep-withered-feather-aco1hlqv-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const { Client } = pg;

// Todas as fotos encontradas no repo, mapeadas pela pasta (categoria)
const FILES = [
  // Área comum (unidade Brás - flat/semi)
  { local: "public/rooms/area-comum/IMG_8617.jpg",           blob: "rooms/area-comum/IMG_8617.jpg" },

  // Área comum autônoma
  { local: "public/rooms/area-comum-autonomo/IMG_8621.jpg",  blob: "rooms/area-comum-autonomo/IMG_8621.jpg" },
  { local: "public/rooms/area-comum-autonomo/IMG_8624.jpg",  blob: "rooms/area-comum-autonomo/IMG_8624.jpg" },
  { local: "public/rooms/area-comum-autonomo/IMG_8625.jpg",  blob: "rooms/area-comum-autonomo/IMG_8625.jpg" },
  { local: "public/rooms/area-comum-autonomo/IMG_8626.jpg",  blob: "rooms/area-comum-autonomo/IMG_8626.jpg" },
  { local: "public/rooms/area-comum-autonomo/IMG_8654.jpg",  blob: "rooms/area-comum-autonomo/IMG_8654.jpg" },
  { local: "public/rooms/area-comum-autonomo/IMG_8655.jpg",  blob: "rooms/area-comum-autonomo/IMG_8655.jpg" },

  // Quarto Casal (unidade Brás)
  { local: "public/rooms/casal/IMG_8610.jpg",                blob: "rooms/casal/IMG_8610.jpg" },
  { local: "public/rooms/casal/d04e6803-8dc9-486a-836d-46b502e9fe18.jpg", blob: "rooms/casal/d04e6803-8dc9-486a-836d-46b502e9fe18.jpg" },
  { local: "public/rooms/casal/e2349efb-598a-43fd-8661-4e6eb93bdf08.jpg", blob: "rooms/casal/e2349efb-598a-43fd-8661-4e6eb93bdf08.jpg" },
  { local: "public/rooms/casal/7c45a775-9d44-4cc3-b9d1-e43c789bc9b3.jpg", blob: "rooms/casal/7c45a775-9d44-4cc3-b9d1-e43c789bc9b3.jpg" },
  { local: "public/rooms/casal/9dc0f69f-4290-43fc-a796-6a39724d7eb2.jpg", blob: "rooms/casal/9dc0f69f-4290-43fc-a796-6a39724d7eb2.jpg" },
  { local: "public/rooms/casal/4467737e-a562-4320-b5c7-80b71218fd96.jpg", blob: "rooms/casal/4467737e-a562-4320-b5c7-80b71218fd96.jpg" },
  { local: "public/rooms/casal/de9c246b-123b-4d6f-acca-e7dfaf6cd378.jpg", blob: "rooms/casal/de9c246b-123b-4d6f-acca-e7dfaf6cd378.jpg" },
  { local: "public/rooms/casal/b2224d7d-465c-4d1f-b92c-69b38b6b2a3e.jpg", blob: "rooms/casal/b2224d7d-465c-4d1f-b92c-69b38b6b2a3e.jpg" },

  // Quarto Casal Autônomo
  { local: "public/rooms/casal-autonomo/IMG_8628.jpg",       blob: "rooms/casal-autonomo/IMG_8628.jpg" },
  { local: "public/rooms/casal-autonomo/IMG_8629.jpg",       blob: "rooms/casal-autonomo/IMG_8629.jpg" },
  { local: "public/rooms/casal-autonomo/IMG_8630.jpg",       blob: "rooms/casal-autonomo/IMG_8630.jpg" },
  { local: "public/rooms/casal-autonomo/IMG_8632.jpg",       blob: "rooms/casal-autonomo/IMG_8632.jpg" },
  { local: "public/rooms/casal-autonomo/IMG_8633.jpg",       blob: "rooms/casal-autonomo/IMG_8633.jpg" },
  { local: "public/rooms/casal-autonomo/IMG_8634.jpg",       blob: "rooms/casal-autonomo/IMG_8634.jpg" },

  // Quarto Duplo (unidade Brás)
  { local: "public/rooms/duplo/IMG_8591.jpg",                blob: "rooms/duplo/IMG_8591.jpg" },
  { local: "public/rooms/duplo/IMG_8603.jpg",                blob: "rooms/duplo/IMG_8603.jpg" },
  { local: "public/rooms/duplo/IMG_8605.jpg",                blob: "rooms/duplo/IMG_8605.jpg" },
  { local: "public/rooms/duplo/IMG_8610.jpg",                blob: "rooms/duplo/IMG_8610.jpg" },
  { local: "public/rooms/duplo/IMG_8612.jpg",                blob: "rooms/duplo/IMG_8612.jpg" },
  { local: "public/rooms/duplo/IMG_8614.jpg",                blob: "rooms/duplo/IMG_8614.jpg" },
  { local: "public/rooms/duplo/d04e6803-8dc9-486a-836d-46b502e9fe18.jpg", blob: "rooms/duplo/d04e6803-8dc9-486a-836d-46b502e9fe18.jpg" },

  // Quarto Duplo Autônomo
  { local: "public/rooms/duplo-autonomo/IMG_8636.jpg",       blob: "rooms/duplo-autonomo/IMG_8636.jpg" },
  { local: "public/rooms/duplo-autonomo/IMG_8638.jpg",       blob: "rooms/duplo-autonomo/IMG_8638.jpg" },
  { local: "public/rooms/duplo-autonomo/IMG_8639.jpg",       blob: "rooms/duplo-autonomo/IMG_8639.jpg" },
  { local: "public/rooms/duplo-autonomo/IMG_8640.jpg",       blob: "rooms/duplo-autonomo/IMG_8640.jpg" },
  { local: "public/rooms/duplo-autonomo/IMG_8641.jpg",       blob: "rooms/duplo-autonomo/IMG_8641.jpg" },
  { local: "public/rooms/duplo-autonomo/IMG_8643.jpg",       blob: "rooms/duplo-autonomo/IMG_8643.jpg" },
  { local: "public/rooms/duplo-autonomo/IMG_8644.jpg",       blob: "rooms/duplo-autonomo/IMG_8644.jpg" },
  { local: "public/rooms/duplo-autonomo/IMG_8645.jpg",       blob: "rooms/duplo-autonomo/IMG_8645.jpg" },
  { local: "public/rooms/duplo-autonomo/IMG_8646.jpg",       blob: "rooms/duplo-autonomo/IMG_8646.jpg" },
  { local: "public/rooms/duplo-autonomo/IMG_8650.jpg",       blob: "rooms/duplo-autonomo/IMG_8650.jpg" },

  // Quarto Único (unidade Brás)
  { local: "public/rooms/unico/IMG_8591.jpg",                blob: "rooms/unico/IMG_8591.jpg" },
  { local: "public/rooms/unico/IMG_8592.jpg",                blob: "rooms/unico/IMG_8592.jpg" },
  { local: "public/rooms/unico/IMG_8603.jpg",                blob: "rooms/unico/IMG_8603.jpg" },
  { local: "public/rooms/unico/IMG_8611.jpg",                blob: "rooms/unico/IMG_8611.jpg" },
  { local: "public/rooms/unico/d04e6803-8dc9-486a-836d-46b502e9fe18.jpg", blob: "rooms/unico/d04e6803-8dc9-486a-836d-46b502e9fe18.jpg" },

  // Quarto Único Autônomo
  { local: "public/rooms/unico-autonomo/IMG_8650.jpg",       blob: "rooms/unico-autonomo/IMG_8650.jpg" },
  { local: "public/rooms/unico-autonomo/IMG_8651.jpg",       blob: "rooms/unico-autonomo/IMG_8651.jpg" },
  { local: "public/rooms/unico-autonomo/IMG_8652.jpg",       blob: "rooms/unico-autonomo/IMG_8652.jpg" },
  { local: "public/rooms/unico-autonomo/IMG_8653.jpg",       blob: "rooms/unico-autonomo/IMG_8653.jpg" },
];

async function uploadAll() {
  const urlMap = {}; // localPath → blob URL

  for (const f of FILES) {
    const localPath = join(ROOT, f.local.replace(/\//g, "/"));
    const buffer = await readFile(localPath);
    const contentType = "image/jpeg";

    process.stdout.write(`Enviando ${f.blob}... `);
    const blob = await put(f.blob, buffer, {
      access: "public",
      token: BLOB_TOKEN,
      contentType,
      addRandomSuffix: false,
    });

    urlMap[`/${f.local.replace("public/", "")}`] = blob.url;
    console.log(`OK → ${blob.url}`);
  }

  return urlMap;
}

async function updateDatabase(urlMap) {
  const client = new Client({ connectionString: DATABASE_URL });
  await client.connect();

  try {
    // Busca todos os RoomTypes com fotos
    const { rows: rooms } = await client.query(
      'SELECT id, name, photos FROM "RoomType"'
    );

    for (const room of rooms) {
      if (!room.photos || room.photos.length === 0) continue;

      const newPhotos = room.photos.map((p) => {
        // Se já é uma URL completa (blob ou https), mantém
        if (p.startsWith("http")) return urlMap[p] ?? p;
        // Caminho relativo: /rooms/casal/...
        return urlMap[p] ?? p;
      });

      if (JSON.stringify(newPhotos) !== JSON.stringify(room.photos)) {
        await client.query('UPDATE "RoomType" SET photos = $1 WHERE id = $2', [
          newPhotos,
          room.id,
        ]);
        console.log(`✓ RoomType "${room.name}" atualizado`);
      }
    }

    // Busca todas as Units com commonAreaPhotos
    const { rows: units } = await client.query(
      'SELECT id, name, "commonAreaPhotos" FROM "Unit"'
    );

    for (const unit of units) {
      if (!unit.commonAreaPhotos || unit.commonAreaPhotos.length === 0) continue;

      const newPhotos = unit.commonAreaPhotos.map((p) => {
        if (p.startsWith("http")) return urlMap[p] ?? p;
        return urlMap[p] ?? p;
      });

      if (JSON.stringify(newPhotos) !== JSON.stringify(unit.commonAreaPhotos)) {
        await client.query(
          'UPDATE "Unit" SET "commonAreaPhotos" = $1 WHERE id = $2',
          [newPhotos, unit.id]
        );
        console.log(`✓ Unit "${unit.name}" atualizada`);
      }
    }
  } finally {
    await client.end();
  }
}

async function main() {
  console.log("=== Migrando fotos para Vercel Blob ===\n");
  const urlMap = await uploadAll();
  console.log(`\n=== ${Object.keys(urlMap).length} fotos enviadas ===\n`);
  console.log("=== Atualizando banco de dados ===\n");
  await updateDatabase(urlMap);
  console.log("\n=== Migração concluída! ===");
}

main().catch(console.error);
