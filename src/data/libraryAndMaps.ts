export interface AudioTrack {
  id: string;
  category:
    | 'Swamiji Lectures'
    | 'Vedanta Classes'
    | 'Bhagavad Gita Lessons'
    | 'Upanishad Explanations'
    | 'Thirukkural Recitation'
    | 'Meditation Guidance'
    | 'Spiritual Discussions'
    | 'Approved Chants'
    | 'Educational Audio Series';
  title: string;
  titleTa: string;
  speaker: string;
  durationSec: number;
  language: 'Tamil' | 'English' | 'Bilingual';
  downloadAllowed: boolean;
  transcript: string;
  speechLang: 'ta' | 'en';
  isSampleContent: boolean;
}

export const AUDIO_CATEGORIES = [
  'Swamiji Lectures',
  'Vedanta Classes',
  'Bhagavad Gita Lessons',
  'Upanishad Explanations',
  'Thirukkural Recitation',
  'Meditation Guidance',
  'Spiritual Discussions',
  'Approved Chants',
  'Educational Audio Series',
] as const;

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'aud-1',
    category: 'Swamiji Lectures',
    title: 'Awakening Inner Clarity Through Inquiry',
    titleTa: 'ஆத்ம விசாரத்தின் மூலம் உள்ளொளி பெறுதல்',
    speaker: 'Swamiji Teaching Archive (Sample)',
    durationSec: 420,
    language: 'Bilingual',
    downloadAllowed: true,
    speechLang: 'en',
    transcript:
      'True peace is not manufactured by rearranging every external circumstance. When the intellect inquires calmly into who observes the changing mind, inner stillness reveals itself as already present.',
    isSampleContent: true,
  },
  {
    id: 'aud-2',
    category: 'Thirukkural Recitation',
    title: 'Kadavul Vazhthu & Arathuppaal Opening Couplets',
    titleTa: 'கடவுள் வாழ்த்து & அறன்வலியுறுத்தல் திருக்குறள் பாராயணம்',
    speaker: 'PURNA YOGAM Recitation Archive',
    durationSec: 240,
    language: 'Tamil',
    downloadAllowed: true,
    speechLang: 'ta',
    transcript:
      'அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு. கற்றதனால் ஆய பயனென்கொல் வாலறிவன் நற்றாள் தொழாஅர் எனின். மனத்துக்கண் மாசிலன் ஆதல் அனைத்துஅறன் ஆகுல நீர பிற.',
    isSampleContent: false,
  },
  {
    id: 'aud-3',
    category: 'Bhagavad Gita Lessons',
    title: 'Gita Chapter 2: Mastering Equanimity in Daily Duty',
    titleTa: 'பகவத்கீதை அத்தியாயம் 2: சமத்வம் யோகம்',
    speaker: 'Vedanta Study Circle (Sample)',
    durationSec: 510,
    language: 'English',
    downloadAllowed: true,
    speechLang: 'en',
    transcript:
      'In Karma Yoga, we bring our wholehearted excellence to every action while releasing anxious attachment to outcomes. This inner balance is called Samatvam.',
    isSampleContent: true,
  },
  {
    id: 'aud-4',
    category: 'Upanishad Explanations',
    title: 'Isha Upanishad: Living with Sacred Stewardship',
    titleTa: 'ஈசாவாஸ்ய உபநிஷத்: நிறைவான வாழ்வு',
    speaker: 'Vedanta Study Circle (Sample)',
    durationSec: 390,
    language: 'Tamil',
    downloadAllowed: false,
    speechLang: 'ta',
    transcript:
      'ஈசாவாஸ்யம் இதம் சர்வம். உலகில் மாறும் அனைத்திலும் இறை உணர்வு நிறைந்துள்ளது. பற்றின்றி அனுபவிப்பதே ஆனந்தத்தின் வழி.',
    isSampleContent: true,
  },
  {
    id: 'aud-5',
    category: 'Meditation Guidance',
    title: 'Ten-Minute Dawn Breath & Witness Awareness',
    titleTa: 'பத்து நிமிட விடியற்காலை மூச்சு மற்றும் சாட்சி தியானம்',
    speaker: 'PURNA YOGAM Meditation Guide',
    durationSec: 600,
    language: 'English',
    downloadAllowed: true,
    speechLang: 'en',
    transcript:
      'Sit comfortably with an upright spine. Let the shoulders soften. Follow the gentle rise and fall of natural breathing, noticing thoughts like drifting clouds without clinging.',
    isSampleContent: true,
  },
  {
    id: 'aud-6',
    category: 'Approved Chants',
    title: 'Shanti Mantra: Asato Ma Sadgamaya (Traditional Peace Chant)',
    titleTa: 'சாந்தி மந்திரம்: அசதோ மா சத்கமய',
    speaker: 'Traditional Public Domain Chant',
    durationSec: 180,
    language: 'Bilingual',
    downloadAllowed: true,
    speechLang: 'en',
    transcript:
      'Asato ma sadgamaya, tamaso ma jyotirgamaya, mrityorma amritam gamaya. Om Shanti Shanti Shanti. Lead us from the unreal to the Real, from darkness to light.',
    isSampleContent: false,
  },
  {
    id: 'aud-7',
    category: 'Vedanta Classes',
    title: 'Drig Drishya Viveka: Seer vs Seen',
    titleTa: 'த்ருக் த்ருச்ய விவேகம்: சாட்சி தத்துவம்',
    speaker: 'Vedanta Study Circle (Sample)',
    durationSec: 460,
    language: 'English',
    downloadAllowed: true,
    speechLang: 'en',
    transcript:
      'Whatever is seen, heard, or thought is an object in awareness. You are the witnessing subject, never diminished by passing moods.',
    isSampleContent: true,
  },
  {
    id: 'aud-8',
    category: 'Spiritual Discussions',
    title: 'Dialogue: Aram in Thirukkural & Dharma in Vedanta',
    titleTa: 'கலந்துரையாடல்: திருக்குறள் அறமும் வேதாந்த தர்மமும்',
    speaker: 'PURNA YOGAM Scholars Panel (Sample)',
    durationSec: 540,
    language: 'Tamil',
    downloadAllowed: false,
    speechLang: 'ta',
    transcript:
      'திருக்குறளின் மனத்துக்கண் மாசிலன் ஆதல் என்ற அறநெறியும், வேதாந்தத்தின் சித்த சுத்தியும் ஒரே உயர்ந்த உண்மையை வலியுறுத்துகின்றன.',
    isSampleContent: true,
  },
  {
    id: 'aud-9',
    category: 'Educational Audio Series',
    title: 'Prasthana Traya Overview for Beginners',
    titleTa: 'ப்ரஸ்தான த்ரயம்: எளிய அறிமுகத் தொடர்',
    speaker: 'PURNA YOGAM Curriculum',
    durationSec: 360,
    language: 'English',
    downloadAllowed: true,
    speechLang: 'en',
    transcript:
      'Prasthana Traya consists of three canonical pillars of Vedanta: the Upanishads (Shruti), the Bhagavad Gita (Smriti), and the Brahma Sutras (Nyaya).',
    isSampleContent: true,
  },
];

