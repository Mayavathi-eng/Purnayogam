export type PaalId = 'arathuppaal' | 'porutpaal';

export interface PaalInfo {
  id: PaalId;
  tamil: string;
  english: string;
  chapterCount: number;
  kuralCount: number;
  kuralRange: [number, number];
  descriptionEn: string;
  descriptionTa: string;
}

export interface IyalInfo {
  id: string;
  paalId: PaalId;
  tamil: string;
  english: string;
  chapterRange: [number, number];
}

export interface ChapterInfo {
  number: number; // 1 to 108
  paalId: PaalId;
  iyalId: string;
  tamil: string;
  english: string;
  kuralRange: [number, number];
}

export interface KuralItem {
  number: number; // 1 to 1080
  chapterNumber: number;
  paalId: PaalId;
  iyalId: string;
  tamilLine1: string;
  tamilLine2: string;
  transliteration?: string;
  wordByWordTa: string;
  tamilCommentary: string;
  commentaryAuthor: string;
  englishTranslation: string;
  englishExplanation: string;
  isAuthenticVerified: boolean;
  editorialNote?: string;
  relatedKurals: number[];
  audioUrl?: string;
  videoUrl?: string;
  pdfUrl?: string;
  audioDurationSec?: number;
}

export const THIRUKKURAL_PAALS: PaalInfo[] = [
  {
    id: 'arathuppaal',
    tamil: 'அறத்துப்பால்',
    english: 'Virtue (Arathuppaal)',
    chapterCount: 38,
    kuralCount: 380,
    kuralRange: [1, 380],
    descriptionEn: 'Thirty-eight chapters illuminating righteousness, domestic harmony, compassion, truthfulness, and inner renunciation.',
    descriptionTa: 'அறம், இல்லறம், துறவறம் மற்றும் ஊழ் ஆகிய 38 அதிகாரங்கள், 380 திருக்குறள்கள்.',
  },
  {
    id: 'porutpaal',
    tamil: 'பொருட்பால்',
    english: 'Polity & Wealth (Porutpaal)',
    chapterCount: 70,
    kuralCount: 700,
    kuralRange: [381, 1080],
    descriptionEn: 'Seventy chapters guiding ethical leadership, education, counsel, friendship, civic dignity, and balanced prosperity.',
    descriptionTa: 'அரசியல், அமைச்சியல், அரண், கூழ், படை, நட்பு, குடியியல் ஆகிய 70 அதிகாரங்கள், 700 திருக்குறள்கள்.',
  },
];

export const THIRUKKURAL_IYALS: IyalInfo[] = [
  { id: 'payiraviyal', paalId: 'arathuppaal', tamil: 'பாயிரவியல்', english: 'Prologue', chapterRange: [1, 4] },
  { id: 'illaraviyal', paalId: 'arathuppaal', tamil: 'இல்லறவியல்', english: 'Domestic Virtue', chapterRange: [5, 24] },
  { id: 'thuravaraviyal', paalId: 'arathuppaal', tamil: 'துறவறவியல்', english: 'Ascetic Virtue', chapterRange: [25, 37] },
  { id: 'oozhiyal', paalId: 'arathuppaal', tamil: 'ஊழியல்', english: 'Fate & Cosmic Order', chapterRange: [38, 38] },
  { id: 'arasiyal', paalId: 'porutpaal', tamil: 'அரசியல்', english: 'Royalty & Governance', chapterRange: [39, 63] },
  { id: 'amaichiyal', paalId: 'porutpaal', tamil: 'அமைச்சியல்', english: 'Ministers of State', chapterRange: [64, 73] },
  { id: 'araniyal', paalId: 'porutpaal', tamil: 'அரணியல்', english: 'The Polity & Fortification', chapterRange: [74, 75] },
  { id: 'koozhiyal', paalId: 'porutpaal', tamil: 'கூழியல்', english: 'Ethical Wealth', chapterRange: [76, 76] },
  { id: 'padaiyiyal', paalId: 'porutpaal', tamil: 'படையியல்', english: 'Strength & Valour', chapterRange: [77, 78] },
  { id: 'natpiyal', paalId: 'porutpaal', tamil: 'நட்பியல்', english: 'Friendship & Discernment', chapterRange: [79, 95] },
  { id: 'kudiyiyal', paalId: 'porutpaal', tamil: 'குடியியல்', english: 'Nobility & Civic Life', chapterRange: [96, 108] },
];

