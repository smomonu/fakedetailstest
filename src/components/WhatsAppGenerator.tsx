import React, { useState } from 'react';
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
  Heart
} from 'lucide-react';

const ChatComposer: React.FC<{ selectedChat: any; onSend: (text: string) => void }> = ({ selectedChat, onSend }) => {
  const [text, setText] = useState('');
  return (
    <div className="p-3 border-t border-gray-100 flex items-center space-x-3">
      <button className="text-gray-500"><Smile className="w-6 h-6" /></button>
      <div className="flex items-center flex-1 bg-gray-100 rounded-full px-3 py-2">
        <button className="text-gray-500 mr-2"><Paperclip className="w-5 h-5" /></button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { onSend(text); setText(''); } }}
          placeholder="Type a message"
          className="flex-1 bg-transparent outline-none text-sm"
        />
        <button className="text-gray-500 ml-2"><Mic className="w-5 h-5" /></button>
      </div>
      <button
        onClick={() => { if (text.trim()) { onSend(text); setText(''); } }}
        className="bg-green-500 text-white rounded-full p-3"
        aria-label="Send"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
};

const WhatsAppGenerator: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Chats list and selection state for WhatsApp clone
  const [chats, setChats] = useState(() => [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
      lastMessage: 'Yes! See you at 3pm.',
      time: '9:05 AM',
      unread: 2,
      online: true,
      messages: [
        { id: 'm1', sender: 'them', text: 'Hey! Are we still on for coffee today?', time: '9:00 AM', type: 'text' },
        { id: 'm2', sender: 'me', text: "Yes! See you at 3pm.", time: '9:05 AM', type: 'text', delivered: true },
        { id: 'm3', sender: 'them', text: '', time: '9:10 AM', type: 'image', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder' },
        { id: 'm4', sender: 'me', text: '', time: '9:12 AM', type: 'voice', duration: '0:12' }
      ]
    },
    {
      id: '2',
      name: 'Design Team',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
      lastMessage: 'Updated the mockups.',
      time: 'Yesterday',
      unread: 0,
      online: false,
      messages: [
        { id: 'm1', sender: 'them', text: 'Updated the mockups.', time: 'Yesterday', type: 'text' }
      ]
    },
    {
      id: '3',
      name: 'Emma Watson',
      avatar: 'https://images.unsplash.com/photo-1545996124-1b4a1b7f6f1c?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
      lastMessage: 'Loved the photo!',
      time: '8:30 AM',
      unread: 1,
      online: true,
      messages: [
        { id: 'm1', sender: 'them', text: 'Loved the photo!', time: '8:30 AM', type: 'text' }
      ]
    },
    {
      id: '4',
      name: 'Mom',
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
      lastMessage: 'Call me when free',
      time: '7:12 AM',
      unread: 0,
      online: false,
      messages: [
        { id: 'm1', sender: 'them', text: 'Call me when free', time: '7:12 AM', type: 'text' }
      ]
    },
    {
      id: '5',
      name: 'Startup Group',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
      lastMessage: 'Sprint meeting at 10',
      time: 'Mon',
      unread: 3,
      online: false,
      messages: [
        { id: 'm1', sender: 'them', text: 'Sprint meeting at 10', time: 'Mon', type: 'text' }
      ]
    },
    {
      id: '6',
      name: 'Liam Carter',
      avatar: 'https://images.unsplash.com/photo-1545996109-05b9f2f9d0f2?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
      lastMessage: 'Got the files — thanks!',
      time: 'Sun',
      unread: 0,
      online: false,
      messages: [
        { id: 'm1', sender: 'them', text: 'Got the files — thanks!', time: 'Sun', type: 'text' }
      ]
    },
    {
      id: '7',
      name: 'Ava Martinez',
      avatar: 'https://images.unsplash.com/photo-1545996124-1b4a1b7f6f1c?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
      lastMessage: 'Can we reschedule?',
      time: 'Sat',
      unread: 5,
      online: true,
      messages: [
        { id: 'm1', sender: 'them', text: 'Can we reschedule?', time: 'Sat', type: 'text' }
      ]
    },
    {
      id: '8',
      name: 'Coffee Friends',
      avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
      lastMessage: 'Where to meet?',
      time: 'Fri',
      unread: 0,
      online: false,
      messages: [
        { id: 'm1', sender: 'them', text: 'Where to meet?', time: 'Fri', type: 'text' }
      ]
    },
    {
      id: '9',
      name: 'Sara Lee',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
      lastMessage: 'See you soon!',
      time: 'Thu',
      unread: 0,
      online: true,
      messages: [
        { id: 'm1', sender: 'them', text: 'See you soon!', time: 'Thu', type: 'text' }
      ]
    }
  ]);

  const [selectedChatId, setSelectedChatId] = useState<string | null>('1');
  const [viewChat, setViewChat] = useState<boolean>(true); // on small screens toggles list vs chat view

  const selectedChat = chats.find(c => c.id === selectedChatId) || null;

  // Search and filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all'|'unread'|'favourites'|'groups'>('all');

  function filterChats(list: any[]) {
    let res = list.slice();
    if (activeFilter === 'unread') res = res.filter(c => c.unread && c.unread > 0);
    if (activeFilter === 'favourites') res = res.filter(c => c.favourite);
    if (activeFilter === 'groups') res = res.filter(c => c.name.toLowerCase().includes('group') || c.isGroup);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      res = res.filter(c => c.name.toLowerCase().includes(q) || (c.lastMessage || '').toLowerCase().includes(q));
    }
    return res;
  }

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
            {/* Back to Tools Link */}
            <div className="mb-8">
              <Link 
                to="/"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tools
              </Link>
            </div>
            
            {/* Main Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              WhatsApp Chat Generator
            </h1>
            
            {/* Description */}
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Build believable WhatsApp-style chats in seconds for mockups, demos, and testing. Toggle device headers and themes for pixel‑accurate screenshots.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile WhatsApp Clone Preview (interactive) */}
      <section id="whatsapp-mobile-preview" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="w-[360px] bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Chats list (left on md, full on mobile). Hidden on mobile when a chat is open */}
              <div className={`w-full border-b border-gray-100 ${viewChat ? 'hidden' : 'block'}`}>
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold">Chats</div>
                    <div className="text-sm text-gray-500">New</div>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search or start new chat"
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none"
                    />
                    <button onClick={() => { setSearchQuery(''); setActiveFilter('all'); }} className="text-gray-500 px-2">Clear</button>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <button onClick={() => setActiveFilter('all')} className={`px-2 py-1 rounded ${activeFilter === 'all' ? 'bg-gray-200' : ''}`}>All</button>
                    <button onClick={() => setActiveFilter('unread')} className={`px-2 py-1 rounded ${activeFilter === 'unread' ? 'bg-gray-200' : ''}`}>Unread</button>
                    <button onClick={() => setActiveFilter('favourites')} className={`px-2 py-1 rounded ${activeFilter === 'favourites' ? 'bg-gray-200' : ''}`}>Favourites</button>
                    <button onClick={() => setActiveFilter('groups')} className={`px-2 py-1 rounded ${activeFilter === 'groups' ? 'bg-gray-200' : ''}`}>Groups</button>
                  </div>
                </div>
                <div className="p-2 overflow-y-auto h-[540px]">
                  {filterChats(chats).map(chat => (
                    <div
                      key={chat.id}
                      onClick={() => { setSelectedChatId(chat.id); setViewChat(true); }}
                      className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${selectedChatId === chat.id ? 'bg-gray-100' : ''}`}
                    >
                      <img src={chat.avatar} className="w-12 h-12 rounded-full mr-3" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold truncate">{chat.name}</div>
                          <div className="text-xs text-gray-400 ml-2">{chat.time}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
                          {chat.unread > 0 && <div className="ml-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">{chat.unread}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat view (right on md, toggled on mobile). Hidden on mobile until a chat is opened */}
              <div className={`${viewChat ? 'block' : 'hidden'} w-full bg-white flex flex-col`}>
                {/* status bar / header */}
                {selectedChat ? (
                  <>
                    <div className="bg-green-600 text-white px-3 py-2 flex items-center">
                      {viewChat ? (
                        <button onClick={() => setViewChat(false)} className="mr-3 text-white"><ArrowLeft className="w-5 h-5" /></button>
                      ) : (
                        <div className="w-5 mr-3" />
                      )}
                      <img src={selectedChat.avatar} className="w-9 h-9 rounded-full mr-3 ring-2 ring-green-700" />
                      <div className="flex-1">
                        <div className="font-semibold">{selectedChat.name}</div>
                        <div className="text-xs opacity-90">{selectedChat.online ? 'online' : 'last seen recently'}</div>
                      </div>
                      <div className="flex items-center space-x-3 text-white opacity-95">
                        <PhoneCall className="w-5 h-5" />
                        <Search className="w-5 h-5" />
                        <MoreVertical className="w-5 h-5" />
                      </div>
                    </div>

                    {/* messages */}
                    <div className="p-4 flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
                      <div className="space-y-3">
                        <div className="text-center text-xs text-gray-400">Today</div>
                        {selectedChat.messages.map((m: any) => (
                          m.type === 'text' ? (
                            m.sender === 'me' ? (
                              <div key={m.id} className="flex justify-end">
                                <div className="bg-green-600 text-white p-3 rounded-xl max-w-[70%]">
                                  <div className="text-sm">{m.text}</div>
                                  <div className="flex items-center justify-end text-xs text-green-100 mt-1"><div>{m.time}</div>{m.delivered ? <Check className="w-4 h-4 ml-2" /> : null}</div>
                                </div>
                              </div>
                            ) : (
                              <div key={m.id} className="flex items-start space-x-3">
                                <img src={selectedChat.avatar} className="w-8 h-8 rounded-full" />
                                <div className="bg-white p-3 rounded-xl shadow-sm max-w-[70%]">
                                  <div className="text-sm text-gray-900">{m.text}</div>
                                  <div className="text-xs text-gray-400 mt-1">{m.time}</div>
                                </div>
                              </div>
                            )
                          ) : m.type === 'image' ? (
                            <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : ''}`}>
                              <div className="bg-white p-2 rounded-xl shadow-sm max-w-[70%]">
                                <div className="rounded-lg overflow-hidden">
                                  <img src={m.url} className="w-full h-48 object-cover" />
                                </div>
                                <div className="text-xs text-gray-400 mt-2">{m.time}</div>
                              </div>
                            </div>
                          ) : m.type === 'voice' ? (
                            <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : ''}`}>
                              <div className={`bg-${m.sender === 'me' ? 'green-600 text-white' : 'white'} p-3 rounded-xl max-w-[70%] flex items-center space-x-3`}>
                                <Play className="w-5 h-5" />
                                <div className="flex-1 text-sm">Voice message • {m.duration}</div>
                                <div className="text-xs text-gray-400">{m.time}</div>
                              </div>
                            </div>
                          ) : null
                        ))}
                      </div>
                    </div>

                    {/* composer */}
                    {selectedChat ? (
                      <ChatComposer selectedChat={selectedChat} onSend={(text: string) => {
                        if (!text.trim()) return;
                        const time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
                        const newMsg = { id: Date.now().toString(), sender: 'me', text, time, type: 'text', delivered: false };
                        setChats(prev => prev.map(c => c.id === selectedChat.id ? { ...c, messages: [...c.messages, newMsg], lastMessage: text, time } : c));
                      }} />
                    ) : (
                      <div className="flex-1 flex items-center justify-center p-8">
                        <div className="text-center">
                          <div className="text-2xl text-gray-400 mb-2">💬</div>
                          <div className="text-lg font-semibold">Select a chat</div>
                          <div className="text-sm text-gray-500 mt-2">Tap any conversation on the left to open the chat.</div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="text-2xl text-gray-400 mb-2">💬</div>
                      <div className="text-lg font-semibold">Select a chat</div>
                      <div className="text-sm text-gray-500 mt-2">Tap any conversation on the left to open the chat.</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How to Use</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Follow these simple steps to create, customize, and export realistic WhatsApp chats.</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 items-start">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">01</div>
              <User className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compose Messages</h3>
              <p className="text-gray-600 leading-relaxed">Add messages as either participant, edit text inline, and set delivery/read states for each message.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">02</div>
              <CircleDot className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Configure Settings</h3>
              <p className="text-gray-600 leading-relaxed">Choose device type, theme (dark/light), timestamps, and read receipts to match your target platform.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">03</div>
              <Monitor className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Preview & Tweak</h3>
              <p className="text-gray-600 leading-relaxed">Use the live preview to fine-tune message order, avatars, and ephemeral/voice attachments before exporting.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">04</div>
              <Download className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Export or Share</h3>
              <p className="text-gray-600 leading-relaxed">Download as image/video/text, copy to clipboard, or embed the conversation in tickets and docs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              Fine-grained controls and presets to help you craft convincing chat screenshots quickly.
            </p>
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
      <section id="why-choose-us" className="py-12 md:py-16 bg-gray-50">
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
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Fully Customizable</h3>
              <p className="text-gray-600 leading-relaxed">Switch themes, device frames, and message states to match your target platform and scenario.</p>
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
        {/* Background decoration */}
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
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
          <h2 className="text-4xl font-bold text-white mb-6">
            Create chat screenshots quickly
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Compose and export believable WhatsApp chats for demos and testing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Start Generating
            </button>
            <Link 
              to="/"
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
