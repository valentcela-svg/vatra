import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Home, MapPin, TrendingUp, Wallet, Building2, ArrowRight, ArrowLeft, ArrowUp, ArrowDown,
  Search, Filter, Plus, Check, X, ChevronRight, ChevronDown, ChevronLeft, Star,
  Bed, Bath, Square, Calendar, Shield, Users, Coins, BarChart3, PieChart as PieIcon,
  Sparkles, Globe, FileText, Send, CheckCircle2, AlertCircle, Loader2, Info,
  Menu, ArrowUpRight, Eye, Heart, Share2, Zap, Activity, Award, BadgeCheck,
  Wifi, Car, Trees, Waves, Mountain, Coffee, ShoppingBag, Train, GraduationCap,
  Hospital, Utensils, Camera, Image as ImageIcon, Maximize2, Download,
  Wind, Sun, Snowflake, Lock, Key, Tv, Wine, Dumbbell, ParkingCircle, ShieldCheck,
  ArrowUpDown, Clock, Mail, Twitter, Instagram, Linkedin, Github, Youtube,
  ChevronUp, MoreHorizontal, RefreshCw, Bell, BookOpen, FileBarChart,
  Flame, Thermometer, AirVent, Briefcase
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart, CartesianGrid, ReferenceLine, PieChart, Pie, Cell } from 'recharts';

// ============================================================
// THEME
// ============================================================

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  :root {
    --parchment: #FAF7F2;
    --parchment-deep: #F2EDE2;
    --parchment-soft: #F6F2EA;
    --ink: #1A1614;
    --ink-soft: #3A322E;
    --ink-faint: #6B5F58;
    --terracotta: #B8410C;
    --terracotta-deep: #8B2F08;
    --terracotta-light: #E5673A;
    --adriatic: #1E3A5F;
    --adriatic-deep: #122643;
    --sand: #E8DFD3;
    --sand-deep: #D4C7B5;
    --sage: #7A8471;
    --sage-light: #A8B09C;
    --gold: #B8893E;
    --gold-light: #D4AB6A;
    --rose: #D4A28C;
    --rose-deep: #B87E66;
    --moss: #4A5942;
    --line: rgba(26, 22, 20, 0.12);
    --line-soft: rgba(26, 22, 20, 0.06);
    --line-strong: rgba(26, 22, 20, 0.25);
    --success: #4A7A5C;
    --warning: #B8893E;
    --danger: #A0392E;
    --shadow-sm: 0 1px 2px rgba(26, 22, 20, 0.04);
    --shadow-md: 0 4px 16px rgba(26, 22, 20, 0.06);
    --shadow-lg: 0 16px 48px rgba(26, 22, 20, 0.1);
  }

  .vatra-app {
    font-family: 'Manrope', sans-serif;
    background: var(--parchment);
    color: var(--ink);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  .display { font-family: 'Instrument Serif', serif; font-weight: 400; letter-spacing: -0.02em; line-height: 1; }
  .display-italic { font-family: 'Instrument Serif', serif; font-weight: 400; font-style: italic; letter-spacing: -0.02em; line-height: 1; }
  .mono { font-family: 'JetBrains Mono', monospace; font-feature-settings: 'tnum'; }
  .num-tabular { font-variant-numeric: tabular-nums; }

  .grain { position: relative; }
  .grain::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.35;
    mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E");
  }

  .btn-primary {
    background: var(--ink); color: var(--parchment);
    padding: 0.85rem 1.5rem; border-radius: 999px;
    font-weight: 500; font-size: 0.9rem; letter-spacing: 0.02em;
    display: inline-flex; align-items: center; gap: 0.5rem;
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    cursor: pointer; border: none; font-family: inherit;
  }
  .btn-primary:hover:not(:disabled) { background: var(--terracotta); transform: translateY(-1px); box-shadow: var(--shadow-md); }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

  .btn-secondary {
    background: transparent; color: var(--ink);
    padding: 0.85rem 1.5rem; border-radius: 999px;
    font-weight: 500; font-size: 0.9rem; letter-spacing: 0.02em;
    display: inline-flex; align-items: center; gap: 0.5rem;
    transition: all 0.3s; cursor: pointer; border: 1px solid var(--ink); font-family: inherit;
  }
  .btn-secondary:hover { background: var(--ink); color: var(--parchment); }

  .btn-ghost {
    background: transparent; color: var(--ink);
    padding: 0.6rem 1rem; border-radius: 999px;
    font-weight: 500; font-size: 0.9rem;
    display: inline-flex; align-items: center; gap: 0.4rem;
    transition: all 0.2s; cursor: pointer; border: none; font-family: inherit;
  }
  .btn-ghost:hover { background: var(--sand); }

  .btn-icon {
    width: 38px; height: 38px; border-radius: 50%;
    background: var(--parchment); border: 1px solid var(--line);
    display: inline-flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s; color: var(--ink);
  }
  .btn-icon:hover { background: var(--ink); color: var(--parchment); border-color: var(--ink); }

  .card { background: var(--parchment); border: 1px solid var(--line); border-radius: 8px; transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
  .card-hover:hover { border-color: var(--ink); box-shadow: var(--shadow-md); transform: translateY(-2px); }

  .pill {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.3rem 0.75rem; border-radius: 999px;
    font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em;
    text-transform: uppercase; white-space: nowrap;
  }

  input, select, textarea {
    background: var(--parchment); border: 1px solid var(--line);
    padding: 0.85rem 1rem; border-radius: 6px;
    font-family: 'Manrope', sans-serif; font-size: 0.95rem;
    color: var(--ink); width: 100%; outline: none;
    transition: all 0.2s;
  }
  input:focus, select:focus, textarea:focus { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(184, 65, 12, 0.1); }
  input:hover, select:hover, textarea:hover { border-color: var(--ink-faint); }

  .label { display: block; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 0.5rem; }

  .marquee-wrap { overflow: hidden; }
  .marquee { display: flex; gap: 4rem; animation: marquee 60s linear infinite; width: max-content; }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  @keyframes fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .fade-up { animation: fade-up 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }

  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  .fade-in { animation: fade-in 0.4s ease backwards; }

  @keyframes slide-in-right { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
  .slide-in-right { animation: slide-in-right 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }

  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  .pulse { animation: pulse 2s ease infinite; }

  @keyframes pulse-dot {
    0% { box-shadow: 0 0 0 0 rgba(184, 65, 12, 0.6); }
    70% { box-shadow: 0 0 0 8px rgba(184, 65, 12, 0); }
    100% { box-shadow: 0 0 0 0 rgba(184, 65, 12, 0); }
  }
  .live-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--terracotta); animation: pulse-dot 2s infinite; }

  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .spin { animation: spin 1s linear infinite; }

  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  .shimmer { background: linear-gradient(90deg, var(--sand) 0%, var(--parchment-deep) 50%, var(--sand) 100%); background-size: 200% 100%; animation: shimmer 2s infinite; }

  .divider-h { height: 1px; background: var(--line); width: 100%; }
  .divider-v { width: 1px; background: var(--line); height: 100%; }

  .modal-backdrop { position: fixed; inset: 0; background: rgba(26, 22, 20, 0.6); backdrop-filter: blur(6px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 1rem; animation: fade-in 0.25s; }

  .scroll-hidden::-webkit-scrollbar { display: none; }
  .scroll-hidden { scrollbar-width: none; -ms-overflow-style: none; }

  .progress-bar { height: 4px; background: var(--sand); border-radius: 999px; overflow: hidden; }
  .progress-fill { height: 100%; background: var(--terracotta); transition: width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }

  .spotlight { background: radial-gradient(circle at 30% 20%, var(--rose) 0%, transparent 50%), radial-gradient(circle at 80% 80%, var(--sand) 0%, transparent 60%); }

  details summary::-webkit-details-marker { display: none; }
  details summary { list-style: none; cursor: pointer; }
  details[open] summary .details-chevron { transform: rotate(180deg); }

  .toast-stack { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 200; display: flex; flex-direction: column; gap: 0.5rem; max-width: 380px; pointer-events: none; }
  .toast { background: var(--ink); color: var(--parchment); padding: 0.85rem 1.1rem; border-radius: 8px; box-shadow: var(--shadow-lg); display: flex; align-items: flex-start; gap: 0.75rem; font-size: 0.9rem; pointer-events: auto; }

  .heart-pop { animation: heart-pop 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
  @keyframes heart-pop { 0% { transform: scale(1); } 50% { transform: scale(1.3); } 100% { transform: scale(1); } }

  .skeleton { background: var(--sand); border-radius: 4px; }

  /* Custom scrollbar */
  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-track { background: var(--parchment-deep); }
  ::-webkit-scrollbar-thumb { background: var(--sand-deep); border-radius: 5px; border: 2px solid var(--parchment-deep); }
  ::-webkit-scrollbar-thumb:hover { background: var(--ink-faint); }

  input[type="range"] { -webkit-appearance: none; height: 4px; background: var(--sand); border-radius: 2px; outline: none; padding: 0; }
  input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: var(--terracotta); cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.2); }
  input[type="range"]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: var(--terracotta); cursor: pointer; border: none; }

  .checkbox { width: 18px; height: 18px; border: 1px solid var(--line); border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0; }
  .checkbox.checked { background: var(--terracotta); border-color: var(--terracotta); color: var(--parchment); }

  .tab { padding: 0.75rem 0; border-bottom: 2px solid transparent; cursor: pointer; transition: all 0.2s; font-weight: 500; font-size: 0.92rem; color: var(--ink-soft); }
  .tab.active { border-bottom-color: var(--terracotta); color: var(--ink); }
  .tab:hover { color: var(--ink); }

  /* Recharts overrides */
  .recharts-cartesian-axis-tick-value { font-family: 'JetBrains Mono', monospace; font-size: 11px; fill: var(--ink-faint); }
  .recharts-tooltip-wrapper { outline: none !important; }
`;

// ============================================================
// IMAGE LIBRARY — real Unsplash photographer-credited photos with captions
// Each photo: { url, caption, credit }
// ============================================================

const IMG = (id) => `https://images.unsplash.com/photo-${id}?w=1600&q=85&auto=format&fit=crop`;

const PHOTO_SETS = {
  blloku: [
    { url: IMG('1502672260266-1c1ef2d93688'), caption: 'Open-plan living, top floor', credit: 'Spacejoy' },
    { url: IMG('1493809842364-78817add7ffb'), caption: 'Walnut joinery in the study', credit: 'Patrick Perkins' },
    { url: IMG('1560448204-e02f11c3d0e2'), caption: 'Master bedroom, east-facing', credit: 'Jason Briscoe' },
    { url: IMG('1505693416388-ac5ce068fe85'), caption: 'Private terrace over Rruga Ismail Qemali', credit: 'Phillip Goldsberry' },
    { url: IMG('1556228720-195a672e8a03'), caption: 'Designer kitchen, Boffi cabinetry', credit: 'Sidekix Media' },
  ],
  riverside: [
    { url: IMG('1512917774080-9991f1c4c750'), caption: 'River and mountain view from the 12th floor', credit: 'R Architecture' },
    { url: IMG('1600585154340-be6161a56a0c'), caption: 'Living area, double-aspect', credit: 'Spacejoy' },
    { url: IMG('1556909114-f6e7ad7d3136'), caption: 'Open kitchen with island', credit: 'Spacejoy' },
    { url: IMG('1600210492486-724fe5c67fb0'), caption: 'Master bedroom', credit: 'Spacejoy' },
    { url: IMG('1567767292278-a4f21aa2d36e'), caption: 'Building exterior, Riverside Tower 1', credit: 'Andrea Davis' },
  ],
  komuna: [
    { url: IMG('1493809842364-78817add7ffb'), caption: 'Living room with herringbone parquet', credit: 'Patrick Perkins' },
    { url: IMG('1560185007-cde436f6a4d0'), caption: 'Family kitchen, recently refreshed', credit: 'Spacejoy' },
    { url: IMG('1505691723518-36a5ac3be353'), caption: 'Children\'s bedroom', credit: 'Annie Spratt' },
    { url: IMG('1560448204-e02f11c3d0e2'), caption: 'Master bedroom, west-facing', credit: 'Jason Briscoe' },
    { url: IMG('1556909114-f6e7ad7d3136'), caption: 'Walking distance to Grand Park', credit: 'Spacejoy' },
  ],
  vlore: [
    { url: IMG('1505881502353-a1986add3762'), caption: 'Sea-facing studio on the Lungomare', credit: 'Andrew Neel' },
    { url: IMG('1571896349842-33c89424de2d'), caption: 'Bedroom with Adriatic view', credit: 'Brian Babb' },
    { url: IMG('1600585154526-990dced4db0d'), caption: 'Compact living + dining', credit: 'Spacejoy' },
    { url: IMG('1518733057094-95b53143d2a7'), caption: 'Lungomare promenade, 30 seconds away', credit: 'Roberto Nickson' },
    { url: IMG('1540541338287-41700207dee6'), caption: 'Vlorë coastline at golden hour', credit: 'Patrick Hendry' },
  ],
  twin: [
    { url: IMG('1567767292278-a4f21aa2d36e'), caption: 'Twin Towers exterior, Skanderbeg Square', credit: 'Andrea Davis' },
    { url: IMG('1600596542815-ffad4c1539a9'), caption: 'Living area with 360° views', credit: 'Spacejoy' },
    { url: IMG('1600210491892-03d54c0aaf87'), caption: 'Master suite', credit: 'Spacejoy' },
    { url: IMG('1556228453-efd6c1ff04f0'), caption: 'Wraparound 38m² terrace', credit: 'Sidekix Media' },
    { url: IMG('1600607687939-ce8a6c25118c'), caption: 'Boffi designer kitchen, 2022', credit: 'Spacejoy' },
  ],
  sarande: [
    { url: IMG('1518733057094-95b53143d2a7'), caption: 'Stand-alone villa on Ksamil Road', credit: 'Roberto Nickson' },
    { url: IMG('1571896349842-33c89424de2d'), caption: 'Master bedroom, sea-facing', credit: 'Brian Babb' },
    { url: IMG('1540541338287-41700207dee6'), caption: 'Private 8×4m pool', credit: 'Patrick Hendry' },
    { url: IMG('1505691938895-1758d7feb511'), caption: 'Outdoor dining terrace', credit: 'Yoko Saito' },
    { url: IMG('1505881502353-a1986add3762'), caption: '2-min walk to Manastir Beach', credit: 'Andrew Neel' },
  ],
  durres: [
    { url: IMG('1554995207-c18c203602cb'), caption: 'Mid-rise apartment, Currila strip', credit: 'Brian Babb' },
    { url: IMG('1600585154084-4e5fe7c39198'), caption: 'Living room with Adriatic view', credit: 'Spacejoy' },
    { url: IMG('1600566753190-17f0baa2a6c3'), caption: 'Refreshed bathroom, 2023', credit: 'Spacejoy' },
    { url: IMG('1600563438938-a9a27216b4f5'), caption: 'Open-plan kitchen', credit: 'Spacejoy' },
    { url: IMG('1540541338287-41700207dee6'), caption: 'Durrës marina, viewed from balcony', credit: 'Patrick Hendry' },
  ],
  pazari: [
    { url: IMG('1502672260266-1c1ef2d93688'), caption: 'Restored Ottoman beams + exposed brick', credit: 'Spacejoy' },
    { url: IMG('1493809842364-78817add7ffb'), caption: 'Boutique Airbnb interior', credit: 'Patrick Perkins' },
    { url: IMG('1556228453-efd6c1ff04f0'), caption: 'Balcony over the cobbled square', credit: 'Sidekix Media' },
    { url: IMG('1505691723518-36a5ac3be353'), caption: 'Bedroom with vintage detailing', credit: 'Annie Spratt' },
    { url: IMG('1560448204-e02f11c3d0e2'), caption: 'Quiet study nook', credit: 'Jason Briscoe' },
  ],
  ksamil: [
    { url: IMG('1518733057094-95b53143d2a7'), caption: 'Beachfront triplex with private staircase', credit: 'Roberto Nickson' },
    { url: IMG('1540541338287-41700207dee6'), caption: 'Rooftop infinity pool', credit: 'Patrick Hendry' },
    { url: IMG('1571896349842-33c89424de2d'), caption: 'Master suite, beachfront', credit: 'Brian Babb' },
    { url: IMG('1505881502353-a1986add3762'), caption: 'Ksamil micro-islands at sunset', credit: 'Andrew Neel' },
    { url: IMG('1505691938895-1758d7feb511'), caption: 'Outdoor dining for 10', credit: 'Yoko Saito' },
  ],
  shkoder: [
    { url: IMG('1564013799919-ab600027ffc6'), caption: 'Loft with Lake Shkodër views', credit: 'Outsite Co' },
    { url: IMG('1493809842364-78817add7ffb'), caption: 'Living area with mountain view', credit: 'Patrick Perkins' },
    { url: IMG('1600210492486-724fe5c67fb0'), caption: 'Bedroom, north-facing', credit: 'Spacejoy' },
    { url: IMG('1556909114-f6e7ad7d3136'), caption: 'Open kitchen, refreshed 2024', credit: 'Spacejoy' },
  ],
  berat: [
    { url: IMG('1556228720-195a672e8a03'), caption: 'Restored Ottoman façade, "city of a thousand windows"', credit: 'Sidekix Media' },
    { url: IMG('1502672260266-1c1ef2d93688'), caption: 'Original timber beams preserved', credit: 'Spacejoy' },
    { url: IMG('1505691723518-36a5ac3be353'), caption: 'Bedroom with hand-restored joinery', credit: 'Annie Spratt' },
    { url: IMG('1556228453-efd6c1ff04f0'), caption: 'View over Mangalem quarter', credit: 'Sidekix Media' },
    { url: IMG('1505691938895-1758d7feb511'), caption: 'Heritage detail, lime plaster', credit: 'Yoko Saito' },
  ],
  korce: [
    { url: IMG('1512917774080-9991f1c4c750'), caption: 'Studio in the restored Korçë Bazaar', credit: 'R Architecture' },
    { url: IMG('1600596542815-ffad4c1539a9'), caption: 'Compact living + dining', credit: 'Spacejoy' },
    { url: IMG('1600563438938-a9a27216b4f5'), caption: 'Kitchenette', credit: 'Spacejoy' },
    { url: IMG('1505691723518-36a5ac3be353'), caption: 'Bedroom alcove', credit: 'Annie Spratt' },
  ],
};

// ============================================================
// AMENITIES & NEIGHBORHOODS
// ============================================================

const AMENITIES = {
  parking: { label: 'Private parking', icon: ParkingCircle },
  elevator: { label: 'Elevator', icon: ArrowUpDown },
  balcony: { label: 'Balcony / terrace', icon: Sun },
  ac: { label: 'A/C throughout', icon: AirVent },
  heating: { label: 'Underfloor heating', icon: Thermometer },
  fireplace: { label: 'Fireplace', icon: Flame },
  pool: { label: 'Pool access', icon: Waves },
  gym: { label: 'Gym in building', icon: Dumbbell },
  concierge: { label: '24/7 concierge', icon: ShieldCheck },
  furnished: { label: 'Fully furnished', icon: Tv },
  wine: { label: 'Wine cellar', icon: Wine },
  storage: { label: 'Storage unit', icon: Lock },
  smartHome: { label: 'Smart home wiring', icon: Zap },
  fiberInternet: { label: 'Fiber internet', icon: Wifi },
  garden: { label: 'Private garden', icon: Trees },
  seaview: { label: 'Sea view', icon: Waves },
  mountainView: { label: 'Mountain view', icon: Mountain },
  rooftop: { label: 'Rooftop access', icon: Sun },
  petFriendly: { label: 'Pet friendly', icon: Heart },
  staffApartment: { label: 'Staff quarters', icon: Briefcase },
};

const NEIGHBORHOODS = {
  'Blloku': {
    city: 'Tirana',
    desc: 'The city\'s most coveted district — a former communist-era enclave turned dining-and-design hub. Cafés, embassies, and the highest concentration of design-led retail in Albania.',
    walkScore: 96, transitScore: 88, vibe: 'Cosmopolitan',
    nearby: { restaurants: 187, cafes: 94, shops: 156, transit: 12 },
    avgPrice: 2680,
    growth: 18.4,
  },
  'Riverside': {
    city: 'Tirana',
    desc: 'A new master-planned development along the Lana river, billed as Tirana\'s most ambitious residential project of the decade. New podium gardens, retail, and a planned metro stop.',
    walkScore: 78, transitScore: 72, vibe: 'New build',
    nearby: { restaurants: 42, cafes: 28, shops: 36, transit: 6 },
    avgPrice: 2350,
    growth: 27.1,
  },
  'Komuna e Parisit': {
    city: 'Tirana',
    desc: 'A leafy, family-oriented residential neighborhood west of the Grand Park. Quieter than Blloku, with strong international school catchment.',
    walkScore: 82, transitScore: 70, vibe: 'Residential',
    nearby: { restaurants: 64, cafes: 38, shops: 51, transit: 9 },
    avgPrice: 1740,
    growth: 14.2,
  },
  'Lungomare': {
    city: 'Vlorë',
    desc: 'Vlorë\'s seaside promenade — the longest in the Western Balkans. A 5km stretch of beach, restaurants, and short-term-rental-friendly apartments.',
    walkScore: 88, transitScore: 60, vibe: 'Coastal',
    nearby: { restaurants: 92, cafes: 47, shops: 38, transit: 4 },
    avgPrice: 1820,
    growth: 22.6,
  },
  'Qendër': {
    city: 'Tirana',
    desc: 'Tirana\'s historic center, anchored by Skanderbeg Square and the Twin Towers. Walking distance to ministries, museums, and the National Theatre.',
    walkScore: 99, transitScore: 95, vibe: 'Historic',
    nearby: { restaurants: 220, cafes: 140, shops: 280, transit: 22 },
    avgPrice: 2890,
    growth: 16.8,
  },
  'Ksamil Road': {
    city: 'Sarandë',
    desc: 'The Albanian Riviera at its most photogenic — turquoise water, white-pebble beaches, and the highest short-term-rental yields on the coast.',
    walkScore: 65, transitScore: 30, vibe: 'Resort',
    nearby: { restaurants: 56, cafes: 34, shops: 22, transit: 2 },
    avgPrice: 2180,
    growth: 31.2,
  },
  'Currila': {
    city: 'Durrës',
    desc: 'Durrës\'s premier seafront residential strip, north of the historic port. Beach access and proximity to the new marina redevelopment.',
    walkScore: 72, transitScore: 58, vibe: 'Seafront',
    nearby: { restaurants: 48, cafes: 31, shops: 42, transit: 7 },
    avgPrice: 1480,
    growth: 19.4,
  },
  'Pazari i Ri': {
    city: 'Tirana',
    desc: 'The "New Bazaar" — Tirana\'s most photogenic dining district. Restored Ottoman-era square, dense restaurant scene, and Airbnb gold standard.',
    walkScore: 95, transitScore: 90, vibe: 'Heritage',
    nearby: { restaurants: 140, cafes: 78, shops: 92, transit: 14 },
    avgPrice: 2240,
    growth: 21.7,
  },
  'Ksamil Beachfront': {
    city: 'Ksamil',
    desc: 'A strip of micro-islands and crystalline coves at Albania\'s southern tip. Premium STR market with peak summer ADRs above €380/night.',
    walkScore: 60, transitScore: 25, vibe: 'Beachfront',
    nearby: { restaurants: 42, cafes: 24, shops: 14, transit: 2 },
    avgPrice: 2980,
    growth: 34.6,
  },
  'Rozafa': {
    city: 'Shkodër',
    desc: 'Northern Albania\'s capital, with views of Rozafa Castle and Lake Shkodër. A growing arts scene and gateway to the Albanian Alps.',
    walkScore: 80, transitScore: 65, vibe: 'Cultural',
    nearby: { restaurants: 68, cafes: 41, shops: 56, transit: 10 },
    avgPrice: 920,
    growth: 12.1,
  },
  'Mangalem': {
    city: 'Berat',
    desc: 'UNESCO World Heritage neighborhood in the "city of a thousand windows." Restored Ottoman houses, premium heritage tourism rentals.',
    walkScore: 76, transitScore: 35, vibe: 'UNESCO',
    nearby: { restaurants: 32, cafes: 21, shops: 18, transit: 3 },
    avgPrice: 1240,
    growth: 17.8,
  },
  'Korçë Old Bazaar': {
    city: 'Korçë',
    desc: 'The "Little Paris of Albania" — a restored Ottoman bazaar district with active café and craft brewery scene, growing winter tourism.',
    walkScore: 84, transitScore: 50, vibe: 'Bohemian',
    nearby: { restaurants: 54, cafes: 67, shops: 38, transit: 8 },
    avgPrice: 1080,
    growth: 14.6,
  },
};