const RAW_CHAPTERS: Array<[number, PaalId, string, string, string]> = [
  [1, 'arathuppaal', 'payiraviyal', 'கடவுள் வாழ்த்து', 'The Praise of God'],
  [2, 'arathuppaal', 'payiraviyal', 'வான்சிறப்பு', 'The Blessing of Rain'],
  [3, 'arathuppaal', 'payiraviyal', 'நீத்தார் பெருமை', 'The Greatness of Renunciates'],
  [4, 'arathuppaal', 'payiraviyal', 'அறன்வலியுறுத்தல்', 'Assertion of the Strength of Virtue'],
  [5, 'arathuppaal', 'illaraviyal', 'இல்வாழ்க்கை', 'Domestic Life'],
  [6, 'arathuppaal', 'illaraviyal', 'வாழ்க்கைத் துணைநலம்', 'Worth of a Life Partner'],
  [7, 'arathuppaal', 'illaraviyal', 'மக்கட்பேறு', 'The Wealth of Children'],
  [8, 'arathuppaal', 'illaraviyal', 'அன்புடைமை', 'The Possession of Love'],
  [9, 'arathuppaal', 'illaraviyal', 'விருந்தோம்பல்', 'Hospitality'],
  [10, 'arathuppaal', 'illaraviyal', 'இனியவை கூறல்', 'The Utterance of Pleasant Words'],
  [11, 'arathuppaal', 'illaraviyal', 'செய்ந்நன்றி அறிதல்', 'Gratitude'],
  [12, 'arathuppaal', 'illaraviyal', 'நடுவுநிலைமை', 'Impartiality'],
  [13, 'arathuppaal', 'illaraviyal', 'அடக்கமுடைமை', 'Self-Control'],
  [14, 'arathuppaal', 'illaraviyal', 'ஒழுக்கமுடைமை', 'The Possession of Decorum'],
  [15, 'arathuppaal', 'illaraviyal', 'பிறனில் விழையாமை', 'Not Coveting Another’s Spouse'],
  [16, 'arathuppaal', 'illaraviyal', 'பொறையுடைமை', 'The Possession of Patience'],
  [17, 'arathuppaal', 'illaraviyal', 'அழுக்காறாமை', 'Not Envying'],
  [18, 'arathuppaal', 'illaraviyal', 'வெஃகாமை', 'Not Coveting'],
  [19, 'arathuppaal', 'illaraviyal', 'புறங்கூறாமை', 'Not Backbiting'],
  [20, 'arathuppaal', 'illaraviyal', 'பயனில சொல்லாமை', 'Against Vain Speaking'],
  [21, 'arathuppaal', 'illaraviyal', 'தீவினையச்சம்', 'Dread of Evil Deeds'],
  [22, 'arathuppaal', 'illaraviyal', 'ஒப்புரவறிதல்', 'Duty to Society'],
  [23, 'arathuppaal', 'illaraviyal', 'ஈகை', 'Giving (Charity)'],
  [24, 'arathuppaal', 'illaraviyal', 'புகழ்', 'Renown'],
  [25, 'arathuppaal', 'thuravaraviyal', 'அருளுடைமை', 'Compassion'],
  [26, 'arathuppaal', 'thuravaraviyal', 'புலான்மறுத்தல்', 'Abstinence from Flesh'],
  [27, 'arathuppaal', 'thuravaraviyal', 'தவம்', 'Penance & Austerity'],
  [28, 'arathuppaal', 'thuravaraviyal', 'கூடாவொழுக்கம்', 'Inconsistent Conduct'],
  [29, 'arathuppaal', 'thuravaraviyal', 'கள்ளாமை', 'Absence of Fraud'],
  [30, 'arathuppaal', 'thuravaraviyal', 'வாய்மை', 'Truthfulness'],
  [31, 'arathuppaal', 'thuravaraviyal', 'வெகுளாமை', 'Restraining Anger'],
  [32, 'arathuppaal', 'thuravaraviyal', 'இன்னாசெய்யாமை', 'Not Doing Harm (Ahimsa)'],
  [33, 'arathuppaal', 'thuravaraviyal', 'கொல்லாமை', 'Non-Killing'],
  [34, 'arathuppaal', 'thuravaraviyal', 'நிலையாமை', 'Impermanence'],
  [35, 'arathuppaal', 'thuravaraviyal', 'துறவு', 'Renunciation'],
  [36, 'arathuppaal', 'thuravaraviyal', 'மெய்யுணர்தல்', 'Truth Consciousness'],
  [37, 'arathuppaal', 'thuravaraviyal', 'அவாவறுத்தல்', 'Eradication of Desire'],
  [38, 'arathuppaal', 'oozhiyal', 'ஊழ்', 'Destiny & Moral Law'],
  [39, 'porutpaal', 'arasiyal', 'இறைமாட்சி', 'The Greatness of a Ruler'],
  [40, 'porutpaal', 'arasiyal', 'கல்வி', 'Learning'],
  [41, 'porutpaal', 'arasiyal', 'கல்லாமை', 'Ignorance'],
  [42, 'porutpaal', 'arasiyal', 'கேள்வி', 'Listening to the Wise'],
  [43, 'porutpaal', 'arasiyal', 'அறிவுடைமை', 'The Possession of Wisdom'],
  [44, 'porutpaal', 'arasiyal', 'குற்றங்கடிதல்', 'Correction of Faults'],
  [45, 'porutpaal', 'arasiyal', 'பெரியாரைத் துணைக்கோடல்', 'Seeking the Aid of Great Men'],
  [46, 'porutpaal', 'arasiyal', 'சிற்றினஞ்சேராமை', 'Avoiding Mean Associations'],
  [47, 'porutpaal', 'arasiyal', 'தெரிந்துசெயல்வகை', 'Acting After Due Consideration'],
  [48, 'porutpaal', 'arasiyal', 'வலியறிதல்', 'Judging Strength'],
  [49, 'porutpaal', 'arasiyal', 'காலமறிதல்', 'Knowing the Fitting Time'],
  [50, 'porutpaal', 'arasiyal', 'இடனறிதல்', 'Judging the Place'],
  [51, 'porutpaal', 'arasiyal', 'தெரிந்துதெளிதல்', 'Testing & Trusting'],
  [52, 'porutpaal', 'arasiyal', 'தெரிந்துவினையாடல்', 'Selection & Employment'],
  [53, 'porutpaal', 'arasiyal', 'சுற்றந்தழால்', 'Cherishing Kindred'],
  [54, 'porutpaal', 'arasiyal', 'பொச்சாவாமை', 'Unforgetfulness'],
  [55, 'porutpaal', 'arasiyal', 'செங்கோன்மை', 'The Right Sceptre'],
  [56, 'porutpaal', 'arasiyal', 'கொடுங்கோன்மை', 'The Cruel Sceptre'],
  [57, 'porutpaal', 'arasiyal', 'வெருவந்தசெய்யாமை', 'Absence of Terrorism'],
  [58, 'porutpaal', 'arasiyal', 'கண்ணோட்டம்', 'Benignity'],
  [59, 'porutpaal', 'arasiyal', 'ஒற்றாடல்', 'Detectives & Vigilance'],
  [60, 'porutpaal', 'arasiyal', 'ஊக்கமுடைமை', 'Energy & Zeal'],
  [61, 'porutpaal', 'arasiyal', 'மடியின்மை', 'Freedom from Sloth'],
  [62, 'porutpaal', 'arasiyal', 'ஆள்வினையுடைமை', 'Manly Effort'],
  [63, 'porutpaal', 'arasiyal', 'இடுக்கணழியாமை', 'Hopefulness in Trouble'],
  [64, 'porutpaal', 'amaichiyal', 'அமைச்சு', 'The Office of Minister'],
  [65, 'porutpaal', 'amaichiyal', 'சொல்வன்மை', 'Power of Speech'],
  [66, 'porutpaal', 'amaichiyal', 'வினைத்தூய்மை', 'Purity in Action'],
  [67, 'porutpaal', 'amaichiyal', 'வினைத்திட்பம்', 'Power in Action'],
  [68, 'porutpaal', 'amaichiyal', 'வினைசெயல்வகை', 'Modes of Action'],
  [69, 'porutpaal', 'amaichiyal', 'தூது', 'The Envoy'],
  [70, 'porutpaal', 'amaichiyal', 'மன்னரைச் சேர்ந்தொழுகல்', 'Conduct in the Presence of Rulers'],
  [71, 'porutpaal', 'amaichiyal', 'குறிப்பறிதல்', 'Divining the Mind'],
  [72, 'porutpaal', 'amaichiyal', 'அவையறிதல்', 'Judging the Audience'],
  [73, 'porutpaal', 'amaichiyal', 'அவையஞ்சாமை', 'Not to Dread the Council'],
  [74, 'porutpaal', 'araniyal', 'நாடு', 'The Country'],
  [75, 'porutpaal', 'araniyal', 'அரண்', 'The Fortification'],
  [76, 'porutpaal', 'koozhiyal', 'பொருள்செயல்வகை', 'Way of Making Wealth'],
  [77, 'porutpaal', 'padaiyiyal', 'படைமாட்சி', 'The Excellence of an Army'],
  [78, 'porutpaal', 'padaiyiyal', 'படைச்செருக்கு', 'Military Spirit'],
  [79, 'porutpaal', 'natpiyal', 'நட்பு', 'Friendship'],
  [80, 'porutpaal', 'natpiyal', 'நட்பாராய்தல்', 'Investigation in Forming Friendships'],
  [81, 'porutpaal', 'natpiyal', 'பழைமை', 'Familiarity'],
  [82, 'porutpaal', 'natpiyal', 'தீ நட்பு', 'Evil Friendship'],
  [83, 'porutpaal', 'natpiyal', 'கூடாநட்பு', 'Unreal Friendship'],
  [84, 'porutpaal', 'natpiyal', 'பேதைமை', 'Folly'],
  [85, 'porutpaal', 'natpiyal', 'புல்லறிவாண்மை', 'Ignorance & Conceit'],
  [86, 'porutpaal', 'natpiyal', 'இகல்', 'Hostility'],
  [87, 'porutpaal', 'natpiyal', 'பகைமாட்சி', 'The Might of Hatred'],
  [88, 'porutpaal', 'natpiyal', 'பகைத்திறந்தெரிதல்', 'Knowing the Quality of Hate'],
  [89, 'porutpaal', 'natpiyal', 'உட்பகை', 'Enmity Within'],
  [90, 'porutpaal', 'natpiyal', 'பெரியாரைப் பிழையாமை', 'Not Offending the Great'],
  [91, 'porutpaal', 'natpiyal', 'பெண்வழிச்சேறல்', 'Being Led by Passion'],
  [92, 'porutpaal', 'natpiyal', 'வரைவின்மகளிர்', 'Wanton Women'],
  [93, 'porutpaal', 'natpiyal', 'கள்ளுண்ணாமை', 'Not Drinking Intoxicants'],
  [94, 'porutpaal', 'natpiyal', 'சூது', 'Gaming'],
  [95, 'porutpaal', 'natpiyal', 'மருந்து', 'Medicine'],
  [96, 'porutpaal', 'kudiyiyal', 'குடிமை', 'Nobility'],
  [97, 'porutpaal', 'kudiyiyal', 'மானம்', 'Honour'],
  [98, 'porutpaal', 'kudiyiyal', 'பெருமை', 'Greatness'],
  [99, 'porutpaal', 'kudiyiyal', 'சான்றாண்மை', 'Perfection of Character'],
  [100, 'porutpaal', 'kudiyiyal', 'பண்புடைமை', 'Courtesy'],
  [101, 'porutpaal', 'kudiyiyal', 'நன்றியில்செல்வம்', 'Wealth Without Benefaction'],
  [102, 'porutpaal', 'kudiyiyal', 'நாணுடைமை', 'Sensitiveness to Shame'],
  [103, 'porutpaal', 'kudiyiyal', 'குடிசெயல்வகை', 'The Way of Maintaining the Family'],
  [104, 'porutpaal', 'kudiyiyal', 'உழவு', 'Agriculture'],
  [105, 'porutpaal', 'kudiyiyal', 'நல்குரவு', 'Poverty'],
  [106, 'porutpaal', 'kudiyiyal', 'இரவு', 'Mendicancy'],
  [107, 'porutpaal', 'kudiyiyal', 'இரவச்சம்', 'Dread of Mendicancy'],
  [108, 'porutpaal', 'kudiyiyal', 'கயமை', 'Baseness'],
];

