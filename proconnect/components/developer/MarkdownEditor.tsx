'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'

export function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('')
  const [preview, setPreview] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Markdown Editor</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreview(!preview)}
          >
            {preview ? 'Edit' : 'Preview'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {preview ? (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="flex min-h-[400px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="# Your Markdown here..."
          />
        )}
      </CardContent>
    </Card>
  )
}
