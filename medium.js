// Medium RSS feed URL for your profile
const MEDIUM_RSS_URL = 'https://medium.com/feed/@shahin.cse.sust';

// Function to fetch and parse Medium RSS feed
async function fetchMediumPosts() {
    try {
        // We'll use a CORS proxy to fetch the RSS feed
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}&count=50`);
        const data = await response.json();
        
        if (data.status === 'ok') {
            console.log('Fetched posts:', data.items.length); // Debug log
            displayMediumPosts(data.items);
            setupCategoryTabs(data.items);
        } else {
            throw new Error('Failed to fetch Medium posts');
        }
    } catch (error) {
        console.error('Error fetching Medium posts:', error);
        displayError();
    }
}

// Function to check if a post belongs to a specific category
function isPostInCategory(post, category) {
    const tags = post.categories.map(tag => tag.toLowerCase());
    
    // Define category-specific tags
    const androidTags = [
        'android', 'kotlin', 'java', 'android development', 
        'android app', 'android studio', 'mobile development'
    ];
    
    const iosTags = [
        'ios', 'swift', 'swiftui', 'apple', 'iphone', 
        'ipad', 'mobile development'
    ];
    
    const aiTags = [
        'ai', 'artificial intelligence', 'machine learning', 
        'deep learning', 'neural network', 'ml'
    ];
    
    // Check if post belongs to any specific category
    const isAndroid = tags.some(tag => androidTags.some(androidTag => tag.includes(androidTag)));
    const isIOS = tags.some(tag => iosTags.some(iosTag => tag.includes(iosTag)));
    const isAI = tags.some(tag => aiTags.some(aiTag => tag.includes(aiTag)));
    
    switch(category) {
        case 'android':
            return isAndroid;
        case 'ios':
            return isIOS;
        case 'ai':
            return isAI;
        case 'others':
            // A post goes to Others if it doesn't belong to any other category
            return !(isAndroid || isIOS || isAI);
        default:
            return true; // 'all' category shows everything
    }
}

// Function to display Medium posts
function displayMediumPosts(posts, category = 'all') {
    const container = document.getElementById('medium-posts');
    container.innerHTML = ''; // Clear loading placeholder
    
    // Filter posts by category
    const filteredPosts = category === 'all' 
        ? posts 
        : posts.filter(post => isPostInCategory(post, category));
    
    console.log(`Displaying ${filteredPosts.length} posts for category: ${category}`); // Debug log
    
    // Sort posts by date (newest first)
    filteredPosts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    
    // Display all posts instead of limiting to 6
    filteredPosts.forEach(post => {
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
        
        // Format clap count
        const clapCount = post.likes || 0;
        const formattedClaps = clapCount >= 1000 
            ? `${(clapCount / 1000).toFixed(1)}K` 
            : clapCount.toString();
        
        article.innerHTML = `
            <div class="blog-list-content">
                <div class="blog-thumbnail">
                    <img src="${post.thumbnail || 'https://via.placeholder.com/100x100'}" alt="${post.title}">
                </div>
                <div class="blog-list-details">
                    <div class="blog-list-header">
                        <div class="blog-author">
                            <img src="${post.author.image || 'https://via.placeholder.com/40'}" alt="${post.author.name}" class="author-avatar">
                            <span class="author-name">${post.author.name}</span>
                        </div>
                        <div class="blog-meta">
                            <span class="blog-date">${formattedDate}</span>
                            <span class="blog-reading-time">${readingTime}</span>
                            <span class="blog-claps">
                                <i class="fas fa-hands-clapping"></i>
                                ${formattedClaps}
                            </span>
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

// Function to setup category tabs
function setupCategoryTabs(posts) {
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            // Filter and display posts
            const category = tab.dataset.category;
            displayMediumPosts(posts, category);
        });
    });
}

// Function to display error message
function displayError() {
    const container = document.getElementById('medium-posts');
    container.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>Unable to load Medium posts. Please try again later or <a href="https://medium.com/@shahin.cse.sust" target="_blank">visit my Medium profile</a>.</p>
            <button class="retry-button" onclick="fetchMediumPosts()">
                <i class="fas fa-sync-alt"></i> Retry
            </button>
        </div>
    `;
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', fetchMediumPosts); 