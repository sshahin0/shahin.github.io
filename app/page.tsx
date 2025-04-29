import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                Shahin
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Blog
              </Link>
              <Link href="/portfolio" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Portfolio
              </Link>
              <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Hi, I'm Shahin
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Software Engineer & Technical Writer
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/portfolio" className="btn-primary">
                View My Work
              </Link>
              <Link href="/blog" className="btn-secondary">
                Read My Blog
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Featured Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add your featured projects here */}
          </div>
        </div>
      </section>
    </div>
  )
} 