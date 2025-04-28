-- CreateTable
CREATE TABLE "CampApplication" (
    "id" TEXT NOT NULL,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "musicTeacher" VARCHAR(255),
    "strings" VARCHAR(255),
    "brassAndPercussion" VARCHAR(255),
    "woodwinds" VARCHAR(255),
    "referralSource" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "grade" VARCHAR(255) NOT NULL,
    "school" VARCHAR(255) NOT NULL,
    "studentEmailAddress" VARCHAR(255) NOT NULL,
    "studentPhoneNumber" VARCHAR(255) NOT NULL,
    "campApplicationId" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "addressLine1" VARCHAR(255) NOT NULL,
    "addressLine2" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "zipPostalCode" VARCHAR(255) NOT NULL,
    "campApplicationId" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "relationshipToStudent" VARCHAR(255),
    "parentEmailAddress" VARCHAR(255) NOT NULL,
    "parentPhoneNumber" VARCHAR(255) NOT NULL,
    "campApplicationId" TEXT,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentEmailAddress_key" ON "Student"("studentEmailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Student_campApplicationId_key" ON "Student"("campApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_campApplicationId_key" ON "Address"("campApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_parentEmailAddress_key" ON "Parent"("parentEmailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_campApplicationId_key" ON "Parent"("campApplicationId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_campApplicationId_fkey" FOREIGN KEY ("campApplicationId") REFERENCES "CampApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_campApplicationId_fkey" FOREIGN KEY ("campApplicationId") REFERENCES "CampApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_campApplicationId_fkey" FOREIGN KEY ("campApplicationId") REFERENCES "CampApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
