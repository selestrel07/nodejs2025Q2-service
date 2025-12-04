-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
ALTER COLUMN "updatedAt" SET DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint;

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteArtist" (
    "id" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "FavoriteArtist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteArtist_artistId_key" ON "FavoriteArtist"("artistId");

-- AddForeignKey
ALTER TABLE "FavoriteArtist" ADD CONSTRAINT "FavoriteArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
