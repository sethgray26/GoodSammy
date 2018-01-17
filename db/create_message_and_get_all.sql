insert into messages (conv_id, body)
values($1, $2);
select * from messages
where conv_id = $1;