create database if not exists SOFTEL;
use SOFTEL;
create table if not exists thermometer(
    id int not null auto_increment,
    temperature tinyint(1) not null,
    changeDate datetime not null,
    primary key(id)
); 

create table if not exists door(
    id int not null auto_increment,
    state tinyint(1) not null,
    changeDate datetime not null,
    primary key(id)
);

