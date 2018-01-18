insert into users (username, password, phone )
    values ($1,$2,$3)

    returning * ;
    
    -- select * from users where id=2;
    