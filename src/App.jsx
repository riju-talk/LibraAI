"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ScrollArea } from "../components/ui/scroll-area"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
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
  Menu,
  X,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Brain,
  Target,
} from "lucide-react"

import './App.css'

function App() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content:
        "Welcome to Libra AI, your advanced legal research companion. I specialize in case analysis, document review, precedent research, and legal strategy development. I'm equipped with the latest legal databases and can provide insights across multiple jurisdictions. How may I assist with your legal research today?",
      sender: "ai",
      timestamp: new Date(),
      type: "text",
      metadata: {
        confidence: 0.98,
        jurisdiction: "Multi-jurisdictional",
        sources: 12,
      },
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatSessions] = useState([
    {
      id: "1",
      title: "M&A Due Diligence Review",
      lastMessage: "Identified 7 critical compliance issues requiring immediate attention",
      timestamp: new Date(Date.now() - 1800000),
      type: "document-review",
      status: "completed",
      priority: "high",
    },
    {
      id: "2",
      title: "IP Portfolio Analysis",
      lastMessage: "Patent landscape analysis complete - 24 relevant patents found",
      timestamp: new Date(Date.now() - 3600000),
      type: "legal-research",
      status: "completed",
      priority: "medium",
    },
    {
      id: "3",
      title: "Contract Negotiation Strategy",
      lastMessage: "Risk assessment and negotiation points prepared",
      timestamp: new Date(Date.now() - 7200000),
      type: "case-analysis",
      status: "in-progress",
      priority: "high",
    },
    {
      id: "4",
      title: "Regulatory Compliance Check",
      lastMessage: "GDPR and CCPA compliance review initiated",
      timestamp: new Date(Date.now() - 86400000),
      type: "compliance",
      status: "pending",
      priority: "low",
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
      content: inputValue || `Document uploaded: ${selectedFile?.name}`,
      sender: "user",
      timestamp: new Date(),
      type: selectedFile ? "file" : "text",
      file: selectedFile,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setSelectedFile(null)
    setIsTyping(true)

    // Simulate AI response with realistic legal AI behavior
    setTimeout(() => {
      const responses = [
        {
          content: `I've completed a comprehensive analysis of your query. Based on current jurisprudence and statutory frameworks, I've identified several key legal considerations. The analysis includes precedent cases from the past 5 years, applicable regulations, and strategic recommendations. Would you like me to elaborate on any specific aspect?`,
          metadata: { confidence: 0.96, jurisdiction: "Federal & State", sources: 18 }
        },
        {
          content: `Your document has been thoroughly reviewed using advanced legal AI algorithms. I've detected potential compliance issues, contract vulnerabilities, and areas requiring legal attention. The analysis covers risk assessment, regulatory alignment, and best practice recommendations. Shall I provide a detailed breakdown?`,
          metadata: { confidence: 0.94, jurisdiction: "Multi-jurisdictional", sources: 15 }
        },
        {
          content: `I've conducted extensive legal research on this matter, analyzing case law, statutes, and regulatory guidance. The research encompasses federal and state jurisdictions, with particular attention to recent developments and emerging trends. I can provide citations, case summaries, and practical applications.`,
          metadata: { confidence: 0.97, jurisdiction: "Federal", sources: 22 }
        }
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: selectedFile ? 
          `I've analyzed "${userMessage.file?.name}" using advanced legal document processing. The review identified key clauses, potential risks, and compliance considerations. ${randomResponse.content}` :
          randomResponse.content,
        sender: "ai",
        timestamp: new Date(),
        type: selectedFile ? "analysis" : "text",
        metadata: randomResponse.metadata,
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 2500)
  }

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const getSessionIcon = (type) => {
    const iconMap = {
      "case-analysis": <Gavel className="w-4 h-4" />,
      "document-review": <FileText className="w-4 h-4" />,
      "legal-research": <Search className="w-4 h-4" />,
      "compliance": <Shield className="w-4 h-4" />,
      default: <MessageSquare className="w-4 h-4" />
    }
    return iconMap[type] || iconMap.default
  }

  const getStatusColor = (status) => {
    const statusMap = {
      "completed": "success",
      "in-progress": "warning", 
      "pending": "secondary"
    }
    return statusMap[status] || "secondary"
  }

  const getPriorityColor = (priority) => {
    const priorityMap = {
      "high": "error",
      "medium": "warning",
      "low": "secondary"
    }
    return priorityMap[priority] || "secondary"
  }

  return (
    <div className="flex h-screen bg-navy-900 text-neutral-100 relative overflow-hidden">
      {/* Background Animation */}
      <div className="background-animation"></div>
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "w-80 glass-primary border-r border-glass-border flex flex-col relative z-50 transition-transform duration-300",
        "md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Mobile Close Button */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute top-4 right-4 md:hidden z-10"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Header */}
        <div className="p-6 border-b border-glass-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl flex items-center justify-center shadow-gold">
              <Scale className="w-7 h-7 text-navy-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Libra AI</h1>
              <p className="text-sm text-gold-300 font-medium">Legal Research Assistant</p>
            </div>
          </div>
          
          <Button 
            variant="default" 
            className="w-full h-12 text-base font-semibold shadow-gold"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Legal Query
          </Button>
        </div>

        {/* AI Capabilities */}
        <div className="p-4 border-b border-glass-border">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4 text-gold-400" />
            AI Capabilities
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="h-auto p-3 flex flex-col items-center gap-2 group"
            >
              <Gavel className="w-5 h-5 text-gold-400 group-hover:text-gold-300 transition-colors" />
              <span className="text-xs font-medium">Case Analysis</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="h-auto p-3 flex flex-col items-center gap-2 group"
            >
              <FileText className="w-5 h-5 text-gold-400 group-hover:text-gold-300 transition-colors" />
              <span className="text-xs font-medium">Doc Review</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="h-auto p-3 flex flex-col items-center gap-2 group"
            >
              <Search className="w-5 h-5 text-gold-400 group-hover:text-gold-300 transition-colors" />
              <span className="text-xs font-medium">Research</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="h-auto p-3 flex flex-col items-center gap-2 group"
            >
              <Shield className="w-5 h-5 text-gold-400 group-hover:text-gold-300 transition-colors" />
              <span className="text-xs font-medium">Compliance</span>
            </Button>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-gold-400" />
              Recent Sessions
            </h3>
            <Badge variant="outline" className="text-xs">
              {chatSessions.length} active
            </Badge>
          </div>
          
          <ScrollArea className="h-full">
            <div className="space-y-3">
              {chatSessions.map((session) => (
                <Card
                  key={session.id}
                  className="card-secondary cursor-pointer group hover:scale-[1.02] transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-gold-500/20 text-gold-400 group-hover:bg-gold-500/30 transition-colors">
                        {getSessionIcon(session.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate group-hover:text-gold-100 transition-colors">
                          {session.title}
                        </h4>
                        <p className="text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
                          {session.lastMessage}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(session.status)} className="text-xs">
                          {session.status}
                        </Badge>
                        <Badge variant={getPriorityColor(session.priority)} className="text-xs">
                          {session.priority}
                        </Badge>
                      </div>
                      <span className="text-xs text-gold-400 font-medium">
                        {session.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-glass-border">
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-neutral-300 hover:text-white group"
            >
              <Settings className="w-4 h-4 mr-3 group-hover:rotate-90 transition-transform duration-300" />
              Settings & Preferences
            </Button>
            <div className="flex items-center justify-between text-xs text-neutral-400 pt-2">
              <span>Libra AI v2.1</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full status-online"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Chat Header */}
        <div className="p-4 border-b border-glass-border glass-primary">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  Legal Research Session
                  <Sparkles className="w-5 h-5 text-gold-400" />
                </h2>
                <p className="text-sm text-gold-300 font-medium">
                  AI-powered legal analysis • Real-time insights
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-4 text-xs text-neutral-300">
                <div className="flex items-center gap-1">
                  <Target className="w-3 h-3 text-gold-400" />
                  <span>98% Accuracy</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-success" />
                  <span>Live Updates</span>
                </div>
              </div>
              
              <Badge variant="success" className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full status-online"></div>
                AI Active
              </Badge>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "ai" && (
                  <Avatar className="w-10 h-10 ring-gold-500/50">
                    <AvatarFallback className="bg-gradient-to-br from-gold-500 to-gold-600 text-navy-900">
                      <Scale className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={`max-w-[75%] ${message.sender === "user" ? "order-first" : ""}`}>
                  <Card className={`${
                    message.sender === "user" 
                      ? "card-secondary ml-auto" 
                      : "card-primary"
                  } group`}>
                    <CardContent className="p-5">
                      {message.file && (
                        <div className="mb-4 p-3 bg-gold-500/10 rounded-xl border border-gold-500/30 flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gold-400" />
                          <div>
                            <p className="text-sm font-medium text-white">{message.file.name}</p>
                            <p className="text-xs text-neutral-400">{(message.file.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                      )}
                      
                      <p className={`text-sm leading-relaxed ${
                        message.sender === "user" ? "text-neutral-100" : "text-neutral-200"
                      }`}>
                        {message.content}
                      </p>

                      {message.metadata && (
                        <div className="mt-4 pt-4 border-t border-glass-border">
                          <div className="flex flex-wrap items-center gap-4 text-xs">
                            {message.metadata.confidence && (
                              <div className="flex items-center gap-1 text-gold-300">
                                <Sparkles className="w-3 h-3" />
                                <span className="font-medium">
                                  {(message.metadata.confidence * 100).toFixed(0)}% Confidence
                                </span>
                              </div>
                            )}
                            {message.metadata.jurisdiction && (
                              <div className="flex items-center gap-1 text-neutral-300">
                                <Scale className="w-3 h-3" />
                                <span>{message.metadata.jurisdiction}</span>
                              </div>
                            )}
                            {message.metadata.sources && (
                              <div className="flex items-center gap-1 text-neutral-300">
                                <BookOpen className="w-3 h-3" />
                                <span>{message.metadata.sources} sources</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className={`text-xs text-neutral-400 mt-2 flex items-center gap-2 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}>
                    <Clock className="w-3 h-3" />
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>

                {message.sender === "user" && (
                  <Avatar className="w-10 h-10 ring-navy-500/50">
                    <AvatarFallback className="bg-gradient-to-br from-navy-600 to-navy-700 text-gold-300 font-semibold">
                      <Users className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4 justify-start">
                <Avatar className="w-10 h-10 ring-gold-500/50">
                  <AvatarFallback className="bg-gradient-to-br from-gold-500 to-gold-600 text-navy-900">
                    <Scale className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <Card className="card-primary">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gold-400 rounded-full typing-dot"></div>
                        <div className="w-2 h-2 bg-gold-400 rounded-full typing-dot"></div>
                        <div className="w-2 h-2 bg-gold-400 rounded-full typing-dot"></div>
                      </div>
                      <span className="text-xs text-neutral-400 ml-2">Analyzing legal context...</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Legal Tools Bar */}
        <div className="px-4 py-3 glass-secondary border-t border-glass-border">
          <div className="flex items-center justify-center gap-1 max-w-4xl mx-auto">
            <Button variant="ghost" size="sm" className="text-xs flex items-center gap-2 text-gold-300 hover:text-white group">
              <CheckCircle className="w-3 h-3 group-hover:scale-110 transition-transform" />
              <span>Verify Citations</span>
            </Button>
            <div className="w-px h-4 bg-glass-border mx-2"></div>
            <Button variant="ghost" size="sm" className="text-xs flex items-center gap-2 text-gold-300 hover:text-white group">
              <AlertCircle className="w-3 h-3 group-hover:scale-110 transition-transform" />
              <span>Risk Assessment</span>
            </Button>
            <div className="w-px h-4 bg-glass-border mx-2"></div>
            <Button variant="ghost" size="sm" className="text-xs flex items-center gap-2 text-gold-300 hover:text-white group">
              <Clock className="w-3 h-3 group-hover:scale-110 transition-transform" />
              <span>Timeline Builder</span>
            </Button>
            <div className="w-px h-4 bg-glass-border mx-2"></div>
            <Button variant="ghost" size="sm" className="text-xs flex items-center gap-2 text-gold-300 hover:text-white group">
              <Zap className="w-3 h-3 group-hover:scale-110 transition-transform" />
              <span>Quick Insights</span>
            </Button>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-glass-border glass-primary">
          <div className="max-w-4xl mx-auto">
            {selectedFile && (
              <div className="mb-4 p-4 glass-accent rounded-2xl flex items-center justify-between border border-gold-500/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gold-500/20 rounded-xl">
                    <FileText className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white">{selectedFile.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </Badge>
                      <span className="text-xs text-neutral-400">Ready for analysis</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setSelectedFile(null)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            <div className="flex gap-3">
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                  className="hidden"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  className="group"
                >
                  <Paperclip className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="group"
                >
                  <ImageIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
              </div>

              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                  placeholder="Ask about legal cases, analyze documents, research precedents, or get compliance guidance..."
                  className="pr-14 text-base"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() && !selectedFile}
                  variant="default"
                  size="icon"
                  className="absolute right-1 top-1 h-10 w-10 group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs text-neutral-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-gold-400" />
                  Enterprise-grade security & confidentiality
                </span>
              </div>
              <span className="hidden sm:block">Press Enter to send • Shift+Enter for new line</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App