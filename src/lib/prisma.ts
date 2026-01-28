import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

function getDirectDbUrl(): string {
  const url = process.env.DATABASE_URL ?? "";
  if (!url) return "";

  // prisma+postgres:// URLs have a base64 API key with the real DB URL
  if (url.startsWith("prisma+postgres://")) {
    try {
      const parsed = new URL(url);
      const apiKey = parsed.searchParams.get("api_key") ?? parsed.password;
      if (apiKey) {
        const decoded = JSON.parse(
          Buffer.from(apiKey, "base64").toString("utf-8")
        );
        if (decoded.databaseUrl) return decoded.databaseUrl;
      }
    } catch {
      // fallback
    }
  }
  // Already a direct postgres:// URL
  return url;
}

function createPrismaClient() {
  const directUrl = getDirectDbUrl();

  // If no DATABASE_URL, throw error - it's required at runtime
  if (!directUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const parsed = new URL(directUrl);
  const useSsl = parsed.searchParams.get("sslmode") !== "disable";

  const adapter = new PrismaPg({
    connectionString: directUrl,
    ssl: useSsl ? { rejectUnauthorized: false } : false,
  });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
