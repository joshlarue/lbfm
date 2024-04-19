DROP TABLE reviews;
DROP TABLE songs;
DROP TABLE album_artists;
DROP TABLE albums;
DROP TABLE artists;
DROP TABLE users;

CREATE TABLE users (
  username VARCHAR(50),
  user_id VARCHAR(128),
  pass BLOB,
  email VARCHAR(50),
  phone VARCHAR(10),
  CONSTRAINT pk_user_id PRIMARY KEY (user_id)
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
  album_image LONGBLOB,
  artist_id VARCHAR(128),
  avg_rating DOUBLE(2,1),
  CONSTRAINT pk_album_id PRIMARY KEY (album_id),
  FOREIGN KEY (artist_id) REFERENCES artists(artist_id)
);

CREATE TABLE test (
  album_img BLOB
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
  duration DOUBLE(5,2),
  artist_id VARCHAR(128),
  date_released DATE,
  album_id VARCHAR(128),
  song_id VARCHAR(128),
  avg_rating DOUBLE(2,1),
  CONSTRAINT pk_song_id PRIMARY KEY (song_id),
  FOREIGN KEY (artist_id) REFERENCES albums(artist_id),
  FOREIGN KEY (album_id) REFERENCES albums(album_id)
);

CREATE TABLE reviews (
  song_id VARCHAR(128),
  song_rating INTEGER(1),
  song_review VARCHAR(128),
  album_id VARCHAR(128),
  album_rating INTEGER(1),
  album_review VARCHAR(128),
  date_of_review DATE,
  user_id VARCHAR(128),
  FOREIGN KEY (song_id) REFERENCES songs(song_id),
  FOREIGN KEY (album_id) REFERENCES albums(album_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
