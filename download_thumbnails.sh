#!/bin/bash

# Create assets directory if it doesn't exist
mkdir -p assets/projects

# Download thumbnails from Play Store and App Store
# Background Remover
curl -L "https://play-lh.googleusercontent.com/Qf1AGG8WBXkKZwwG-bZGKGGJ_kX3YgGzxQyTCHlqWYq-0hbD_0_YUJ_FcEgE4UG6" -o assets/projects/bg-remover-thumb.webp

# GIF Maker
curl -L "https://play-lh.googleusercontent.com/HGfb2ClmDEA6sDFF6GU9GZxFVBfUvJKJ8kvN8gMw_fLRHO-9aI6YPY-DOG0p2M_2" -o assets/projects/gif-maker-thumb.webp

# Music Video Editor
curl -L "https://play-lh.googleusercontent.com/7GhnXq5WqvD5UHQQPJvnJUo2AQX4yyK8LJzqVuO7yZ4hGBzGNvHZqPBNwT9vkHtV" -o assets/projects/music-video-thumb.webp

# Sticker Maker
curl -L "https://play-lh.googleusercontent.com/HGfb2ClmDEA6sDFF6GU9GZxFVBfUvJKJ8kvN8gMw_fLRHO-9aI6YPY-DOG0p2M_2" -o assets/projects/sticker-maker-thumb.webp

# Vintage Camera (App Store)
curl -L "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/8e/e5/7b/8ee57b4f-7bcf-2a19-8e39-726c9b7c45f6/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/230x0w.webp" -o assets/projects/vintage-camera-thumb.webp

# Video Crop
curl -L "https://play-lh.googleusercontent.com/HGfb2ClmDEA6sDFF6GU9GZxFVBfUvJKJ8kvN8gMw_fLRHO-9aI6YPY-DOG0p2M_2" -o assets/projects/video-crop-thumb.webp

echo "Thumbnails downloaded successfully!" 