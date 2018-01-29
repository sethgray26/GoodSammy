delete from messages where conv_id = (select id
from conversations
where request_id= $1);
delete from conversations where id = (select id
from conversations
where request_id= $1);
delete from request where id = $1