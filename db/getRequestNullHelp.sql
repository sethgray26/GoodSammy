select request.* , category.name as cat_name from request 
join category on category.id = request.category_id 
WHERE help_id is null and user_id != $1
-- and where user_id is $1
ORDER BY request.id 
