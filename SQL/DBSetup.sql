DROP TABLE reviews;
DROP TABLE songs;
DROP TABLE album_artists;
DROP TABLE albums;
DROP TABLE artists;
DROP TABLE user_relationships;
DROP TABLE users;

CREATE TABLE users (
  username VARCHAR(50),
  user_id VARCHAR(128),
  password VARCHAR(128),
  email VARCHAR(50),
  phone VARCHAR(10),
  CONSTRAINT pk_user_id PRIMARY KEY (user_id)
);

CREATE TABLE user_relationships (
  user_id VARCHAR(128),
  follower_id VARCHAR(128),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (follower_id) REFERENCES users(user_id),
  CONSTRAINT pk_user_rels PRIMARY KEY (user_id, follower_id)
);

CREATE TABLE artists (
  artist_name VARCHAR(100),
  artist_id VARCHAR(128),
  bio VARCHAR(256),
  CONSTRAINT pk_artist_id PRIMARY KEY (artist_id)
);

CREATE TABLE albums (
  album_title VARCHAR(100),
  date_released DATE,
  album_id VARCHAR(128),
  album_image VARCHAR(128),
  artist_id VARCHAR(128),
  avg_rating DOUBLE(2,1),
  CONSTRAINT pk_album_id PRIMARY KEY (album_id),
  FOREIGN KEY (artist_id) REFERENCES artists(artist_id)
);

CREATE TABLE album_artists (
  artist_id VARCHAR(128),
  album_id VARCHAR(128),
  FOREIGN KEY (artist_id) REFERENCES artists(artist_id),
  FOREIGN KEY (album_id) REFERENCES albums(album_id),
  CONSTRAINT pk_artist_album_id PRIMARY KEY (artist_id, album_id)
);

CREATE TABLE songs (
  song_title VARCHAR(100),
  track_number INT,
  artist_id VARCHAR(128),
  date_released DATE,
  album_id VARCHAR(128),
  song_id VARCHAR(128),
  avg_rating DOUBLE(2,1),
  CONSTRAINT pk_song_id PRIMARY KEY (song_id),
  FOREIGN KEY (artist_id) REFERENCES albums(artist_id),
  FOREIGN KEY (album_id) REFERENCES albums(album_id)
);

CREATE TABLE album_reviews (
  user_id VARCHAR(128),
  album_id VARCHAR(128),
  album_rating INT,
  songs_ranking VARCHAR(128),
  FOREIGN KEY (album_id) REFERENCES albums(album_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE song_rankings (
  user_id VARCHAR(128),
  song_id VARCHAR(128),
  song_ranking INT,
  CONSTRAINT pk_song_rankings PRIMARY KEY (user_id, song_id, song_ranking),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (song_id) REFERENCES songs(song_id)
);