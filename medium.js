// Configuration
const CONFIG = {
    MEDIUM_USERNAME: 'shahin.cse.sust',
    RSS2JSON_API_KEY: 'eh3420igjkzhtpfnfybwncw6g3vfybiqbtm04woc',
    MAX_POSTS: 100,
    WORDS_PER_MINUTE: 200
};

// Medium RSS feed URL
const MEDIUM_RSS_URL = `https://medium.com/@${CONFIG.MEDIUM_USERNAME}/feed`;

// Function to fetch and parse Medium RSS feed
async function fetchMediumPosts() {
    try {
        // Use RSS2JSON API with higher item count and detailed content
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}&api_key=${CONFIG.RSS2JSON_API_KEY}&count=${CONFIG.MAX_POSTS}&full_content=1`);
        const data = await response.json();
        
        if (data.status === 'ok') {
            console.log('Fetched posts:', data.items.length);
            displayMediumPosts(data.items);
        } else {
            throw new Error('Failed to fetch Medium posts');
        }
    } catch (error) {
        console.error('Error fetching Medium posts:', error);
        // Fallback to scraping the Medium profile page
        try {
            const response = await fetch(`https://mediumpostsapi.vercel.app/api/posts/${CONFIG.MEDIUM_USERNAME}`);
            const data = await response.json();
            if (data.posts && data.posts.length > 0) {
                displayMediumPosts(data.posts);
            } else {
                throw new Error('No posts found');
            }
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
            displayError();
        }
    }
}

// Function to extract image from content
function extractImage(content) {
    const div = document.createElement('div');
    div.innerHTML = content;
    const img = div.querySelector('img');
    return img ? img.src : null;
}

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

// Function to estimate reading time
function estimateReadingTime(content) {
    const wordsPerMinute = CONFIG.WORDS_PER_MINUTE;
    const div = document.createElement('div');
    div.innerHTML = content;
    const text = div.textContent || div.innerText;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
}

// Function to truncate text
function truncateText(text, maxLength = 150) {
    if (text.length <= maxLength) return text;
    return text.substr(0, text.lastIndexOf(' ', maxLength)) + '...';
}

// Function to display Medium posts
function displayMediumPosts(posts) {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;

    // Clear existing content
    blogGrid.innerHTML = '';

    // Display all posts (no slice)
    posts.forEach(post => {
        const thumbnail = post.thumbnail || extractImage(post.content) || 'assets/blog/default-blog.jpg';
        const readingTime = estimateReadingTime(post.content);
        const description = truncateText(post.description || post.content.replace(/<[^>]*>/g, ''));
        const formattedDate = formatDate(post.pubDate || post.date);

        const article = document.createElement('article');
        article.className = 'blog-card';
        
        article.innerHTML = `
            <img src="${thumbnail}" alt="${post.title}" onerror="this.src='assets/blog/default-blog.jpg'">
            <div class="blog-content">
                <div class="blog-meta">
                    <span>${formattedDate}</span>
                    <span>${readingTime}</span>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-description">${description}</p>
                <div class="blog-author">
                    <img src="assets/profile.jpg" alt="Shahin" class="author-avatar">
                    <div class="author-info">
                        <span class="author-name">Shahin</span>
                        <a href="${post.link}" target="_blank" class="read-more">Read More →</a>
                    </div>
                </div>
            </div>
        `;
        
        blogGrid.appendChild(article);
    });

    // Add a "Load More" button if there are many posts
    if (posts.length > 9) {
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.className = 'load-more-btn';
        loadMoreBtn.innerHTML = 'Load More Posts';
        loadMoreBtn.onclick = function() {
            const hiddenPosts = document.querySelectorAll('.blog-card.hidden');
            hiddenPosts.forEach((post, index) => {
                if (index < 9) {
                    post.classList.remove('hidden');
                }
            });
            if (document.querySelectorAll('.blog-card.hidden').length === 0) {
                loadMoreBtn.style.display = 'none';
            }
        };
        blogGrid.appendChild(loadMoreBtn);

        // Initially hide posts after the first 9
        const allPosts = document.querySelectorAll('.blog-card');
        allPosts.forEach((post, index) => {
            if (index >= 9) {
                post.classList.add('hidden');
            }
        });
    }
}

// Function to display error message
function displayError() {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;

    blogGrid.innerHTML = `
        <div class="error-message">
            <p>Unable to load Medium posts at the moment.</p>
            <p>Please visit my <a href="https://medium.com/@${CONFIG.MEDIUM_USERNAME}" target="_blank">Medium profile</a> directly.</p>
            <button onclick="fetchMediumPosts()" class="retry-button">
                <i class="fas fa-sync-alt"></i> Retry
            </button>
        </div>
    `;
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', fetchMediumPosts); 