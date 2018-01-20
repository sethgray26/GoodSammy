insert into messages (conv_id, body, user_id)
values($1, $2, $3);
select * from messages
where conv_id = $1;