from flask_app import app
from flask import redirect, render_template, request, jsonify
import flask_app.config.config
from flask_app.models.review_model import Review
from flask_app.controllers.helpers import login_required, sp

@app.route('/music/search') # Search Music Form
@login_required
def search_music_form():
    return render_template('music_search.html') 

@app.route('/music/search', methods=['POST']) # Search Music (By Artist, Album, and Track) 
@login_required
def search_music():
    search_input = request.form['search_input']
    search_category = request.form['search_category']
    search_results = sp.search(search_input, limit=16, offset=0, type=search_category, market=None) # query spotify db with user input

    if search_category == "album": # By Album
        all_albums = []
        for album in search_results['albums']['items']:
            one_album = {
                'album_id': album['id'],  
                'album_name': album['name'],
                'artist_name': album['artists'][0]['name'],
                "album_img": album['images'][0]['url']
            }
            all_albums.append(one_album)
        return jsonify(all_albums)

    if search_category == "track": # By Track
        all_tracks = []
        for track in search_results['tracks']['items']:
            one_track = {
                'track_id': track['id'],
                'track_name': track['name'],
                'album_id': track['album']['id'],
                'album_name': track['album']['name'],
                'artist_name': track['artists'][0]['name'],
                'album_img': track['album']['images'][0]['url']
            }
            all_tracks.append(one_track)
        return jsonify(all_tracks)

    if search_category == "artist": # By Artist
        all_artists = []
        for artist in search_results['artists']['items']:
            one_artist = {
                'artist_id': artist['id'],
                'artist_name': artist['name'],
                'artist_img': artist['images'][0]['url'] if len(artist['images']) > 0 else None
            }
            all_artists.append(one_artist)
        return jsonify(all_artists)

@app.route('/music/view/<string:album_id>') # View Album (or Track)
@login_required
def view_album(album_id):
    album_results = sp.album(album_id) # Query Spotify db for an album's data
    album_tracks_results = sp.album_tracks(album_id)# Query Spotify db for an alum's track list data

    album_tracks = []
    for item in album_tracks_results['items']:
        album_tracks.append(item['name'])

    album_data = {
        "album_id": album_results['id'],
        "album_name": album_results['name'],
        "artist_name": album_results['artists'][0]['name'],
        "album_img": album_results['images'][0]['url'],
        "album_tracks": album_tracks
    }

    reviews = Review.get_all_by_album_id({'album_id': album_id}) # Query db for reviews of album
    all_reviews = []
    average_rating = 0
    for review in reviews:
        average_rating += review.rating
        this_review = {
            'id': review.id,
            'album_name': review.album_name,
            'artist_name': review.artist_name,
            'img_url': review.img_url,
            'date': review.date,
            'rating': review.rating,
            'text': review.text,
            'created_at': review.created_at,
            'updated_at': review.updated_at,
            'user_id': review.user_id,
            'username': review.user.username,
            'first_name': review.user.first_name,
            'last_name': review.user.last_name,
        }
        all_reviews.append(this_review)

    if len(all_reviews) > 0:
        average_rating = average_rating / len(all_reviews)

    return render_template('album_view.html', album_data=album_data, all_reviews=all_reviews, average_rating=average_rating)

@app.route('/music/view/artist/<string:artist_id>') # TODO View Artist
@login_required
def view_artist(artist_id):
    print(artist_id)
    # TODO Query Spotify db for an artist's data
    # TODO Query Spotify db for an artist's albums data
    # TODO Query db for reviews by artist
    # TODO Parse through artist's data
    # TODO Parse through artist's albums data
    # TODO Parse through reviews
    # TODO Calculate average rating
    return render_template('artist_view.html')