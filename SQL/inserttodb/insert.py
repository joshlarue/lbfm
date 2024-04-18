# THIS IS A SCRIPT TO MANUALLY INPUT TEST ALBUMS


import os
from dotenv import load_dotenv
import random, string
import mysql.connector

# loads environment variables
load_dotenv()

mysql_password = os.getenv('MYSQL_PASSWORD')
mysql_db = os.getenv('MYSQL_DATABASE')
mysql_host = os.getenv('MYSQL_HOST')
mysql_user = os.getenv('MYSQL_USER')

mydb = mysql.connector.connect(
  host=mysql_host,
  user=mysql_user,
  password=mysql_password,
  database=mysql_db,
  auth_plugin='mysql_native_password'
)

mycursor = mydb.cursor()




# randomly generate:  album ratings/5, song ratings/5, and calculate avg rating (will need to do in sql later)
def random_word(length):
  letters = string.ascii_lowercase
  return ''.join(random.choice(letters) for i in range(length))
# DVD Menu,Garden Song,Kyoto,Punisher,Halloween,Chinese Satellite,Moon Song,Savior Complex,ICU,Graceland Too,I Know The End
def get_random_ratings(length):
  ratings = []
  for i in range(length):
    randRating = random.randint(0, 5)
    ratings.append(randRating)
  return ratings

def get_random_song_ids(length):
  ids = []
  for i in range(length):
    randRating = random.getrandbits(128)
    ids.append(randRating)
  return ids

# able to be manually input
artist_name = input("Artist name")
artist_id = random.getrandbits(128)
album_title = input("Album title")
album_id = random.getrandbits(128)
album_ratings = get_random_ratings(10)
date_released = input("Date released (MM_DD_YY)")
song_titles = input("Song titles (separated by commas)")
song_ids = get_random_song_ids(10)
song_ratings = get_random_ratings(10)
artist_id = random.getrandbits(128)
artist_bio = random_word(256)

# calculate avg album rating
album_avg_rating = 0
total = 0
for i in album_ratings:
  total += i
album_avg_rating = total / len(album_ratings)

# calculate avg song rating
song_avg_rating = 0
total = 0
for i in song_ratings:
  total += i
song_avg_rating = total / len(album_ratings)

sql = "INSERT INTO artists (artist_name, artist_id, bio) VALUES (%s, %s, %s)"
val = [
  (artist_name, artist_id, random_word(256))
]
mycursor.executemany(sql, val)

sql = "INSERT INTO albums (album_title, album_id, date_released, artist_id, avg_rating) VALUES (%s, %s, %s, %s, %s)"
val = [
  (album_title, album_id, date_released, artist_id, album_avg_rating)
]
mycursor.executemany(sql, val)

sql = "INSERT INTO album_artists (artist_id, album_id) VALUES (%s, %s)"
val = [
  (artist_id, album_id)
]
mycursor.executemany(sql, val)

# map list of songs to vals to send to db
list_of_songs = song_titles.split(",")
print(list_of_songs)

val = []
for (i, song_title_) in enumerate(list_of_songs):
  val.append((song_title_, random.getrandbits(3), artist_id, date_released, album_id, random.getrandbits(128), song_avg_rating))

sql = "INSERT INTO songs (song_title, duration, artist_id, date_released, album_id, song_id, avg_rating) VALUES (%s, %s, %s, %s, %s, %s, %s)"
mycursor.executemany(sql, val)

mydb.commit()