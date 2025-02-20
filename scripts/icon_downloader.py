import requests
import time
import os

def download_image(image_url, save_path, max_retries=5, retry_delay=5):
    """
    Downloads an image from a URL and saves it to a specified path.

    Args:
        image_url: The URL of the image.
        save_path: The full path where the image should be saved.
        max_retries: The maximum number of download attempts.
        retry_delay: The delay (in seconds) between retries.
    """

    for attempt in range(max_retries):
        try:
            response = requests.get(image_url, stream=True)
            response.raise_for_status()  # Raise an exception for bad status codes (4xx or 5xx)

            with open(save_path, 'wb') as file:
                for chunk in response.iter_content(chunk_size=8192):
                    file.write(chunk)

            print(f"Image downloaded successfully to {save_path}")
            return  # Exit the function if successful

        except requests.exceptions.RequestException as e:
            print(f"Attempt {attempt + 1}/{max_retries} failed: {e}")
            if attempt < max_retries - 1:
                print(f"Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
            else:
                print(f"Max retries reached. Download failed.")

        except Exception as e:
            print("An unexpected error has occured")
            print(e)

if __name__ == "__main__":
    image_url = "https://i.imgur.com/0fYSJKM.png"
    save_directory = "/root/dayzguessr/viewer/static/images/icons"
    save_filename = "topbar-dayz.png"
    save_path = os.path.join(save_directory, save_filename)

    download_image(image_url, save_path)
