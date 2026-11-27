/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt?: string;
};

export type ToolCategory = 'converter' | 'editor' | 'organizer' | 'compressor' | 'security' | 'utilities' | 'ocr';

export interface PdfTool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  iconName: string;
  badge?: string;
  popular?: boolean;
  actionType: 'convert' | 'edit' | 'merge' | 'split' | 'compress' | 'security' | 'utility' | 'ocr';
}

export interface ConversionRecord {
  id: string;
  userId?: string;
  toolName: string;
  fileName: string;
  fileSize: number;
  outputSize?: number;
  timestamp: number;
  status: 'success' | 'failed' | 'processing';
  downloadUrl?: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  content: string;
}
