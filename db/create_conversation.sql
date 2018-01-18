insert into conversations (requester_id, request_id, helper_id)
values($1, $2, $3)
returning *;