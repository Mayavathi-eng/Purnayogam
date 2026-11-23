export interface VedantaSlide {
  title: string;
  titleTa: string;
  bullets: string[];
  keyTerm: string;
}

export interface VedantaQuizQuestion {
  question: string;
  questionTa: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface VedantaLesson {
  id: string;
  categoryId: string;
  subcategory: string;
  series: string;
  chapter: string;
  title: string;
  titleTa: string;
  teacher: string;
  durationMinutes: number;
  summary: string;
  summaryTa: string;
  explanation: string;
  explanationTa: string;
  pdfNotes: { heading: string; body: string }[];
  pptSlides: VedantaSlide[];
  quiz: VedantaQuizQuestion[];
  references: string[];
  isSampleContent: boolean;
}

export interface VedantaCategory {
  id: string;
  number: string;
  tamil: string;
  english: string;
  description: string;
  descriptionTa: string;
}

export const VEDANTA_CATEGORIES: VedantaCategory[] = [
  {
    id: 'intro',
    number: '01',
    tamil: 'அறிமுகம்',
    english: 'Introduction to Vedanta',
    description: 'Foundational inquiry into Sadhana Chatushtaya, Viveka, Vairagya, and the purpose of self-knowledge.',
    descriptionTa: 'சாதன சதுஷ்டயம், விவேகம், வைராக்கியம் மற்றும் ஆத்ம விசாரத்தின் அடிப்படை அறிமுகம்.',
  },
  {
    id: 'gita',
    number: '02',
    tamil: 'பகவத்கீதை',
    english: 'Bhagavad Gita',
    description: 'Chapter-by-chapter exposition of Karma Yoga, Bhakti Yoga, and Jnana Yoga in daily life.',
    descriptionTa: 'கர்ம யோகம், பக்தி யோகம் மற்றும் ஞான யோகத்தின் அத்தியாய வாரியான விளக்கம்.',
  },
  {
    id: 'upanishads',
    number: '03',
    tamil: 'உபநிஷத்துக்கள்',
    english: 'Upanishads',
    description: 'Contemplative studies on Isha, Kena, Katha, Mundaka, and Mandukya Upanishads.',
    descriptionTa: 'ஈசா வாஸ்ய, கேன, கட, முண்டக மற்றும் மாண்டூக்ய உபநிஷத் உரைகள்.',
  },
  {
    id: 'texts',
    number: '04',
    tamil: 'வேதாந்த நூல்கள்',
    english: 'Vedantic Texts (Prakarana Granthas)',
    description: 'Tattva Bodha, Atma Bodha, Vivekachudamani, and Drig Drishya Viveka.',
    descriptionTa: 'தத்துவ போதம், ஆத்ம போதம், விவேக சூடாமணி மற்றும் த்ருக் த்ருச்ய விவேகம்.',
  },
  {
    id: 'brahma-sutram',
    number: '05',
    tamil: 'ப்ரம்ம சூத்ரம்',
    english: 'Brahma Sutram',
    description: 'Systematic synthesis of Upanishadic aphorisms reconciling apparent scriptural differences.',
    descriptionTa: 'உபநிஷத் கருத்துக்களை ஒருங்கிணைக்கும் ப்ரம்ம சூத்திர தத்துவ ஆய்வு.',
  },
  {
    id: 'talks',
    number: '06',
    tamil: 'வேதாந்த சொற்பொழிவுகள்',
    english: 'General Vedanta Talks',
    description: 'Accessible discourses applying non-dual wisdom to modern challenges, work, and equanimity.',
    descriptionTa: 'அன்றாட வாழ்வில் மன அமைதி, கடமை மற்றும் ஆன்மிகத் தெளிவுக்கான சொற்பொழிவுகள்.',
  },
  {
    id: 'meditation',
    number: '07',
    tamil: 'தியானம்',
    english: 'Guided Meditation & Nididhyasana',
    description: 'Step-by-step breath awareness, witness consciousness, and silent Vedantic contemplation.',
    descriptionTa: 'மூச்சுப் பயிற்சி, சாட்சி பாவனை மற்றும் அமைதி தியான வழிகாட்டுதல்கள்.',
  },
];

export const VEDANTA_LESSONS: VedantaLesson[] = [
  {
    id: 'ved-intro-1',
    categoryId: 'intro',
    subcategory: 'Foundations of Self-Inquiry',
    series: 'Praveshika Series',
    chapter: 'Chapter 1: What is Vedanta?',
    title: 'The Fourfold Qualification (Sadhana Chatushtaya)',
    titleTa: 'சாதன சதுஷ்டயம்: ஆன்மிகப் பயணத்தின் நான்கு தூண்கள்',
    teacher: 'Swamiji Teaching Archive (Curated Study Module)',
    durationMinutes: 28,
    summary: 'Discover how discernment, dispassion, inner discipline, and yearning for freedom prepare the mind for timeless wisdom.',
    summaryTa: 'விவேகம், வைராக்கியம், சமாதி ஷட்க சம்பத்தி மற்றும் முமுக்ஷுத்வம் ஆகிய நான்கு தகுதிகளின் விளக்கம்.',
    explanation:
      'Vedanta is not a belief system asking for blind faith; it is a rigorous pramana (means of knowledge) revealing the true nature of the Self. Before subtle non-dual truth can abide clearly in our awareness, the mind requires emotional steadiness and clarity—cultivated through Viveka (discriminating between the permanent and the changing), Vairagya (inner freedom from compulsive attachment), Shat-Sampatti (sixfold mental harmony), and Mumukshutvam (sincere longing for liberation).',
    explanationTa:
      'வேதாந்தம் என்பது வெறும் நம்பிக்கையல்ல; அது நம் உண்மை இயல்பைக் காட்டும் ஞானப் பிரமாணம். அழியாத சத்தியத்திற்கும் மாறும் உலகிற்கும் இடையே உள்ள வேறுபாட்டை உணரும் விவேகம், பற்றற்ற தன்மை (வைராக்கியம்), மன அமைதி உள்ளிட்ட ஆறு குணங்கள் (ஷட் சம்பத்தி), மற்றும் விடுதலைக்கான ஆழ்ந்த வேட்கை (முமுக்ஷுத்வம்) ஆகியவை சாதகனைப் பக்குவப்படுத்துகின்றன.',
    pdfNotes: [
      {
        heading: '1. Viveka (Discernment)',
        body: 'Nitya-anitya-vastu-viveka is the clear recognition that while experiences, roles, and moods arise and pass away, the witnessing Consciousness remains unchanging.',
      },
      {
        heading: '2. Vairagya (Dispassion)',
        body: 'Not rejection of life or duty, but freedom from expecting finite objects to deliver infinite fulfillment.',
      },
      {
        heading: '3. Shat-Sampatti (Six Inner Treasures)',
        body: 'Shama (tranquility of mind), Dama (restraint of senses), Uparati (abiding in duty without agitation), Titiksha (forbearance), Shraddha (trust in the teaching while verifying it), and Samadhana (single-pointed steadiness).',
      },
    ],
    pptSlides: [
      {
        title: 'Why Preparation Precedes Revelation',
        titleTa: 'மனப் பக்குவத்தின் அவசியம்',
        bullets: [
          'A still lake reflects the sky clearly; an agitated mind distorts perception.',
          'Vedanta works as a mirror of words (Shabda Pramana).',
          'Sadhana Chatushtaya polishes the mirror of the intellect.',
        ],
        keyTerm: 'Chitta Shuddhi',
      },
      {
        title: 'The Four Qualifications',
        titleTa: 'நான்கு தகுதிகள்',
        bullets: [
          'Viveka — Discerning Real from Ephemeral',
          'Vairagya — Inner Freedom from Craving',
          'Shat-Sampatti — Sixfold Discipline',
          'Mumukshutvam — Yearning for Moksha',
        ],
        keyTerm: 'Sadhana Chatushtaya',
      },
    ],
    quiz: [
      {
        question: 'What does "Viveka" primarily refer to in Vedanta?',
        questionTa: 'வேதாந்தத்தில் "விவேகம்" என்பது எதைக் குறிக்கிறது?',
        options: [
          'Accumulating encyclopedic scriptural facts',
          'Discriminating between the eternal Reality and the transient',
          'Retreating permanently from all social responsibilities',
          'Suppressing every emotion through force',
        ],
        correctIndex: 1,
        explanation: 'Viveka is the clear intellectual discernment between what is timeless and unchanging (Nitya) and what is temporary (Anitya).',
      },
      {
        question: 'Which quality describes calm endurance of dualities like heat/cold or praise/blame?',
        questionTa: 'இன்ப துன்பங்களைச் சமமாகத் தாங்கும் பண்பு எது?',
        options: ['Titiksha', 'Uparati', 'Shraddha', 'Dama'],
        correctIndex: 0,
        explanation: 'Titiksha is patient forbearance—facing outer changes without inner complaint or anxiety.',
      },
    ],
    references: [
      'Adi Shankaracharya — Tattva Bodha (Introductory Verses)',
      'Vivekachudamani — Verses 18–30',
    ],
    isSampleContent: true,
  },
  {
    id: 'ved-gita-2',
    categoryId: 'gita',
    subcategory: 'Sankhya & Karma Yoga',
    series: 'Bhagavad Gita Complete Study',
    chapter: 'Chapter 2: Sankhya Yoga',
    title: 'Equanimity in Action: Karma Yoga & Sthitaprajna',
    titleTa: 'கர்ம யோகம் மற்றும் ஸ்திதப்ரக்ஞன் இலக்கணம்',
    teacher: 'Swamiji Teaching Archive (Curated Study Module)',
    durationMinutes: 36,
    summary: 'Understanding Bhagavad Gita 2.47–2.55: acting wholeheartedly without anxiety over outcomes.',
    summaryTa: 'கடமையில் கவனம் செலுத்தி, பலனில் பற்றின்றி வாழும் ஞான நெறி (கீதை 2.47–2.55).',
    explanation:
      'In Chapter 2 of the Bhagavad Gita, Krishna addresses human grief and confusion not with mere consolation, but with clarity about the imperishable Self (Atman) and the art of dedicated action (Karma Yoga). "Samatvam Yoga Uchyate" — evenness of mind in success and failure is Yoga. When action is offered as worship without possessive clinging to results, work itself purifies the heart.',
    explanationTa:
      'பகவத் கீதையின் இரண்டாம் அத்தியாயமான சாங்கிய யோகத்தில், அழியாத ஆத்ம தத்துவமும் கடமையைப் பற்றின்றிச் செய்யும் கர்ம யோகமும் இணைத்துப் போதிக்கப்படுகின்றன. வெற்றியிலும் தோல்வியிலும் சமநிலை காப்பதே யோகம் ("சமத்வம் யோக உச்யதே").',
    pdfNotes: [
      {
        heading: 'Gita 2.47 — Mastery Over Choice, Not Outcomes',
        body: 'Karmanyevaadhikaaraste maa phaleshu kadaachana: We choose the integrity and excellence of our effort, while outcomes depend on countless cosmic factors.',
      },
      {
        heading: 'Qualities of a Sthitaprajna (Steady Wisdom)',
        body: 'Free from obsessive craving, unshaken in adversity, without clinging or hatred, resting contented in the Self.',
      },
    ],
    pptSlides: [
      {
        title: 'Two Principles of Karma Yoga',
        titleTa: 'கர்ம யோகத்தின் இரு அம்சங்கள்',
        bullets: [
          '1. Ishvara Arpana Buddhi — Acting in a spirit of sacred offering.',
          '2. Prasada Buddhi — Accepting outcomes gracefully as gift and feedback.',
        ],
        keyTerm: 'Samatvam',
      },
      {
        title: 'The Sthitaprajna Mind',
        titleTa: 'ஸ்திதப்ரக்ஞன்',
        bullets: [
          'Like the ocean receiving rivers without overflowing, desires enter and subside without disturbing inner peace.',
        ],
        keyTerm: 'Sthitaprajna',
      },
    ],
    quiz: [
      {
        question: 'In Bhagavad Gita 2.48, how is Yoga defined?',
        questionTa: 'பகவத் கீதை 2.48-இல் யோகம் எவ்வாறு வரையறுக்கப்படுகிறது?',
        options: [
          'Physical flexibility alone',
          'Samatvam — equanimity of mind',
          'Avoiding all difficult duties',
          'Seeking constant praise',
        ],
        correctIndex: 1,
        explanation: '"Samatvam Yoga Uchyate" defines Yoga as inner evenness amidst life’s dualities.',
      },
    ],
    references: [
      'Bhagavad Gita Chapter 2 (Verses 47–72)',
      'Tirukkural Parallel: Chapter 62 (Aalvinaiyudaimai) & Kural 34',
    ],
    isSampleContent: true,
  },
  {
    id: 'ved-upanishad-1',
    categoryId: 'upanishads',
    subcategory: 'Dashopanishads',
    series: 'Upanishad Essence',
    chapter: 'Isha & Kena Upanishad',
    title: 'Isha Upanishad: Seeing the One in All',
    titleTa: 'ஈசா வாஸ்ய உபநிஷத்: அனைத்திலும் இறையைக் காணுதல்',
    teacher: 'Swamiji Teaching Archive (Curated Study Module)',
    durationMinutes: 32,
    summary: 'Contemplating the opening mantra "Ishavasyam Idam Sarvam" — renunciation through fullness.',
    summaryTa: 'ஈசாவாஸ்யம் இதம் சர்வம் — பற்றின்றித் துய்த்து, அனைத்து உயிர்களிலும் ஒன்றைக் காணுதல்.',
    explanation:
      'The Isha Upanishad opens with a luminous declaration: all that moves in this changing universe is pervaded by the Supreme Consciousness. Therefore, partake of life with inner detachment (tena tyaktena bhunjitha) and covet nothing belonging to another. When one sees all beings in the Self and the Self in all beings, fear and hatred dissolve.',
    explanationTa:
      'மாறிக்கொண்டிருக்கும் இப்பிரபஞ்சம் முழுவதும் இறை உணர்வால் நிறைந்துள்ளது ("ஈசாவாஸ்யம் இதம் சர்வம்"). எனவே தியாக உணர்வுடன் வாழ்வை அனுபவிக்க வேண்டும்; பிறர் பொருளை விரும்பக் கூடாது. அனைத்து உயிர்களிலும் தன் ஆத்மாவையும், தன் ஆத்மாவில் அனைத்து உயிர்களையும் காண்பவர் அச்சமற்றவர் ஆகிறார்.',
    pdfNotes: [
      {
        heading: 'Mantra 1: Sacred Stewardship',
        body: 'We are custodians, never absolute owners, of wealth, relationships, and even our own bodies.',
      },
      {
        heading: 'Mantra 6: Non-Hatred from Oneness',
        body: 'Yastu sarvani bhutani atmanyevanupashyati — seeing unity removes alienation.',
      },
    ],
    pptSlides: [
      {
        title: 'Ishavasyam Idam Sarvam',
        titleTa: 'நிறைவின் தரிசனம்',
        bullets: [
          'Everything is pervaded by Consciousness.',
          'Enjoy through letting go (Tena tyaktena bhunjitha).',
          'Live actively for a hundred years in Karma Yoga.',
        ],
        keyTerm: 'Ishavasyam',
      },
    ],
    quiz: [
      {
        question: 'What dissolves fear and hatred according to Mantras 6–7 of the Isha Upanishad?',
        questionTa: 'ஈசாவாஸ்ய உபநிஷத்தின் 6-7 மந்திரங்களின்படி அச்சத்தையும் வெறுப்பையும் நீக்குவது எது?',
        options: [
          'Accumulating defensive power',
          'Seeing all beings in the Self and the Self in all beings',
          'Avoiding all communication',
          'Competing for status',
        ],
        correctIndex: 1,
        explanation: 'When one perceives the same Self in every creature, illusion and aversion fall away.',
      },
    ],
    references: ['Shukla Yajurveda — Isha Upanishad Mantras 1–8'],
    isSampleContent: true,
  },
  {
    id: 'ved-texts-1',
    categoryId: 'texts',
    subcategory: 'Prakarana Granthas',
    series: 'Drig Drishya Viveka',
    chapter: 'The Seer and the Seen',
    title: 'Drig Drishya Viveka: Discerning the Witness',
    titleTa: 'த்ருக் த்ருச்ய விவேகம்: காண்பவனும் காணப்படுவதும்',
    teacher: 'Swamiji Teaching Archive (Curated Study Module)',
    durationMinutes: 25,
    summary: 'How the simple distinction between the observer and the observed leads to effortless Self-recognition.',
    summaryTa: 'கண்ணுக்குப் புலனாகும் பொருட்களுக்கும், மனதின் எண்ணங்களுக்கும் சாட்சியாக இருக்கும் ஆத்மாவை அறிதல்.',
    explanation:
      'Drig Drishya Viveka begins with an unforgettable observation: forms are seen, and the eye is the seer; the eye is observed by the mind, and the mind’s thoughts are observed by the Witness (Sakshi). Whatever is observed is an object; the ultimate Observer is never an object—it is pure, undivided Awareness.',
    explanationTa:
      'உருவங்களைக் கண் காண்கிறது; கண்ணின் நிலைகளை மனம் அறிகிறது; மனதின் எண்ணங்களையும் உணர்வுகளையும் சாட்சியான ஆத்மா அறிகிறது. காணப்படுபவை அனைத்தும் ஜடமானவை; எவற்றாலும் காணப்படாத சாட்சியே நாம்.',
    pdfNotes: [
      {
        heading: 'Verse 1 Ladder of Observation',
        body: 'External objects -> Sense organ (Eye) -> Mind (Manas/Buddhi) -> Witness Consciousness (Sakshi).',
      },
    ],
    pptSlides: [
      {
        title: 'The Witness Principle',
        titleTa: 'சாட்சி பாவனை',
        bullets: [
          'The Seer is distinct from the Seen.',
          'Thoughts change; Awareness that knows thoughts does not.',
        ],
        keyTerm: 'Sakshi',
      },
    ],
    quiz: [
      {
        question: 'In Drig Drishya Viveka, what observes the changing modifications of the mind?',
        questionTa: 'மனதின் மாற்றங்களை அறியும் சாட்சி எது?',
        options: ['The physical eye', 'The Witness Consciousness (Sakshi)', 'External objects', 'The breath alone'],
        correctIndex: 1,
        explanation: 'Sakshi, the pure Witness Consciousness, illumines every thought without being tainted by it.',
      },
    ],
    references: ['Drig Drishya Viveka — Verse 1–5'],
    isSampleContent: true,
  },
  {
    id: 'ved-bs-1',
    categoryId: 'brahma-sutram',
    subcategory: 'Samanvaya Adhyaya',
    series: 'Brahma Sutram Foundations',
    chapter: 'Adhyaya 1, Pada 1',
    title: 'Athato Brahma Jijnasa — The Inquiry into Brahman',
    titleTa: 'அதாதோ ப்ரம்ம ஜிஜ்ஞாஸா: ப்ரம்ம விசாரத்தின் தொடக்கம்',
    teacher: 'Swamiji Teaching Archive (Curated Study Module)',
    durationMinutes: 30,
    summary: 'Exploring the opening aphorism of Sage Badarayana’s Brahma Sutras and Adi Shankara’s Adhyasa Bhashya.',
    summaryTa: 'வியாசரின் முதல் சூத்திரமான "அதாதோ ப்ரம்ம ஜிஜ்ஞாஸா" மற்றும் சங்கரரின் அத்யாச பாஷ்ய அறிமுகம்.',
    explanation:
      'The Brahma Sutras harmonize the teachings of the Upanishads into four chapters: Samanvaya (Harmony), Avirodha (Non-contradiction), Sadhana (Means), and Phala (Fruit). The very first sutra declares: "Now, therefore, the inquiry into Brahman"—meaning after cultivating the fourfold readiness, one inquires into the source of all existence.',
    explanationTa:
      'உபநிஷத் வாக்கியங்களின் ஒருமித்த பொருளை நான்கு அத்தியாயங்களில் ப்ரம்ம சூத்திரம் தொகுத்தளிக்கிறது. முதல் சூத்திரம், சாதன சதுஷ்டயம் பெற்ற பிறகு ப்ரம்ம விசாரத்தைத் தொடங்க வேண்டும் என்கிறது.',
    pdfNotes: [
      {
        heading: 'Four Chapters of Brahma Sutras',
        body: '1. Samanvaya (Harmony of scripture) · 2. Avirodha (Refutation of objections) · 3. Sadhana (Spiritual disciplines) · 4. Phala (Fruit of Liberation).',
      },
    ],
    pptSlides: [
      {
        title: 'Structure of Brahma Sutram',
        titleTa: 'நான்கு அத்தியாய அமைப்பு',
        bullets: ['Samanvaya', 'Avirodha', 'Sadhana', 'Phala'],
        keyTerm: 'Jijnasa',
      },
    ],
    quiz: [
      {
        question: 'What does "Atha" signify in the first Brahma Sutra ("Athato Brahma Jijnasa")?',
        questionTa: 'முதல் ப்ரம்ம சூத்திரத்தில் "அத" (இப்போது) என்பது எதைக் குறிக்கிறது?',
        options: [
          'After acquiring Sadhana Chatushtaya',
          'At the end of life only',
          'Before learning to read',
          'After ritual wealth',
        ],
        correctIndex: 0,
        explanation: 'Adi Shankara explains that "Atha" indicates "immediately after attaining the fourfold spiritual qualifications."',
      },
    ],
    references: ['Brahma Sutram 1.1.1 & 1.1.2 (Janmadyasya Yatah)'],
    isSampleContent: true,
  },
  {
    id: 'ved-talks-1',
    categoryId: 'talks',
    subcategory: 'Applied Vedanta',
    series: 'Living Wisdom Series',
    chapter: 'Harmony in Modern Life',
    title: 'Inner Stillness Amidst Everyday Responsibilities',
    titleTa: 'அன்றாடக் கடமைகளுக்கு இடையே உள்ளார்ந்த அமைதி',
    teacher: 'Swamiji Teaching Archive (Curated Study Module)',
    durationMinutes: 22,
    summary: 'Practical ways to bring mindfulness, gratitude, and non-reactive clarity into family and workplace life.',
    summaryTa: 'குடும்பம் மற்றும் பணியிடத்தில் பதற்றமின்றி, விழிப்புணர்வுடனும் கருணையுடனும் செயல்படும் கலை.',
    explanation:
      'Spirituality does not demand abandoning daily life; it asks us to transform the inner attitude with which we engage the world. By pausing between stimulus and response, cultivating gratitude, and remembering our deeper stillness, everyday duties become a joyful training ground for wisdom.',
    explanationTa:
      'ஆன்மிகம் என்பது வாழ்க்கையிலிருந்து விலகுவது அல்ல; வாழ்க்கையை அணுகும் மனநிலையைப் பண்படுத்துவதே. ஒவ்வொரு செயலிலும் விழிப்புணர்வுடன் இருப்பதே உண்மையான யோகம்.',
    pdfNotes: [
      {
        heading: 'Three Daily Anchors',
        body: '1. Morning intention · 2. Mindful pause before speech · 3. Evening gratitude and non-judgmental review.',
      },
    ],
    pptSlides: [
      {
        title: 'Transforming Action into Sadhana',
        titleTa: 'செயலே சாதனை',
        bullets: [
          'Pause before reacting.',
          'Serve the task without ego ownership.',
          'End the day in quiet reflection.',
        ],
        keyTerm: 'Nityakarma',
      },
    ],
    quiz: [
      {
        question: 'According to practical Vedanta, what turns ordinary work into spiritual practice?',
        questionTa: 'சாதாரணச் செயலை ஆன்மிகப் பயிற்சியாக மாற்றுவது எது?',
        options: [
          'Working longer hours for praise',
          'Performing duties with awareness, integrity, and non-attachment',
          'Ignoring family obligations',
          'Only chanting during holidays',
        ],
        correctIndex: 1,
        explanation: 'When actions are performed mindfully as service without ego-clinging, work becomes purifying Sadhana.',
      },
    ],
    references: ['Tirukkural 34, Gita 3.19'],
    isSampleContent: true,
  },
  {
    id: 'ved-med-1',
    categoryId: 'meditation',
    subcategory: 'Nididhyasana',
    series: 'Contemplative Stillness',
    chapter: 'Resting as Awareness',
    title: 'Witnessing the Breath & Abiding in Silence',
    titleTa: 'மூச்சுக் கவனிப்பும் அமைதியில் நிலைத்தலும்',
    teacher: 'Swamiji Teaching Archive (Curated Study Module)',
    durationMinutes: 18,
    summary: 'A gentle guided contemplation moving from body relaxation and breath observation to quiet presence.',
    summaryTa: 'உடல் தளர்வு, இயல்பான மூச்சுக் கவனிப்பு மற்றும் எண்ணங்களைக் கடந்து அமைதியில் நிலைக்கும் தியானம்.',
    explanation:
      'Guided contemplation (Nididhyasana) helps intellectual understanding mature into direct stillness. Sit comfortably with an upright spine, notice the natural rhythm of inhalation and exhalation without forcing it, and gently observe thoughts passing like clouds across a spacious sky.',
    explanationTa:
      'உடலைத் தளர்த்தி, முதுகுத்தண்டை நேராக வைத்து, இயல்பாக நடைபெறும் மூச்சைக் கவனிக்கவும். வானத்தில் மேகங்கள் நகர்வது போல எண்ணங்கள் வந்து செல்வதைச் சாட்சியாக நின்று பார்க்கவும்.',
    pdfNotes: [
      {
        heading: 'Four Steps of Quiet Sitting',
        body: '1. Steady posture · 2. Natural breath awareness · 3. Non-judgmental witnessing of thoughts · 4. Resting in open silence.',
      },
    ],
    pptSlides: [
      {
        title: 'From Effort to Effortless Presence',
        titleTa: 'அமைதி தியானம்',
        bullets: [
          'Do not fight thoughts; simply stop feeding them attention.',
          'Notice the quiet awareness in which breath and thought appear.',
        ],
        keyTerm: 'Nididhyasana',
      },
    ],
    quiz: [
      {
        question: 'In Vedantic witness meditation, how should passing thoughts be handled?',
        questionTa: 'சாட்சி தியானத்தில் மனதில் எழும் எண்ணங்களை எவ்வாறு அணுக வேண்டும்?',
        options: [
          'Forcefully suppress every thought',
          'Observe them neutrally without judgment or chasing',
          'Analyze every worry in detail',
          'Stop breathing',
        ],
        correctIndex: 1,
        explanation: 'Neutral witnessing lets thoughts subside naturally while illuminating the unchanging Awareness behind them.',
      },
    ],
    references: ['Bhagavad Gita Chapter 6 (Dhyana Yoga)'],
    isSampleContent: true,
  },
];

export interface WisdomTopic {
  id: string;
  tamil: string;
  english: string;
  intro: string;
  introTa: string;
  historicalBackground: string;
  philosophicalExplanation: string;
  importantConcepts: string[];
  originalScriptures: string[];
  translationsAndCommentaries: string[];
  modernInterpretations: string[];
  relatedLessonIds: string[];
  recommendedBooks: string[];
}

export const WISDOM_TOPICS: WisdomTopic[] = [
  {
    id: 'vedas',
    tamil: 'வேதங்கள்',
    english: 'The Vedas',
    intro: 'The foundational oral wisdom heritage of India comprising Rig, Yajur, Sama, and Atharva Vedas.',
    introTa: 'ரிக், யஜுர், சாம, அதர்வண வேதங்களின் அடிப்படை அறிவும் அதன் தத்துவப் பிரிவுகளும்.',
    historicalBackground: 'Preserved for millennia through meticulous oral recitation traditions (Shruti), organized into Samhitas, Brahmanas, Aranyakas, and Upanishads.',
    philosophicalExplanation: 'While the earlier portions (Karma Kanda) illuminate cosmic harmony and duty, the culminating portions (Jnana Kanda / Upanishads) inquire into ultimate Reality.',
    importantConcepts: ['Rta (Cosmic Order)', 'Yajna (Sacred Offering)', 'Shruti (Heard Wisdom)', 'Brahman'],
    originalScriptures: ['Rigveda Samhita', 'Taittiriya Aranyaka', 'Purusha Sukta & Nasadiya Sukta'],
    translationsAndCommentaries: ['Sayana Acharya Bhashya (Classical Commentary)'],
    modernInterpretations: ['Integral harmony of ecology, inner discipline, and philosophical inquiry'],
    relatedLessonIds: ['ved-intro-1', 'ved-upanishad-1'],
    recommendedBooks: ['book-vedanta-primer'],
  },
  {
    id: 'upanishads',
    tamil: 'உபநிஷத்துக்கள்',
    english: 'Upanishads',
    intro: 'The philosophical crown of the Vedas (Vedanta), exploring consciousness, Brahman, and liberation.',
    introTa: 'வேதங்களின் சாரமாகத் திகழும் உபநிஷத்துக்களின் ஆத்ம மற்றும் பிரம்ம தத்துவம்.',
    historicalBackground: 'Dialogues between sincere seekers and enlightened teachers across forest hermitages.',
    philosophicalExplanation: 'Reveals the non-dual identity between the individual innermost Self (Atman) and the universal Reality (Brahman) via Mahavakyas.',
    importantConcepts: ['Tat Tvam Asi', 'Aham Brahmasmi', 'Prajnanam Brahma', 'Ayam Atma Brahma'],
    originalScriptures: ['Isha', 'Kena', 'Katha', 'Mundaka', 'Mandukya', 'Brihadaranyaka', 'Chandogya'],
    translationsAndCommentaries: ['Adi Shankaracharya Prasthana Traya Bhashya', 'Ramanuja & Madhva Commentaries'],
    modernInterpretations: ['Contemplative psychology of non-dual awareness and fearless living'],
    relatedLessonIds: ['ved-upanishad-1'],
    recommendedBooks: ['book-upanishad-guide'],
  },
  {
    id: 'bhagavad-gita',
    tamil: 'பகவத்கீதை',
    english: 'Bhagavad Gita',
    intro: 'The 700-verse dialogue synthesizing Karma, Bhakti, Raja, and Jnana Yoga.',
    introTa: 'கர்மம், பக்தி, தியானம் மற்றும் ஞானத்தை இணைக்கும் 700 ஸ்லோகங்கள் கொண்ட கீதை.',
    historicalBackground: 'Part of the Bhishma Parva of the Mahabharata, revered as the Smriti Prasthana of Vedanta.',
    philosophicalExplanation: 'Teaches how to act skillfully and compassionately in the world while remaining inwardly anchored in the deathless Self.',
    importantConcepts: ['Karma Yoga', 'Bhakti Yoga', 'Sthitaprajna', 'Samatvam', 'Svadharma'],
    originalScriptures: ['Bhagavad Gita Chapters 1–18 (Mahabharata)'],
    translationsAndCommentaries: ['Shankara Gita Bhashya', 'Subramania Bharati Tamil Gita Translation'],
    modernInterpretations: ['Ethical decision-making, stress-free action, and inner equanimity'],
    relatedLessonIds: ['ved-gita-2'],
    recommendedBooks: ['book-gita-handbook'],
  },
  {
    id: 'brahma-sutram',
    tamil: 'பிரம்ம சூத்திரம்',
    english: 'Brahma Sutram',
    intro: 'Concise aphorisms by Sage Badarayana systematizing Upanishadic philosophy.',
    introTa: 'உபநிஷத் தத்துவங்களைச் சூத்திர வடிவில் தர்க்கரீதியாக நிறுவும் நூல்.',
    historicalBackground: 'Composed to resolve apparent philosophical debates among early Vedic schools.',
    philosophicalExplanation: 'Establishes Brahman as both the material and efficient cause of the cosmos through logical synthesis.',
    importantConcepts: ['Samanvaya', 'Avirodha', 'Sadhana', 'Phala', 'Adhyasa'],
    originalScriptures: ['Brahma Sutram (555 Sutras across 4 Adhyayas)'],
    translationsAndCommentaries: ['Adi Shankara Bhashya', 'Sri Bhashya of Ramanujacharya'],
    modernInterpretations: ['Comparative metaphysics and philosophy of consciousness'],
    relatedLessonIds: ['ved-bs-1'],
    recommendedBooks: ['book-vedanta-primer'],
  },
  {
    id: 'tamil-spiritual',
    tamil: 'தமிழ் ஆன்மிக இலக்கியங்கள்',
    english: 'Tamil Spiritual Literature',
    intro: 'The deep ethical and mystical streams of Thirukkural, Tirumandiram, Tevaram, Divya Prabandham, and Thayumanavar.',
    introTa: 'திருக்குறள், திருமந்திரம், தேவாரம், திருவாசகம், திவ்யப் பிரபந்தம் மற்றும் தாயுமானவர் பாடல்கள்.',
    historicalBackground: 'Spanning over two millennia of Tamil classical poetry uniting ethical civic life with transcendent devotion and Advaitic insight.',
    philosophicalExplanation: 'Demonstrates that compassion (Arul), love (Anbu), and purity of heart (Manathukkan Maasilan) are inseparable from highest realization.',
    importantConcepts: ['Aram (Virtue)', 'Anbu & Arul', 'Mei Unardhal', 'Samarasa Sanmarga'],
    originalScriptures: ['Thirukkural (Arathuppaal & Porutpaal)', 'Tirumandiram', 'Thayumanavar Padalgal'],
    translationsAndCommentaries: ['Parimelazhagar Urai', 'Mu. Varadarajan Commentary'],
    modernInterpretations: ['Universal ethics accessible across cultures and generations'],
    relatedLessonIds: ['ved-talks-1'],
    recommendedBooks: ['book-thirukkural-aram'],
  },
  {
    id: 'siddhanta-intro',
    tamil: 'சித்தாந்த அறிமுகங்கள்',
    english: 'Siddhanta Introductions',
    intro: 'Foundational overview of Saiva Siddhanta and South Indian philosophical traditions.',
    introTa: 'பதி, பசு, பாசம் ஆகிய முப்பொருள் உண்மையை விளக்கும் சைவ சித்தாந்த அறிமுகம்.',
    historicalBackground: 'Rooted in the Agamas, Tirumurai, and the 14 Meykanda Shastras of Tamil Nadu.',
    philosophicalExplanation: 'Explores the relationship between the Supreme (Pati), the individual soul (Pasu), and the three bonds (Pasha: Anava, Karma, Maya).',
    importantConcepts: ['Pati-Pasu-Pasha', 'Charya-Kriya-Yoga-Jnana', 'Arul Shakti'],
    originalScriptures: ['Sivagnana Bodham', 'Tirumandiram'],
    translationsAndCommentaries: ['Sivagnana Munivar Bhashyam'],
    modernInterpretations: ['Gradual maturation of love and selfless service'],
    relatedLessonIds: ['ved-intro-1'],
    recommendedBooks: ['book-thirukkural-aram'],
  },
  {
    id: 'indian-darshanas',
    tamil: 'இந்தியத் தத்துவ மரபுகள்',
    english: 'Indian Philosophical Traditions (Darshanas)',
    intro: 'A balanced map of Nyaya, Vaisheshika, Sankhya, Yoga, Mimamsa, Vedanta, and non-Vedic schools.',
    introTa: 'நியாயம், வைசேஷிகம், சாங்கியம், யோகம், மீமாம்சை மற்றும் வேதாந்த தரிசனங்கள்.',
    historicalBackground: 'Developed through vibrant open debate (Vada) where every school respected logical rigor (Pramana Shastra).',
    philosophicalExplanation: 'Each Darshana serves as a lens ("way of seeing") addressing perception, inference, causality, and liberation.',
    importantConcepts: ['Pramana (Means of Knowledge)', 'Purusha & Prakriti', 'Advaita, Vishishtadvaita, Dvaita'],
    originalScriptures: ['Sankhya Karika', 'Yoga Sutras', 'Tarka Sangraha'],
    translationsAndCommentaries: ['Sarva Darshana Sangraha'],
    modernInterpretations: ['Dialogue between classical Indian epistemology and modern philosophy of mind'],
    relatedLessonIds: ['ved-texts-1'],
    recommendedBooks: ['book-vedanta-primer'],
  },
  {
    id: 'atma-jnana',
    tamil: 'ஆத்ம ஞானம்',
    english: 'Atma Jnana (Self-Knowledge)',
    intro: 'Direct inquiry into the nature of the observer: "Who am I?" beyond body, mind, and roles.',
    introTa: 'உடல், மனம் மற்றும் பாத்திரங்களைக் கடந்த சாட்சியான ஆத்மாவை அறியும் ஞானம்.',
    historicalBackground: 'Central thread running from the Upanishads through Adi Shankara to Ramana Maharshi.',
    philosophicalExplanation: 'Happiness is not obtained by adding external objects, but by removing mistaken self-limitation.',
    importantConcepts: ['Pancha Kosha Viveka', 'Avastha Traya (Waking, Dream, Deep Sleep)', 'Sakshi'],
    originalScriptures: ['Mandukya Upanishad', 'Atma Bodha', 'Ulladu Narpadu'],
    translationsAndCommentaries: ['Gaudapada Karika'],
    modernInterpretations: ['Clarity over identity, inner resilience, and freedom from existential anxiety'],
    relatedLessonIds: ['ved-texts-1', 'ved-med-1'],
    recommendedBooks: ['book-upanishad-guide'],
  },
  {
    id: 'yoga',
    tamil: 'யோகம்',
    english: 'Yoga',
    intro: 'The holistic eightfold path of integration (Ashtanga Yoga) and the four classical Yogas.',
    introTa: 'இயமம், நியமம் முதல் சமாதி வரையிலான அஷ்டாங்க யோகமும் கர்ம-பக்தி-ஞான யோகங்களும்.',
    historicalBackground: 'Codified by Sage Patanjali and expanded practically in the Bhagavad Gita.',
    philosophicalExplanation: 'Yoga is the calming of restless mental fluctuations (Chitta Vritti Nirodha) so the seer abides in its own luminous nature.',
    importantConcepts: ['Yama & Niyama', 'Pranayama', 'Pratyahara', 'Dharana', 'Dhyana', 'Samadhi'],
    originalScriptures: ['Patanjali Yoga Sutras', 'Bhagavad Gita'],
    translationsAndCommentaries: ['Vyasa Bhashya'],
    modernInterpretations: ['Educational lifestyle discipline integrating ethical conduct and mental clarity'],
    relatedLessonIds: ['ved-gita-2', 'ved-med-1'],
    recommendedBooks: ['book-gita-handbook'],
  },
  {
    id: 'meditation-topic',
    tamil: 'தியானம்',
    english: 'Dhyana (Meditation)',
    intro: 'The art of effortless attention, breath awareness, and Vedantic contemplation.',
    introTa: 'மூச்சுக் கவனிப்பு, மந்திர தியானம் மற்றும் சாட்சி பாவனை தியான முறைகள்.',
    historicalBackground: 'Practiced across Vedic, Tamil Siddha, and monastic traditions as the bridge between study and realization.',
    philosophicalExplanation: 'Meditation is not forcing the mind blank; it is noticing the quiet space of awareness that holds every experience.',
    importantConcepts: ['Shravana, Manana, Nididhyasana', 'Sakshi Bhava', 'Silent Presence'],
    originalScriptures: ['Bhagavad Gita Ch. 6', 'Kaivalya Upanishad'],
    translationsAndCommentaries: ['Classical Upanishadic Meditation Guides'],
    modernInterpretations: ['Secular educational mindfulness and contemplative rest (non-medical)'],
    relatedLessonIds: ['ved-med-1'],
    recommendedBooks: ['book-meditation-manual'],
  },
  {
    id: 'aram-living',
    tamil: 'அறம் மற்றும் வாழ்வியல்',
    english: 'Aram & Ethical Living',
    intro: 'Integrating truth, compassion, gratitude, hospitality, and civic responsibility into modern life.',
    introTa: 'வாய்மை, அன்பு, விருந்தோம்பல், நடுவுநிலைமை மற்றும் சமுதாயப் பொறுப்பு.',
    historicalBackground: 'Exemplified in Thirukkural’s Arathuppaal and Porutpaal as universal human dharma.',
    philosophicalExplanation: 'A pure ethical life is both the precondition for spiritual clarity and the natural expression of inner awakening.',
    importantConcepts: ['Aram', 'Manathukkan Maasilan', 'Oppuravu (Social Duty)', 'Saanraanmai'],
    originalScriptures: ['Thirukkural (Kurals 1–1080)', 'Taittiriya Upanishad Shikshavalli'],
    translationsAndCommentaries: ['Classical Tamil Commentaries'],
    modernInterpretations: ['Compassionate citizenship and ethical leadership'],
    relatedLessonIds: ['ved-talks-1'],
    recommendedBooks: ['book-thirukkural-aram'],
  },
];

export interface CertificateProgram {
  id: string;
  title: string;
  titleTa: string;
  description: string;
  requiredLessons: string[];
  passingScore: number;
  quizId: string;
}

export const CERTIFICATE_PROGRAMS: CertificateProgram[] = [
  {
    id: 'cert-thirukkural',
    title: 'Thirukkural Virtue & Polity Programme',
    titleTa: 'திருக்குறள் அறம் மற்றும் பொருள் கல்வித் திட்டம்',
    description: 'Covers foundational chapters of Arathuppaal & Porutpaal and ethical discernment.',
    requiredLessons: ['ved-talks-1'],
    passingScore: 60,
    quizId: 'quiz-thirukkural',
  },
  {
    id: 'cert-vedanta-intro',
    title: 'Introduction to Vedanta Programme',
    titleTa: 'வேதாந்த அறிமுகக் கல்வித் திட்டம்',
    description: 'Covers Sadhana Chatushtaya, Drig Drishya Viveka, and foundational terminology.',
    requiredLessons: ['ved-intro-1', 'ved-texts-1'],
    passingScore: 60,
    quizId: 'quiz-vedanta',
  },
  {
    id: 'cert-gita',
    title: 'Bhagavad Gita Karma & Jnana Course',
    titleTa: 'பகவத்கீதை கர்ம மற்றும் ஞான யோகப் பாடநெறி',
    description: 'Covers Karma Yoga, Sthitaprajna, and contemplative equanimity.',
    requiredLessons: ['ved-gita-2'],
    passingScore: 60,
    quizId: 'quiz-gita',
  },
  {
    id: 'cert-upanishads',
    title: 'Upanishad Essence Learning Course',
    titleTa: 'உபநிஷத் சாரக் கல்விப் பாடநெறி',
    description: 'Covers Isha Upanishad and Brahma Sutram introductory synthesis.',
    requiredLessons: ['ved-upanishad-1', 'ved-bs-1'],
    passingScore: 60,
    quizId: 'quiz-upanishads',
  },
  {
    id: 'cert-meditation',
    title: 'Guided Meditation & Contemplation Programme',
    titleTa: 'தியானம் மற்றும் ஆழ்ந்த சிந்தனைப் பயிற்சித் திட்டம்',
    description: 'Covers breath awareness, witness consciousness, and daily stillness practice.',
    requiredLessons: ['ved-med-1'],
    passingScore: 60,
    quizId: 'quiz-meditation',
  },
];
