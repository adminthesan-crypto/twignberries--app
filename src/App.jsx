import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CommandKModal from './components/CommandKModal';
import { ArrowLeft, Star, ShieldCheck, ExternalLink } from 'lucide-react';

import EtsyFeeCalculator from './tools/EtsyFeeCalculator';
import InvoiceGenerator from './tools/InvoiceGenerator';
import StripeFeeCalculator from './tools/StripeFeeCalculator';
import GstCalculator from './tools/GstCalculator';
import UtmBuilder from './tools/UtmBuilder';
import PayPalFeeCalculator from './tools/PayPalFeeCalculator';
import YouTubeRpmCalculator from './tools/YouTubeRpmCalculator';
import PdfMarkdownConverter from './tools/PdfMarkdownConverter';
import AmazonFbaCalculator from './tools/AmazonFbaCalculator';
import TikTokShopCalculator from './tools/TikTokShopCalculator';
import RoasCalculator from './tools/RoasCalculator';
import ShopifyFeeCalculator from './tools/ShopifyFeeCalculator';
import CreatorPlatformFeeCalculator from './tools/CreatorPlatformFeeCalculator';
import SaasChurnLtvCalculator from './tools/SaasChurnLtvCalculator';
import AiTokenCostCalculator from './tools/AiTokenCostCalculator';

import MergePdfTool from './tools/MergePdfTool';
import SplitPdfTool from './tools/SplitPdfTool';
import ImageToPdfTool from './tools/ImageToPdfTool';
import WatermarkPdfTool from './tools/WatermarkPdfTool';
import ProtectPdfTool from './tools/ProtectPdfTool';
import RotatePdfTool from './tools/RotatePdfTool';
import OrganizePdfTool from './tools/OrganizePdfTool';
import PageNumberPdfTool from './tools/PageNumberPdfTool';
import PdfMetadataTool from './tools/PdfMetadataTool';
import SvgToImageTool from './tools/SvgToImageTool';
import SocialImageCropperTool from './tools/SocialImageCropperTool';
import ColorPaletteTool from './tools/ColorPaletteTool';
import JsonFormatterTool from './tools/JsonFormatterTool';
import RegexTesterTool from './tools/RegexTesterTool';
import OpenGraphPreviewTool from './tools/OpenGraphPreviewTool';
import PdfTextExtractorTool from './tools/PdfTextExtractorTool';
import PdfCropTool from './tools/PdfCropTool';
import PdfBookletTool from './tools/PdfBookletTool';
import PdfToImageTool from './tools/PdfToImageTool';
import CompressPdfTool from './tools/CompressPdfTool';
import WordToPdfTool from './tools/WordToPdfTool';
import PdfToWordTool from './tools/PdfToWordTool';
import ExcelToPdfTool from './tools/ExcelToPdfTool';
import PdfToExcelTool from './tools/PdfToExcelTool';
import PowerPointToPdfTool from './tools/PowerPointToPdfTool';
import PdfToPowerPointTool from './tools/PdfToPowerPointTool';
import UnlockPdfTool from './tools/UnlockPdfTool';
import PdfToPdfATool from './tools/PdfToPdfATool';
import RepairPdfTool from './tools/RepairPdfTool';
import RedactPdfTool from './tools/RedactPdfTool';
import SignPdfTool from './tools/SignPdfTool';
import EditPdfTool from './tools/EditPdfTool';
import PdfFormsTool from './tools/PdfFormsTool';
import ScanToPdfTool from './tools/ScanToPdfTool';
import OcrPdfTool from './tools/OcrPdfTool';
import ComparePdfTool from './tools/ComparePdfTool';
import AiPdfSummarizerTool from './tools/AiPdfSummarizerTool';
import TranslatePdfTool from './tools/TranslatePdfTool';
import HtmlToPdfTool from './tools/HtmlToPdfTool';
import Base64ImageTool from './tools/Base64ImageTool';
import CssGradientTool from './tools/CssGradientTool';
import ImagePaletteTool from './tools/ImagePaletteTool';
import SvgOptimizerTool from './tools/SvgOptimizerTool';
import ImageCompressorTool from './tools/ImageCompressorTool';
import ImageResizerTool from './tools/ImageResizerTool';
import SqlFormatterTool from './tools/SqlFormatterTool';
import CsvJsonTool from './tools/CsvJsonTool';
import DiffViewerTool from './tools/DiffViewerTool';
import JwtDecoderTool from './tools/JwtDecoderTool';
import CronParserTool from './tools/CronParserTool';
import MarkdownEditorTool from './tools/MarkdownEditorTool';
import PasswordGeneratorTool from './tools/PasswordGeneratorTool';
import MetaRobotsTool from './tools/MetaRobotsTool';
import KeywordDensityTool from './tools/KeywordDensityTool';
import SitemapGeneratorTool from './tools/SitemapGeneratorTool';
import FaviconGeneratorTool from './tools/FaviconGeneratorTool';
import StripePaypalTool from './tools/StripePaypalTool';
import BundleMarginTool from './tools/BundleMarginTool';
import ShippingRateTool from './tools/ShippingRateTool';
import InvoiceTaxTool from './tools/InvoiceTaxTool';
import ProjectScoperTool from './tools/ProjectScoperTool';
import TimezonePlannerTool from './tools/TimezonePlannerTool';
import QrCodeGeneratorTool from './tools/QrCodeGeneratorTool';
import EmailSubjectTool from './tools/EmailSubjectTool';
import AdCopyCounterTool from './tools/AdCopyCounterTool';
import CropImageTool from './tools/CropImageTool';
import ConvertToJpgTool from './tools/ConvertToJpgTool';
import ConvertFromJpgTool from './tools/ConvertFromJpgTool';
import RotateImageTool from './tools/RotateImageTool';
import WatermarkImageTool from './tools/WatermarkImageTool';
import PhotoEditorTool from './tools/PhotoEditorTool';
import UpscaleImageTool from './tools/UpscaleImageTool';
import RemoveBackgroundTool from './tools/RemoveBgImageTool';
import MemeGeneratorTool from './tools/MemeGeneratorTool';
import HtmlToImageTool from './tools/HtmlToImageTool';
import BlurFaceTool from './tools/BlurFaceTool';
import ImageColorPickerTool from './tools/ImageColorPickerTool';
import ImageSplitterTool from './tools/ImageSplitterTool';
import ImageMetadataExifTool from './tools/ImageMetadataExifTool';
import SvgToPngConverterTool from './tools/SvgToPngConverterTool';
import ImageRoundCornersTool from './tools/ImageRoundCornersTool';
import ImageToBase64BulkTool from './tools/ImageToBase64BulkTool';
import ImageNoiseReducerTool from './tools/ImageNoiseReducerTool';
import ImageDuotoneTool from './tools/ImageDuotoneTool';
import ImageCollageMakerTool from './tools/ImageCollageMakerTool';
import CultureMemeWidget from './components/CultureMemeWidget';

