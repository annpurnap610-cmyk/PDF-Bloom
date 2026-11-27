/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PdfTool } from '../types';

export const ALL_PDF_TOOLS: PdfTool[] = [
  // Category A: PDF Converter
  { id: 'pdf-to-word', name: 'PDF to Word', category: 'converter', description: 'Convert PDF documents into editable Microsoft Word (.docx) files.', iconName: 'FileText', popular: true, actionType: 'convert' },
  { id: 'word-to-pdf', name: 'Word to PDF', category: 'converter', description: 'Transform DOCX and DOC documents into secure, professional PDFs.', iconName: 'FileCheck', popular: true, actionType: 'convert' },
  { id: 'pdf-to-excel', name: 'PDF to Excel', category: 'converter', description: 'Extract tables and financial data from PDFs into Excel spreadsheets.', iconName: 'Table', actionType: 'convert' },
  { id: 'excel-to-pdf', name: 'Excel to PDF', category: 'converter', description: 'Convert Excel spreadsheets (.xlsx, .xls) into clean PDF documents.', iconName: 'FileSpreadsheet', actionType: 'convert' },
  { id: 'pdf-to-ppt', name: 'PDF to PowerPoint', category: 'converter', description: 'Turn PDF slides and reports into editable PowerPoint presentations.', iconName: 'Presentation', actionType: 'convert' },
  { id: 'ppt-to-pdf', name: 'PowerPoint to PDF', category: 'converter', description: 'Convert PPTX presentations into high-quality PDF handouts.', iconName: 'FileBadge', actionType: 'convert' },
  { id: 'pdf-to-jpg', name: 'PDF to JPG', category: 'converter', description: 'Extract every PDF page into high-resolution JPG image files.', iconName: 'Image', popular: true, actionType: 'convert' },
  { id: 'pdf-to-png', name: 'PDF to PNG', category: 'converter', description: 'Convert PDF pages into lossless PNG images with transparency support.', iconName: 'FileImage', actionType: 'convert' },
  { id: 'jpg-to-pdf', name: 'JPG to PDF', category: 'converter', description: 'Combine multiple JPG or JPEG photos into a single professional PDF.', iconName: 'Images', popular: true, actionType: 'convert' },
  { id: 'png-to-pdf', name: 'PNG to PDF', category: 'converter', description: 'Convert PNG images into clean, crisp PDF documents.', iconName: 'FilePlus', actionType: 'convert' },
  { id: 'html-to-pdf', name: 'HTML to PDF', category: 'converter', description: 'Convert web pages and HTML content directly into formatted PDFs.', iconName: 'Code', actionType: 'convert' },
  { id: 'text-to-pdf', name: 'Text to PDF', category: 'converter', description: 'Convert plain text files (.txt) into styled PDF documents.', iconName: 'FileCode', actionType: 'convert' },

  // Category B: PDF Editor
  { id: 'edit-pdf', name: 'Edit PDF', category: 'editor', description: 'Add text, shapes, annotations, and highlights directly onto your PDF.', iconName: 'Edit3', popular: true, actionType: 'edit' },
  { id: 'add-watermark', name: 'Add Watermark', category: 'editor', description: 'Stamp confidential or custom text and image watermarks on your PDF.', iconName: 'Stamp', actionType: 'edit' },
  { id: 'add-page-numbers', name: 'Add Page Numbers', category: 'editor', description: 'Insert customizable page numbers in headers or footers.', iconName: 'Hash', actionType: 'edit' },
  { id: 'rotate-pdf', name: 'Rotate PDF', category: 'editor', description: 'Rotate portrait or landscape PDF pages 90, 180, or 270 degrees.', iconName: 'RotateCw', actionType: 'edit' },
  { id: 'crop-pdf', name: 'Crop PDF', category: 'editor', description: 'Trim page margins and remove unwanted whitespace from PDF pages.', iconName: 'Crop', actionType: 'edit' },
  { id: 'add-signature', name: 'Add Signature', category: 'editor', description: 'Sign PDFs digitally or draw your handwritten signature securely.', iconName: 'PenTool', actionType: 'edit' },

  // Category C: PDF Organizer
  { id: 'merge-pdf', name: 'Merge PDF', category: 'organizer', description: 'Combine multiple PDFs and documents into one unified file.', iconName: 'Layers', popular: true, actionType: 'merge' },
  { id: 'split-pdf', name: 'Split PDF', category: 'organizer', description: 'Separate a large PDF into individual pages or custom ranges.', iconName: 'Scissors', popular: true, actionType: 'split' },
  { id: 'extract-pages', name: 'Extract Pages', category: 'organizer', description: 'Extract specific pages or page ranges from your PDF document.', iconName: 'Copy', actionType: 'organizer' as any },
  { id: 'delete-pages', name: 'Delete Pages', category: 'organizer', description: 'Remove unnecessary pages from your PDF instantly.', iconName: 'Trash2', actionType: 'organizer' as any },
  { id: 'rearrange-pages', name: 'Rearrange Pages', category: 'organizer', description: 'Drag and drop PDF pages to reorder them effortlessly.', iconName: 'Move', actionType: 'organizer' as any },

  // Category D: PDF Compressor
  { id: 'compress-pdf', name: 'Compress PDF', category: 'compressor', description: 'Reduce PDF file size significantly while maintaining high visual quality.', iconName: 'Minimize2', popular: true, actionType: 'compress' },
  { id: 'low-compression', name: 'Low Compression', category: 'compressor', description: 'Maximum visual quality with mild file size reduction.', iconName: 'ZoomIn', actionType: 'compress' },
  { id: 'high-compression', name: 'High Compression', category: 'compressor', description: 'Maximum file size reduction for easy emailing and web sharing.', iconName: 'Zap', actionType: 'compress' },

  // Category E: PDF Security
  { id: 'protect-pdf', name: 'Protect PDF', category: 'security', description: 'Encrypt your PDF with a strong password to prevent unauthorized access.', iconName: 'Lock', popular: true, actionType: 'security' },
  { id: 'unlock-pdf', name: 'Unlock PDF', category: 'security', description: 'Remove password security and permissions from authorized PDFs.', iconName: 'Unlock', actionType: 'security' },
  { id: 'redact-pdf', name: 'Redact PDF', category: 'security', description: 'Permanently black out sensitive text, PII, and confidential info.', iconName: 'ShieldAlert', actionType: 'security' },

  // Category F: PDF Utilities
  { id: 'pdf-metadata', name: 'PDF Metadata Viewer', category: 'utilities', description: 'Inspect author, creation date, producer, and document properties.', iconName: 'Info', actionType: 'utility' },
  { id: 'pdf-page-counter', name: 'PDF Page Counter', category: 'utilities', description: 'Quickly count exact pages, words, and character statistics.', iconName: 'Calculator', actionType: 'utility' },
  { id: 'repair-pdf', name: 'Repair PDF', category: 'utilities', description: 'Fix corrupted or damaged PDF files and restore readability.', iconName: 'Wrench', actionType: 'utility' },
  { id: 'flatten-pdf', name: 'Flatten PDF', category: 'utilities', description: 'Flatten interactive form fields and annotations into static content.', iconName: 'Layers', actionType: 'utility' },

  // Category G: OCR Tools
  { id: 'ocr-pdf', name: 'OCR Searchable PDF', category: 'ocr', description: 'Recognize text in scanned documents and make them fully searchable.', iconName: 'ScanText', popular: true, actionType: 'ocr' },
  { id: 'image-to-text', name: 'Image to Text (OCR)', category: 'ocr', description: 'Extract clean, copyable text from PNG, JPG, and scanned images.', iconName: 'FileSearch', actionType: 'ocr' }
];

