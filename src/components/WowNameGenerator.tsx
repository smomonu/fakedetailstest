import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  RefreshCw, 
  Copy, 
  Download, 
  Settings, 
  Shield, 
  TestTube2,
  Palette,ChevronDown,
  ArrowLeft,
  Menu,
  X,
  Star,Gamepad2,
  Sparkles,
  CheckCircle,
  Building2,
  Zap,
  Sword,
  Briefcase
} from 'lucide-react';

interface GeneratedWowName {
  id: string;
  name: string;
  category: string;
}

const WowNameGenerator: React.FC = () => {
  const [generatedNames, setGeneratedNames] = useState<GeneratedWowName[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('human');
  const [nameLength, setNameLength] = useState<number>(12);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [capitalizeFirst, setCapitalizeFirst] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [batchCount, setBatchCount] = useState<number>(25);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const copyRef = useRef<HTMLTextAreaElement>(null);

  const categories = [
    { id: 'human', name: 'Human', icon: User },
    { id: 'orc', name: 'Orc', icon: Sword },
    { id: 'elf', name: 'Elf', icon: Star },
    { id: 'dwarf', name: 'Dwarf', icon: Shield },
    { id: 'undead', name: 'Undead', icon: Zap },
    { id: 'troll', name: 'Troll', icon: Sparkles },
    { id: 'tauren', name: 'Tauren', icon: Building2 },
    { id: 'gnome', name: 'Gnome', icon: TestTube2 },
  ];

  const nameComponents = {
    human: {
      prefixes: ['Aiden', 'Gareth', 'Marcus', 'Theron', 'Aldric', 'Cedric', 'Darius', 'Elias', 'Felix', 'Gavin', 'Hadrian', 'Ivan', 'Jasper', 'Kane', 'Lucius', 'Magnus', 'Nathan', 'Oscar', 'Preston', 'Quinton'],
      suffixes: ['bane', 'ward', 'stone', 'shield', 'blade', 'heart', 'storm', 'forge', 'crown', 'light', 'shadow', 'flame', 'frost', 'steel', 'gold', 'silver', 'iron', 'bronze', 'oak', 'ash']
    },
    orc: {
      prefixes: ['Grok', 'Thok', 'Urok', 'Zug', 'Mok', 'Lok', 'Gar', 'Krog', 'Drok', 'Brok', 'Gul', 'Mal', 'Kor', 'Tor', 'Vor', 'Zar', 'Grom', 'Throm', 'Krom', 'Drom'],
      suffixes: ['gar', 'mash', 'gul', 'dan', 'tar', 'ash', 'osh', 'ugh', 'arg', 'org', 'urk', 'ogg', 'agg', 'ugg', 'igg', 'egg', 'orc', 'ork', 'ark', 'erg']
    },
    elf: {
      prefixes: ['Ael', 'Cael', 'Dael', 'Fael', 'Gael', 'Hael', 'Jael', 'Kael', 'Lael', 'Mael', 'Nael', 'Pael', 'Rael', 'Sael', 'Tael', 'Vael', 'Wael', 'Xael', 'Yael', 'Zael'],
      suffixes: ['aris', 'elen', 'wyn', 'las', 'dor', 'ion', 'iel', 'ael', 'orn', 'eth', 'ith', 'oth', 'uth', 'yth', 'ros', 'los', 'nos', 'dos', 'gos', 'mos']
    },
    dwarf: {
      prefixes: ['Balin', 'Dain', 'Fain', 'Gain', 'Hain', 'Jain', 'Kain', 'Lain', 'Main', 'Nain', 'Pain', 'Rain', 'Sain', 'Tain', 'Vain', 'Wain', 'Xain', 'Yain', 'Zain', 'Bain'],
      suffixes: ['beard', 'axe', 'hammer', 'stone', 'iron', 'gold', 'silver', 'bronze', 'steel', 'forge', 'mine', 'pick', 'shield', 'helm', 'boot', 'fist', 'arm', 'leg', 'eye', 'nose']
    },
    undead: {
      prefixes: ['Mort', 'Grim', 'Dark', 'Death', 'Bone', 'Skull', 'Ghost', 'Shade', 'Shadow', 'Wraith', 'Lich', 'Necro', 'Plague', 'Blight', 'Rot', 'Decay', 'Curse', 'Doom', 'Dread', 'Fear'],
      suffixes: ['whisper', 'moan', 'wail', 'shriek', 'howl', 'cry', 'scream', 'groan', 'sigh', 'breath', 'touch', 'grasp', 'chill', 'frost', 'ice', 'cold', 'pale', 'white', 'gray', 'black']
    },
    troll: {
      prefixes: ['Zul', 'Vol', 'Jal', 'Kal', 'Mal', 'Nal', 'Pal', 'Ral', 'Sal', 'Tal', 'Wal', 'Xal', 'Yal', 'Zal', 'Bul', 'Cul', 'Dul', 'Ful', 'Gul', 'Hul'],
      suffixes: ['jin', 'jan', 'jun', 'jon', 'jyn', 'kin', 'kan', 'kun', 'kon', 'kyn', 'lin', 'lan', 'lun', 'lon', 'lyn', 'min', 'man', 'mun', 'mon', 'myn']
    },
    tauren: {
      prefixes: ['Cairne', 'Baine', 'Hamuul', 'Magatha', 'Tagar', 'Ruak', 'Ahmo', 'Etu', 'Kodo', 'Moo', 'Bull', 'Horn', 'Hoof', 'Hide', 'Fur', 'Mane', 'Tail', 'Earth', 'Wind', 'Thunder'],
      suffixes: ['horn', 'hoof', 'hide', 'mane', 'tail', 'fur', 'wind', 'storm', 'thunder', 'earth', 'stone', 'rock', 'hill', 'mountain', 'plain', 'grass', 'field', 'meadow', 'valley', 'river']
    },
    gnome: {
      prefixes: ['Fizz', 'Buzz', 'Whiz', 'Pop', 'Snap', 'Crack', 'Bang', 'Boom', 'Zap', 'Spark', 'Flash', 'Bolt', 'Shock', 'Jolt', 'Zip', 'Zoom', 'Dash', 'Rush', 'Quick', 'Fast'],
      suffixes: ['widget', 'gadget', 'gizmo', 'doohickey', 'thingamajig', 'contraption', 'device', 'machine', 'engine', 'motor', 'gear', 'spring', 'coil', 'wire', 'bolt', 'nut', 'screw', 'rivet', 'pin', 'clip']
    }
  };

  const features = [
    {
      icon: RefreshCw,
      title: 'Bulk Generation',
      description: 'Produce large, race-specific batches quickly for character creation, alt rosters, or NPC pools.'
    },
    {
      icon: Settings,
      title: 'Race-Aware Patterns',
      description: 'Select a race to apply naming patterns that match established Warcraft phonetics and flavor.'
    },
    {
      icon: Copy,
      title: 'One-Click Copy',
      description: 'Copy individual names or whole lists to clipboard with one click for fast use in-game or in docs.'
    },
    {
      icon: Download,
      title: 'Export & Save',
      description: 'Download plain-text or Markdown-ready name lists for guild rosters, planning, or sharing.'
    },
    {
      icon: Shield,
      title: 'Local & Private',
      description: 'Name generation happens entirely in your browser; nothing is sent or stored externally.'
    },
    {
      icon: Sparkles,
      title: 'Lore-Tuned',
      description: 'Names are tuned for Warcraft-inspired authenticity while keeping creative variety.'
    }
  ];

  const useCases = [
    {
      icon: Gamepad2,
      title: 'Character Creation',
      description: 'Generate authentic character names for new alts, guild recruits, and roleplay personas.',
      color: 'bg-blue-500'
    },
    {
      icon: Palette,
      title: 'Roleplay & Stories',
      description: 'Produce lore-friendly names for roleplay scenes, fan fiction, and in-universe storytelling.',
      color: 'bg-purple-500'
    },
    {
      icon: Building2,
      title: 'Guild Management',
      description: 'Ideal for NPC naming, roster generation, and planning large-scale guild events.',
      color: 'bg-green-500'
    }
  ];

  const faqs = [
    {
      question: 'Are these names lore-friendly for World of Warcraft?',
      answer: 'Yes — the generator follows recognizable naming patterns and phonetics to produce names that feel consistent with Warcraft lore.'
    },
    {
      question: 'Can I use these names for official WoW characters?',
      answer: 'Yes — you can use the generated names in-game, subject to Blizzard’s name availability and naming rules.'
    },
    {
      question: 'Do you have names for all WoW races?',
      answer: 'This tool supports eight major races: Human, Orc, Elf, Dwarf, Undead, Troll, Tauren, and Gnome, each with tailored naming patterns.'
    },
    {
      question: 'How many names can I generate at once?',
      answer: 'There’s no enforced limit — generate a single name or thousands for large projects and planning.'
    },
    {
      question: 'Is my data stored anywhere?',
      answer: 'No — name generation runs locally in your browser and nothing is stored or transmitted.'
    }
  ];

  const generateSingleName = (): string => {
    const category = nameComponents[selectedCategory as keyof typeof nameComponents];
    const prefix = category.prefixes[Math.floor(Math.random() * category.prefixes.length)];
    const suffix = category.suffixes[Math.floor(Math.random() * category.suffixes.length)];
    
    let name = Math.random() > 0.3 ? `${prefix} ${suffix}` : prefix;
    
    // Apply length constraint
    if (name.length > nameLength) {
      name = name.substring(0, nameLength);
    }
    
    // Add numbers if enabled
    if (includeNumbers && name.length < nameLength) {
      const numbersToAdd = Math.min(3, nameLength - name.length);
      for (let i = 0; i < numbersToAdd; i++) {
        name += Math.floor(Math.random() * 10);
      }
    }
    
    
    
    // Add symbols if enabled
    if (includeSymbols && name.length < nameLength) {
      const symbols = ['_', '-', '.'];
      const symbolsToAdd = Math.min(2, nameLength - name.length);
      for (let i = 0; i < symbolsToAdd; i++) {
        name += symbols[Math.floor(Math.random() * symbols.length)];
      }
    }
    
    // Apply capitalization
    if (capitalizeFirst) {
      name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    } else {
      name = name.toLowerCase();
    }
    
    return name;
  };

  const generateNames = () => {
    const count = Math.max(1, batchCount);
    const newNames: GeneratedWowName[] = [];
    const usedNames = new Set();
    
    while (newNames.length < count) {
      const name = generateSingleName();
      
      if (!usedNames.has(name.toLowerCase())) {
        usedNames.add(name.toLowerCase());
        newNames.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name,
          category: selectedCategory
        });
      }
    }
    
    setGeneratedNames(prev => [...newNames, ...prev]);
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (_err) {
      if (copyRef.current) {
        copyRef.current.value = text;
        copyRef.current.select();
        document.execCommand('copy');
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    }
  };

  const exportNames = () => {
    const text = generatedNames.map(n => n.name).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wow-names.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearNames = () => {
    setGeneratedNames([]);
  };

  return (
    <div className="min-h-screen bg-white">
      <textarea ref={copyRef} className="absolute opacity-0 pointer-events-none" tabIndex={-1} />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Fake Detail
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About</Link>
              <Link to="/generators" className="text-gray-600 hover:text-purple-600 transition-colors">Generators</Link>
              <Link to="/generators" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">Get Started</Link>
            </nav>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
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
            <div className="mb-6">
              <Link 
                to="/"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tools
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              WoW Name Generator
            </h1>

            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Instantly craft race-appropriate World of Warcraft names for characters, alts, and NPCs. Tweak length, style, and export settings to fit roleplay, guild lists, or creative projects.
            </p>
          </div>
        </div>
      </section>

      {/* Generator Interface */}
      <section id="generator" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Settings Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 h-auto lg:h-[600px] flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Name Settings</h3>
                
                <div className="flex-1 lg:overflow-y-auto lg:min-h-0 pr-1">
                  {/* Category Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Race</label>
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white text-gray-900 font-medium"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Generate Section */}

                  {/* Length Setting */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name Length: {nameLength}
                    </label>
                    <input
                      type="range"
                      min="6"
                      max="20"
                      value={nameLength}
                      onChange={(e) => setNameLength(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>6</span>
                      <span>20</span>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 mb-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={(e) => setIncludeNumbers(e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">Include Numbers</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={capitalizeFirst}
                        onChange={(e) => setCapitalizeFirst(e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">Capitalize First Letter</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">Include Symbols</span>
                    </label>
                  </div>
                <div className="space-y-3 border-t border-gray-200 pt-3 bg-white flex-shrink-0">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Names
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={batchCount}
                      onChange={(e) => setBatchCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg font-semibold"
                      placeholder="25"
                    />
                    <p className="text-xs text-gray-500 mt-1 text-center">Generate unlimited names at once</p>
                  </div>

                  <button
                    onClick={generateNames}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 text-lg font-semibold"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Generate Names</span>
                  </button>
                  
                  {generatedNames.length > 0 && (
                    <div className="pt-2 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-2 text-center">
                        {generatedNames.length} name{generatedNames.length !== 1 ? 's' : ''} generated
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                    <button
                      onClick={exportNames}
                      disabled={generatedNames.length === 0}
                      className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-xs sm:text-sm ${
                        generatedNames.length === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Export All</span>
                    </button>
                    <button
                      onClick={clearNames}
                      disabled={generatedNames.length === 0}
                      className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm ${
                        generatedNames.length === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Names */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 h-auto lg:h-[600px] flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Generated WoW Names</h3>
                
                <div className="flex-1 flex flex-col lg:min-h-0">
                  {generatedNames.length === 0 ? (
                    <div className="text-center py-8 lg:py-12 flex-1 flex flex-col justify-center">
                      <Sword className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-base lg:text-lg text-gray-500">No WoW names generated yet</p>
                      <p className="text-sm lg:text-base text-gray-400">Choose a race and number of names, then click "Generate Names" to populate your list.</p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col lg:min-h-0">
                      <div className={`space-y-3 flex-1 lg:min-h-0 ${generatedNames.length > 9 ? 'lg:overflow-y-auto' : ''}`}>
                        {generatedNames.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-3 sm:gap-0"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Sword className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-gray-900 text-base sm:text-lg break-all">{item.name}</p>
                                <p className="text-xs sm:text-sm text-gray-500 capitalize">{item.category}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => copyToClipboard(item.name, item.id)}
                              className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base flex-shrink-0 ${
                                copiedId === item.id
                                  ? 'bg-green-600 text-white'
                                  : 'bg-purple-600 text-white hover:bg-purple-700'
                              }`}
                            >
                              {copiedId === item.id ? (
                                <>
                                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="hidden sm:inline">Copied!</span>
                                  <span className="sm:hidden">✓</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="hidden sm:inline">Copy</span>
                                  <span className="sm:hidden">Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Generate race-aware WoW names quickly: pick a race, configure options, generate batches, then export for your projects.</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 items-start">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">01</div>
              <User className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Select Race</h3>
              <p className="text-gray-600 leading-relaxed">Choose Human, Orc, Elf, Dwarf, Undead, Troll, Tauren, or Gnome to bias naming patterns.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">02</div>
              <Settings className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tune Options</h3>
              <p className="text-gray-600 leading-relaxed">Adjust length, symbols, and batch size to match in-game naming rules or roleplay style.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">03</div>
              <RefreshCw className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate</h3>
              <p className="text-gray-600 leading-relaxed">Create single names or bulk rosters for characters, NPCs, or guild lists.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">04</div>
              <Download className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Export</h3>
              <p className="text-gray-600 leading-relaxed">Download plain-text or Markdown-ready lists for guild rosters, wikis, or planning docs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Race-aware patterns, bulk generation, and export tools for storytellers and guild organizers.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
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
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Create lore-friendly names quickly, privately, and in bulk for any WoW project.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Lore-Tuned</h3>
              <p className="text-gray-600 leading-relaxed">Naming patterns match Warcraft phonetics while providing creative variations.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Race Presets</h3>
              <p className="text-gray-600 leading-relaxed">Presets for major races let you spin up suitable names instantly.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Guild Friendly</h3>
              <p className="text-gray-600 leading-relaxed">Export lists for guild rosters, NPCs, or planning events without leaving your browser.</p>
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
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-600'}`}>
                        <span className="font-bold text-sm">{index + 1}</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4 group-hover:text-purple-700 transition-colors">{faq.question}</h3>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600'}`}>
                      <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
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
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Build your legend fast</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">Generate race-appropriate WoW names for roleplay, guilds, and storytelling — private and export-ready.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">Start Generating</button>
            <Link to="/" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">Explore More Tools</Link>
          </div>
        </div>
      </section>

      {/* Footer is rendered globally by App */}
    </div>
  );
};

export default WowNameGenerator; 