// ============================================================
// PROPERTY DATA — 12 properties with full detail
// ============================================================

const TOKEN_PRICE = 50;

const DEMO_PROPERTIES = [
  {
    id: 'blloku-loft-01',
    name: "Blloku Editor's Loft",
    neighborhood: 'Blloku', city: 'Tirana', type: 'Loft Apartment',
    price: 240000, annualRent: 18720, grossRent: 22400, expenses: 3680,
    bedrooms: 2, bathrooms: 2, sqm: 95, yearBuilt: 2019, floor: 6,
    photos: PHOTO_SETS.blloku,
    description: 'A renovated top-floor loft in the heart of Blloku, Tirana\'s most coveted district. Floor-to-ceiling windows, walnut joinery custom-milled in Korçë, and a private terrace overlooking Rruga Ismail Qemali. Recently re-clad with double-glazed argon-fill windows and a heat-recovery ventilation system.',
    yearRenovated: 2023,
    occupancy: 'Long-term lease',
    tenant: 'Embassy diplomat — 2-year lease, 14 months remaining', rentPaidCurrent: true,
    amenities: ['parking', 'elevator', 'balcony', 'ac', 'heating', 'concierge', 'storage', 'smartHome', 'fiberInternet'],
    risk: 'low',
    status: 'funded', fundedPct: 100, investors: 187, fundedDate: '2025-08-12',
    badge: 'Featured', listedAt: '2025-07-04',
    walkability: 96,
    closesIn: null,
    legalStructure: 'VATRA Blloku-01 SH.P.K. → VATRA Property Fund I (Lux RAIF)',
    cadastreNumber: 'KAR-1019-Bl-01-A6',
    isDemo: true,
  },
  {
    id: 'riverside-12b',
    name: 'Riverside Tower 12B',
    neighborhood: 'Riverside', city: 'Tirana', type: 'Apartment',
    price: 185000, annualRent: 15170, grossRent: 18000, expenses: 2830,
    bedrooms: 2, bathrooms: 1, sqm: 78, yearBuilt: 2024, floor: 12,
    photos: PHOTO_SETS.riverside,
    description: 'New-build apartment in the Riverside development, with mountain and Lana river views from the 12th floor. Underfloor heating, smart-home wiring, and access to a podium garden, gym, and 24/7 concierge. Three-year developer warranty in effect.',
    yearRenovated: null,
    occupancy: 'Vacant — turnkey, awaiting first tenant',
    tenant: 'Available immediately. Strong rental demand from tech sector relocators.', rentPaidCurrent: null,
    amenities: ['parking', 'elevator', 'balcony', 'ac', 'heating', 'pool', 'gym', 'concierge', 'storage', 'smartHome', 'fiberInternet', 'mountainView'],
    risk: 'low',
    status: 'open', fundedPct: 64, investors: 92,
    badge: 'Live', listedAt: '2025-11-18',
    walkability: 78,
    closesIn: 12,
    legalStructure: 'VATRA Riverside-12B SH.P.K. → VATRA Property Fund I',
    cadastreNumber: 'KAR-1023-Rv-T1-12B',
    isDemo: true,
  },
  {
    id: 'komuna-parisit-03',
    name: 'Komuna e Parisit Walk-up',
    neighborhood: 'Komuna e Parisit', city: 'Tirana', type: 'Apartment',
    price: 145000, annualRent: 13195, grossRent: 15600, expenses: 2405,
    bedrooms: 3, bathrooms: 1, sqm: 88, yearBuilt: 2008, floor: 3,
    photos: PHOTO_SETS.komuna,
    description: 'Family-sized apartment on a quiet residential street, walking distance to the Grand Park and the British International School. Recently refreshed with new bathrooms, herringbone parquet throughout, and an open-plan kitchen.',
    yearRenovated: 2024,
    occupancy: 'Long-term lease',
    tenant: 'Albanian family — 3-year lease, 22 months remaining, paid current.', rentPaidCurrent: true,
    amenities: ['parking', 'balcony', 'ac', 'heating', 'storage', 'fiberInternet'],
    risk: 'low',
    status: 'open', fundedPct: 41, investors: 64,
    badge: null, listedAt: '2026-01-08',
    walkability: 82,
    closesIn: 18,
    legalStructure: 'VATRA Komuna-03 SH.P.K. → VATRA Property Fund I',
    cadastreNumber: 'KAR-1014-Kp-A3-08',
    isDemo: true,
  },
  {
    id: 'vlore-seafront',
    name: 'Vlorë Seafront Studio',
    neighborhood: 'Lungomare', city: 'Vlorë', type: 'Studio',
    price: 95000, annualRent: 10830, grossRent: 14400, expenses: 3570,
    bedrooms: 1, bathrooms: 1, sqm: 42, yearBuilt: 2021, floor: 4,
    photos: PHOTO_SETS.vlore,
    description: 'Sea-facing studio on the Lungomare promenade, the longest seafront in the Western Balkans. Operated as a short-term Airbnb rental during peak season (May–October) with strong booking history and 4.92 host rating across 127 reviews.',
    yearRenovated: null,
    occupancy: 'Short-term rental — managed',
    tenant: 'Managed by Lungomare STR Operator. 78% peak occupancy, ADR €165 summer / €68 shoulder.', rentPaidCurrent: true,
    amenities: ['balcony', 'ac', 'seaview', 'furnished', 'fiberInternet', 'rooftop'],
    risk: 'medium',
    status: 'open', fundedPct: 78, investors: 134,
    badge: 'High Yield', listedAt: '2025-09-22',
    walkability: 88,
    closesIn: 4,
    legalStructure: 'VATRA Vlorë-LM-01 SH.P.K. → VATRA STR Fund',
    cadastreNumber: 'KAR-9401-Vl-Lm-04',
    isDemo: true,
  },
  {
    id: 'twin-towers-ph',
    name: 'Twin Towers Penthouse',
    neighborhood: 'Qendër', city: 'Tirana', type: 'Penthouse',
    price: 420000, annualRent: 27300, grossRent: 32400, expenses: 5100,
    bedrooms: 3, bathrooms: 3, sqm: 165, yearBuilt: 2003, floor: 17,
    photos: PHOTO_SETS.twin,
    description: 'Triple-aspect penthouse in the iconic Twin Towers, with 360° views of Mount Dajti and Skanderbeg Square. Wraparound 38m² terrace, designer kitchen by Boffi (2022), dedicated parking and storage.',
    yearRenovated: 2022,
    occupancy: 'Long-term lease',
    tenant: 'Tech executive — 1-year lease, renewing in March. Premium covenant.', rentPaidCurrent: true,
    amenities: ['parking', 'elevator', 'balcony', 'ac', 'heating', 'concierge', 'storage', 'smartHome', 'fiberInternet', 'mountainView', 'rooftop'],
    risk: 'low',
    status: 'open', fundedPct: 22, investors: 41,
    badge: 'Premium', listedAt: '2026-02-01',
    walkability: 99,
    closesIn: 25,
    legalStructure: 'VATRA Twin-PH SH.P.K. → VATRA Premium Fund',
    cadastreNumber: 'KAR-1001-TT-PH-A',
    isDemo: true,
  },
  {
    id: 'sarande-villa',
    name: 'Sarandë Riviera Villa',
    neighborhood: 'Ksamil Road', city: 'Sarandë', type: 'Villa',
    price: 310000, annualRent: 37510, grossRent: 52000, expenses: 14490,
    bedrooms: 4, bathrooms: 3, sqm: 220, yearBuilt: 2020, floor: null,
    photos: PHOTO_SETS.sarande,
    description: 'Stand-alone villa on the Ksamil Road with private 8x4m pool and direct access to Manastir Beach (2-min walk). Operates as a high-end vacation rental with 84% summer occupancy and growing shoulder-season demand. Sleeps 8 across four bedrooms.',
    yearRenovated: null,
    occupancy: 'Short-term rental — managed',
    tenant: 'Professional management. 2025 net yield: 12.1%. ADR €420 peak / €180 shoulder.', rentPaidCurrent: true,
    amenities: ['parking', 'balcony', 'ac', 'pool', 'garden', 'seaview', 'furnished', 'fiberInternet', 'rooftop', 'storage'],
    risk: 'medium',
    status: 'open', fundedPct: 33, investors: 52,
    badge: 'High Yield', listedAt: '2025-12-14',
    walkability: 65,
    closesIn: 21,
    legalStructure: 'VATRA Sarandë-V01 SH.P.K. → VATRA STR Fund',
    cadastreNumber: 'KAR-9301-Sa-Ks-V1',
    isDemo: true,
  },
  {
    id: 'durres-port',
    name: 'Durrës Port View Flat',
    neighborhood: 'Currila', city: 'Durrës', type: 'Apartment',
    price: 120000, annualRent: 10440, grossRent: 12600, expenses: 2160,
    bedrooms: 2, bathrooms: 1, sqm: 68, yearBuilt: 2014, floor: 5,
    photos: PHOTO_SETS.durres,
    description: 'Mid-rise apartment overlooking the Adriatic and the new Durrës marina redevelopment. Strong appreciation outlook tied to the port masterplan and the planned Tirana commuter rail extension (Q3 2027).',
    yearRenovated: 2023,
    occupancy: 'Long-term lease',
    tenant: 'Maritime engineer — 18 months remaining on 3-year lease.', rentPaidCurrent: true,
    amenities: ['parking', 'elevator', 'balcony', 'ac', 'seaview', 'fiberInternet'],
    risk: 'low',
    status: 'open', fundedPct: 55, investors: 71,
    badge: null, listedAt: '2025-10-30',
    walkability: 72,
    closesIn: 9,
    legalStructure: 'VATRA Durrës-Cu-05 SH.P.K. → VATRA Property Fund I',
    cadastreNumber: 'KAR-2001-Du-Cu-05',
    isDemo: true,
  },
  {
    id: 'pazari-boutique',
    name: 'Pazari i Ri Boutique Flat',
    neighborhood: 'Pazari i Ri', city: 'Tirana', type: 'Heritage Apartment',
    price: 175000, annualRent: 15575, grossRent: 21000, expenses: 5425,
    bedrooms: 1, bathrooms: 1, sqm: 64, yearBuilt: 1958, floor: 2,
    photos: PHOTO_SETS.pazari,
    description: 'A characterful one-bed in the New Bazaar quarter, Tirana\'s most photogenic dining district. Exposed brick, restored Ottoman-era beams, and a private balcony over the cobbled square. Operates as a boutique Airbnb.',
    yearRenovated: 2022,
    occupancy: 'Short-term rental',
    tenant: 'Boutique Airbnb — 91% occupancy, 4.96 superhost rating across 213 reviews.', rentPaidCurrent: true,
    amenities: ['balcony', 'ac', 'heating', 'fireplace', 'furnished', 'fiberInternet', 'petFriendly'],
    risk: 'medium',
    status: 'open', fundedPct: 89, investors: 156,
    badge: 'Closing Soon', listedAt: '2025-11-02',
    walkability: 95,
    closesIn: 2,
    legalStructure: 'VATRA Pazari-02 SH.P.K. → VATRA STR Fund',
    cadastreNumber: 'KAR-1003-Pz-A2-04',
    isDemo: true,
  },
  {
    id: 'ksamil-beachfront',
    name: 'Ksamil Beachfront Triplex',
    neighborhood: 'Ksamil Beachfront', city: 'Ksamil', type: 'Villa',
    price: 580000, annualRent: 81200, grossRent: 112000, expenses: 30800,
    bedrooms: 5, bathrooms: 4, sqm: 280, yearBuilt: 2022, floor: null,
    photos: PHOTO_SETS.ksamil,
    description: 'Beachfront triplex with private staircase to the water and a rooftop infinity pool. Operates as a single rental unit during peak (sleeps 10) or split into three independent apartments. Waterfront frontage of 14m, the maximum permitted under the 2023 coastal zoning reform.',
    yearRenovated: null,
    occupancy: 'Short-term rental — managed',
    tenant: 'Concierge management. ADR €680 peak / €290 shoulder. Bookings already 82% confirmed for 2026 peak season.', rentPaidCurrent: true,
    amenities: ['parking', 'pool', 'garden', 'seaview', 'rooftop', 'furnished', 'concierge', 'fiberInternet', 'staffApartment'],
    risk: 'medium',
    status: 'open', fundedPct: 47, investors: 89,
    badge: 'Premium', listedAt: '2025-12-22',
    walkability: 60,
    closesIn: 16,
    legalStructure: 'VATRA Ksamil-Bf-01 SH.P.K. → VATRA Premium Fund',
    cadastreNumber: 'KAR-9311-Ks-Bf-T1',
    isDemo: true,
  },
  {
    id: 'shkoder-rozafa',
    name: 'Shkodër Lakeside Loft',
    neighborhood: 'Rozafa', city: 'Shkodër', type: 'Loft Apartment',
    price: 78000, annualRent: 7878, grossRent: 9600, expenses: 1722,
    bedrooms: 2, bathrooms: 1, sqm: 72, yearBuilt: 1996, floor: 4,
    photos: PHOTO_SETS.shkoder,
    description: 'Renovated loft with views of Lake Shkodër and Rozafa Castle. Northern Albania\'s gateway property — a play on the growing alpine tourism corridor and Shkodër\'s emerging cultural scene.',
    yearRenovated: 2024,
    occupancy: 'Long-term lease',
    tenant: 'University professor — 2-year lease, paid current.', rentPaidCurrent: true,
    amenities: ['balcony', 'ac', 'heating', 'mountainView', 'fiberInternet'],
    risk: 'medium',
    status: 'open', fundedPct: 28, investors: 38,
    badge: null, listedAt: '2026-02-12',
    walkability: 80,
    closesIn: 30,
    legalStructure: 'VATRA Shkodër-Rz-01 SH.P.K. → VATRA Emerging Fund',
    cadastreNumber: 'KAR-4001-Sh-Rz-04',
    isDemo: true,
  },
  {
    id: 'berat-mangalem',
    name: 'Mangalem Heritage House',
    neighborhood: 'Mangalem', city: 'Berat', type: 'Heritage Apartment',
    price: 135000, annualRent: 16200, grossRent: 22000, expenses: 5800,
    bedrooms: 2, bathrooms: 2, sqm: 110, yearBuilt: 1842, floor: null,
    photos: PHOTO_SETS.berat,
    description: 'A protected Ottoman-era house in Berat\'s UNESCO World Heritage quarter. Hand-restored over 18 months by a Tirana heritage architect; original timber, lime plaster, and the iconic stacked-window façade preserved. Operates as a premium heritage rental.',
    yearRenovated: 2024,
    occupancy: 'Short-term rental',
    tenant: 'Premium heritage Airbnb. 4.98 rating, 86% occupancy, ADR €280 peak / €145 shoulder.', rentPaidCurrent: true,
    amenities: ['balcony', 'ac', 'heating', 'fireplace', 'furnished', 'fiberInternet', 'mountainView', 'garden'],
    risk: 'medium',
    status: 'open', fundedPct: 71, investors: 102,
    badge: 'High Yield', listedAt: '2025-10-14',
    walkability: 76,
    closesIn: 7,
    legalStructure: 'VATRA Berat-Mg-01 SH.P.K. → VATRA Heritage Fund',
    cadastreNumber: 'KAR-3001-Be-Mg-08',
    isDemo: true,
  },
  {
    id: 'korce-bazaar',
    name: 'Korçë Bazaar Studio',
    neighborhood: 'Korçë Old Bazaar', city: 'Korçë', type: 'Studio',
    price: 62000, annualRent: 6076, grossRent: 7800, expenses: 1724,
    bedrooms: 1, bathrooms: 1, sqm: 38, yearBuilt: 2018, floor: 2,
    photos: PHOTO_SETS.korce,
    description: 'Compact studio in the restored Korçë Bazaar — Albania\'s "Little Paris." Strong year-round bookings tied to the city\'s café scene, Christmas market, and emerging winter tourism.',
    yearRenovated: 2023,
    occupancy: 'Mid-term rental',
    tenant: 'Mid-term corporate housing — 6 to 12-month leases. Currently leased through July 2026.', rentPaidCurrent: true,
    amenities: ['ac', 'heating', 'furnished', 'fiberInternet'],
    risk: 'medium',
    status: 'open', fundedPct: 16, investors: 24,
    badge: null, listedAt: '2026-03-04',
    walkability: 84,
    closesIn: 35,
    legalStructure: 'VATRA Korçë-Bz-01 SH.P.K. → VATRA Emerging Fund',
    cadastreNumber: 'KAR-7001-Ko-Bz-02',
    isDemo: true,
  },
];

// ============================================================
// SYNTHETIC DATA: distribution history, yield projection
// ============================================================

const generateDistributionHistory = (annualRent, months = 12) => {
  const monthly = annualRent / 12;
  const result = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const seasonalMultiplier = [0.95, 0.93, 0.97, 1.02, 1.05, 1.12, 1.18, 1.20, 1.10, 1.02, 0.96, 0.94][d.getMonth()];
    const noise = 0.94 + Math.random() * 0.12;
    result.push({
      month: monthNames[d.getMonth()],
      year: d.getFullYear(),
      amount: Math.round(monthly * seasonalMultiplier * noise),
      label: `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`,
    });
  }
  return result;
};

const generateProjection = (price, annualGrowth = 0.08) => {
  const result = [];
  const currentYear = new Date().getFullYear();
  for (let i = 0; i <= 5; i++) {
    const value = price * Math.pow(1 + annualGrowth, i);
    result.push({ year: currentYear + i, value: Math.round(value), label: i === 0 ? 'Today' : `+${i}y` });
  }
  return result;
};

// ============================================================
// LIVE ACTIVITY FEED (mock)
// ============================================================

const ACTIVITY_FEED = [
  { who: 'Arben K.', where: 'Tirana', action: 'invested', amount: 850, propertyName: 'Riverside Tower 12B', minutesAgo: 2 },
  { who: 'Sarah M.', where: 'London', action: 'invested', amount: 1500, propertyName: "Blloku Editor's Loft", minutesAgo: 8 },
  { who: 'Diaspora investor', where: 'Toronto', action: 'invested', amount: 350, propertyName: 'Sarandë Riviera Villa', minutesAgo: 14 },
  { who: 'Klara D.', where: 'Tirana', action: 'invested', amount: 250, propertyName: 'Vlorë Seafront Studio', minutesAgo: 23 },
  { who: 'Marco R.', where: 'Milano', action: 'invested', amount: 600, propertyName: 'Pazari i Ri Boutique Flat', minutesAgo: 34 },
  { who: 'Anonymous', where: 'Zürich', action: 'invested', amount: 2400, propertyName: 'Twin Towers Penthouse', minutesAgo: 47 },
  { who: 'Ilir B.', where: 'Tirana', action: 'invested', amount: 200, propertyName: 'Komuna e Parisit Walk-up', minutesAgo: 56 },
  { who: 'Erjon V.', where: 'Vienna', action: 'invested', amount: 1100, propertyName: 'Ksamil Beachfront Triplex', minutesAgo: 71 },
  { who: 'Bora F.', where: 'Berlin', action: 'invested', amount: 450, propertyName: 'Mangalem Heritage House', minutesAgo: 89 },
  { who: 'Edona R.', where: 'New York', action: 'invested', amount: 750, propertyName: 'Durrës Port View Flat', minutesAgo: 102 },
];

// ============================================================
// PRESS / TRUST
// ============================================================

const PRESS_QUOTES = [
  { source: 'IntelliNews', text: '"Albania\'s tokenization framework is the most advanced in the Western Balkans."' },
  { source: 'Politiko Albania', text: '"VATRA is bringing institutional-grade real estate to the diaspora."' },
  { source: 'Balkan Insight', text: '"A serious play on the country\'s 27% annual price growth."' },
  { source: 'Reporter.al', text: '"The first regulated, AFSA-aligned real estate token platform in Albania."' },
];

const TESTIMONIALS = [
  { name: 'Eriol Demolli', location: 'Tirana, AL', role: 'Software engineer', text: 'Started with €100 just to see how it worked. Six months later I own pieces of three Tirana flats and the dashboard pays out every morning. Embarrassingly easy.', avatar: 'ED' },
  { name: 'Linda Hoxha', location: 'Toronto, CA', role: 'Diaspora investor', text: 'I\'d been looking for a way to keep money in Albania for years without flying back to handle a tenant. VATRA solved it. The Luxembourg wrap was the dealbreaker — same protection as a European fund.', avatar: 'LH' },
  { name: 'Filippo Costa', location: 'Milano, IT', role: 'Family office advisor', text: 'We allocated to two coastal STR properties for a client. The yield is real and the SPV structure passed our compliance review. Albania is the trade nobody is talking about yet.', avatar: 'FC' },
];

// ============================================================
// HELPERS
// ============================================================

const ALBANIAN_CITIES = ['Tirana', 'Durrës', 'Vlorë', 'Sarandë', 'Shkodër', 'Korçë', 'Elbasan', 'Berat', 'Gjirokastër', 'Krujë', 'Ksamil'];
const PROPERTY_TYPES_LIST = ['Apartment', 'Loft Apartment', 'Penthouse', 'Studio', 'Villa', 'Townhouse', 'Heritage Apartment', 'Commercial'];

