update trips
set trip_name =$2, start_date =$3, end_date = $4
where trip_id = $1
returning *;