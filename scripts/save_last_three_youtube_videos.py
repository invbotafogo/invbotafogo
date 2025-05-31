import requests
import json
import os

API_KEY = os.getenv('YOUTUBE_API_KEY')
CHANNEL_ID = os.getenv('CHANNEL_ID')
MAX_RESULTS = 3

def main():
    params = {
        'key':f'{API_KEY}',
        'channelId':f'{CHANNEL_ID}',
        'part':'snippet,id',
        'order':'date',
        'maxResults':3
    }

    response = requests.get('https://www.googleapis.com/youtube/v3/search', params=params)
    response.raise_for_status()

    with open('videos.json', 'w') as f:
        json.dump(response.json(), f, indent=2)

if __name__ == '__main__':
    main()