const formatEUR = (n, opts = {}) => {
  if (n === null || n === undefined || isNaN(n)) return '—';
  const rounded = opts.decimals ? n.toFixed(opts.decimals) : Math.round(n);
  const formatted = Number(rounded).toLocaleString('en-US', { minimumFractionDigits: opts.decimals || 0, maximumFractionDigits: opts.decimals || 0 });
  return '€' + formatted;
};
const formatPct = (n, dec = 1) => (n === null || isNaN(n)) ? '—' : n.toFixed(dec) + '%';
const calcYield = (rent, price) => price > 0 ? (rent / price) * 100 : 0;
const calcTokens = (price) => Math.floor(price / TOKEN_PRICE);
const calcDailyRent = (annualRent) => annualRent / 365;
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Photo helper: accepts string URL or { url, caption, credit } object
const pUrl = (p) => typeof p === 'string' ? p : (p?.url || '');
const pCap = (p) => typeof p === 'object' && p?.caption ? p.caption : '';
const pCredit = (p) => typeof p === 'object' && p?.credit ? p.credit : '';
const formatRelTime = (mins) => {
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};
const getInitials = (name) => name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
const riskMeta = (level) => ({
  low: { label: 'Lower risk', color: 'var(--success)', desc: 'Long-term lease, stable tenant, low expense volatility.' },
  medium: { label: 'Moderate risk', color: 'var(--warning)', desc: 'STR or seasonal income; yield variability with tourism cycles.' },
  high: { label: 'Higher risk', color: 'var(--danger)', desc: 'Vacant, development phase, or speculative location.' },
}[level] || { label: 'Moderate risk', color: 'var(--warning)', desc: '' });

// ============================================================
// SHARED COMPONENTS
// ============================================================

function Pill({ children, variant = 'default', icon: Icon }) {
  const styles = {
    default: { background: 'var(--sand)', color: 'var(--ink)' },
    live: { background: 'var(--terracotta)', color: 'var(--parchment)' },
    funded: { background: 'var(--ink)', color: 'var(--parchment)' },
    high: { background: 'var(--gold)', color: 'var(--ink)' },
    premium: { background: 'var(--adriatic)', color: 'var(--parchment)' },
    new: { background: 'var(--moss)', color: 'var(--parchment)' },
    outline: { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line)' },
    closing: { background: 'var(--terracotta-deep)', color: 'var(--parchment)' },
  };
  return (
    <span className="pill" style={styles[variant]}>
      {Icon && <Icon size={11} />}
      {children}
    </span>
  );
}

// SmartImage — handles loading state and falls back to a beautiful gradient with property name on error
function SmartImage({ src, alt, fallbackName, style, onMouseEnter, onMouseLeave, ...rest }) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'

  useEffect(() => { setStatus('loading'); }, [src]);

  // Hash-based gradient color choice for variety in fallback
  const gradientFromName = (name = '') => {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
    const palettes = [
      ['#B8410C', '#E5673A', '#D4A28C'], // terracotta sunset
      ['#1E3A5F', '#4A6A8E', '#A8B6C9'], // adriatic
      ['#4A5942', '#7A8471', '#B8C4A5'], // sage
      ['#B8893E', '#D4AB6A', '#EBD5A8'], // gold
      ['#8B2F08', '#B8410C', '#D4A28C'], // terracotta deep
      ['#3A322E', '#6B5F58', '#A89E97'], // ink
    ];
    return palettes[Math.abs(h) % palettes.length];
  };

  const colors = gradientFromName(fallbackName || alt || 'photo');

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'var(--sand)', ...style?.borderRadius && { borderRadius: style.borderRadius } }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {status !== 'error' && src && (
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: status === 'loaded' ? 1 : 0,
            transition: 'opacity 0.4s ease, transform 0.5s',
            ...style,
          }}
          {...rest}
        />
      )}
      {/* Loading shimmer */}
      {status === 'loading' && (
        <div className="shimmer" style={{ position: 'absolute', inset: 0 }} />
      )}
      {/* Error fallback — beautiful gradient + property name */}
      {(status === 'error' || !src) && (
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255, 255, 255, 0.95)', textAlign: 'center', padding: '1rem' }}>
          <div>
            <Building2 size={28} style={{ opacity: 0.8, marginBottom: '0.5rem' }} />
            <div className="display" style={{ fontSize: '1.1rem', lineHeight: 1.2, maxWidth: 200 }}>{fallbackName || 'Property'}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Live viewers — animated counter that bumps every few seconds
function LiveViewers({ propertyId, baseCount }) {
  // Stable seed per property so the count feels real and not random per render
  const seed = useMemo(() => {
    let h = 0;
    for (let i = 0; i < (propertyId || '').length; i++) h = (h * 31 + propertyId.charCodeAt(i)) | 0;
    return Math.abs(h);
  }, [propertyId]);

  const [count, setCount] = useState(() => baseCount || (60 + (seed % 100)));

  useEffect(() => {
    const tick = () => {
      setCount(prev => {
        // Mostly small +/- changes, occasionally bigger
        const delta = Math.random() < 0.7 ? (Math.random() < 0.5 ? -1 : 1) : (Math.random() < 0.5 ? -3 : 3);
        const next = prev + delta;
        // Keep within reasonable bounds
        return Math.max(40, Math.min(220, next));
      });
    };
    const interval = setInterval(tick, 3500 + Math.random() * 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.85rem', background: 'rgba(184, 65, 12, 0.08)', border: '1px solid rgba(184, 65, 12, 0.25)', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 500 }}>
      <div className="live-dot" />
      <span><strong className="mono num-tabular">{count}</strong> people viewing now</span>
    </div>
  );
}

// PropertyInsights — live social-proof stats specific to a property
function PropertyInsights({ property }) {
  // Stable seed
  const seed = useMemo(() => {
    let h = 0;
    for (let i = 0; i < property.id.length; i++) h = (h * 31 + property.id.charCodeAt(i)) | 0;
    return Math.abs(h);
  }, [property.id]);

  const tokensSold24h = 8 + (seed % 47);
  const fundedThisWeek = 2 + (seed % 9);
  const newInvestors24h = 3 + (seed % 14);
  const watchlistCount = 80 + (seed % 240);

  const insights = [
    { icon: TrendingUp, label: 'Tokens sold (24h)', value: tokensSold24h, accent: 'var(--terracotta)' },
    { icon: ArrowUp, label: 'Funded this week', value: '+' + fundedThisWeek + '%', accent: 'var(--moss)' },
    { icon: Users, label: 'New investors (24h)', value: newInvestors24h, accent: 'var(--adriatic)' },
    { icon: Eye, label: 'On watchlists', value: watchlistCount, accent: 'var(--gold)' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', padding: '1rem', background: 'var(--parchment-deep)', borderRadius: '8px', border: '1px solid var(--line)' }}>
      {insights.map((ins, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: ins.accent + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ins.icon size={14} color={ins.accent} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div className="mono num-tabular" style={{ fontSize: '0.95rem', fontWeight: 700 }}>{ins.value}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ins.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function VatraLogo({ size = 24, color = 'var(--ink)' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M2 22 L12 2 L22 22 Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M7 22 L12 12 L17 22" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="12" cy="22" r="1.4" fill={color} />
      </svg>
      <span className="display" style={{ fontSize: size * 1.05, color, letterSpacing: '0.08em' }}>VATRA</span>
    </div>
  );
}

function Avatar({ name, size = 32, bg }) {
  const colors = ['var(--terracotta)', 'var(--adriatic)', 'var(--gold)', 'var(--moss)', 'var(--rose-deep)', 'var(--sage)'];
  const color = bg || colors[name.charCodeAt(0) % colors.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, color: 'var(--parchment)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 600, flexShrink: 0,
      fontFamily: 'JetBrains Mono, monospace',
    }}>
      {getInitials(name)}
    </div>
  );
}

function FavoriteButton({ active, onClick, size = 18 }) {
  const [popping, setPopping] = useState(false);
  const handle = (e) => {
    e.stopPropagation();
    setPopping(true);
    setTimeout(() => setPopping(false), 400);
    onClick(e);
  };
  return (
    <button onClick={handle} className={`btn-icon ${popping ? 'heart-pop' : ''}`} style={{ background: active ? 'var(--terracotta)' : 'rgba(250, 247, 242, 0.92)', color: active ? 'var(--parchment)' : 'var(--ink)', border: 'none', backdropFilter: 'blur(8px)' }}>
      <Heart size={size} fill={active ? 'currentColor' : 'none'} />
    </button>
  );
}

function RiskBadge({ level }) {
  const meta = riskMeta(level);
  const dots = level === 'low' ? 1 : level === 'medium' ? 2 : 3;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ width: 6, height: 12, borderRadius: '2px', background: i <= dots ? meta.color : 'var(--line)' }} />
        ))}
      </div>
      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: meta.color }}>{meta.label}</span>
    </div>
  );
}

function PropertyCard({ property, onClick, onFavorite, isFavorite }) {
  const yld = calcYield(property.annualRent, property.price);
  const totalTokens = calcTokens(property.price);
  const tokensRemaining = Math.round(totalTokens * (1 - property.fundedPct / 100));

  return (
    <article
      onClick={onClick}
      className="card card-hover grain"
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--sand)' }}>
        <SmartImage
          src={pUrl(property.photos ? property.photos[0] : property.image)}
          alt={property.name}
          fallbackName={property.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {property.badge && (
            <Pill variant={property.badge === 'Live' ? 'live' : property.badge === 'High Yield' ? 'high' : property.badge === 'Premium' ? 'premium' : property.badge === 'Closing Soon' ? 'closing' : property.badge === 'New listing' ? 'new' : 'default'}>
              {property.badge === 'Live' && <><span className="live-dot" /> Live</>}
              {property.badge !== 'Live' && property.badge}
            </Pill>
          )}
          {property.closesIn !== null && property.closesIn !== undefined && property.closesIn <= 7 && property.status === 'open' && (
            <Pill variant="closing" icon={Clock}>{property.closesIn}d left</Pill>
          )}
        </div>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.4rem' }}>
          {onFavorite && <FavoriteButton active={isFavorite} onClick={onFavorite} size={16} />}
        </div>
        {property.photos && property.photos.length > 1 && (
          <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', background: 'rgba(26, 22, 20, 0.7)', backdropFilter: 'blur(8px)', color: 'var(--parchment)', padding: '0.3rem 0.6rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Camera size={11} /> {property.photos.length}
          </div>
        )}
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              <MapPin size={11} /> {property.neighborhood}, {property.city}
            </div>
            <Pill variant="outline">{property.type}</Pill>
          </div>
          <h3 className="display" style={{ fontSize: '1.65rem', lineHeight: 1.05, margin: 0 }}>{property.name}</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Bed size={13} /> {property.bedrooms}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Bath size={13} /> {property.bathrooms}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Square size={13} /> {property.sqm} m²</span>
          {property.yearBuilt && <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={13} /> {property.yearBuilt}</span>}
        </div>

        <div className="divider-h" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <div>
            <div style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>Property Value</div>
            <div className="mono num-tabular" style={{ fontSize: '1.1rem', fontWeight: 700 }}>{formatEUR(property.price)}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>Net Yield</div>
            <div className="mono num-tabular" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--terracotta)' }}>{formatPct(yld)}</div>
          </div>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--ink-soft)' }}>
              {property.status === 'funded' ? (
                <span style={{ color: 'var(--ink)', fontWeight: 600 }}>✓ Fully funded</span>
              ) : (
                <>{tokensRemaining.toLocaleString()} of {totalTokens.toLocaleString()} tokens left</>
              )}
            </span>
            <span className="mono num-tabular" style={{ fontSize: '0.78rem', fontWeight: 700 }}>{property.fundedPct}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${property.fundedPct}%`, background: property.fundedPct === 100 ? 'var(--ink)' : 'var(--terracotta)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.6rem', fontSize: '0.72rem', color: 'var(--ink-soft)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Users size={11} /> {property.investors} investors</span>
            <RiskBadge level={property.risk} />
          </div>
        </div>
      </div>
    </article>
  );
}

// Toast notification system
function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="toast-stack">
      {toasts.map(t => (
        <div key={t.id} className="toast slide-in-right">
          {t.icon && <t.icon size={18} color={t.color || 'var(--rose)'} style={{ flexShrink: 0, marginTop: 2 }} />}
          <div style={{ flex: 1 }}>
            {t.title && <div style={{ fontWeight: 600, marginBottom: t.message ? 2 : 0 }}>{t.title}</div>}
            {t.message && <div style={{ opacity: 0.85, fontSize: '0.85rem' }}>{t.message}</div>}
          </div>
          <button onClick={() => onDismiss(t.id)} style={{ background: 'transparent', border: 'none', color: 'var(--parchment)', opacity: 0.5, cursor: 'pointer', flexShrink: 0 }}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

// Photo Gallery with lightbox — supports captions
function PhotoGallery({ photos, name }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!photos || photos.length === 0) return null;

  const next = () => setCurrent((current + 1) % photos.length);
  const prev = () => setCurrent((current - 1 + photos.length) % photos.length);

  // keyboard navigation
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, current]);

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: photos.length > 1 ? '1.5fr 1fr' : '1fr', gridTemplateRows: photos.length > 2 ? '1fr 1fr' : '1fr', gap: '8px', borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/10', background: 'var(--sand)', position: 'relative' }}>
        <div style={{ gridRow: photos.length > 2 ? 'span 2' : 'auto', position: 'relative', overflow: 'hidden', cursor: 'pointer' }} onClick={() => { setCurrent(0); setLightbox(true); }}>
          <SmartImage src={pUrl(photos[0])} alt={name} fallbackName={name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
          {pCap(photos[0]) && (
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(26, 22, 20, 0.7)', backdropFilter: 'blur(8px)', color: 'var(--parchment)', padding: '0.4rem 0.75rem', borderRadius: '999px', fontSize: '0.78rem' }}>
              {pCap(photos[0])}
            </div>
          )}
        </div>
        {photos[1] && (
          <div style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }} onClick={() => { setCurrent(1); setLightbox(true); }}>
            <SmartImage src={pUrl(photos[1])} alt={name} fallbackName={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        {photos[2] && (
          <div style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }} onClick={() => { setCurrent(2); setLightbox(true); }}>
            <SmartImage src={pUrl(photos[2])} alt={name} fallbackName={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {photos.length > 3 && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(26, 22, 20, 0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--parchment)', fontWeight: 600, gap: '0.5rem', backdropFilter: 'blur(2px)' }}>
                <ImageIcon size={18} /> +{photos.length - 3} more
              </div>
            )}
          </div>
        )}
      </div>

      <button onClick={() => { setCurrent(0); setLightbox(true); }} style={{ marginTop: '0.75rem', background: 'transparent', border: 'none', color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 500 }}>
        <Maximize2 size={14} /> View all {photos.length} photos
      </button>

      {lightbox && (
        <div className="modal-backdrop" onClick={() => setLightbox(false)} style={{ background: 'rgba(20, 16, 14, 0.95)' }}>
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 1200, height: '92vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--parchment)', padding: '0.5rem 1rem', flexShrink: 0 }}>
              <div>
                <div style={{ fontSize: '0.78rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Photo {current + 1} of {photos.length}</div>
                <div className="display" style={{ fontSize: '1.4rem' }}>{name}</div>
              </div>
              <button onClick={() => setLightbox(false)} className="btn-icon" style={{ background: 'rgba(250, 247, 242, 0.15)', color: 'var(--parchment)', border: 'none' }}><X size={18} /></button>
            </div>

            <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, padding: '0.5rem' }}>
              <SmartImage src={pUrl(photos[current])} alt={name} fallbackName={name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px' }} />
              {photos.length > 1 && (
                <>
                  <button onClick={prev} className="btn-icon" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(250, 247, 242, 0.92)', backdropFilter: 'blur(8px)' }}><ChevronLeft size={20} /></button>
                  <button onClick={next} className="btn-icon" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(250, 247, 242, 0.92)', backdropFilter: 'blur(8px)' }}><ChevronRight size={20} /></button>
                </>
              )}
            </div>

            {/* Caption + credit */}
            {pCap(photos[current]) && (
              <div style={{ textAlign: 'center', color: 'var(--parchment)', padding: '0.75rem 2rem', flexShrink: 0 }}>
                <div style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>{pCap(photos[current])}</div>
                {pCredit(photos[current]) && <div style={{ fontSize: '0.72rem', opacity: 0.5 }}>Photo: {pCredit(photos[current])}</div>}
              </div>
            )}

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', overflowX: 'auto', padding: '0.5rem 1rem 1rem', flexShrink: 0 }} className="scroll-hidden">
              {photos.map((p, i) => (
                <div key={i} onClick={() => setCurrent(i)} style={{ width: 64, height: 48, borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', flexShrink: 0, opacity: i === current ? 1 : 0.5, border: i === current ? '2px solid var(--rose)' : '2px solid transparent', transition: 'all 0.2s' }}>
                  <SmartImage src={pUrl(p)} alt="" fallbackName={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Activity feed item
function ActivityItem({ activity, compact = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: compact ? '0.6rem 0' : '0.85rem 0', borderBottom: '1px solid var(--line)' }}>
      <Avatar name={activity.who} size={compact ? 28 : 34} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>
          <strong>{activity.who}</strong> from {activity.where} {activity.action} <strong className="mono">{formatEUR(activity.amount)}</strong>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', marginTop: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          in {activity.propertyName} · {formatRelTime(activity.minutesAgo)}
        </div>
      </div>
      <div className="live-dot" />
    </div>
  );
}

// Custom tooltip for charts
function ChartTooltip({ active, payload, label, prefix = '', suffix = '' }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{ background: 'var(--ink)', color: 'var(--parchment)', padding: '0.6rem 0.85rem', borderRadius: '6px', fontSize: '0.82rem', boxShadow: 'var(--shadow-lg)' }}>
      <div style={{ opacity: 0.7, marginBottom: '0.2rem', fontSize: '0.75rem' }}>{label}</div>
      <div className="mono" style={{ fontWeight: 600 }}>{prefix}{Number(payload[0].value).toLocaleString()}{suffix}</div>
    </div>
  );
}


// ============================================================
// NAVIGATION
// ============================================================

function Nav({ currentView, onNavigate, holdingsCount, favoritesCount, onOpenWizard }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const links = [
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'list', label: 'List a property' },
    { id: 'portfolio', label: 'Portfolio' },
  ];

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250, 247, 242, 0.92)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ background: 'var(--ink)', color: 'var(--parchment)', padding: '0.4rem 2rem', textAlign: 'center', fontSize: '0.78rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
        <BadgeCheck size={12} color="var(--rose)" />
        <span style={{ opacity: 0.9 }}>AFSA-aligned · 4 properties closing this week · Avg yield <strong style={{ color: 'var(--rose)' }}>9.2%</strong></span>
      </div>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '1.1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
          <VatraLogo size={22} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }} className="nav-desktop">
          {links.map(link => (
            <button key={link.id} className="btn-ghost" onClick={() => onNavigate(link.id)} style={{ fontWeight: currentView === link.id ? 600 : 400, color: currentView === link.id ? 'var(--terracotta)' : 'var(--ink)' }}>
              {link.label}
              {link.id === 'portfolio' && holdingsCount > 0 && (
                <span style={{ background: 'var(--terracotta)', color: 'var(--parchment)', borderRadius: '999px', padding: '0.1rem 0.45rem', fontSize: '0.7rem', fontWeight: 600 }}>{holdingsCount}</span>
              )}
            </button>
          ))}
          <div style={{ width: 1, height: 22, background: 'var(--line)', margin: '0 0.5rem' }} />
          <button className="btn-icon" onClick={onOpenWizard} title="Find your match — 1 minute quiz" style={{ background: 'var(--terracotta)', color: 'var(--parchment)', border: 'none' }}>
            <Sparkles size={15} />
          </button>
          <button className="btn-icon" onClick={() => onNavigate('favorites')} style={{ position: 'relative' }}>
            <Heart size={16} fill={favoritesCount > 0 ? 'var(--terracotta)' : 'none'} color={favoritesCount > 0 ? 'var(--terracotta)' : 'var(--ink)'} />
            {favoritesCount > 0 && (
              <span style={{ position: 'absolute', top: -2, right: -2, background: 'var(--terracotta)', color: 'var(--parchment)', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 700, minWidth: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{favoritesCount}</span>
            )}
          </button>
          <button className="btn-primary" onClick={() => onNavigate('marketplace')} style={{ marginLeft: '0.25rem' }}>
            Invest now <ArrowRight size={14} />
          </button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="nav-mobile" style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'none' }}>
          <Menu size={22} />
        </button>
      </div>

      {mobileOpen && (
        <div style={{ borderTop: '1px solid var(--line)', padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }} className="nav-mobile-menu">
          <button className="btn-ghost" onClick={() => { onOpenWizard(); setMobileOpen(false); }} style={{ justifyContent: 'flex-start', color: 'var(--terracotta)', fontWeight: 600 }}>
            <Sparkles size={14} /> Find your match
          </button>
          {links.map(link => (
            <button key={link.id} className="btn-ghost" onClick={() => { onNavigate(link.id); setMobileOpen(false); }} style={{ justifyContent: 'flex-start' }}>{link.label}</button>
          ))}
          <button className="btn-ghost" onClick={() => { onNavigate('favorites'); setMobileOpen(false); }} style={{ justifyContent: 'flex-start' }}>Favorites ({favoritesCount})</button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) { .nav-desktop { display: none !important; } .nav-mobile { display: block !important; } }
        @media (min-width: 901px) { .nav-mobile-menu { display: none !important; } }
      `}</style>
    </nav>
  );
}


// ============================================================
// HOME PAGE
// ============================================================

