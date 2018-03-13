insert into trips
(user_id, trip_name, starting_loc, destination, start_date, end_date, travel_time, total_miles)
values
($1,$2,$3,$4,$5,$6,$7,$8);

	-- "user_id": "1",
	-- "trip_name":"San Francisco", 
	-- "starting_loc": "Spanish Fork, Utah",
	-- "destination":"San Francisco, California",
	-- "start_date": "February 3, 2017", 
	-- "end_date": "February 7, 2017",
	-- "travel_time": "13h 30m",
	-- "total_miles": "700"