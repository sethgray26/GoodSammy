select socket_id from users where id = 
(select helper_id from conversations where id = $1)