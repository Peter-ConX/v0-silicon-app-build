import { MainNav } from '@/components/layout/MainNav'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, Star, Trash2, Reply, Forward } from 'lucide-react'
import { prisma } from '@/lib/prisma'

async function getMessages(userId: string) {
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId },
        { receiverId: userId },
      ],
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 20,
  })

  return messages
}

export default async function InboxPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    redirect('/login')
  }

  const messages = await getMessages(session.user.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Inbox</h1>
            <p className="text-gray-600">Manage your professional communications</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Compose</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex border-b">
                  <button className="flex-1 px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-medium">
                    Inbox
                  </button>
                  <button className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-50">
                    Starred
                  </button>
                  <button className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-50">
                    Archive
                  </button>
                </div>
                <div className="max-h-[600px] overflow-y-auto">
                  {messages.map((message) => {
                    const otherUser = message.senderId === session.user.id ? message.receiver : message.sender
                    return (
                      <div
                        key={message.id}
                        className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-start space-x-3">
                          <Avatar>
                            <AvatarImage src={otherUser?.image || ''} />
                            <AvatarFallback>
                              {otherUser?.name?.charAt(0).toUpperCase() || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-semibold text-sm truncate">
                                {otherUser?.name || 'Unknown'}
                              </p>
                              <Star className="h-4 w-4 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {message.content.substring(0, 50)}...
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(message.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                {messages.length > 0 ? (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold">Feedback on your portfolio design</h3>
                        <div className="flex items-center space-x-2 mt-2">
                          <Avatar>
                            <AvatarFallback>A</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Alex Morgan</p>
                            <p className="text-xs text-gray-500">alex.morgan@example.com</p>
                            <p className="text-xs text-gray-500">Senior UX Designer</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-2">Today at 10:30 AM</p>
                      <div className="prose max-w-none">
                        <p>Hi there,</p>
                        <p>
                          I took a look at your portfolio and wanted to share some thoughts on
                          the design. Overall, the aesthetic is clean and professional, with
                          good use of white space and typography. The visual hierarchy is clear,
                          and the navigation is intuitive.
                        </p>
                        <p>
                          However, I noticed a few areas that could be improved:
                        </p>
                        <ul>
                          <li>Consider optimizing loading time for project images</li>
                          <li>Add inline validation to the contact form</li>
                          <li>Include more context in case studies</li>
                        </ul>
                        <p>Best regards,<br />Alex</p>
                      </div>
                    </div>
                    <div className="mb-6">
                      <p className="text-sm font-medium mb-2">Attachments</p>
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">portfolio_feedback.pdf</span>
                        <span className="text-xs text-gray-500">1.2 MB</span>
                        <Button variant="outline" size="sm" className="ml-auto">
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="flex space-x-2 mb-6">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Reply className="mr-2 h-4 w-4" />
                        Reply
                      </Button>
                      <Button variant="outline">
                        <Forward className="mr-2 h-4 w-4" />
                        Forward
                      </Button>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar>
                          <AvatarFallback>Y</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">You</p>
                          <p className="text-xs text-gray-500">Replying to Alex Morgan</p>
                        </div>
                      </div>
                      <textarea
                        placeholder="Write your reply..."
                        className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Button className="mt-3 bg-blue-600 hover:bg-blue-700">Send</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No messages yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

