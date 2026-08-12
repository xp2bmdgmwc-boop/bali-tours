import os
import urllib.request

download_dir = os.path.expanduser("~/Downloads/Timor_Expedition")

photos = {
    "Day_2_Atauro_Island_Blue_Whales.jpg": "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=2000&auto=format&fit=crop",
    "Day_4_Baucau_Heritage.jpg": "https://images.unsplash.com/photo-1533050487297-09b450131914?q=80&w=2000&auto=format&fit=crop"
}

for filename, url in photos.items():
    filepath = os.path.join(download_dir, filename)
    print(f"Downloading {filename}...")
    try:
        urllib.request.urlretrieve(url, filepath)
    except Exception as e:
        print(f"Failed to download {filename}: {e}")

