export interface SpiritualPlace {
  id: string;
  name: string;
  nameTa: string;
  state: string;
  district: string;
  category:
    | 'Tamil Nadu Spiritual Heritage'
    | 'Indian Temples'
    | 'Ashrams'
    | 'Meditation Centres'
    | 'Philosophical Learning Centres'
    | 'Historical Spiritual Places';
  coordinates: { lat: number; lng: number };
  image: string;
  historicalBackground: string;
  spiritualSignificance: string;
  visitingInfo: string;
  nearbyPlaces: string[];
  relatedTopics: string[];
}

export const SPIRITUAL_PLACES: SpiritualPlace[] = [
  {
    id: 'place-tiruvannamalai',
    name: 'Arunachala & Tiruvannamalai Heritage Sanctuary',
    nameTa: 'திருவண்ணாமலை அருணாசலம்',
    state: 'Tamil Nadu',
    district: 'Tiruvannamalai',
    category: 'Tamil Nadu Spiritual Heritage',
    coordinates: { lat: 12.2319, lng: 79.0677 },
    image: '/src/assets/images/hero_temple_sunrise_1795423242919.jpg',
    historicalBackground:
      'Historically attested in Sangam-era inscriptions, Chola stone grants, and medieval temple records spanning over a millennium around the Annamalaiyar Temple complex.',
    spiritualSignificance:
      'Traditional Shaiva and Advaita heritage regards Arunachala Hill as symbolic of the pillar of boundless light (Jyotirlinga) and silent Self-inquiry ("Who am I?"), associated with Saint Arunagirinathar and Sri Ramana Maharshi.',
    visitingInfo:
      'Verified public hours: Annamalaiyar Temple typically opens early morning (~5:30 AM–12:30 PM, 3:30 PM–9:30 PM); Girivalam path is open year-round. Modest attire and silent respect inside meditation halls are advised.',
    nearbyPlaces: ['Sri Ramanasramam', 'Virupaksha Cave', 'Skandasramam'],
    relatedTopics: ['Atma Jnana', 'Tamil Spiritual Literature'],
  },
  {
    id: 'place-kanchipuram',
    name: 'Kanchipuram — City of Philosophical Learning',
    nameTa: 'காஞ்சிபுரம் — தத்துவக் கல்வி நகரம்',
    state: 'Tamil Nadu',
    district: 'Kanchipuram',
    category: 'Philosophical Learning Centres',
    coordinates: { lat: 12.8342, lng: 79.7036 },
    image: '/src/assets/images/heritage_temple_corridor_1795423245583.jpg',
    historicalBackground:
      'Recorded in Pallava and Chola inscriptions as a major Ghatika (ancient university) of Sanskrit and Tamil scholarship from the 4th century CE onward.',
    spiritualSignificance:
      'Celebrated in tradition as a center of Advaita, Vishishtadvaita, and Shaiva-Shakta learning, preserving manuscript libraries and classical temple architecture.',
    visitingInfo:
      'Located ~75 km southwest of Chennai. Major shrines (Ekambareswarar, Kailasanathar, Varadaraja Perumal) are open morning and evening.',
    nearbyPlaces: ['Kailasanathar Temple', 'Kamakshi Amman Temple', 'Sri Kanchi Kamakoti Peetham'],
    relatedTopics: ['Indian Philosophical Traditions', 'Vedanta Primer'],
  },
  {
    id: 'place-madurai',
    name: 'Madurai — Seat of Tamil Sangam & Meenakshi Temple',
    nameTa: 'மதுரை — தமிழ்ச் சங்கம் & மீனாட்சி திருக்கோவில்',
    state: 'Tamil Nadu',
    district: 'Madurai',
    category: 'Tamil Nadu Spiritual Heritage',
    coordinates: { lat: 9.9195, lng: 78.1193 },
    image: '/src/assets/images/vedanta_sanctuary_hall_1795423245934.jpg',
    historicalBackground:
      'Ancient Pandyan capital historically celebrated as the seat of the Tamil Sangams; the present monumental gopurams and mandapams date largely to the Nayak period (16th–17th centuries) built over older strata.',
    spiritualSignificance:
      'Traditional accounts link Madurai to the preservation of classical Tamil literature, including the legendary testing and acclaim of Thirukkural.',
    visitingInfo:
      'Accessible by rail, road, and Madurai Airport. Temple inner sanctums follow traditional dress guidelines and camera restrictions inside inner prakarams.',
    nearbyPlaces: ['Thiruparankundram', 'Alagar Koyil', 'Tirumalai Nayakkar Mahal'],
    relatedTopics: ['Thirukkural', 'Tamil Spiritual Literature'],
  },
  {
    id: 'place-thanjavur',
    name: 'Thanjavur Brihadeeswarar & Sarasvati Mahal Archive',
    nameTa: 'தஞ்சாவூர் பெருவுடையார் & சரசுவதி மகால் நூலகம்',
    state: 'Tamil Nadu',
    district: 'Thanjavur',
    category: 'Historical Spiritual Places',
    coordinates: { lat: 10.7828, lng: 79.1318 },
    image: '/src/assets/images/thirukkural_palm_manuscript_1795423243210.jpg',
    historicalBackground:
      'Brihadeeswarar Temple was commissioned by Raja Raja Chola I and consecrated in 1010 CE (UNESCO World Heritage Site). Adjacent Sarasvati Mahal Library preserves tens of thousands of palm-leaf and paper manuscripts.',
    spiritualSignificance:
      'Stands as a living synthesis of Chola stone engineering, sacred geometry, Tevaram musical heritage, and manuscript preservation.',
    visitingInfo:
      'Temple grounds open daily (~6:00 AM–12:30 PM, 4:00 PM–8:30 PM). Sarasvati Mahal Library Museum is open on weekdays and non-holiday Saturdays.',
    nearbyPlaces: ['Sarasvati Mahal Library', 'Gangaikonda Cholapuram', 'Swamimalai'],
    relatedTopics: ['Tamil Spiritual Literature', 'Indian Heritage'],
  },
  {
    id: 'place-sringeri',
    name: 'Sringeri Sharada Peetham',
    nameTa: 'சிருங்கேரி சாரதா பீடம்',
    state: 'Karnataka',
    district: 'Chikkamagaluru',
    category: 'Philosophical Learning Centres',
    coordinates: { lat: 13.4198, lng: 75.2567 },
    image: '/src/assets/images/meditation_sacred_lotus_1795423245192.jpg',
    historicalBackground:
      'Situated along the Tunga River, historically documented from medieval Vijayanagara patronage and revered as the southern Advaita matha established by Adi Shankaracharya.',
    spiritualSignificance:
      'Preserves unbroken Advaita Vedanta study, Vedic chanting schools, and serene riverside contemplation.',
    visitingInfo:
      'Reachable via Mangalore or Shivamogga. Peaceful ashram and Vidyashankara Temple welcome respectful visitors daily.',
    nearbyPlaces: ['Vidyashankara Temple', 'Tunga River Ghat'],
    relatedTopics: ['Upanishads', 'Brahma Sutram'],
  },
  {
    id: 'place-rishikesh',
    name: 'Rishikesh — Himalayan Vedanta & Meditation Valley',
    nameTa: 'ரிஷிகேஷ் — இமயமலை வேதாந்த & தியானத் தலம்',
    state: 'Uttarakhand',
    district: 'Dehradun',
    category: 'Ashrams',
    coordinates: { lat: 30.1158, lng: 78.3168 },
    image: '/src/assets/images/meditation_sacred_lotus_1795423245192.jpg',
    historicalBackground:
      'Long-standing Himalayan monastic corridor along the Ganga River hosting traditional Vedanta gurukulas, study halls, and contemplative retreats.',
    spiritualSignificance:
      'Dedicated to Upanishadic study, Pranayama, silent meditation, and selfless Seva in an alpine river valley.',
    visitingInfo:
      'Year-round access via Dehradun Airport or Haridwar railhead; spring and autumn offer mild weather for extended study.',
    nearbyPlaces: ['Swargashram', 'Vashistha Guha', 'Devprayag'],
    relatedTopics: ['Yoga', 'Meditation'],
  },
];

