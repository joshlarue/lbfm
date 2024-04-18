# THIS IS A SCRIPT TO MANUALLY INPUT TEST ALBUMS


import os
import hashlib
from dotenv import load_dotenv
# loads environment variables
load_dotenv()
import random, string
import mysql.connector
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import requests
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

def hash_string(string):
  encoded_string = string.encode()
  hasher = hashlib.sha256()
  hasher.update(encoded_string)
  return hasher.hexdigest()


AUTH_URL = 'https://accounts.spotify.com/api/token'
auth_response = requests.post(AUTH_URL, {
  'grant_type': 'client_credentials',
  'client_id': os.getenv("SPOTIPY_CLIENT_ID"),
  'client_secret': os.getenv("SPOTIPY_CLIENT_SECRET")
})
auth_response_data = auth_response.json()
access_token = auth_response_data['access_token']
print(access_token)


BASE_URL = 'https://api.spotify.com/v1/'
headers = {
    'Authorization': 'Bearer {token}'.format(token=access_token)
}

# my kitchen sync playlist id
playlist_id = '2ZqjemHmfmmpVomtt85Vd3'

for x in range(3, 27):
  
  r = requests.get(BASE_URL + f'playlists/{playlist_id}/tracks?offset={x*100}', headers=headers)
  r = r.json()
  print(len(r['items']))

  for i in range(len(r['items'])):
    # gets release date of album
    date_released = r['items'][i]['track']['album']['release_date']
    
    # gets name of album of track
    album_title = r['items'][i]['track']['album']['name']

    # gets name of title of track
    song_title = r['items'][i]['track']['name']

    # gets name of artist
    artist_name = r['items'][i]['track']['album']['artists'][0]['name']

    # able to be manually input
    #artist_name = input("Artist name: ")
    artist_id = hash_string(artist_name)
    #album_title = input("Album title: ")
    album_id = hash_string(album_title)
    album_ratings = get_random_ratings(10)
    # date_released = input("Date released (MM_DD_YY): ")
    # song_titles = input("Song titles (separated by commas): ")
    # song_ids = get_random_song_ids(10)
    song_ratings = get_random_ratings(10)
    artist_bio = hash_string(artist_name + artist_id)

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

    sql = "INSERT IGNORE INTO artists (artist_name, artist_id, bio) VALUES (%s, %s, %s)"
    val = [
      (artist_name, artist_id, artist_bio)
    ]
    mycursor.executemany(sql, val)

    sql = "INSERT IGNORE INTO albums (album_title, album_id, date_released, artist_id, avg_rating) VALUES (%s, %s, %s, %s, %s)"
    val = [
      (album_title, album_id, date_released, artist_id, album_avg_rating)
    ]
    mycursor.executemany(sql, val)

    sql = "INSERT IGNORE INTO album_artists (artist_id, album_id) VALUES (%s, %s)"
    val = [
      (artist_id, album_id)
    ]
    mycursor.executemany(sql, val)

    # map list of songs to vals to send to db
    # list_of_songs = song_titles.split(",")
    # print(list_of_songs)

    # very cool but unfortunately i don't need it right now
    # val = []
    # for (i, song_title_) in enumerate(list_of_songs):
    #   val.append((song_title_, random.getrandbits(3), artist_id, date_released, album_id, random.getrandbits(128), song_avg_rating))

    sql = "INSERT IGNORE INTO songs (song_title, duration, artist_id, date_released, album_id, song_id, avg_rating) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    val = []
    val.append((song_title, random.getrandbits(3), artist_id, date_released, album_id, random.getrandbits(128), song_avg_rating))
    mycursor.executemany(sql, val)

    mydb.commit()