export interface DigitalBook {
  id: string;
  title: string;
  titleTa: string;
  author: string;
  category: 'PDF Books' | 'Study Notes' | 'E-Books' | 'PPT Presentations' | 'Course Handouts' | 'Authorized Publications';
  language: 'Tamil' | 'English' | 'Tamil & English';
  description: string;
  licenseNote: string;
  downloadAllowed: boolean;
  coverImage: string;
  pages: { heading: string; body: string }[];
}

export const DIGITAL_BOOKS: DigitalBook[] = [
  {
    id: 'book-thirukkural-aram',
    title: 'Thirukkural Selected Foundations: Arathuppaal & Porutpaal',
    titleTa: 'திருக்குறள் அறமும் பொருளும் — அடிப்படை ஆய்வு நூல்',
    author: 'PURNA YOGAM Editorial Board',
    category: 'Authorized Publications',
    language: 'Tamil & English',
    description: 'Bilingual study companion covering key chapters of Virtue and Polity with word-by-word Tamil and English commentary.',
    licenseNote: 'Open Educational Resource (Free Non-Commercial Study)',
    downloadAllowed: true,
    coverImage: '/src/assets/images/thirukkural_palm_manuscript_1795423243210.jpg',
    pages: [
      {
        heading: 'Scope: Two Foundational Divisions (1,080 Kurals)',
        body: 'Thiruvalluvar structured human flourishing around Aram (ethical righteousness, Chapters 1–38) and Porul (wise governance, learning, friendship, and civic nobility, Chapters 39–108). This study edition focuses exclusively on these 108 chapters.',
      },
      {
        heading: 'Purity of Mind (Kural 34)',
        body: 'Manathukkan maasilan aadhal anaitharan — Virtue begins in an unblemished, sincere conscience rather than outward show. Every ethical duty flows naturally from inner clarity.',
      },
      {
        heading: 'Truth & Compassion (Kurals 241 & 291)',
        body: 'Arutselvam (wealth of compassion) and Vaaimai (harmless truthfulness) unite personal integrity with universal goodwill toward all beings.',
      },
    ],
  },
  {
    id: 'book-vedanta-primer',
    title: 'Vedanta Primer: Tattva Bodha & Sadhana Chatushtaya',
    titleTa: 'வேதாந்த அறிமுகக் கையேடு: தத்துவ போதம்',
    author: 'Swamiji Study Archive (Sample Edition)',
    category: 'Study Notes',
    language: 'English',
    description: 'Concise study notes introducing fundamental Vedantic terms, the three bodies, five sheaths, and four qualifications.',
    licenseNote: 'PURNA YOGAM Study Handout (Permitted for Free Download)',
    downloadAllowed: true,
    coverImage: '/src/assets/images/vedanta_sanctuary_hall_1795423245934.jpg',
    pages: [
      {
        heading: 'What is Tattva Bodha?',
        body: 'Tattva Bodha means "Knowledge of Reality." Traditionally attributed to Adi Shankaracharya, it defines the essential vocabulary needed before studying the Upanishads.',
      },
      {
        heading: 'The Five Sheaths (Pancha Kosha)',
        body: '1. Annamaya (Physical) · 2. Pranamaya (Vital breath) · 3. Manomaya (Emotional/sensory mind) · 4. Vijnanamaya (Discerning intellect) · 5. Anandamaya (Reflective bliss). The Atman is the pure Witness distinct from all five sheaths.',
      },
    ],
  },
  {
    id: 'book-gita-handbook',
    title: 'Bhagavad Gita Study Handout: Karma, Bhakti & Jnana',
    titleTa: 'பகவத்கீதை பயிற்சிப் புத்தகம்: கர்மம், பக்தி, ஞானம்',
    author: 'PURNA YOGAM Curriculum Team',
    category: 'Course Handouts',
    language: 'Tamil & English',
    description: 'Structured chapter guide connecting Gita verses to everyday serenity and selfless service.',
    licenseNote: 'Open Educational Resource (Free Download)',
    downloadAllowed: true,
    coverImage: '/src/assets/images/hero_temple_sunrise_1795423242919.jpg',
    pages: [
      {
        heading: 'The Three Hexads of the Bhagavad Gita',
        body: 'Chapters 1–6 emphasize Karma Yoga and self-effort; Chapters 7–12 illumine Bhakti Yoga and Ishvara’s universal presence; Chapters 13–18 unveil Jnana Yoga and liberation.',
      },
      {
        heading: 'Living Gita 2.47',
        body: 'Perform your duty wholeheartedly without anxiety over outcomes, cultivating equanimity in both success and setbacks.',
      },
    ],
  },
  {
    id: 'book-upanishad-guide',
    title: 'Heart of the Principal Upanishads (Study Guide)',
    titleTa: 'முதன்மை உபநிஷத்துக்களின் சாரம்',
    author: 'PURNA YOGAM Research Archive',
    category: 'PDF Books',
    language: 'English',
    description: 'Annotated study guide to Isha, Kena, Katha, Mundaka, and Mandukya Upanishads.',
    licenseNote: 'Authorized Free Educational Edition',
    downloadAllowed: true,
    coverImage: '/src/assets/images/heritage_temple_corridor_1795423245583.jpg',
    pages: [
      {
        heading: 'Four Mahavakyas',
        body: 'Prajnanam Brahma (Rig Veda) · Aham Brahmasmi (Yajur Veda) · Tat Tvam Asi (Sama Veda) · Ayam Atma Brahma (Atharva Veda).',
      },
    ],
  },
  {
    id: 'book-meditation-manual',
    title: 'Stillness Within: A Contemplative Meditation Workbook',
    titleTa: 'அமைதியின் ஆழம்: தியானப் பயிற்சி நூல்',
    author: 'PURNA YOGAM Contemplative Centre',
    category: 'E-Books',
    language: 'Tamil & English',
    description: 'Gentle educational guide to posture, breath awareness, silent sitting, and daily reflection.',
    licenseNote: 'Free Educational Distribution (Non-Medical)',
    downloadAllowed: true,
    coverImage: '/src/assets/images/meditation_sacred_lotus_1795423245192.jpg',
    pages: [
      {
        heading: 'Preparing for Quiet Sitting',
        body: 'Choose a clean, quiet corner at dawn or dusk. Keep the spine upright yet relaxed. Approach meditation with patience rather than force.',
      },
    ],
  },
];

