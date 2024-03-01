-- TODO Task 3
drop database if exists shop;

create database shop;

use shop;

create table purchase_order (
    po_id int auto_increment,
    id varchar(64) not null,
    date timestamp default current_timestamp,
    name varchar(64) not null,
    address varchar(256) not null,
    priority boolean,
    comments varchar(256),
    cart varchar(256) not null,

    primary key(po_id)
);

grant all privileges on shop.* to mich@'%';

flush privileges;