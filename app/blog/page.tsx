import { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'

export const metadata: Metadata = {
  title: 'Blog - Shahin',
  description: 'Read my latest articles and thoughts on software development and technology.',
}

async function getMediumPosts() {
  try {
    const response = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@shahin.cse.sust',
      { next: { revalidate: 3600 } }
    )
    const data = await response.json()
    return data.items || []
  } catch (error) {
    console.error('Error fetching Medium posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getMediumPosts()

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Blog
          </h1>
          
          {/* Blog Editor Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Write a New Post
            </h2>
            <Link href="/blog/editor" className="btn-primary">
              Create New Post
            </Link>
          </section>

          {/* Medium Posts Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              Latest from Medium
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <motion.article
                  key={post.guid}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  {post.thumbnail && (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.description.substring(0, 150)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(post.pubDate).toLocaleDateString()}
                      </span>
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
} 