export interface ArticleItem {
  id: string;
  category:
    | 'Thirukkural'
    | 'Vedanta'
    | 'Bhagavad Gita'
    | 'Upanishads'
    | 'Spiritual Philosophy'
    | 'Meditation'
    | 'Self-Knowledge'
    | 'Indian Heritage';
  title: string;
  titleTa: string;
  author: string;
  readTimeMin: number;
  publishedDate: string;
  featured: boolean;
  image: string;
  excerpt: string;
  excerptTa: string;
  bodyEn: string[];
  bodyTa: string[];
  sourceNote: string;
}

export const ARTICLE_CATEGORIES = [
  'Thirukkural',
  'Vedanta',
  'Bhagavad Gita',
  'Upanishads',
  'Spiritual Philosophy',
  'Meditation',
  'Self-Knowledge',
  'Indian Heritage',
] as const;

export const ARTICLES: ArticleItem[] = [
  {
    id: 'art-kural-vedanta-bridge',
    category: 'Thirukkural',
    title: 'Meipporul & Brahman: Where Thirukkural Meets Vedanta',
    titleTa: 'மெய்ப்பொருளும் பிரம்மமும்: திருக்குறளும் வேதாந்தமும் சந்திக்கும் புள்ளி',
    author: 'Dr. Sundaresan R., Editorial Fellow',
    readTimeMin: 6,
    publishedDate: '2026-10-18',
    featured: true,
    image: '/src/assets/images/thirukkural_palm_manuscript_1795423243210.jpg',
    excerpt: 'How Thiruvalluvar’s call to discern Meipporul mirrors the Upanishadic quest for imperishable truth.',
    excerptTa: 'புறத் தோற்றங்களைக் கடந்து மெய்ப்பொருள் காணும் திருக்குறளின் பார்வை வேதாந்தத்துடன் எவ்வாறு ஒன்றிணைகிறது.',
    bodyEn: [
      'In Kural 355 and Kural 423, Thiruvalluvar repeats an identical second line with deliberate emphasis: "Apporul meipporul kaanbadhu arivu" — true wisdom is discerning the essential Reality within every appearance.',
      'This mirrors the Vedantic inquiry of Viveka: looking past changing names and forms (Nama-Rupa) to recognize the enduring truth (Sat). Rather than separating daily ethics from transcendent insight, both traditions insist that spotless purity of mind (Manathukkan Maasilan, Kural 34) is the doorway to clarity.',
    ],
    bodyTa: [
      'திருக்குறளின் 355 மற்றும் 423 ஆகிய இரு குறள்களிலும் வள்ளுவர் "அப்பொருள் மெய்ப்பொருள் காண்பது அறிவு" என்ற ஒரே ஈற்றடியைப் பதிவு செய்கிறார். எந்தப் பொருளின் புறத் தோற்றத்தைக் கண்டும் மயங்காமல் அதன் உள்ளார்ந்த உண்மையை உணர்வதே மெய்யறிவு.',
      'வேதாந்தம் போதிக்கும் நித்திய-அநித்திய வஸ்து விவேகமும் இதனையே கூறுகிறது. மனமாசற்ற அறவாழ்வு ("மனத்துக்கண் மாசிலன் ஆதல்") இல்லாமல் ஆத்ம ஞானம் நிலைப்பதில்லை என்பதை இரு மரபுகளும் ஒருசேர உணர்த்துகின்றன.',
    ],
    sourceNote: 'References: Thirukkural Kurals 34, 355, 423; Tattva Bodha',
  },
  {
    id: 'art-karma-yoga-modern',
    category: 'Bhagavad Gita',
    title: 'Acting Without Anxiety: Karma Yoga in Daily Work',
    titleTa: 'பதற்றமற்ற செயல்: அன்றாடப் பணியில் கர்ம யோகம்',
    author: 'PURNA YOGAM Study Desk',
    readTimeMin: 5,
    publishedDate: '2026-10-29',
    featured: true,
    image: '/src/assets/images/vedanta_sanctuary_hall_1795423245934.jpg',
    excerpt: 'Applying Gita 2.47 to replace burnout and comparison with focused, joyful stewardship.',
    excerptTa: 'கடமையின் பலனைப் பற்றிய பதற்றத்தை விடுத்து முழு ஈடுபாட்டுடன் செயல்படும் கீதை வழி.',
    bodyEn: [
      'Modern stress rarely arises from hard work alone; it arises from tying our inner worth to outcomes outside our complete control.',
      'Karma Yoga teaches two transformative attitudes: offering every action with integrity (Ishvara Arpana) and receiving every outcome with steadiness and learning (Prasada Buddhi). Excellence remains high, while fear subsides.',
    ],
    bodyTa: [
      'இன்றைய மன அழுத்தம் கடின உழைப்பால் மட்டும் வருவதில்லை; நம் முழுக் கட்டுப்பாட்டில் இல்லாத விளைவுகளோடு நம் அமைதியைப் பிணைப்பதால் வருகிறது.',
      'செயலை அர்ப்பணிப்பு உணர்வுடன் சிறப்பாகச் செய்து, வரும் விளைவுகளைச் சமநிலையோடு ஏற்றுக்கொள்ளும்போது செயலே தியானமாக மாறுகிறது.',
    ],
    sourceNote: 'References: Bhagavad Gita 2.47–2.48',
  },
  {
    id: 'art-witness-awareness',
    category: 'Meditation',
    title: 'Learning to Rest as the Silent Witness',
    titleTa: 'அமைதியான சாட்சியாக நிலைக்கும் தியானக் கலை',
    author: 'Anandavalli K., Contemplative Educator',
    readTimeMin: 4,
    publishedDate: '2026-11-04',
    featured: false,
    image: '/src/assets/images/meditation_sacred_lotus_1795423245192.jpg',
    excerpt: 'Why fighting thoughts creates tension, and how gentle noticing restores clarity.',
    excerptTa: 'எண்ணங்களோடு போராடாமல், அவற்றைக் கவனிக்கும் விழிப்புணர்வில் நிலைப்பது எப்படி?',
    bodyEn: [
      'Many beginners abandon meditation believing they must forcibly empty their minds. Yet the sky does not struggle to push clouds away; it simply remains spacious.',
      'Notice the breath, feel the quiet presence that knows each passing thought, and rest gently without judgment. Over time, stillness becomes natural.',
    ],
    bodyTa: [
      'தியானம் என்பது மனதை வலுக்கட்டாயமாக வெறுமையாக்குவதல்ல. வானம் மேகங்களோடு போராடுவதில்லை; அது இடமளித்து அமைதியாக இருக்கிறது.',
      'மூச்சை இயல்பாகக் கவனித்து, எண்ணங்களைத் தீர்ப்பிடாமல் பார்க்கும்போது மனம் தானாக அமைதி அடைகிறது.',
    ],
    sourceNote: 'Educational mindfulness guide · Non-medical practice',
  },
  {
    id: 'art-palm-leaf-heritage',
    category: 'Indian Heritage',
    title: 'From Palm Leaves to Open Digital Preservation',
    titleTa: 'ஓலைச்சுவடிகளிலிருந்து திறந்த டிஜிட்டல் பாதுகாப்பு வரை',
    author: 'PURNA YOGAM Archive Team',
    readTimeMin: 5,
    publishedDate: '2026-11-12',
    featured: false,
    image: '/src/assets/images/heritage_temple_corridor_1795423245583.jpg',
    excerpt: 'Honoring centuries of Tamil and Sanskrit scribes by making classical wisdom freely accessible.',
    excerptTa: 'பல நூற்றாண்டுகளாக ஓலைச்சுவடிகளில் பாதுகாக்கப்பட்ட ஞானத்தை அனைவருக்கும் இலவசமாக வழங்கும் முயற்சி.',
    bodyEn: [
      'For centuries, Tamil and Sanskrit manuscripts survived tropical humidity because dedicated scholars recopied palm leaves generation after generation as sacred service.',
      'PURNA YOGAM continues that spirit in digital form: transparent attribution, faithful Unicode typography, and free access with zero paywalls.',
    ],
    bodyTa: [
      'பல தலைமுறைகளாகப் புலவர்களும் துறவிகளும் ஓலைச்சுவடிகளை மீண்டும் மீண்டும் எழுதி நம் மரபைப் பாதுகாத்தனர்.',
      'அதே சேவை உணர்வோடு, கட்டணமில்லாமல் அனைவரும் கற்கும் வகையில் திருக்குறளும் வேதாந்தமும் இத்தளத்தில் தொகுக்கப்படுகின்றன.',
    ],
    sourceNote: 'PURNA YOGAM Open Access Charter',
  },
];