export interface WisdomMapNode {
  id: string;
  label: string;
  labelTa: string;
  x: number; // percentage 0-100 in 900x520 SVG viewBox
  y: number;
  role: 'root' | 'branch' | 'leaf';
  explanation: string;
  explanationTa: string;
  relatedLessonId?: string;
}

export interface WisdomMapEdge {
  from: string;
  to: string;
}

export interface WisdomMap {
  id: string;
  title: string;
  titleTa: string;
  subtitle: string;
  nodes: WisdomMapNode[];
  edges: WisdomMapEdge[];
}

export const WISDOM_MAPS: WisdomMap[] = [
  {
    id: 'map-vedanta-hierarchy',
    title: 'Prasthana Traya & Vedanta Learning Hierarchy',
    titleTa: 'வேதாந்தத்தின் முத்தூண்கள் (ப்ரஸ்தான த்ரயம்)',
    subtitle: 'How Shruti, Smriti, and Nyaya unite to reveal non-dual wisdom.',
    nodes: [
      {
        id: 'brahman',
        label: 'Non-Dual Truth (Advaita)',
        labelTa: 'அத்வைத மெய்ம்மை',
        x: 450,
        y: 80,
        role: 'root',
        explanation: 'The single indivisible Consciousness (Sat-Chit-Ananda) revealed by Vedanta.',
        explanationTa: 'சத்-சித்-ஆனந்தமயமான ஒரே மெய்ப்பொருள்.',
        relatedLessonId: 'ved-intro-1',
      },
      {
        id: 'shruti',
        label: 'Upanishads (Shruti)',
        labelTa: 'உபநிஷத்துக்கள் (ஸ்ருதி)',
        x: 200,
        y: 230,
        role: 'branch',
        explanation: 'Revealed philosophical summit of the four Vedas.',
        explanationTa: 'நான்கு வேதங்களின் முடிவான ஞானப் பகுதி.',
        relatedLessonId: 'ved-upanishad-1',
      },
      {
        id: 'smriti',
        label: 'Bhagavad Gita (Smriti)',
        labelTa: 'பகவத்கீதை (ஸ்மிருதி)',
        x: 450,
        y: 230,
        role: 'branch',
        explanation: 'Practical synthesis of Karma, Bhakti, and Jnana Yoga in life.',
        explanationTa: 'வாழ்வியலில் கர்ம, பக்தி, ஞான யோகங்களின் இணைப்பு.',
        relatedLessonId: 'ved-gita-2',
      },
      {
        id: 'nyaya',
        label: 'Brahma Sutram (Nyaya)',
        labelTa: 'ப்ரம்ம சூத்ரம் (நியாயம்)',
        x: 700,
        y: 230,
        role: 'branch',
        explanation: 'Logical aphorisms reconciling all Upanishadic teachings.',
        explanationTa: 'உபநிஷத் வாக்கியங்களைத் தர்க்கரீதியாக இணைக்கும் சூத்திரங்கள்.',
        relatedLessonId: 'ved-bs-1',
      },
      {
        id: 'sadhana',
        label: 'Sadhana Chatushtaya',
        labelTa: 'சாதன சதுஷ்டயம்',
        x: 200,
        y: 400,
        role: 'leaf',
        explanation: 'Viveka, Vairagya, Shat-Sampatti, Mumukshutvam.',
        explanationTa: 'விவேகம், வைராக்கியம், ஷட் சம்பத்தி, முமுக்ஷுத்வம்.',
        relatedLessonId: 'ved-intro-1',
      },
      {
        id: 'nididhyasana',
        label: 'Shravana · Manana · Nididhyasana',
        labelTa: 'கேட்டல் · சிந்தித்தல் · தெளிதல்',
        x: 560,
        y: 400,
        role: 'leaf',
        explanation: 'Listening to the teaching, reflecting to remove doubts, and abiding in stillness.',
        explanationTa: 'சிரவணம், மனனம், நிதித்யாசனம் எனும் முப்படி ஞானப் பயிற்சி.',
        relatedLessonId: 'ved-med-1',
      },
    ],
    edges: [
      { from: 'brahman', to: 'shruti' },
      { from: 'brahman', to: 'smriti' },
      { from: 'brahman', to: 'nyaya' },
      { from: 'shruti', to: 'sadhana' },
      { from: 'smriti', to: 'nididhyasana' },
      { from: 'nyaya', to: 'nididhyasana' },
    ],
  },
  {
    id: 'map-gita-overview',
    title: 'Bhagavad Gita 18-Chapter Structure',
    titleTa: 'பகவத்கீதை 18 அத்தியாய வரைபடம்',
    subtitle: 'Three six-chapter movements from self-effort to devotion and non-dual realization.',
    nodes: [
      {
        id: 'gita-core',
        label: 'Bhagavad Gita (700 Verses)',
        labelTa: 'பகவத்கீதை',
        x: 450,
        y: 75,
        role: 'root',
        explanation: 'Dialogue between Krishna and Arjuna uniting action, devotion, and wisdom.',
        explanationTa: 'செயல், பக்தி, ஞானம் ஆகியவற்றை இணைக்கும் உபதேசம்.',
        relatedLessonId: 'ved-gita-2',
      },
      {
        id: 'karma-hexad',
        label: 'Ch 1–6: Karma & Dhyana Yoga',
        labelTa: 'அத் 1–6: கர்ம & தியான யோகம்',
        x: 190,
        y: 230,
        role: 'branch',
        explanation: 'Focuses on Tvam Pada (individual readiness), selfless action, and mental steadiness.',
        explanationTa: 'தன்முனைப்பற்ற கடமையும் மன அமைதியும்.',
        relatedLessonId: 'ved-gita-2',
      },
      {
        id: 'bhakti-hexad',
        label: 'Ch 7–12: Bhakti & Vibhuti',
        labelTa: 'அத் 7–12: பக்தி யோகம்',
        x: 450,
        y: 230,
        role: 'branch',
        explanation: 'Focuses on Tat Pada (Ishvara as cosmic order), loving surrender, and universal vision.',
        explanationTa: 'இறையின் பெருமையையும் சரணாகதியையும் விளக்கும் பகுதி.',
      },
      {
        id: 'jnana-hexad',
        label: 'Ch 13–18: Jnana & Moksha',
        labelTa: 'அத் 13–18: ஞான யோகம்',
        x: 710,
        y: 230,
        role: 'branch',
        explanation: 'Reveals Kshetra-Kshetrajna (Field & Knower) and the unity of Asi ("You Are That").',
        explanationTa: 'க்ஷேத்ர-க்ஷேத்ரஜ்ஞ விவேகமும் முக்தியும்.',
        relatedLessonId: 'ved-texts-1',
      },
      {
        id: 'samatvam',
        label: 'Samatvam (Equanimity)',
        labelTa: 'சமத்வம் (சமநிலை)',
        x: 320,
        y: 400,
        role: 'leaf',
        explanation: 'Remaining balanced through praise and blame, gain and loss.',
        explanationTa: 'இன்ப துன்பங்களில் மாறாத மனச்சமநிலை.',
        relatedLessonId: 'ved-gita-2',
      },
      {
        id: 'sthitaprajna',
        label: 'Sthitaprajna Ideal',
        labelTa: 'ஸ்திதப்ரக்ஞன்',
        x: 590,
        y: 400,
        role: 'leaf',
        explanation: 'One whose wisdom stands unshaken like an ocean.',
        explanationTa: 'நிலையான ஞானத்தில் திளைப்பவர்.',
        relatedLessonId: 'ved-gita-2',
      },
    ],
    edges: [
      { from: 'gita-core', to: 'karma-hexad' },
      { from: 'gita-core', to: 'bhakti-hexad' },
      { from: 'gita-core', to: 'jnana-hexad' },
      { from: 'karma-hexad', to: 'samatvam' },
      { from: 'bhakti-hexad', to: 'samatvam' },
      { from: 'jnana-hexad', to: 'sthitaprajna' },
    ],
  },
  {
    id: 'map-thirukkural',
    title: 'Thirukkural Two-Division Architecture (1,080 Kurals)',
    titleTa: 'திருக்குறள் இருபால் கட்டமைப்பு (108 அதிகாரங்கள்)',
    subtitle: 'Arathuppaal (380 Kurals) & Porutpaal (700 Kurals) across 108 chapters.',
    nodes: [
      {
        id: 'kural-root',
        label: 'Thirukkural (1,080 Kurals)',
        labelTa: 'திருக்குறள் (1080 குறள்கள்)',
        x: 450,
        y: 75,
        role: 'root',
        explanation: 'Curated in PURNA YOGAM strictly across Arathuppaal and Porutpaal.',
        explanationTa: 'அறத்துப்பால் மற்றும் பொருட்பால் ஆகிய இரு பால்களும் 108 அதிகாரங்களும்.',
      },
      {
        id: 'aram',
        label: 'Arathuppaal (38 Ch · 380)',
        labelTa: 'அறத்துப்பால் (380 குறள்)',
        x: 260,
        y: 225,
        role: 'branch',
        explanation: 'Payiraviyal (4), Illaraviyal (20), Thuravaraviyal (13), Oozhiyal (1).',
        explanationTa: 'தனிமனித ஒழுக்கம், இல்லறம், துறவறம் மற்றும் ஊழ்.',
      },
      {
        id: 'porul',
        label: 'Porutpaal (70 Ch · 700)',
        labelTa: 'பொருட்பால் (700 குறள்)',
        x: 640,
        y: 225,
        role: 'branch',
        explanation: 'Arasiyal (25), Amaichiyal (10), Araniyal (2), Koozhiyal (1), Padaiyiyal (2), Natpiyal (17), Kudiyiyal (13).',
        explanationTa: 'அரசியல், அமைச்சு, நட்பு, குடியியல் உள்ளிட்ட சமுதாய அறம்.',
      },
      {
        id: 'purity',
        label: 'Purity of Mind (Kural 34)',
        labelTa: 'மனத்துக்கண் மாசிலன்',
        x: 200,
        y: 395,
        role: 'leaf',
        explanation: 'Spotless intention as the essence of all Dharma.',
        explanationTa: 'உள்ளத் தூய்மையே அறத்தின் அடிப்படை.',
      },
      {
        id: 'truth',
        label: 'Meipporul & Inquiry (355 / 423)',
        labelTa: 'மெய்ப்பொருள் காண்பது அறிவு',
        x: 450,
        y: 395,
        role: 'leaf',
        explanation: 'Seeing enduring truth beyond transient appearances.',
        explanationTa: 'தோற்றத்தைக் கடந்து மெய்ம்மை காணும் அறிவு.',
      },
      {
        id: 'civic',
        label: 'Saanraanmai (983)',
        labelTa: 'சான்றாண்மை',
        x: 700,
        y: 395,
        role: 'leaf',
        explanation: 'Five pillars of mature human nobility and service.',
        explanationTa: 'அன்பு, நாண், ஒப்புரவு, கண்ணோட்டம், வாய்மை.',
      },
    ],
    edges: [
      { from: 'kural-root', to: 'aram' },
      { from: 'kural-root', to: 'porul' },
      { from: 'aram', to: 'purity' },
      { from: 'aram', to: 'truth' },
      { from: 'porul', to: 'truth' },
      { from: 'porul', to: 'civic' },
    ],
  },
  {
    id: 'map-atman-brahman',
    title: 'Atman, Pancha Kosha & Brahman',
    titleTa: 'ஆத்மா, பஞ்ச கோசம் மற்றும் ப்ரம்மம்',
    subtitle: 'Mapping the five sheaths toward the inner Witness.',
    nodes: [
      {
        id: 'atman',
        label: 'Atman = Brahman (Sakshi)',
        labelTa: 'ஆத்மா (சாட்சி உணர்வு)',
        x: 450,
        y: 80,
        role: 'root',
        explanation: 'Pure undivided Consciousness witnessing waking, dream, and deep sleep.',
        explanationTa: 'விழிப்பு, கனவு, ஆழ்ந்த உறக்கம் மூன்றையும் அறியும் சாட்சி.',
        relatedLessonId: 'ved-texts-1',
      },
      {
        id: 'gross',
        label: 'Annamaya (Physical Body)',
        labelTa: 'அன்னமய கோசம்',
        x: 160,
        y: 250,
        role: 'branch',
        explanation: 'Nourished by food; visible physical form.',
        explanationTa: 'உணவால் வளரும் பருவுடல்.',
      },
      {
        id: 'subtle',
        label: 'Prana · Manas · Vijnana',
        labelTa: 'பிராண · மனோ · விஞ்ஞான கோசம்',
        x: 450,
        y: 250,
        role: 'branch',
        explanation: 'Subtle energy, emotional mind, and discerning intellect.',
        explanationTa: 'உயிர் மூச்சு, உணர்வு மனம் மற்றும் புத்தி.',
      },
      {
        id: 'causal',
        label: 'Anandamaya (Causal Sheath)',
        labelTa: 'ஆனந்தமய கோசம்',
        x: 740,
        y: 250,
        role: 'branch',
        explanation: 'Latent causal state experienced in deep sleep.',
        explanationTa: 'ஆழ்ந்த உறக்கத்தில் உணரும் காரண நிலை.',
      },
      {
        id: 'neti',
        label: 'Neti Neti Inquiry',
        labelTa: 'நேதி நேதி விசாரணை',
        x: 450,
        y: 410,
        role: 'leaf',
        explanation: 'Recognizing "I am the witness of these sheaths, not limited to them."',
        explanationTa: 'கோசங்களுக்கு அப்பாற்பட்ட சாட்சியே நான் என உணர்தல்.',
        relatedLessonId: 'ved-texts-1',
      },
    ],
    edges: [
      { from: 'atman', to: 'gross' },
      { from: 'atman', to: 'subtle' },
      { from: 'atman', to: 'causal' },
      { from: 'gross', to: 'neti' },
      { from: 'subtle', to: 'neti' },
      { from: 'causal', to: 'neti' },
    ],
  },
];
