SELECT album_title, artist_name, avg_rating, al.album_id
FROM albums al, artists ar, album_artists aa
WHERE al.album_id = aa.album_id
AND al.artist_id = aa.artist_id
AND aa.artist_id = ar.artist_id;