export const THIRUKKURAL_CHAPTERS: ChapterInfo[] = RAW_CHAPTERS.map(
  ([number, paalId, iyalId, tamil, english]) => ({
    number,
    paalId,
    iyalId,
    tamil,
    english,
    kuralRange: [(number - 1) * 10 + 1, number * 10],
  })
);

// Verified authentic classical Kurals curated across key chapters
const AUTHENTIC_KURALS: Record<number, Omit<KuralItem, 'chapterNumber' | 'paalId' | 'iyalId'>> = {
  1: {
    number: 1,
    tamilLine1: 'அகர முதல எழுத்தெல்லாம் ஆதி',
    tamilLine2: 'பகவன் முதற்றே உலகு.',
    transliteration: 'Agara mudhala ezhuthellam aadhi / Bhagavan mudhatre ulagu.',
    wordByWordTa: 'அகர முதல எழுத்தெல்லாம் — அனைத்து எழுத்துக்களும் அகரத்தை முதலாகக் கொண்டவை; ஆதி பகவன் முதற்றே உலகு — அதுபோல் இவ்வுலகம் ஆதி பகவனை முதலாக உடையது.',
    tamilCommentary: 'எழுத்துக்கள் எல்லாம் அகரத்தைத் தொடக்கமாகக் கொண்டிருப்பது போல, உயிர்களும் உலகமும் ஆதி பகவனைத் தொடக்கமாகக் கொண்டுள்ளன.',
    commentaryAuthor: 'Classical Tamil Commentary (Parimelazhagar & Mu.Va. Tradition)',
    englishTranslation: 'As the letter A is the first of all letters, so the Eternal Source is the origin of the universe.',
    englishExplanation: 'Just as every articulated sound in language depends upon the primal vowel "A", all cosmic existence rests upon one timeless, non-dual Reality.',
    isAuthenticVerified: true,
    relatedKurals: [2, 10, 355],
  },
  2: {
    number: 2,
    tamilLine1: 'கற்றதனால் ஆய பயனென்கொல் வாலறிவன்',
    tamilLine2: 'நற்றாள் தொழாஅர் எனின்.',
    transliteration: 'Kattradhanaal aaya payanenkol vaalarivan / Natraal thozhaar enin.',
    wordByWordTa: 'கற்றதனால் ஆய பயன் என்கொல் — கற்ற கல்வியால் உண்டான பயன் என்ன?; வாலறிவன் நற்றாள் தொழாஅர் எனின் — தூய அறிவு வடிவான இறைவனின் திருவடிகளை வணங்காராயின்.',
    tamilCommentary: 'தூய மெய்யறிவு வடிவான இறைவனைப் பணிந்து உணராத கல்வி தன் உயர்ந்த பயனை அடையாது.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'What is the fruit of all learning if it does not bow in humility before Pure Consciousness?',
    englishExplanation: 'True scholarship is not mere accumulation of facts; its culmination is reverence, ego-humility, and realization of Pure Awareness (Valarivan).',
    isAuthenticVerified: true,
    relatedKurals: [1, 355, 391],
  },
  31: {
    number: 31,
    tamilLine1: 'சிறப்புஈனும் செல்வமும் ஈனும் அறத்தினூஉங்கு',
    tamilLine2: 'ஆக்கம் எவனோ உயிர்க்கு.',
    transliteration: 'Sirappu eenum selvamum eenum arathinoongu / Aakkam evano uyirkku.',
    wordByWordTa: 'சிறப்பு ஈனும் — வீடுபேற்றையும் தரும்; செல்வமும் ஈனும் — இம்மைச் செல்வத்தையும் தரும்; அறத்தினூஉங்கு ஆக்கம் எவனோ உயிர்க்கு — அறத்தை விட உயிர்க்கு மேலான நன்மை எது?',
    tamilCommentary: 'மனித வாழ்வில் மேன்மையையும் நிலைத்த நலத்தையும் தருவது அறமே; உயிர்க்கு அதைவிடச் சிறந்த செல்வம் வேறில்லை.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'Virtue yields both inner nobility and true prosperity; what greater good exists for any living being?',
    englishExplanation: 'Dharma (Aram) is not opposed to wellbeing—it is the enduring foundation of both spiritual liberation and harmonious worldly life.',
    isAuthenticVerified: true,
    relatedKurals: [32, 34, 35],
  },
  34: {
    number: 34,
    tamilLine1: 'மனத்துக்கண் மாசிலன் ஆதல் அனைத்துஅறன்',
    tamilLine2: 'ஆகுல நீர பிற.',
    transliteration: 'Manathukkan maasilan aadhal anaitharan / Aagula neera pira.',
    wordByWordTa: 'மனத்துக்கண் மாசிலன் ஆதல் — மனத்தில் குற்றமற்றவனாக இருத்தலே; அனைத்து அறன் — எல்லா அறமும் ஆகும்; ஆகுல நீர பிற — மற்றவை ஆரவாரத் தன்மையனவே.',
    tamilCommentary: 'உள்ளத்தில் மாசற்ற தூய்மையுடன் வாழ்வதே முழுமையான அறம்; வெளிப்படையான ஆரவாரச் சடங்குகள் அனைத்தும் வெறும் தோற்றமே.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'Being spotless in mind is the entirety of virtue; all else is mere outward display.',
    englishExplanation: 'Thiruvalluvar distills ethics to inner purity of intention (Chitta Shuddhi), echoing the central preparation for Vedantic Self-knowledge.',
    isAuthenticVerified: true,
    relatedKurals: [31, 35, 291],
  },
  35: {
    number: 35,
    tamilLine1: 'அழுக்காறு அவாவெகுளி இன்னாச்சொல் நான்கும்',
    tamilLine2: 'இழுக்கா இயன்றது அறம்.',
    transliteration: 'Azhukkaaru avaaveguli innaachol naangum / Izhukkaa iyandradhu aram.',
    wordByWordTa: 'அழுக்காறு — பொறாமை; அவா — பேராசை; வெகுளி — சினம்; இன்னாச்சொல் — கடுஞ்சொல்; நான்கும் இழுக்கா இயன்றது அறம் — இந்நான்கும் நீக்கி நடப்பதே அறம்.',
    tamilCommentary: 'பொறாமை, பேராசை, கோபம், கடுஞ்சொல் ஆகிய நான்கு குற்றங்களையும் விலக்கி வாழும் நெறியே அறமாகும்.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'Virtue is living free from four faults: envy, greed, anger, and harsh speech.',
    englishExplanation: 'Ethical living is defined practically through daily emotional self-mastery across thought, desire, temperament, and speech.',
    isAuthenticVerified: true,
    relatedKurals: [34, 305, 319],
  },
  79: {
    number: 79,
    tamilLine1: 'புறத்துறுப்பு எல்லாம் எவன்செய்யும் யாக்கை',
    tamilLine2: 'அகத்துறுப்பு அன்பில் அவர்க்கு.',
    transliteration: 'Purathuruppu ellaam evanseyyum yaakkai / Agathuruppu anbil avarkku.',
    wordByWordTa: 'புறத்துறுப்பு எல்லாம் எவன் செய்யும் — வெளி உறுப்புகள் எல்லாம் என்ன பயன் தரும்?; யாக்கை அகத்துறுப்பு அன்பு இலவர்க்கு — உடலின் அக உறுப்பாகிய அன்பு இல்லாதவர்க்கு.',
    tamilCommentary: 'உள்ளத்தில் அன்பு இல்லாதவர்க்கு எவ்வளவு அழகான புற உறுப்புகள் இருந்தாலும் பயனில்லை.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'Of what avail are all external limbs if the inner organ of love is absent?',
    englishExplanation: 'Love and empathy are described as the vital inner faculty of a human being, without which outward form lacks spiritual life.',
    isAuthenticVerified: true,
    relatedKurals: [80, 241],
  },
  80: {
    number: 80,
    tamilLine1: 'அன்பின் வழியது உயிர்நிலை அஃதிலார்க்கு',
    tamilLine2: 'என்புதோல் போர்த்த உடம்பு.',
    transliteration: 'Anbin vazhiyadhu uyirnilai ahdhilaarkku / Enbuthol porththa udambu.',
    wordByWordTa: 'அன்பின் வழியது உயிர்நிலை — அன்பின் வழியில் இயங்குவதே உயிருள்ள நிலை; அஃதிலார்க்கு என்பு தோல் போர்த்த உடம்பு — அன்பில்லாதவர்க்கு உடல் எலும்பைத் தோலால் போர்த்த கூடு மட்டுமே.',
    tamilCommentary: 'அன்புடன் வாழும் உடலே உயிருள்ள உடலாகும்; அன்பற்ற உடல் வெறும் எலும்பும் தோலும் கொண்ட கூடு.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'A body rooted in love is truly alive; without it, the frame is merely bone wrapped in skin.',
    englishExplanation: 'Compassion and universal love distinguish a conscious spiritual life from mere biological existence.',
    isAuthenticVerified: true,
    relatedKurals: [79, 241, 243],
  },
  241: {
    number: 241,
    tamilLine1: 'அருட்செல்வம் செல்வத்துள் செல்வம் பொருட்செல்வம்',
    tamilLine2: 'பூரியார் கண்ணும் உள.',
    transliteration: 'Arutselvam selvathul selvam porutselvam / Pooriyaar kannum ula.',
    wordByWordTa: 'அருட்செல்வம் செல்வத்துள் செல்வம் — கருணையாகிய செல்வமே எல்லாச் செல்வத்திலும் மேலானது; பொருட்செல்வம் பூரியார் கண்ணும் உள — பொருள் செல்வம் பண்பற்றவரிடமும் இருக்கும்.',
    tamilCommentary: 'எல்லாச் செல்வங்களிலும் உயர்ந்த செல்வம் அருளாகிய கருணையே; வெறும் பணம் தகுதியற்றவரிடத்தும் காணப்படும்.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'Compassion is the wealth of all wealth; material riches are found even among the unrefined.',
    englishExplanation: 'Inner grace and kindness toward all beings are an imperishable wealth that defines spiritual maturity.',
    isAuthenticVerified: true,
    relatedKurals: [80, 243, 314],
  },
  291: {
    number: 291,
    tamilLine1: 'வாய்மை எனப்படுவது யாதெனின் யாதொன்றும்',
    tamilLine2: 'தீமை இலாத சொலல்.',
    transliteration: 'Vaaimai enappaduvadhu yaadhenin yaadhondrum / Theemai ilaadha solal.',
    wordByWordTa: 'வாய்மை எனப்படுவது யாதெனின் — உண்மை என்று கூறப்படுவது எதுவென்றால்; யாதொன்றும் தீமை இலாத சொலல் — எவ்வுயிர்க்கும் சிறிதும் தீங்கு தராத சொற்களைப் பேசுதலே.',
    tamilCommentary: 'எவருக்கும் எந்தத் தீங்கும் விளைவிக்காத தூய சொற்களைப் பேசுதலே உண்மையான வாய்மையாகும்.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'If asked what truthfulness is, it is speaking words wholly free of harm to any being.',
    englishExplanation: 'Truth in the Tirukkural is united with non-violence (Ahimsa): factual accuracy divorced from compassion is not spiritual truth.',
    isAuthenticVerified: true,
    relatedKurals: [292, 295, 314],
  },
  295: {
    number: 295,
    tamilLine1: 'மனத்தொடு வாய்மை மொழியின் தவத்தொடு',
    tamilLine2: 'தானம் செய்வாரின் தலை.',
    transliteration: 'Manathodu vaaimai mozhiyin thavathodu / Dhaanam seivaarin thalai.',
    wordByWordTa: 'மனத்தொடு வாய்மை மொழியின் — மனச்சாட்சிக்கு ஏற்ப உண்மை பேசினால்; தவத்தொடு தானம் செய்வாரின் தலை — தவமும் தானமும் செய்பவர்களை விட மேலானவராவார்.',
    tamilCommentary: 'தன் மனச்சாட்சியுடன் ஒன்றி உண்மையைப் பேசுபவர், பெருந்தவமும் தானமும் செய்பவர்களை விடச் சிறந்தவர்.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'One who speaks truth in harmony with their conscience stands above those who practice austerity and charity.',
    englishExplanation: 'Integrity between inner conviction and outward speech surpasses external asceticism.',
    isAuthenticVerified: true,
    relatedKurals: [291, 34, 355],
  },
  314: {
    number: 314,
    tamilLine1: 'இன்னாசெய் தாரை ஒறுத்தல் அவர்நாண',
    tamilLine2: 'நன்னயம் செய்து விடல்.',
    transliteration: 'Innaaseidhaarai oruthal avarnaana / Nannayam seidhu vidal.',
    wordByWordTa: 'இன்னா செய்தாரை ஒறுத்தல் — நமக்குத் தீமை செய்தவரைத் தண்டிக்கும் வழி; அவர் நாண நன்னயம் செய்து விடல் — அவரே வெட்கப்படுமாறு நன்மை செய்து மன்னிப்பதே.',
    tamilCommentary: 'தீங்கு செய்தவர்க்குத் திரும்பத் தீங்கு செய்யாமல், அவர் வெட்கப்பட்டுத் திருந்துமாறு நன்மை செய்வதே உயர்ந்த பண்பு.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'The finest answer to those who wrong you is to return such kindness that they feel ashamed of their harm.',
    englishExplanation: 'Forgiveness expressed through active goodwill transforms conflict without perpetuating resentment.',
    isAuthenticVerified: true,
    relatedKurals: [291, 241, 983],
  },
  355: {
    number: 355,
    tamilLine1: 'எப்பொருள் எத்தன்மைத் தாயினும் அப்பொருள்',
    tamilLine2: 'மெய்ப்பொருள் காண்பது அறிவு.',
    transliteration: 'Epporul ethanmaithu aayinum apporul / Meipporul kaanbadhu arivu.',
    wordByWordTa: 'எப்பொருள் எத்தன்மைத்து ஆயினும் — எந்தப் பொருள் எந்தத் தோற்றத்தில் இருந்தாலும்; அப்பொருள் மெய்ப்பொருள் காண்பது அறிவு — அதன் உள்ளார்ந்த மெய்ம்மையைக் காண்பதே அறிவு.',
    tamilCommentary: 'எல்லாப் பொருள்களின் புறத் தோற்றத்தைக் கடந்து, அவற்றின் உள்ளே உறையும் மெய்ம்மைப் பொருளைக் காண்பதே மெய்யறிவு.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'Whatever appearance any thing may bear, discerning its underlying Truth is true wisdom.',
    englishExplanation: 'A classic bridge between Tamil wisdom and Advaita Vedanta: penetrating transient phenomena (Maya/appearance) to perceive eternal Reality (Sat/Truth).',
    isAuthenticVerified: true,
    relatedKurals: [1, 356, 423],
  },
  358: {
    number: 358,
    tamilLine1: 'பிறப்பென்னும் பேதைமை நீங்கச் சிறப்பென்னும்',
    tamilLine2: 'செம்பொருள் காண்பது அறிவு.',
    transliteration: 'Pirappennum pedhaimai neenga sirappennum / Semporul kaanbadhu arivu.',
    wordByWordTa: 'பிறப்பென்னும் பேதைமை நீங்க — பிறப்புக்குக் காரணமான அறியாமை நீங்க; சிறப்பென்னும் செம்பொருள் காண்பது அறிவு — வீடுபேற்றைத் தரும் செம்பொருளை உணர்வதே அறிவு.',
    tamilCommentary: 'மீண்டும் மீண்டும் பிறவிக்கு வித்திடும் அறியாமை (அவித்யை) நீங்க, உயர்ந்த மெய்ப்பொருளை உணர்வதே மெய்ஞ்ஞானம்.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'Dispelling the ignorance that binds one to rebirth by beholding the Supreme Reality is true knowledge.',
    englishExplanation: 'Directly parallels the Upanishadic teaching that Self-knowledge (Atma Jnana) dissolves Avidya and leads to Moksha.',
    isAuthenticVerified: true,
    relatedKurals: [355, 359, 360],
  },
  391: {
    number: 391,
    tamilLine1: 'கற்க கசடறக் கற்பவை கற்றபின்',
    tamilLine2: 'நிற்க அதற்குத் தக.',
    transliteration: 'Karka kasadarak karpavai katrappin / Nirka adharkuth thaga.',
    wordByWordTa: 'கற்க கசடறக் கற்பவை — கற்கத் தகுந்த நூல்களை ஐயமும் பிழையுமின்றிக் கற்க; கற்றபின் நிற்க அதற்குத் தக — கற்ற பின் அவ்வழி நடக்க வேண்டும்.',
    tamilCommentary: 'கற்க வேண்டிய உயர்ந்த நூல்களைத் தெளிவாகக் கற்று, கற்ற அறிவின்படி வாழ்வில் ஒழுகுவதே கல்வியின் முழுமை.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'Learn thoroughly whatever is worthy to be learned; having learned, live in accordance with that wisdom.',
    englishExplanation: 'Knowledge is fulfilled only when internalized into daily character and ethical action.',
    isAuthenticVerified: true,
    relatedKurals: [2, 396, 423],
  },
  396: {
    number: 396,
    tamilLine1: 'தொட்டனைத் தூறும் மணற்கேணி மாந்தர்க்குக்',
    tamilLine2: 'கற்றனைத் தூறும் அறிவு.',
    transliteration: 'Thottanaith thoorum manarkeni maantharkku / Kattranaith thoorum arivu.',
    wordByWordTa: 'தொட்டனைத்து ஊறும் மணற்கேணி — தோண்டிய அளவிற்கு மணற்கேணியில் நீர் ஊறும்; மாந்தர்க்குக் கற்றனைத்து ஊறும் அறிவு — அதுபோலக் கற்ற அளவிற்கு அறிவு பெருகும்.',
    tamilCommentary: 'மணல் கிணற்றை எவ்வளவு ஆழமாகத் தோண்டுகிறோமோ அவ்வளவு நீர் சுரப்பது போல, ஆழ்ந்து கற்கக் கற்க ஞானம் ஊற்றெடுக்கும்.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'As water springs up the deeper one digs in a sandy well, so wisdom wells up the deeper one learns.',
    englishExplanation: 'Continuous contemplative study (Shravana & Manana) uncovers limitless clarity within the seeker.',
    isAuthenticVerified: true,
    relatedKurals: [391, 423, 595],
  },
  423: {
    number: 423,
    tamilLine1: 'எப்பொருள் யார்யார்வாய்க் கேட்பினும் அப்பொருள்',
    tamilLine2: 'மெய்ப்பொருள் காண்பது அறிவு.',
    transliteration: 'Epporul yaaryaavaai ketpinum apporul / Meipporul kaanbadhu arivu.',
    wordByWordTa: 'எப்பொருள் யார்யார் வாய்க் கேட்பினும் — எந்தக் கருத்தை யாரிடமிருந்து கேட்டாலும்; அப்பொருள் மெய்ப்பொருள் காண்பது அறிவு — அதன் உண்மைத் தன்மையை ஆராய்ந்து அறிவதே அறிவு.',
    tamilCommentary: 'யார் சொன்னாலும் கண்மூடித்தனமாக ஏற்காமல், பகுத்தறிவுடன் அதன் மெய்ப்பொருளை ஆராய்ந்து உணர்வதே அறிவுடைமை.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'From whomever one hears any teaching, discerning its essential truth through inquiry is wisdom.',
    englishExplanation: 'Encourages fearless, discerning inquiry (Viveka) rather than blind acceptance.',
    isAuthenticVerified: true,
    relatedKurals: [355, 391, 429],
  },
  595: {
    number: 595,
    tamilLine1: 'வெள்ளத்து அனைய மலர்நீட்டம் மாந்தர்தம்',
    tamilLine2: 'உள்ளத்து அனையது உயர்வு.',
    transliteration: 'Vellathu anaiya malarneetam maanthardham / Ullathu anaiyadhu uyarvu.',
    wordByWordTa: 'வெள்ளத்து அனைய மலர் நீட்டம் — நீரின் உயரத்திற்கு ஏற்பத் தாமரைத் தண்டு நீளும்; மாந்தர்தம் உள்ளத்து அனையது உயர்வு — மனிதரின் உயர்வு அவரது உள்ளத்தின் ஊக்கத்தைப் பொறுத்தது.',
    tamilCommentary: 'நீரின் ஆழத்திற்கு ஏற்பத் தாமரை மலர் உயர்ந்து நிற்பது போல, மனிதனின் மேன்மை அவன் உள்ளத்தின் உறுதியைப் பொறுத்தே அமையும்.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'The height of the lotus stem matches the depth of the water; a person’s stature matches the depth of their aspiration.',
    englishExplanation: 'Inner resolve and expansive vision elevate human potential beyond external circumstances.',
    isAuthenticVerified: true,
    relatedKurals: [396, 611, 983],
  },
  784: {
    number: 784,
    tamilLine1: 'நகுதற் பொருட்டன்று நட்டல் மிகுதிக்கண்',
    tamilLine2: 'மேற்சென்று இடித்தற் பொருட்டு.',
    transliteration: 'Naguthar poruttandru nattal migudhikan / Mersendru idithar poruttu.',
    wordByWordTa: 'நகுதற் பொருட்டன்று நட்டல் — நட்பு என்பது சிரித்துப் பேச மட்டும் அல்ல; மிகுதிக்கண் மேற்சென்று இடித்தற் பொருட்டு — நண்பர் தவறு செய்யும்போது முற்பட்டுத் திருத்துவதற்கே.',
    tamilCommentary: 'உண்மையான நட்பு இன்பப் பொழுதுபோக்கிற்கு மட்டுமன்று; நண்பர் நெறி தவறும்போது அன்புடன் இடித்துரைத்து நல்வழிப்படுத்துவதற்கே.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'Friendship is not merely for pleasant laughter; it exists to counsel firmly when a friend goes astray.',
    englishExplanation: 'True spiritual fellowship (Satsanga) protects our integrity with affectionate candour.',
    isAuthenticVerified: true,
    relatedKurals: [786, 795, 991],
  },
  983: {
    number: 983,
    tamilLine1: 'அன்புநாண் ஒப்புரவு கண்ணோட்டம் வாய்மையொடு',
    tamilLine2: 'ஐந்துசால்பு ஊன்றிய தூண்.',
    transliteration: 'Anbunaan oppuravu kannottam vaaimaiyodu / Aindhusaalbu oondriya thoon.',
    wordByWordTa: 'அன்பு — கருணை; நாண் — பழிக்கு அஞ்சுதல்; ஒப்புரவு — உலகிற்கு உதவுதல்; கண்ணோட்டம் — இரக்கம்; வாய்மை — உண்மை; ஐந்து சால்பு ஊன்றிய தூண் — சான்றாண்மையைத் தாங்கும் ஐந்து தூண்கள்.',
    tamilCommentary: 'அன்பு, நாணம், ஒப்புரவு, இரக்கம், வாய்மை ஆகிய ஐந்து பண்புகளும் சான்றாண்மை எனும் மாளிகையைத் தாங்கும் தூண்களாகும்.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'Love, moral modesty, beneficence, graciousness, and truthfulness are the five pillars upholding nobility of character.',
    englishExplanation: 'Summarizes the mature, integrated human ideal (Saanraanmai) where inner stillness flowers into universal service.',
    isAuthenticVerified: true,
    relatedKurals: [34, 241, 291, 991],
  },
  991: {
    number: 991,
    tamilLine1: 'எண்பதத்தால் எய்தல் எளிதென்ப யார்மாட்டும்',
    tamilLine2: 'பண்புடைமை என்னும் வழக்கு.',
    transliteration: 'Enbadhathaal eidhal elidhenba yaarmaattum / Panbudaimai ennum vazhakku.',
    wordByWordTa: 'எண்பதத்தால் எய்தல் எளிது என்ப — எளிமையாகப் பழகுவதால் அடைவது எளிது; யார்மாட்டும் பண்புடைமை என்னும் வழக்கு — யாவரிடமும் அன்புடன் பழகும் பண்புடைமை.',
    tamilCommentary: 'அனைவரிடமும் எளிமையாகவும் மரியாதையுடனும் பழகினால் பண்புடைமை எனும் உயர்ந்த நெறியை எளிதில் அடையலாம்.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'Approachability and humility toward all make the noble path of courtesy effortless to attain.',
    englishExplanation: 'Humility is the hallmark of realized wisdom—accessible to every seeker regardless of station.',
    isAuthenticVerified: true,
    relatedKurals: [79, 983, 996],
  },
  996: {
    number: 996,
    tamilLine1: 'பண்புடையார்ப் பட்டுண்டு உலகம் அதுஇன்றேல்',
    tamilLine2: 'மண்புக்கு மாய்வது மன்.',
    transliteration: 'Panbudaiyaar pattundu ulagam adhuindrel / Manpukku maaivadhu man.',
    wordByWordTa: 'பண்புடையார்ப் பட்டு உண்டு உலகம் — உயர்ந்த பண்புடையவர்களால்தான் இவ்வுலகம் நிலைத்திருக்கிறது; அது இன்றேல் மண்புக்கு மாய்வது மன் — இல்லையெனில் மண்ணோடு மண்ணாக அழிந்துவிடும்.',
    tamilCommentary: 'நற்பண்பு உடைய சான்றோர்களின் இருப்பினாலேயே இவ்வுலகம் இயங்குகிறது; அவர்கள் இல்லாவிடில் உலகம் அழிந்துபோம்.',
    commentaryAuthor: 'Classical Tamil Commentary',
    englishTranslation: 'The world endures because of people of noble character; without them, it would crumble into dust.',
    englishExplanation: 'Society is sustained not by power alone, but by quiet ethical integrity and compassionate souls.',
    isAuthenticVerified: true,
    relatedKurals: [983, 991, 31],
  },
};

