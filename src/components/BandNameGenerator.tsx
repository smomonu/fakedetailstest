import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Music2, 
  RefreshCw, 
  Copy, 
  Download, 
  Settings, 
  Shield, 
  TestTube2,
  Palette,
  ChevronDown,
  ArrowLeft,
  Menu,
  X,
  Star,
  Globe,
  Gamepad2,
  Sparkles,
  CheckCircle,
  Heart,
  Volume2,
  Headphones,
  Briefcase
} from 'lucide-react';

interface GeneratedBandName {
  id: string;
  bandName: string;
  category: string;
}

const BandNameGenerator: React.FC = () => {
  const [generatedBandNames, setGeneratedBandNames] = useState<GeneratedBandName[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('rock');
  const [bandNameLength, setBandNameLength] = useState<number>(12);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [capitalizeFirst, setCapitalizeFirst] = useState<boolean>(true);
  const [batchCount, setBatchCount] = useState<number>(25);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const copyRef = useRef<HTMLTextAreaElement>(null);

  const categories = [
    { id: 'rock', name: 'Rock & Metal', icon: Volume2 },
    { id: 'pop', name: 'Pop & Dance', icon: Star },
    { id: 'indie', name: 'Indie & Alternative', icon: Headphones },
    { id: 'electronic', name: 'Electronic & EDM', icon: Sparkles },
    { id: 'jazz', name: 'Jazz & Blues', icon: Music2 },
    { id: 'country', name: 'Country & Folk', icon: Heart },
    { id: 'punk', name: 'Punk & Hardcore', icon: Gamepad2 },
    { id: 'classical', name: 'Classical & Orchestra', icon: Palette },
    { id: 'hip-hop', name: 'Hip-Hop & Rap', icon: Volume2 },
    { id: 'reggae', name: 'Reggae & World', icon: Globe },
    { id: 'experimental', name: 'Experimental & Avant-garde', icon: TestTube2 },
    { id: 'cover', name: 'Cover & Tribute', icon: Copy },
  ];

  const wordBases = {
    rock: [
      'Thunder', 'Lightning', 'Storm', 'Fire', 'Steel', 'Iron', 'Stone', 'Rock', 'Metal', 'Blade',
      'Rage', 'Fury', 'Wrath', 'Power', 'Force', 'Impact', 'Crash', 'Boom', 'Bang', 'Blast',
      'Black', 'Dark', 'Shadow', 'Night', 'Deep', 'Heavy', 'Wild', 'Savage', 'Rebel', 'Riot',
      'Dragon', 'Wolf', 'Tiger', 'Eagle', 'Viper', 'Scorpion', 'Phoenix', 'Raven', 'Falcon', 'Panther'
    ],
    pop: [
      'Star', 'Shine', 'Bright', 'Light', 'Glow', 'Sparkle', 'Glitter', 'Crystal', 'Diamond', 'Pearl',
      'Sweet', 'Sugar', 'Honey', 'Candy', 'Cherry', 'Berry', 'Peach', 'Rose', 'Lily', 'Violet',
      'Dream', 'Magic', 'Wonder', 'Miracle', 'Fantasy', 'Fairy', 'Angel', 'Heaven', 'Cloud', 'Sky',
      'Dance', 'Beat', 'Rhythm', 'Groove', 'Move', 'Flow', 'Vibe', 'Energy', 'Party', 'Celebration'
    ],
    indie: [
      'Velvet', 'Silk', 'Cotton', 'Wool', 'Linen', 'Canvas', 'Paper', 'Ink', 'Paint', 'Brush',
      'Whisper', 'Echo', 'Murmur', 'Sigh', 'Breath', 'Wind', 'Breeze', 'Calm', 'Peace', 'Quiet',
      'Vintage', 'Retro', 'Classic', 'Antique', 'Old', 'Worn', 'Faded', 'Rustic', 'Weathered', 'Aged',
      'Forest', 'Woods', 'Tree', 'Leaf', 'Branch', 'Root', 'Moss', 'Fern', 'Pine', 'Oak'
    ],
    electronic: [
      'Neon', 'Laser', 'Digital', 'Cyber', 'Virtual', 'Matrix', 'Code', 'Binary', 'Pixel', 'Data',
      'Synth', 'Bass', 'Beat', 'Drop', 'Loop', 'Sample', 'Filter', 'Delay', 'Reverb', 'Distortion',
      'Electric', 'Voltage', 'Current', 'Circuit', 'Wire', 'Signal', 'Frequency', 'Wave', 'Pulse', 'Surge',
      'Future', 'Space', 'Cosmic', 'Galaxy', 'Star', 'Planet', 'Orbit', 'Rocket', 'Satellite', 'Solar'
    ],
    jazz: [
      'Blue', 'Smooth', 'Cool', 'Hot', 'Sweet', 'Mellow', 'Rich', 'Deep', 'Warm', 'Soft',
      'Swing', 'Groove', 'Rhythm', 'Beat', 'Time', 'Tempo', 'Feel', 'Soul', 'Spirit', 'Heart',
      'Night', 'Moon', 'Midnight', 'Dawn', 'Sunset', 'Evening', 'Late', 'Early', 'Morning', 'Twilight',
      'Club', 'Lounge', 'Bar', 'Cafe', 'Corner', 'Street', 'Avenue', 'Boulevard', 'Plaza', 'Square'
    ],
    country: [
      'Road', 'Highway', 'Trail', 'Path', 'Creek', 'River', 'Mountain', 'Valley', 'Hill', 'Ridge',
      'Barn', 'Farm', 'Field', 'Meadow', 'Prairie', 'Plains', 'Range', 'Pasture', 'Acre', 'Land',
      'Old', 'New', 'Red', 'Blue', 'Green', 'Golden', 'Silver', 'Wild', 'Free', 'True',
      'Horse', 'Cow', 'Dog', 'Cat', 'Bird', 'Eagle', 'Hawk', 'Dove', 'Robin', 'Cardinal'
    ],
    punk: [
      'Anarchy', 'Chaos', 'Riot', 'Rebel', 'Fight', 'War', 'Battle', 'Clash', 'Strike', 'Attack',
      'Dead', 'Kill', 'Destroy', 'Break', 'Smash', 'Crash', 'Burn', 'Explode', 'Blast', 'Bomb',
      'Mad', 'Crazy', 'Wild', 'Insane', 'Sick', 'Twisted', 'Bent', 'Broken', 'Damaged', 'Wrecked',
      'Street', 'Alley', 'Gutter', 'Sewer', 'Trash', 'Waste', 'Scrap', 'Junk', 'Rust', 'Decay'
    ],
    classical: [
      'Symphony', 'Concerto', 'Sonata', 'Suite', 'Prelude', 'Fugue', 'Overture', 'Movement', 'Theme', 'Variation',
      'Grand', 'Royal', 'Imperial', 'Noble', 'Majestic', 'Elegant', 'Graceful', 'Beautiful', 'Divine', 'Sacred',
      'Chamber', 'Orchestra', 'Ensemble', 'Quartet', 'Quintet', 'Trio', 'Duo', 'Solo', 'Chorus', 'Choir',
      'Gold', 'Silver', 'Bronze', 'Marble', 'Crystal', 'Diamond', 'Pearl', 'Ivory', 'Ebony', 'Velvet'
    ],
    'hip-hop': [
      'Fresh', 'Dope', 'Sick', 'Tight', 'Hot', 'Fire', 'Flame', 'Burn', 'Blaze', 'Heat',
      'Street', 'Block', 'Hood', 'City', 'Urban', 'Metro', 'Downtown', 'Uptown', 'East', 'West',
      'Flow', 'Rhyme', 'Beat', 'Bass', 'Drop', 'Break', 'Scratch', 'Mix', 'Cut', 'Spin',
      'Real', 'True', 'Raw', 'Pure', 'Hard', 'Tough', 'Strong', 'Bold', 'Brave', 'Fierce'
    ],
    reggae: [
      'Island', 'Beach', 'Sun', 'Surf', 'Wave', 'Ocean', 'Sea', 'Coast', 'Shore', 'Sand',
      'Rasta', 'Roots', 'Culture', 'Tribe', 'Unity', 'Peace', 'Love', 'Harmony', 'Spirit', 'Soul',
      'Green', 'Gold', 'Red', 'Yellow', 'Natural', 'Organic', 'Pure', 'Clean', 'Fresh', 'Free',
      'Lion', 'Eagle', 'Dove', 'Butterfly', 'Flower', 'Tree', 'Palm', 'Coconut', 'Mango', 'Banana'
    ],
    experimental: [
      'Abstract', 'Concrete', 'Surreal', 'Bizarre', 'Strange', 'Weird', 'Odd', 'Unusual', 'Unique', 'Rare',
      'Noise', 'Static', 'Feedback', 'Distortion', 'Glitch', 'Error', 'Bug', 'Virus', 'Crash', 'Freeze',
      'Quantum', 'Atomic', 'Molecular', 'Cellular', 'Neural', 'Digital', 'Analog', 'Hybrid', 'Synthetic', 'Organic',
      'Lab', 'Test', 'Trial', 'Study', 'Research', 'Analysis', 'Theory', 'Hypothesis', 'Discovery', 'Innovation'
    ],
    cover: [
      'Tribute', 'Homage', 'Salute', 'Honor', 'Respect', 'Memory', 'Legacy', 'Heritage', 'Tradition', 'Classic',
      'Revival', 'Reborn', 'Return', 'Comeback', 'Encore', 'Again', 'Once', 'More', 'Extra', 'Bonus',
      'Cover', 'Version', 'Rendition', 'Interpretation', 'Take', 'Spin', 'Twist', 'Style', 'Way', 'Method',
      'Band', 'Group', 'Collective', 'Society', 'Club', 'Circle', 'Union', 'Alliance', 'League', 'Guild'
    ]
  };

  const features = [
    {
      icon: RefreshCw,
      title: 'Fast Batch Creation',
      description: 'Produce large lists of band name ideas instantly for demos, artist profiles, and creative sessions.'
    },
    {
      icon: Settings,
      title: 'Genre-Specific Modes',
      description: 'Select a music genre to bias word choices and patterns for rock, pop, indie, electronic, and more.'
    },
    {
      icon: Copy,
      title: 'Quick Copy',
      description: 'Copy any band name with one click or copy an entire shortlist for sharing and selection.'
    },
    {
      icon: Download,
      title: 'Export & Integrate',
      description: 'Download plain-text lists for setlists, promos, or team collaboration; import into spreadsheets or tools.'
    },
    {
      icon: Shield,
      title: 'Local & Private',
      description: 'Generation runs in your browser — we do not upload or store your inputs or generated names.'
    },
    {
      icon: Sparkles,
      title: 'Authentic Variations',
      description: 'Pattern-based generation produces single-word, two-word, "The X" and other band-typical formats.'
    }
  ];

  const useCases = [
    {
      icon: Music2,
      title: 'New Bands & Artists',
      description: 'Find memorable artist and band names for launches, EPs, and marketing across genres.',
      color: 'bg-purple-500'
    },
    {
      icon: Gamepad2,
      title: 'Creative Projects',
      description: 'Generate authentic band names for fictional groups in games, films, or storytelling.',
      color: 'bg-blue-500'
    },
    {
      icon: Palette,
      title: 'Production & DJ Use',
      description: 'Discover artist and DJ names suitable for production credits, gigs, and branding.',
      color: 'bg-green-500'
    }
  ];

  const faqs = [
    {
      question: 'Are the generated band names unique?',
      answer: 'Names are generated from randomized templates and are unlikely to collide within the same batch; always check for existing trademarks before using commercially.'
    },
    {
      question: 'Can I control band name formats?',
      answer: 'Yes — generation includes single-word, two-word, "The X", plural and connector patterns; you can also set length and enable numbers or symbols.'
    },
    {
      question: 'Is any data uploaded?',
      answer: 'No — all generation and export happen locally in your browser. We do not transmit or retain your generated names.'
    },
    {
      question: 'How many names can I generate?',
      answer: 'There is no hard limit — generate a few for inspiration or thousands to seed lists and team brainstorming.'
    }
  ];

  const generateSingleBandName = (): string => {
    const bases = wordBases[selectedCategory as keyof typeof wordBases];
    const base1 = bases[Math.floor(Math.random() * bases.length)];
    const base2 = bases[Math.floor(Math.random() * bases.length)];
    
    // Common band name patterns
    const patterns = [
      base1, // Single word
      `${base1} ${base2}`, // Two words
      `The ${base1}`, // The + word
      `${base1} ${base2}s`, // Plural
      `${base1} & ${base2}`, // And connector
      `${base1} of ${base2}`, // Of connector
    ];
    
    let bandName = patterns[Math.floor(Math.random() * patterns.length)];
    
    // Truncate if too long
    if (bandName.length > bandNameLength) {
      bandName = bandName.substring(0, bandNameLength).trim();
    }
    
    // Add numbers if enabled
    if (includeNumbers && bandName.length < bandNameLength) {
      const numbersToAdd = Math.min(3, bandNameLength - bandName.length);
      for (let i = 0; i < numbersToAdd; i++) {
        bandName += Math.floor(Math.random() * 10);
      }
    }
    
    // Add symbols if enabled
    if (includeSymbols && bandName.length < bandNameLength) {
      const symbols = ['_', '-', '.', '&', '+'];
      const symbolsToAdd = Math.min(2, bandNameLength - bandName.length);
      for (let i = 0; i < symbolsToAdd; i++) {
        bandName += symbols[Math.floor(Math.random() * symbols.length)];
      }
    }
    
    // Apply capitalization
    if (capitalizeFirst) {
      bandName = bandName.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ');
    } else {
      bandName = bandName.toLowerCase();
    }
    
    return bandName;
  };

  const generateBandNames = () => {
    const count = Math.max(1, batchCount);
    const newBandNames: GeneratedBandName[] = [];
    const usedBandNames = new Set();
    
    while (newBandNames.length < count) {
      const bandName = generateSingleBandName();
      
      if (!usedBandNames.has(bandName.toLowerCase())) {
        usedBandNames.add(bandName.toLowerCase());
        newBandNames.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          bandName,
          category: selectedCategory
        });
      }
    }
    
    setGeneratedBandNames(prev => [...newBandNames, ...prev]);
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

  const exportBandNames = () => {
    const text = generatedBandNames.map(u => u.bandName).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'band-names.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearBandNames = () => {
    setGeneratedBandNames([]);
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
                <Music2 className="w-6 h-6 text-white" />
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
              Band Name Generator
            </h1>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Generate authentic, genre‑aware band and artist name ideas instantly — choose a genre, tweak formatting, and export lists locally for promotion, projects, or brainstorming.
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
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Band Name Settings</h3>
                
                <div className="flex-1 lg:overflow-y-auto lg:min-h-0 pr-1">
                  {/* Category Selection */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Music Genre</label>
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

                  {/* Length Setting */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Length: {bandNameLength}
                    </label>
                    <input
                      type="range"
                      min="8"
                      max="25"
                      value={bandNameLength}
                      onChange={(e) => setBandNameLength(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>8</span>
                      <span>25</span>
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
                        checked={includeSymbols}
                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">Include Symbols</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={capitalizeFirst}
                        onChange={(e) => setCapitalizeFirst(e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">Proper Case</span>
                    </label>
                  </div>
                </div>

                {/* Generate Section */}
                <div className="space-y-3 border-t border-gray-200 pt-3 bg-white flex-shrink-0">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Band Names
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={batchCount}
                      onChange={(e) => setBatchCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg font-semibold"
                      placeholder="25"
                    />
                    <p className="text-xs text-gray-500 mt-1 text-center">Generate unlimited band names at once</p>
                  </div>

                  <button
                    onClick={generateBandNames}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 text-lg font-semibold"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Generate Band Names</span>
                  </button>
                  
                  {generatedBandNames.length > 0 && (
                    <div className="pt-2 border-t border-gray-200">
                      <div className="text-sm text-gray-600 mb-2 text-center">
                        {generatedBandNames.length} band name{generatedBandNames.length !== 1 ? 's' : ''} generated
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                    <button
                      onClick={exportBandNames}
                      disabled={generatedBandNames.length === 0}
                      className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-xs sm:text-sm ${
                        generatedBandNames.length === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Export All</span>
                    </button>
                    <button
                      onClick={clearBandNames}
                      disabled={generatedBandNames.length === 0}
                      className={`flex-1 px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm ${
                        generatedBandNames.length === 0
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

            {/* Generated Band Names */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 h-auto lg:h-[600px] flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Generated Band Names</h3>
                
                <div className="flex-1 flex flex-col lg:min-h-0">
                  {generatedBandNames.length === 0 ? (
                    <div className="text-center py-8 lg:py-12 flex-1 flex flex-col justify-center">
                      <Music2 className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-base lg:text-lg text-gray-500">No band names generated yet</p>
                      <p className="text-sm lg:text-base text-gray-400">Set your desired count and click "Generate" to get started</p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col lg:min-h-0">
                      <div className={`space-y-3 flex-1 lg:min-h-0 ${generatedBandNames.length > 9 ? 'lg:overflow-y-auto' : ''}`} style={generatedBandNames.length > 9 ? { maxHeight: 'calc(100% - 2rem)' } : {}}>
                        {generatedBandNames.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-3 sm:gap-0"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Music2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-gray-900 text-base sm:text-lg break-all">{item.bandName}</p>
                                <p className="text-xs sm:text-sm text-gray-500 capitalize">{categories.find(c => c.id === item.category)?.name || item.category} style</p>
                              </div>
                            </div>
                            <button
                              onClick={() => copyToClipboard(item.bandName, item.id)}
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
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Pick a genre, tweak formatting, generate candidate names, then shortlist or export for projects and promos.</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 items-start">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">01</div>
              <Music2 className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose Genre</h3>
              <p className="text-gray-600 leading-relaxed">Select rock, pop, indie, electronic, or any genre to bias patterns and tone.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">02</div>
              <Settings className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tune Options</h3>
              <p className="text-gray-600 leading-relaxed">Control length, connectors, numbers, and symbols to fit artist branding.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">03</div>
              <RefreshCw className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate</h3>
              <p className="text-gray-600 leading-relaxed">Produce single or bulk lists with authentic patterns like 'The X', two-word combos, and more.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">04</div>
              <Download className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Export</h3>
              <p className="text-gray-600 leading-relaxed">Download lists for promo, setlists, or team selection sessions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Genre-aware patterns, fast bulk generation, and local export for creative workflows.</p>
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
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Quickly generate authentic band and artist names tailored to genres and branding needs.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Authentic Patterns</h3>
              <p className="text-gray-600 leading-relaxed">Patterns produce realistic single-word, two-word, and 'The X' style names common in music.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Fully Customizable</h3>
              <p className="text-gray-600 leading-relaxed">Adjust genre, length, connectors, and extras to align with artist image.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Team Friendly</h3>
              <p className="text-gray-600 leading-relaxed">Export lists for band selection, promo materials, and collaborative review sessions.</p>
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
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4 group-hover:text-purple-700 transition-colors">
                        {faq.question}
                      </h3>
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
      <section className="py-12 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Find your band's perfect name</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">Generate genre-tailored band names for launches, fiction, or promotional materials — fast and private.</p>
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

export default BandNameGenerator; 