import type { Prisma } from "@prisma/client";

export type SongItem = Prisma.SongGetPayload<{
  select: { id: true; title: true; artist: true };
}>;