function HomePage({ onNavigate, properties, favorites, onToggleFavorite, onOpenWizard }) {
  const featured = properties.filter(p => p.status === 'open').slice(0, 3);
  const stats = useMemo(() => {
    const totalValue = properties.reduce((s, p) => s + p.price, 0);
    const avgYield = properties.reduce((s, p) => s + calcYield(p.annualRent, p.price), 0) / properties.length;
    const totalInvestors = properties.reduce((s, p) => s + p.investors, 0);
    const totalDistributed = properties.reduce((s, p) => s + p.annualRent, 0);
    return { totalValue, avgYield, totalInvestors, totalDistributed };
  }, [properties]);

  return (
    <div className="fade-up">
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '88vh', display: 'flex', alignItems: 'center' }} className="grain">
        <div className="spotlight" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <div style={{ position: 'relative', maxWidth: 1400, margin: '0 auto', padding: '4rem 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', width: '100%' }} className="hero-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }}>
              <div style={{ width: 32, height: 1, background: 'var(--terracotta)' }} />
              <span style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600 }}>Albania's first fractional property platform</span>
            </div>

            <h1 className="display" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 0.95, margin: 0, marginBottom: '1.5rem' }}>
              Own a piece <br />
              of <span className="display-italic" style={{ color: 'var(--terracotta)' }}>Tirana</span>, <br />
              from <span className="mono" style={{ fontSize: '0.85em' }}>€50</span>.
            </h1>

            <p style={{ fontSize: '1.1rem', lineHeight: 1.55, color: 'var(--ink-soft)', maxWidth: 480, margin: 0, marginBottom: '2.5rem' }}>
              Buy fractional ownership in vetted Albanian real estate. Earn rental income daily.
              Sell anytime on the secondary market. Full title held in a regulated SPV.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <button className="btn-primary" onClick={onOpenWizard} style={{ background: 'var(--terracotta)' }}>
                <Sparkles size={14} /> Find your match
              </button>
              <button className="btn-secondary" onClick={() => onNavigate('marketplace')}>
                Browse all properties
              </button>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={12} /> 1-min quiz · 6 questions · Top 3 matches
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 1rem', background: 'var(--parchment-deep)', borderRadius: '999px', width: 'fit-content', fontSize: '0.85rem' }}>
              <div className="live-dot" />
              <span>{ACTIVITY_FEED[0].who} just invested {formatEUR(ACTIVITY_FEED[0].amount)} in {ACTIVITY_FEED[0].propertyName.split(' ').slice(0, 2).join(' ')}</span>
            </div>
          </div>

          {/* Architectural illustration */}
          <div style={{ position: 'relative', height: '70vh', minHeight: 500 }} className="hero-art">
            <svg viewBox="0 0 400 600" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--rose)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--parchment)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <rect width="400" height="600" fill="url(#sky)" />

              {/* Mountains */}
              <path d="M0 380 L80 280 L160 340 L240 220 L320 300 L400 240 L400 600 L0 600 Z" fill="var(--sand)" opacity="0.5" />
              <path d="M0 420 L60 350 L140 400 L220 320 L300 380 L380 320 L400 350 L400 600 L0 600 Z" fill="var(--rose)" opacity="0.35" />

              {/* Sun */}
              <circle cx="320" cy="120" r="50" fill="var(--terracotta)" opacity="0.85" />

              {/* Buildings */}
              <rect x="60" y="200" width="80" height="380" fill="var(--ink)" />
              {[...Array(12)].map((_, i) => (
                <g key={i}>
                  <rect x="70" y={220 + i * 28} width="14" height="18" fill="var(--gold)" opacity={0.7 + (i % 3) * 0.1} />
                  <rect x="92" y={220 + i * 28} width="14" height="18" fill="var(--gold)" opacity={0.5 + (i % 4) * 0.1} />
                  <rect x="114" y={220 + i * 28} width="14" height="18" fill="var(--gold)" opacity={0.6 + (i % 2) * 0.2} />
                </g>
              ))}

              <rect x="160" y="280" width="70" height="300" fill="var(--adriatic)" />
              {[...Array(9)].map((_, i) => (
                <g key={i}>
                  <rect x="170" y={300 + i * 30} width="12" height="20" fill="var(--gold)" opacity={0.5 + (i % 3) * 0.15} />
                  <rect x="190" y={300 + i * 30} width="12" height="20" fill="var(--gold)" opacity={0.6 + (i % 4) * 0.1} />
                  <rect x="210" y={300 + i * 30} width="12" height="20" fill="var(--gold)" opacity={0.4 + (i % 2) * 0.3} />
                </g>
              ))}

              <rect x="250" y="350" width="60" height="230" fill="var(--terracotta-deep)" />
              {[...Array(7)].map((_, i) => (
                <g key={i}>
                  <rect x="260" y={370 + i * 30} width="12" height="20" fill="var(--gold)" opacity={0.7} />
                  <rect x="280" y={370 + i * 30} width="12" height="20" fill="var(--gold)" opacity={0.6} />
                </g>
              ))}

              <rect x="320" y="320" width="55" height="260" fill="var(--ink-soft)" />
              {[...Array(8)].map((_, i) => (
                <g key={i}>
                  <rect x="330" y={340 + i * 30} width="11" height="20" fill="var(--gold)" opacity={0.5} />
                  <rect x="350" y={340 + i * 30} width="11" height="20" fill="var(--gold)" opacity={0.7} />
                </g>
              ))}

              {/* Cypress trees */}
              <ellipse cx="20" cy="540" rx="8" ry="40" fill="var(--moss)" />
              <ellipse cx="40" cy="550" rx="6" ry="32" fill="var(--moss)" />

              {/* House */}
              <polygon points="20,500 60,460 100,500 100,580 20,580" fill="var(--parchment)" stroke="var(--ink)" strokeWidth="2" />
              <rect x="50" y="530" width="20" height="50" fill="var(--terracotta)" />

              {/* Token icons floating */}
              <g opacity="0.92">
                <circle cx="350" cy="200" r="20" fill="var(--parchment)" stroke="var(--ink)" strokeWidth="1.5" />
                <text x="350" y="207" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fontWeight="600" fill="var(--ink)">€50</text>
              </g>
              <g opacity="0.95">
                <circle cx="50" cy="160" r="24" fill="var(--terracotta)" stroke="var(--ink)" strokeWidth="1.5" />
                <text x="50" y="167" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="12" fontWeight="600" fill="var(--parchment)">€50</text>
              </g>
              <g opacity="0.92">
                <circle cx="280" cy="180" r="18" fill="var(--gold)" stroke="var(--ink)" strokeWidth="1.5" />
                <text x="280" y="186" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600" fill="var(--ink)">€50</text>
              </g>
              <g opacity="0.85">
                <circle cx="180" cy="100" r="14" fill="var(--adriatic)" stroke="var(--ink)" strokeWidth="1.5" />
                <text x="180" y="105" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fontWeight="600" fill="var(--parchment)">€50</text>
              </g>
            </svg>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
            .hero-art { height: 380px !important; min-height: auto !important; }
          }
        `}</style>
      </section>

      {/* STATS BAR */}
      <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--parchment-deep)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '2.5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
          {[
            { label: 'Property under management', value: formatEUR(stats.totalValue), icon: Building2 },
            { label: 'Average net yield', value: formatPct(stats.avgYield), icon: TrendingUp, color: 'var(--terracotta)' },
            { label: 'Active investors', value: stats.totalInvestors.toLocaleString(), icon: Users },
            { label: 'Annual distributions', value: formatEUR(stats.totalDistributed), icon: Coins },
          ].map(stat => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <stat.icon size={18} color="var(--ink-soft)" />
              <div className="mono num-tabular" style={{ fontSize: '1.6rem', fontWeight: 700, color: stat.color || 'var(--ink)' }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <section style={{ borderBottom: '1px solid var(--line)', overflow: 'hidden', padding: '1.5rem 0' }} className="marquee-wrap">
        <div className="marquee">
          {[...Array(2)].map((_, j) => (
            <div key={j} style={{ display: 'flex', gap: '4rem', flexShrink: 0 }}>
              {['Tirana', 'Riverside', 'Blloku', 'Vlorë', 'Sarandë', 'Durrës', 'Komuna e Parisit', 'Ksamil', 'Pazari i Ri', 'Lungomare', 'Berat', 'Korçë', 'Shkodër'].map(city => (
                <span key={city + j} className="display-italic" style={{ fontSize: '1.7rem', color: 'var(--ink)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4rem' }}>
                  {city} <span style={{ color: 'var(--terracotta)' }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section style={{ padding: '6rem 2rem', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600, marginBottom: '0.6rem' }}>Live offerings</div>
            <h2 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1, margin: 0 }}>
              Curated properties, <br /><span className="display-italic">vetted</span> for you.
            </h2>
          </div>
          <button className="btn-secondary" onClick={() => onNavigate('marketplace')}>
            View all {properties.length} <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {featured.map((p, i) => (
            <div key={p.id} className="fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <PropertyCard
                property={p}
                onClick={() => onNavigate('property', p.id)}
                onFavorite={(e) => { e.stopPropagation(); onToggleFavorite(p.id); }}
                isFavorite={favorites.includes(p.id)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '6rem 2rem', background: 'var(--ink)', color: 'var(--parchment)', position: 'relative' }} className="grain">
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }}>
            <div style={{ width: 32, height: 1, background: 'var(--rose)' }} />
            <span style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--rose)', fontWeight: 600 }}>How it works</span>
          </div>

          <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1, margin: 0, marginBottom: '4rem', maxWidth: 800 }}>
            Real estate, <span className="display-italic" style={{ color: 'var(--rose)' }}>fractionalized</span>. Real income, daily.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {[
              { num: '01', title: 'Browse', desc: 'Each property is vetted, inspected and held in a dedicated Albanian SPV. Full financials and legal title open.', icon: Search },
              { num: '02', title: 'Buy tokens', desc: 'Purchase as little as one €50 token. Each token is a fractional share of the SPV that owns the property.', icon: Coins },
              { num: '03', title: 'Earn rent', desc: 'Net rental income is distributed daily, in proportion to your tokens. Track everything in your portfolio.', icon: TrendingUp },
              { num: '04', title: 'Exit anytime', desc: 'Sell your tokens on the VATRA secondary market. No lockup, no exit penalty.', icon: ArrowUpRight },
            ].map((step, i) => (
              <div key={i} style={{ borderTop: '1px solid rgba(250, 247, 242, 0.2)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="mono" style={{ fontSize: '0.85rem', color: 'var(--rose)' }}>{step.num}</span>
                  <step.icon size={18} color="var(--rose)" />
                </div>
                <h3 className="display" style={{ fontSize: '1.8rem', margin: 0, marginBottom: '0.6rem' }}>{step.title}</h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.5, color: 'rgba(250, 247, 242, 0.7)', margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '4rem', padding: '2rem', border: '1px solid rgba(250, 247, 242, 0.2)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--rose)', fontWeight: 600, marginBottom: '0.6rem' }}>Regulated structure</div>
              <p style={{ fontSize: '1.05rem', margin: 0, maxWidth: 700, lineHeight: 1.5 }}>
                Each property is owned by a local Albanian SH.P.K. registered with the State Cadastre Agency. Tokens are issued through a Luxembourg-domiciled vehicle for EU-grade investor protection. AFSA-compliant.
              </p>
            </div>
            <button className="btn-primary" style={{ background: 'var(--rose)', color: 'var(--ink)' }} onClick={() => onNavigate('how-it-works')}>
              Learn more <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* LIVE ACTIVITY + PRESS */}
      <section style={{ padding: '6rem 2rem', maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }} className="activity-press-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div className="live-dot" />
            <span style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600 }}>Live activity</span>
          </div>
          <h2 className="display" style={{ fontSize: '2.2rem', margin: 0, marginBottom: '2rem' }}>Investors, right now</h2>
          <div>
            {ACTIVITY_FEED.slice(0, 6).map((a, i) => <ActivityItem key={i} activity={a} />)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600, marginBottom: '1rem' }}>Press & coverage</div>
          <h2 className="display" style={{ fontSize: '2.2rem', margin: 0, marginBottom: '2rem' }}>What people are saying</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {PRESS_QUOTES.map((q, i) => (
              <div key={i} className="card" style={{ padding: '1.25rem', borderLeft: '3px solid var(--terracotta)' }}>
                <p className="display-italic" style={{ fontSize: '1.15rem', lineHeight: 1.4, margin: 0, marginBottom: '0.6rem', color: 'var(--ink)' }}>{q.text}</p>
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>— {q.source}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .activity-press-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }`}</style>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '6rem 2rem', background: 'var(--parchment-deep)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600, marginBottom: '1rem' }}>Investor stories</div>
          <h2 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: 0, marginBottom: '3rem', maxWidth: 700 }}>
            People who already <span className="display-italic">own</span> a piece of Albania.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card" style={{ padding: '2rem', background: 'var(--parchment)' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  {[1, 2, 3, 4, 5].map(n => <Star key={n} size={14} fill="var(--gold)" color="var(--gold)" />)}
                </div>
                <p style={{ fontSize: '1rem', lineHeight: 1.55, margin: 0, marginBottom: '1.5rem', color: 'var(--ink)' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Avatar name={t.name} size={40} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)' }}>{t.role} · {t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — LIST */}
      <section style={{ padding: '8rem 2rem', maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
        <div className="display-italic" style={{ fontSize: '1.4rem', color: 'var(--terracotta)', marginBottom: '1rem' }}>For property owners</div>
        <h2 className="display" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95, margin: 0, marginBottom: '2rem', maxWidth: 1000, marginLeft: 'auto', marginRight: 'auto' }}>
          Already own property in Albania? <br />
          <span className="display-italic">Tokenize it</span> and unlock liquidity.
        </h2>
        <p style={{ fontSize: '1.15rem', maxWidth: 640, margin: '0 auto 2.5rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
          Sell as little as 10% of your equity to global investors while keeping operational control. We handle the SPV, AFSA filings, custody, and investor onboarding.
        </p>
        <button className="btn-primary" onClick={() => onNavigate('list')} style={{ fontSize: '1rem', padding: '1.1rem 2rem' }}>
          List your property <ArrowRight size={14} />
        </button>
      </section>
    </div>
  );
}


// ============================================================
// MARKETPLACE
// ============================================================

function MarketplacePage({ onNavigate, properties, favorites, onToggleFavorite, onOpenWizard }) {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sort, setSort] = useState('yield');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [view, setView] = useState('grid');

  const filtered = useMemo(() => {
    let list = [...properties];
    if (statusFilter === 'open') list = list.filter(p => p.status === 'open');
    if (statusFilter === 'funded') list = list.filter(p => p.status === 'funded');
    if (cityFilter !== 'All') list = list.filter(p => p.city === cityFilter);
    if (typeFilter !== 'All') list = list.filter(p => p.type === typeFilter);
    if (riskFilter !== 'all') list = list.filter(p => p.risk === riskFilter);
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.neighborhood.toLowerCase().includes(q) || p.city.toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      if (sort === 'yield') return calcYield(b.annualRent, b.price) - calcYield(a.annualRent, a.price);
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'funded') return b.fundedPct - a.fundedPct;
      if (sort === 'closing') return (a.closesIn || 999) - (b.closesIn || 999);
      return 0;
    });
    return list;
  }, [properties, search, cityFilter, typeFilter, riskFilter, sort, statusFilter, priceRange]);

  const cities = ['All', ...new Set(properties.map(p => p.city))];
  const types = ['All', ...new Set(properties.map(p => p.type))];

  const clearFilters = () => {
    setSearch(''); setCityFilter('All'); setTypeFilter('All'); setRiskFilter('all'); setStatusFilter('all'); setPriceRange([0, 1000000]);
  };
  const activeFilterCount = (cityFilter !== 'All' ? 1 : 0) + (typeFilter !== 'All' ? 1 : 0) + (riskFilter !== 'all' ? 1 : 0) + (statusFilter !== 'all' ? 1 : 0) + (search ? 1 : 0);

  return (
    <div className="fade-up">
      <section style={{ padding: '4rem 2rem 2rem', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <div style={{ width: 32, height: 1, background: 'var(--terracotta)' }} />
          <span style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600 }}>Marketplace</span>
        </div>
        <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1, margin: 0, marginBottom: '1rem' }}>
          {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} <span className="display-italic">available</span>.
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--ink-soft)', maxWidth: 700, marginBottom: '2.5rem' }}>
          Every listing is independently appraised, title-verified at the Albanian State Cadastre Agency (ASHK), and held in a dedicated SPV. Updated in real time.
        </p>

        {/* Wizard CTA banner */}
        <div style={{ background: 'var(--ink)', color: 'var(--parchment)', borderRadius: '12px', padding: '1.5rem 2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', position: 'relative', overflow: 'hidden' }} className="grain">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 auto' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={22} color="var(--parchment)" />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--rose)', fontWeight: 600, marginBottom: '0.2rem' }}>Not sure where to start?</div>
              <div className="display" style={{ fontSize: '1.4rem', lineHeight: 1.1 }}>Take our 1-minute quiz to find your match.</div>
            </div>
          </div>
          <button className="btn-primary" onClick={onOpenWizard} style={{ background: 'var(--rose)', color: 'var(--ink)', flexShrink: 0 }}>
            <Sparkles size={14} /> Find your match
          </button>
        </div>

        {/* Filters */}
        <div style={{ padding: '1.25rem', background: 'var(--parchment-deep)', borderRadius: '12px', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ position: 'relative', flex: '1 1 240px' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-soft)' }} />
              <input placeholder="Search by name or neighborhood..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '2.4rem' }} />
            </div>
            <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} style={{ flex: '0 1 140px' }}>
              {cities.map(c => <option key={c} value={c}>{c === 'All' ? 'All cities' : c}</option>)}
            </select>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ flex: '0 1 160px' }}>
              {types.map(t => <option key={t} value={t}>{t === 'All' ? 'All types' : t}</option>)}
            </select>
            <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)} style={{ flex: '0 1 130px' }}>
              <option value="all">All risk</option>
              <option value="low">Lower risk</option>
              <option value="medium">Moderate risk</option>
              <option value="high">Higher risk</option>
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ flex: '0 1 120px' }}>
              <option value="all">All status</option>
              <option value="open">Open</option>
              <option value="funded">Funded</option>
            </select>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ flex: '0 1 180px' }}>
              <option value="yield">Highest yield</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="funded">Most funded</option>
              <option value="closing">Closing soonest</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
              {activeFilterCount > 0 ? (
                <>
                  <strong>{activeFilterCount}</strong> active {activeFilterCount === 1 ? 'filter' : 'filters'} ·{' '}
                  <button onClick={clearFilters} style={{ background: 'transparent', border: 'none', color: 'var(--terracotta)', cursor: 'pointer', textDecoration: 'underline', font: 'inherit' }}>Clear all</button>
                </>
              ) : 'Showing all properties'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--ink-soft)' }}>Sort:</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                {sort === 'yield' ? '↓ Yield' : sort === 'price-low' ? '↑ Price' : sort === 'price-high' ? '↓ Price' : sort === 'funded' ? '↓ Funded' : 'Closing soon'}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 2rem 6rem', maxWidth: 1400, margin: '0 auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem', border: '1px dashed var(--line)', borderRadius: '12px' }}>
            <Building2 size={32} style={{ color: 'var(--ink-soft)', marginBottom: '1rem' }} />
            <h3 className="display" style={{ fontSize: '1.5rem', margin: 0, marginBottom: '0.5rem' }}>No properties match those filters</h3>
            <p style={{ color: 'var(--ink-soft)', margin: 0, marginBottom: '1.5rem' }}>Try widening your search or clearing a filter.</p>
            <button className="btn-secondary" onClick={clearFilters}>Clear filters</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filtered.map((p, i) => (
              <div key={p.id} className="fade-up" style={{ animationDelay: `${Math.min(i, 6) * 0.05}s` }}>
                <PropertyCard
                  property={p}
                  onClick={() => onNavigate('property', p.id)}
                  onFavorite={(e) => { e.stopPropagation(); onToggleFavorite(p.id); }}
                  isFavorite={favorites.includes(p.id)}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// ============================================================
// FAVORITES PAGE
// ============================================================

function FavoritesPage({ properties, favorites, onNavigate, onToggleFavorite }) {
  const favoritedProps = properties.filter(p => favorites.includes(p.id));
  return (
    <div className="fade-up">
      <section style={{ padding: '4rem 2rem 2rem', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <div style={{ width: 32, height: 1, background: 'var(--terracotta)' }} />
          <span style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600 }}>Favorites</span>
        </div>
        <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1, margin: 0, marginBottom: '3rem' }}>
          {favoritedProps.length === 0 ? <>No <span className="display-italic">favorites</span> yet.</> : <><span className="display-italic">{favoritedProps.length}</span> {favoritedProps.length === 1 ? 'property' : 'properties'} saved.</>}
        </h1>

        {favoritedProps.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', border: '1px dashed var(--line)', borderRadius: '12px', background: 'var(--parchment-deep)' }}>
            <Heart size={32} style={{ color: 'var(--ink-soft)', marginBottom: '1rem' }} />
            <h3 className="display" style={{ fontSize: '1.6rem', margin: 0, marginBottom: '0.5rem' }}>Tap the heart on any listing to save it here</h3>
            <p style={{ color: 'var(--ink-soft)', marginBottom: '1.5rem' }}>Build a shortlist before you commit.</p>
            <button className="btn-primary" onClick={() => onNavigate('marketplace')}>Browse marketplace <ArrowRight size={14} /></button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {favoritedProps.map((p, i) => (
              <div key={p.id} className="fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <PropertyCard property={p} onClick={() => onNavigate('property', p.id)} onFavorite={(e) => { e.stopPropagation(); onToggleFavorite(p.id); }} isFavorite={true} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}


// ============================================================
// PROPERTY DETAIL — rich version
// ============================================================

function PropertyDetailPage({ property, allProperties, onNavigate, onInvest, favorites, onToggleFavorite }) {
  const [tokens, setTokens] = useState(10);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!property) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h2 className="display" style={{ fontSize: '2rem' }}>Property not found</h2>
        <button className="btn-primary" onClick={() => onNavigate('marketplace')} style={{ marginTop: '1rem' }}>Back to marketplace</button>
      </div>
    );
  }

  const yld = calcYield(property.annualRent, property.price);
  const grossYield = property.grossRent ? calcYield(property.grossRent, property.price) : null;
  const totalTokens = calcTokens(property.price);
  const tokensRemaining = Math.round(totalTokens * (1 - property.fundedPct / 100));
  const investAmount = tokens * TOKEN_PRICE;
  const ownership = (tokens / totalTokens) * 100;
  const projectedAnnual = (investAmount * yld) / 100;
  const projectedDaily = projectedAnnual / 365;
  const distributionData = useMemo(() => generateDistributionHistory(property.annualRent), [property.id, property.annualRent]);
  const projectionData = useMemo(() => generateProjection(property.price, property.neighborhood && NEIGHBORHOODS[property.neighborhood] ? NEIGHBORHOODS[property.neighborhood].growth / 100 : 0.10), [property.id]);
  const neighborhood = NEIGHBORHOODS[property.neighborhood];
  const similar = allProperties.filter(p => p.id !== property.id && (p.city === property.city || p.type === property.type)).slice(0, 3);
  const isFav = favorites.includes(property.id);

  return (
    <div className="fade-up">
      <section style={{ padding: '2rem 2rem 0', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <button className="btn-ghost" onClick={() => onNavigate('marketplace')}>
            <ArrowLeft size={14} /> Back to marketplace
          </button>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-icon" onClick={() => onToggleFavorite(property.id)} style={{ background: isFav ? 'var(--terracotta)' : 'var(--parchment)', color: isFav ? 'var(--parchment)' : 'var(--ink)' }}>
              <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
            </button>
            <button className="btn-icon"><Share2 size={16} /></button>
          </div>
        </div>

        {/* Photo Gallery */}
        <PhotoGallery photos={property.photos} name={property.name} />

        {/* Title */}
        <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {property.badge && (
              <Pill variant={property.badge === 'Live' ? 'live' : property.badge === 'High Yield' ? 'high' : property.badge === 'Premium' ? 'premium' : property.badge === 'Closing Soon' ? 'closing' : property.badge === 'New listing' ? 'new' : 'default'}>
                {property.badge}
              </Pill>
            )}
            <Pill variant="outline">{property.type}</Pill>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
              <MapPin size={14} /> {property.neighborhood}, {property.city}
            </span>
            {property.closesIn !== null && property.closesIn !== undefined && property.status === 'open' && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--terracotta)', fontWeight: 600 }}>
                <Clock size={14} /> Closes in {property.closesIn} days
              </span>
            )}
          </div>
          <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1, margin: 0, marginBottom: '1rem' }}>{property.name}</h1>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: 800 }}>{property.description}</p>

          {/* LIVE INSIGHTS */}
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <LiveViewers propertyId={property.id} />
            {property.status === 'open' && property.fundedPct > 50 && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
                <Flame size={12} color="var(--terracotta)" /> <strong>Filling fast</strong> · over half funded
              </div>
            )}
          </div>
        </div>

        {/* INSIGHTS BAR */}
        <div style={{ marginBottom: '2rem' }}>
          <PropertyInsights property={property} />
        </div>

        {/* Hero stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ background: 'var(--ink)', color: 'var(--parchment)', borderRadius: '8px', padding: '1.5rem' }}>
            <Coins size={20} color="var(--rose)" style={{ marginBottom: '0.5rem' }} />
            <div className="mono num-tabular" style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1 }}>€50</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--rose)', marginTop: '0.3rem' }}>Per token · {totalTokens.toLocaleString()} total</div>
          </div>
          <div style={{ background: 'var(--terracotta)', color: 'var(--parchment)', borderRadius: '8px', padding: '1.5rem' }}>
            <TrendingUp size={20} style={{ marginBottom: '0.5rem' }} />
            <div className="mono num-tabular" style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1 }}>{formatPct(yld)}</div>
            <div style={{ fontSize: '0.78rem', opacity: 0.85, marginTop: '0.3rem' }}>Net annual yield</div>
          </div>
          <div style={{ background: 'var(--parchment)', border: '1px solid var(--line)', borderRadius: '8px', padding: '1.5rem' }}>
            <Building2 size={20} color="var(--ink-soft)" style={{ marginBottom: '0.5rem' }} />
            <div className="mono num-tabular" style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1 }}>{formatEUR(property.price)}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', marginTop: '0.3rem' }}>Property value</div>
          </div>
          <div style={{ background: 'var(--parchment)', border: '1px solid var(--line)', borderRadius: '8px', padding: '1.5rem' }}>
            <Users size={20} color="var(--ink-soft)" style={{ marginBottom: '0.5rem' }} />
            <div className="mono num-tabular" style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1 }}>{property.investors}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', marginTop: '0.3rem' }}>Co-owners · {property.fundedPct}% funded</div>
          </div>
        </div>
      </section>

      {/* Two-column main content */}
      <section style={{ padding: '0 2rem 6rem', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '3rem' }} className="detail-grid">
          <div>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--line)', marginBottom: '2rem', overflowX: 'auto' }} className="scroll-hidden">
              {['overview', 'financials', 'neighborhood', 'documents'].map(t => (
                <button key={t} className={`tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)} style={{ background: 'transparent', border: 'none', textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
                  {t}
                </button>
              ))}
            </div>

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="fade-up">
                {/* Quick facts */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                  {[
                    { label: 'Bedrooms', value: property.bedrooms, icon: Bed },
                    { label: 'Bathrooms', value: property.bathrooms, icon: Bath },
                    { label: 'Size', value: property.sqm + ' m²', icon: Square },
                    { label: 'Built', value: property.yearBuilt, icon: Calendar },
                    property.floor && { label: 'Floor', value: property.floor, icon: ArrowUp },
                    property.yearRenovated && { label: 'Renovated', value: property.yearRenovated, icon: RefreshCw },
                  ].filter(Boolean).map(item => (
                    <div key={item.label} style={{ padding: '1.25rem', border: '1px solid var(--line)', borderRadius: '8px' }}>
                      <item.icon size={16} color="var(--ink-soft)" />
                      <div className="mono num-tabular" style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '0.5rem' }}>{item.value}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* Amenities */}
                {property.amenities && property.amenities.length > 0 && (
                  <div style={{ marginBottom: '3rem' }}>
                    <h2 className="display" style={{ fontSize: '2rem', margin: 0, marginBottom: '1.5rem' }}>What's included</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                      {property.amenities.map(key => {
                        const a = AMENITIES[key];
                        if (!a) return null;
                        return (
                          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', background: 'var(--parchment-deep)', borderRadius: '6px' }}>
                            <a.icon size={16} color="var(--terracotta)" />
                            <span style={{ fontSize: '0.92rem' }}>{a.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tenant / occupancy */}
                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="display" style={{ fontSize: '2rem', margin: 0, marginBottom: '1.5rem' }}>Occupancy & tenancy</h2>
                  <div style={{ padding: '1.5rem', border: '1px solid var(--line)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <Users size={18} color="var(--terracotta)" />
                      <span style={{ fontWeight: 600 }}>{property.occupancy}</span>
                      {property.rentPaidCurrent && (
                        <Pill variant="default" icon={Check}>Paid current</Pill>
                      )}
                    </div>
                    <p style={{ fontSize: '0.95rem', color: 'var(--ink-soft)', margin: 0, lineHeight: 1.5 }}>{property.tenant}</p>
                  </div>
                </div>

                {/* Risk */}
                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="display" style={{ fontSize: '2rem', margin: 0, marginBottom: '1.5rem' }}>Risk profile</h2>
                  <div style={{ padding: '1.5rem', border: '1px solid var(--line)', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                    <RiskBadge level={property.risk} />
                    <p style={{ fontSize: '0.92rem', color: 'var(--ink-soft)', margin: 0, lineHeight: 1.5 }}>
                      {riskMeta(property.risk).desc} VATRA assessments are based on tenancy duration, neighborhood liquidity, expense volatility, and macro exposure.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* FINANCIALS */}
            {activeTab === 'financials' && (
              <div className="fade-up">
                {/* Distribution chart */}
                <div style={{ marginBottom: '3rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 className="display" style={{ fontSize: '2rem', margin: 0 }}>Distribution history</h2>
                    <span style={{ fontSize: '0.82rem', color: 'var(--ink-soft)' }}>Last 12 months</span>
                  </div>
                  <div style={{ padding: '1.5rem', border: '1px solid var(--line)', borderRadius: '8px', background: 'var(--parchment)' }}>
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={distributionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid stroke="var(--line)" strokeDasharray="2 4" vertical={false} />
                        <XAxis dataKey="label" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} tickFormatter={v => '€' + (v / 1000).toFixed(0) + 'k'} />
                        <Tooltip content={<ChartTooltip prefix="€" />} cursor={{ fill: 'var(--sand)' }} />
                        <Bar dataKey="amount" fill="var(--terracotta)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Detailed income breakdown */}
                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="display" style={{ fontSize: '2rem', margin: 0, marginBottom: '1.5rem' }}>Income breakdown</h2>
                  <div style={{ border: '1px solid var(--line)', borderRadius: '8px', overflow: 'hidden' }}>
                    {[
                      { label: 'Gross rental income', value: formatEUR(property.grossRent), info: 'Total rent collected from tenant or guests' },
                      { label: 'Property tax (0.05%)', value: '−' + formatEUR(property.price * 0.0005), info: 'Annual Albanian property tax' },
                      { label: 'Management fee (8%)', value: '−' + formatEUR(property.grossRent * 0.08), info: 'Property manager / operator' },
                      { label: 'Maintenance reserve', value: '−' + formatEUR(property.grossRent * 0.04), info: 'Set aside for repairs and capex' },
                      { label: 'VATRA platform fee (1%)', value: '−' + formatEUR(property.price * 0.01), info: 'Annual platform management' },
                      { label: 'Insurance', value: '−' + formatEUR(property.expenses * 0.15), info: 'Property and liability insurance' },
                      { label: 'Net rental income', value: formatEUR(property.annualRent), bold: true },
                      { label: 'Net annual yield', value: formatPct(yld), highlight: true, bold: true },
                    ].map((row, i, arr) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.95rem 1.25rem', borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none', background: row.bold ? 'var(--parchment-deep)' : 'transparent' }}>
                        <span style={{ fontSize: '0.92rem', color: row.bold ? 'var(--ink)' : 'var(--ink-soft)', fontWeight: row.bold ? 600 : 400 }}>{row.label}</span>
                        <span className="mono num-tabular" style={{ fontWeight: row.bold ? 700 : 600, fontSize: '0.95rem', color: row.highlight ? 'var(--terracotta)' : 'var(--ink)' }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Token economics */}
                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="display" style={{ fontSize: '2rem', margin: 0, marginBottom: '1.5rem' }}>Token economics</h2>
                  <div style={{ border: '1px solid var(--line)', borderRadius: '8px', overflow: 'hidden' }}>
                    {[
                      { label: 'Token price', value: '€50' },
                      { label: 'Total tokens issued', value: totalTokens.toLocaleString() },
                      { label: 'Tokens funded', value: `${(totalTokens - tokensRemaining).toLocaleString()} (${property.fundedPct}%)` },
                      { label: 'Tokens remaining', value: tokensRemaining.toLocaleString() },
                      { label: 'Daily rent per token', value: '€' + (property.annualRent / 365 / totalTokens * TOKEN_PRICE).toFixed(4) },
                      { label: 'Annual rent per token', value: '€' + (property.annualRent / totalTokens).toFixed(2) },
                      { label: 'Active investors', value: property.investors.toLocaleString() },
                    ].map((row, i, arr) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem 1.25rem', borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none', background: i % 2 === 0 ? 'transparent' : 'var(--parchment-deep)' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>{row.label}</span>
                        <span className="mono num-tabular" style={{ fontWeight: 600, fontSize: '0.92rem' }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5-year projection */}
                <div style={{ marginBottom: '3rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 className="display" style={{ fontSize: '2rem', margin: 0 }}>5-year value projection</h2>
                    <span style={{ fontSize: '0.78rem', color: 'var(--ink-soft)' }}>Modeled at {neighborhood ? formatPct(neighborhood.growth) : '10%'}/yr appreciation</span>
                  </div>
                  <div style={{ padding: '1.5rem', border: '1px solid var(--line)', borderRadius: '8px', background: 'var(--parchment)' }}>
                    <ResponsiveContainer width="100%" height={240}>
                      <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--terracotta)" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="var(--terracotta)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="var(--line)" strokeDasharray="2 4" vertical={false} />
                        <XAxis dataKey="label" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} tickFormatter={v => '€' + (v / 1000).toFixed(0) + 'k'} />
                        <Tooltip content={<ChartTooltip prefix="€" />} />
                        <Area type="monotone" dataKey="value" stroke="var(--terracotta)" strokeWidth={2} fill="url(#projGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                    <p style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', marginTop: '0.75rem', textAlign: 'center' }}>
                      Projection model. Past performance does not guarantee future results.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* NEIGHBORHOOD */}
            {activeTab === 'neighborhood' && neighborhood && (
              <div className="fade-up">
                <div style={{ marginBottom: '2rem' }}>
                  <h2 className="display" style={{ fontSize: '2.4rem', margin: 0, marginBottom: '0.5rem' }}>{property.neighborhood}</h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '1.5rem' }}>{neighborhood.vibe} · {neighborhood.city}</p>
                  <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--ink)', maxWidth: 700 }}>{neighborhood.desc}</p>
                </div>

                {/* Walk / transit scores */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                  {[
                    { label: 'Walk score', value: neighborhood.walkScore, icon: '🚶', desc: neighborhood.walkScore > 90 ? "Walker's paradise" : neighborhood.walkScore > 70 ? 'Very walkable' : 'Walkable' },
                    { label: 'Transit score', value: neighborhood.transitScore, icon: '🚇', desc: neighborhood.transitScore > 80 ? 'Excellent transit' : 'Good transit' },
                    { label: 'Avg €/m²', value: neighborhood.avgPrice, icon: '🏠', mono: true, desc: 'Latest 12 months' },
                    { label: 'Yearly growth', value: '+' + neighborhood.growth + '%', icon: '📈', desc: '2024–2025' },
                  ].map(s => (
                    <div key={s.label} style={{ padding: '1.25rem', border: '1px solid var(--line)', borderRadius: '8px' }}>
                      <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{s.icon}</div>
                      <div className="mono num-tabular" style={{ fontSize: '1.5rem', fontWeight: 700 }}>{typeof s.value === 'number' ? (s.mono ? '€' + s.value : s.value) : s.value}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>{s.label}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)' }}>{s.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Nearby amenities */}
                <h3 className="display" style={{ fontSize: '1.6rem', margin: 0, marginBottom: '1rem' }}>What's around</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '2.5rem' }}>
                  {[
                    { label: 'Restaurants', count: neighborhood.nearby.restaurants, icon: Utensils },
                    { label: 'Cafés', count: neighborhood.nearby.cafes, icon: Coffee },
                    { label: 'Shops', count: neighborhood.nearby.shops, icon: ShoppingBag },
                    { label: 'Transit stops', count: neighborhood.nearby.transit, icon: Train },
                  ].map(item => (
                    <div key={item.label} style={{ padding: '1rem', background: 'var(--parchment-deep)', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <item.icon size={18} color="var(--terracotta)" />
                      <div>
                        <div className="mono num-tabular" style={{ fontWeight: 700 }}>{item.count}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)' }}>{item.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mock map */}
                <h3 className="display" style={{ fontSize: '1.6rem', margin: 0, marginBottom: '1rem' }}>Location</h3>
                <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--parchment-deep)', position: 'relative', aspectRatio: '16/9' }}>
                  <svg viewBox="0 0 800 450" style={{ width: '100%', height: '100%' }}>
                    {/* Mock streets */}
                    <rect width="800" height="450" fill="var(--parchment-deep)" />
                    {[...Array(8)].map((_, i) => <line key={'h'+i} x1="0" y1={i * 60 + 30} x2="800" y2={i * 60 + 30} stroke="var(--sand)" strokeWidth="1" />)}
                    {[...Array(12)].map((_, i) => <line key={'v'+i} x1={i * 70 + 35} y1="0" x2={i * 70 + 35} y2="450" stroke="var(--sand)" strokeWidth="1" />)}
                    {/* River */}
                    <path d="M0 200 Q 200 240 400 220 T 800 230 L 800 280 Q 600 270 400 280 T 0 250 Z" fill="var(--adriatic)" opacity="0.3" />
                    {/* Park */}
                    <ellipse cx="600" cy="120" rx="80" ry="50" fill="var(--moss)" opacity="0.4" />
                    <text x="600" y="125" textAnchor="middle" fill="var(--ink)" fontSize="11" fontFamily="JetBrains Mono">Grand Park</text>
                    {/* Property pin */}
                    <circle cx="400" cy="225" r="22" fill="var(--terracotta)" />
                    <circle cx="400" cy="225" r="8" fill="var(--parchment)" />
                    <text x="400" y="200" textAnchor="middle" fill="var(--ink)" fontSize="13" fontFamily="Instrument Serif" fontWeight="600">{property.name}</text>
                    {/* Other landmarks */}
                    <circle cx="200" cy="150" r="4" fill="var(--ink)" />
                    <text x="200" y="140" textAnchor="middle" fill="var(--ink-soft)" fontSize="9" fontFamily="JetBrains Mono">Center</text>
                    <circle cx="650" cy="350" r="4" fill="var(--ink)" />
                    <text x="650" y="340" textAnchor="middle" fill="var(--ink-soft)" fontSize="9" fontFamily="JetBrains Mono">Riverside</text>
                  </svg>
                  <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', background: 'rgba(250, 247, 242, 0.92)', backdropFilter: 'blur(8px)', padding: '0.4rem 0.75rem', borderRadius: '6px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={12} /> Approximate location
                  </div>
                </div>
              </div>
            )}

            {/* DOCUMENTS */}
            {activeTab === 'documents' && (
              <div className="fade-up">
                <h2 className="display" style={{ fontSize: '2rem', margin: 0, marginBottom: '0.5rem' }}>Legal & due diligence</h2>
                <p style={{ color: 'var(--ink-soft)', marginBottom: '2rem' }}>All documents are reviewed by our legal team and updated quarterly.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '2.5rem' }}>
                  {[
                    { name: 'Cadastral extract (Kartela)', type: 'PDF', date: '2025-11', icon: FileText, status: 'verified' },
                    { name: 'Independent appraisal', type: 'PDF', date: '2025-10', icon: FileBarChart, status: 'verified' },
                    { name: 'Property inspection report', type: 'PDF', date: '2025-11', icon: FileText, status: 'verified' },
                    { name: 'SPV operating agreement', type: 'PDF', date: '2025-12', icon: FileText, status: 'signed' },
                    { name: 'Lease agreement', type: 'PDF', date: '2025-09', icon: FileText, status: 'active' },
                    { name: 'Title insurance certificate', type: 'PDF', date: '2025-12', icon: ShieldCheck, status: 'active' },
                    { name: 'Building permit', type: 'PDF', date: '2024-06', icon: FileText, status: 'verified' },
                    { name: 'Tax clearance certificate', type: 'PDF', date: '2025-12', icon: BadgeCheck, status: 'verified' },
                  ].map(doc => (
                    <button key={doc.name} className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer', textAlign: 'left', background: 'var(--parchment)', border: '1px solid var(--line)' }}>
                      <doc.icon size={18} color="var(--ink-soft)" />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.92rem', fontWeight: 500 }}>{doc.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--ink-soft)', marginTop: '2px' }}>{doc.type} · Updated {doc.date}</div>
                      </div>
                      <Download size={14} color="var(--ink-soft)" />
                    </button>
                  ))}
                </div>

                {/* Legal structure */}
                <h3 className="display" style={{ fontSize: '1.6rem', margin: 0, marginBottom: '1rem' }}>Legal structure</h3>
                <div style={{ padding: '1.5rem', background: 'var(--parchment-deep)', borderRadius: '8px', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.75rem 1rem', fontSize: '0.92rem' }}>
                    <span style={{ color: 'var(--ink-soft)' }}>Cadastre #</span>
                    <span className="mono">{property.cadastreNumber}</span>
                    <span style={{ color: 'var(--ink-soft)' }}>SPV</span>
                    <span className="mono">{property.legalStructure}</span>
                    <span style={{ color: 'var(--ink-soft)' }}>Listed</span>
                    <span>{new Date(property.listedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span style={{ color: 'var(--ink-soft)' }}>Jurisdiction</span>
                    <span>Albanian SPV → Luxembourg fund vehicle</span>
                    <span style={{ color: 'var(--ink-soft)' }}>Regulator</span>
                    <span>AFSA · CSSF (Luxembourg)</span>
                  </div>
                </div>

                {/* Risk disclosures */}
                <h3 className="display" style={{ fontSize: '1.6rem', margin: 0, marginBottom: '1rem' }}>Risk disclosures</h3>
                <div style={{ padding: '1.5rem', border: '1px solid var(--line)', borderRadius: '8px' }}>
                  <p style={{ margin: 0, marginBottom: '0.75rem', fontSize: '0.92rem', lineHeight: 1.55 }}>
                    Real estate values can decrease. Tenants can default. Tokenized real estate is illiquid relative to public markets. Currency exposure: properties are valued in EUR but local expenses partially in ALL.
                  </p>
                  <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.55, color: 'var(--ink-soft)' }}>
                    Past performance does not guarantee future results. Only invest amounts you can afford to leave invested for 3+ years. See full risk disclosure in the SPV operating agreement.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* INVEST PANEL — sticky */}
          <div>
            <div style={{ position: 'sticky', top: 120, padding: '2rem', border: '2px solid var(--ink)', borderRadius: '12px', background: 'var(--parchment)', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600, marginBottom: '0.5rem' }}>Invest in this property</div>
                <h3 className="display" style={{ fontSize: '1.8rem', margin: 0 }}>Buy fractional tokens</h3>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>Funded</span>
                  <span className="mono num-tabular" style={{ fontWeight: 700 }}>{property.fundedPct}%</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${property.fundedPct}%` }} /></div>
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{tokensRemaining.toLocaleString()} of {totalTokens.toLocaleString()} tokens left</span>
                  {property.closesIn && <span style={{ color: 'var(--terracotta)', fontWeight: 600 }}>{property.closesIn}d</span>}
                </div>
              </div>

              <div className="divider-h" style={{ marginBottom: '1.5rem' }} />

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="label">Number of tokens</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button onClick={() => setTokens(Math.max(1, tokens - 1))} style={{ width: 40, height: 44, border: '1px solid var(--line)', background: 'var(--parchment)', borderRadius: '6px', cursor: 'pointer', fontSize: '1.2rem', flexShrink: 0 }}>−</button>
                  <input type="number" value={tokens} min={1} max={tokensRemaining} onChange={e => setTokens(Math.max(1, Math.min(tokensRemaining, parseInt(e.target.value) || 1)))} style={{ textAlign: 'center', flex: 1 }} className="mono" />
                  <button onClick={() => setTokens(Math.min(tokensRemaining, tokens + 1))} style={{ width: 40, height: 44, border: '1px solid var(--line)', background: 'var(--parchment)', borderRadius: '6px', cursor: 'pointer', fontSize: '1.2rem', flexShrink: 0 }}>+</button>
                </div>
                <input type="range" min={1} max={Math.min(tokensRemaining, 500)} value={Math.min(tokens, 500)} onChange={e => setTokens(parseInt(e.target.value))} style={{ width: '100%', marginTop: '0.75rem', accentColor: 'var(--terracotta)' }} />
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  {[1, 10, 50, 100].filter(n => n <= tokensRemaining).map(n => (
                    <button key={n} onClick={() => setTokens(n)} className="btn-ghost" style={{ fontSize: '0.78rem', padding: '0.3rem 0.7rem', border: '1px solid var(--line)', background: tokens === n ? 'var(--ink)' : 'transparent', color: tokens === n ? 'var(--parchment)' : 'var(--ink)' }}>{n}</button>
                  ))}
                </div>
              </div>

              <div className="divider-h" style={{ marginBottom: '1.25rem' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>Investment</span>
                  <span className="mono num-tabular" style={{ fontWeight: 700, fontSize: '1.1rem' }}>{formatEUR(investAmount)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>Your ownership</span>
                  <span className="mono num-tabular" style={{ fontWeight: 600 }}>{ownership.toFixed(3)}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>Projected annual</span>
                  <span className="mono num-tabular" style={{ fontWeight: 600, color: 'var(--terracotta)' }}>+{formatEUR(projectedAnnual)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>Projected daily</span>
                  <span className="mono num-tabular" style={{ fontWeight: 600, color: 'var(--terracotta)' }}>+€{projectedDaily.toFixed(2)}</span>
                </div>
              </div>

              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1.1rem', fontSize: '0.95rem' }} onClick={() => setShowInvestModal(true)} disabled={property.status === 'funded'}>
                {property.status === 'funded' ? 'Fully funded' : <>Invest {formatEUR(investAmount)} <ArrowRight size={14} /></>}
              </button>

              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--ink-soft)', justifyContent: 'center' }}>
                <Shield size={11} /> AFSA-compliant · KYC required
              </div>
            </div>
          </div>
        </div>

        {/* Similar properties */}
        {similar.length > 0 && (
          <div style={{ marginTop: '6rem' }}>
            <h2 className="display" style={{ fontSize: '2.4rem', margin: 0, marginBottom: '2rem' }}>You might also like</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {similar.map(p => (
                <PropertyCard
                  key={p.id} property={p}
                  onClick={() => onNavigate('property', p.id)}
                  onFavorite={(e) => { e.stopPropagation(); onToggleFavorite(p.id); }}
                  isFavorite={favorites.includes(p.id)}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {showInvestModal && (
        <InvestModal
          property={property}
          tokens={tokens}
          onClose={() => setShowInvestModal(false)}
          onConfirm={() => {
            onInvest(property.id, tokens, investAmount);
            setShowInvestModal(false);
          }}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  );
}


// ============================================================
// INVEST MODAL — 4-step
// ============================================================

function InvestModal({ property, tokens, onClose, onConfirm }) {
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('sepa');
  const [agreed, setAgreed] = useState(false);

  const investAmount = tokens * TOKEN_PRICE;
  const yld = calcYield(property.annualRent, property.price);
  const projectedAnnual = (investAmount * yld) / 100;
  const platformFee = paymentMethod === 'card' ? investAmount * 0.029 : paymentMethod === 'crypto' ? 1.5 : 0;
  const total = investAmount + platformFee;

  const handleConfirm = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep(4);
      setTimeout(() => onConfirm(), 2400);
    }, 1500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--parchment)', borderRadius: '12px', maxWidth: 540, width: '100%', maxHeight: '92vh', overflowY: 'auto', position: 'relative' }}>
        {step < 4 && (
          <div style={{ display: 'flex', gap: '4px', padding: '1rem 2rem 0' }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ flex: 1, height: 3, borderRadius: '999px', background: s <= step ? 'var(--terracotta)' : 'var(--sand)' }} />
            ))}
          </div>
        )}
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', zIndex: 1 }}><X size={18} /></button>

        {step === 1 && (
          <div style={{ padding: '2rem' }} className="fade-up">
            <div style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600, marginBottom: '0.5rem' }}>Step 1 · Review</div>
            <h2 className="display" style={{ fontSize: '1.8rem', margin: 0, marginBottom: '1.5rem' }}>Confirm your investment</h2>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center', padding: '1rem', background: 'var(--parchment-deep)', borderRadius: '8px' }}>
              <div style={{ width: 80, height: 80, borderRadius: '6px', overflow: 'hidden', background: 'var(--sand)', flexShrink: 0 }}>
                <SmartImage src={pUrl(property.photos[0])} fallbackName={property.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{property.neighborhood}, {property.city}</div>
                <div style={{ fontSize: '1rem', fontWeight: 600, marginTop: '0.2rem' }}>{property.name}</div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--ink-soft)' }}>
                  <span>{property.type}</span><span>·</span><span>{property.sqm} m²</span><span>·</span>
                  <span className="mono" style={{ color: 'var(--terracotta)', fontWeight: 600 }}>{formatPct(yld)}</span>
                </div>
              </div>
            </div>

            <div style={{ padding: '1.25rem', border: '1px solid var(--line)', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                <span style={{ color: 'var(--ink-soft)' }}>Tokens</span>
                <span className="mono num-tabular" style={{ fontWeight: 600 }}>{tokens} × €50</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                <span style={{ color: 'var(--ink-soft)' }}>Subtotal</span>
                <span className="mono num-tabular" style={{ fontWeight: 600 }}>{formatEUR(investAmount)}</span>
              </div>
              <div className="divider-h" style={{ margin: '0.5rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', color: 'var(--terracotta)' }}>
                <span style={{ fontSize: '0.85rem' }}>1st year projected income</span>
                <span className="mono num-tabular" style={{ fontWeight: 600 }}>+{formatEUR(projectedAnnual)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', color: 'var(--terracotta)' }}>
                <span style={{ fontSize: '0.85rem' }}>Daily distribution</span>
                <span className="mono num-tabular" style={{ fontWeight: 600 }}>+€{(projectedAnnual / 365).toFixed(2)}/day</span>
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setStep(2)}>
              Continue to identity check <ArrowRight size={14} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ padding: '2rem' }} className="fade-up">
            <div style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600, marginBottom: '0.5rem' }}>Step 2 · KYC</div>
            <h2 className="display" style={{ fontSize: '1.8rem', margin: 0, marginBottom: '0.5rem' }}>Quick identity check</h2>
            <p style={{ color: 'var(--ink-soft)', marginBottom: '1.5rem', fontSize: '0.92rem' }}>Required by AFSA and EU AML rules. Demo only — no data is stored.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label className="label">Full legal name</label>
                <input placeholder="As on your passport" defaultValue="Demo User" />
              </div>
              <div>
                <label className="label">Email</label>
                <input type="email" placeholder="you@example.com" defaultValue="demo@vatra.al" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label className="label">Country</label>
                  <select defaultValue="AL">
                    <option value="AL">Albania</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="DE">Germany</option>
                    <option value="IT">Italy</option>
                    <option value="CH">Switzerland</option>
                  </select>
                </div>
                <div>
                  <label className="label">Source of funds</label>
                  <select defaultValue="salary">
                    <option value="salary">Employment</option>
                    <option value="business">Business income</option>
                    <option value="savings">Savings</option>
                    <option value="investment">Other investments</option>
                    <option value="inheritance">Inheritance</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Tax residency</label>
                <select defaultValue="AL">
                  <option value="AL">Albania</option>
                  <option value="EU">EU member state</option>
                  <option value="UK">UK</option>
                  <option value="CA">Canada</option>
                  <option value="OTHER">Other (non-US)</option>
                </select>
              </div>
            </div>

            <div style={{ padding: '0.85rem', background: 'var(--parchment-deep)', borderRadius: '6px', display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.82rem', color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              <Info size={14} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>For investments above €5,000, document upload is required. Below €5,000 we use lite-KYC against EU databases.</span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-secondary" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: 'center' }}><ArrowLeft size={14} /> Back</button>
              <button className="btn-primary" onClick={() => setStep(3)} style={{ flex: 2, justifyContent: 'center' }}>Continue <ArrowRight size={14} /></button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ padding: '2rem' }} className="fade-up">
            <div style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600, marginBottom: '0.5rem' }}>Step 3 · Payment</div>
            <h2 className="display" style={{ fontSize: '1.8rem', margin: 0, marginBottom: '1.5rem' }}>Choose payment</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {[
                { id: 'sepa', label: 'SEPA bank transfer', sub: 'Free · 1–2 business days', icon: '🏦' },
                { id: 'card', label: 'Card payment', sub: '2.9% fee · Instant', icon: '💳' },
                { id: 'crypto', label: 'USDC (Algorand)', sub: 'Network fee only · Instant', icon: '🪙' },
              ].map(method => (
                <div key={method.id} onClick={() => setPaymentMethod(method.id)} style={{ padding: '1rem 1.1rem', border: `2px solid ${paymentMethod === method.id ? 'var(--ink)' : 'var(--line)'}`, borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.85rem', transition: 'all 0.2s' }}>
                  <span style={{ fontSize: '1.4rem' }}>{method.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{method.label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', marginTop: 2 }}>{method.sub}</div>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${paymentMethod === method.id ? 'var(--ink)' : 'var(--line)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {paymentMethod === method.id && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--ink)' }} />}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--parchment-deep)', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.92rem' }}>
                <span style={{ color: 'var(--ink-soft)' }}>Subtotal</span>
                <span className="mono num-tabular">{formatEUR(investAmount)}</span>
              </div>
              {platformFee > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', fontSize: '0.92rem' }}>
                  <span style={{ color: 'var(--ink-soft)' }}>Processing fee</span>
                  <span className="mono num-tabular">{formatEUR(platformFee, { decimals: 2 })}</span>
                </div>
              )}
              <div className="divider-h" style={{ margin: '0.5rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem 0' }}>
                <span style={{ fontWeight: 700 }}>Total</span>
                <span className="mono num-tabular" style={{ fontSize: '1.4rem', fontWeight: 700 }}>{formatEUR(total, { decimals: 2 })}</span>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '1.25rem', cursor: 'pointer' }}>
              <div className={`checkbox ${agreed ? 'checked' : ''}`} onClick={() => setAgreed(!agreed)}>
                {agreed && <Check size={12} />}
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                I agree to the SPV operating agreement, understand fractional real estate is illiquid, and acknowledge this is a demo — no real funds will be charged.
              </span>
            </label>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-secondary" onClick={() => setStep(2)} style={{ flex: 1, justifyContent: 'center' }}><ArrowLeft size={14} /> Back</button>
              <button className="btn-primary" onClick={handleConfirm} disabled={processing || !agreed} style={{ flex: 2, justifyContent: 'center' }}>
                {processing ? <><Loader2 size={14} className="spin" /> Processing...</> : <>Confirm purchase <Check size={14} /></>}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ padding: '3rem 2rem', textAlign: 'center' }} className="fade-up">
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--terracotta)', color: 'var(--parchment)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Check size={36} />
            </div>
            <h2 className="display" style={{ fontSize: '2.2rem', margin: 0, marginBottom: '0.75rem' }}>You own a piece of {property.city}</h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: 420, margin: '0 auto 2rem', lineHeight: 1.5 }}>
              <strong>{tokens}</strong> tokens of <em>{property.name}</em> have been added to your portfolio. Daily rent distribution starts tomorrow at 09:00 CET.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', padding: '1.25rem', background: 'var(--parchment-deep)', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <div>
                <div className="mono num-tabular" style={{ fontSize: '1.4rem', fontWeight: 700 }}>{tokens}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tokens</div>
              </div>
              <div style={{ borderLeft: '1px solid var(--line)', borderRight: '1px solid var(--line)' }}>
                <div className="mono num-tabular" style={{ fontSize: '1.4rem', fontWeight: 700 }}>{formatEUR(investAmount)}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Invested</div>
              </div>
              <div>
                <div className="mono num-tabular" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--terracotta)' }}>{formatEUR(projectedAnnual)}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>1yr est.</div>
              </div>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)' }}>Redirecting to your portfolio...</div>
          </div>
        )}
      </div>
    </div>
  );
}


