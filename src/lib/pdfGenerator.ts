import { jsPDF } from 'jspdf';

export interface CertificatePdfInput {
  certificateId: string;
  recipientName: string;
  programTitle: string;
  programTitleTa?: string;
  score: number;
  issuedAt: string;
}

export function downloadCertificatePdf(data: CertificatePdfInput): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // Ivory background
  doc.setFillColor(255, 249, 237);
  doc.rect(0, 0, width, height, 'F');

  // Outer Temple Maroon border
  doc.setDrawColor(100, 30, 36);
  doc.setLineWidth(1.6);
  doc.rect(10, 10, width - 20, height - 20);

  // Inner Antique Gold border
  doc.setDrawColor(198, 161, 91);
  doc.setLineWidth(0.7);
  doc.rect(14, 14, width - 28, height - 28);

  // Header
  doc.setTextColor(100, 30, 36);
  doc.setFont('times', 'bold');
  doc.setFontSize(26);
  doc.text('PURNA YOGAM', width / 2, 36, { align: 'center' });

  doc.setTextColor(198, 161, 91);
  doc.setFont('times', 'italic');
  doc.setFontSize(12);
  doc.text('Ancient Wisdom. Inner Awakening. Universal Knowledge.', width / 2, 44, {
    align: 'center',
  });

  // Divider line
  doc.setDrawColor(198, 161, 91);
  doc.setLineWidth(0.4);
  doc.line(60, 50, width - 60, 50);

  // Certificate Title
  doc.setTextColor(23, 43, 69);
  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.text('CERTIFICATE OF EDUCATIONAL COMPLETION', width / 2, 66, { align: 'center' });

  doc.setFont('times', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(92, 79, 66);
  doc.text('This educational record certifies that', width / 2, 82, { align: 'center' });

  // Recipient Name
  doc.setTextColor(100, 30, 36);
  doc.setFont('times', 'bold');
  doc.setFontSize(28);
  doc.text(data.recipientName, width / 2, 98, { align: 'center' });

  doc.setDrawColor(216, 189, 145);
  doc.line(80, 103, width - 80, 103);

  doc.setTextColor(92, 79, 66);
  doc.setFont('times', 'normal');
  doc.setFontSize(12);
  doc.text('has successfully completed the self-paced spiritual learning programme', width / 2, 114, {
    align: 'center',
  });

  // Programme Name
  doc.setTextColor(23, 43, 69);
  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.text(data.programTitle, width / 2, 128, { align: 'center' });

  doc.setFont('times', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(49, 75, 59);
  doc.text(`Assessment Mastery Score: ${data.score}%`, width / 2, 140, { align: 'center' });

  // Metadata Footer
  doc.setFont('courier', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(92, 79, 66);
  doc.text(`Certificate ID: ${data.certificateId}`, 26, height - 34);
  doc.text(`Issued Date: ${new Date(data.issuedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, width - 26, height - 34, {
    align: 'right',
  });

  // Disclaimer
  doc.setFont('times', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(110, 95, 80);
  doc.text(
    'Note: This is a free educational course-completion certificate issued by PURNA YOGAM for personal study and does not constitute an accredited academic degree.',
    width / 2,
    height - 22,
    { align: 'center' }
  );

  doc.save(`${data.certificateId}.pdf`);
}

export function downloadAuthorizedStudyPdf(input: {
  title: string;
  author: string;
  category: string;
  licenseNote: string;
  pages: { heading: string; body: string }[];
}): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const width = doc.internal.pageSize.getWidth();
  const margin = 20;

  doc.setFillColor(255, 249, 237);
  doc.rect(0, 0, width, 297, 'F');
  doc.setTextColor(100, 30, 36);
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.text(input.title, margin, 32, { maxWidth: width - margin * 2 });

  doc.setTextColor(92, 79, 66);
  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.text(`By ${input.author}  |  ${input.category}`, margin, 46);
  doc.setFontSize(9.5);
  doc.text(`Authorization: ${input.licenseNote}`, margin, 53, { maxWidth: width - margin * 2 });
  doc.setDrawColor(198, 161, 91);
  doc.line(margin, 58, width - margin, 58);

  let y = 70;
  input.pages.forEach((p, idx) => {
    if (y > 255) {
      doc.addPage();
      doc.setFillColor(255, 249, 237);
      doc.rect(0, 0, width, 297, 'F');
      y = 26;
    }
    doc.setTextColor(23, 43, 69);
    doc.setFont('times', 'bold');
    doc.setFontSize(13);
    doc.text(`${idx + 1}. ${p.heading}`, margin, y);
    y += 7;

    doc.setTextColor(35, 30, 24);
    doc.setFont('times', 'normal');
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(p.body, width - margin * 2);
    doc.text(lines, margin, y);
    y += lines.length * 5.2 + 8;
  });

  const safeFile = input.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 48);
  doc.save(`purna-yogam-${safeFile}.pdf`);
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.length > 0 ? lines : [''];
}

function createStyledA4Canvas(): {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
} {
  const width = 1240;
  const height = 1754;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context unavailable');
  }

  // Ivory parchment background
  ctx.fillStyle = '#FFF9ED';
  ctx.fillRect(0, 0, width, height);

  // Outer Temple Maroon border
  ctx.strokeStyle = '#641E24';
  ctx.lineWidth = 6;
  ctx.strokeRect(42, 42, width - 84, height - 84);

  // Inner Antique Gold border
  ctx.strokeStyle = '#C6A15B';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(58, 58, width - 116, height - 116);

  // Corner lotus dots
  const corners: [number, number][] = [
    [58, 58],
    [width - 58, 58],
    [58, height - 58],
    [width - 58, height - 58],
  ];
  ctx.fillStyle = '#641E24';
  corners.forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fill();
  });

  return { canvas, ctx, width, height };
}

export interface KuralPdfItem {
  number: number;
  tamilLine1: string;
  tamilLine2: string;
  transliteration?: string;
  wordByWordTa: string;
  tamilCommentary: string;
  commentaryAuthor: string;
  englishTranslation: string;
  englishExplanation: string;
}

export interface KuralChapterMeta {
  number: number;
  tamil: string;
  english: string;
  paalTa: string;
  paalEn: string;
  iyalTa: string;
  iyalEn: string;
}

export function downloadKuralPdf(kural: KuralPdfItem, chapter: KuralChapterMeta): void {
  const { canvas, ctx, width, height } = createStyledA4Canvas();
  const marginX = 104;
  const maxW = width - marginX * 2;

  // Header
  ctx.fillStyle = '#641E24';
  ctx.font = 'bold 34px "Noto Serif Tamil", "Lora", serif';
  ctx.textAlign = 'center';
  ctx.fillText('PURNA YOGAM · பூர்ண யோகம்', width / 2, 126);

  ctx.fillStyle = '#9C7A3C';
  ctx.font = '600 20px "Noto Sans Tamil", "Plus Jakarta Sans", sans-serif';
  ctx.fillText('THIRUKKURAL STUDY SHEET · திருக்குறள் ஆய்வுப் படிவம்', width / 2, 162);

  // Header divider
  ctx.strokeStyle = '#C6A15B';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(120, 186);
  ctx.lineTo(width - 120, 186);
  ctx.stroke();

  // Hierarchy & Kural Badge
  ctx.textAlign = 'left';
  ctx.fillStyle = '#5C4F42';
  ctx.font = '600 20px "Noto Sans Tamil", "Plus Jakarta Sans", sans-serif';
  ctx.fillText(
    `${chapter.paalTa} (${chapter.paalEn})  ·  ${chapter.iyalTa} (${chapter.iyalEn})`,
    marginX,
    236
  );

  ctx.fillStyle = '#172B45';
  ctx.font = 'bold 28px "Noto Serif Tamil", "Lora", serif';
  ctx.fillText(
    `அதிகாரம் ${chapter.number}: ${chapter.tamil} · ${chapter.english}`,
    marginX,
    280
  );

  // Kural Couplet Box
  ctx.fillStyle = '#FBF2DF';
  ctx.fillRect(marginX, 316, maxW, 210);
  ctx.strokeStyle = '#C6A15B';
  ctx.lineWidth = 2;
  ctx.strokeRect(marginX, 316, maxW, 210);

  ctx.fillStyle = '#641E24';
  ctx.font = 'bold 20px "Plus Jakarta Sans", monospace';
  ctx.fillText(`THIRUKKURAL #${kural.number} OF 1,080`, marginX + 32, 356);

  ctx.fillStyle = '#641E24';
  ctx.font = 'bold 34px "Noto Serif Tamil", serif';
  ctx.fillText(kural.tamilLine1, marginX + 32, 412, maxW - 64);
  ctx.fillText(kural.tamilLine2, marginX + 32, 464, maxW - 64);

  if (kural.transliteration) {
    ctx.fillStyle = '#5C4F42';
    ctx.font = 'italic 20px "Lora", serif';
    ctx.fillText(kural.transliteration, marginX + 32, 504, maxW - 64);
  }

  let y = 582;

  const drawSection = (heading: string, body: string, fontSpec: string, color: string) => {
    ctx.fillStyle = '#641E24';
    ctx.font = 'bold 21px "Noto Sans Tamil", "Plus Jakarta Sans", sans-serif';
    ctx.fillText(heading, marginX, y);
    y += 34;

    ctx.fillStyle = color;
    ctx.font = fontSpec;
    const lines = wrapCanvasText(ctx, body, maxW);
    for (const line of lines) {
      if (y > height - 150) break;
      ctx.fillText(line, marginX, y);
      y += 34;
    }
    y += 24;
  };

  drawSection(
    'பதவுரை · WORD-BY-WORD MEANING',
    kural.wordByWordTa,
    '22px "Noto Sans Tamil", sans-serif',
    '#1F1914'
  );
  drawSection(
    'தமிழ் விளக்கவுரை · TAMIL COMMENTARY',
    kural.tamilCommentary,
    '22px "Noto Sans Tamil", sans-serif',
    '#3E352D'
  );
  drawSection(
    'ENGLISH TRANSLATION',
    `“${kural.englishTranslation}”`,
    'italic 24px "Lora", serif',
    '#172B45'
  );
  drawSection(
    'PHILOSOPHICAL EXPLANATION',
    kural.englishExplanation,
    '22px "Plus Jakarta Sans", sans-serif',
    '#3E352D'
  );

  // Footer
  ctx.strokeStyle = '#DFCAA2';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(marginX, height - 134);
  ctx.lineTo(width - marginX, height - 134);
  ctx.stroke();

  ctx.fillStyle = '#5C4F42';
  ctx.font = '18px "Noto Sans Tamil", "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Source: ${kural.commentaryAuthor}`, marginX, height - 98);

  ctx.textAlign = 'right';
  ctx.fillText('Free Educational Archive · PURNA YOGAM', width - marginX, height - 98);

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const imgData = canvas.toDataURL('image/png');
  doc.addImage(imgData, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
  doc.save(`purna-yogam-thirukkural-${kural.number}.pdf`);
}

export function downloadChapterKuralPdf(
  chapter: KuralChapterMeta,
  kurals: KuralPdfItem[]
): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pdfW = doc.internal.pageSize.getWidth();
  const pdfH = doc.internal.pageSize.getHeight();
  const perPage = 4;

  for (let pageIdx = 0; pageIdx < Math.ceil(kurals.length / perPage); pageIdx++) {
    if (pageIdx > 0) doc.addPage();
    const { canvas, ctx, width, height } = createStyledA4Canvas();
    const marginX = 96;
    const maxW = width - marginX * 2;

    // Header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#641E24';
    ctx.font = 'bold 30px "Noto Serif Tamil", "Lora", serif';
    ctx.fillText(
      `அதிகாரம் ${chapter.number}: ${chapter.tamil} · ${chapter.english}`,
      width / 2,
      118
    );

    ctx.fillStyle = '#9C7A3C';
    ctx.font = '600 18px "Noto Sans Tamil", "Plus Jakarta Sans", sans-serif';
    ctx.fillText(
      `${chapter.paalTa} (${chapter.paalEn}) · ${chapter.iyalTa} · Page ${pageIdx + 1}`,
      width / 2,
      152
    );

    ctx.strokeStyle = '#C6A15B';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(marginX, 174);
    ctx.lineTo(width - marginX, 174);
    ctx.stroke();

    let y = 216;
    const slice = kurals.slice(pageIdx * perPage, pageIdx * perPage + perPage);
    ctx.textAlign = 'left';

    slice.forEach((k) => {
      // Kural card
      ctx.fillStyle = '#FBF2DF';
      ctx.fillRect(marginX, y, maxW, 315);
      ctx.strokeStyle = '#DFCAA2';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(marginX, y, maxW, 315);

      ctx.fillStyle = '#641E24';
      ctx.font = 'bold 18px "Plus Jakarta Sans", monospace';
      ctx.fillText(`KURAL #${k.number}`, marginX + 24, y + 34);

      ctx.font = 'bold 26px "Noto Serif Tamil", serif';
      ctx.fillText(k.tamilLine1, marginX + 24, y + 76, maxW - 48);
      ctx.fillText(k.tamilLine2, marginX + 24, y + 114, maxW - 48);

      ctx.fillStyle = '#172B45';
      ctx.font = 'italic 20px "Lora", serif';
      const enLines = wrapCanvasText(ctx, `“${k.englishTranslation}”`, maxW - 48).slice(0, 2);
      enLines.forEach((line, li) => {
        ctx.fillText(line, marginX + 24, y + 162 + li * 28);
      });

      ctx.fillStyle = '#4A3F35';
      ctx.font = '18px "Noto Sans Tamil", sans-serif';
      const taLines = wrapCanvasText(ctx, k.tamilCommentary, maxW - 48).slice(0, 3);
      taLines.forEach((line, li) => {
        ctx.fillText(line, marginX + 24, y + 226 + li * 26);
      });

      y += 338;
    });

    ctx.textAlign = 'center';
    ctx.fillStyle = '#5C4F42';
    ctx.font = '17px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(
      'PURNA YOGAM · Free Educational Thirukkural Compendium (Arathuppaal & Porutpaal)',
      width / 2,
      height - 86
    );

    doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfW, pdfH);
  }

  doc.save(`purna-yogam-thirukkural-chapter-${chapter.number}.pdf`);
}

