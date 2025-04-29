import os
from PIL import Image, ImageDraw, ImageFont

def create_colored_placeholder(size, text, output_path, bg_color=(200, 200, 200)):
    # Create a new image with a colored background
    img = Image.new('RGB', size, bg_color)
    draw = ImageDraw.Draw(img)
    
    # Calculate text size and position
    font_size = min(size) // 10
    try:
        font = ImageFont.truetype("Arial", font_size)
    except:
        font = ImageFont.load_default()
    
    # Get text size
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    # Calculate text position to center it
    x = (size[0] - text_width) // 2
    y = (size[1] - text_height) // 2
    
    # Draw text
    draw.text((x, y), text, fill=(100, 100, 100), font=font)
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Save the image
    img.save(output_path)

# Create directories if they don't exist
os.makedirs('assets/blog', exist_ok=True)

# Generate blog post images
blog_topics = [
    'SwiftUI Features',
    'Kotlin Coroutines',
    'Material Design',
    'React Native Tips',
    'Flutter Development',
    'iOS Development'
]

for i, topic in enumerate(blog_topics, 1):
    create_colored_placeholder(
        (800, 400),
        f'Blog {i}: {topic}',
        f'assets/blog/blog{i}.jpg'
    )

# Create profile image
create_colored_placeholder(
    (200, 200),
    'Profile',
    'assets/profile.jpg'
) 