// ============================================================
// LIST PROPERTY — 4-step wizard with amenities
// ============================================================

function ListPropertyPage({ onNavigate, onSubmit }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', type: 'Apartment', city: 'Tirana', neighborhood: '',
    bedrooms: 2, bathrooms: 1, sqm: '', yearBuilt: '', floor: '',
    price: '', annualRent: '', occupancy: 'Long-term lease', tenant: '',
    description: '', image: '', amenities: [],
    contactName: '', contactEmail: '', contactPhone: '',
    risk: 'low',
  });

  const update = (k, v) => setForm({ ...form, [k]: v });
  const toggleAmenity = (key) => {
    setForm(prev => ({ ...prev, amenities: prev.amenities.includes(key) ? prev.amenities.filter(a => a !== key) : [...prev.amenities, key] }));
  };

  const yld = form.price && form.annualRent ? calcYield(parseFloat(form.annualRent), parseFloat(form.price)) : 0;

  const handleSubmit = () => {
    const newProperty = {
      id: 'user-' + slugify(form.name) + '-' + Date.now().toString(36),
      name: form.name, neighborhood: form.neighborhood, city: form.city, type: form.type,
      price: parseFloat(form.price), annualRent: parseFloat(form.annualRent),
      grossRent: parseFloat(form.annualRent) * 1.2, expenses: parseFloat(form.annualRent) * 0.2,
      bedrooms: parseInt(form.bedrooms), bathrooms: parseInt(form.bathrooms), sqm: parseInt(form.sqm),
      yearBuilt: parseInt(form.yearBuilt) || 2020, floor: parseInt(form.floor) || null,
      photos: form.image ? [
        { url: form.image, caption: 'Hero photo', credit: 'Owner-supplied' },
        { url: form.image, caption: 'Interior view', credit: 'Owner-supplied' },
        { url: form.image, caption: 'Living area', credit: 'Owner-supplied' },
      ] : PHOTO_SETS.blloku,
      description: form.description,
      occupancy: form.occupancy, tenant: form.tenant || 'To be confirmed during onboarding',
      rentPaidCurrent: true,
      amenities: form.amenities,
      risk: form.risk,
      status: 'open', fundedPct: 0, investors: 0,
      badge: 'New listing', listedAt: new Date().toISOString().split('T')[0],
      closesIn: 30,
      legalStructure: 'Pending SPV setup',
      cadastreNumber: 'PENDING-' + Date.now().toString(36).toUpperCase(),
      contactName: form.contactName, contactEmail: form.contactEmail, contactPhone: form.contactPhone,
      isDemo: false, createdAt: Date.now(),
    };
    onSubmit(newProperty);
    setSubmitted(true);
  };

  const canProceed = (s) => {
    if (s === 1) return form.name && form.neighborhood && form.sqm;
    if (s === 2) return form.price && form.annualRent;
    if (s === 3) return form.description && form.contactName && form.contactEmail;
    return true;
  };

  if (submitted) {
    return (
      <div style={{ padding: '6rem 2rem', maxWidth: 640, margin: '0 auto', textAlign: 'center' }} className="fade-up">
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--terracotta)', color: 'var(--parchment)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
          <Check size={40} />
        </div>
        <h1 className="display" style={{ fontSize: '3rem', margin: 0, marginBottom: '1rem', lineHeight: 1 }}>Listing submitted</h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--ink-soft)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          <strong>"{form.name}"</strong> is now live on the marketplace as a preview listing. Our team will reach out to <strong className="mono">{form.contactEmail}</strong> within 24 hours to begin SPV setup.
        </p>
        <div style={{ padding: '1.25rem', background: 'var(--parchment-deep)', borderRadius: '8px', marginBottom: '2rem', textAlign: 'left' }}>
          <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--terracotta)', fontWeight: 600, marginBottom: '0.75rem' }}>What happens next</div>
          {[
            'Day 1: Initial review and property inspection scheduling',
            'Days 2–5: Independent appraisal and cadastral verification (Kartela)',
            'Days 6–14: SPV (SH.P.K.) formation at QKB and AFSA filing',
            'Days 15–21: Luxembourg vehicle wrap and token contract generation',
            'Day 21+: Live offering on VATRA marketplace',
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.4rem 0' }}>
              <span className="mono" style={{ color: 'var(--ink-soft)', fontSize: '0.78rem', flexShrink: 0, marginTop: 2 }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontSize: '0.92rem' }}>{step}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => onNavigate('marketplace')}>View marketplace <ArrowRight size={14} /></button>
          <button className="btn-secondary" onClick={() => onNavigate('home')}>Back to home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-up">
      <section style={{ padding: '3rem 2rem', maxWidth: 920, margin: '0 auto' }}>
        <button className="btn-ghost" onClick={() => onNavigate('home')} style={{ marginBottom: '1rem' }}><ArrowLeft size={14} /> Back</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <div style={{ width: 32, height: 1, background: 'var(--terracotta)' }} />
          <span style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600 }}>List a property</span>
        </div>
        <h1 className="display" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1, margin: 0, marginBottom: '1rem' }}>
          Tokenize your <span className="display-italic">Albanian property</span>.
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--ink-soft)', maxWidth: 720, marginBottom: '3rem', lineHeight: 1.6 }}>
          Sell from 10% of your equity to global investors while keeping operational control. We handle the SPV, AFSA filings, custody, and investor onboarding. Listing review takes 24 hours; full SPV setup ~2–3 weeks.
        </p>

        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem', gap: '0.5rem' }}>
          {[1, 2, 3, 4].map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600, fontSize: '0.85rem', color: s <= step ? 'var(--ink)' : 'var(--ink-soft)' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: s < step ? 'var(--terracotta)' : s === step ? 'var(--ink)' : 'var(--sand)', color: s <= step ? 'var(--parchment)' : 'var(--ink-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace' }}>
                  {s < step ? <Check size={14} /> : s}
                </div>
                <span className="step-label">{['Basics', 'Financials', 'Story', 'Review'][i]}</span>
              </div>
              {s < 4 && <div style={{ flex: 1, height: 1, background: s < step ? 'var(--terracotta)' : 'var(--line)' }} />}
            </React.Fragment>
          ))}
        </div>

        <style>{`@media (max-width: 700px) { .step-label { display: none; } }`}</style>

        {/* STEP 1 — Basics */}
        {step === 1 && (
          <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 className="display" style={{ fontSize: '1.8rem', margin: 0 }}>Property basics</h2>

            <div>
              <label className="label">Property name *</label>
              <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g. Riverside Tower 14A" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="label">City *</label>
                <select value={form.city} onChange={e => update('city', e.target.value)}>
                  {ALBANIAN_CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Neighborhood *</label>
                <input value={form.neighborhood} onChange={e => update('neighborhood', e.target.value)} placeholder="e.g. Riverside, Blloku" />
              </div>
            </div>

            <div>
              <label className="label">Property type *</label>
              <select value={form.type} onChange={e => update('type', e.target.value)}>
                {PROPERTY_TYPES_LIST.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }} className="basics-grid">
              <div><label className="label">Bedrooms</label><input type="number" value={form.bedrooms} onChange={e => update('bedrooms', e.target.value)} min={0} /></div>
              <div><label className="label">Bathrooms</label><input type="number" value={form.bathrooms} onChange={e => update('bathrooms', e.target.value)} min={0} /></div>
              <div><label className="label">Size (m²) *</label><input type="number" value={form.sqm} onChange={e => update('sqm', e.target.value)} placeholder="85" /></div>
              <div><label className="label">Year built</label><input type="number" value={form.yearBuilt} onChange={e => update('yearBuilt', e.target.value)} placeholder="2024" /></div>
              <div><label className="label">Floor</label><input type="number" value={form.floor} onChange={e => update('floor', e.target.value)} placeholder="3" /></div>
            </div>

            <style>{`@media (max-width: 700px) { .basics-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>

            <button className="btn-primary" disabled={!canProceed(1)} onClick={() => setStep(2)} style={{ alignSelf: 'flex-start' }}>
              Continue <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* STEP 2 — Financials & Amenities */}
        {step === 2 && (
          <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 className="display" style={{ fontSize: '1.8rem', margin: 0 }}>Financials</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="label">Property value (€) *</label>
                <input type="number" value={form.price} onChange={e => update('price', e.target.value)} placeholder="200000" />
              </div>
              <div>
                <label className="label">Net annual rent (€) *</label>
                <input type="number" value={form.annualRent} onChange={e => update('annualRent', e.target.value)} placeholder="16000" />
              </div>
            </div>

            {yld > 0 && (
              <div style={{ padding: '1.25rem', background: 'var(--parchment-deep)', borderRadius: '8px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }} className="calc-grid">
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)' }}>Net yield</div>
                  <div className="mono num-tabular" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--terracotta)' }}>{formatPct(yld)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)' }}>Total tokens</div>
                  <div className="mono num-tabular" style={{ fontSize: '1.4rem', fontWeight: 700 }}>{calcTokens(parseFloat(form.price)).toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)' }}>Per token</div>
                  <div className="mono num-tabular" style={{ fontSize: '1.4rem', fontWeight: 700 }}>€50</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)' }}>Daily/token</div>
                  <div className="mono num-tabular" style={{ fontSize: '1.4rem', fontWeight: 700 }}>€{(parseFloat(form.annualRent) / 365 / calcTokens(parseFloat(form.price)) * TOKEN_PRICE).toFixed(3)}</div>
                </div>
                <style>{`@media (max-width: 600px) { .calc-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="label">Occupancy status</label>
                <select value={form.occupancy} onChange={e => update('occupancy', e.target.value)}>
                  <option>Long-term lease</option>
                  <option>Short-term rental</option>
                  <option>Mid-term rental</option>
                  <option>Vacant — turnkey</option>
                  <option>Vacant — needs work</option>
                </select>
              </div>
              <div>
                <label className="label">Risk classification</label>
                <select value={form.risk} onChange={e => update('risk', e.target.value)}>
                  <option value="low">Lower (long lease, stable tenant)</option>
                  <option value="medium">Moderate (STR, seasonal)</option>
                  <option value="high">Higher (vacant, dev phase)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label">Tenant / occupancy notes</label>
              <input value={form.tenant} onChange={e => update('tenant', e.target.value)} placeholder="e.g. Embassy diplomat — 2-year lease, paid current" />
            </div>

            <div>
              <label className="label">Amenities (select all that apply)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.4rem' }}>
                {Object.entries(AMENITIES).map(([key, a]) => {
                  const selected = form.amenities.includes(key);
                  return (
                    <div key={key} onClick={() => toggleAmenity(key)} style={{ padding: '0.65rem 0.85rem', border: `1px solid ${selected ? 'var(--ink)' : 'var(--line)'}`, background: selected ? 'var(--ink)' : 'var(--parchment)', color: selected ? 'var(--parchment)' : 'var(--ink)', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', transition: 'all 0.15s' }}>
                      <a.icon size={14} />
                      <span style={{ flex: 1 }}>{a.label}</span>
                      {selected && <Check size={12} />}
                    </div>
                  );
                })}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', marginTop: '0.5rem' }}>{form.amenities.length} selected</div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-secondary" onClick={() => setStep(1)}><ArrowLeft size={14} /> Back</button>
              <button className="btn-primary" disabled={!canProceed(2)} onClick={() => setStep(3)}>Continue <ArrowRight size={14} /></button>
            </div>
          </div>
        )}

        {/* STEP 3 — Story & Contact */}
        {step === 3 && (
          <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 className="display" style={{ fontSize: '1.8rem', margin: 0 }}>Story & contact</h2>

            <div>
              <label className="label">Description *</label>
              <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={5} placeholder="Describe the property, neighborhood, recent renovations, and what makes it special. 2-4 sentences works well." />
              <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', marginTop: '0.4rem' }}>{form.description.length} characters · 100+ recommended</div>
            </div>

            <div>
              <label className="label">Hero image URL (optional)</label>
              <input value={form.image} onChange={e => update('image', e.target.value)} placeholder="https://..." />
              <p style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', marginTop: '0.4rem' }}>If left empty, we'll use a placeholder until you upload photos during onboarding.</p>
            </div>

            <div className="divider-h" />

            <h3 className="display" style={{ fontSize: '1.3rem', margin: 0 }}>Your contact</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div><label className="label">Your name *</label><input value={form.contactName} onChange={e => update('contactName', e.target.value)} placeholder="Full name" /></div>
              <div><label className="label">Email *</label><input type="email" value={form.contactEmail} onChange={e => update('contactEmail', e.target.value)} placeholder="you@example.com" /></div>
            </div>
            <div>
              <label className="label">Phone (optional)</label>
              <input type="tel" value={form.contactPhone} onChange={e => update('contactPhone', e.target.value)} placeholder="+355 6X XXX XXXX" />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-secondary" onClick={() => setStep(2)}><ArrowLeft size={14} /> Back</button>
              <button className="btn-primary" disabled={!canProceed(3)} onClick={() => setStep(4)}>Review <ArrowRight size={14} /></button>
            </div>
          </div>
        )}

        {/* STEP 4 — Review */}
        {step === 4 && (
          <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 className="display" style={{ fontSize: '1.8rem', margin: 0 }}>Review your listing</h2>

            <div style={{ border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
              {form.image && (
                <div style={{ aspectRatio: '16/9', background: 'var(--sand)', overflow: 'hidden' }}>
                  <SmartImage src={form.image} alt={form.name} fallbackName={form.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-soft)', marginBottom: '0.4rem' }}>{form.neighborhood}, {form.city} · {form.type}</div>
                <h3 className="display" style={{ fontSize: '1.8rem', margin: 0, marginBottom: '0.75rem' }}>{form.name}</h3>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '1rem' }}>
                  <span>{form.bedrooms} bed</span><span>·</span>
                  <span>{form.bathrooms} bath</span><span>·</span>
                  <span>{form.sqm} m²</span>
                  {form.yearBuilt && <><span>·</span><span>Built {form.yearBuilt}</span></>}
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>{form.description}</p>
                <div className="divider-h" style={{ margin: '1rem 0' }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Value</div>
                    <div className="mono num-tabular" style={{ fontSize: '1.05rem', fontWeight: 700 }}>{formatEUR(parseFloat(form.price))}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Annual rent</div>
                    <div className="mono num-tabular" style={{ fontSize: '1.05rem', fontWeight: 700 }}>{formatEUR(parseFloat(form.annualRent))}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Yield</div>
                    <div className="mono num-tabular" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--terracotta)' }}>{formatPct(yld)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tokens</div>
                    <div className="mono num-tabular" style={{ fontSize: '1.05rem', fontWeight: 700 }}>{calcTokens(parseFloat(form.price)).toLocaleString()}</div>
                  </div>
                </div>
                {form.amenities.length > 0 && (
                  <>
                    <div className="divider-h" style={{ margin: '1rem 0' }} />
                    <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Amenities ({form.amenities.length})</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {form.amenities.map(k => AMENITIES[k] && <Pill key={k}>{AMENITIES[k].label}</Pill>)}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div style={{ padding: '1.25rem', background: 'var(--parchment-deep)', borderRadius: '8px', fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--ink-soft)' }}>
              <strong style={{ color: 'var(--ink)' }}>What happens next:</strong> Our team reviews your submission within 24 hours. If accepted, we begin Albanian SPV setup, cadastre verification (Kartela), AFSA filing, and the Luxembourg vehicle wrap. Tokens go live on the marketplace once fully structured (typically 2–3 weeks).
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-secondary" onClick={() => setStep(3)}><ArrowLeft size={14} /> Back</button>
              <button className="btn-primary" onClick={handleSubmit} style={{ flex: 1, justifyContent: 'center' }}>
                <Send size={14} /> Submit listing
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}


// ============================================================
// PORTFOLIO with charts
// ============================================================

function PortfolioPage({ holdings, properties, onNavigate }) {
  const enriched = useMemo(() => {
    return holdings.map(h => {
      const prop = properties.find(p => p.id === h.propertyId);
      if (!prop) return null;
      const yld = calcYield(prop.annualRent, prop.price);
      const projectedAnnual = (h.amount * yld) / 100;
      const daysSince = Math.max(1, Math.floor((Date.now() - h.purchaseDate) / (1000 * 60 * 60 * 24)));
      const earnedToDate = (projectedAnnual / 365) * daysSince;
      return { ...h, property: prop, yld, projectedAnnual, earnedToDate, daysSince };
    }).filter(Boolean);
  }, [holdings, properties]);

  const totals = useMemo(() => {
    const invested = enriched.reduce((s, h) => s + h.amount, 0);
    const tokens = enriched.reduce((s, h) => s + h.tokens, 0);
    const projAnnual = enriched.reduce((s, h) => s + h.projectedAnnual, 0);
    const earned = enriched.reduce((s, h) => s + h.earnedToDate, 0);
    const avgYield = invested > 0 ? (projAnnual / invested) * 100 : 0;
    return { invested, tokens, projAnnual, earned, avgYield };
  }, [enriched]);

  // Monthly distribution rollup chart
  const distChart = useMemo(() => {
    if (enriched.length === 0) return [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const data = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = months[d.getMonth()];
      const total = enriched.reduce((sum, h) => {
        const monthly = h.projectedAnnual / 12;
        const seasonalMult = [0.95, 0.93, 0.97, 1.02, 1.05, 1.12, 1.18, 1.20, 1.10, 1.02, 0.96, 0.94][d.getMonth()];
        return sum + monthly * seasonalMult * (0.94 + Math.random() * 0.12);
      }, 0);
      data.push({ label: `${monthName} ${d.getFullYear().toString().slice(2)}`, amount: Math.round(total) });
    }
    return data;
  }, [enriched]);

  // Allocation pie data
  const allocationData = useMemo(() => {
    const byType = {};
    enriched.forEach(h => {
      byType[h.property.type] = (byType[h.property.type] || 0) + h.amount;
    });
    const colors = ['var(--terracotta)', 'var(--adriatic)', 'var(--gold)', 'var(--moss)', 'var(--rose-deep)', 'var(--sage)', 'var(--ink)'];
    return Object.entries(byType).map(([name, value], i) => ({ name, value, fill: colors[i % colors.length] }));
  }, [enriched]);

  if (enriched.length === 0) {
    return (
      <div className="fade-up">
        <section style={{ padding: '5rem 2rem', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
            <div style={{ width: 32, height: 1, background: 'var(--terracotta)' }} />
            <span style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600 }}>Portfolio</span>
          </div>
          <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: 0, marginBottom: '2rem', lineHeight: 1 }}>
            Your portfolio is <span className="display-italic">empty</span>.
          </h1>
          <div style={{ padding: '4rem 2rem', textAlign: 'center', border: '1px dashed var(--line)', borderRadius: '12px', background: 'var(--parchment-deep)' }}>
            <Wallet size={32} style={{ color: 'var(--ink-soft)', marginBottom: '1rem' }} />
            <h3 className="display" style={{ fontSize: '1.6rem', margin: 0, marginBottom: '0.5rem' }}>No holdings yet</h3>
            <p style={{ color: 'var(--ink-soft)', marginBottom: '1.5rem' }}>Start by browsing properties and buying your first €50 token.</p>
            <button className="btn-primary" onClick={() => onNavigate('marketplace')}>Browse marketplace <ArrowRight size={14} /></button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="fade-up">
      <section style={{ padding: '4rem 2rem 2rem', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <div style={{ width: 32, height: 1, background: 'var(--terracotta)' }} />
          <span style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600 }}>Portfolio</span>
        </div>
        <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1, margin: 0, marginBottom: '3rem' }}>
          Your stake in <span className="display-italic">Albania</span>.
        </h1>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ padding: '1.5rem', background: 'var(--ink)', color: 'var(--parchment)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--rose)', marginBottom: '0.5rem' }}>Total invested</div>
            <div className="mono num-tabular" style={{ fontSize: '2rem', fontWeight: 700 }}>{formatEUR(totals.invested)}</div>
            <div style={{ fontSize: '0.78rem', opacity: 0.7, marginTop: '0.2rem' }}>{totals.tokens} tokens · {enriched.length} {enriched.length === 1 ? 'property' : 'properties'}</div>
          </div>
          <div style={{ padding: '1.5rem', background: 'var(--terracotta)', color: 'var(--parchment)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.85, marginBottom: '0.5rem' }}>Earned to date</div>
            <div className="mono num-tabular" style={{ fontSize: '2rem', fontWeight: 700 }}>+{formatEUR(totals.earned)}</div>
            <div style={{ fontSize: '0.78rem', opacity: 0.85, marginTop: '0.2rem' }}>Across all properties</div>
          </div>
          <div style={{ padding: '1.5rem', border: '1px solid var(--line)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-soft)', marginBottom: '0.5rem' }}>Projected annual</div>
            <div className="mono num-tabular" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--terracotta)' }}>{formatEUR(totals.projAnnual)}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', marginTop: '0.2rem' }}>{formatPct(totals.avgYield)} blended yield</div>
          </div>
          <div style={{ padding: '1.5rem', border: '1px solid var(--line)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-soft)', marginBottom: '0.5rem' }}>Daily distribution</div>
            <div className="mono num-tabular" style={{ fontSize: '2rem', fontWeight: 700 }}>€{(totals.projAnnual / 365).toFixed(2)}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', marginTop: '0.2rem' }}>Paid every 24h</div>
          </div>
        </div>

        {/* Charts row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem', marginBottom: '3rem' }} className="charts-grid">
          <div style={{ padding: '1.5rem', border: '1px solid var(--line)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 className="display" style={{ fontSize: '1.4rem', margin: 0 }}>Distribution history</h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--ink-soft)' }}>Last 12 months</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={distChart} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--line)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} fontSize={11} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={v => '€' + v} />
                <Tooltip content={<ChartTooltip prefix="€" />} cursor={{ fill: 'var(--sand)' }} />
                <Bar dataKey="amount" fill="var(--terracotta)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ padding: '1.5rem', border: '1px solid var(--line)', borderRadius: '8px' }}>
            <h2 className="display" style={{ fontSize: '1.4rem', margin: 0, marginBottom: '1rem' }}>Allocation</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={allocationData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {allocationData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip content={<ChartTooltip prefix="€" />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem' }}>
              {allocationData.map(a => (
                <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.fill }} />
                  <span style={{ flex: 1 }}>{a.name}</span>
                  <span className="mono num-tabular" style={{ color: 'var(--ink-soft)' }}>{formatEUR(a.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Holdings */}
        <h2 className="display" style={{ fontSize: '2rem', margin: 0, marginBottom: '1.5rem' }}>Your holdings</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          {enriched.map(h => (
            <div key={h.id} className="card card-hover" style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: '1.5rem', padding: '1.25rem', alignItems: 'center', cursor: 'pointer' }} onClick={() => onNavigate('property', h.property.id)}>
              <div style={{ aspectRatio: '1', background: 'var(--sand)', borderRadius: '6px', overflow: 'hidden' }}>
                <SmartImage src={pUrl(h.property.photos ? h.property.photos[0] : '')} fallbackName={h.property.name} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>{h.property.neighborhood}, {h.property.city}</div>
                <h3 className="display" style={{ fontSize: '1.4rem', margin: 0, marginBottom: '0.3rem' }}>{h.property.name}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
                  Purchased <span className="mono">{new Date(h.purchaseDate).toLocaleDateString()}</span>
                  {h.daysSince > 0 && <> · <span className="mono">{h.daysSince}</span> days held</>}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '2rem', textAlign: 'right' }} className="holding-stats">
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tokens</div>
                  <div className="mono num-tabular" style={{ fontSize: '1.05rem', fontWeight: 700 }}>{h.tokens}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Invested</div>
                  <div className="mono num-tabular" style={{ fontSize: '1.05rem', fontWeight: 700 }}>{formatEUR(h.amount)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Yield</div>
                  <div className="mono num-tabular" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--terracotta)' }}>{formatPct(h.yld)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Earned</div>
                  <div className="mono num-tabular" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--terracotta)' }}>+{formatEUR(h.earnedToDate)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 900px) { .charts-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 800px) { .holding-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; text-align: left !important; margin-top: 1rem; } }
        `}</style>
      </section>
    </div>
  );
}


// ============================================================
// HOW IT WORKS
// ============================================================

function HowItWorksPage({ onNavigate }) {
  const faqs = [
    { q: 'What exactly do I own when I buy a token?', a: 'You buy a fractional membership interest in an Albanian SH.P.K. (limited liability company) that holds the title to the property at the State Cadastre Agency (ASHK). One €50 token = one fractional unit of the SPV. You earn a proportional share of net rent and any sale proceeds.' },
    { q: 'Is this regulated?', a: 'Yes. Token issuance follows Albania\'s 2020 Distributed Ledger Technology Law and is supervised by AFSA (the Albanian Financial Supervisory Authority). Tokens are typically wrapped through a Luxembourg RAIF or ELTIF 2.0 vehicle for EU-grade investor protection. KYC/AML is mandatory.' },
    { q: 'How is rental income paid out?', a: 'Net rental income (after taxes, management fees, and reserves) is distributed daily, in proportion to your token holdings. Distributions arrive in EUR via SEPA to your linked bank account, or in USDC to your Algorand wallet.' },
    { q: 'Can I sell my tokens?', a: 'Yes. VATRA operates a 24/7 secondary market where token holders set bid/ask prices. Liquidity varies by property — newer or higher-yield listings tend to be more liquid. There is no lockup period.' },
    { q: 'What are the fees?', a: '2.5% on buy and sell orders, paid by the trader. Property listers pay a one-time 3% setup fee covering SPV formation, AFSA filing, and Luxembourg wrap. Annual ongoing management fee: 1% of property value, deducted from gross rent before distribution.' },
    { q: 'What happens if VATRA shuts down?', a: 'Each property is held by an independent SPV with its own deed registered at ASHK. If VATRA ceased operations, token holders would still legally own their fractional shares of the SPVs. A backup administrator (currently Deloitte Albania) would take over operations.' },
    { q: 'Who can invest?', a: 'Anyone over 18 who passes KYC. Currently available to residents of Albania, the EU, UK, Switzerland, Canada, and select non-US jurisdictions. US-resident investors require accredited status under Reg D 506(c).' },
    { q: 'Is my capital at risk?', a: 'Yes. Real estate values can decrease, tenants can default, and tokenized real estate is illiquid relative to public stocks. Past performance does not guarantee future results. Only invest what you can afford to leave invested for 3+ years.' },
    { q: 'How are properties vetted?', a: 'Every listing goes through: independent appraisal by a registered Albanian valuer, on-site inspection, title search at ASHK with verification of clean cadastre entry, tax compliance check, lease/tenancy verification, and finally legal review by our Tirana counsel.' },
    { q: 'What are the tax implications?', a: 'Distributions are paid net of Albanian withholding tax (15%). Most EU treaty countries allow you to claim this as a foreign tax credit. We provide annual K-1 equivalents (Albanian "Pasqyra"). Consult your tax advisor for jurisdiction-specific guidance.' },
  ];

  return (
    <div className="fade-up">
      <section style={{ padding: '5rem 2rem 3rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <div style={{ width: 32, height: 1, background: 'var(--terracotta)' }} />
          <span style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600 }}>How it works</span>
        </div>
        <h1 className="display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.95, margin: 0, marginBottom: '2rem' }}>
          Real property. <br /><span className="display-italic">Real shares</span>. Real income.
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 700, marginBottom: '4rem' }}>
          VATRA combines traditional Albanian property law with modern token infrastructure. Here is exactly what happens when you buy a token, from your end and ours.
        </p>

        {/* Diagram */}
        <div style={{ marginBottom: '5rem' }}>
          <h2 className="display" style={{ fontSize: '2rem', margin: 0, marginBottom: '2rem' }}>The full structure</h2>
          <div style={{ background: 'var(--parchment-deep)', borderRadius: '12px', padding: '2rem', position: 'relative' }}>
            <svg viewBox="0 0 800 400" style={{ width: '100%', height: 'auto', maxHeight: 400 }}>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="var(--ink)" />
                </marker>
              </defs>

              <g>
                <rect x="20" y="160" width="140" height="80" rx="8" fill="var(--ink)" />
                <text x="90" y="195" textAnchor="middle" fill="var(--parchment)" fontFamily="Instrument Serif" fontSize="20">You</text>
                <text x="90" y="215" textAnchor="middle" fill="var(--rose)" fontFamily="JetBrains Mono" fontSize="11">Token holder</text>
              </g>

              <path d="M170 200 L240 200" stroke="var(--ink)" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <text x="205" y="190" textAnchor="middle" fontFamily="Manrope" fontSize="11" fill="var(--ink-soft)">€50 / token</text>
              <text x="205" y="220" textAnchor="middle" fontFamily="Manrope" fontSize="11" fill="var(--terracotta)">+ daily rent</text>

              <g>
                <rect x="250" y="120" width="160" height="160" rx="8" fill="var(--parchment)" stroke="var(--ink)" strokeWidth="1.5" />
                <text x="330" y="155" textAnchor="middle" fontFamily="Instrument Serif" fontSize="18">Luxembourg</text>
                <text x="330" y="180" textAnchor="middle" fontFamily="Instrument Serif" fontSize="18">RAIF / ELTIF</text>
                <text x="330" y="210" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--ink-soft)">Issues tokens</text>
                <text x="330" y="225" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--ink-soft)">EU regulated</text>
                <text x="330" y="255" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--terracotta)">CSSF + AFSA</text>
              </g>

              <path d="M420 200 L490 200" stroke="var(--ink)" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <text x="455" y="190" textAnchor="middle" fontFamily="Manrope" fontSize="11" fill="var(--ink-soft)">Owns SPV</text>

              <g>
                <rect x="500" y="120" width="160" height="160" rx="8" fill="var(--terracotta)" />
                <text x="580" y="155" textAnchor="middle" fontFamily="Instrument Serif" fontSize="18" fill="var(--parchment)">Albanian</text>
                <text x="580" y="180" textAnchor="middle" fontFamily="Instrument Serif" fontSize="18" fill="var(--parchment)">SH.P.K.</text>
                <text x="580" y="210" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--rose)">Holds title</text>
                <text x="580" y="225" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--rose)">Collects rent</text>
                <text x="580" y="255" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--parchment)">Registered ASHK</text>
              </g>

              <path d="M670 200 L740 200" stroke="var(--ink)" strokeWidth="1.5" markerEnd="url(#arrow)" />

              <g>
                <rect x="720" y="160" width="60" height="80" rx="4" fill="var(--adriatic)" />
                <polygon points="720,160 750,140 780,160" fill="var(--ink)" />
                <rect x="740" y="200" width="20" height="40" fill="var(--gold)" />
                <text x="750" y="270" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--ink-soft)">Real property</text>
              </g>
            </svg>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', textAlign: 'center', marginTop: '1rem' }}>
              Title flows through a 4-layer structure: <strong style={{ color: 'var(--ink)' }}>You → Token → Luxembourg vehicle → Albanian SPV → Property at ASHK</strong>.
            </p>
          </div>
        </div>

        {/* Comparison table */}
        <div style={{ marginBottom: '5rem' }}>
          <h2 className="display" style={{ fontSize: '2rem', margin: 0, marginBottom: '0.5rem' }}>How it compares</h2>
          <p style={{ color: 'var(--ink-soft)', marginBottom: '2rem' }}>VATRA vs. traditional ownership vs. listed REITs.</p>

          <div style={{ border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: 'var(--parchment)' }}>
                  <th style={{ padding: '1rem 1.25rem', textAlign: 'left', fontWeight: 600, fontSize: '0.85rem' }}></th>
                  <th style={{ padding: '1rem 1.25rem', textAlign: 'center', fontWeight: 600, fontSize: '0.85rem', background: 'var(--terracotta)' }}>VATRA</th>
                  <th style={{ padding: '1rem 1.25rem', textAlign: 'center', fontWeight: 600, fontSize: '0.85rem' }}>Traditional buy</th>
                  <th style={{ padding: '1rem 1.25rem', textAlign: 'center', fontWeight: 600, fontSize: '0.85rem' }}>Listed REIT</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Minimum investment', vatra: '€50', trad: '€80,000+', reit: '€10' },
                  { label: 'Direct property ownership', vatra: '✓ via SPV', trad: '✓', reit: '✗' },
                  { label: 'Daily distributions', vatra: '✓', trad: 'Manual', reit: 'Quarterly' },
                  { label: 'Liquidity', vatra: '24/7 secondary', trad: '6–18 months', reit: 'Instant' },
                  { label: 'Property selection', vatra: 'Per-property', trad: 'Per-property', reit: 'Pooled' },
                  { label: 'Management hassle', vatra: 'None', trad: 'High', reit: 'None' },
                  { label: 'Albanian residency credit', vatra: 'Not eligible', trad: '✓ if 50%+', reit: '✗' },
                  { label: 'Setup cost', vatra: '0%', trad: '~3–5%', reit: '0%' },
                  { label: 'Annual fees', vatra: '1%', trad: '~1.5–2%', reit: '0.5–2%' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderTop: '1px solid var(--line)', background: i % 2 === 0 ? 'transparent' : 'var(--parchment-deep)' }}>
                    <td style={{ padding: '0.85rem 1.25rem', fontWeight: 500, fontSize: '0.92rem' }}>{row.label}</td>
                    <td style={{ padding: '0.85rem 1.25rem', textAlign: 'center', background: 'rgba(184, 65, 12, 0.06)', fontFamily: 'JetBrains Mono', fontSize: '0.88rem', fontWeight: 600 }}>{row.vatra}</td>
                    <td style={{ padding: '0.85rem 1.25rem', textAlign: 'center', color: 'var(--ink-soft)', fontFamily: 'JetBrains Mono', fontSize: '0.88rem' }}>{row.trad}</td>
                    <td style={{ padding: '0.85rem 1.25rem', textAlign: 'center', color: 'var(--ink-soft)', fontFamily: 'JetBrains Mono', fontSize: '0.88rem' }}>{row.reit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <h2 className="display" style={{ fontSize: '2.5rem', margin: 0, marginBottom: '2rem' }}>Questions, answered</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '4rem' }}>
          {faqs.map((faq, i) => (
            <details key={i} style={{ borderBottom: '1px solid var(--line)', padding: '1.25rem 0' }}>
              <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, fontSize: '1.05rem' }}>
                {faq.q}
                <ChevronDown size={18} className="details-chevron" style={{ transition: 'transform 0.3s' }} />
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--ink-soft)', lineHeight: 1.6, fontSize: '0.95rem' }}>{faq.a}</p>
            </details>
          ))}
        </div>

        <div style={{ padding: '3rem', background: 'var(--ink)', color: 'var(--parchment)', borderRadius: '12px', textAlign: 'center' }}>
          <h3 className="display" style={{ fontSize: '2rem', margin: 0, marginBottom: '1rem' }}>Ready to start?</h3>
          <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>Browse vetted Tirana properties or list your own.</p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ background: 'var(--terracotta)' }} onClick={() => onNavigate('marketplace')}>Browse properties <ArrowRight size={14} /></button>
            <button className="btn-primary" style={{ background: 'var(--rose)', color: 'var(--ink)' }} onClick={() => onNavigate('list')}>List a property</button>
          </div>
        </div>
      </section>
    </div>
  );
}


// ============================================================
// FOOTER
// ============================================================

function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--parchment)', padding: '5rem 2rem 2rem' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr', gap: '3rem', marginBottom: '3rem' }} className="footer-grid">
          <div>
            <VatraLogo size={28} color="var(--parchment)" />
            <p style={{ marginTop: '1rem', maxWidth: 320, opacity: 0.7, fontSize: '0.9rem', lineHeight: 1.5 }}>
              Albania's first AFSA-aligned fractional real estate platform. Own from €50. Earn daily. Sell anytime.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
              {[Twitter, Instagram, Linkedin, Github, Youtube].map((Icon, i) => (
                <a key={i} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(250, 247, 242, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--parchment)', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--terracotta)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(250, 247, 242, 0.1)'}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--rose)', marginBottom: '1rem', fontWeight: 600 }}>Platform</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <a onClick={() => onNavigate('marketplace')} style={{ cursor: 'pointer', color: 'var(--parchment)', textDecoration: 'none', opacity: 0.85 }}>Marketplace</a>
              <a onClick={() => onNavigate('list')} style={{ cursor: 'pointer', color: 'var(--parchment)', textDecoration: 'none', opacity: 0.85 }}>List a property</a>
              <a onClick={() => onNavigate('portfolio')} style={{ cursor: 'pointer', color: 'var(--parchment)', textDecoration: 'none', opacity: 0.85 }}>Portfolio</a>
              <a onClick={() => onNavigate('favorites')} style={{ cursor: 'pointer', color: 'var(--parchment)', textDecoration: 'none', opacity: 0.85 }}>Favorites</a>
              <a onClick={() => onNavigate('how-it-works')} style={{ cursor: 'pointer', color: 'var(--parchment)', textDecoration: 'none', opacity: 0.85 }}>How it works</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--rose)', marginBottom: '1rem', fontWeight: 600 }}>Legal</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', opacity: 0.85 }}>
              <span style={{ cursor: 'pointer' }}>Terms of Service</span>
              <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
              <span style={{ cursor: 'pointer' }}>SPV agreements</span>
              <span style={{ cursor: 'pointer' }}>Risk disclosure</span>
              <span style={{ cursor: 'pointer' }}>AFSA registration</span>
              <span style={{ cursor: 'pointer' }}>CSSF disclosures</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--rose)', marginBottom: '1rem', fontWeight: 600 }}>Office</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.7 }}>
              Rruga Ibrahim Rugova<br />
              Tirana 1019, Albania<br />
              <span className="mono" style={{ fontSize: '0.82rem' }}>hello@vatra.al</span><br />
              <span className="mono" style={{ fontSize: '0.82rem' }}>+355 4 222 0000</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--rose)', marginBottom: '1rem', fontWeight: 600 }}>Get the brief</div>
            <p style={{ fontSize: '0.85rem', opacity: 0.75, marginBottom: '1rem', lineHeight: 1.5 }}>Monthly: new listings, market updates, regulatory changes.</p>
            {subscribed ? (
              <div style={{ padding: '0.85rem', background: 'rgba(212, 162, 140, 0.15)', borderRadius: '6px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} color="var(--rose)" /> Subscribed
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (email) setSubscribed(true); }} style={{ display: 'flex', gap: '0.4rem' }}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" style={{ flex: 1, background: 'rgba(250, 247, 242, 0.08)', color: 'var(--parchment)', border: '1px solid rgba(250, 247, 242, 0.2)', fontSize: '0.85rem' }} />
                <button type="submit" className="btn-icon" style={{ background: 'var(--rose)', color: 'var(--ink)', border: 'none', flexShrink: 0 }}><Send size={14} /></button>
              </form>
            )}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(250, 247, 242, 0.15)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '0.78rem', opacity: 0.5 }}>
            © 2026 VATRA Platform Sh.p.k. · A demo product · Not a real offering
          </div>
          <div style={{ fontSize: '0.78rem', opacity: 0.5, display: 'flex', gap: '1rem' }}>
            <span>🇦🇱 Tirana</span><span>·</span>
            <span>🇱🇺 Luxembourg</span><span>·</span>
            <span>EUR · USDC</span>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1100px) { .footer-grid { grid-template-columns: 1fr 1fr 1fr !important; } }
        @media (max-width: 700px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; } }
        @media (max-width: 500px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}

// ============================================================
// PROPERTY-MATCH WIZARD — multi-step questionnaire that ranks properties
// ============================================================

function PropertyWizard({ properties, onClose, onNavigate }) {
  const [step, setStep] = useState(0); // 0 = welcome, 1-6 = questions, 7 = results
  const [answers, setAnswers] = useState({
    location: null,    // 'AL' | 'EU' | 'NA' | 'OTHER'
    goal: null,        // 'income' | 'vacation' | 'appreciation' | 'all'
    region: null,      // 'tirana' | 'coast' | 'heritage' | 'any'
    budget: null,      // 'starter' | 'intermediate' | 'committed' | 'serious'
    risk: null,        // 'low' | 'medium' | 'any'
    horizon: null,     // 'short' | 'mid' | 'long'
  });

  const update = (k, v) => setAnswers({ ...answers, [k]: v });

  const QUESTIONS = [
    {
      key: 'location',
      title: 'Where do you live?',
      subtitle: 'So we can tailor distribution methods and tax considerations.',
      options: [
        { id: 'AL', label: 'Albania', sub: 'Local resident', icon: '🇦🇱' },
        { id: 'EU', label: 'European Union', sub: 'EU passport / residence', icon: '🇪🇺' },
        { id: 'NA', label: 'North America', sub: 'US or Canada', icon: '🌎' },
        { id: 'OTHER', label: 'Somewhere else', sub: 'UK, Switzerland, other', icon: '🌐' },
      ],
    },
    {
      key: 'goal',
      title: 'What\'s your investment goal?',
      subtitle: 'There\'s no wrong answer — this helps us shortlist properties that fit your style.',
      options: [
        { id: 'income', label: 'Steady monthly income', sub: 'Long-term lease, predictable rent', icon: '💼' },
        { id: 'vacation', label: 'Higher seasonal yields', sub: 'Coastal STR, summer-heavy', icon: '🏖️' },
        { id: 'appreciation', label: 'Long-term appreciation', sub: 'Capital growth over rent', icon: '📈' },
        { id: 'all', label: 'A mix of all three', sub: 'Diversified portfolio', icon: '🎯' },
      ],
    },
    {
      key: 'region',
      title: 'Where in Albania?',
      subtitle: 'Each region has a different yield + appreciation profile.',
      options: [
        { id: 'tirana', label: 'Tirana', sub: 'Capital — strong appreciation, urban', icon: '🏙️' },
        { id: 'coast', label: 'The Coast', sub: 'Vlorë · Sarandë · Ksamil · Durrës', icon: '🌊' },
        { id: 'heritage', label: 'Heritage cities', sub: 'Berat · Korçë · Shkodër', icon: '🏛️' },
        { id: 'any', label: 'No preference', sub: 'Show me everything', icon: '✦' },
      ],
    },
    {
      key: 'budget',
      title: 'How much do you want to invest?',
      subtitle: 'Total amount across all properties. You can change this later.',
      options: [
        { id: 'starter', label: '€50 – €500', sub: 'Just exploring', icon: '🌱' },
        { id: 'intermediate', label: '€500 – €2,000', sub: 'Starter portfolio', icon: '🌿' },
        { id: 'committed', label: '€2,000 – €10,000', sub: 'Committed allocator', icon: '🌳' },
        { id: 'serious', label: '€10,000+', sub: 'Serious investor', icon: '🏔️' },
      ],
    },
    {
      key: 'risk',
      title: 'What\'s your risk tolerance?',
      subtitle: 'Higher yields generally mean higher variability.',
      options: [
        { id: 'low', label: 'Lower risk', sub: 'Stable, long-lease properties', icon: '🛡️' },
        { id: 'medium', label: 'Moderate risk', sub: 'Mix of stable + STR', icon: '⚖️' },
        { id: 'any', label: 'Higher risk for higher yield', sub: 'Max yield, will accept variability', icon: '🔥' },
      ],
    },
    {
      key: 'horizon',
      title: 'How long can you stay invested?',
      subtitle: 'You can sell anytime, but real estate rewards patience.',
      options: [
        { id: 'short', label: 'Up to 1 year', sub: 'Likely will sell sooner', icon: '⏱️' },
        { id: 'mid', label: '1 – 3 years', sub: 'Mid-term', icon: '📅' },
        { id: 'long', label: '3+ years', sub: 'Long-term hold', icon: '🌅' },
      ],
    },
  ];

  // Match score calculation
  const matches = useMemo(() => {
    if (step !== 7) return [];
    return properties
      .filter(p => p.status === 'open')
      .map(p => {
        let score = 0;
        const reasons = [];

        // Goal match
        if (answers.goal === 'income') {
          if (p.occupancy.includes('Long-term')) { score += 30; reasons.push('Long-term lease aligns with steady income goal'); }
          else if (p.occupancy.includes('Mid-term')) { score += 18; reasons.push('Mid-term rental gives reliable income'); }
          else { score += 6; }
        }
        if (answers.goal === 'vacation') {
          if (p.occupancy.includes('Short-term')) { score += 30; reasons.push('STR property captures peak-season yields'); }
          else { score += 5; }
        }
        if (answers.goal === 'appreciation') {
          const n = NEIGHBORHOODS[p.neighborhood];
          if (n && n.growth >= 20) { score += 28; reasons.push(`${formatPct(n.growth)} annual growth in ${p.neighborhood}`); }
          else if (n && n.growth >= 15) { score += 18; reasons.push(`Strong ${formatPct(n.growth)} appreciation`); }
          else { score += 8; }
        }
        if (answers.goal === 'all') { score += 18; }

        // Region match
        if (answers.region === 'tirana' && p.city === 'Tirana') { score += 24; reasons.push('In Tirana, your preferred region'); }
        else if (answers.region === 'coast' && ['Vlorë', 'Sarandë', 'Durrës', 'Ksamil'].includes(p.city)) { score += 24; reasons.push(`Coastal property in ${p.city}`); }
        else if (answers.region === 'heritage' && ['Berat', 'Korçë', 'Shkodër'].includes(p.city)) { score += 24; reasons.push(`Heritage city: ${p.city}`); }
        else if (answers.region === 'any') { score += 14; }
        else { score += 4; }

        // Budget match — at least 1 token must fit, ideally several
        const budgetMin = { starter: 50, intermediate: 500, committed: 2000, serious: 10000 }[answers.budget] || 50;
        const budgetMax = { starter: 500, intermediate: 2000, committed: 10000, serious: 100000 }[answers.budget] || 100000;
        if (budgetMin <= TOKEN_PRICE) {
          score += 14;
        } else {
          const tokensAffordable = Math.floor(budgetMax / TOKEN_PRICE);
          const tokensTotal = calcTokens(p.price);
          if (tokensAffordable >= tokensTotal * 0.001) { score += 14; reasons.push(`Fits your €${budgetMin}–${budgetMax} range`); }
          else { score += 6; }
        }

        // Risk match
        if (answers.risk === p.risk) { score += 20; reasons.push(`${riskMeta(p.risk).label} — matches your risk tolerance`); }
        else if (answers.risk === 'any') { score += 14; }
        else if ((answers.risk === 'low' && p.risk === 'medium') || (answers.risk === 'medium' && p.risk === 'low')) { score += 10; }
        else { score += 4; }

        // Yield bonus
        const yld = calcYield(p.annualRent, p.price);
        if (yld >= 11) { score += 12; reasons.push(`High ${formatPct(yld)} net yield`); }
        else if (yld >= 9) { score += 8; }
        else if (yld >= 7) { score += 5; }

        // Funded momentum bonus (if filling fast)
        if (p.fundedPct > 60 && p.fundedPct < 100) { score += 5; reasons.push('Filling fast'); }

        return { property: p, score, reasons: reasons.slice(0, 3) };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [step, properties, answers]);

  const progress = step === 0 ? 0 : step === 7 ? 100 : (step / 6) * 100;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--parchment)', borderRadius: '16px', maxWidth: 720, width: '100%', maxHeight: '92vh', overflowY: 'auto', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', zIndex: 2 }}><X size={20} /></button>

        {/* Progress */}
        {step > 0 && step < 7 && (
          <div style={{ padding: '1rem 2rem 0' }}>
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--ink-soft)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Question {step} of 6</span>
              <span className="mono">{Math.round(progress)}% complete</span>
            </div>
          </div>
        )}

        {/* WELCOME */}
        {step === 0 && (
          <div style={{ padding: '3.5rem 2.5rem 2.5rem', textAlign: 'center' }} className="fade-up">
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--terracotta)', color: 'var(--parchment)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Sparkles size={36} />
            </div>
            <div style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600, marginBottom: '0.6rem' }}>The VATRA Match</div>
            <h2 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0, marginBottom: '1rem', lineHeight: 1.05 }}>
              Find the right Albanian properties <br/><span className="display-italic">for you</span>.
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--ink-soft)', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.55 }}>
              6 quick questions. Takes under a minute. We'll rank our open listings against your goals and show you the top three matches with a clear explanation of why.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2.5rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--ink-soft)' }}><Clock size={14} /> 1 minute</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--ink-soft)' }}><Shield size={14} /> No signup</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--ink-soft)' }}><Zap size={14} /> Instant results</div>
            </div>
            <button className="btn-primary" onClick={() => setStep(1)} style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              Start the quiz <ArrowRight size={14} />
            </button>
            <div style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'var(--ink-soft)' }}>
              Or <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--terracotta)', cursor: 'pointer', textDecoration: 'underline', font: 'inherit' }}>skip and browse all properties</button>
            </div>
          </div>
        )}

        {/* QUESTIONS */}
        {step >= 1 && step <= 6 && (() => {
          const q = QUESTIONS[step - 1];
          const selected = answers[q.key];
          return (
            <div style={{ padding: '1.5rem 2.5rem 2.5rem' }} className="fade-up" key={step}>
              <div style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600, marginBottom: '0.6rem' }}>Step {step} / 6</div>
              <h2 className="display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', margin: 0, marginBottom: '0.6rem', lineHeight: 1.1 }}>{q.title}</h2>
              <p style={{ color: 'var(--ink-soft)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 1.5 }}>{q.subtitle}</p>

              <div style={{ display: 'grid', gridTemplateColumns: q.options.length === 4 ? '1fr 1fr' : '1fr', gap: '0.75rem', marginBottom: '2rem' }} className="wizard-options">
                {q.options.map(opt => {
                  const isSelected = selected === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => {
                        update(q.key, opt.id);
                        setTimeout(() => setStep(step + 1), 250);
                      }}
                      style={{
                        padding: '1.25rem',
                        border: `2px solid ${isSelected ? 'var(--ink)' : 'var(--line)'}`,
                        background: isSelected ? 'var(--ink)' : 'var(--parchment)',
                        color: isSelected ? 'var(--parchment)' : 'var(--ink)',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1rem',
                      }}
                      onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = 'var(--ink-faint)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                      onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'translateY(0)'; } }}
                    >
                      <div style={{ fontSize: '1.6rem', flexShrink: 0, lineHeight: 1 }}>{opt.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.2rem' }}>{opt.label}</div>
                        <div style={{ fontSize: '0.82rem', opacity: 0.7 }}>{opt.sub}</div>
                      </div>
                      {isSelected && <Check size={16} style={{ flexShrink: 0, marginTop: 4 }} />}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {step > 1 ? (
                  <button className="btn-ghost" onClick={() => setStep(step - 1)}><ArrowLeft size={14} /> Back</button>
                ) : <div />}
                {selected && (
                  <button className="btn-primary" onClick={() => setStep(step + 1)}>
                    {step === 6 ? 'See my matches' : 'Continue'} <ArrowRight size={14} />
                  </button>
                )}
              </div>

              <style>{`@media (max-width: 600px) { .wizard-options { grid-template-columns: 1fr !important; } }`}</style>
            </div>
          );
        })()}

        {/* RESULTS */}
        {step === 7 && (
          <div style={{ padding: '2.5rem' }} className="fade-up">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--terracotta)', color: 'var(--parchment)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Sparkles size={28} />
              </div>
              <div style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 600, marginBottom: '0.6rem' }}>Your matches</div>
              <h2 className="display" style={{ fontSize: '2rem', margin: 0, marginBottom: '0.5rem', lineHeight: 1.1 }}>
                {matches.length === 0 ? 'No matches yet' : 'Top 3 properties for you'}
              </h2>
              <p style={{ color: 'var(--ink-soft)', fontSize: '0.92rem' }}>
                Ranked by how well each fits your goals, region, budget, and risk preference.
              </p>
            </div>

            {matches.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p style={{ color: 'var(--ink-soft)', marginBottom: '1.5rem' }}>No live offerings match all your filters right now. Try widening your preferences.</p>
                <button className="btn-secondary" onClick={() => setStep(1)}>Adjust answers</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {matches.map((m, idx) => (
                  <div key={m.property.id} className="card card-hover" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', cursor: 'pointer' }} onClick={() => { onClose(); onNavigate('property', m.property.id); }}>
                    <div style={{ position: 'relative', width: 96, height: 96, borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <SmartImage src={pUrl(m.property.photos[0])} fallbackName={m.property.name} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: 4, left: 4, background: 'var(--ink)', color: 'var(--parchment)', borderRadius: '999px', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{idx + 1}</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.3rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div className="display" style={{ fontSize: '1.2rem' }}>{m.property.name}</div>
                        <Pill variant="live">{Math.min(99, Math.round((m.score / 130) * 100))}% match</Pill>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', marginBottom: '0.6rem' }}>{m.property.neighborhood}, {m.property.city} · <span className="mono">{formatEUR(m.property.price)}</span> · <span style={{ color: 'var(--terracotta)', fontWeight: 600 }}>{formatPct(calcYield(m.property.annualRent, m.property.price))}</span> yield</div>
                      {m.reasons.length > 0 && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                          {m.reasons.slice(0, 2).map((r, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <Check size={11} color="var(--terracotta)" /> {r}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <ChevronRight size={18} color="var(--ink-soft)" style={{ flexShrink: 0 }} />
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-secondary" onClick={() => setStep(1)}>Retake quiz</button>
              <button className="btn-primary" onClick={() => { onClose(); onNavigate('marketplace'); }}>See full marketplace <ArrowRight size={14} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [view, setView] = useState('home');
  const [currentPropertyId, setCurrentPropertyId] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [showWizard, setShowWizard] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load persisted data
  useEffect(() => {
    (async () => {
      try {
        const ll = await window.storage.get('vatra:listings').catch(() => null);
        if (ll && ll.value) setUserListings(JSON.parse(ll.value));
      } catch (e) {}
      try {
        const hh = await window.storage.get('vatra:holdings').catch(() => null);
        if (hh && hh.value) setHoldings(JSON.parse(hh.value));
      } catch (e) {}
      try {
        const ff = await window.storage.get('vatra:favorites').catch(() => null);
        if (ff && ff.value) setFavorites(JSON.parse(ff.value));
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.storage?.set('vatra:listings', JSON.stringify(userListings)).catch(() => {});
  }, [userListings, loaded]);

  useEffect(() => {
    if (!loaded) return;
    window.storage?.set('vatra:holdings', JSON.stringify(holdings)).catch(() => {});
  }, [holdings, loaded]);

  useEffect(() => {
    if (!loaded) return;
    window.storage?.set('vatra:favorites', JSON.stringify(favorites)).catch(() => {});
  }, [favorites, loaded]);

  const allProperties = useMemo(() => [...userListings, ...DEMO_PROPERTIES], [userListings]);

  const navigate = (newView, propertyId = null) => {
    setView(newView);
    if (propertyId) setCurrentPropertyId(propertyId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToast = (toast) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, ...toast }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };
  const dismissToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const handleListSubmit = (newProperty) => {
    setUserListings(prev => [newProperty, ...prev]);
    addToast({ icon: CheckCircle2, color: 'var(--rose)', title: 'Listing live', message: `${newProperty.name} added to marketplace` });
  };

  const handleInvest = (propertyId, tokens, amount) => {
    const prop = allProperties.find(p => p.id === propertyId);
    const newHolding = {
      id: 'h-' + Date.now().toString(36),
      propertyId, tokens, amount,
      purchaseDate: Date.now() - (1000 * 60 * 60 * 24 * Math.floor(Math.random() * 30 + 5)),
    };
    setHoldings(prev => [newHolding, ...prev]);
    addToast({ icon: CheckCircle2, color: 'var(--rose)', title: 'Investment confirmed', message: `${tokens} tokens of ${prop?.name || 'property'} added to portfolio` });
    navigate('portfolio');
  };

  const handleToggleFavorite = (propertyId) => {
    setFavorites(prev => {
      if (prev.includes(propertyId)) {
        addToast({ icon: Heart, title: 'Removed from favorites' });
        return prev.filter(id => id !== propertyId);
      } else {
        const prop = allProperties.find(p => p.id === propertyId);
        addToast({ icon: Heart, color: 'var(--terracotta)', title: 'Saved to favorites', message: prop?.name });
        return [...prev, propertyId];
      }
    });
  };

  const currentProperty = currentPropertyId ? allProperties.find(p => p.id === currentPropertyId) : null;

  return (
    <div className="vatra-app">
      <style>{STYLES}</style>
      <Nav currentView={view} onNavigate={navigate} holdingsCount={holdings.length} favoritesCount={favorites.length} onOpenWizard={() => setShowWizard(true)} />

      {view === 'home' && <HomePage onNavigate={navigate} properties={allProperties} favorites={favorites} onToggleFavorite={handleToggleFavorite} onOpenWizard={() => setShowWizard(true)} />}
      {view === 'marketplace' && <MarketplacePage onNavigate={navigate} properties={allProperties} favorites={favorites} onToggleFavorite={handleToggleFavorite} onOpenWizard={() => setShowWizard(true)} />}
      {view === 'favorites' && <FavoritesPage properties={allProperties} favorites={favorites} onNavigate={navigate} onToggleFavorite={handleToggleFavorite} />}
      {view === 'property' && <PropertyDetailPage property={currentProperty} allProperties={allProperties} onNavigate={navigate} onInvest={handleInvest} favorites={favorites} onToggleFavorite={handleToggleFavorite} />}
      {view === 'list' && <ListPropertyPage onNavigate={navigate} onSubmit={handleListSubmit} />}
      {view === 'portfolio' && <PortfolioPage holdings={holdings} properties={allProperties} onNavigate={navigate} />}
      {view === 'how-it-works' && <HowItWorksPage onNavigate={navigate} />}

      <Footer onNavigate={navigate} />
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
      {showWizard && <PropertyWizard properties={allProperties} onClose={() => setShowWizard(false)} onNavigate={navigate} />}
    </div>
  );
}