export const VERIFIED_KURAL_NUMBERS: number[] = Object.keys(AUTHENTIC_KURALS).map(Number).sort((a, b) => a - b);

export function getChapterForKural(kuralNumber: number): ChapterInfo {
  const clamped = Math.max(1, Math.min(1080, Math.floor(kuralNumber)));
  const chapterIndex = Math.floor((clamped - 1) / 10);
  return THIRUKKURAL_CHAPTERS[chapterIndex];
}

export function getKuralByNumber(kuralNumber: number): KuralItem {
  const num = Math.max(1, Math.min(1080, Math.floor(kuralNumber)));
  const chapter = getChapterForKural(num);
  const authentic = AUTHENTIC_KURALS[num];

  if (authentic) {
    return {
      ...authentic,
      chapterNumber: chapter.number,
      paalId: chapter.paalId,
      iyalId: chapter.iyalId,
    };
  }

  return {
    number: num,
    chapterNumber: chapter.number,
    paalId: chapter.paalId,
    iyalId: chapter.iyalId,
    tamilLine1: `அதிகாரம் ${chapter.number}: ${chapter.tamil} — குறள் ${num}`,
    tamilLine2: 'திருவள்ளுவர் அருளிய மூலத் திருக்குறள் (ஆசிரியர் குழுப் பதிப்பிற்குரியது)',
    wordByWordTa: 'மாதிரிப் பதிவு: இக்குறளுக்கான பதவுரை மற்றும் விளக்கவுரை நிர்வாகப் பகுதியின் (Admin CMS) வழியாகச் சரிபார்க்கப்பட்டு வெளியிடப்படும்.',
    tamilCommentary: `திருக்குறளின் ${chapter.tamil} (அதிகாரம் ${chapter.number}) பகுதியில் உள்ள ${num}-ஆம் குறளுக்கான ஆய்வுப் பதிவு.`,
    commentaryAuthor: 'Editorial Slot · Awaiting Verified Commentary',
    englishTranslation: `Kural ${num} — Chapter ${chapter.number}: ${chapter.english} (${chapter.tamil})`,
    englishExplanation:
      'Sample / Editorial Slot: PURNA YOGAM preserves all 1,080 Kural indices across Arathuppaal (380) and Porutpaal (700) without fabricating verses. Administrators can publish verified Tamil couplets, commentaries, and audio directly via the Admin CMS.',
    isAuthenticVerified: false,
    editorialNote: 'Sample / Editorial Slot · Publish verified Tamil couplet & commentary in Admin Dashboard',
    relatedKurals: VERIFIED_KURAL_NUMBERS.slice(0, 3),
  };
}

