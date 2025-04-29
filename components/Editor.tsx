'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

interface EditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

const Editor = ({ value, onChange, className = '' }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`}>
      <div className="border border-gray-300 dark:border-gray-700 rounded-md">
        <div className="border-b border-gray-300 dark:border-gray-700 p-2 flex space-x-2">
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`p-2 rounded ${
              editor?.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
          >
            Bold
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`p-2 rounded ${
              editor?.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
          >
            Italic
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded ${
              editor?.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
          >
            Bullet List
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded ${
              editor?.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
          >
            Numbered List
          </button>
        </div>
        <EditorContent editor={editor} className="p-4" />
      </div>
    </div>
  )
}

export default Editor 