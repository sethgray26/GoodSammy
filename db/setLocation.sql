update users
set long = $2
where id = $1;

update users
set lat = $3
where id = $1;

select * from users where id = $1;