export function getKuralsInChapter(chapterNumber: number): KuralItem[] {
  const ch = THIRUKKURAL_CHAPTERS.find((c) => c.number === chapterNumber) || THIRUKKURAL_CHAPTERS[0];
  const items: KuralItem[] = [];
  for (let n = ch.kuralRange[0]; n <= ch.kuralRange[1]; n++) {
    items.push(getKuralByNumber(n));
  }
  return items;
}

export function searchKurals(query: string): KuralItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return VERIFIED_KURAL_NUMBERS.map(getKuralByNumber);

  const numeric = Number(q);
  if (Number.isInteger(numeric) && numeric >= 1 && numeric <= 1080) {
    return [getKuralByNumber(numeric)];
  }

  const matchedNumbers = new Set<number>();

  // Match verified authentic kurals first
  for (const num of VERIFIED_KURAL_NUMBERS) {
    const k = getKuralByNumber(num);
    const ch = getChapterForKural(num);
    const haystack = [
      String(k.number),
      k.tamilLine1,
      k.tamilLine2,
      k.wordByWordTa,
      k.tamilCommentary,
      k.englishTranslation,
      k.englishExplanation,
      ch.tamil,
      ch.english,
    ]
      .join(' ')
      .toLowerCase();
    if (haystack.includes(q)) {
      matchedNumbers.add(num);
    }
  }

  // Also match chapter names across all 108 chapters
  for (const ch of THIRUKKURAL_CHAPTERS) {
    if (ch.tamil.toLowerCase().includes(q) || ch.english.toLowerCase().includes(q)) {
      matchedNumbers.add(ch.kuralRange[0]);
    }
  }

  return Array.from(matchedNumbers)
    .sort((a, b) => a - b)
    .map(getKuralByNumber);
}
