select * from trips
join users on users.user_id = trips.user_id
where users.user_id = $1
order by trip_id;