export interface PracticeRoutine {
  period: 'morning' | 'afternoon' | 'evening';
  title: string;
  titleTa: string;
  durationMin: number;
  kuralNumber?: number;
  vedantaThought: string;
  vedantaThoughtTa: string;
  steps: string[];
  reflectionPrompt: string;
  reflectionPromptTa: string;
}

export const DAILY_PRACTICES: PracticeRoutine[] = [
  {
    period: 'morning',
    title: 'Morning Awakening & Contemplation',
    titleTa: 'காலை விழிப்பு மற்றும் சிந்தனை',
    durationMin: 10,
    kuralNumber: 34,
    vedantaThought: 'Begin before checking messages: "Today I act with clarity, kindness, and inner steadiness."',
    vedantaThoughtTa: 'இன்று என் சிந்தனையும் சொல்லும் செயலும் தூய்மையுடனும் கருணையுடனும் இருக்கட்டும்.',
    steps: [
      'Read Today’s Thirukkural slowly aloud in Tamil and English.',
      'Contemplate Today’s Vedanta thought for 2 minutes.',
      'Sit in quiet breath awareness for 5 minutes.',
    ],
    reflectionPrompt: 'What single virtue will guide my decisions today?',
    reflectionPromptTa: 'இன்றைய என் செயல்களை வழிநடத்தும் உயர்ந்த அறம் எது?',
  },
  {
    period: 'afternoon',
    title: 'Midday Practical Reset',
    titleTa: 'மதிய நடைமுறைச் சிந்தனை',
    durationMin: 5,
    vedantaThought: 'Pause between tasks (Samatvam): respond deliberately rather than reacting out of haste.',
    vedantaThoughtTa: 'செயல்களுக்கு இடையே ஒரு நிமிடம் நின்று, நிதானத்துடனும் சமநிலையுடனும் செயல்படுவோம்.',
    steps: [
      'Take three slow, unhurried breaths away from screens.',
      'Check speech integrity: are my words truthful and free of harm (Kural 291)?',
      'Complete one short lesson card or activity question.',
    ],
    reflectionPrompt: 'Where can I bring greater patience and clarity this afternoon?',
    reflectionPromptTa: 'இன்று பிற்பகலில் எங்கு கூடுதல் பொறுமையையும் தெளிவையும் காட்டலாம்?',
  },
  {
    period: 'evening',
    title: 'Evening Self-Observation & Gratitude',
    titleTa: 'மாலை சுய ஆய்வு மற்றும் தியானம்',
    durationMin: 12,
    vedantaThought: 'Release the day gently as an offering; forgive yourself and others before rest.',
    vedantaThoughtTa: 'அன்றைய நிகழ்வுகளைச் சாட்சி பாவனையோடு ஏற்று, நன்றியுணர்வுடன் அமைதியில் ஆழ்வோம்.',
    steps: [
      'Practice 8 minutes of silent witness meditation.',
      'Observe moments of reactivity without harsh self-criticism.',
      'Record one gratitude or insight in your Wisdom Journal.',
    ],
    reflectionPrompt: 'What lesson did life quietly teach me today?',
    reflectionPromptTa: 'இன்றைய நாள் எனக்குக் கற்பித்த அமைதியான பாடம் என்ன?',
  },
];

