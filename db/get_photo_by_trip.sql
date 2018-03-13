select * from 
photos 
join trips on trips.trip_id = photos.trip_id
where trips.trip_id = $1;