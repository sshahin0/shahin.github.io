'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

export default function BlogEditorPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically save the post to your database
      console.log('Saving post:', { title, content })
      // Reset form
      setTitle('')
      setContent('')
    } catch (error) {
      console.error('Error saving post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Write a New Post
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-800 dark:border-gray-700"
                required
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Content
              </label>
              <div className="mt-1">
                <Editor
                  value={content}
                  onChange={setContent}
                  className="min-h-[400px] rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Post'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
} 