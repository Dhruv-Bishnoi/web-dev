show tables;

create table users(
   userID varchar(50)  PRIMARY KEY,
   username varchar(50)  unique,
   email varchar(50)  not null unique,
   passward varchar(50)  not null

);


insert INto users values('123545','mo5hit','mohit@gmail.com','#mohitji@$'),('54321','sih5ag','sihag@gmail.com','#sihagaryan%$#@');