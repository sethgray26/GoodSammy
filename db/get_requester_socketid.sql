select socket_id from users where id = 
(select requester_id from conversations where id = $1)