export interface QuizQuestionItem {
  id: string;
  question: string;
  questionTa: string;
  type: 'mcq' | 'tf';
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizSet {
  id: string;
  title: string;
  titleTa: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Scholar';
  questions: QuizQuestionItem[];
}

export const QUIZ_SETS: QuizSet[] = [
  {
    id: 'quiz-thirukkural',
    title: 'Thirukkural: Arathuppaal & Porutpaal Foundations',
    titleTa: 'திருக்குறள்: அறத்துப்பால் மற்றும் பொருட்பால் தேர்வு',
    topic: 'Thirukkural',
    difficulty: 'Beginner',
    questions: [
      {
        id: 'qt-1',
        question: 'How many chapters and Kurals belong to Arathuppaal and Porutpaal combined?',
        questionTa: 'அறத்துப்பால் மற்றும் பொருட்பால் இரண்டிலும் மொத்தம் எத்தனை அதிகாரங்களும் குறள்களும் உள்ளன?',
        type: 'mcq',
        options: ['108 Chapters · 1,080 Kurals', '133 Chapters · 1,330 Kurals', '70 Chapters · 700 Kurals', '38 Chapters · 380 Kurals'],
        correctIndex: 0,
        explanation: 'Arathuppaal (38 chapters, 380 Kurals) + Porutpaal (70 chapters, 700 Kurals) = 108 chapters and 1,080 Kurals.',
      },
      {
        id: 'qt-2',
        question: 'In Kural 34, Thiruvalluvar defines the entirety of virtue as having a spotless mind.',
        questionTa: 'குறள் 34-இன் படி மனத்தில் மாசற்ற தூய்மை கொண்டிருப்பதே முழுமையான அறம் ஆகும்.',
        type: 'tf',
        options: ['True (சரி)', 'False (தவறு)'],
        correctIndex: 0,
        explanation: '"Manathukkan maasilan aadhal anaitharan" — inner purity of mind is the root of all virtue.',
      },
      {
        id: 'qt-3',
        question: 'Which fault is NOT among the four listed in Kural 35 (Azhukkaaru, Avaveguli...)?',
        questionTa: 'குறள் 35-இல் அறத்திற்குப் பகையாகக் கூறப்படாதது எது?',
        type: 'mcq',
        options: ['Envy (அழுக்காறு)', 'Greed (அவா)', 'Anger (வெகுளி)', 'Humility (பணிவு)'],
        correctIndex: 3,
        explanation: 'Kural 35 lists envy, greed, anger, and harsh speech as the four faults to avoid; humility is a virtue.',
      },
    ],
  },
  {
    id: 'quiz-vedanta',
    title: 'Introduction to Vedanta & Witness Consciousness',
    titleTa: 'வேதாந்த அறிமுகம் மற்றும் சாட்சி தத்துவம்',
    topic: 'Vedanta',
    difficulty: 'Beginner',
    questions: [
      {
        id: 'qv-1',
        question: 'What are the three canonical pillars known as Prasthana Traya?',
        questionTa: 'ப்ரஸ்தான த்ரயம் எனப்படும் வேதாந்தத்தின் மூன்று அடிப்படை நூல்கள் எவை?',
        type: 'mcq',
        options: [
          'Upanishads, Bhagavad Gita, Brahma Sutram',
          'Vedas, Puranas, Epics',
          'Nyaya, Sankhya, Yoga',
          'Tevaram, Tiruvasagam, Tiruppugazh',
        ],
        correctIndex: 0,
        explanation: 'Prasthana Traya consists of Upanishads (Shruti), Bhagavad Gita (Smriti), and Brahma Sutras (Nyaya).',
      },
      {
        id: 'qv-2',
        question: 'In Drig Drishya Viveka, thoughts in the mind are the ultimate Seer.',
        questionTa: 'த்ருக் த்ருச்ய விவேகத்தின்படி மனதின் எண்ணங்களே இறுதியான காண்பவன் (Seer) ஆகும்.',
        type: 'tf',
        options: ['True (சரி)', 'False (தவறு)'],
        correctIndex: 1,
        explanation: 'Thoughts are observed objects (Drishya); pure Witness Consciousness (Sakshi) is the Seer (Drig).',
      },
    ],
  },
  {
    id: 'quiz-gita',
    title: 'Bhagavad Gita: Karma Yoga & Equanimity',
    titleTa: 'பகவத்கீதை: கர்ம யோகம் மற்றும் சமநிலை',
    topic: 'Bhagavad Gita',
    difficulty: 'Intermediate',
    questions: [
      {
        id: 'qg-1',
        question: 'Which Sanskrit phrase from Gita 2.48 translates to "Evenness of mind is Yoga"?',
        questionTa: 'கீதை 2.48-இல் "மனச்சமநிலையே யோகம்" என்பதைக் குறிக்கும் சொற்றொடர் எது?',
        type: 'mcq',
        options: ['Samatvam Yoga Uchyate', 'Aham Brahmasmi', 'Ishavasyam Idam Sarvam', 'Athato Brahma Jijnasa'],
        correctIndex: 0,
        explanation: '"Samatvam Yoga Uchyate" directly defines Yoga as equanimity in success and failure.',
      },
      {
        id: 'qg-2',
        question: 'Karma Yoga teaches doing careless work because results do not matter.',
        questionTa: 'பலன் முக்கியமில்லை என்பதால் செயலைக் கவனக்குறைவாகச் செய்யலாம் என கர்ம யோகம் கூறுகிறது.',
        type: 'tf',
        options: ['True (சரி)', 'False (தவறு)'],
        correctIndex: 1,
        explanation: 'Gita 2.50 states "Yogah karmasu kaushalam" — Yoga is skill, excellence, and wholehearted care in action without selfish clinging.',
      },
    ],
  },
  {
    id: 'quiz-upanishads',
    title: 'Upanishads & Brahma Sutram Assessment',
    titleTa: 'உபநிஷத் மற்றும் ப்ரம்ம சூத்திர மதிப்பீடு',
    topic: 'Upanishads',
    difficulty: 'Scholar',
    questions: [
      {
        id: 'qu-1',
        question: 'Which mantra opens the Isha Upanishad?',
        questionTa: 'ஈசாவாஸ்ய உபநிஷத்தின் தொடக்க மந்திரம் எது?',
        type: 'mcq',
        options: ['Ishavasyam Idam Sarvam', 'Satyameva Jayate', 'Tat Tvam Asi', 'Sahanavavatu'],
        correctIndex: 0,
        explanation: '"Ishavasyam Idam Sarvam Yatkincha Jagatyam Jagat" opens the Isha Upanishad.',
      },
      {
        id: 'qu-2',
        question: 'How many Adhyayas (chapters) make up the Brahma Sutram?',
        questionTa: 'ப்ரம்ம சூத்திரத்தில் மொத்தம் எத்தனை அத்தியாயங்கள் உள்ளன?',
        type: 'mcq',
        options: ['Four (Samanvaya, Avirodha, Sadhana, Phala)', 'Two', 'Eighteen', 'Twelve'],
        correctIndex: 0,
        explanation: 'The Brahma Sutras are organized into four Adhyayas: Harmony, Non-contradiction, Means, and Fruit.',
      },
    ],
  },
  {
    id: 'quiz-meditation',
    title: 'Guided Meditation & Contemplative Readiness',
    titleTa: 'தியானம் மற்றும் ஆழ்ந்த சிந்தனைப் பயிற்சித் தேர்வு',
    topic: 'Meditation',
    difficulty: 'Beginner',
    questions: [
      {
        id: 'qm-1',
        question: 'What is the role of Nididhyasana in the three-step Vedantic practice?',
        questionTa: 'சிரவணம், மனனம், நிதித்யாசனம் ஆகியவற்றில் நிதித்யாசனத்தின் பங்கு என்ன?',
        type: 'mcq',
        options: [
          'Deep contemplative assimilation so wisdom abides steadily',
          'Debating aggressively with others',
          'Memorizing without understanding',
          'Physical acrobatics',
        ],
        correctIndex: 0,
        explanation: 'After hearing (Shravana) and reflecting (Manana), Nididhyasana anchors the mind quietly in realized clarity.',
      },
      {
        id: 'qm-2',
        question: 'Guided meditation on PURNA YOGAM is offered strictly for spiritual education and contemplation, not as medical treatment.',
        questionTa: 'இத்தளத்தின் தியானப் பயிற்சிகள் ஆன்மிகக் கல்விக்கும் மன அமைதிக்குமானவை; மருத்துவச் சிகிச்சை அல்ல.',
        type: 'tf',
        options: ['True (சரி)', 'False (தவறு)'],
        correctIndex: 0,
        explanation: 'All practices on PURNA YOGAM are educational and contemplative.',
      },
    ],
  },
];
