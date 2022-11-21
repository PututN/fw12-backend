CREATE DATABASE cinemnar;

CREATE TABLE "users" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture"       VARCHAR(255),
    "firstName"     VARCHAR(255),
    "lastName"      VARCHAR(255),
    "phoneNumber"   VARCHAR(255),
    "email"         VARCHAR(255),
    "password"      VARCHAR(255),
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updateAt"      TIMESTAMPTZ
);

CREATE TABLE "resetPassword" (
    "id"        INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email"     VARCHAR(255),
    "userId"    INT,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updateAt"  TIMESTAMPTZ
);

CREATE TABLE "movies" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "title"         VARCHAR(255),
    "picture"       VARCHAR(255),
    "releaseDate"   TIMESTAMPTZ,
    "director"      VARCHAR(255),
    "duration"      TIME,
    "synopsis"      TEXT,
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updateAt"      TIMESTAMPTZ
);

CREATE TABLE "genre" (
    "id"        INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name"   INT,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updateAt" TIMESTAMPTZ
);

CREATE TABLE "movieGenre" (
    "id"        INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "movieId"   INT,
    "genreId"   INT,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updateAt" TIMESTAMPTZ
);


CREATE TABLE "casts" (
    "id"        INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name"      VARCHAR(255),
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updateAt" TIMESTAMPTZ
);


CREATE TABLE "movieCasts" (
    "id"        INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "movieId"   INT,
    "castsId"   INT,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updateAt" TIMESTAMPTZ
);


CREATE TABLE "cinemas" (
    "id"        INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture"   VARCHAR(255),
    "name"      VARCHAR(255),
    "address"   VARCHAR(255),
    "city"       VARCHAR(255),
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updateAt" TIMESTAMPTZ
);


CREATE TABLE "movieSchedules" (
    "id"        INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "movieId"   INT,
    "cinemaId"  INT,
    "price"     BIGINT,
    "startDate"  DATE,
    "endDate"  DATE,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updateAt" TIMESTAMPTZ
);


CREATE TABLE "movieScheduleTimes" (
    "id"        INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "time"      TIME,
    "movieScheduleId"   INT,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updateAt" TIMESTAMPTZ
);


CREATE TABLE "status" (
    "id"        INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name"      VARCHAR(255),
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updateAt" TIMESTAMPTZ
);

CREATE TABLE "transaction" (
    "id"        INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "bookingDate"   TIMESTAMPTZ,
    "movieId"   INT,
    "cinemaId"   INT,
    "movieScheduleId"   INT,
    "fullName"      VARCHAR(255),
    "email"      VARCHAR(255),
    "phoneNumber"      VARCHAR(255),
    "statusId"   INT,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updateAt" TIMESTAMPTZ
);

CREATE TABLE "reservedSeat" (
    "id"        INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "seatNum"      VARCHAR(255),
    "transactionId"   INT,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updateAt" TIMESTAMPTZ
);

CREATE TABLE "paymentMethod" (
    "id"        INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture"      VARCHAR(255),
    "name"      VARCHAR(255),
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updateAt" TIMESTAMPTZ
);

CREATE TABLE "subscribers" (
    "id"        INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email"      VARCHAR(255),
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updateAt" TIMESTAMPTZ
);