/* ─── Tool Definitions ───────────────────────────────────── */
const TOOLS = [
  {
    id: 'etsy-fee',
    name: 'What Etsy actually leaves you with',
    category: 'E-Commerce',
    description: 'Listing fee, 6.5% transaction cut, payment processing, offsite ads — all of it, before you hit publish.',
    keywords: ['etsy margin', 'etsy seller', 'handmade fee', 'profit margin'],
    color: '#f97316', bg: 'rgba(249,115,22,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/>
      </svg>
    ),
    component: EtsyFeeCalculator,
  },
  {
    id: 'paypal-fee',
    name: 'PayPal\'s cut, before it surprises you',
    category: 'E-Commerce',
    description: 'Standard rate, micropayment rate, whichever applies — see your real payout first.',
    keywords: ['paypal fee', 'paypal calculator', 'paypal merchant'],
    color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
    component: PayPalFeeCalculator,
  },
  {
    id: 'stripe-fee',
    name: 'How much to charge to actually break even?',
    category: 'E-Commerce',
    description: 'Domestic or international, Stripe takes its slice either way. This works backward from your target.',
    keywords: ['stripe payout', 'stripe pricing', 'break even calculator'],
    color: '#6366f1', bg: 'rgba(99,102,241,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    component: StripeFeeCalculator,
  },
  {
    id: 'gst-calculator',
    name: 'Is that price with GST or without?',
    category: 'E-Commerce',
    description: 'Flip it either direction in one click. No more guessing on a client call.',
    keywords: ['gst exclusive', 'gst inclusive', 'cgst sgst india'],
    color: '#22c55e', bg: 'rgba(34,197,94,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 14 6-6"/><circle cx="9.5" cy="9.5" r="1.5"/><circle cx="14.5" cy="14.5" r="1.5"/>
        <rect x="3" y="3" width="18" height="18" rx="3"/>
      </svg>
    ),
    component: GstCalculator,
  },
  {
    id: 'amazon-fba',
    name: 'FBA fees are a maze. Here\'s the exit.',
    category: 'E-Commerce',
    description: 'Fulfilment tier, referral cut, category rules — your real margin after Amazon takes its share.',
    keywords: ['amazon fba', 'amazon referral fee', 'fba calculator'],
    color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
    component: AmazonFbaCalculator,
  },
  {
    id: 'tiktok-shop',
    name: 'TikTok Shop wants 6%. Here\'s what\'s left.',
    category: 'E-Commerce',
    description: 'Commission, affiliate creator cuts, and your actual take-home per sale.',
    keywords: ['tiktok shop fee', 'tiktok affiliate calculator'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
      </svg>
    ),
    component: TikTokShopCalculator,
  },
  {
    id: 'shopify-fee',
    name: 'Which Shopify plan actually pays for itself?',
    category: 'E-Commerce',
    description: 'Compare monthly cost against your real card processing rates before you commit.',
    keywords: ['shopify transaction fee', 'shopify basic plan'],
    color: '#10b981', bg: 'rgba(16,185,129,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    component: ShopifyFeeCalculator,
  },
  {
    id: 'invoice-generator',
    name: 'A proper invoice, in the time it takes to make tea.',
    category: 'Freelance',
    description: 'No login, no "upgrade to export." Fill it in, download it, send it.',
    keywords: ['free invoice maker', 'freelance receipt', 'pdf invoice without signup'],
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    component: InvoiceGenerator,
  },
  {
    id: 'pdf-markdown',
    name: 'Markdown to PDF Converter',
    category: 'Freelance',
    description: 'Turn raw markdown notes or readmes into a polished PDF document instantly.',
    keywords: ['markdown to pdf', 'markdown exporter', 'notion pdf converter'],
    color: '#6366f1', bg: 'rgba(99,102,241,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/>
        <line x1="12" y1="4" x2="12" y2="20"/>
      </svg>
    ),
    component: PdfMarkdownConverter,
  },
  {
    id: 'creator-platform',
    name: 'Patreon & Creator Platform Fees',
    category: 'Freelance',
    description: 'Patreon vs. BuyMeACoffee vs. Ko-fi. See which platform leaves more in your pocket.',
    keywords: ['patreon fee calculator', 'buymeacoffee fee', 'ko-fi fee'],
    color: '#f97316', bg: 'rgba(249,115,22,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    component: CreatorPlatformFeeCalculator,
  },
  {
    id: 'saas-churn-ltv',
    name: 'SaaS MRR Churn & LTV:CAC',
    category: 'Freelance',
    description: 'Your real SaaS customer LTV and CAC payback period, without the jargon.',
    keywords: ['saas ltv cac', 'mrr churn calculator', 'saas payback period'],
    color: '#14b8a6', bg: 'rgba(20,184,166,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    component: SaasChurnLtvCalculator,
  },
  {
    id: 'youtube-rpm',
    name: 'YouTube AdSense RPM Estimator',
    category: 'Marketing',
    description: 'Realistic AdSense earnings across 2026 niches based on actual creator RPMs.',
    keywords: ['youtube rpm', 'adsense calculator', 'youtube income', 'creator cpm'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
    component: YouTubeRpmCalculator,
  },
  {
    id: 'utm-builder',
    name: 'UTM Campaign URL Builder',
    category: 'Marketing',
    description: 'Clean campaign tracking URLs for GA4 without typo headaches.',
    keywords: ['utm source', 'utm medium', 'google analytics campaign link'],
    color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    component: UtmBuilder,
  },
  {
    id: 'roas-calculator',
    name: 'ROAS & Ad Spend Break-Even',
    category: 'Marketing',
    description: 'Know your break-even ROAS before turning on paid ads.',
    keywords: ['roas calculator', 'break even roas', 'meta ad roas', 'cpa calculator'],
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    component: RoasCalculator,
  },
  {
    id: 'ai-token-cost',
    name: 'AI API Token Cost Calculator',
    category: 'AI & Dev',
    description: 'Compare GPT-4o, Claude 3.5, and Gemini token costs before your API bill surprises you.',
    keywords: ['ai cost calculator', 'gpt4o token pricing', 'claude 3.5 pricing', 'llm api cost'],
    color: '#06b6d4', bg: 'rgba(6,182,212,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    component: AiTokenCostCalculator,
  },
  {
    id: 'merge-pdf',
    name: 'Merge PDF Documents',
    category: 'PDF Tools',
    description: 'Combine your PDFs right in your browser. Zero cloud uploads, zero snooping.',
    keywords: ['merge pdf', 'combine pdf', 'join pdf', 'offline pdf', 'ilovepdf'],
    color: '#6161ff', bg: '#eceeff',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
      </svg>
    ),
    component: MergePdfTool,
  },
  {
    id: 'split-pdf',
    name: 'Split PDF & Extract Pages',
    category: 'PDF Tools',
    description: 'Extract specific pages or chop up a PDF without waiting on a server.',
    keywords: ['split pdf', 'extract pages', 'cut pdf', 'page range', 'pdf slicer'],
    color: '#00c875', bg: 'rgba(0,200,117,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>
      </svg>
    ),
    component: SplitPdfTool,
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF Converter',
    category: 'PDF Tools',
    description: 'Turn scattered photos or screenshots into a clean A4 PDF document.',
    keywords: ['img to pdf', 'jpg to pdf', 'webp to pdf', 'convert image pdf'],
    color: '#fdab3d', bg: 'rgba(253,171,61,0.15)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    component: ImageToPdfTool,
  },
  {
    id: 'watermark-pdf',
    name: 'Watermark & Stamp PDF',
    category: 'PDF Tools',
    description: 'Stamp custom text or confidential warnings across your PDF in seconds.',
    keywords: ['watermark pdf', 'stamp pdf', 'copyright pdf', 'confidential stamp'],
    color: '#e2445c', bg: 'rgba(226,68,92,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    component: WatermarkPdfTool,
  },
  {
    id: 'protect-pdf',
    name: 'Protect & Encrypt PDF',
    category: 'PDF Tools',
    description: 'Lock documents with passwords and check strength without leaving your device.',
    keywords: ['protect pdf', 'encrypt pdf', 'lock pdf', 'password pdf', 'seal pdf'],
    color: '#ff3d8b', bg: 'rgba(255,61,139,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    component: ProtectPdfTool,
  },
  {
    id: 'rotate-pdf',
    name: 'Rotate PDF Pages',
    category: 'PDF Tools',
    description: 'Fix sideways or upside-down PDF pages without uploading NDA files to the cloud.',
    keywords: ['rotate pdf', 'turn pdf', 'orientation pdf', 'flip pdf'],
    color: '#6161ff', bg: 'rgba(97,97,255,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2v6h-6"/><path d="M21 13a9 9 0 1 1-3-7.7L21 8"/>
      </svg>
    ),
    component: RotatePdfTool,
  },
  {
    id: 'organize-pdf',
    name: 'Organize & Delete PDF Pages',
    category: 'PDF Tools',
    description: 'Reorder, duplicate, or trash specific PDF pages with a simple drag-and-drop.',
    keywords: ['organize pdf', 'delete pdf pages', 'remove pdf pages', 'reverse pdf', 'reorder pdf'],
    color: '#00c875', bg: 'rgba(0,200,117,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="10" y1="13" x2="14" y2="13"/>
      </svg>
    ),
    component: OrganizePdfTool,
  },
  {
    id: 'page-number-pdf',
    name: 'Stamp Page Numbers',
    category: 'PDF Tools',
    description: 'Stamp neat "Page X of Y" numbers across reports or legal packets.',
    keywords: ['page numbers pdf', 'number pdf', 'footer pdf', 'stamp pdf'],
    color: '#fdab3d', bg: 'rgba(253,171,61,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
      </svg>
    ),
    component: PageNumberPdfTool,
  },
  {
    id: 'metadata-pdf',
    name: 'PDF Metadata Inspector & Privacy Scrubber',
    category: 'PDF Tools',
    description: 'Inspect PDF author tags and scrub tracking metadata clean before sharing.',
    keywords: ['pdf metadata', 'pdf info', 'scrub pdf', 'remove author pdf', 'xmp pdf'],
    color: '#e2445c', bg: 'rgba(226,68,92,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    component: PdfMetadataTool,
  },
  {
    id: 'svg-to-image',
    name: 'SVG to High-Res PNG/JPG Converter',
    category: 'Image & Media',
    description: 'Convert SVG graphics into crisp 1x–8x Retina PNG or JPG exports.',
    keywords: ['svg to png', 'svg to jpg', 'convert svg', 'rasterize svg', 'retina svg'],
    color: '#6161ff', bg: 'rgba(97,97,255,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    component: SvgToImageTool,
  },
  {
    id: 'social-cropper',
    name: 'Social Media Aspect Ratio Cropper',
    category: 'Image & Media',
    description: 'Crop and frame images for Instagram, Reels, or YouTube without cropping heads.',
    keywords: ['image cropper', 'social media crop', 'instagram crop', 'youtube thumbnail crop', 'aspect ratio image'],
    color: '#00c875', bg: 'rgba(0,200,117,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/>
      </svg>
    ),
    component: SocialImageCropperTool,
  },
  {
    id: 'color-palette',
    name: 'WCAG Color Contrast & Palette Generator',
    category: 'Image & Media',
    description: 'Check WCAG contrast ratios and copy clean SaaS color pairings.',
    keywords: ['wcag contrast', 'color contrast checker', 'ada contrast', 'palette generator', 'hex contrast'],
    color: '#fdab3d', bg: 'rgba(253,171,61,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
      </svg>
    ),
    component: ColorPaletteTool,
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter & TypeScript Generator',
    category: 'AI & Dev',
    description: 'Beautify messy JSON, catch syntax bugs, and export TypeScript types instantly.',
    keywords: ['json formatter', 'json beautifier', 'json validator', 'json to typescript', 'json interface'],
    color: '#00c875', bg: 'rgba(0,200,117,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    component: JsonFormatterTool,
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester & Match Explainer',
    category: 'AI & Dev',
    description: 'Test complex regex patterns with live group highlights and zero headaches.',
    keywords: ['regex tester', 'regular expression', 'regex validator', 'test regexp'],
    color: '#6161ff', bg: 'rgba(97,97,255,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 17l6-6-6-6"/><path d="M12 19h8"/>
      </svg>
    ),
    component: RegexTesterTool,
  },
  {
    id: 'og-preview',
    name: 'OpenGraph Social Card Simulator',
    category: 'SEO & Web',
    description: 'See exactly how your link will look on Slack, X, and LinkedIn before posting.',
    keywords: ['opengraph preview', 'og tags', 'social card preview', 'seo preview', 'twitter card preview'],
    color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    component: OpenGraphPreviewTool,
  },
  // ─── PDF Suite Expansion ───
  {
    id: 'pdf-text-extractor',
    name: 'PDF Text Extractor & Plaintext Converter',
    category: 'PDF Tools',
    description: 'Extract raw selectable text from PDF pages offline in your browser.',
    keywords: ['pdf to text', 'extract text pdf', 'pdf parser'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    component: PdfTextExtractorTool,
  },
  {
    id: 'pdf-crop',
    name: 'PDF Margin Cropper & Trim Tool',
    category: 'PDF Tools',
    description: 'Trim white margins and crop PDF page boxes for Kindle & e-readers.',
    keywords: ['crop pdf', 'trim pdf margin', 'resize pdf margins'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/>
      </svg>
    ),
    component: PdfCropTool,
  },
  {
    id: 'pdf-booklet',
    name: 'PDF Booklet Imposition & Signature Planner',
    category: 'PDF Tools',
    description: 'Plan signature sheets and page imposition for saddle-stitch print booklets.',
    keywords: ['booklet pdf', 'imposition pdf', 'print booklet'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-0.5-5.5Z"/><path d="M6 17h14"/>
      </svg>
    ),
    component: PdfBookletTool,
  },
  {
    id: 'pdf-to-image',
    name: 'PDF to High-DPI Image Exporter',
    category: 'PDF Tools',
    description: 'Convert PDF document pages to PNG or JPEG images at custom DPI.',
    keywords: ['pdf to png', 'pdf to jpg', 'export pdf image'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    component: PdfToImageTool,
  },
  // ─── PDF Suite Expansion (20 New Tools) ───
  {
    id: 'compress-pdf',
    name: 'Compress PDF File Size Optimizer',
    category: 'PDF Tools',
    description: 'Compress PDF files with Extreme, Recommended, or High Quality presets offline.',
    keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf', 'pdf optimizer'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
    ),
    component: CompressPdfTool,
  },
  {
    id: 'word-to-pdf',
    name: 'Word / Markdown to PDF Converter',
    category: 'PDF Tools',
    description: 'Convert DOCX text, Markdown, or notes into clean A4 PDF documents offline.',
    keywords: ['word to pdf', 'doc to pdf', 'markdown to pdf', 'text to pdf'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h6"/><path d="M9 17h6"/></svg>
    ),
    component: WordToPdfTool,
  },
  {
    id: 'pdf-to-word',
    name: 'PDF to Word (.doc) Exporter',
    category: 'PDF Tools',
    description: 'Extract layout text and paragraphs from PDF documents into editable Word files.',
    keywords: ['pdf to word', 'pdf to doc', 'export pdf text'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 12 15 15"/></svg>
    ),
    component: PdfToWordTool,
  },
  {
    id: 'excel-to-pdf',
    name: 'Excel & CSV Spreadsheet to PDF',
    category: 'PDF Tools',
    description: 'Convert CSV/Excel tables into beautifully formatted tabular PDF reports offline.',
    keywords: ['excel to pdf', 'csv to pdf', 'spreadsheet pdf'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
    ),
    component: ExcelToPdfTool,
  },
  {
    id: 'pdf-to-excel',
    name: 'PDF Table to Excel / CSV Exporter',
    category: 'PDF Tools',
    description: 'Extract tables and structured data from PDF documents into Excel CSV files.',
    keywords: ['pdf to excel', 'pdf table extractor', 'pdf to csv'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
    ),
    component: PdfToExcelTool,
  },
  {
    id: 'powerpoint-to-pdf',
    name: 'PowerPoint Slide to PDF Handout',
    category: 'PDF Tools',
    description: 'Convert presentation slide notes and titles into multi-slide PDF handouts.',
    keywords: ['ppt to pdf', 'powerpoint to pdf', 'presentation pdf'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="M7 21h10"/></svg>
    ),
    component: PowerPointToPdfTool,
  },
  {
    id: 'pdf-to-powerpoint',
    name: 'PDF to PowerPoint Outline Exporter',
    category: 'PDF Tools',
    description: 'Extract presentation headings and slide content from PDFs into PPT outlines.',
    keywords: ['pdf to ppt', 'pdf to powerpoint', 'slide extractor'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="M7 21h10"/></svg>
    ),
    component: PdfToPowerPointTool,
  },
  {
    id: 'unlock-pdf',
    name: 'Unlock PDF & Remove Password',
    category: 'PDF Tools',
    description: 'Remove PDF user passwords and print restrictions offline in your browser.',
    keywords: ['unlock pdf', 'remove pdf password', 'decrypt pdf'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>
    ),
    component: UnlockPdfTool,
  },
  {
    id: 'pdf-to-pdfa',
    name: 'PDF to PDF/A (ISO 19005-1 Archive)',
    category: 'PDF Tools',
    description: 'Convert PDF documents into ISO 19005-1 archival standard for long-term storage.',
    keywords: ['pdf to pdf/a', 'pdfa converter', 'archive pdf'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15h6"/></svg>
    ),
    component: PdfToPdfATool,
  },
  {
    id: 'repair-pdf',
    name: 'Repair & Recover Corrupt PDF',
    category: 'PDF Tools',
    description: 'Rebuild damaged PDF cross-reference tables and recover readable document pages.',
    keywords: ['repair pdf', 'fix pdf', 'corrupt pdf recovery'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
    ),
    component: RepairPdfTool,
  },
  {
    id: 'redact-pdf',
    name: 'Redact PDF Sensitive Information',
    category: 'PDF Tools',
    description: 'Permanently blackout sensitive text, names, SSNs, and numbers offline.',
    keywords: ['redact pdf', 'blackout pdf', 'censor pdf'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
    ),
    component: RedactPdfTool,
  },
  {
    id: 'sign-pdf',
    name: 'Sign PDF & Add Electronic Signature',
    category: 'PDF Tools',
    description: 'Draw or type your signature and embed it onto any PDF page offline.',
    keywords: ['sign pdf', 'e-signature pdf', 'electronic signature'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
    ),
    component: SignPdfTool,
  },
  {
    id: 'edit-pdf',
    name: 'Edit PDF Text & Annotations',
    category: 'PDF Tools',
    description: 'Add custom text notes, colored shapes, callout boxes, and highlights to PDF pages.',
    keywords: ['edit pdf', 'annotate pdf', 'add text to pdf'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    ),
    component: EditPdfTool,
  },
  {
    id: 'pdf-forms',
    name: 'PDF Forms Fillable Builder',
    category: 'PDF Tools',
    description: 'Add interactive fillable textboxes, checkboxes, and date fields to static PDFs.',
    keywords: ['pdf form builder', 'fillable pdf', 'create pdf form'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
    ),
    component: PdfFormsTool,
  },
  {
    id: 'scan-to-pdf',
    name: 'Scan to PDF Document Creator',
    category: 'PDF Tools',
    description: 'Compile mobile scans or photos into clean multi-page document PDFs with contrast filters.',
    keywords: ['scan to pdf', 'mobile scanner', 'photo to pdf'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
    ),
    component: ScanToPdfTool,
  },
  {
    id: 'ocr-pdf',
    name: 'OCR PDF Optical Character Recognition',
    category: 'PDF Tools',
    description: 'Convert scanned PDF documents and images into selectable plain text offline.',
    keywords: ['ocr pdf', 'optical character recognition', 'scanned pdf to text'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>
    ),
    component: OcrPdfTool,
  },
  {
    id: 'compare-pdf',
    name: 'Compare PDF Side-by-Side Document Diff',
    category: 'PDF Tools',
    description: 'Compare two PDF versions side-by-side to detect text additions and deletions.',
    keywords: ['compare pdf', 'pdf diff', 'side by side pdf'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/></svg>
    ),
    component: ComparePdfTool,
  },
  {
    id: 'ai-pdf-summarizer',
    name: 'AI PDF Summarizer & Executive Briefs',
    category: 'PDF Tools',
    description: 'Synthesize executive summaries, key takeaways, reading time, and action items offline.',
    keywords: ['ai pdf summarizer', 'summarize pdf', 'pdf summary'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
    ),
    component: AiPdfSummarizerTool,
  },
  {
    id: 'translate-pdf',
    name: 'Translate PDF Document (6 Languages)',
    category: 'PDF Tools',
    description: 'Translate PDF documents to Spanish, French, German, Mandarin, or Hindi offline.',
    keywords: ['translate pdf', 'pdf translator', 'multilingual pdf'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    ),
    component: TranslatePdfTool,
  },
  {
    id: 'html-to-pdf',
    name: 'HTML to PDF (Convert Webpages & Markup)',
    category: 'PDF Tools',
    description: 'Convert live HTML tags or website URL previews into formatted A4 PDF documents.',
    keywords: ['html to pdf', 'webpage to pdf', 'convert html pdf'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    ),
    component: HtmlToPdfTool,
  },
  // ─── Image & Media Suite Expansion ───
  {
    id: 'base64-image',
    name: 'Image to Base64 Data URI Converter',
    category: 'Image & Media',
    description: 'Convert images to base64 strings or embed data URIs directly in CSS/HTML.',
    keywords: ['base64 image', 'data uri image', 'image to string'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    component: Base64ImageTool,
  },
  {
    id: 'css-gradient',
    name: 'CSS Linear & Radial Gradient Generator',
    category: 'Image & Media',
    description: 'Design multi-stop CSS gradients with angle controls and copy CSS syntax.',
    keywords: ['css gradient', 'gradient generator', 'linear gradient'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    component: CssGradientTool,
  },
  {
    id: 'image-palette',
    name: 'Image Color Palette & Hex Extractor',
    category: 'Image & Media',
    description: 'Extract dominant color palettes and hex codes directly from any image.',
    keywords: ['extract color from image', 'image palette', 'color picker image'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
      </svg>
    ),
    component: ImagePaletteTool,
  },
  {
    id: 'svg-optimizer',
    name: 'SVG Code Optimizer & Cleaner',
    category: 'Image & Media',
    description: 'Clean up bloated SVG vector code, remove editor metadata, and reduce file size.',
    keywords: ['svg optimizer', 'clean svg', 'compress svg', 'svg minify'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    component: SvgOptimizerTool,
  },
  {
    id: 'image-compressor',
    name: 'Browser Image Compressor & Optimizer',
    category: 'Image & Media',
    description: 'Compress PNG, WebP, and JPEG images locally without quality loss.',
    keywords: ['compress image', 'optimize png jpg', 'image size reducer'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
    component: ImageCompressorTool,
  },
  {
    id: 'image-resizer',
    name: 'Batch Image Resizer & Aspect Crop',
    category: 'Image & Media',
    description: 'Resize image dimensions by percentage or target pixel width/height.',
    keywords: ['resize image', 'image dimensions', 'scale photo'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/>
      </svg>
    ),
    component: ImageResizerTool,
  },
  {
    id: 'crop-image',
    name: 'Visual Image Cropper & Aspect Ratio Tool',
    category: 'Image & Media',
    description: 'Crop images visually with 16:9, 1:1, 4:5, and custom aspect ratio presets offline.',
    keywords: ['crop image', 'image cropper', 'trim image', 'aspect ratio crop'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/></svg>
    ),
    component: CropImageTool,
  },
  {
    id: 'convert-to-jpg',
    name: 'Convert to JPG / JPEG Bulk Converter',
    category: 'Image & Media',
    description: 'Bulk convert PNG, WEBP, and SVG images into clean JPG files with white backgrounds.',
    keywords: ['convert to jpg', 'png to jpg', 'webp to jpg', 'svg to jpg'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    ),
    component: ConvertToJpgTool,
  },
  {
    id: 'convert-from-jpg',
    name: 'Convert from JPG to PNG & WEBP',
    category: 'Image & Media',
    description: 'Convert JPG images into high-quality PNG or WEBP formats with transparency support.',
    keywords: ['convert from jpg', 'jpg to png', 'jpg to webp', 'image converter'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    ),
    component: ConvertFromJpgTool,
  },
  {
    id: 'rotate-image',
    name: 'Batch Image Rotate & Flip Mirror Tool',
    category: 'Image & Media',
    description: 'Rotate images by 90°, 180°, 270° or flip horizontally/vertically in bulk offline.',
    keywords: ['rotate image', 'flip image', 'mirror image', 'turn photo'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
    ),
    component: RotateImageTool,
  },
  {
    id: 'watermark-image',
    name: 'Image Watermark & Copyright Stamper',
    category: 'Image & Media',
    description: 'Stamp custom text, copyright notices, or repeating tiled watermarks onto photos.',
    keywords: ['watermark image', 'stamp photo', 'copyright watermark', 'protect image'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15h6"/></svg>
    ),
    component: WatermarkImageTool,
  },
  {
    id: 'photo-editor',
    name: 'Offline Photo Filter & Color Adjuster',
    category: 'Image & Media',
    description: 'Adjust brightness, contrast, saturation, exposure, and sepia filters offline.',
    keywords: ['photo editor', 'edit photo', 'brightness contrast', 'image filter'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
    ),
    component: PhotoEditorTool,
  },
  {
    id: 'upscale-image',
    name: 'AI-Style Image Upscaler (2x / 4x HD)',
    category: 'Image & Media',
    description: 'Upscale low-resolution photos and logos up to 4x resolution with smooth interpolation.',
    keywords: ['upscale image', 'enlarge photo', 'image resolution booster', 'hd image'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
    ),
    component: UpscaleImageTool,
  },
  {
    id: 'remove-background',
    name: 'Smart Background Remover / Chroma Key',
    category: 'Image & Media',
    description: 'Remove white, green screen, or solid background colors from product photos offline.',
    keywords: ['remove background', 'bg remover', 'transparent background', 'chroma key'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    component: RemoveBackgroundTool,
  },
  {
    id: 'meme-generator',
    name: 'Meme Generator & Impact Font Captioner',
    category: 'Image & Media',
    description: 'Create viral memes with classic top and bottom white impact text and black outlines.',
    keywords: ['meme generator', 'make meme', 'caption photo', 'impact font meme'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
    ),
    component: MemeGeneratorTool,
  },
  {
    id: 'html-to-image',
    name: 'HTML to IMAGE Card & Preview Generator',
    category: 'Image & Media',
    description: 'Convert live HTML and inline CSS code snippets into crisp Retina PNG or JPG images.',
    keywords: ['html to image', 'code to image', 'webpage preview image', 'html card to png'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    ),
    component: HtmlToImageTool,
  },
  {
    id: 'blur-face',
    name: 'Blur Face & Privacy Redactor',
    category: 'Image & Media',
    description: 'Blur out faces, license plates, addresses, and sensitive details in photos offline.',
    keywords: ['blur face', 'blur license plate', 'redact image', 'privacy blur photo'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
    ),
    component: BlurFaceTool,
  },
  {
    id: 'image-color-picker',
    name: 'Image Color Picker (Pixel Eyedropper)',
    category: 'Image & Media',
    description: 'Click any pixel on an uploaded photo to inspect and copy HEX, RGB, and HSL colors.',
    keywords: ['image color picker', 'eyedropper tool', 'sample color from image', 'hex color picker'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22l5-5"/><path d="M14.5 5.5l4 4"/><path d="M12 8l4 4"/><path d="M8 12l3-3 8-8a2.83 2.83 0 0 0-4-4l-8 8-3 3a2 2 0 0 0-.58 1.41L4 18l4-4a2 2 0 0 0 1.41-.58z"/></svg>
    ),
    component: ImageColorPickerTool,
  },
  {
    id: 'image-splitter',
    name: 'Image Splitter & Instagram Grid Slicer',
    category: 'Image & Media',
    description: 'Slice photos into 3x3 Instagram profile grids, 3x1 carousels, or custom tiles offline.',
    keywords: ['image splitter', 'instagram grid maker', 'split photo', 'slice image'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    ),
    component: ImageSplitterTool,
  },
  {
    id: 'image-metadata-exif',
    name: 'EXIF Metadata Viewer & Privacy Stripper',
    category: 'Image & Media',
    description: 'Inspect camera properties and permanently strip EXIF GPS location data offline.',
    keywords: ['exif viewer', 'strip exif metadata', 'remove gps photo', 'clean image metadata'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
    ),
    component: ImageMetadataExifTool,
  },
  {
    id: 'svg-to-png',
    name: 'SVG to PNG / JPG Vector to Raster',
    category: 'Image & Media',
    description: 'Convert vector SVG files into high-resolution PNG or JPG images up to 8x DPI.',
    keywords: ['svg to png converter', 'svg to jpg', 'vector to raster image', 'high res svg'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    ),
    component: SvgToPngConverterTool,
  },
  {
    id: 'image-round-corners',
    name: 'Rounded Corners & macOS Shadow Generator',
    category: 'Image & Media',
    description: 'Add sleek rounded corners, padding frames, and soft drop shadows to screenshots.',
    keywords: ['rounded corners image', 'screenshot shadow', 'macos screenshot beautifier'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4" ry="4"/></svg>
    ),
    component: ImageRoundCornersTool,
  },
  {
    id: 'image-to-base64-bulk',
    name: 'Bulk Image to CSS Data URI Encoder',
    category: 'Image & Media',
    description: 'Encode multiple icons and images into CSS url() strings and HTML img tags in bulk.',
    keywords: ['bulk image base64', 'css data uri bulk', 'encode multiple images'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    ),
    component: ImageToBase64BulkTool,
  },
  {
    id: 'image-noise-reducer',
    name: 'Image Denoise & Smooth Filter',
    category: 'Image & Media',
    description: 'Smooth grainy low-light camera noise and JPEG compression artifacts offline.',
    keywords: ['image denoise', 'reduce grain photo', 'smooth photo noise', 'de-grain image'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg>
    ),
    component: ImageNoiseReducerTool,
  },
  {
    id: 'image-duotone',
    name: 'Duotone & Cyberpunk Color Tint Filter',
    category: 'Image & Media',
    description: 'Apply Spotify-style two-color duotone gradients and cyberpunk tints to photos offline.',
    keywords: ['duotone filter', 'spotify color photo', 'cyberpunk photo filter', 'color tint image'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
    ),
    component: ImageDuotoneTool,
  },
  {
    id: 'image-collage-maker',
    name: 'Photo Collage Maker (2, 3, 4 Image Grid)',
    category: 'Image & Media',
    description: 'Combine up to 4 photos into side-by-side comparisons, stories, or square grids offline.',
    keywords: ['photo collage maker', 'combine photos', 'side by side image', 'photo grid maker'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="12" y1="3" x2="12" y2="21"/></svg>
    ),
    component: ImageCollageMakerTool,
  },
  // ─── AI & Dev Suite Expansion ───
  {
    id: 'sql-formatter',
    name: 'SQL Query Formatter & Syntax Beautifier',
    category: 'AI & Dev',
    description: 'Beautify complex PostgreSQL, MySQL, and Snowflake queries offline.',
    keywords: ['sql formatter', 'format sql query', 'beautify sql'],
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    component: SqlFormatterTool,
  },
  {
    id: 'csv-json',
    name: 'CSV to JSON & Array Converter',
    category: 'AI & Dev',
    description: 'Convert CSV spreadsheets to structured JSON arrays or objects instantly.',
    keywords: ['csv to json', 'convert csv json', 'csv parser'],
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
    component: CsvJsonTool,
  },
  {
    id: 'diff-viewer',
    name: 'Code & Text Side-by-Side Diff Checker',
    category: 'AI & Dev',
    description: 'Compare two text or code snippets line-by-line to spot differences.',
    keywords: ['diff checker', 'compare text', 'code diff viewer'],
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"/><path d="M6 18h13a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H6l-4 3.5 4 3.5Z"/>
      </svg>
    ),
    component: DiffViewerTool,
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Token Decoder & Expiry Inspector',
    category: 'AI & Dev',
    description: 'Decode JSON Web Token header, payload claims, and check expiration time.',
    keywords: ['jwt decoder', 'decode jwt token', 'jwt parser'],
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    component: JwtDecoderTool,
  },
  {
    id: 'cron-parser',
    name: 'Cron Schedule Expression Generator & Explainer',
    category: 'AI & Dev',
    description: 'Generate standard 5-field cron syntax and see next execution runtimes.',
    keywords: ['cron parser', 'cron generator', 'explain cron expression'],
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    component: CronParserTool,
  },
  {
    id: 'markdown-editor',
    name: 'Markdown Live Editor & HTML Converter',
    category: 'AI & Dev',
    description: 'Write markdown with live rendered preview and export clean HTML code.',
    keywords: ['markdown editor', 'markdown preview', 'md to html'],
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    component: MarkdownEditorTool,
  },
  {
    id: 'password-generator',
    name: 'Secure Offline Password & Passphrase Generator',
    category: 'AI & Dev',
    description: 'Generate cryptographically secure passwords and Diceware passphrases locally.',
    keywords: ['password generator', 'secure passphrase', 'random password offline'],
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    component: PasswordGeneratorTool,
  },
  // ─── SEO & Web Suite Expansion ───
  {
    id: 'meta-robots',
    name: 'Meta Robots & Canonical Tag Generator',
    category: 'SEO & Web',
    description: 'Generate clean HTML head meta robots tags and canonical link directives.',
    keywords: ['meta robots tag', 'canonical url generator', 'seo robots noindex'],
    color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    component: MetaRobotsTool,
  },
  {
    id: 'keyword-density',
    name: 'SEO Keyword Density & Frequency Analyzer',
    category: 'SEO & Web',
    description: 'Analyze content keyword frequency, density percentage, and stop words.',
    keywords: ['keyword density', 'seo keyword checker', 'word frequency analyzer'],
    color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    component: KeywordDensityTool,
  },
  {
    id: 'sitemap-generator',
    name: 'Sitemap XML & URL List Extractor',
    category: 'SEO & Web',
    description: 'Generate Google-compliant sitemap XML files with priority and changefreq.',
    keywords: ['sitemap generator', 'xml sitemap', 'url list to xml'],
    color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
    component: SitemapGeneratorTool,
  },
  {
    id: 'favicon-generator',
    name: 'SVG Favicon & Web Manifest Generator',
    category: 'SEO & Web',
    description: 'Design vector SVG favicons and export site.webmanifest JSON for modern PWA.',
    keywords: ['favicon generator', 'svg favicon', 'web manifest generator'],
    color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polygon points="12 8 8 12 12 16 12 8"/>
      </svg>
    ),
    component: FaviconGeneratorTool,
  },
  // ─── E-Commerce Suite Expansion ───
  {
    id: 'stripe-paypal',
    name: 'Stripe vs PayPal Processing Fee Comparator',
    category: 'E-Commerce',
    description: 'Compare Stripe and PayPal fee cuts side-by-side for domestic and international sales.',
    keywords: ['stripe vs paypal', 'payment fee comparison', 'merchant processor fee'],
    color: '#f97316', bg: 'rgba(249,115,22,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    component: StripePaypalTool,
  },
  {
    id: 'bundle-margin',
    name: 'E-Commerce Product Bundle Margin Calculator',
    category: 'E-Commerce',
    description: 'Calculate product bundle discount profitability, gross margins, and break-even units.',
    keywords: ['bundle pricing', 'bundle margin calculator', 'kit pricing e-commerce'],
    color: '#f97316', bg: 'rgba(249,115,22,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
    component: BundleMarginTool,
  },
  {
    id: 'shipping-rate',
    name: 'Shopify/WooCommerce Shipping Rate & DIM Solver',
    category: 'E-Commerce',
    description: 'Calculate dimensional weight (DIM Divisor) and carrier billable shipping weight.',
    keywords: ['dimensional weight', 'dim weight calculator', 'shipping cost estimator'],
    color: '#f97316', bg: 'rgba(249,115,22,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    component: ShippingRateTool,
  },
  // ─── Freelance & Business Suite Expansion ───
  {
    id: 'invoice-tax',
    name: 'Multi-Item Invoice Line Tax & Discount Calculator',
    category: 'Freelance',
    description: 'Calculate multi-line item totals, percentage/flat discounts, and regional sales tax.',
    keywords: ['invoice tax calculator', 'multi item discount', 'line item tax'],
    color: '#22c55e', bg: 'rgba(34,197,94,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    component: InvoiceTaxTool,
  },
  {
    id: 'project-scoper',
    name: 'Freelance Project Scoper & Quote Generator',
    category: 'Freelance',
    description: 'Build structured project scopes, estimate billable hours, and buffer risk contingency.',
    keywords: ['project quote estimate', 'freelance quote generator', 'project scope calculator'],
    color: '#22c55e', bg: 'rgba(34,197,94,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    component: ProjectScoperTool,
  },
  {
    id: 'timezone-planner',
    name: 'Remote Team Timezone & Overlap Planner',
    category: 'Freelance',
    description: 'Coordinate remote teams across UTC offsets and discover golden working overlap hours.',
    keywords: ['timezone planner', 'team overlap calculator', 'utc meeting planner'],
    color: '#22c55e', bg: 'rgba(34,197,94,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    component: TimezonePlannerTool,
  },
  // ─── Marketing & Content Suite Expansion ───
  {
    id: 'qr-generator',
    name: 'SVG QR Code Generator with Custom Colors',
    category: 'Marketing',
    description: 'Create vector SVG QR codes for URLs and marketing campaigns without server calls.',
    keywords: ['qr code generator', 'svg qr code', 'offline qr generator'],
    color: '#14b8a6', bg: 'rgba(20,184,166,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    component: QrCodeGeneratorTool,
  },
  {
    id: 'email-subject',
    name: 'Email Subject Line & Inbox Preview Checker',
    category: 'Marketing',
    description: 'Preview email subject & preheader text in iOS Mail and check spam trigger words.',
    keywords: ['email subject checker', 'preheader preview', 'spam word checker'],
    color: '#14b8a6', bg: 'rgba(20,184,166,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    component: EmailSubjectTool,
  },
  {
    id: 'ad-copy-counter',
    name: 'Ad Copy Character Limit & Visual Meter',
    category: 'Marketing',
    description: 'Draft Google Search, Meta, and LinkedIn ad copy against exact character limits.',
    keywords: ['ad copy character limit', 'google ads headline counter', 'meta ad text counter'],
    color: '#14b8a6', bg: 'rgba(20,184,166,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
    ),
    component: AdCopyCounterTool,
  },
];

/* ─── Tool Card (Monday.com Board Card Style) ────────────── */
function ToolCard({ tool, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="tool-card animate-fade-in"
      style={{ '--card-accent': tool.color }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="tool-card-icon" style={{ background: tool.bg, color: tool.color }}>
          {tool.icon}
        </div>
        <span
          className="badge"
          style={{
            background: '#f0f2f5',
            color: '#676879',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 10px'
          }}
        >
          {tool.category}
        </span>
      </div>
      <div style={{ marginTop: 4 }}>
        <div className="tool-card-name" style={{ fontSize: 16 }}>{tool.name}</div>
        <div className="tool-card-desc" style={{ marginTop: 6, fontSize: 13, color: '#676879' }}>{tool.description}</div>
      </div>
      <div
        className="tool-card-arrow"
        style={{
          marginTop: 'auto',
          paddingTop: 12,
          borderTop: '1px solid #f0f2f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontWeight: 700,
          color: hovered ? '#6161ff' : '#676879'
        }}
      >
        <span>Open utility</span>
        <span style={{ transform: hovered ? 'translateX(3px)' : 'none', transition: 'transform 0.15s ease' }}>→</span>
      </div>
    </div>
  );
}

/* ─── Home Grid (Monday.com Hero & Workspace Board) ──────── */
function HomeGrid({ tools, onSelectTool, selectedCategory }) {
  const filtered = selectedCategory === 'All' ? tools : tools.filter(t => t.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* ─── PhantomBuster-Inspired Hero ─── */}
      <div className="pb-hero">
        {/* Floating gradient blobs (pure CSS via ::before) */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs mb-8" style={{
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.9)',
          color: '#6161ff',
          boxShadow: '0 2px 12px rgba(97,97,255,0.1)',
        }}>
          <span className="w-2 h-2 rounded-full bg-[#00c875] animate-pulse"></span>
          100 free offline tools — no signup needed
        </div>

        <h1 className="pb-display">
          The toolkit<br />
          sellers <span className="highlight">actually</span><br />
          bookmark.
        </h1>

        <p className="pb-subtitle">
          Fee calculators, PDF tools, and image utilities that run in your browser.
          Nothing uploads. Nothing tracks. It's just math.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
          <a href="#tools-grid" className="pb-cta pb-cta-primary" style={{ textDecoration: 'none' }}>
            Explore all {tools.length} tools →
          </a>
          <a href="https://buymeacoffee.com" target="_blank" rel="noopener noreferrer" className="pb-cta pb-cta-secondary" style={{ textDecoration: 'none' }}>
            ☕ Buy me a coffee
          </a>
        </div>

        {/* Stats row */}
        <div className="pb-stats">
          <div className="pb-stat">
            <div className="pb-stat-value">100</div>
            <div className="pb-stat-label">Offline Tools</div>
          </div>
          <div className="pb-stat">
            <div className="pb-stat-value">0</div>
            <div className="pb-stat-label">Cloud Uploads</div>
          </div>
          <div className="pb-stat">
            <div className="pb-stat-value">$0</div>
            <div className="pb-stat-label">Forever</div>
          </div>
          <div className="pb-stat">
            <div className="pb-stat-value">6</div>
            <div className="pb-stat-label">Platform Integrations</div>
          </div>
        </div>
      </div>

      {/* Trust Brand Strip — Polished Third-Party Platforms */}
      <div className="text-center" style={{ marginBottom: 64, marginTop: 12 }}>
        <div style={{
          fontSize: 12, fontWeight: 700, color: '#868894',
          textTransform: 'uppercase', letterSpacing: '0.08em',
          marginBottom: 28
        }}>
          Works with the platforms sellers actually use
        </div>
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center',
          gap: '36px 56px', opacity: 0.85,
        }}>
          {/* Shopify */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'default' }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: '#95BF47', display: 'inline-block' }}></span>
            <span style={{ fontSize: 21, fontWeight: 800, color: '#1a1a2e', letterSpacing: '-0.03em' }}>Shopify</span>
          </div>

          {/* Amazon */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'default', position: 'relative' }}>
            <span style={{ fontSize: 21, fontWeight: 800, color: '#1a1a2e', letterSpacing: '-0.04em', lineHeight: 1 }}>amazon</span>
            <svg width="44" height="9" viewBox="0 0 44 9" style={{ marginTop: 2 }}>
              <path d="M4 3 C 15 9, 29 9, 40 3" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M37 1 L 41 3 L 37 6" fill="#FF9900" />
            </svg>
          </div>

          {/* Etsy */}
          <div style={{ cursor: 'default' }}>
            <span style={{
              fontFamily: 'Georgia, serif', fontStyle: 'italic',
              fontSize: 26, fontWeight: 700, color: '#F1641E',
              letterSpacing: '-0.02em'
            }}>
              Etsy
            </span>
          </div>

          {/* Stripe */}
          <div style={{ cursor: 'default' }}>
            <span style={{ fontSize: 23, fontWeight: 900, color: '#635BFF', letterSpacing: '-0.04em' }}>
              stripe
            </span>
          </div>

          {/* PayPal */}
          <div style={{ cursor: 'default' }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: '#003087', letterSpacing: '-0.03em' }}>
              Pay<span style={{ color: '#0079C1' }}>Pal</span>
            </span>
          </div>

          {/* TikTok Shop */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'default' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#25F4EE', display: 'inline-block' }}></span>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FE2C55', display: 'inline-block' }}></span>
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#1a1a2e', letterSpacing: '-0.03em' }}>
              TikTok Shop
            </span>
          </div>
        </div>
      </div>

      {/* Feature Showcase — PhantomBuster glassmorphic cards */}
      <div className="pb-section-gradient" style={{ marginLeft: -24, marginRight: -24, paddingLeft: 24, paddingRight: 24, marginBottom: 48 }}>
        <div className="text-center" style={{ marginBottom: 40 }}>
          <h2 className="pb-display" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', marginBottom: 12 }}>
            Three suites.<br />One bookmark.
          </h2>
          <p className="pb-subtitle" style={{ marginBottom: 0 }}>
            Fee calculators for sellers, a full PDF toolkit, and image tools — all running offline in your browser.
          </p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 28,
          maxWidth: 1100,
          margin: '0 auto',
        }}>
          {/* E-Commerce Card */}
          <div className="pb-glass-card" style={{ cursor: 'pointer' }} onClick={() => onSelectTool('etsy-fee')}>
            <img src="/images/feature-ecommerce.jpg" alt="E-Commerce fee calculators" />
            <div className="pb-glass-card-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ background: 'rgba(249,115,22,0.12)', color: '#f97316', padding: '5px 12px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>11 TOOLS</span>
              </div>
              <h3>Fee calculators that don't lie to you</h3>
              <p>Etsy, Amazon FBA, Stripe, PayPal, Shopify, TikTok Shop — every hidden fee exposed before you list.</p>
            </div>
          </div>

          {/* PDF Suite Card */}
          <div className="pb-glass-card" style={{ cursor: 'pointer' }} onClick={() => onSelectTool('merge-pdf')}>
            <img src="/images/feature-pdf-tools.jpg" alt="PDF tools — merge, split, protect, convert" />
            <div className="pb-glass-card-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ background: '#eceeff', color: '#6161ff', padding: '5px 12px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>35 TOOLS</span>
              </div>
              <h3>Every PDF tool. Zero uploads.</h3>
              <p>Merge, split, compress, rotate, watermark, password-protect, OCR, convert to Word — all in your browser.</p>
            </div>
          </div>

          {/* Image Suite Card */}
          <div className="pb-glass-card" style={{ cursor: 'pointer' }} onClick={() => onSelectTool('image-crop-resize')}>
            <img src="/images/feature-image-tools.jpg" alt="Image tools — crop, compress, edit" />
            <div className="pb-glass-card-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ background: 'rgba(236,72,153,0.12)', color: '#ec4899', padding: '5px 12px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>29 TOOLS</span>
              </div>
              <h3>Image editing without the subscription</h3>
              <p>Crop, compress, remove backgrounds, add watermarks, make memes, generate collages — no Canva needed.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Culture Meme Widget */}
      <div style={{ marginBottom: 40 }}>
        <CultureMemeWidget />
      </div>


      {/* Grid Section Heading */}
      <div id="tools-grid" className="flex items-center justify-between mb-6 pt-4">
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1f2532', letterSpacing: '-0.03em' }}>
            {selectedCategory === 'All' ? 'All Workspace Utilities' : `${selectedCategory} Utilities`}
          </h2>
          <p style={{ fontSize: 14, color: '#676879', marginTop: 2 }}>
            Pick a tool and get your answer. No accounts, no tutorials, no onboarding emails.
          </p>
        </div>
        <span className="badge" style={{ background: '#eceeff', color: '#6161ff', fontWeight: 700 }}>
          {filtered.length} utilities
        </span>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 20,
      }}>
        {filtered.map((tool, i) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onClick={() => onSelectTool(tool.id)}
          />
        ))}
      </div>

      {/* Point #4: Short 'Why this exists' line in founder's actual voice */}
      <div
        className="mt-16 p-8 rounded-2xl bg-white border border-[#e6e9ef]"
        style={{
          boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 11.5, fontWeight: 700, color: '#6161ff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Why This Exists
          </span>
        </div>
        <p style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 21,
          fontWeight: 600,
          color: '#1f2532',
          lineHeight: 1.5,
          fontStyle: 'italic'
        }}>
          "I kept opening five tabs just to figure out if a $35 listing was actually worth making. Etsy takes a cut, then another cut, then an ad fee if you're not careful. So I built this instead — it does the math in your browser, doesn't ask for your email, and doesn't save anything anywhere. Bookmark it and forget I exist."
        </p>
        <div className="flex items-center justify-between pt-2 flex-wrap gap-4">
          <span style={{ fontSize: 13, fontWeight: 600, color: '#676879' }}>
            — Someone who got tired of doing this by hand.
          </span>
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#6161ff', textDecoration: 'none' }}
            className="inline-flex items-center gap-1.5 text-xs font-bold hover:underline"
          >
            <span>☕ Buy the creator a coffee →</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Main App ───────────────────────────────────────────── */
