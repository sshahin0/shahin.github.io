// Medium RSS feed URL for your profile
const MEDIUM_RSS_URL = 'https://medium.com/feed/@shahin.cse.sust';

// Function to fetch and parse Medium RSS feed
async function fetchMediumPosts() {
    try {
        // We'll use a CORS proxy to fetch the RSS feed
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`);
        const data = await response.json();
        
        if (data.status === 'ok') {
            displayMediumPosts(data.items);
        } else {
            throw new Error('Failed to fetch Medium posts');
        }
    } catch (error) {
        console.error('Error fetching Medium posts:', error);
        displayError();
    }
}

// Function to display Medium posts
function displayMediumPosts(posts) {
    const container = document.getElementById('medium-posts');
    container.innerHTML = ''; // Clear loading placeholder
    
    posts.slice(0, 6).forEach(post => { // Display up to 6 posts
        const article = document.createElement('article');
        article.className = 'blog-list-item';
        
        // Format date
        const publishDate = new Date(post.pubDate);
        const formattedDate = publishDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        // Extract reading time from description or use a default
        const readingTime = post.description.includes('min read') 
            ? post.description.match(/(\d+)\s*min read/)[0]
            : '5 min read';
        
        article.innerHTML = `
            <div class="blog-list-content">
                <div class="blog-list-details">
                    <div class="blog-list-header">
                        <div class="blog-author">
                            <img src="${post.author.image || 'https://via.placeholder.com/40'}" alt="${post.author.name}" class="author-avatar">
                            <span class="author-name">${post.author.name}</span>
                        </div>
                        <div class="blog-meta">
                            <span class="blog-date">${formattedDate}</span>
                            <span class="blog-reading-time">${readingTime}</span>
                        </div>
                    </div>
                    <h3>${post.title}</h3>
                    <div class="blog-list-footer">
                        <div class="blog-categories">
                            ${post.categories.slice(0, 2).map(category => 
                                `<span class="blog-category">${category}</span>`
                            ).join('')}
                        </div>
                        <a href="${post.link}" target="_blank" class="read-more">Read More</a>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(article);
    });
}

// Function to display error message
function displayError() {
    const container = document.getElementById('medium-posts');
    container.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>Unable to load Medium posts. Please try again later or <a href="https://medium.com/@shahin.cse.sust" target="_blank">visit my Medium profile</a>.</p>
        </div>
    `;
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', fetchMediumPosts); 