insert into users 
(username, auth_id)
values 
($1,$2)
returning *;