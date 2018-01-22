insert into messages (conv_id, body, user_id, time_stamp)
values($1, $2, $3, $4);
select * from messages
where conv_id = $1;