export const BLOG_POSTS = [
  {
    id: '1',
    title: '10 Essential PDF Hacks Every Student and Professional Needs in 2026',
    excerpt: 'Discover how to merge, compress, sign, and convert documents in seconds without installing heavy desktop software.',
    category: 'Productivity',
    readTime: '4 min read',
    date: 'May 12, 2026',
    author: 'Elena Vance',
    content: `Working with PDF documents is a daily reality for millions of students, researchers, and office workers. Whether you are compiling a thesis, submitting business invoices, or archiving research papers, having the right tools makes all the difference.\n\n1. Lossless Compression: Never struggle with email attachment limits again. Using smart compression algorithms, you can reduce PDF file sizes by up to 80% without losing readable text clarity.\n\n2. Secure Encryption: Protecting sensitive financial records or personal resumes with password encryption ensures only authorized recipients can open your files.\n\n3. AI-Powered Summarization: Instead of reading 100-page reports line by line, leverage Gemini AI document intelligence to extract key takeaways and answer specific questions in seconds.`
  },
  {
    id: '2',
    title: 'How AI Document Assistants Are Transforming Research and Study Workflows',
    excerpt: 'Explore how large language models and smart PDF readers allow you to converse directly with your textbooks and whitepapers.',
    category: 'Artificial Intelligence',
    readTime: '6 min read',
    date: 'May 18, 2026',
    author: 'Dr. Marcus Sterling',
    content: `The paradigm of reading has shifted. Traditional keyword search is being replaced by conversational AI document assistants. With PDF Bloom's AI Chat and Summary engine, users can upload complex research papers, financial prospectuses, or legal contracts and ask targeted questions.\n\nThe AI extracts contextual answers instantly, generates quiz questions for self-study, and translates documents across multiple languages with unprecedented precision.`
  },
  {
    id: '3',
    title: 'Security and Privacy: How PDF Bloom Protects Your Sensitive Documents',
    excerpt: 'A deep dive into our zero-retention temporary storage, secure HTTPS encryption, and automatic file purging policies.',
    category: 'Security',
    readTime: '5 min read',
    date: 'May 24, 2026',
    author: 'Security Engineering Team',
    content: `When handling confidential contracts, tax documents, or medical files, security is paramount. PDF Bloom operates on a strict privacy-first architecture. All uploaded files are processed in secure isolated containers and automatically purged within one hour. We never sell, share, or use your private documents to train public AI models.`
  }
];
