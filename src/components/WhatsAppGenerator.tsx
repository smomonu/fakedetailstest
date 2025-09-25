import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  CheckCheck, 
  Download, 
  Shield,
  RefreshCw,
  ArrowLeft,
  TestTube2,
  Palette,
  Code,
  Monitor,
  ChevronDown,
  CircleDot,
  Menu,
  X,
  MessageCircle,
  Signal,
  Wifi,
  PhoneCall,
  Search,
  MoreVertical,
  Check,
  Send,
  Smile,
  Image,
  Mic,
  Paperclip,
  Play,
  Heart,
  Camera,
  Video,
  Plus,
  Archive,
  Settings,
  Star,
  Volume2,
  VolumeX,
  Edit3,
  Trash2,
  Reply,
  Forward,
  Info
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
  type: 'text' | 'image' | 'voice' | 'video';
  delivered?: boolean;
  read?: boolean;
  url?: string;
  duration?: string;
  edited?: boolean;
  replied?: boolean;
  replyTo?: string;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  typing?: boolean;
  pinned?: boolean;
  muted?: boolean;
  archived?: boolean;
  isGroup?: boolean;
  messages: Message[];
}

const ChatComposer: React.FC<{ 
  selectedChat: Chat; 
  onSend: (text: string, type?: string) => void;
  replyingTo?: Message | null;
  onCancelReply?: () => void;
}> = ({ selectedChat, onSend, replyingTo, onCancelReply }) => {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false);
        onSend('', 'voice');
      }, 2000);
    }
  };

  return (
    <div className="bg-white border-t border-gray-200">
      {/* Reply preview */}
      {replyingTo && (
        <div className="px-4 py-2 bg-gray-50 border-l-4 border-green-500 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="text-xs text-green-600 font-medium">Replying to {replyingTo.sender === 'me' ? 'You' : selectedChat.name}</div>
            <div className="text-sm text-gray-600 truncate">{replyingTo.text || 'Media'}</div>
          </div>
          <button onClick={onCancelReply} className="ml-2 text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="p-3 flex items-end space-x-2">
        {/* Attachment menu */}
        <div className="relative">
          <button 
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          {showAttachMenu && (
            <div className="absolute bottom-12 left-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-[160px]">
              <button 
                onClick={() => { onSend('', 'image'); setShowAttachMenu(false); }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 rounded"
              >
                <Image className="w-4 h-4 text-blue-500" />
                <span>Photo</span>
              </button>
              <button 
                onClick={() => { onSend('', 'video'); setShowAttachMenu(false); }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 rounded"
              >
                <Video className="w-4 h-4 text-red-500" />
                <span>Video</span>
              </button>
              <button 
                onClick={() => { onSend('', 'voice'); setShowAttachMenu(false); }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 rounded"
              >
                <Mic className="w-4 h-4 text-green-500" />
                <span>Audio</span>
              </button>
            </div>
          )}
        </div>

        {/* Text input area */}
        <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 flex items-end space-x-2">
          <button className="text-gray-500 hover:text-gray-700 pb-1">
            <Smile className="w-5 h-5" />
          </button>
          
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className="flex-1 bg-transparent outline-none text-sm resize-none max-h-[120px] py-1"
            rows={1}
          />
        </div>

        {/* Send/Voice button */}
        {text.trim() ? (
          <button
            onClick={handleSend}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleVoiceRecord}
            className={`${isRecording ? 'bg-red-500' : 'bg-green-500'} hover:opacity-90 text-white rounded-full p-2 transition-all ${isRecording ? 'animate-pulse' : ''}`}
          >
            <Mic className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

const MessageBubble: React.FC<{ 
  message: Message; 
  chat: Chat; 
  onReply: (msg: Message) => void;
  onEdit: (msg: Message) => void;
  onDelete: (msgId: string) => void;
}> = ({ message, chat, onReply, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const isMe = message.sender === 'me';

  const formatTime = (timeStr: string) => {
    // Simple time formatting
    return timeStr;
  };

  if (message.type === 'text') {
    return (
      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} group`}>
        {!isMe && (
          <img src={chat.avatar} className="w-8 h-8 rounded-full mr-2 mt-auto" alt={chat.name} />
        )}
        
        <div className="relative">
          <div
            className={`max-w-[280px] p-3 rounded-2xl ${
              isMe 
                ? 'bg-green-500 text-white rounded-br-md' 
                : 'bg-white text-gray-900 rounded-bl-md shadow-sm'
            }`}
            onContextMenu={(e) => {
              e.preventDefault();
              setShowMenu(!showMenu);
            }}
          >
            {message.replied && message.replyTo && (
              <div className={`text-xs mb-2 p-2 rounded ${isMe ? 'bg-green-600' : 'bg-gray-100'} border-l-2 ${isMe ? 'border-green-300' : 'border-gray-300'}`}>
                <div className="font-medium">Replying to message</div>
                <div className="opacity-75 truncate">{message.replyTo}</div>
              </div>
            )}
            
            <div className="text-sm leading-relaxed">{message.text}</div>
            {message.edited && (
              <div className={`text-xs mt-1 ${isMe ? 'text-green-100' : 'text-gray-400'}`}>edited</div>
            )}
            
            <div className={`flex items-center justify-end text-xs mt-1 space-x-1 ${isMe ? 'text-green-100' : 'text-gray-400'}`}>
              <span>{formatTime(message.time)}</span>
              {isMe && (
                <div className="flex">
                  {message.delivered && <Check className="w-3 h-3" />}
                  {message.read && <Check className="w-3 h-3 -ml-1" />}
                </div>
              )}
            </div>
          </div>

          {/* Context menu */}
          {showMenu && (
            <div className="absolute top-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[120px] z-10">
              <button 
                onClick={() => { onReply(message); setShowMenu(false); }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 rounded"
              >
                <Reply className="w-4 h-4" />
                <span>Reply</span>
              </button>
              {isMe && (
                <button 
                  onClick={() => { onEdit(message); setShowMenu(false); }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 rounded"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              )}
              <button 
                onClick={() => { onDelete(message.id); setShowMenu(false); }}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 rounded text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (message.type === 'image') {
    return (
      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
        {!isMe && <img src={chat.avatar} className="w-8 h-8 rounded-full mr-2 mt-auto" alt={chat.name} />}
        <div className={`max-w-[280px] p-2 rounded-2xl ${isMe ? 'bg-green-500 rounded-br-md' : 'bg-white rounded-bl-md shadow-sm'}`}>
          <div className="rounded-lg overflow-hidden mb-2">
            <img 
              src={message.url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'} 
              className="w-full h-32 object-cover" 
              alt="Shared image"
            />
          </div>
          {message.text && (
            <div className={`text-sm ${isMe ? 'text-white' : 'text-gray-900'}`}>{message.text}</div>
          )}
          <div className={`flex items-center justify-end text-xs mt-1 ${isMe ? 'text-green-100' : 'text-gray-400'}`}>
            <span>{formatTime(message.time)}</span>
            {isMe && message.delivered && <Check className="w-3 h-3 ml-1" />}
            {isMe && message.read && <Check className="w-3 h-3 -ml-1" />}
          </div>
        </div>
      </div>
    );
  }

  if (message.type === 'voice') {
    return (
      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
        {!isMe && <img src={chat.avatar} className="w-8 h-8 rounded-full mr-2 mt-auto" alt={chat.name} />}
        <div className={`max-w-[280px] p-3 rounded-2xl flex items-center space-x-3 ${isMe ? 'bg-green-500 text-white rounded-br-md' : 'bg-white text-gray-900 rounded-bl-md shadow-sm'}`}>
          <button className={`${isMe ? 'text-white' : 'text-green-500'}`}>
            <Play className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className={`h-1 rounded-full ${isMe ? 'bg-green-300' : 'bg-gray-300'} mb-1`}>
              <div className={`h-full w-1/3 rounded-full ${isMe ? 'bg-white' : 'bg-green-500'}`}></div>
            </div>
            <div className={`text-xs ${isMe ? 'text-green-100' : 'text-gray-500'}`}>
              {message.duration || '0:12'}
            </div>
          </div>
          <div className={`text-xs ${isMe ? 'text-green-100' : 'text-gray-400'}`}>
            {formatTime(message.time)}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const WhatsAppGenerator: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [deviceType, setDeviceType] = useState<'iphone' | 'android'>('iphone');
  const [darkMode, setDarkMode] = useState(false);

  // Enhanced chats with more realistic data
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      lastMessage: 'Yes! See you at 3pm.',
      time: '9:05 AM',
      unread: 2,
      online: true,
      pinned: true,
      muted: false,
      archived: false,
      isGroup: false,
      typing: false,
      messages: [
        { id: 'm1', sender: 'them', text: 'Hey! Are we still on for coffee today?', time: '9:00 AM', type: 'text', delivered: true, read: true },
        { id: 'm2', sender: 'me', text: "Yes! See you at 3pm.", time: '9:05 AM', type: 'text', delivered: true, read: false },
        { id: 'm3', sender: 'them', text: 'Perfect! Looking forward to it 😊', time: '9:06 AM', type: 'text', delivered: true, read: true },
        { id: 'm4', sender: 'me', text: '', time: '9:10 AM', type: 'image', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop', delivered: true, read: false },
        { id: 'm5', sender: 'them', text: '', time: '9:12 AM', type: 'voice', duration: '0:12', delivered: true, read: true }
      ]
    },
    {
      id: '2',
      name: 'Design Team',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
      lastMessage: 'Updated the mockups.',
      time: 'Yesterday',
      unread: 0,
      online: false,
      pinned: false,
      muted: true,
      archived: false,
      isGroup: true,
      typing: false,
      messages: [
        { id: 'm1', sender: 'them', text: 'Updated the mockups. Please review when you have time.', time: 'Yesterday', type: 'text', delivered: true, read: true },
        { id: 'm2', sender: 'me', text: 'Thanks! Will check them out.', time: 'Yesterday', type: 'text', delivered: true, read: true }
      ]
    },
    {
      id: '3',
      name: 'Emma Watson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=200&auto=format&fit=crop',
      lastMessage: 'Loved the photo!',
      time: '8:30 AM',
      unread: 1,
      online: true,
      pinned: false,
      muted: false,
      archived: false,
      isGroup: false,
      typing: true,
      messages: [
        { id: 'm1', sender: 'them', text: 'Loved the photo! Where was this taken?', time: '8:30 AM', type: 'text', delivered: true, read: false }
      ]
    },
    {
      id: '4',
      name: 'Mom',
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop',
      lastMessage: 'Call me when free',
      time: '7:12 AM',
      unread: 0,
      online: false,
      pinned: true,
      muted: false,
      archived: false,
      isGroup: false,
      typing: false,
      messages: [
        { id: 'm1', sender: 'them', text: 'Call me when you get a chance, honey', time: '7:12 AM', type: 'text', delivered: true, read: true },
        { id: 'm2', sender: 'me', text: 'Will call you in an hour!', time: '7:15 AM', type: 'text', delivered: true, read: true }
      ]
    },
    {
      id: '5',
      name: 'Startup Group',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=200&auto=format&fit=crop',
      lastMessage: 'Sprint meeting at 10',
      time: 'Mon',
      unread: 3,
      online: false,
      pinned: false,
      muted: false,
      archived: false,
      isGroup: true,
      typing: false,
      messages: [
        { id: 'm1', sender: 'them', text: 'Sprint meeting at 10 AM tomorrow. Please prepare your updates.', time: 'Mon', type: 'text', delivered: true, read: false }
      ]
    }
  ]);

  const [selectedChatId, setSelectedChatId] = useState<string | null>('1');
  const [viewChat, setViewChat] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'favourites' | 'groups'>('all');
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [showChatInfo, setShowChatInfo] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedChat = chats.find(c => c.id === selectedChatId) || null;

  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (selectedChat?.typing) {
      const timer = setTimeout(() => {
        setChats(prev => prev.map(c => 
          c.id === selectedChat.id ? { ...c, typing: false } : c
        ));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedChat?.typing]);

  const filterChats = (list: Chat[]) => {
    let res = list.filter(c => !c.archived);
    
    if (activeFilter === 'unread') res = res.filter(c => c.unread > 0);
    if (activeFilter === 'favourites') res = res.filter(c => c.pinned);
    if (activeFilter === 'groups') res = res.filter(c => c.isGroup);
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      res = res.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.lastMessage.toLowerCase().includes(q)
      );
    }
    
    // Sort: pinned first, then by time (most recent first)
    return res.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0; // Keep original order for simplicity
    });
  };

  const handleSendMessage = (text: string, type: string = 'text') => {
    if (!selectedChat) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    
    let newMessage: Message;
    
    if (type === 'voice') {
      newMessage = {
        id: Date.now().toString(),
        sender: 'me',
        text: '',
        time,
        type: 'voice',
        duration: '0:' + (Math.floor(Math.random() * 30) + 5).toString().padStart(2, '0'),
        delivered: false,
        read: false,
        replied: !!replyingTo,
        replyTo: replyingTo?.text
      };
    } else if (type === 'image') {
      const imageUrls = [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'
      ];
      newMessage = {
        id: Date.now().toString(),
        sender: 'me',
        text: '',
        time,
        type: 'image',
        url: imageUrls[Math.floor(Math.random() * imageUrls.length)],
        delivered: false,
        read: false,
        replied: !!replyingTo,
        replyTo: replyingTo?.text
      };
    } else {
      newMessage = {
        id: Date.now().toString(),
        sender: 'me',
        text,
        time,
        type: 'text',
        delivered: false,
        read: false,
        replied: !!replyingTo,
        replyTo: replyingTo?.text
      };
    }

    // Update chat with new message
    setChats(prev => prev.map(c => 
      c.id === selectedChat.id 
        ? { 
            ...c, 
            messages: [...c.messages, newMessage],
            lastMessage: newMessage.text || (type === 'voice' ? '🎵 Voice message' : type === 'image' ? '📷 Photo' : newMessage.text),
            time,
            unread: 0
          }
        : c
    ));

    // Clear reply state
    setReplyingTo(null);

    // Simulate delivery after a short delay
    setTimeout(() => {
      setChats(prev => prev.map(c => 
        c.id === selectedChat.id 
          ? {
              ...c,
              messages: c.messages.map(m => 
                m.id === newMessage.id ? { ...m, delivered: true } : m
              )
            }
          : c
      ));
    }, 1000);

    // Simulate read receipt after another delay
    setTimeout(() => {
      setChats(prev => prev.map(c => 
        c.id === selectedChat.id 
          ? {
              ...c,
              messages: c.messages.map(m => 
                m.id === newMessage.id ? { ...m, read: true } : m
              )
            }
          : c
      ));
    }, 3000);

    // Simulate response from other person (sometimes)
    if (Math.random() > 0.7) {
      setTimeout(() => {
        const responses = [
          'Thanks!', 'Got it 👍', 'Sounds good', 'Perfect!', 'Nice!', 'Cool', 'Awesome', 'Great!', 'Love it!', 'Amazing'
        ];
        const responseText = responses[Math.floor(Math.random() * responses.length)];
        const responseTime = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'them',
          text: responseText,
          time: responseTime,
          type: 'text',
          delivered: true,
          read: false
        };

        setChats(prev => prev.map(c => 
          c.id === selectedChat.id 
            ? { 
                ...c, 
                messages: [...c.messages, responseMessage],
                lastMessage: responseText,
                time: responseTime,
                unread: c.unread + 1
              }
            : c
        ));
      }, 2000 + Math.random() * 3000);
    }
  };

  const handleReply = (message: Message) => {
    setReplyingTo(message);
  };

  const handleEdit = (message: Message) => {
    setEditingMessage(message);
    // In a real app, you'd show an edit interface
  };

  const handleDelete = (messageId: string) => {
    if (!selectedChat) return;
    
    setChats(prev => prev.map(c => 
      c.id === selectedChat.id 
        ? {
            ...c,
            messages: c.messages.filter(m => m.id !== messageId)
          }
        : c
    ));
  };

  const toggleChatPin = (chatId: string) => {
    setChats(prev => prev.map(c => 
      c.id === chatId ? { ...c, pinned: !c.pinned } : c
    ));
  };

  const toggleChatMute = (chatId: string) => {
    setChats(prev => prev.map(c => 
      c.id === chatId ? { ...c, muted: !c.muted } : c
    ));
  };

  const archiveChat = (chatId: string) => {
    setChats(prev => prev.map(c => 
      c.id === chatId ? { ...c, archived: true } : c
    ));
  };

  const markAsRead = (chatId: string) => {
    setChats(prev => prev.map(c => 
      c.id === chatId ? { ...c, unread: 0 } : c
    ));
  };

  const features = [
    {
      icon: User,
      title: 'Realistic Chat UI',
      description: 'Authentic WhatsApp interface with proper message bubbles, timestamps, and status indicators.'
    },
    {
      icon: Monitor,
      title: 'Device Frames',
      description: 'Choose between iPhone and Android frames with accurate status bars and navigation elements.'
    },
    {
      icon: Palette,
      title: 'Theme Support',
      description: 'Switch between light and dark themes to match your target platform and user preferences.'
    },
    {
      icon: Download,
      title: 'Export & Share',
      description: 'Export screenshots or text copies for docs, bug reports, tutorials, and stakeholder reviews.'
    },
    {
      icon: Shield,
      title: 'Privacy‑First',
      description: 'All generation happens locally in your browser — nothing is uploaded or stored on our servers.'
    },
    {
      icon: RefreshCw,
      title: 'Quick Presets',
      description: 'Load prebuilt conversation templates to speed up screenshots, demos, and test cases.'
    }
  ];

  const useCases = [
    {
      icon: TestTube2,
      title: 'App Testing',
      description: 'Simulate chat flows and edge cases without real accounts to validate UI and behavior.',
      color: 'bg-green-500'
    },
    {
      icon: Palette,
      title: 'Design Mockups',
      description: 'Produce pixel‑perfect screenshots for portfolios, store listings, and stakeholder reviews.',
      color: 'bg-purple-500'
    },
    {
      icon: Code,
      title: 'Development',
      description: 'Generate consistent sample chats to test layout, spacing, and message rendering in development.',
      color: 'bg-blue-500'
    }
  ];

  const faqs = [
    {
      question: 'Is this a real WhatsApp chat?',
      answer: 'No. This is a simulator for mock conversations — it does not connect to WhatsApp or send messages.'
    },
    {
      question: 'Can I export the chats?',
      answer: 'Yes. Export as an image or plain text, or copy the conversation to your clipboard for sharing.'
    },
    {
      question: 'Is any data uploaded?',
      answer: 'No. All generation happens locally in your browser — we do not transmit or store your content.'
    },
    {
      question: 'Can I customize contact details?',
      answer: 'Yes. Edit names, avatars, last‑seen text, themes, and status‑bar details to match your scenario.'
    },
    {
      question: 'What else is planned?',
      answer: 'Planned features include image and voice message placeholders, direct image export, and shareable presets.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Fake Detail</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About</Link>
              <Link to="/generators" className="text-gray-600 hover:text-purple-600 transition-colors">Generators</Link>
              <Link to="/generators" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">Get Started</Link>
            </nav>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-2 space-y-1">
              <Link to="/" className="block w-full text-left px-3 py-2 text-gray-600 hover:text-purple-600">Home</Link>
              <Link to="/about" className="block w-full text-left px-3 py-2 text-gray-600 hover:text-purple-600">About</Link>
              <Link to="/generators" className="block w-full text-left px-3 py-2 text-gray-600 hover:text-purple-600">Generators</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <Link 
                to="/"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tools
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              WhatsApp Chat Generator
            </h1>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Build believable WhatsApp-style chats in seconds for mockups, demos, and testing. Toggle device headers and themes for pixel‑accurate screenshots.
            </p>

            {/* Device and theme controls */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-4 bg-white/10 rounded-lg p-2">
                <button
                  onClick={() => setDeviceType('iphone')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    deviceType === 'iphone' 
                      ? 'bg-white text-purple-600' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  iPhone
                </button>
                <button
                  onClick={() => setDeviceType('android')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    deviceType === 'android' 
                      ? 'bg-white text-purple-600' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Android
                </button>
              </div>
              
              <div className="flex items-center space-x-4 bg-white/10 rounded-lg p-2">
                <button
                  onClick={() => setDarkMode(false)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    !darkMode 
                      ? 'bg-white text-purple-600' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => setDarkMode(true)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    darkMode 
                      ? 'bg-white text-purple-600' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mobile WhatsApp Clone */}
      <section id="whatsapp-mobile-preview" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className={`${deviceType === 'iphone' ? 'iphone-container' : 'android-container'} relative`}>
              {/* Device frame */}
              <div className={`w-full h-full ${darkMode ? 'bg-gray-900' : 'bg-white'} ${deviceType === 'iphone' ? 'rounded-[2.5rem]' : 'rounded-[1.5rem]'} shadow-2xl border-8 ${deviceType === 'iphone' ? 'border-gray-800' : 'border-gray-700'} overflow-hidden relative`}>
                
                {/* Android camera hole */}
                {deviceType === 'android' && (
                  <div className="android-camera-hole"></div>
                )}

                {/* Status bar */}
                <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} px-6 py-2 flex justify-between items-center text-sm font-medium ${deviceType === 'iphone' ? 'pt-4' : 'pt-6'}`}>
                  <div className="flex items-center space-x-1">
                    <span>9:41</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Signal className="w-4 h-4" />
                    <Wifi className="w-4 h-4" />
                    <div className="w-6 h-3 border border-current rounded-sm">
                      <div className="w-4 h-1.5 bg-current rounded-sm m-0.5"></div>
                    </div>
                  </div>
                </div>

                {/* Main WhatsApp Interface */}
                <div className={`flex h-[calc(100%-3rem)] ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                  
                  {/* Chats List */}
                  <div className={`${viewChat && selectedChat ? 'hidden' : 'block'} w-full ${darkMode ? 'bg-gray-900' : 'bg-white'} flex flex-col`}>
                    {/* WhatsApp Header */}
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-green-600'} text-white px-4 py-3`}>
                      <div className="flex items-center justify-between">
                        <h1 className="text-xl font-semibold">WhatsApp</h1>
                        <div className="flex items-center space-x-4">
                          <Search className="w-5 h-5" />
                          <MoreVertical className="w-5 h-5" />
                        </div>
                      </div>
                      
                      {/* Filter tabs */}
                      <div className="flex items-center space-x-6 mt-3 text-sm">
                        <button 
                          onClick={() => setActiveFilter('all')}
                          className={`pb-2 border-b-2 transition-colors ${activeFilter === 'all' ? 'border-white' : 'border-transparent opacity-70'}`}
                        >
                          All
                        </button>
                        <button 
                          onClick={() => setActiveFilter('unread')}
                          className={`pb-2 border-b-2 transition-colors ${activeFilter === 'unread' ? 'border-white' : 'border-transparent opacity-70'}`}
                        >
                          Unread
                        </button>
                        <button 
                          onClick={() => setActiveFilter('favourites')}
                          className={`pb-2 border-b-2 transition-colors ${activeFilter === 'favourites' ? 'border-white' : 'border-transparent opacity-70'}`}
                        >
                          Favourites
                        </button>
                        <button 
                          onClick={() => setActiveFilter('groups')}
                          className={`pb-2 border-b-2 transition-colors ${activeFilter === 'groups' ? 'border-white' : 'border-transparent opacity-70'}`}
                        >
                          Groups
                        </button>
                      </div>
                    </div>

                    {/* Search bar */}
                    <div className={`px-4 py-3 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search or start new chat"
                          className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} text-sm outline-none focus:ring-2 focus:ring-green-500`}
                        />
                      </div>
                    </div>

                    {/* Chats list */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                      {filterChats(chats).map(chat => (
                        <div
                          key={chat.id}
                          onClick={() => { 
                            setSelectedChatId(chat.id); 
                            setViewChat(true);
                            markAsRead(chat.id);
                          }}
                          className={`flex items-center p-4 cursor-pointer transition-colors ${
                            selectedChatId === chat.id 
                              ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') 
                              : (darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50')
                          } ${darkMode ? 'border-gray-700' : 'border-gray-100'} border-b`}
                        >
                          <div className="relative">
                            <img src={chat.avatar} className="w-12 h-12 rounded-full object-cover" alt={chat.name} />
                            {chat.online && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0 ml-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <h3 className={`font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {chat.name}
                                </h3>
                                {chat.pinned && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                                {chat.muted && <VolumeX className="w-3 h-3 text-gray-400" />}
                              </div>
                              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} ml-2`}>
                                {chat.time}
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-1">
                              <div className={`text-sm truncate ${darkMode ? 'text-gray-300' : 'text-gray-600'} ${chat.typing ? 'text-green-500' : ''}`}>
                                {chat.typing ? 'typing...' : chat.lastMessage}
                              </div>
                              {chat.unread > 0 && (
                                <div className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
                                  {chat.unread > 99 ? '99+' : chat.unread}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat View */}
                  {selectedChat && (
                    <div className={`${viewChat ? 'block' : 'hidden'} w-full ${darkMode ? 'bg-gray-900' : 'bg-white'} flex flex-col`}>
                      {/* Chat header */}
                      <div className={`${darkMode ? 'bg-gray-800' : 'bg-green-600'} text-white px-4 py-3 flex items-center`}>
                        <button 
                          onClick={() => setViewChat(false)} 
                          className="mr-3 text-white hover:text-gray-200"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        
                        <img 
                          src={selectedChat.avatar} 
                          className="w-10 h-10 rounded-full object-cover mr-3" 
                          alt={selectedChat.name}
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h2 className="font-semibold truncate">{selectedChat.name}</h2>
                          <div className="text-xs opacity-90">
                            {selectedChat.typing ? (
                              <span className="text-green-300">typing...</span>
                            ) : selectedChat.online ? (
                              'online'
                            ) : (
                              'last seen recently'
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-white">
                          <button className="hover:text-gray-200">
                            <Video className="w-5 h-5" />
                          </button>
                          <button className="hover:text-gray-200">
                            <PhoneCall className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => setShowChatInfo(!showChatInfo)}
                            className="hover:text-gray-200"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Chat info dropdown */}
                      {showChatInfo && (
                        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b p-4`}>
                          <div className="space-y-2">
                            <button 
                              onClick={() => toggleChatPin(selectedChat.id)}
                              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'} text-sm`}
                            >
                              <Star className={`w-4 h-4 ${selectedChat.pinned ? 'text-yellow-500 fill-current' : ''}`} />
                              <span>{selectedChat.pinned ? 'Unpin chat' : 'Pin chat'}</span>
                            </button>
                            <button 
                              onClick={() => toggleChatMute(selectedChat.id)}
                              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'} text-sm`}
                            >
                              {selectedChat.muted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                              <span>{selectedChat.muted ? 'Unmute' : 'Mute notifications'}</span>
                            </button>
                            <button 
                              onClick={() => archiveChat(selectedChat.id)}
                              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'} text-sm`}
                            >
                              <Archive className="w-4 h-4" />
                              <span>Archive chat</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Messages area */}
                      <div 
                        className={`flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 ${
                          darkMode 
                            ? 'bg-gray-900' 
                            : 'bg-gradient-to-b from-green-50 to-green-100'
                        }`}
                        style={{ 
                          backgroundImage: darkMode 
                            ? 'none' 
                            : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dcf8c6' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
                        }}
                      >
                        {/* Date separator */}
                        <div className="text-center">
                          <span className={`inline-block px-3 py-1 rounded-lg text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white/80 text-gray-600'} shadow-sm`}>
                            Today
                          </span>
                        </div>

                        {/* Messages */}
                        {selectedChat.messages.map((message) => (
                          <MessageBubble
                            key={message.id}
                            message={message}
                            chat={selectedChat}
                            onReply={handleReply}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                          />
                        ))}

                        {/* Typing indicator */}
                        {selectedChat.typing && (
                          <div className="flex justify-start">
                            <img src={selectedChat.avatar} className="w-8 h-8 rounded-full mr-2 mt-auto" alt={selectedChat.name} />
                            <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} p-3 rounded-2xl rounded-bl-md shadow-sm`}>
                              <div className="flex space-x-1">
                                <div className={`w-2 h-2 ${darkMode ? 'bg-gray-400' : 'bg-gray-400'} rounded-full animate-bounce`}></div>
                                <div className={`w-2 h-2 ${darkMode ? 'bg-gray-400' : 'bg-gray-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                                <div className={`w-2 h-2 ${darkMode ? 'bg-gray-400' : 'bg-gray-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div ref={messagesEndRef} />
                      </div>

                      {/* Message composer */}
                      <ChatComposer 
                        selectedChat={selectedChat} 
                        onSend={handleSendMessage}
                        replyingTo={replyingTo}
                        onCancelReply={() => setReplyingTo(null)}
                      />
                    </div>
                  )}

                  {/* Empty state when no chat selected */}
                  {!selectedChat && !viewChat && (
                    <div className={`flex-1 flex items-center justify-center p-8 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                      <div className="text-center">
                        <MessageCircle className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>WhatsApp Web</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Send and receive messages without keeping your phone online.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Export controls */}
          <div className="mt-8 flex justify-center">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export as Image</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export as Text</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How to Use</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Follow these simple steps to create, customize, and export realistic WhatsApp chats.</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 items-start">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">01</div>
              <User className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Select Chat</h3>
              <p className="text-gray-600 leading-relaxed">Choose from existing chats or create new conversations with custom contacts and avatars.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">02</div>
              <MessageCircle className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compose Messages</h3>
              <p className="text-gray-600 leading-relaxed">Type messages, add media, voice notes, and use reply/edit features for realistic conversations.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">03</div>
              <Settings className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customize Appearance</h3>
              <p className="text-gray-600 leading-relaxed">Switch between iPhone/Android frames, light/dark themes, and adjust status indicators.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">04</div>
              <Download className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Export & Share</h3>
              <p className="text-gray-600 leading-relaxed">Export as high-quality images or copy text for documentation, presentations, and testing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Fine-grained controls and presets to help you craft convincing chat screenshots quickly.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Built for realism, speed, and team workflows — create believable chats without manual pixel-pushing.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <CheckCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Accurate Rendering</h3>
              <p className="text-gray-600 leading-relaxed">Faithful representation of WhatsApp UI elements, including status indicators and timestamps.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Fully Interactive</h3>
              <p className="text-gray-600 leading-relaxed">Real chat functionality with typing, sending, replying, editing, and deleting messages.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Team Friendly</h3>
              <p className="text-gray-600 leading-relaxed">Copy, download, or embed conversations into tickets and docs so teams can reproduce issues faster.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 md:py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/50 overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02]">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 md:p-8 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        openFaq === index 
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-600'
                      }`}>
                        <span className="font-bold text-sm">{index + 1}</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4 group-hover:text-purple-700 transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      openFaq === index 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rotate-180' 
                        : 'bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600'
                    }`}>
                      <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                    </div>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <div className="ml-14 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border-l-4 border-gradient-to-b border-purple-500">
                        <p className="text-gray-700 leading-relaxed text-lg">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Create chat screenshots quickly</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">Compose and export believable WhatsApp chats for demos and testing.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('whatsapp-mobile-preview')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Start Creating
            </button>
            <Link 
              to="/generators"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Explore More Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Footer is rendered globally by App */}
    </div>
  );
};

export default WhatsAppGenerator;