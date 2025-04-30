from PIL import Image
import os

def convert_webp_to_jpg():
    # Create assets directory if it doesn't exist
    os.makedirs('assets/projects', exist_ok=True)
    
    # List of image files to convert
    image_files = [
        'bg-remover-thumb.webp',
        'gif-maker-thumb.webp',
        'music-video-thumb.webp',
        'sticker-maker-thumb.webp',
        'vintage-camera-thumb.webp',
        'video-crop-thumb.webp'
    ]
    
    for image_file in image_files:
        webp_path = f'assets/projects/{image_file}'
        jpg_path = webp_path.replace('.webp', '.jpg')
        
        try:
            if os.path.exists(webp_path):
                # Open and convert the image
                with Image.open(webp_path) as img:
                    # Convert to RGB mode if necessary
                    if img.mode in ('RGBA', 'LA'):
                        background = Image.new('RGB', img.size, (255, 255, 255))
                        background.paste(img, mask=img.split()[-1])
                        img = background
                    elif img.mode != 'RGB':
                        img = img.convert('RGB')
                    
                    # Save as JPG
                    img.save(jpg_path, 'JPEG', quality=95)
                    print(f'Converted {image_file} to JPG')
                    
                    # Remove the original webp file
                    os.remove(webp_path)
            else:
                print(f'Warning: {webp_path} not found')
        except Exception as e:
            print(f'Error converting {image_file}: {str(e)}')

if __name__ == '__main__':
    convert_webp_to_jpg() 