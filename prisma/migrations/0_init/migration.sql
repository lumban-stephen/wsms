-- CreateEnum
CREATE TYPE "access_enum" AS ENUM ('admin', 'hr', 'cad', 'main', 'medical', 'normal');

-- CreateEnum
CREATE TYPE "applicant_enum" AS ENUM ('pending', 'denied', 'accepted', 'expired', 'retired');

-- CreateEnum
CREATE TYPE "compensation_enum" AS ENUM ('pending', 'compensated');

-- CreateEnum
CREATE TYPE "req_stat_enum" AS ENUM ('waiting', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "req_type_enum" AS ENUM ('additional', 'replacement');

-- CreateEnum
CREATE TYPE "violation_enum" AS ENUM ('warning', 'minor', 'major');

-- CreateTable
CREATE TABLE "absences" (
    "absence_id" SERIAL NOT NULL,
    "absence_start" TIMESTAMP(6),
    "absence_end" TIMESTAMP(6),
    "compensation_start" TIMESTAMP(6),
    "compensation_end" TIMESTAMP(6),
    "compensation_status" "compensation_enum",
    "ws_fk" INTEGER,

    CONSTRAINT "absences_pkey" PRIMARY KEY ("absence_id")
);

-- CreateTable
CREATE TABLE "announcements" (
    "announcement_id" SERIAL NOT NULL,
    "announcer_fk" INTEGER,
    "announcement_title" VARCHAR(100),
    "message" TEXT,
    "date_posted" TIMESTAMP(6),

    CONSTRAINT "announcements_pkey" PRIMARY KEY ("announcement_id")
);

-- CreateTable
CREATE TABLE "applicants" (
    "applicant_id" SERIAL NOT NULL,
    "name_fk" INTEGER,
    "school_name" VARCHAR(30),
    "address" VARCHAR(100),
    "course" VARCHAR(40),
    "age" INTEGER,
    "year" INTEGER,
    "contact" VARCHAR(20),
    "parent_fk" INTEGER,
    "status" "applicant_enum",

    CONSTRAINT "applicants_pkey" PRIMARY KEY ("applicant_id")
);

-- CreateTable
CREATE TABLE "departments" (
    "department_id" SERIAL NOT NULL,
    "department_name" VARCHAR(100),
    "ws_count" INTEGER,
    "employee_count" INTEGER,
    "access_lvl" "access_enum",

    CONSTRAINT "departments_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "guardians" (
    "guardian_id" SERIAL NOT NULL,
    "contact" VARCHAR(100),
    "name_fk" INTEGER,

    CONSTRAINT "guardians_pkey" PRIMARY KEY ("guardian_id")
);

-- CreateTable
CREATE TABLE "journals" (
    "journal_id" SERIAL NOT NULL,
    "ws_fk" INTEGER,
    "message" TEXT,
    "date_created" TIMESTAMP(6),

    CONSTRAINT "journals_pkey" PRIMARY KEY ("journal_id")
);

-- CreateTable
CREATE TABLE "names" (
    "name_id" INTEGER NOT NULL,
    "fname" VARCHAR(100),
    "lname" VARCHAR(100),
    "mname" VARCHAR(100),
    "suffix" VARCHAR(100),

    CONSTRAINT "name_pkey" PRIMARY KEY ("name_id")
);

-- CreateTable
CREATE TABLE "parents" (
    "parent_id" SERIAL NOT NULL,
    "mother_fk" INTEGER,
    "father_fk" INTEGER,

    CONSTRAINT "parents_pkey" PRIMARY KEY ("parent_id")
);

-- CreateTable
CREATE TABLE "user_details" (
    "userdetail_id" SERIAL NOT NULL,
    "name_fk" INTEGER,
    "address" VARCHAR(100),
    "contact" VARCHAR(100),

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("userdetail_id")
);

-- CreateTable
CREATE TABLE "user_violations" (
    "user_violation_id" SERIAL NOT NULL,
    "violation_type" "violation_enum",
    "ws_fk" INTEGER,

    CONSTRAINT "user_violations_pkey" PRIMARY KEY ("user_violation_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "userdetail_fk" INTEGER,
    "username" VARCHAR(100),
    "password" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "working_scholars" (
    "ws_id" SERIAL NOT NULL,
    "dept_fk" INTEGER,
    "applicant_fk" INTEGER,

    CONSTRAINT "working_scholars_pkey" PRIMARY KEY ("ws_id")
);

-- CreateTable
CREATE TABLE "ws_requests" (
    "ws_req_id" SERIAL NOT NULL,
    "ws_req_name" VARCHAR(100),
    "message" TEXT,
    "dept_name_fk" INTEGER,
    "ws_req_stat" "req_stat_enum",
    "ws_req_type" "req_type_enum",

    CONSTRAINT "ws_requests_pkey" PRIMARY KEY ("ws_req_id")
);

-- AddForeignKey
ALTER TABLE "absences" ADD CONSTRAINT "absences_ws_fk_fkey" FOREIGN KEY ("ws_fk") REFERENCES "working_scholars"("ws_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_announcer_fk_fkey" FOREIGN KEY ("announcer_fk") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "applicants" ADD CONSTRAINT "applicants_name_fk_fkey" FOREIGN KEY ("name_fk") REFERENCES "names"("name_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "applicants" ADD CONSTRAINT "applicants_parent_fk_fkey" FOREIGN KEY ("parent_fk") REFERENCES "parents"("parent_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "guardians" ADD CONSTRAINT "guardians_name_fk_fkey" FOREIGN KEY ("name_fk") REFERENCES "names"("name_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "journals" ADD CONSTRAINT "journals_ws_fk_fkey" FOREIGN KEY ("ws_fk") REFERENCES "working_scholars"("ws_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "parents" ADD CONSTRAINT "parents_father_fk_fkey" FOREIGN KEY ("father_fk") REFERENCES "guardians"("guardian_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "parents" ADD CONSTRAINT "parents_mother_fk_fkey" FOREIGN KEY ("mother_fk") REFERENCES "guardians"("guardian_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_name_fk_fkey" FOREIGN KEY ("name_fk") REFERENCES "names"("name_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_violations" ADD CONSTRAINT "user_violations_ws_fk_fkey" FOREIGN KEY ("ws_fk") REFERENCES "working_scholars"("ws_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_userdetail_fk_fkey" FOREIGN KEY ("userdetail_fk") REFERENCES "user_details"("userdetail_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "working_scholars" ADD CONSTRAINT "working_scholars_applicant_fk_fkey" FOREIGN KEY ("applicant_fk") REFERENCES "applicants"("applicant_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "working_scholars" ADD CONSTRAINT "working_scholars_dept_fk_fkey" FOREIGN KEY ("dept_fk") REFERENCES "departments"("department_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ws_requests" ADD CONSTRAINT "ws_requests_dept_name_fk_fkey" FOREIGN KEY ("dept_name_fk") REFERENCES "departments"("department_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

