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

INSERT into movies (title,picture,"releaseDate",director,duration,synopsis)
values ('Spider-Man: Homecoming', 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg', '2017-06-28 00:00:00', 'Jon Watss', '02:13:00','Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened. ');

ALTER TABLE "users" ADD CONSTRAINT "email" UNIQUE ("email");

ALTER TABLE "casts" ADD CONSTRAINT "unique_name" UNIQUE ("name");

ALTER TABLE "genre" ADD CONSTRAINT "name" UNIQUE ("name");

ALTER TABLE "subscribers" ADD CONSTRAINT "email" UNIQUE ("email");
SELECT * FROM movies;

ALTER TABLE genre
  ALTER COLUMN name TYPE VARCHAR;

SELECT * FROM genre;

INSERT INTO genre (name)
VALUES ('Adventure');

INSERT INTO genre (name)
VALUES ('Action'), ('Sci-Fi');

INSERT INTO users (picture, "firstName", "lastName", "phoneNumber",email,password)
VALUES ('https://media-exp1.licdn.com/dms/image/C4E03AQH_PHpvfAUWGA/profile-displayphoto-shrink_800_800/0/1516767917729?e=2147483647&v=beta&t=yr78w5oBNrk0_mWQS9ohTP0RrciRPHYxjdX5eZcYNhY', 'Putut', 'Nardianto', '0895421483102', 'pututnardiantol@gmail.com', '12345');

SELECT * FROM users;

INSERT INTO "resetPassword" ("email", "userId")
VALUES ('pututnardiantol@gmail.com', 1);
SELECT * FROM "resetPassword";

INSERT INTO "movieGenre" ("genreId")
VALUES (3);

SELECT * FROM "movieGenre";


INSERT INTO casts (name)
VALUES ('Tom Holland'), ('Michael Keaton'), ('Robert Downey Jr.');
SELECT * FROM casts;

INSERT INTO "movieCasts" ("movieId","castsId")
VALUES (1,1), (1,2), (1,3);
SELECT * FROM "movieCasts";


INSERT INTO "cinemas" ("picture", "name", "address", "city")
VALUES ('https://static.wikia.nocookie.net/logopedia/images/c/cf/Logo_Cinema21-transparent.png', 'CineOne21', 'Downcare street  No. 21,
East Purwokerto', 'Purwokerto');
SELECT * FROM "cinemas";

INSERT INTO "movieSchedules" ("movieId", "cinemaId", "price", "startDate", "endDate")
VALUES (1, 1, 30, '2022-11-21', '2022-12-21');
SELECT * FROM "movieSchedules";

INSERT INTO "movieScheduleTimes" ("time", "movieScheduleId")
VALUES ('00:00', 1);
SELECT * FROM "movieScheduleTimes";

INSERT INTO "status" (name)
VALUES ('Ticket in active'), ('Ticket used'), ('Ticket expired');
SELECT * FROM "status";

INSERT INTO "transaction" ("bookingDate", "movieId", "cinemaId", "movieScheduleId", "fullName", "email", "phoneNumber", "statusId")
VALUES ('2022-11-21', 1, 1, 1, 'Putut Nardianto', 'pututnardiantol@gmail.com', '0895421483102', 1);
SELECT * FROM "transaction";

INSERT INTO "reservedSeat" ("seatNum", "transactionId")
VALUES ('C14', 1);
SELECT * FROM "reservedSeat";

INSERT INTO "paymentMethod" ("picture", "name")
VALUES ('https://1.bp.blogspot.com/-Iq0Ztu117_8/XzNYaM4ABdI/AAAAAAAAHA0/MabT7B02ErIzty8g26JvnC6cPeBZtATNgCLcBGAsYHQ/s1000/logo-ovo.png', 'OVO');
SELECT * FROM "paymentMethod";

INSERT INTO "subscribers" ("email")
VALUES ('pututnardiantol@gmail.com');
SELECT * FROM "subscribers";

ALTER TABLE "movieCasts" ADD CONSTRAINT "fk_movieId" FOREIGN KEY ("movieId") REFERENCES movies (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieCasts" ADD CONSTRAINT "fk_castsId" FOREIGN KEY ("castsId") REFERENCES casts (id) ON DELETE CASCADE ON UPDATE CASCADE;

SELECT m.title, c.name as cast FROM "movies" m
JOIN "movieCasts" mc ON mc."movieId" = m.id
JOIN "casts" c ON c.id = mc."castsId";


ALTER TABLE "movieGenre" ADD CONSTRAINT "fk_movieId" FOREIGN KEY ("movieId") REFERENCES movies (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "movieGenre" ADD CONSTRAINT "fk_genreId" FOREIGN KEY ("genreId") REFERENCES genre (id) ON DELETE CASCADE ON UPDATE CASCADE;

