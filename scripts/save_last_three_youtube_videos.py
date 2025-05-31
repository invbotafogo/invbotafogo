import requests
import json
import os

API_KEY = os.getenv('YOUTUBE_API_KEY')
CHANNEL_ID = os.getenv('CHANNEL_ID')
MAX_RESULTS = 3

def get_latest_videos(playlist_id):
    url = f'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={playlist_id}&maxResults={MAX_RESULTS}&key={API_KEY}'
    res = requests.get(url).json()
    videos = []
    for item in res['items']:
        snippet = item['snippet']
        video_id = snippet['resourceId']['videoId']
        videos.append({
            'title': snippet['title'],
            'url': f'https://www.youtube.com/watch?v={video_id}',
            'thumbnail': snippet['thumbnails']['high']['url']
        })
    return videos

def main():
    params = {
        'key':f'{API_KEY}',
        'channelId':f'{CHANNEL_ID}',
        'part':'snippet,id',
        'order':'date',
        'maxResults':3
    }

    response = requests.get('https://www.googleapis.com/youtube/v3/search', params=params)

    with open('videos.json', 'w') as f:
        json.dump(response.json(), f, indent=2)

if __name__ == '__main__':
    main()