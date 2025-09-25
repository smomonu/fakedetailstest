import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer';
import WhatsAppGenerator from './components/WhatsAppGenerator';
import UsernameGenerator from './components/UsernameGenerator';
// NameGenerator removed
import AlienNameGenerator from './components/AlienNameGenerator';
import GodNameGenerator from './components/GodNameGenerator';
import OrcNameGenerator from './components/OrcNameGenerator';
import NicknameGenerator from './components/NicknameGenerator';
import BandNameGenerator from './components/BandNameGenerator';
import DjNameGenerator from './components/DjNameGenerator';
import HorseNameGenerator from './components/HorseNameGenerator';
import PlanetNameGenerator from './components/PlanetNameGenerator';
import WarriorCatNameGenerator from './components/WarriorCatNameGenerator';
import InsultNameGenerator from './components/InsultNameGenerator';
import WowNameGenerator from './components/WowNameGenerator';
// Removed BibleVerseGenerator and PersonalityGenerator per user request
import DwarfNameGenerator from './components/DwarfNameGenerator';
import RandomNameGenerator from './components/RandomNameGenerator';
import BibleVerseGenerator from './components/BibleVerseGenerator';
import PersonalityGenerator from './components/PersonalityGenerator';
import MailGenerator from './components/MailGenerator';
import IMEINumberGenerator from './components/IMEINumberGenerator';
import PhoneNumberGenerator from './components/PhoneNumberGenerator';
import PasswordGenerator from './components/PasswordGenerator';
import AddressGenerator from './components/AddressGenerator';
import CompanyNameGenerator from './components/CompanyGenerator';
import AestheticNameGenerator from './components/AestheticNameGenerator';

import Generators from './components/Generators';
import About from './components/About';
import Seo from './components/Seo';

function App() {

  return (
    <div className="min-h-screen bg-white">
      <Seo />
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/whatsapp-chat-generator" element={<WhatsAppGenerator />} />
         <Route path="/username-generator" element={<UsernameGenerator />} />
         <Route path="/alien-name-generator" element={<AlienNameGenerator />} />
         <Route path="/god-name-generator" element={<GodNameGenerator />} />
         <Route path="/orc-name-generator" element={<OrcNameGenerator />} />
         <Route path="/nickname-generator" element={<NicknameGenerator />} />
         <Route path="/band-name-generator" element={<BandNameGenerator />} />
         <Route path="/dj-name-generator" element={<DjNameGenerator />} />
         <Route path="/horse-name-generator" element={<HorseNameGenerator />} />
         <Route path="/planet-name-generator" element={<PlanetNameGenerator />} />
         <Route path="/warrior-cat-name-generator" element={<WarriorCatNameGenerator />} />
         <Route path="/insult-name-generator" element={<InsultNameGenerator />} />
         <Route path="/wow-name-generator" element={<WowNameGenerator />} />
         {/* personality-generator and bible-verse-generator removed */}
         <Route path="/dwarf-name-generator" element={<DwarfNameGenerator />} />
         <Route path="/random-name-generator" element={<RandomNameGenerator />} />
         {/* name-generator route removed */}
         <Route path="/bible-verse-generator" element={<BibleVerseGenerator />} />
         <Route path="/mail-generator" element={<MailGenerator />} />
         <Route path="/password-generator" element={<PasswordGenerator />} />
         <Route path="/phone-number-generator" element={<PhoneNumberGenerator />} />
         <Route path="/address-generator" element={<AddressGenerator />} />
         <Route path="/company-name-generator" element={<CompanyNameGenerator />} />
         <Route path="/aesthetic-generator" element={<AestheticNameGenerator />} />
         <Route path="/aesthetic-name-generator" element={<AestheticNameGenerator />} />
         <Route path="/imei-number-generator" element={<IMEINumberGenerator />} />
         <Route path="/personality-generator" element={<PersonalityGenerator />} />

         <Route path="/generators" element={<Generators />} />
       </Routes>
      <Footer />
    </div>
  );
}

export default App;