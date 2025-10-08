import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useRef,
  useEffect,
} from "react";
import FarmerLayout from "../layouts/FarmerLayout";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Bot,
  Send,
  Upload,
  X,
  Loader2,
  User,
  Copy,
  Check,
  Plus,
} from "lucide-react";
import { useToast } from "../ui/use-toast";
import { API_BASE_URL, ENDPOINTS } from "../../config/api";
import WarningDialog from "../ui/WarningDialog";
import { Input } from "../ui/input";
import Sidebar from "./ChatSidebar";
import Header from "./ChatHeader";
import { useSidebar } from "../../context/SidebarContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface Session {
  _id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  lastMessageAt?: string;
  isActive: boolean;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  imageUrl?: string;
  isTyping?: boolean;
  status?: "sending" | "sent" | "delivered" | "failed";
}

const FARMER_HEADER_HEIGHT = "64px"; // Adjust if your header is taller
const CHAT_SIDEBAR_WIDTH = "256px"; // px

const AiChatBox: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );
  const [showNewSessionDialog, setShowNewSessionDialog] = useState(false);
  const [newSessionName, setNewSessionName] = useState("");
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingSessionName, setEditingSessionName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { toast } = useToast();
  const { isExpanded } = useSidebar();
  const isMobile = useMediaQuery("(max-width: 639px)");
  const farmerSidebarWidth = isMobile ? 0 : (isExpanded ? 256 : 64);
  const FARMER_SIDEBAR_WIDTH = `${farmerSidebarWidth}px`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Don't initialize any session by default - show welcome view
    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedSessionId) {
      fetchMessages();
    } else {
      setMessages([]);
    }
  }, [selectedSessionId]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [prompt]);

  // Removed initializeDefaultSession - now shows welcome view by default

  const fetchSessions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}${ENDPOINTS.AI_SESSIONS}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setSessions(data.sessions);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to load sessions.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
      toast({
        title: "Error",
        description: "Failed to fetch sessions. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchMessages = async () => {
    if (!selectedSessionId) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}${ENDPOINTS.AI_MESSAGES}?sessionId=${selectedSessionId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        const loadedMessages: Message[] = data.messages.map((msg: { _id: string; text: string; sender: string; createdAt: string; imageUrl?: string }) => ({
          id: msg._id,
          content:
            msg.sender === "user" ? extractUserMessage(msg.text) : msg.text,
          sender: msg.sender,
          timestamp: new Date(msg.createdAt),
          imageUrl: msg.imageUrl,
          status: "delivered",
        }));
        setMessages(loadedMessages);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to load messages.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to fetch messages. Please try again.",
        variant: "destructive",
      });
    }
  };

  const createNewSession = async () => {
    const defaultName = `New Chat ${sessions.length + 1}`;
    const name = newSessionName.trim() || defaultName;
    try {
      const res = await fetch(`${API_BASE_URL}${ENDPOINTS.AI_SESSIONS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (res.ok) {
        setSessions([data.session, ...sessions]);
        setSelectedSessionId(data.session._id);
        setNewSessionName("");
        setShowNewSessionDialog(false);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to create new session.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating session:", error);
      toast({
        title: "Error",
        description: "Failed to create new session. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renameSession = async (sessionId: string) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}${ENDPOINTS.AI_SESSIONS}/${sessionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name: editingSessionName }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSessions(
          sessions.map((session) =>
            session._id === sessionId
              ? { ...session, name: editingSessionName }
              : session
          )
        );
        setEditingSessionId(null);
        setEditingSessionName("");
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to rename session.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error renaming session:", error);
      toast({
        title: "Error",
        description: "Failed to rename session. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteSession = async (sessionId: string) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}${ENDPOINTS.AI_SESSIONS}/${sessionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.ok) {
        const remainingSessions = sessions.filter(
          (session) => session._id !== sessionId
        );
        setSessions(remainingSessions);
        if (selectedSessionId === sessionId) {
          setSelectedSessionId(
            remainingSessions.length > 0 ? remainingSessions[0]._id : null
          );
        }
      } else {
        throw new Error("Failed to delete session");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete session.",
        variant: "destructive",
      });
    }
  };

  const formatResponse = (text: string): string => {
    let formatted = text;
    formatted = formatted.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-semibold text-gray-900">$1</strong>'
    );
    formatted = formatted.replace(
      /\*(.*?)\*/g,
      '<em class="italic text-gray-700">$1</em>'
    );
    formatted = formatted.replace(
      /`(.*?)`/g,
      '<code class="bg-gray-100 text-gray-800 font-mono text-sm px-2 py-1 rounded-md border">$1</code>'
    );
    formatted = formatted.replace(
      /```([\s\S]*?)```/g,
      '<pre class="bg-gray-50 border border-gray-200 p-2 sm:p-4 rounded-xl overflow-x-auto my-2 sm:my-3 shadow-sm"><code class="text-xs sm:text-sm text-gray-800">$1</code></pre>'
    );
    formatted = formatted.replace(/\n/g, "<br />");
    return formatted;
  };

  const copyToClipboard = async (messageId: string, content: string) => {
    try {
      const plainText = content.replace(/<[^>]*>/g, "");
      await navigator.clipboard.writeText(plainText);
      setCopied(messageId);
      setTimeout(() => setCopied(null), 2000);
      toast({
        title: "Copied to clipboard",
        description: "Message copied successfully",
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const addMessage = (
    content: string,
    sender: "user" | "ai",
    imageUrl?: string
  ) => {
    const newMessage: Message = {
      id: Date.now().toString() + Math.random(),
      content,
      sender,
      timestamp: new Date(),
      imageUrl,
      status: sender === "user" ? "sending" : "delivered",
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage.id;
  };

  const extractUserMessage = (fullPrompt: string): string => {
    const userMatch = fullPrompt.match(/User: (.+)$/s);
    return userMatch ? userMatch[1].trim() : fullPrompt;
  };

  const updateMessageStatus = (
    messageId: string,
    status: Message["status"]
  ) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, status } : msg))
    );
  };

  const addTypingMessage = () => {
    setMessages((prev) => {
      const filtered = prev.filter((msg) => msg.id !== "typing");
      const typingMessage: Message = {
        id: "typing",
        content: "",
        sender: "ai",
        timestamp: new Date(),
        isTyping: true,
      };
      return [...filtered, typingMessage];
    });
  };

  const removeTypingMessage = () => {
    setMessages((prev) => prev.filter((msg) => msg.id !== "typing"));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() && !imageFile) return;

    if (!selectedSessionId) {
      toast({
        title: "Error",
        description: "Please select a session to continue.",
        variant: "destructive",
      });
      return;
    }

    const userMessage = prompt.trim() || "Image uploaded for analysis";
    const userImageUrl = imagePreview || undefined;

    const userMessageId = addMessage(userMessage, "user", userImageUrl);

    setPrompt("");
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setLoading(true);
    addTypingMessage();

    try {
      let response = "";

      if (imageFile) {
        // --- Handle Image Upload ---
        const formData = new FormData();
        formData.append("sessionId", selectedSessionId);
        formData.append("image", imageFile);

        const res = await fetch(`${API_BASE_URL}${ENDPOINTS.AI_ANALYZE_IMAGE}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        });

        const data = await res.json();
        if (res.ok) {
          response = data.result;
          updateMessageStatus(userMessageId, "delivered");
        } else {
          response = data.message || "Something went wrong.";
          updateMessageStatus(userMessageId, "failed");
          toast({
            title: "Error",
            description: data.message || "Something went wrong.",
            variant: "destructive",
          });
        }
      } else {
        // --- Handle Text-only Chat ---
        const chatPrompt = `You are an AI assistant trained on the Naturopura platform. Below is documentation you should use to answer user questions. User: ${userMessage}`;

        const res = await fetch(`${API_BASE_URL}${ENDPOINTS.AI_CHAT}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            prompt: chatPrompt,
            sessionId: selectedSessionId,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          response = data.reply;
          updateMessageStatus(userMessageId, "delivered");
        } else {
          response = data.message || "Something went wrong.";
          updateMessageStatus(userMessageId, "failed");
          toast({
            title: "Error",
            description: data.message || "Something went wrong.",
            variant: "destructive",
          });
        }
      }

      removeTypingMessage();
      addMessage(response, "ai");
    } catch {
      removeTypingMessage();
      updateMessageStatus(userMessageId, "failed");
      const errorMessage = "Failed to fetch AI response.";
      addMessage(errorMessage, "ai");
      toast({
        title: "Error",
        description: "Failed to fetch AI response. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === "user";
    const isTyping = message.isTyping;

    return (
      <div
        className={`flex ${
          isUser ? "justify-end" : "justify-start"
        } mb-4 sm:mb-6 lg:mb-8`}
      >
        <div
          className={`flex ${
            isUser ? "flex-row-reverse" : "flex-row"
          } items-start gap-2 sm:gap-3 lg:gap-4 max-w-[95%] sm:max-w-[85%] lg:max-w-4xl w-full`}
        >
          <div
            className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
              isUser
                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                : "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white"
            }`}
          >
            {isUser ? (
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </div>
          <div
            className={`flex flex-col ${
              isUser ? "items-end" : "items-start"
            } flex-1 min-w-0`}
          >
            <div
              className={`rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4 max-w-full shadow-sm break-words ${
                isUser
                  ? "bg-gray-100 text-gray-900"
                  : "bg-white border border-gray-200"
              }`}
            >
              {message.imageUrl && (
                <div className="mb-2 sm:mb-3 lg:mb-4">
                  <img
                    src={message.imageUrl}
                    alt="Uploaded content"
                    className="rounded-lg sm:rounded-xl max-w-full sm:max-w-xs lg:max-w-sm h-auto border border-gray-200 shadow-sm"
                  />
                </div>
              )}
              {isTyping ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 font-medium">
                    AI is thinking...
                  </span>
                </div>
              ) : (
                <div className="text-gray-900 leading-relaxed text-sm sm:text-base">
                  {isUser ? (
                    <p className="whitespace-pre-wrap font-medium">
                      {message.content}
                    </p>
                  ) : (
                    <div
                      className="prose prose-gray prose-sm sm:prose-base max-w-none [&>pre]:text-xs [&>pre]:sm:text-sm"
                      dangerouslySetInnerHTML={{
                        __html: formatResponse(message.content),
                      }}
                    />
                  )}
                </div>
              )}
            </div>
            {!isUser && !isTyping && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(message.id, message.content)}
                className="mt-1 sm:mt-2 h-6 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all duration-200"
              >
                {copied === message.id ? (
                  <>
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <FarmerLayout title="AI Chat" subtitle="Chat with AI Assistant">
      {/* New Session Dialog */}
      <WarningDialog
        isOpen={showNewSessionDialog}
        title="New Chat Session"
        message={
          <div>
            <p className="mb-4">
              Enter a name for the new chat session or leave it blank for a
              default name.
            </p>
            <Input
              type="text"
              placeholder="Session name..."
              value={newSessionName}
              onChange={(e) => setNewSessionName(e.target.value)}
              className="mt-2"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  createNewSession();
                }
              }}
            />
          </div>
        }
        confirmText="Create"
        onConfirm={createNewSession}
        onCancel={() => setShowNewSessionDialog(false)}
      />

      {/* Sidebar */}
      <Sidebar
        sessions={sessions}
        selectedSessionId={selectedSessionId}
        setSelectedSessionId={setSelectedSessionId}
        showNewSessionDialog={showNewSessionDialog}
        setShowNewSessionDialog={setShowNewSessionDialog}
        editingSessionId={editingSessionId}
        setEditingSessionId={setEditingSessionId}
        editingSessionName={editingSessionName}
        setEditingSessionName={setEditingSessionName}
        renameSession={renameSession}
        deleteSession={deleteSession}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        style={{
          top: FARMER_HEADER_HEIGHT,
          left: sidebarOpen ? `${farmerSidebarWidth}px` : '-256px',
          height: `calc(100vh - ${FARMER_HEADER_HEIGHT})`,
        }}
      />

      {/* Main Content */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300`}
        style={{
          marginLeft: `calc(${FARMER_SIDEBAR_WIDTH} + ${CHAT_SIDEBAR_WIDTH})`, // Offset by both sidebars
          marginTop: FARMER_HEADER_HEIGHT,
        }}
      >
        {/* Header */}
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Chat Area */}
        <div
          className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-gray-50/30"
          style={{
            marginBottom: "96px", // for input
            minHeight: 0,
          }}
        >
          {/* Messages Area - Scrollable */}
          <div className="flex flex-col h-full w-full px-6 py-6">
            {messages.length === 0 && !selectedSessionId ? (
              <div className="flex items-center justify-center min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh]">
                <div className="text-center max-w-xs sm:max-w-sm lg:max-w-md px-4">
                  <div className="relative mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center mx-auto shadow-lg">
                      <Bot className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-emerald-600" />
                    </div>
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-green-400 rounded-full border-2 sm:border-3 border-white animate-pulse"></div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                    Welcome to Naturopura AI! 👋
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                    I'm here to help with farming questions, crop analysis,
                    soil health, and more. You can also upload images for
                    instant analysis.
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <span className="bg-emerald-100 text-emerald-700 px-2 sm:px-3 py-1 rounded-full font-medium">
                      🌱 Crop Health
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full font-medium">
                      🌾 Soil Analysis
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-2 sm:px-3 py-1 rounded-full font-medium">
                      📸 Image Analysis
                    </span>
                  </div>
                  <div className="mt-6 sm:mt-8">
                    <Button
                      onClick={() => setShowNewSessionDialog(true)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                      Start New Chat
                    </Button>
                  </div>
                </div>
              </div>
            ) : messages.length === 0 && selectedSessionId ? (
              <div className="flex items-center justify-center min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh]">
                <div className="text-center max-w-xs sm:max-w-sm lg:max-w-md px-4">
                  <div className="relative mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center mx-auto shadow-lg">
                      <Bot className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-emerald-600" />
                    </div>
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-green-400 rounded-full border-2 sm:border-3 border-white animate-pulse"></div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                    Welcome to Naturopura AI! 👋
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                    I'm here to help with farming questions, crop analysis,
                    soil health, and more. You can also upload images for
                    instant analysis.
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <span className="bg-emerald-100 text-emerald-700 px-2 sm:px-3 py-1 rounded-full font-medium">
                      🌱 Crop Health
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full font-medium">
                      🌾 Soil Analysis
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-2 sm:px-3 py-1 rounded-full font-medium">
                      📸 Image Analysis
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6 w-full">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Input Section */}
        <div
          className="fixed z-20 bg-white/90 backdrop-blur-sm border-t border-gray-200/60 px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 shadow-lg"
          style={{
            left: `calc(${FARMER_SIDEBAR_WIDTH} + ${CHAT_SIDEBAR_WIDTH})`,
            right: 0,
            bottom: 0,
          }}
        >
          {imagePreview && (
            <div className="mb-3 sm:mb-4">
              <div className="relative inline-block">
                <div className="relative border-2 border-dashed border-emerald-300 rounded-xl sm:rounded-2xl p-2 sm:p-3 bg-gradient-to-br from-emerald-50 to-white shadow-sm">
                  <img
                    src={imagePreview}
                    alt="Upload Preview"
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-lg sm:rounded-xl shadow-md"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full shadow-lg hover:scale-110 transition-transform"
                    onClick={removeImage}
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 sm:gap-3 lg:gap-4 items-end"
          >
            <div className="flex-1 relative min-w-0">
              <Textarea
                ref={textareaRef}
                placeholder="Ask me anything about farming, crops, soil, or upload an image for analysis..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="resize-none border-2 border-gray-400 focus:border-emerald-400 focus:ring-2 sm:focus:ring-4 focus:ring-emerald-100 rounded-xl sm:rounded-2xl bg-white min-h-[44px] sm:min-h-[52px] lg:min-h-[56px] max-h-[120px] sm:max-h-[140px] lg:max-h-[160px] pr-10 sm:pr-12 lg:pr-14 py-2.5 sm:py-3 lg:py-4 px-3 sm:px-4 text-sm sm:text-base text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200"
                rows={1}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute right-2 sm:right-3 top-2 sm:top-2.5 lg:top-3 w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg sm:rounded-xl transition-all duration-200"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
            <Button
              type="submit"
              size="icon"
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex-shrink-0"
              disabled={loading || (!prompt.trim() && !imageFile)}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 animate-spin" />
              ) : (
                <Send className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </FarmerLayout>
  );
};

export default AiChatBox;