import os
import urllib.request

download_dir = os.path.expanduser("~/Downloads/Timor_Expedition")
os.makedirs(download_dir, exist_ok=True)

photos = {
    "Day_1_Dili_Capital_and_Coffee.jpg": "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop",
    "Day_2_Atauro_Island_Blue_Whales.jpg": "https://images.unsplash.com/photo-1568430462989-44163eb1752d?q=80&w=2000&auto=format&fit=crop",
    "Day_3_Maubisse_Mountains.jpg": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop",
    "Day_4_Baucau_Heritage.jpg": "https://images.unsplash.com/photo-1599388339891-66258cc4bcf5?q=80&w=2000&auto=format&fit=crop",
    "Day_5_Jaco_Island_Sacred.jpg": "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2000&auto=format&fit=crop"
}

for filename, url in photos.items():
    filepath = os.path.join(download_dir, filename)
    print(f"Downloading {filename}...")
    try:
        urllib.request.urlretrieve(url, filepath)
    except Exception as e:
        print(f"Failed to download {filename}: {e}")

print(f"All photos downloaded to {download_dir}")
