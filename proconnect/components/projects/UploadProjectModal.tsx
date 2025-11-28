'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { X } from 'lucide-react'

interface UploadProjectModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function UploadProjectModal({ open, onClose, onSuccess }: UploadProjectModalProps) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    githubUrl: '',
    techStack: '',
    featured: false,
  })

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (formData.url && !isValidUrl(formData.url)) {
      newErrors.url = 'Please enter a valid URL'
    }
    
    if (formData.githubUrl && !isValidUrl(formData.githubUrl)) {
      newErrors.githubUrl = 'Please enter a valid GitHub URL'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return

    setLoading(true)
    try {
      const techStackArray = formData.techStack
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0)

      const response = await fetch('/api/projects/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || undefined,
          url: formData.url || undefined,
          githubUrl: formData.githubUrl || undefined,
          techStack: techStackArray,
          featured: formData.featured,
        }),
      })

      if (response.ok) {
        setFormData({
          title: '',
          description: '',
          url: '',
          githubUrl: '',
          techStack: '',
          featured: false,
        })
        setErrors({})
        onClose()
        if (onSuccess) onSuccess()
        // Refresh the page or update the list
        window.location.reload()
      } else {
        const data = await response.json()
        setErrors({ submit: data.error || 'Failed to create project' })
      }
    } catch (error) {
      console.error('Failed to create project:', error)
      setErrors({ submit: 'An error occurred. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Project</DialogTitle>
          <DialogDescription>
            Share your work with the ProConnect community. Fill in the required fields below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Project Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., E-commerce Platform"
              required
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your project, technologies used, challenges solved..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Project URL</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://yourproject.com"
            />
            {errors.url && (
              <p className="text-sm text-red-500">{errors.url}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub Repository</Label>
            <Input
              id="githubUrl"
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/username/repo"
            />
            {errors.githubUrl && (
              <p className="text-sm text-red-500">{errors.githubUrl}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
            <Input
              id="techStack"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              placeholder="React, Node.js, PostgreSQL, TailwindCSS"
            />
            <p className="text-xs text-gray-500">
              Separate technologies with commas
            </p>
          </div>

          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {errors.submit}
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

