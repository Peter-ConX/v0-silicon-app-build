import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'

async function getUserBooks(userId: string) {
  const userBooks = await prisma.userBook.findMany({
    where: { userId },
    include: {
      book: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return userBooks
}

export default async function LibraryPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    redirect('/login')
  }

  const userBooks = await getUserBooks(session.user.id)

  const booksByStatus = {
    want_to_read: userBooks.filter((ub) => ub.status === 'want_to_read'),
    reading: userBooks.filter((ub) => ub.status === 'reading'),
    completed: userBooks.filter((ub) => ub.status === 'completed'),
  }

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Library</h1>
            <p className="text-muted-foreground">
              Track what you're reading and discover books from your network
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Book
          </Button>
        </div>

        {/* Want to Read */}
        {booksByStatus.want_to_read.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Want to Read</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {booksByStatus.want_to_read.map((userBook) => (
                <Card key={userBook.id}>
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <div className="w-16 h-24 bg-muted rounded flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{userBook.book.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {userBook.book.author}
                        </p>
                        <Badge variant="outline">Want to Read</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Currently Reading */}
        {booksByStatus.reading.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Currently Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {booksByStatus.reading.map((userBook) => (
                <Card key={userBook.id}>
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <div className="w-16 h-24 bg-muted rounded flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{userBook.book.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {userBook.book.author}
                        </p>
                        <Badge>Reading</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Completed */}
        {booksByStatus.completed.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Completed</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {booksByStatus.completed.map((userBook) => (
                <Card key={userBook.id}>
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <div className="w-16 h-24 bg-muted rounded flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{userBook.book.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {userBook.book.author}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">Completed</Badge>
                          {userBook.rating && (
                            <span className="text-sm text-muted-foreground">
                              ⭐ {userBook.rating}/5
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {userBooks.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No books in your library yet</p>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Book
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