export default function App() {
  const [activeToolId, setActiveToolId] = useState(null); // null = home grid
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [starredIds, setStarredIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tw_starred') || '[]'); }
    catch { return []; }
  });

  const [recentIds, setRecentIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tw_recent') || '[]'); }
    catch { return []; }
  });

  const handleSelectTool = (id) => {
    setActiveToolId(id);
    setRecentIds(prev => {
      const updated = [id, ...prev.filter(i => i !== id)].slice(0, 6);
      try { localStorage.setItem('tw_recent', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  const handleSelectCategory = (cat, opts = {}) => {
    setSelectedCategory(cat);
    setActiveToolId(null); // go back to grid
    setTimeout(() => {
      if (opts.scrollToTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById('tools-grid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleToggleStar = (id) => {
    setStarredIds(prev => {
      const isStarred = prev.includes(id);
      const updated = isStarred ? prev.filter(i => i !== id) : [...prev, id];
      try { localStorage.setItem('tw_starred', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  // Cmd+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(p => !p);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const activeTool = TOOLS.find(t => t.id === activeToolId);
  const ActiveComponent = activeTool?.component;
  const isStarred = activeTool ? starredIds.includes(activeTool.id) : false;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-app)' }}>
      {/* Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
        {/* Sidebar — only show when a tool is active */}
        {activeToolId && (
          <Sidebar
            tools={TOOLS}
            activeToolId={activeToolId}
            onSelectTool={handleSelectTool}
            starredIds={starredIds}
            recentIds={recentIds}
          />
        )}

        {/* Main content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>

            {activeToolId && activeTool ? (
              <>
                {/* Breadcrumb + actions bar */}
                <div className="no-print" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: 24, flexWrap: 'wrap', gap: 12,
                }}>
                  <button
                    onClick={() => setActiveToolId(null)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      fontSize: 13, fontWeight: 500, color: 'var(--text-4)',
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      transition: 'color 0.13s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-4)'}
                  >
                    <ArrowLeft size={14} />
                    All Tools
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {/* Category badge */}
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: '3px 9px',
                      borderRadius: 99, background: 'rgba(255,255,255,0.06)',
                      color: 'var(--text-4)', border: '1px solid var(--border)',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}>
                      {activeTool.category}
                    </span>

                    {/* Star button */}
                    <button
                      onClick={() => handleToggleStar(activeTool.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 13, fontWeight: 600, cursor: 'pointer',
                        padding: '6px 14px', borderRadius: 8, transition: 'all 0.15s ease',
                        background: isStarred ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.04)',
                        color: isStarred ? '#f59e0b' : 'var(--text-4)',
                        border: isStarred ? '1.5px solid rgba(245,158,11,0.3)' : '1.5px solid var(--border)',
                      }}
                    >
                      <Star size={13} fill={isStarred ? '#f59e0b' : 'none'} />
                      {isStarred ? 'Starred' : 'Star this tool'}
                    </button>
                  </div>
                </div>

                {/* Tool content */}
                <div className="animate-fade-in">
                  <ActiveComponent />
                </div>
              </>
            ) : (
              /* Home Grid */
              <HomeGrid
                tools={TOOLS}
                onSelectTool={handleSelectTool}
                selectedCategory={selectedCategory}
              />
            )}

            {/* PhantomBuster-Style Multi-Column Footer */}
            <div className="pb-footer no-print" style={{ marginLeft: -32, marginRight: -32, marginBottom: -28 }}>
              <div className="pb-footer-grid">
                {/* Brand column */}
                <div className="pb-footer-brand">
                  <h3>pahruli</h3>
                  <p>100 offline tools for founders and creators. Built by someone who got tired of doing this by hand.</p>
                  <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                    <a href="https://buymeacoffee.com" target="_blank" rel="noopener noreferrer" className="pb-cta pb-cta-primary" style={{ fontSize: 12, padding: '8px 18px', textDecoration: 'none' }}>
                      ☕ Buy me a coffee
                    </a>
                  </div>
                </div>

                {/* Tools column */}
                <div className="pb-footer-col">
                  <h4>Tools</h4>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveToolId(null); }}>E-Commerce</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveToolId(null); }}>PDF Suite</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveToolId(null); }}>Image Tools</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveToolId(null); }}>Developer</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveToolId(null); }}>Marketing</a>
                </div>

                {/* Popular column */}
                <div className="pb-footer-col">
                  <h4>Popular</h4>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleSelectTool('etsy-fee'); }}>Etsy Calculator</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleSelectTool('merge-pdf'); }}>Merge PDF</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleSelectTool('invoice-generator'); }}>Invoice Generator</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleSelectTool('stripe-fee'); }}>Stripe Calculator</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleSelectTool('image-crop-resize'); }}>Image Cropper</a>
                </div>

                {/* Resources column */}
                <div className="pb-footer-col">
                  <h4>Resources</h4>
                  <a href="https://buymeacoffee.com" target="_blank" rel="noopener noreferrer">Support Us</a>
                  <a href="#">Privacy</a>
                  <a href="#">Changelog</a>
                </div>

                {/* About column */}
                <div className="pb-footer-col">
                  <h4>About</h4>
                  <a href="#">100% Client-Side</a>
                  <a href="#">No Data Collection</a>
                  <a href="#">Open Source</a>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="pb-footer-bottom">
                <span>© 2026 Pahruli. Free forever.</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#6161ff' }}>v8.0.0 · 100 Tools</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Cmd+K Search */}
      <CommandKModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tools={TOOLS}
        onSelectTool={handleSelectTool}
        starredIds={starredIds}
      />
    </div>
  );
}
