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
  User,
  Github,
  Users,
  Brain,
  Target,
} from "lucide-react"

import { cn } from "../lib/utils"

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
        "w-80 bg-[#001D3D]/80 backdrop-blur-lg flex flex-col relative z-50 transition-transform duration-300",
        "md:translate-x-0 shadow-2xl shadow-black/30",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Mobile Close Button */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute top-4 right-4 md:hidden text-[#EBEBEB] hover:text-[#FCA311] hover:bg-[#001D3D]"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Header */}
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#CCA000] rounded-2xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-[#001D3D]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#EBEBEB]">Libra AI</h1>
              <p className="text-sm text-[#FCA311] font-medium">Legal Research Assistant</p>
            </div>
          </div>
          
          <Button 
            variant="" 
            className="w-full h-12 text-base font-semibold bg-[#FCA311] hover:bg-[#fff] text-[#001D3D] mt-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Legal Query
          </Button>
        </div>

        {/* AI Capabilities */}
        <div className="px-4 py-2">
          <h3 className="text-sm font-semibold text-[#EBEBEB] mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4 text-[#FCA311]" />
            AI Capabilities
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-auto p-2 flex flex-col items-center gap-2 group bg-[#001D3D]/50 hover:bg-[#002752] border border-[#FCA311]/40"
            >
              <Gavel className="w-5 h-5 text-[#CCA000] group-hover:text-[#EBEBEB] transition-colors" />
              <span className="text-xs font-medium text-[#EBEBEB]">Case Analysis</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-auto p-2 flex flex-col items-center gap-2 group bg-[#001D3D]/50 hover:bg-[#002752] border border-[#FCA311]/40"
            >
              <FileText className="w-5 h-5 text-[#CCA000] group-hover:text-[#EBEBEB] transition-colors" />
              <span className="text-xs font-medium text-[#EBEBEB]">Doc Review</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-auto p-2 flex flex-col items-center gap-2 group bg-[#001D3D]/50 hover:bg-[#002752] border border-[#FCA311]/40"
            >
              <Search className="w-5 h-5 text-[#CCA000] group-hover:text-[#EBEBEB] transition-colors" />
              <span className="text-xs font-medium text-[#EBEBEB]">Research</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-auto p-2 flex flex-col items-center gap-2 group bg-[#001D3D]/50 hover:bg-[#002752] border border-[#FCA311]/40"
            >
              <Shield className="w-5 h-5 text-[#CCA000] group-hover:text-[#EBEBEB] transition-colors" />
              <span className="text-xs font-medium text-[#EBEBEB]">Compliance</span>
            </Button>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="flex-1 px-4 py-2 overflow-hidden">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-semibold text-[#EBEBEB] flex items-center gap-2">
              <History className="w-4 h-4 text-[#FCA311]" />
              Recent Sessions
            </h3>
            <span className="text-xs px-2 py-1 rounded-full bg-[#001D3D]/70 text-[#EBEBEB] border border-[#EBEBEB]/10">
              {chatSessions.length} active
            </span>
          </div>
          
          <div className="h-[calc(100%-40px)] overflow-y-auto pr-1 custom-scrollbar">
            <div className="space-y-2 pr-1">
              {chatSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-3 rounded-xl bg-[#001D3D]/40 hover:bg-[#002752]/60 backdrop-blur-md transition-all duration-200 cursor-pointer group border border-[#EBEBEB]/10 hover:border-[#FCA311]/30 shadow-lg shadow-black/20 hover:shadow-[#FCA311]/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#FCA311]/20 text-[#FCA311] group-hover:bg-[#FCA311]/30 transition-colors">
                      {getSessionIcon(session.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-[#EBEBEB] truncate">
                        {session.title}
                      </h4>
                      <p className="text-xs text-[#FCA311]/80 mt-1 line-clamp-2 leading-relaxed">
                        {session.lastMessage}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            session.status === 'completed' ? 'bg-green-900/40 text-green-300 border border-green-800/50' :
                            session.status === 'in-progress' ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-800/50' :
                            'bg-gray-700/40 text-gray-300 border border-gray-600/50'
                          }`}>
                            {session.status.replace('-', ' ')}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            session.priority === 'high' ? 'bg-red-900/40 text-red-300 border border-red-800/50' :
                            session.priority === 'medium' ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-800/50' :
                            'bg-gray-700/40 text-gray-300 border border-gray-600/50'
                          }`}>
                            {session.priority}
                          </span>
                        </div>
                        <span className="text-xs text-[#CCA000] font-medium">
                          {session.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#001D3D]/60 backdrop-blur-sm border-t border-[#EBEBEB]/5">
          <div className="flex items-center justify-between text-xs text-[#EBEBEB]/80">
            <span className="font-medium">Libra AI v2.1</span>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#001D3D] border border-[#EBEBEB]/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[#EBEBEB]">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header with Author and GitHub Links */}
        <div className="p-4 bg-[#000000] backdrop-blur-sm border-b border-[#EBEBEB]/10">
          <div className="flex items-center gap-4 justify-end">
            <button 
              onClick={() => window.open('https://your-website.com', '_blank')}
              className="px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
              style={{
                backgroundColor: '#E5E5E5',
                color: '#000000',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#E5E5E5';
              }}
            >
              <User className="w-4 h-4" />
              <span>About Author</span>
            </button>
            <button
              onClick={() => window.open('https://github.com/yourusername/LibraAI', '_blank')}
              className="px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
              style={{
                backgroundColor: '#FCA311',
                color: '#000000',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#FCA311';
              }}
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repo</span>
            </button>
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
                  <Avatar className="w-10 h-10 ring-[#FCA311]/0">
                    <AvatarFallback className="bg-gradient-to-br from-[#FCA311] to-[#F77F00] text-navy-900">
                      <Scale className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={`max-w-[75%] ${message.sender === "user" ? "order-first" : ""}`}>
                  <Card className={`${
                    message.sender === "user" 
                      ? "bg-[#1A2D53] border-[#2A3A5F] ml-auto" 
                      : "bg-[#14213D] border-[#2A3A5F]"
                  } group border`}>
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
                  <div className="relative">
                  <div className="absolute inset-0 bg-[#FCA311]/20 blur-sm rounded-full"></div>
                  <Avatar className="relative w-10 h-10 border-2 border-[#FCA311]/20">
                    <AvatarFallback className="bg-gradient-to-br from-[#FCA311] to-[#F77F00] text-white">
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4 justify-start">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 blur-sm rounded-full"></div>
                  <Avatar className="relative w-10 h-10 border-2 border-white/20">
                    <AvatarFallback className="bg-gradient-to-br from-white to-gray-200">
                      <Scale className="w-5 h-5 text-[#14213D]" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Card className="bg-[#14213D] border border-[#2A3A5F]">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#FCA311] rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-[#FCA311] rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-[#FCA311] rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-sm text-neutral-300 ml-2">Analyzing legal context...</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Legal Tools Bar */}
        <div className="px-4 py-3 bg-[#001D3D] border-t border-[#14213D]">
          <div className="flex items-center justify-center gap-1 max-w-4xl mx-auto">
            <Button variant="ghost" size="sm" className="text-xs flex items-center gap-2 text-[#FCA311] hover:bg-[#FCA311]/10 hover:text-white group">
              <CheckCircle className="w-3 h-3 group-hover:scale-110 transition-transform" />
              <span>Verify Citations</span>
            </Button>
            <div className="w-px h-4 bg-[#14213D] mx-2"></div>
            <Button variant="ghost" size="sm" className="text-xs flex items-center gap-2 text-[#FCA311] hover:bg-[#FCA311]/10 hover:text-white group">
              <AlertCircle className="w-3 h-3 group-hover:scale-110 transition-transform" />
              <span>Risk Assessment</span>
            </Button>
            <div className="w-px h-4 bg-[#14213D] mx-2"></div>
            <Button variant="ghost" size="sm" className="text-xs flex items-center gap-2 text-[#FCA311] hover:bg-[#FCA311]/10 hover:text-white group">
              <Clock className="w-3 h-3 group-hover:scale-110 transition-transform" />
              <span>Timeline Builder</span>
            </Button>
            <div className="w-px h-4 bg-[#14213D] mx-2"></div>
            <Button variant="ghost" size="sm" className="text-xs flex items-center gap-2 text-[#FCA311] hover:bg-[#FCA311]/10 hover:text-white group">
              <Zap className="w-3 h-3 group-hover:scale-110 transition-transform" />
              <span>Quick Insights</span>
            </Button>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#000000] border-t border-[#14213D]">
          <div className="max-w-4xl mx-auto">
            {selectedFile && (
              <div className="mb-4 p-4 bg-[#14213D] rounded-2xl flex items-center justify-between border border-[#FCA311]/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FCA311]/20 rounded-xl">
                    <FileText className="w-5 h-5 text-[#FCA311]" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white">{selectedFile.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="text-xs bg-[#FCA311]/10 text-[#FCA311] hover:bg-[#FCA311]/20">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </Badge>
                      <span className="text-xs text-gray-400">Ready for analysis</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setSelectedFile(null)}
                  className="text-gray-400 hover:bg-[#FCA311]/10 hover:text-[#FCA311]"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder="Ask about legal cases, analyze documents, research precedents, or get compliance guidance..."
                  className="pr-32 text-base bg-[#001D3D] text-white placeholder-gray-400"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() && !selectedFile}
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 hover:bg-[#FCA311]/10"
                >
                  <Send className={`w-5 h-5 ${!inputValue.trim() && !selectedFile ? 'text-gray-500' : 'text-[#FCA311]'}`} />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                  className="hidden"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-12 w-12 hover:bg-[#FCA311]/10"
                >
                  <Paperclip className="w-5 h-5 text-[#FCA311] hover:rotate-12 transition-transform" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-[#FCA311]" />
                <span>Enterprise-grade security & confidentiality</span>
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