select * , category.name as cat_name from request 
join category on category.id = request.category_id
ORDER BY request.id DESC 