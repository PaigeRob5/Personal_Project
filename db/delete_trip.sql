delete from photos 
where trip_id = $1;

delete from trips 
where trip_id = $1;