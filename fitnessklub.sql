use master;
go
drop database if exists fitnessklub;
go
create database fitnessklub collate Croatian_CI_AS;
go

use fitnessklub;

create table privatni_treneri(
id int not null primary key identity(1,1),
ime varchar(25) not null,
prezime varchar(50) not null,
email varchar(155) not null,
cijena_sat decimal(5,2) not null
);

create table clanovi(
id int not null primary key identity(10,1),
ime varchar(25) not null,
prezime varchar(50) not null,
email varchar(155) not null,
grupa int not null,
clan_od datetime,
verificiran bit not null
);

create table grupe(
id int not null primary key identity(10,1),
naziv varchar(155) not null,
privatni_trener int not null,
kolicina_clanova int not null,
cijena decimal(5,2) not null
);

create table privatni_trening(
privatni_trener int not null,
clan int not null,
);

alter table clanovi add foreign key (grupa) references grupe(id);
alter table grupe add foreign key (privatni_trener) references privatni_treneri(id);
alter table privatni_trening add foreign key (privatni_trener) references privatni_treneri(id);
alter table privatni_trening add foreign key (clan) references clanovi(id);


--select * from privatni_treneri;

insert into privatni_treneri (ime, prezime, email, cijena_sat) values
('Goran','Rebić','grebic@gmail.com',19.99),
('Ivan','Ivan','ivanivan30@yahoo.com',25.99),
('Corey','Taylor','ctaytay@gmail.com',20.99);

--select * from grupe;

insert into grupe (naziv, privatni_trener, kolicina_clanova, cijena) values
('Pilates', 1, 18, 29.99),
('Joga', 1, 15, 29.99),
('Vježbe za trudnice', 1, 20, 29.99),
('HIIT program', 2, 20, 39.99),
('STRENGTH program', 2, 20, 39.99),
('ABS program', 2, 25, 39.99),
('Rehabilitacija', 3, 25, 19.99),
('Glute program', 3, 25, 21.99);

--select * from clanovi;

insert into clanovi (ime, prezime, email, grupa, verificiran) values
('Petar','Rebolj','prebolj@gmail.com', 10, 1),
('Tihomir','Mesarić','tihothi@gmail.com', 15, 1),
('Željko','Feher','zfeher@gmail.com', 17, 1),
('Radovan','Fleis','refko@gmail.com', 14, 1),
('Ivo','Ivić','ivovio4124@yahoo.com', 16, 1),
('Iva','Ivić','iva429001@yahoo.com', 16, 1),
('Lolita','Fleis','lolitaff@gmail.com', 12, 1),
('Monika','Kolar','mokakol@gmail.com', 12, 1),
('Matko','Kolar','matkotkoma@gmail.com', 15, 1),
('Ratka','Klarić','ratkakk@gmail.com', 16, 1),
('Hrvoje','Klarić','hklaric@yahoo.com', 14, 1),
('Ivana','Klarić','ivanakll@gmail.com', 12, 1),
('Mirko','Glavaš','deuterio@yahoo.com', 14, 1),
('Monika','Glavaš','monaglav@yahoo.com', 17, 1),
('Miroslav','Avdić','mavavdic@gmail.com', 17, 1),
('Kristina','Avdić', 'kikicaav@gmail.com', 12, 1),
('Klarisa','Avdić','klarika@gmail.com', 12, 1),
('Simona','Gotovac','sgotovac@yahoo.com', 11, 1),
('Ante','Gotovac','agotovac@gmail.com', 15, 1),
('Mirta','Gotovac','mirnagotov@yahoo.com', 16, 1),
('Mirela','Osmec','mosma123@gmail.com', 12, 1),
('Ana','Kotromanović','anakotromanovic@yahoo.com', 12, 1),
('Ivan','Kotromanović','ivan.kotromanovic@yahoo.com', 14, 1),
('Vedran','Kotromanović','veckotroman@gmail.com', 15, 1),
('Sabina','Kotromanović','sabinica21@gmail.com', 13, 1),
('Samanta','Ilić','samantailic@gmail.com', 16, 1),
('Josip','Ilić','jopila@yahoo.com', 17, 1),
('Sven','Svenovski','sven235@gmail.com', 14, 1),
('Slavica','Svenovski','slavka50@yahoo.com', 17, 1),
('Grizelda','Spasenović','grizaspas@yahoo.com', 17, 1),
('Đurđica','Kovačić','djurdjakov@gmail.com', 16, 1),
('Đorđe','Kovačić','djordjijekaj@gmail.com', 15, 1),
('Noa','Kovačić','noakova@gmail.com', 14, 1),
('Lena','Kovačić','lenicakovica@gmail.com', 17, 1),
('Emily','Kovačić','emilikov@gmail.com', 17, 1),
('Boris','Sivić','bsivic@gmail.com', 17, 1),
('Borislav','Sivić','borsiv@gmail.com', 16, 1),
('Ninoslav','Sakcin','ninosak@yahoo.com', 14, 1),
('Borna','Kraljević','bkraljevic@gmail.com', 15, 1),
('Krunoslav','Kraljević','krukralj@gmail.com', 15, 1),
('Ivana','Kraljević','ivanakraljevic@gmail.com', 13, 1),
('Monika','Zdravić','mzdravka@gmail.com', 10, 1),
('Ivana','Krović','ivanakrov@gmail.com', 10, 1),
('Silvija','Krović','silkro@gmail.com', 10, 1),
('Antonija', 'Sakcin','asakcija@yahoo.com', 10, 1),
('Marija','Slivka','mslivka@gmail.com', 11, 1),
('Mirna','Slivka','mirna.slivka@gmail.com', 11, 1),
('Ana','Krolo','krolo.ana@gmail.com', 11, 1),
('Silvana','Pranić','silpran@yahoo.com', 11 ,1),
('Trevor','Maxyim','trevormaxy@yahoo.com', 15, 1),
('Luka','Kundak','lukakundak@gmail.com', 16, 1);

--select * from privatni_trening

--select * from clanovi;
--select * from privatni_treneri;

insert into privatni_trening (privatni_trener, clan) values
(1,14),
(1,16),
(1,17),
(1,21),
(2,22),
(2,24),
(2,25),
(3,26),
(2,27),
(1,28),
(1,29),
(2,31),
(1,33),
(1,35),
(2,37),
(3,44),
(3,45),
(3,46),
(3,47),
(1,50),
(1,52),
(2,54),
(3,55),
(2,56),
(2,57),
(1,60);

--select * from privatni_treneri;
--select * from grupe;
--select * from clanovi;
--select * from privatni_trening;