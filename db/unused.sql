select * from request
Join conversations on request_id = request.id
 Join messages on conv_id = conversations.id 
 Where request.id = 54 