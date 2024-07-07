-- CreateTable
CREATE TABLE "User" (
    "_id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT DEFAULT '',
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Candle" (
    "_id" SERIAL NOT NULL,
    "image" TEXT,
    "name" TEXT DEFAULT '',
    "price" INTEGER NOT NULL,
    "wax" TEXT DEFAULT '',
    "fragrance" TEXT DEFAULT '',
    "burningTime" TEXT DEFAULT '',
    "dimension" TEXT DEFAULT '',
    "weight" TEXT DEFAULT '',

    CONSTRAINT "Candle_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Testimonials" (
    "_id" SERIAL NOT NULL,

    CONSTRAINT "Testimonials_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "PersonTestimonials" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "rotate" INTEGER NOT NULL,
    "testimonialsId" INTEGER NOT NULL,

    CONSTRAINT "PersonTestimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserCart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandleOnCart" (
    "id" SERIAL NOT NULL,
    "userCartId" INTEGER NOT NULL,
    "candleId" INTEGER NOT NULL,

    CONSTRAINT "CandleOnCart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_number_key" ON "User"("number");

-- CreateIndex
CREATE INDEX "PersonTestimonials_testimonialsId_idx" ON "PersonTestimonials"("testimonialsId");

-- CreateIndex
CREATE INDEX "UserCart_userId_idx" ON "UserCart"("userId");

-- CreateIndex
CREATE INDEX "CandleOnCart_userCartId_idx" ON "CandleOnCart"("userCartId");

-- CreateIndex
CREATE INDEX "CandleOnCart_candleId_idx" ON "CandleOnCart"("candleId");

-- AddForeignKey
ALTER TABLE "PersonTestimonials" ADD CONSTRAINT "PersonTestimonials_testimonialsId_fkey" FOREIGN KEY ("testimonialsId") REFERENCES "Testimonials"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCart" ADD CONSTRAINT "UserCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandleOnCart" ADD CONSTRAINT "CandleOnCart_userCartId_fkey" FOREIGN KEY ("userCartId") REFERENCES "UserCart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandleOnCart" ADD CONSTRAINT "CandleOnCart_candleId_fkey" FOREIGN KEY ("candleId") REFERENCES "Candle"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
