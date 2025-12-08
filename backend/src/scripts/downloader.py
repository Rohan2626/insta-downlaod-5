import sys
import json
import yt_dlp
import sys
import io

# Force stdin, stdout and stderr to be utf-8
sys.stdin = io.TextIOWrapper(sys.stdin.buffer, encoding='utf-8')
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

def get_video_info(url):
    ydl_opts = {
        'format': 'best',
        'quiet': True,
        'no_warnings': True,
        'dump_single_json': True,
        'extract_flat': False,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            # Extract relevant fields
            result = {
                'success': True,
                'title': info.get('title'),
                'description': info.get('description'), # Caption
                'tags': info.get('tags'), # Hashtags
                'thumbnail': info.get('thumbnail'),
                'duration': info.get('duration_string') or str(info.get('duration')),
                'downloadUrls': [info.get('url')],
                'original_url': url
            }
            return result
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

if __name__ == "__main__":
    if len(sys.argv) > 1:
        url = sys.argv[1]
        result = get_video_info(url)
        print(json.dumps(result))
    else:
        print(json.dumps({'success': False, 'error': 'No URL provided'}))
