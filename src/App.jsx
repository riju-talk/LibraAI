"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ScrollArea } from "../components/ui/scroll-area"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import {
  Send,
  Paperclip,
  ImageIcon,
  FileText,
  Scale,
  Search,
  BookOpen,
  Gavel,
  Plus,
  MessageSquare,
  Settings,
  History,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react"

import './App.css'

function App() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content:
        "Hello! I'm Libra AI, your legal research assistant. I can help you with case analysis, document review, legal research, and more. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [chatSessions] = useState([
    {
      id: "1",
      title: "Contract Analysis - Tech Startup",
      lastMessage: "Review completed with 3 potential issues identified",
      timestamp: new Date(Date.now() - 3600000),
      type: "document-review",
    },
    {
      id: "2",
      title: "Precedent Research - IP Law",
      lastMessage: "Found 12 relevant cases from 2020-2024",
      timestamp: new Date(Date.now() - 7200000),
      type: "legal-research",
    },
    {
      id: "3",
      title: "Case Brief - Smith v. Johnson",
      lastMessage: "Summary and key points extracted",
      timestamp: new Date(Date.now() - 86400000),
      type: "case-analysis",
    },
  ])

  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !selectedFile) return

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue || `Uploaded file: ${selectedFile?.name}`,
      sender: "user",
      timestamp: new Date(),
      type: selectedFile ? "file" : "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setSelectedFile(null)
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: selectedFile
          ? `I've analyzed the uploaded document "${selectedFile.name}". Based on my review, I've identified several key legal considerations and potential areas of concern. Would you like me to provide a detailed breakdown of the findings?`
          : `I understand you're asking about "${inputValue}". Let me provide you with a comprehensive legal analysis based on current jurisprudence and relevant statutes. This analysis will include precedent cases, applicable laws, and practical recommendations.`,
        sender: "ai",
        timestamp: new Date(),
        type: selectedFile ? "analysis" : "text",
        metadata: {
          confidence: 0.94,
          jurisdiction: "Federal",
        },
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const getSessionIcon = (type) => {
    switch (type) {
      case "case-analysis":
        return <Gavel className="w-4 h-4" />
      case "document-review":
        return <FileText className="w-4 h-4" />
      case "legal-research":
        return <Search className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  return (
    <div className="flex h-screen bg-navy-950 text-slate-100">
      {/* Sidebar */}
      <div className="w-80 bg-navy-900 border-r border-navy-700 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-navy-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6 text-navy-900" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Libra AI</h1>
              <p className="text-sm text-yellow-300">Legal Research Assistant</p>
            </div>
          </div>
          <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-navy-900 font-medium border-0">
            <Plus className="w-4 h-4 mr-2" />
            New Legal Query
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-navy-700 bg-navy-800">
          <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-auto p-3 flex flex-col items-center gap-1 border-navy-600 hover:bg-navy-700 hover:border-yellow-500"
            >
              <Gavel className="w-5 h-5 text-yellow-500" />
              <span className="text-xs">Case Analysis</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-auto p-3 flex flex-col items-center gap-1 border-navy-600 hover:bg-navy-700 hover:border-yellow-500"
            >
              <FileText className="w-5 h-5 text-yellow-500" />
              <span className="text-xs">Doc Review</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-auto p-3 flex flex-col items-center gap-1 border-navy-600 hover:bg-navy-700 hover:border-yellow-500"
            >
              <Search className="w-5 h-5 text-yellow-500" />
              <span className="text-xs">Research</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-auto p-3 flex flex-col items-center gap-1 border-navy-600 hover:bg-navy-700 hover:border-yellow-500"
            >
              <BookOpen className="w-5 h-5 text-yellow-500" />
              <span className="text-xs">Precedents</span>
            </Button>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Recent Sessions</h3>
            <History className="w-4 h-4 text-yellow-300" />
          </div>
          <ScrollArea className="h-full">
            <div className="space-y-2">
              {chatSessions.map((session) => (
                <Card
                  key={session.id}
                  className="bg-navy-800 border-navy-700 hover:bg-navy-750 hover:border-yellow-500/50 cursor-pointer transition-colors"
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="p-1 rounded bg-yellow-500/20 text-yellow-300">{getSessionIcon(session.type)}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white truncate">{session.title}</h4>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2">{session.lastMessage}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-yellow-300">{session.timestamp.toLocaleDateString()}</span>
                      {session.type === "document-review" && (
                        <Badge className="bg-yellow-500 text-navy-900 text-xs">Review</Badge>
                      )}
                      {session.type === "case-analysis" && (
                        <Badge className="bg-yellow-500 text-navy-900 text-xs">Case</Badge>
                      )}
                      {session.type === "legal-research" && (
                        <Badge className="bg-yellow-500 text-navy-900 text-xs">Research</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Settings */}
        <div className="p-4 border-t border-navy-700 bg-navy-800">
          <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-navy-700">
            <Settings className="w-4 h-4 mr-2" />
            Settings & Preferences
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-navy-700 bg-navy-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Legal Research Session</h2>
              <p className="text-sm text-yellow-300">AI-powered legal analysis and research</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-600 text-white border-0">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                Online
              </Badge>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 bg-navy-950">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "ai" && (
                  <Avatar className="w-8 h-8 bg-yellow-500">
                    <AvatarFallback className="bg-yellow-500 text-navy-900 text-sm">
                      <Scale className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={`max-w-[70%] ${message.sender === "user" ? "order-first" : ""}`}>
                  <Card
                    className={`${
                      message.sender === "user" ? "bg-navy-700 border-navy-600" : "bg-navy-800 border-navy-700"
                    }`}
                  >
                    <CardContent className="p-4">
                      <p className={`text-sm ${message.sender === "user" ? "text-white" : "text-slate-200"}`}>
                        {message.content}
                      </p>

                      {message.metadata && (
                        <div className="mt-3 pt-3 border-t border-navy-600">
                          <div className="flex items-center gap-4 text-xs text-yellow-300">
                            {message.metadata.confidence && (
                              <div className="flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                <span>Confidence: {(message.metadata.confidence * 100).toFixed(0)}%</span>
                              </div>
                            )}
                            {message.metadata.jurisdiction && (
                              <div className="flex items-center gap-1">
                                <Scale className="w-3 h-3" />
                                <span>{message.metadata.jurisdiction}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div
                    className={`text-xs text-slate-400 mt-1 ${message.sender === "user" ? "text-right" : "text-left"}`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>

                {message.sender === "user" && (
                  <Avatar className="w-8 h-8 bg-navy-600">
                    <AvatarFallback className="bg-navy-600 text-white text-sm">U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8 bg-yellow-500">
                  <AvatarFallback className="bg-yellow-500 text-navy-900 text-sm">
                    <Scale className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <Card className="bg-navy-800 border-navy-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Legal Tools Bar */}
        <div className="flex items-center gap-1 px-4 py-2 bg-navy-800 border-t border-navy-700">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs flex items-center gap-1 text-yellow-300 hover:text-white"
          >
            <CheckCircle className="w-3 h-3" />
            <span>Verify Citations</span>
          </Button>
          <span className="text-navy-600">|</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs flex items-center gap-1 text-yellow-300 hover:text-white"
          >
            <AlertCircle className="w-3 h-3" />
            <span>Risk Assessment</span>
          </Button>
          <span className="text-navy-600">|</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs flex items-center gap-1 text-yellow-300 hover:text-white"
          >
            <Clock className="w-3 h-3" />
            <span>Timeline Builder</span>
          </Button>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-navy-700 bg-navy-800">
          <div className="max-w-4xl mx-auto">
            {selectedFile && (
              <div className="mb-3 p-3 bg-navy-700 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-white">{selectedFile.name}</span>
                  <Badge className="bg-yellow-500 text-navy-900 text-xs">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ×
                </Button>
              </div>
            )}

            <div className="flex gap-2">
              <div className="flex gap-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-slate-300 border-navy-600 hover:border-yellow-500 hover:text-white"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-slate-300 border-navy-600 hover:border-yellow-500 hover:text-white"
                >
                  <ImageIcon className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about legal cases, analyze documents, or research precedents..."
                  className="bg-navy-700 border-navy-600 text-white placeholder-slate-400 pr-12 focus:border-yellow-500 focus:ring-yellow-500/20"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() && !selectedFile}
                  className="absolute right-1 top-1 h-8 w-8 p-0 bg-yellow-500 hover:bg-yellow-600 text-navy-900 disabled:opacity-50 disabled:bg-navy-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
              <span>Libra AI can analyze legal documents, research case law, and provide legal insights.</span>
              <span>Press Enter to send</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
