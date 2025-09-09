import requests
import json
import os
from urllib.parse import urljoin


API_KEY = os.getenv('YOUTUBE_API_KEY')
CHANNEL_ID = os.getenv('CHANNEL_ID')
MAX_RESULTS = 3
MAX_RESULTS_GET = 10
TAG = "pregação"
API_URL = "https://www.googleapis.com/youtube/v3/"

import unicodedata

def norm(s: str) -> str:
    # 1) decompoe (ã -> a + ̃, ç -> c + ¸)
    s = unicodedata.normalize("NFKD", s)
    # 2) remove marcas diacríticas
    s = "".join(ch for ch in s if not unicodedata.combining(ch))
    # 3) case-insensitive robusto
    return s.casefold()

def latest_video_ids(api_key: str, channel_id: str, n: int = 5):
    """
    Retorna até n videoIds mais recentes do canal.
    """
    url = urljoin(API_URL, "search")
    params = {
        "key": api_key,
        "channelId": channel_id,
        'part':'snippet,id',
        "order": "date",
        "maxResults": n,
    }
    resp = requests.get(url, params=params)
    resp.raise_for_status()
    data = resp.json()
    return data


def video_snippets(api_key: str, video_items: list[str]):
    """
    Puxa snippet (inclui title, publishedAt, tags) para uma lista de ids.
    """
    video_ids = [item["id"]["videoId"] for item in video_items.get("items", []) if item.get("id", {}).get("videoId")]

    if not video_ids:
        return []

    url = urljoin(API_URL, "videos")

    params = {
        "part": "snippet",
        "id": ",".join(video_ids),
        "key": api_key,
    }
    resp = requests.get(url, params=params)
    resp.raise_for_status()
    data = resp.json()
    return data.get("items", [])

def filter_without_tag(items: list[dict], culto_tag: str):
    culto_tag = culto_tag.lower()
    kept = []
    for it in items:
        snip = it.get("snippet", {})
        tags = [norm(t) for t in snip.get("tags", [])]  # tags podem não existir
        if norm(culto_tag) in tags:
            kept.append({
                "id": it.get("id"),
                "publishedAt": snip.get("publishedAt"),
                "tags": snip.get("tags", []),
            })

    kept.sort(key=lambda x: x.get("publishedAt", ""), reverse=True)
    return kept

if __name__ == "__main__":
    video_items = latest_video_ids(API_KEY, CHANNEL_ID, MAX_RESULTS_GET)
    items = video_snippets(API_KEY, video_items)
    filtereds = filter_without_tag(items, TAG)

    filtered_ids = [v['id'] for v in filtereds]
    video_items["items"] = [v for v in video_items["items"] if v['id']['videoId'] in filtered_ids][:MAX_RESULTS]

    with open('videos.json', 'w') as f:
        json.dump(video_items, f, indent=2)
