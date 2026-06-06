import { Event } from '../types';

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'evt-1',
    title: 'Neon Pulsar: Summer Music Festival',
    description: 'Experience an unparalleled electronic audio-visual odyssey featuring elite worldwide synthesis artists and dynamic laser display elements.',
    longDescription: 'Immerse yourself in Neon Pulsar, the ultimate high-tempo summer celebration of synthesizer soundwaves and vibrant artistic community. Set outdoors in the stunning lakeside meadow at Echo Bay, the event features a multi-tiered holographic light setup, premium acoustic audio arrays, and craft organic street food stalls. Tickets include custom LED wristbands synchronized to the primary performance clock.',
    category: 'Concerts',
    date: '2026-06-18',
    time: '18:00',
    location: 'Echo Bay Lakeside Sands',
    venueName: 'Echo Bay Sand Amphitheatre',
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop',
    price: 85,
    capacity: 2500,
    ticketsSold: 1840,
    featured: true,
    organizer: {
      name: 'Vivid Rhythm Production Group',
      email: 'organize@vividpulsar.io',
      phone: '+1 (555) 723-9021',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
    },
    schedule: [
      { time: '18:00', activity: 'Gates & Registration open, Ambient Sunset Set' },
      { time: '19:30', activity: 'Echo Pulse - Supporting Synthesizer Act' },
      { time: '21:00', activity: 'Neon Pulsar Main Hologram Laser Symphony' },
      { time: '23:30', activity: 'After-hours Acoustic Fire Ceremony' }
    ]
  },
  {
    id: 'evt-2',
    title: 'Cognitive Web 2026: AI & UI Summit',
    description: 'Explore the shifting horizons of user interface engineering within the era of large-scale agentic intelligence models.',
    longDescription: 'The Cognitive Web Summit brings together global authorities in web architecture, accessibility, natural systems design, and agentic integrations. Discover clean layout standards, ergonomic styling systems, and how to harness LLM agents to deliver robust personal browser flows without overloading client performance boundaries.',
    category: 'Seminars',
    date: '2026-06-25',
    time: '09:00',
    location: 'Metropolitan Tech Center, Hall D',
    venueName: 'Metro Innovation Plaza',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
    price: 150,
    capacity: 450,
    ticketsSold: 320,
    featured: true,
    organizer: {
      name: 'Advanced Interface Association',
      email: 'summit@cognitiveweb.org',
      phone: '+1 (555) 833-2211',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
    },
    schedule: [
      { time: '09:00', activity: 'Registration & Continental Organic Brew Bar' },
      { time: '10:00', activity: 'Keynote Address: Interfaces That Think' },
      { time: '11:45', activity: 'Panel Debate: CSS Variables vs Runtime Frameworks' },
      { time: '13:00', activity: 'Catered Networking Banquet' },
      { time: '14:30', activity: 'Interactive Sandbox: Rapid Build Showcases' }
    ]
  },
  {
    id: 'evt-4',
    title: 'Cascade Forest Solstice Yoga Festival',
    description: 'Recenter your core posture amid giant redwood groves with rhythmic breathing loops, ambient flutes, and organic teas.',
    longDescription: 'As the summer approaches, join hundreds of practitioners in the heart of Cascade Valley. This wellness gather centers outdoor Vinyasa flow, natural hot spring excursions, sound bathing, and a farm-to-table organic luncheon. Enjoy the ambient forest acoustics under towering cedar canopies.',
    category: 'Festivals',
    date: '2026-06-20',
    time: '07:30',
    location: 'Cascade Redwood Sanctuary',
    venueName: 'The Redwood Forest Amphitheatre',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    price: 60,
    capacity: 500,
    ticketsSold: 412,
    featured: true,
    organizer: {
      name: 'Cascade Mind & Valley Sanctuary',
      email: 'recenter@cascademind.com',
      phone: '+1 (555) 993-3882'
    },
    schedule: [
      { time: '07:30', activity: 'Solstice Sunrise Meditation & Deep Breathing Loop' },
      { time: '08:30', activity: 'Ascending Vinyasa Flow (All Skill Levels)' },
      { time: '11:00', activity: 'Sound Bath & Ancient Cedar Forest Walk' },
      { time: '12:30', activity: 'Organic Farm-to-Table Solstice Luncheon' },
      { time: '14:30', activity: 'Anatomical Balance Forum & Tea Tasting Lounge' }
    ]
  },
  {
    id: 'evt-5',
    title: 'The Brutalist Angle: Architectural Photography',
    description: 'An elegant gallery gathering examining the stark geometries and visual poetry of concrete architectural grids.',
    longDescription: 'Curated by master fine-art archivist Thomas Mercer, this gallery exhibition displays seventy large-format monochrome prints capturing mid-century raw concrete monuments. Enjoy customized soundscapes, wine select pairings, and a short, insightful lecture by the curator addressing shadows, spatial volume, and contrast.',
    category: 'Exhibitions',
    date: '2026-07-04',
    time: '19:00',
    location: 'Plinth Fine Art Space',
    venueName: 'Plinth Main Hall & North Terrace',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    price: 0,
    capacity: 200,
    ticketsSold: 125,
    featured: false,
    organizer: {
      name: 'Plinth ArchArts Foundation',
      email: 'curator@plinthart.org',
      phone: '+1 (555) 441-2993'
    },
    schedule: [
      { time: '19:00', activity: 'Doors Open, Champagne Reception & Ambient Piano Performance' },
      { time: '19:45', activity: 'Opening Remarks from Curator Thomas Mercer' },
      { time: '20:30', activity: 'Interactive Vault Print Examination' },
      { time: '22:00', activity: 'Closing Reception & Artist Discussion Circle' }
    ]
  },
  {
    id: 'evt-6',
    title: 'Metropolis Indie Rock Jam',
    description: 'The premier alt-rock convergence of the season. Catch three independent regional bands with energetic stage presence.',
    longDescription: 'Gather inside the underground Brickworks Warehouse for an evening of warm guitar overdrive, punchy acoustic bass, and raw vocals. Metropolis Indie Rock Jam celebrates regional musical resilience. Beverages by independent local brewers and visual merchandise by local screenprint artisans will be available.',
    category: 'Concerts',
    date: '2026-07-15',
    time: '20:00',
    location: 'Brickworks Warehouse Area',
    venueName: 'The Brickworks Stage',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    price: 25,
    capacity: 350,
    ticketsSold: 310,
    featured: false,
    organizer: {
      name: 'Brickworks Live Music Collective',
      email: 'shows@brickrock.co',
      phone: '+1 (555) 881-2290'
    },
    schedule: [
      { time: '20:00', activity: 'Doors & Brew Taproom Active' },
      { time: '20:30', activity: 'Set 1: Glass Horizon (Dream Pop)' },
      { time: '21:30', activity: 'Set 2: The Concrete Geometries (Indie Rock)' },
      { time: '22:45', activity: 'Set 3: Solar Decibel (Noisepop / Alt Rock)' }
    ]
  },
  {
    id: 'evt-7',
    title: 'Future Culinary Forms: Molecular Tasting',
    description: 'Deconstruct flavor models. A rare technical session on spherification, gelation, and innovative culinary textures.',
    longDescription: 'Step inside the state-of-the-art culinary kitchen at Apex Institute. Under the expert tutelage of Chef Elena Santos, learn the precise temperature thresholds and ratio math underlying modernist gastronomy. Prepare a four-course degustation of your own design utilizing calcium bath reactions and frozen foams.',
    category: 'Workshops',
    date: '2026-07-22',
    time: '14:00',
    location: 'Apex Gastronomy Science Lab',
    venueName: 'Apex Demonstration Kitchen A',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
    price: 110,
    capacity: 15,
    ticketsSold: 12,
    featured: false,
    organizer: {
      name: 'Apex Modern Cooking Society',
      email: 'santos@apexculinary.com',
      phone: '+1 (555) 303-9110'
    },
    schedule: [
      { time: '14:00', activity: 'Safety Induction & Modernist Ingredient Overview' },
      { time: '14:30', activity: 'Technical Lab: Spherification & Foam Dynamics' },
      { time: '15:45', activity: 'Live Cooking: Main Hydrocolloid Plates' },
      { time: '17:00', activity: 'Plating Presentation & Expert Tasting Evaluation' }
    ]
  },
  {
    id: 'evt-8',
    title: 'Cyberpunk Symphony: Retro Synthwave Night',
    description: 'A neon-drenched retro-futuristic audio-visual spectacular celebrating 80s synthesizers and heavy retro beats.',
    longDescription: 'Prepare to enter the Grid. Featuring custom laser setups, retro arcades on freeplay, and three live retro synth artists who will synthesize heavy basslines and soaring melodies directly on vintage analog hardware. It is a full immersive journey into neon city vibes with specialized retro cocktail pairings.',
    category: 'Concerts',
    date: '2026-06-30',
    time: '21:00',
    location: 'The Grid Underpass Area',
    venueName: 'Neon Sledge Underground Club',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    price: 35,
    capacity: 650,
    ticketsSold: 420,
    featured: true,
    organizer: {
      name: 'Retro Futura Agency',
      email: 'synth@retrofutura.net',
      phone: '+1 (555) 901-2281',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
    },
    schedule: [
      { time: '21:00', activity: 'System Login: Retro Arcade Freeplay & Synth Sunset Beats' },
      { time: '22:00', activity: 'Set 1: CyberViper live vintage hardware show' },
      { time: '23:15', activity: 'Set 2: Neon Megabreaker - Lasers and modular live set' },
      { time: '01:00', activity: 'Night Outrun Protocol: High-tempo synthwave afterparty' }
    ]
  },
  {
    id: 'evt-9',
    title: 'Astro-Quantum Observatory Meet',
    description: 'Peer into deep space while expert quantum astrophysicists outline cosmic string research and neural network star tracing.',
    longDescription: 'Join an elite intellectual gathering under star-abundant skies. Guided by leading astrophysicists from the Orion Observatory, you will gain hands-on access to heavy deep-space optical lenses, dynamic cosmic mapping projections, and listen to a conversational, jargon-free seminar about the fabric of space-time and high-energy particle rays.',
    category: 'Seminars',
    date: '2026-07-10',
    time: '20:30',
    location: 'Mount Crest Astronomical Observatory',
    venueName: 'Crest Summit Zenith Laboratory',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    price: 75,
    capacity: 120,
    ticketsSold: 88,
    featured: false,
    organizer: {
      name: 'Cosmological Research Alliance',
      email: 'stars@quantumcosmo.edu',
      phone: '+1 (555) 787-1940'
    },
    schedule: [
      { time: '20:30', activity: 'Check-in, Hot Cocoa & Warm Jackets Distribution' },
      { time: '21:00', activity: 'Lecture: Neural Astro-Telescope Architectures' },
      { time: '22:15', activity: 'Live Star Gaze: Direct lens tracking of the Orion Nebula' },
      { time: '23:30', activity: 'Atmospheric tea & open astronomer roundtable' }
    ]
  },
  {
    id: 'evt-10',
    title: 'Neon Spray & Street Mural Masterclass',
    description: 'Learn urban spray-painting and dynamic color blocking under neon glowing ultraviolet blacklights.',
    longDescription: 'Deconstruct paint layers in a massive, darkened chemical studio. Under the direct leadership of street artist Void, learn safe hand-angling techniques, clean line cutting, and custom color-reversing with special ultra-bright fluorescent paints that come alive under dark-space blacklighting. Take home your custom wood panel canvas.',
    category: 'Workshops',
    date: '2026-06-19',
    time: '18:00',
    location: 'Vandal Arts Warehouse Studio',
    venueName: 'Warehouse Blacklight Spray Zone',
    imageUrl: 'https://images.unsplash.com/photo-1561055657-b9e0bf0fa360?q=80&w=800&auto=format&fit=crop',
    price: 50,
    capacity: 30,
    ticketsSold: 28,
    featured: false,
    organizer: {
      name: 'Vandal Arts Studio Co-Op',
      email: 'void@vandalarts.org',
      phone: '+1 (555) 232-1112'
    },
    schedule: [
      { time: '18:00', activity: 'Introductory design sketching & respirator fitting' },
      { time: '18:30', activity: 'Technique tutorial: Line fading, oversprays, and drips' },
      { time: '19:15', activity: 'Ultraviolet lights active: Canvas painting workshop' },
      { time: '21:00', activity: 'Gallery walkthrough & dynamic spray curing ceremony' }
    ]
  },
  {
    id: 'evt-11',
    title: 'Infinite Dream: Immersive Light Exhibition',
    description: 'A spectacular journey through virtual mirror mazes, interactive infinite LED tunnels, and cosmic dust clouds.',
    longDescription: 'Immerse yourself inside Infinite Dream, a massive modern art installation mapping light waves, custom localized pressure-sensitive floor sensors, and surround organic noise loops. Moving through six different light chambers, the exhibit changes color and wave frequency based on participant locations and speeds.',
    category: 'Exhibitions',
    date: '2026-07-02',
    time: '10:00',
    location: 'The Modern Prism Gallery',
    venueName: 'Prism Omnispace Gallery Hall B',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop',
    price: 30,
    capacity: 600,
    ticketsSold: 390,
    featured: true,
    organizer: {
      name: 'Prism Creative Tech Lab',
      email: 'exhibit@prismmodern.com',
      phone: '+1 (555) 438-1290'
    },
    schedule: [
      { time: '10:00', activity: 'Morning Group Entrance A' },
      { time: '12:30', activity: 'Mid-day Interactive Floor Calibration Session' },
      { time: '15:00', activity: 'Special curator talk: Physics of Chromatic Mirrors' },
      { time: '18:00', activity: 'Lounge Sunset Visualizer & Synth Ambient Hour' }
    ]
  },
  {
    id: 'evt-12',
    title: 'Solaris Cyber-Sec & Hacking Arena',
    description: 'An intensive technical summit covering digital cryptography, secure sandbox nodes, and threat vectors.',
    longDescription: 'Connect with security research groups and systems engineers. Participate in rapid capture-the-flag (CTF) nodes, listen to live breakdowns of deep exploits, and understand the secure container architectures keeping global cloud backends isolated from injection bugs. Free mechanical keyboards shown.',
    category: 'Seminars',
    date: '2026-07-28',
    time: '13:00',
    location: 'Cyber Citadel Tech Labs',
    venueName: 'The Datacenter Penthouse Conference Room',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    price: 120,
    capacity: 300,
    ticketsSold: 185,
    featured: false,
    organizer: {
      name: 'Solaris Hackers Union',
      email: 'root@solarishack.org',
      phone: '+1 (555) 321-0012'
    },
    schedule: [
      { time: '13:00', activity: 'Secure Token Issuance & LAN setup' },
      { time: '14:00', activity: 'Workshop: Decompiling Binary Packages in real-time' },
      { time: '16:00', activity: 'Live CTF Phase 1: Overthrowing the Sandboxed Node' },
      { time: '18:00', activity: 'Banquet & Cryptographic Key Prize Distribution' }
    ]
  },
  {
    id: 'evt-13',
    title: 'Zen Tea & Sensory Tea Ceremony',
    description: 'An organic culinary immersion training your sensory reaction to premium high-altitude aged oolongs.',
    longDescription: 'Re-establish structural mindfulness through premium high-mountain aged teas. Accompanied by subtle acoustic stone bells, you will discover the precise heat chemistry behind gaiwan steeping, learn water-pouring heights to preserve delicate floral notes, and experience structured sensory tasting loops of five ancient cultivars.',
    category: 'Workshops',
    date: '2026-06-22',
    time: '15:30',
    location: 'The Moss Garden Greenhouse',
    venueName: 'Moss Garden Zen Teahouse',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop',
    price: 40,
    capacity: 20,
    ticketsSold: 12,
    featured: false,
    organizer: {
      name: 'Zen Tea Mindful Group',
      email: 'tea@zenmosshealth.org',
      phone: '+1 (555) 762-5591'
    },
    schedule: [
      { time: '15:30', activity: 'Scent profiling & direct leaf aroma inspection' },
      { time: '16:00', activity: 'The First Stepping: Infusing traditional leaves' },
      { time: '16:45', activity: 'Savor Ceremony: Taste and character journaling' },
      { time: '18:00', activity: 'Closing silent walking meditation in the greenhouse' }
    ]
  },
  {
    id: 'evt-14',
    title: 'Velocity Formula: Electric Racing Hub',
    description: 'A sleek, outdoor festival highlighting cutting-edge electric performance vehicles and simulation speedways.',
    longDescription: 'Explore the fast, sustainable frontier of speed. Get inside clean high-output electric vehicle cockpits, race on heavy real-time movement simulator pods, and learn about the advancements in dense solid-state battery cells that power the hypercars of tomorrow. Includes outdoor gourmet food trucks and heavy beats by local sound artists.',
    category: 'Festivals',
    date: '2026-07-18',
    time: '11:00',
    location: 'Metropolis Marina Speedway',
    venueName: 'Speedway Expo Lawn & Hangar 4',
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop',
    price: 45,
    capacity: 1200,
    ticketsSold: 670,
    featured: true,
    organizer: {
      name: 'Velocity EV Racing Corp',
      email: 'race@velocityev.com',
      phone: '+1 (555) 434-9901'
    },
    schedule: [
      { time: '11:00', activity: 'Expo Grounds Open, Simulators Active' },
      { time: '13:00', activity: 'Exhibition: High-power battery discharge and torque tests' },
      { time: '15:00', activity: 'Grand Prix Virtual Simulation Tournament' },
      { time: '18:00', activity: 'Velocity Sunset Beats Mixer with Live Synthesizer performance' }
    ]
  },
  {
    id: 'evt-15',
    title: 'Chronos Vinyl Pop-Up: Vintage Beats',
    description: 'A premium historical gathering showcasing thousands of rare jazz, soul, and custom cosmic record cylinders.',
    longDescription: 'Uncover musical antiquities. Chronos Vinyl brings together rare record dealers from around the hemisphere. Listen to high-end vintage tube-amplifiers, trade rare pressings, and experience live record-pressing demonstrations where you can see chemical vinyl cut in real-time under bright neon studio arrays.',
    category: 'Exhibitions',
    date: '2026-06-28',
    time: '12:00',
    location: 'The Archival Vault',
    venueName: 'Chronos Music Lounge Hub',
    imageUrl: 'https://images.unsplash.com/photo-1484755560693-a4074577af3a?q=80&w=800&auto=format&fit=crop',
    price: 15,
    capacity: 400,
    ticketsSold: 280,
    featured: false,
    organizer: {
      name: 'Chronos Audio Archivists',
      email: 'records@chronosvault.net',
      phone: '+1 (555) 222-9010'
    },
    schedule: [
      { time: '12:00', activity: 'Doors Open, Collector Trade Vault Active' },
      { time: '14:00', activity: 'Demonstration: The Science of Vinyl Lathe Cutting' },
      { time: '16:00', activity: 'Deep listening session: Classic jazz masters tape transfer' },
      { time: '19:00', activity: 'Acoustic evening jam and local craft beverage social' }
    ]
  },
  {
    id: 'evt-16',
    title: 'Cosmic Jazz & Stardust Cabaret',
    description: 'An ultra-cool, candle-lit evening of futuristic jazz grooves, ambient brass, and dark vintage vocals.',
    longDescription: 'Enter the stellar shadows. Set inside a sunken amphitheatre beneath glowing cosmic glass star maps, Cosmic Jazz joins classic 1960s bebop rhythms with rich contemporary sound design. Accompanied by customized stellar projections, guests can enjoy a high-end curated culinary menu and artisan cocktails.',
    category: 'Concerts',
    date: '2026-07-20',
    time: '19:30',
    location: 'The Stardust Atrium',
    venueName: 'Atrium Sunken Lounge Stage',
    imageUrl: 'https://images.unsplash.com/photo-1486591978090-58e619d37fe7?q=80&w=800&auto=format&fit=crop',
    price: 65,
    capacity: 180,
    ticketsSold: 140,
    featured: true,
    organizer: {
      name: 'Stardust Jazz Collective',
      email: 'booking@stardustcabaret.com',
      phone: '+1 (555) 880-1123'
    },
    schedule: [
      { time: '19:30', activity: 'Doors Open, Candlelit lounge dining starts' },
      { time: '20:30', activity: 'Part I: Stardust Quartet (Acoustic bebop and brass)' },
      { time: '22:00', activity: 'Part II: Cosmic Syncopation (Synth-infused electro-jazz)' },
      { time: '23:30', activity: 'Late-night chillout cosmic lounge beats' }
    ]
  },
  {
    id: 'evt-17',
    title: 'Infinite Canvas: AI Generative Art Show',
    description: 'A glowing interactive playground of neural network canvases, real-time voice-to-color tunnels, and digital sculptures.',
    longDescription: 'Celebrate the creative singularity. The Generative Art Show maps deep-diffusion model vectors to hyper-precise wall projectors. Interact directly with cameras that translate your body temperature and hand postures into massive flowing fractal gardens, listen to algorithm-generated synths, and collect unique physical prints of real-time generated designs.',
    category: 'Exhibitions',
    date: '2026-06-29',
    time: '11:00',
    location: 'Omni Cyber Gallery',
    venueName: 'Gallery Hall Theta',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    price: 20,
    capacity: 500,
    ticketsSold: 320,
    featured: false,
    organizer: {
      name: 'Digital Singularity Corp',
      email: 'canvas@singularityart.io',
      phone: '+1 (555) 777-2030'
    },
    schedule: [
      { time: '11:00', activity: 'Doors open, neural art playgrounds active' },
      { time: '13:00', activity: 'Interactive session: Creating custom vectors' },
      { time: '15:30', activity: 'Live battle: Prompters vs Algorithmic Engines' },
      { time: '18:00', activity: 'Sunset glowing ambient art reception' }
    ]
  },
  {
    id: 'evt-18',
    title: 'Acoustic Firelight: Forest Solstice Unplugged',
    description: 'Settle under towering redwood starlights for raw, acoustic folk strings and live fireside storytelling.',
    longDescription: 'Re-harmonize in the quiet of nature. Acoustic Firelight presents an intimate gathering featuring internationally renowned folk musicians, cello duets, and classical guitar players in an unplugged format. Nestled in a secret clearing under the giant valley wood trees, enjoy organic spiced cider, handmade timber bench seating, and the warmth of a massive controlled center bonfire.',
    category: 'Concerts',
    date: '2026-07-25',
    time: '19:00',
    location: 'Deep Timber Clearing B, Cascade Forest',
    venueName: 'The Secret Grove Circle',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
    price: 35,
    capacity: 150,
    ticketsSold: 98,
    featured: true,
    organizer: {
      name: 'Forest Resonance Group',
      email: 'firelight@cascademuse.net',
      phone: '+1 (555) 345-0019'
    },
    schedule: [
      { time: '19:00', activity: 'Fireside gathering, hot spiced organic cider reception' },
      { time: '19:30', activity: 'Set I: Whispering Cedar - Live cello acoustics' },
      { time: '21:00', activity: 'Set II: Moonlit Hearth - Folk songwriter unplugged set' },
      { time: '22:30', activity: 'Fireside acoustic jam session and local bakery pairings' }
    ]
  },
  {
    id: 'evt-19',
    title: 'The Nebula Crucible: Neon Glassblowing Mastery',
    description: 'Manipulate molten silica and learn to shape glowing, gas-infused neon art structures with master glassblowers.',
    longDescription: 'Feel the heat of the forge. In this intense sensory masterclass, you will work side-by-side with professional glass sculptors at the Forge Collective. Learn high-temperature pipe gathers, rotational centering, and safety protocols. Once our glass structures are cooled, discover how to vacuum-pump gas molecules (Neon, Argon, Helium) to create your own signature glowing neon glass sign to keep.',
    category: 'Workshops',
    date: '2026-06-29',
    time: '10:00',
    location: 'The Forge Artistry Studio',
    venueName: 'Forge Workshop Deck B',
    imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop',
    price: 95,
    capacity: 12,
    ticketsSold: 7,
    featured: false,
    organizer: {
      name: 'The Modern Forge Collective',
      email: 'neon@forgeglass.org',
      phone: '+1 (555) 789-1122'
    },
    schedule: [
      { time: '10:00', activity: 'Safety brief, respirator fitment, heat induction session' },
      { time: '10:30', activity: 'Demonstration of pipe-gathering and rotational blowing' },
      { time: '11:30', activity: 'Personal studio practice: Sculpting active molten shapes' },
      { time: '14:00', activity: 'Neon gas vacuum-pumping and mercury sealing science' },
      { time: '15:30', activity: 'Final electrical tests & glow certification walkthrough' }
    ]
  },
  {
    id: 'evt-20',
    title: 'CosmoVision: Holographic Spatial Art Exhibition',
    description: 'A glowing playground of multi-dimensional volumetric lasers, kinetic mirror portals, and deep stargates.',
    longDescription: 'Walk through cosmic dimensions. CosmoVision brings together internationally renowned media artists in a 10,000 sq ft dark warehouse. Using state-of-the-art volumetric holograms, participants interact with floating light sculptures that ripple and disperse when approached. Set to a custom surround-sound score composed by modern ambient modular synthesists.',
    category: 'Exhibitions',
    date: '2026-08-01',
    time: '12:00',
    location: 'Space Cube Exhibition Warehouse',
    venueName: 'Hangar Hall 7 North',
    imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop',
    price: 25,
    capacity: 400,
    ticketsSold: 180,
    featured: true,
    organizer: {
      name: 'Omni Media Arts Lab',
      email: 'vision@omnimedialabs.co',
      phone: '+1 (555) 234-9988'
    },
    schedule: [
      { time: '12:00', activity: 'Doors Open, Volumetric Hangar Walkthrough Active' },
      { time: '14:30', activity: 'Panel Discussion: The Future of Spatial Light Mechanics' },
      { time: '18:00', activity: 'Sunset projection mapping with custom responsive synths' },
      { time: '21:00', activity: 'Night exploration hours with custom synth cocktails' }
    ]
  },
  {
    id: 'evt-21',
    title: 'Midnight Beats: Synth Techno Warehouse',
    description: 'A stellar night of underground electronic music, featuring vintage modular synthesizers and responsive strobes.',
    longDescription: 'Descend into the deep sonic dark. Midnight Beats gathers some of the hemisphere\'s most acclaimed modular synth explorers for a pounding, atmospheric journey. Set inside an abandoned high-timber warehouse outfitted with a state-of-the-art bass-shaking audio system and lasers synchronized directly to performance clocks.',
    category: 'Concerts',
    date: '2026-07-12',
    time: '22:00',
    location: 'The Ironworks Assembly Hall B',
    venueName: 'Ironworks Arena Floor',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
    price: 30,
    capacity: 600,
    ticketsSold: 340,
    featured: true,
    organizer: {
      name: 'Synthesis Underground',
      email: 'beats@synthunderground.net',
      phone: '+1 (555) 909-3321'
    },
    schedule: [
      { time: '22:00', activity: 'Doors Open & Low Freq Drone Ambient Warmup' },
      { time: '23:30', activity: 'Act I: Monolith (Ambient-industrial live hardware module)' },
      { time: '01:00', activity: 'Act II: Obsidian Cycle (Full modular techno live performance)' },
      { time: '03:00', activity: 'Late Night High-Tempo Acid Synthesis Closure' }
    ]
  },
  {
    id: 'evt-22',
    title: 'Textile Tapestry & Stitching Craft Circle',
    description: 'Learn custom physical stitch arrangements, hand-spindle yarn warping, and organic pigment dyeing patterns.',
    longDescription: 'Re-engage your physical touch. Join dye master Clara Vance in an intimate afternoon of slow hand-crafting. Learn how to extract rich indigo shades from local leaves, warp looms with high-durability combed flax, and hand-weave complex geometrical patterns. Everyone leaves with a completed wool wall tapestry.',
    category: 'Workshops',
    date: '2026-06-21',
    time: '14:00',
    location: 'The Moss Greenhouse Studio',
    venueName: 'Loft Studio B',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    price: 45,
    capacity: 15,
    ticketsSold: 9,
    featured: false,
    organizer: {
      name: 'The Fiber Guild Society',
      email: 'tapestry@heartharts.com',
      phone: '+1 (555) 124-8844'
    },
    schedule: [
      { time: '14:00', activity: 'Yarn selections and structural template design' },
      { time: '14:30', activity: 'Indigo vat preparation and dye chemistry' },
      { time: '15:30', activity: 'Loom setup and direct geometric weaving practice' },
      { time: '17:30', activity: 'Finishing edges & showcase gathering' }
    ]
  },
  {
    id: 'evt-23',
    title: 'Blockchain Evolution & Cryptominds 2026',
    description: 'Deconstruct zero-knowledge cryptography protocols and learn the core mathematics behind decentralized ledgers.',
    longDescription: 'A quiet, high-intellect workshop looking beneath the surface of token structures. We dismiss speculation to examine the underlying cryptography, peer-to-peer network packet structures, and zero-knowledge proof equations that enable secure validation schemes without compromising metadata privacy bounds.',
    category: 'Seminars',
    date: '2026-07-06',
    time: '10:00',
    location: 'Metropolitan Tech Center, Hall G',
    venueName: 'Hall G Stage Left',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop',
    price: 110,
    capacity: 150,
    ticketsSold: 85,
    featured: false,
    organizer: {
      name: 'Cryptographic Alliance Group',
      email: 'ledger@cognitiveweb.org',
      phone: '+1 (555) 833-2211'
    },
    schedule: [
      { time: '10:00', activity: 'Symmetric Cryptography and Elliptic Curves warm-up' },
      { time: '11:00', activity: 'Deep Dive: Zero Knowledge Proof Mechanics' },
      { time: '12:30', activity: 'Decentralized consensus performance and overhead limits' },
      { time: '14:00', activity: 'Sandbox validation practice and custom node deployment' }
    ]
  },
  {
    id: 'evt-24',
    title: 'Luminous Sculptures & Spatial Flame Art',
    description: 'Walk through striking interactive firescapes, electronic flame grids, and responsive plasma domes.',
    longDescription: 'Witness the union of electricity and heat. Located in the massive open-air brick yard of Hall 7, this exhibition gathers kinetic flame sculptors from around the globe. Walk among computer-controlled propane manifolds that output warm soundwaves and flame rings synced to ambient synthesizers.',
    category: 'Exhibitions',
    date: '2026-08-15',
    time: '19:00',
    location: 'Space Cube Open Brick Yard',
    venueName: 'The North Brick Plaza',
    imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop',
    price: 30,
    capacity: 500,
    ticketsSold: 215,
    featured: true,
    organizer: {
      name: 'Omni Media Arts Lab',
      email: 'vision@omnimedialabs.co',
      phone: '+1 (555) 234-9988'
    },
    schedule: [
      { time: '19:00', activity: 'Exhibition gates open, thermal safety overview' },
      { time: '20:00', activity: 'Interactive Plasma Dome performance cycle' },
      { time: '21:30', activity: 'The Fire Grid Composer: Synth-synced Flame Showcase' },
      { time: '23:30', activity: 'Night exploration and wood-fire pizza networking' }
    ]
  }
];
