create table request (
id serial PRIMARY key,
user_id int REFERENCES users(id),
category_id int REFERENCES category(id),
description text,
long text,
lat text,
help_id int REFERENCES users(id)
)

create table messages (
id serial PRIMARY key,
conv_id int REFERENCES conversations(id),
body text,
time_stamp TIMESTAMP 
)

create table conversations (
id serial PRIMARY key,
requester_id text,
helper_id text
)

create table users (
id serial PRIMARY key,
username text not null,
password text,
phone text
)
