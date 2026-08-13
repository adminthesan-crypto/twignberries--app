import React from 'react';
import EtsyFeeCalculator from '../tools/EtsyFeeCalculator';
import InvoiceGenerator from '../tools/InvoiceGenerator';
import StripeFeeCalculator from '../tools/StripeFeeCalculator';
import GstCalculator from '../tools/GstCalculator';
import UtmBuilder from '../tools/UtmBuilder';
import PayPalFeeCalculator from '../tools/PayPalFeeCalculator';
import YouTubeRpmCalculator from '../tools/YouTubeRpmCalculator';
import PdfMarkdownConverter from '../tools/PdfMarkdownConverter';
import AmazonFbaCalculator from '../tools/AmazonFbaCalculator';
import TikTokShopCalculator from '../tools/TikTokShopCalculator';
import RoasCalculator from '../tools/RoasCalculator';
import ShopifyFeeCalculator from '../tools/ShopifyFeeCalculator';
import CreatorPlatformFeeCalculator from '../tools/CreatorPlatformFeeCalculator';
import SaasChurnLtvCalculator from '../tools/SaasChurnLtvCalculator';
import AiTokenCostCalculator from '../tools/AiTokenCostCalculator';
import MergePdfTool from '../tools/MergePdfTool';
import SplitPdfTool from '../tools/SplitPdfTool';
import ImageToPdfTool from '../tools/ImageToPdfTool';
import WatermarkPdfTool from '../tools/WatermarkPdfTool';
import ProtectPdfTool from '../tools/ProtectPdfTool';
import RotatePdfTool from '../tools/RotatePdfTool';
import OrganizePdfTool from '../tools/OrganizePdfTool';
import PageNumberPdfTool from '../tools/PageNumberPdfTool';
import PdfMetadataTool from '../tools/PdfMetadataTool';
import SvgToImageTool from '../tools/SvgToImageTool';
import SocialImageCropperTool from '../tools/SocialImageCropperTool';
import ColorPaletteTool from '../tools/ColorPaletteTool';
import JsonFormatterTool from '../tools/JsonFormatterTool';
import RegexTesterTool from '../tools/RegexTesterTool';
import OpenGraphPreviewTool from '../tools/OpenGraphPreviewTool';
import PdfTextExtractorTool from '../tools/PdfTextExtractorTool';
import PdfCropTool from '../tools/PdfCropTool';
import PdfBookletTool from '../tools/PdfBookletTool';
import PdfToImageTool from '../tools/PdfToImageTool';
import CompressPdfTool from '../tools/CompressPdfTool';
import WordToPdfTool from '../tools/WordToPdfTool';
import PdfToWordTool from '../tools/PdfToWordTool';
import ExcelToPdfTool from '../tools/ExcelToPdfTool';
import PdfToExcelTool from '../tools/PdfToExcelTool';
import PowerPointToPdfTool from '../tools/PowerPointToPdfTool';
import PdfToPowerPointTool from '../tools/PdfToPowerPointTool';
import UnlockPdfTool from '../tools/UnlockPdfTool';
import PdfToPdfATool from '../tools/PdfToPdfATool';
import RepairPdfTool from '../tools/RepairPdfTool';
import RedactPdfTool from '../tools/RedactPdfTool';
import SignPdfTool from '../tools/SignPdfTool';
import EditPdfTool from '../tools/EditPdfTool';
import PdfFormsTool from '../tools/PdfFormsTool';
import ScanToPdfTool from '../tools/ScanToPdfTool';
import OcrPdfTool from '../tools/OcrPdfTool';
import ComparePdfTool from '../tools/ComparePdfTool';
import AiPdfSummarizerTool from '../tools/AiPdfSummarizerTool';
import TranslatePdfTool from '../tools/TranslatePdfTool';
import HtmlToPdfTool from '../tools/HtmlToPdfTool';
import Base64ImageTool from '../tools/Base64ImageTool';
import CssGradientTool from '../tools/CssGradientTool';
import ImagePaletteTool from '../tools/ImagePaletteTool';
import SvgOptimizerTool from '../tools/SvgOptimizerTool';
import ImageCompressorTool from '../tools/ImageCompressorTool';
import ImageResizerTool from '../tools/ImageResizerTool';
import SqlFormatterTool from '../tools/SqlFormatterTool';
import CsvJsonTool from '../tools/CsvJsonTool';
import DiffViewerTool from '../tools/DiffViewerTool';
import JwtDecoderTool from '../tools/JwtDecoderTool';
import CronParserTool from '../tools/CronParserTool';
import MarkdownEditorTool from '../tools/MarkdownEditorTool';
import PasswordGeneratorTool from '../tools/PasswordGeneratorTool';
import MetaRobotsTool from '../tools/MetaRobotsTool';
import KeywordDensityTool from '../tools/KeywordDensityTool';
import SitemapGeneratorTool from '../tools/SitemapGeneratorTool';
import FaviconGeneratorTool from '../tools/FaviconGeneratorTool';
import StripePaypalTool from '../tools/StripePaypalTool';
import BundleMarginTool from '../tools/BundleMarginTool';
import ShippingRateTool from '../tools/ShippingRateTool';
import InvoiceTaxTool from '../tools/InvoiceTaxTool';
import ProjectScoperTool from '../tools/ProjectScoperTool';
import TimezonePlannerTool from '../tools/TimezonePlannerTool';
import QrCodeGeneratorTool from '../tools/QrCodeGeneratorTool';
import EmailSubjectTool from '../tools/EmailSubjectTool';
import AdCopyCounterTool from '../tools/AdCopyCounterTool';
import CropImageTool from '../tools/CropImageTool';
import ConvertToJpgTool from '../tools/ConvertToJpgTool';
import ConvertFromJpgTool from '../tools/ConvertFromJpgTool';
import RotateImageTool from '../tools/RotateImageTool';
import WatermarkImageTool from '../tools/WatermarkImageTool';
import PhotoEditorTool from '../tools/PhotoEditorTool';
import UpscaleImageTool from '../tools/UpscaleImageTool';
import RemoveBackgroundTool from '../tools/RemoveBgImageTool';
import MemeGeneratorTool from '../tools/MemeGeneratorTool';
import HtmlToImageTool from '../tools/HtmlToImageTool';
import BlurFaceTool from '../tools/BlurFaceTool';
import ImageColorPickerTool from '../tools/ImageColorPickerTool';
import ImageSplitterTool from '../tools/ImageSplitterTool';
import ImageMetadataExifTool from '../tools/ImageMetadataExifTool';
import SvgToPngConverterTool from '../tools/SvgToPngConverterTool';
import ImageRoundCornersTool from '../tools/ImageRoundCornersTool';
import ImageToBase64BulkTool from '../tools/ImageToBase64BulkTool';
import ImageNoiseReducerTool from '../tools/ImageNoiseReducerTool';
import ImageDuotoneTool from '../tools/ImageDuotoneTool';
import ImageCollageMakerTool from '../tools/ImageCollageMakerTool';

const TOOLS = [
  {
    id: 'etsy-fee',
    seo: {
      title: "Etsy Fee & Profit Margin Calculator 2026 (USD)",
      h1: "Etsy Fee Calculator (2026)",
      description: "Calculate your real Etsy profit margin after listing fees, the 6.5% transaction cut, and offsite ads. 100% private and runs offline in your browser."
    },
    name: 'Etsy Fee Calculator',
    marketingCopy: 'What Etsy actually leaves you with',
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
    useCases: ['digital-products', 'print-on-demand', 'handmade', 'vintage'],
  },
  {
    id: 'paypal-fee',
    seo: {
      title: "PayPal Merchant Fee Calculator 2026 (Domestic & Intl)",
      h1: "PayPal Fee Calculator",
      description: "Calculate PayPal standard and micropayment rates to see your real payout before you invoice a client."
    },
    name: 'PayPal Fee Calculator',
    marketingCopy: 'PayPal\'s cut, before it surprises you',
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
    seo: {
      title: "Stripe Fee Calculator & Break-Even Payout Estimator",
      h1: "Stripe Break-Even Calculator",
      description: "Work backward from your target profit to calculate the exact amount you must charge to cover Stripe processing fees."
    },
    name: 'Stripe Fee Calculator',
    marketingCopy: 'How much to charge to actually break even?',
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
    useCases: ['uk', 'canada', 'australia', 'india', 'non-profits'],
  },
  {
    id: 'gst-calculator',
    seo: {
      title: "Free GST Calculator India (Inclusive & Exclusive)",
      h1: "GST Calculator",
      description: "Flip between GST inclusive and exclusive prices instantly. No ads, no cloud uploads, just an offline tax calculator."
    },
    name: 'GST Calculator',
    marketingCopy: 'Is that price with GST or without?',
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
    seo: {
      title: "Amazon FBA Profit & Referral Fee Calculator 2026",
      h1: "Amazon FBA Margin Calculator",
      description: "Calculate your real FBA margin after Amazon takes its share for fulfillment and referral fees (USD). Browser-based."
    },
    name: 'Amazon FBA Calculator',
    marketingCopy: 'FBA fees are a maze. Here\'s the exit.',
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
    seo: {
      title: "TikTok Shop Affiliate & Seller Commission Calculator",
      h1: "TikTok Shop Fee Calculator",
      description: "Figure out your exact take-home profit after the 6% TikTok Shop commission and affiliate creator cuts. 100% offline."
    },
    name: 'TikTok Shop Calculator',
    marketingCopy: 'TikTok Shop wants 6%. Here\'s what\'s left.',
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
    seo: {
      title: "Shopify Transaction Fee & Plan Break-Even Calculator",
      h1: "Shopify Break-Even Calculator",
      description: "Compare monthly Shopify plans against real credit card processing rates to find the break-even point for your store."
    },
    name: 'Shopify Fee Calculator',
    marketingCopy: 'Which Shopify plan actually pays for itself?',
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
    seo: {
      title: "Free Freelance Invoice Generator (PDF, No Watermark)",
      h1: "Freelance Invoice Generator",
      description: "Generate, preview, and download a clean PDF invoice instantly for free. No watermark, no signup, 100% private."
    },
    name: 'Invoice Generator',
    marketingCopy: 'A proper invoice, in the time it takes to make tea.',
    category: 'Freelance',
    description: 'Generate, preview, and download a clean PDF invoice instantly. No watermark.',
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
    seo: {
      title: "Markdown to PDF Converter (GitHub Flavored)",
      h1: "Markdown to PDF",
      description: "Turn raw markdown notes or readmes into a polished, print-ready PDF document instantly and offline."
    },
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
    seo: {
      title: "Patreon vs BuyMeACoffee Platform Fee Calculator",
      h1: "Creator Platform Fees",
      description: "Compare Patreon, BuyMeACoffee, and Ko-fi processing fees side-by-side to see which platform leaves you more profit."
    },
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
    seo: {
      title: "SaaS MRR Churn & LTV:CAC Payback Calculator",
      h1: "SaaS Churn & LTV Calculator",
      description: "Calculate your real SaaS customer Lifetime Value (LTV) and CAC payback period. Perfect for bootstrapped startups."
    },
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
    seo: {
      title: "YouTube AdSense RPM & CPM Estimator 2026",
      h1: "YouTube RPM Estimator",
      description: "Estimate realistic YouTube AdSense earnings across niches based on actual creator RPMs. Fast and offline."
    },
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
    seo: {
      title: "Google Analytics 4 UTM Campaign URL Builder",
      h1: "UTM Campaign Builder",
      description: "Build clean GA4 campaign tracking URLs without typo headaches. Supports source, medium, campaign, and content tags."
    },
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
    seo: {
      title: "ROAS Break-Even & Facebook Ads Spend Calculator",
      h1: "ROAS Break-Even Calculator",
      description: "Know your exact break-even Return on Ad Spend (ROAS) before you turn on Meta or Google paid ads."
    },
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
    seo: {
      title: "GPT-4o vs Claude 3.5 AI API Token Cost Calculator",
      h1: "AI API Cost Calculator",
      description: "Compare token pricing between OpenAI, Anthropic, and Google Gemini APIs before your bill surprises you."
    },
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
    seo: {
      title: "Combine & Merge PDF Documents Offline (Private)",
      h1: "Merge PDF Offline",
      description: "Combine and merge multiple PDF documents in your browser. 100% offline, free, and no cloud server uploads required."
    },
    name: 'Merge PDF — Combine Files Offline',
    category: 'PDF Tools',
    description: 'Merge and combine PDF documents in seconds. 100% free, zero file limits, no cloud upload required.',
    keywords: ['merge pdf', 'pdf merge', 'combine pdf', 'join pdf', 'offline pdf merge', 'smallpdf', 'ilovepdf', 'pdf24'],
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
    seo: {
      title: "Split PDF & Extract Pages Offline (No Limits)",
      h1: "Split PDF Offline",
      description: "Extract specific pages or chop up a PDF without waiting on a server or hitting artificial file limits."
    },
    name: 'Split PDF & Extract Pages',
    category: 'PDF Tools',
    description: 'Extract specific pages or chop up a PDF without waiting on a server.',
    keywords: ['split pdf', 'extract pages', 'cut pdf', 'page range', 'pdf slicer', 'smallpdf'],
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
    seo: {
      title: "Convert Images to A4 PDF Offline (JPG/PNG)",
      h1: "Images to PDF Converter",
      description: "Turn your JPG, PNG, and screenshots into a clean A4 PDF document securely in your browser."
    },
    name: 'Images to PDF (JPG & PNG to PDF)',
    category: 'PDF Tools',
    description: 'Convert JPG, PNG, and screenshots into a clean A4 PDF document offline in your browser.',
    keywords: ['images to pdf', 'jpg to pdf', 'png to pdf', 'img to pdf', 'convert image to pdf', 'smallpdf', 'ilovepdf', 'i love pdf', 'pdf24'],
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
    seo: {
      title: "Stamp Watermarks & Confidential Text on PDF",
      h1: "Watermark PDF Offline",
      description: "Stamp custom text or confidential warnings across your PDF documents instantly without leaving your device."
    },
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
    seo: {
      title: "Password Protect & Encrypt PDF Documents Offline",
      h1: "Protect PDF Offline",
      description: "Lock sensitive PDF documents with AES encryption passwords securely in your local browser."
    },
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
    seo: {
      title: "Rotate PDF Pages Offline (Fix Sideways Scans)",
      h1: "Rotate PDF Pages",
      description: "Fix upside-down or sideways PDF pages instantly. Processing happens locally so your NDA files never leave your device."
    },
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
    seo: {
      title: "Reorder & Delete PDF Pages Offline (Drag-and-Drop)",
      h1: "Organize PDF Pages",
      description: "Drag and drop to reorder, duplicate, or delete specific pages from your PDF entirely in your browser."
    },
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
    seo: {
      title: "Stamp Page Numbers on PDF Documents Offline",
      h1: "Add PDF Page Numbers",
      description: "Add neat \"Page X of Y\" stamps to your PDF reports or legal packets without using slow online servers."
    },
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
    seo: {
      title: "PDF Metadata Inspector & Privacy Scrubber",
      h1: "PDF Privacy Scrubber",
      description: "Inspect PDF author tags and scrub tracking metadata clean before sharing sensitive documents."
    },
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
    seo: {
      title: "SVG to High-Res Retina PNG/JPG Converter Offline",
      h1: "SVG to PNG Converter",
      description: "Convert scalable vector graphics (SVG) into crisp 1x-8x Retina PNG or JPG exports entirely in your browser."
    },
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
    seo: {
      title: "TikTok Shop & Instagram Aspect Ratio Image Cropper",
      h1: "Social Media Image Cropper",
      description: "Crop and frame images for TikTok Shop, Instagram Reels, or YouTube without accidentally cropping heads. Free & offline."
    },
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
    seo: {
      title: "WCAG Color Contrast Checker & Palette Generator",
      h1: "WCAG Contrast Checker",
      description: "Check ADA/WCAG contrast ratios and copy clean SaaS color pairings. An essential free tool for designers."
    },
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
    seo: {
      title: "JSON Beautifier & TypeScript Type Generator",
      h1: "JSON Formatter",
      description: "Beautify messy JSON data, catch syntax bugs, and instantly export TypeScript interfaces offline."
    },
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
    seo: {
      title: "Live Regex Tester & Pattern Match Explainer",
      h1: "Regex Pattern Tester",
      description: "Test complex regular expression (Regex) patterns with live group highlights and explanations."
    },
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
    seo: {
      title: "OpenGraph Social Card & Twitter Preview Simulator",
      h1: "OpenGraph Preview",
      description: "See exactly how your meta tags and OpenGraph image will look on Slack, X/Twitter, and LinkedIn before posting."
    },
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
    seo: {
      title: "Extract Raw Text from PDF Documents Offline",
      h1: "PDF to Plain Text",
      description: "Extract raw, selectable plaintext from PDF pages locally in your browser. No signup required."
    },
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
    seo: {
      title: "Crop PDF Margins for Kindle & e-Readers Offline",
      h1: "Crop PDF Margins",
      description: "Trim white margins and resize PDF page boxes for optimal reading on Kindle and mobile devices."
    },
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
    seo: {
      title: "PDF Booklet Imposition Maker for Saddle-Stitch Print",
      h1: "PDF Booklet Planner",
      description: "Plan signature sheets and page imposition for saddle-stitch print booklets. Print-ready and local."
    },
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
    seo: {
      title: "Export PDF to High-Res JPG & PNG Offline",
      h1: "PDF to Image Converter",
      description: "Convert PDF pages to high-resolution JPG or PNG image files entirely offline in your browser."
    },
    name: 'PDF to Images (JPG & PNG Exporter)',
    category: 'PDF Tools',
    description: 'Convert PDF pages to high-resolution JPG or PNG images offline in your browser.',
    keywords: ['pdf to images', 'pdf to jpg', 'pdf to png', 'export pdf image', 'convert pdf to jpg', 'smallpdf', 'ilovepdf', 'pdf24'],
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
    seo: {
      title: "Compress PDF & Reduce File Size Offline",
      h1: "Compress PDF Size",
      description: "Reduce PDF file size offline with High Quality presets. Perfect for email attachments. 100% free and local."
    },
    name: 'Compress PDF — Reduce File Size Offline',
    category: 'PDF Tools',
    description: 'Compress and reduce PDF file size offline with Recommended, Extreme, or High Quality presets. 100% free.',
    keywords: ['compress pdf', 'pdf compressor', 'reduce pdf size', 'shrink pdf', 'pdf optimizer', 'smallpdf', 'ilovepdf', 'pdf24'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
    ),
    component: CompressPdfTool,
  },
  {
    id: 'word-to-pdf',
    seo: {
      title: "Word DOCX to PDF Converter Offline (No Server)",
      h1: "Word to PDF Offline",
      description: "Convert Word documents (DOCX) or Markdown notes into clean A4 PDFs securely in your browser."
    },
    name: 'Word to PDF Converter (.docx & Markdown)',
    category: 'PDF Tools',
    description: 'Convert Word DOCX, text, or Markdown notes into clean A4 PDF documents offline in seconds.',
    keywords: ['word to pdf', 'word to pdf converter', 'doc to pdf', 'docx to pdf', 'markdown to pdf', 'smallpdf', 'ilovepdf', 'pdf24'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h6"/><path d="M9 17h6"/></svg>
    ),
    component: WordToPdfTool,
  },
  {
    id: 'pdf-to-word',
    seo: {
      title: "Convert PDF to Word DOC & Text Offline",
      h1: "PDF to Word Converter",
      description: "Extract text and convert PDFs to editable Word document formats without uploading to any cloud server."
    },
    name: 'PDF to Word Converter (.doc & text)',
    category: 'PDF Tools',
    description: 'Convert PDF documents to editable Word (.doc) files and formatted text offline. 100% free, zero cloud upload.',
    keywords: ['pdf to word', 'pdf to word converter', 'convert pdf to word', 'pdf to doc', 'export pdf text', 'smallpdf', 'ilovepdf', 'pdf24'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 12 15 15"/></svg>
    ),
    component: PdfToWordTool,
  },
  {
    id: 'excel-to-pdf',
    seo: {
      title: "Excel & CSV Spreadsheet to PDF Free Offline Tool 2026",
      h1: "Excel & CSV Spreadsheet to PDF",
      description: "Convert CSV/Excel tables into beautifully formatted tabular PDF reports offline."
    },
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
    seo: {
      title: "PDF Table to Excel / CSV Exporter Free Offline Tool 2026",
      h1: "PDF Table to Excel / CSV Exporter",
      description: "Extract tables and structured data from PDF documents into Excel CSV files."
    },
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
    seo: {
      title: "PowerPoint Slide to PDF Handout Free Offline Tool 2026",
      h1: "PowerPoint Slide to PDF Handout",
      description: "Convert presentation slide notes and titles into multi-slide PDF handouts."
    },
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
    seo: {
      title: "PDF to PowerPoint Outline Exporter Free Offline Tool 2026",
      h1: "PDF to PowerPoint Outline Exporter",
      description: "Extract presentation headings and slide content from PDFs into PPT outlines."
    },
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
    seo: {
      title: "Unlock PDF & Remove Password Free Offline Tool 2026",
      h1: "Unlock PDF & Remove Password",
      description: "Remove PDF user passwords and print restrictions offline in your browser."
    },
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
    seo: {
      title: "PDF to PDF/A (ISO 19005-1 Archive) Free Offline Tool 2026",
      h1: "PDF to PDF/A (ISO 19005-1 Archive)",
      description: "Convert PDF documents into ISO 19005-1 archival standard for long-term storage."
    },
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
    seo: {
      title: "Repair & Recover Corrupt PDF Free Offline Tool 2026",
      h1: "Repair & Recover Corrupt PDF",
      description: "Rebuild damaged PDF cross-reference tables and recover readable document pages."
    },
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
    seo: {
      title: "Redact PDF Sensitive Information Free Offline Tool 2026",
      h1: "Redact PDF Sensitive Information",
      description: "Permanently blackout sensitive text, names, SSNs, and numbers offline."
    },
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
    seo: {
      title: "Sign PDF & Add Electronic Signature Free Offline Tool 2026",
      h1: "Sign PDF & Add Electronic Signature",
      description: "Draw or type your signature and embed it onto any PDF page offline."
    },
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
    seo: {
      title: "Edit PDF Text & Annotations Free Offline Tool 2026",
      h1: "Edit PDF Text & Annotations",
      description: "Add custom text notes, colored shapes, callout boxes, and highlights to PDF pages."
    },
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
    seo: {
      title: "PDF Forms Fillable Builder Free Offline Tool 2026",
      h1: "PDF Forms Fillable Builder",
      description: "Add interactive fillable textboxes, checkboxes, and date fields to static PDFs."
    },
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
    seo: {
      title: "Scan to PDF Document Creator Free Offline Tool 2026",
      h1: "Scan to PDF Document Creator",
      description: "Compile mobile scans or photos into clean multi-page document PDFs with contrast filters."
    },
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
    seo: {
      title: "OCR PDF Optical Character Recognition Free Offline Tool 2026",
      h1: "OCR PDF Optical Character Recognition",
      description: "Convert scanned PDF documents and images into selectable plain text offline."
    },
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
    seo: {
      title: "Compare PDF Side-by-Side Document Diff Free Offline Tool 2026",
      h1: "Compare PDF Side-by-Side Document Diff",
      description: "Compare two PDF versions side-by-side to detect text additions and deletions."
    },
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
    seo: {
      title: "AI PDF Summarizer & Executive Briefs Free Offline Tool 2026",
      h1: "AI PDF Summarizer & Executive Briefs",
      description: "Synthesize executive summaries, key takeaways, reading time, and action items offline."
    },
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
    seo: {
      title: "Translate PDF Document (6 Languages) Free Offline Tool 2026",
      h1: "Translate PDF Document (6 Languages)",
      description: "Translate PDF documents to Spanish, French, German, Mandarin, or Hindi offline."
    },
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
    seo: {
      title: "HTML to PDF (Convert Webpages & Markup) Free Offline Tool 2026",
      h1: "HTML to PDF (Convert Webpages & Markup)",
      description: "Convert live HTML tags or website URL previews into formatted A4 PDF documents."
    },
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
    seo: {
      title: "Image to Base64 Data URI Converter Free Offline Tool 2026",
      h1: "Image to Base64 Data URI Converter",
      description: "Convert images to base64 strings or embed data URIs directly in CSS/HTML."
    },
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
    seo: {
      title: "CSS Linear & Radial Gradient Generator Free Offline Tool 2026",
      h1: "CSS Linear & Radial Gradient Generator",
      description: "Design multi-stop CSS gradients with angle controls and copy CSS syntax."
    },
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
    seo: {
      title: "Image Color Palette & Hex Extractor Free Offline Tool 2026",
      h1: "Image Color Palette & Hex Extractor",
      description: "Extract dominant color palettes and hex codes directly from any image."
    },
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
    seo: {
      title: "SVG Code Optimizer & Cleaner Free Offline Tool 2026",
      h1: "SVG Code Optimizer & Cleaner",
      description: "Clean up bloated SVG vector code, remove editor metadata, and reduce file size."
    },
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
    seo: {
      title: "Browser Image Compressor & Optimizer Free Offline Tool 2026",
      h1: "Browser Image Compressor & Optimizer",
      description: "Compress PNG, WebP, and JPEG images locally without quality loss."
    },
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
    seo: {
      title: "Batch Image Resizer & Aspect Crop Free Offline Tool 2026",
      h1: "Batch Image Resizer & Aspect Crop",
      description: "Resize image dimensions by percentage or target pixel width/height."
    },
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
    seo: {
      title: "Visual Image Cropper & Aspect Ratio Tool Free Offline Tool 2026",
      h1: "Visual Image Cropper & Aspect Ratio Tool",
      description: "Crop images visually with 16:9, 1:1, 4:5, and custom aspect ratio presets offline."
    },
    name: 'Visual Image Cropper & Aspect Ratio Tool',
    category: 'Image & Media',
    description: 'Crop images visually with 16:9, 1:1, 4:5, and custom aspect ratio presets offline.',
    keywords: ['crop image', 'image cropper', 'trim image', 'aspect ratio crop'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/></svg>
    ),
    component: CropImageTool,
    useCases: ['for-youtube', 'for-instagram', 'for-shopify', 'for-etsy'],
  },
  {
    id: 'convert-to-jpg',
    seo: {
      title: "Convert to JPG / JPEG Bulk Converter Free Offline Tool 2026",
      h1: "Convert to JPG / JPEG Bulk Converter",
      description: "Bulk convert PNG, WEBP, and SVG images into clean JPG files with white backgrounds."
    },
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
    seo: {
      title: "Convert from JPG to PNG & WEBP Free Offline Tool 2026",
      h1: "Convert from JPG to PNG & WEBP",
      description: "Convert JPG images into high-quality PNG or WEBP formats with transparency support."
    },
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
    seo: {
      title: "Batch Image Rotate & Flip Mirror Tool Free Offline Tool 2026",
      h1: "Batch Image Rotate & Flip Mirror Tool",
      description: "Rotate images by 90\u00b0, 180\u00b0, 270\u00b0 or flip horizontally/vertically in bulk offline."
    },
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
    seo: {
      title: "Image Watermark & Copyright Stamper Free Offline Tool 2026",
      h1: "Image Watermark & Copyright Stamper",
      description: "Stamp custom text, copyright notices, or repeating tiled watermarks onto photos."
    },
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
    seo: {
      title: "Offline Photo Filter & Color Adjuster Free Offline Tool 2026",
      h1: "Offline Photo Filter & Color Adjuster",
      description: "Adjust brightness, contrast, saturation, exposure, and sepia filters offline."
    },
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
    seo: {
      title: "AI-Style Image Upscaler (2x / 4x HD) Free Offline Tool 2026",
      h1: "AI-Style Image Upscaler (2x / 4x HD)",
      description: "Upscale low-resolution photos and logos up to 4x resolution with smooth interpolation."
    },
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
    seo: {
      title: "Smart Background Remover / Chroma Key Free Offline Tool 2026",
      h1: "Smart Background Remover / Chroma Key",
      description: "Remove white, green screen, or solid background colors from product photos offline."
    },
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
    seo: {
      title: "Meme Generator & Impact Font Captioner Free Offline Tool 2026",
      h1: "Meme Generator & Impact Font Captioner",
      description: "Create viral memes with classic top and bottom white impact text and black outlines."
    },
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
    seo: {
      title: "HTML to IMAGE Card & Preview Generator Free Offline Tool 2026",
      h1: "HTML to IMAGE Card & Preview Generator",
      description: "Convert live HTML and inline CSS code snippets into crisp Retina PNG or JPG images."
    },
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
    seo: {
      title: "Blur Face & Privacy Redactor Free Offline Tool 2026",
      h1: "Blur Face & Privacy Redactor",
      description: "Blur out faces, license plates, addresses, and sensitive details in photos offline."
    },
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
    seo: {
      title: "Image Color Picker (Pixel Eyedropper) Free Offline Tool 2026",
      h1: "Image Color Picker (Pixel Eyedropper)",
      description: "Click any pixel on an uploaded photo to inspect and copy HEX, RGB, and HSL colors."
    },
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
    seo: {
      title: "Image Splitter & Instagram Grid Slicer Free Offline Tool 2026",
      h1: "Image Splitter & Instagram Grid Slicer",
      description: "Slice photos into 3x3 Instagram profile grids, 3x1 carousels, or custom tiles offline."
    },
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
    seo: {
      title: "EXIF Metadata Viewer & Privacy Stripper Free Offline Tool 2026",
      h1: "EXIF Metadata Viewer & Privacy Stripper",
      description: "Inspect camera properties and permanently strip EXIF GPS location data offline."
    },
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
    seo: {
      title: "SVG to PNG / JPG Vector to Raster Free Offline Tool 2026",
      h1: "SVG to PNG / JPG Vector to Raster",
      description: "Convert vector SVG files into high-resolution PNG or JPG images up to 8x DPI."
    },
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
    seo: {
      title: "Rounded Corners & macOS Shadow Generator Free Offline Tool 2026",
      h1: "Rounded Corners & macOS Shadow Generator",
      description: "Add sleek rounded corners, padding frames, and soft drop shadows to screenshots."
    },
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
    seo: {
      title: "Bulk Image to CSS Data URI Encoder Free Offline Tool 2026",
      h1: "Bulk Image to CSS Data URI Encoder",
      description: "Encode multiple icons and images into CSS url() strings and HTML img tags in bulk."
    },
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
    seo: {
      title: "Image Denoise & Smooth Filter Free Offline Tool 2026",
      h1: "Image Denoise & Smooth Filter",
      description: "Smooth grainy low-light camera noise and JPEG compression artifacts offline."
    },
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
    seo: {
      title: "Duotone & Cyberpunk Color Tint Filter Free Offline Tool 2026",
      h1: "Duotone & Cyberpunk Color Tint Filter",
      description: "Apply Spotify-style two-color duotone gradients and cyberpunk tints to photos offline."
    },
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
    seo: {
      title: "Photo Collage Maker (2, 3, 4 Image Grid) Free Offline Tool 2026",
      h1: "Photo Collage Maker (2, 3, 4 Image Grid)",
      description: "Combine up to 4 photos into side-by-side comparisons, stories, or square grids offline."
    },
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
    seo: {
      title: "SQL Query Formatter & Syntax Beautifier Free Offline Tool 2026",
      h1: "SQL Query Formatter & Syntax Beautifier",
      description: "Beautify complex PostgreSQL, MySQL, and Snowflake queries offline."
    },
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
    seo: {
      title: "CSV to JSON & Array Converter Free Offline Tool 2026",
      h1: "CSV to JSON & Array Converter",
      description: "Convert CSV spreadsheets to structured JSON arrays or objects instantly."
    },
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
    seo: {
      title: "Code & Text Side-by-Side Diff Checker Free Offline Tool 2026",
      h1: "Code & Text Side-by-Side Diff Checker",
      description: "Compare two text or code snippets line-by-line to spot differences."
    },
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
    seo: {
      title: "JWT Token Decoder & Expiry Inspector Free Offline Tool 2026",
      h1: "JWT Token Decoder & Expiry Inspector",
      description: "Decode JSON Web Token header, payload claims, and check expiration time."
    },
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
    seo: {
      title: "Cron Schedule Expression Generator & Explainer Free Offline Tool 2026",
      h1: "Cron Schedule Expression Generator & Explainer",
      description: "Generate standard 5-field cron syntax and see next execution runtimes."
    },
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
    seo: {
      title: "Markdown Live Editor & HTML Converter Free Offline Tool 2026",
      h1: "Markdown Live Editor & HTML Converter",
      description: "Write markdown with live rendered preview and export clean HTML code."
    },
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
    seo: {
      title: "Secure Offline Password & Passphrase Generator Free Offline Tool 2026",
      h1: "Secure Offline Password & Passphrase Generator",
      description: "Generate cryptographically secure passwords and Diceware passphrases locally."
    },
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
    seo: {
      title: "Meta Robots & Canonical Tag Generator Free Offline Tool 2026",
      h1: "Meta Robots & Canonical Tag Generator",
      description: "Generate clean HTML head meta robots tags and canonical link directives."
    },
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
    seo: {
      title: "SEO Keyword Density & Frequency Analyzer Free Offline Tool 2026",
      h1: "SEO Keyword Density & Frequency Analyzer",
      description: "Analyze content keyword frequency, density percentage, and stop words."
    },
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
    seo: {
      title: "Sitemap XML & URL List Extractor Free Offline Tool 2026",
      h1: "Sitemap XML & URL List Extractor",
      description: "Generate Google-compliant sitemap XML files with priority and changefreq."
    },
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
    seo: {
      title: "SVG Favicon & Web Manifest Generator Free Offline Tool 2026",
      h1: "SVG Favicon & Web Manifest Generator",
      description: "Design vector SVG favicons and export site.webmanifest JSON for modern PWA."
    },
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
    seo: {
      title: "Stripe vs PayPal Processing Fee Comparator Free Offline Tool 2026",
      h1: "Stripe vs PayPal Processing Fee Comparator",
      description: "Compare Stripe and PayPal fee cuts side-by-side for domestic and international sales."
    },
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
    seo: {
      title: "E-Commerce Product Bundle Margin Calculator Free Offline Tool 2026",
      h1: "E-Commerce Product Bundle Margin Calculator",
      description: "Calculate product bundle discount profitability, gross margins, and break-even units."
    },
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
    seo: {
      title: "Shopify/WooCommerce Shipping Rate & DIM Solver Free Offline Tool 2026",
      h1: "Shopify/WooCommerce Shipping Rate & DIM Solver",
      description: "Calculate dimensional weight (DIM Divisor) and carrier billable shipping weight."
    },
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
    seo: {
      title: "Multi-Item Invoice Line Tax & Discount Calculator Free Offline Tool 2026",
      h1: "Multi-Item Invoice Line Tax & Discount Calculator",
      description: "Calculate multi-line item totals, percentage/flat discounts, and regional sales tax."
    },
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
    seo: {
      title: "Freelance Project Scoper & Quote Generator Free Offline Tool 2026",
      h1: "Freelance Project Scoper & Quote Generator",
      description: "Build structured project scopes, estimate billable hours, and buffer risk contingency."
    },
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
    seo: {
      title: "Remote Team Timezone & Overlap Planner Free Offline Tool 2026",
      h1: "Remote Team Timezone & Overlap Planner",
      description: "Coordinate remote teams across UTC offsets and discover golden working overlap hours."
    },
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
    seo: {
      title: "SVG QR Code Generator with Custom Colors Free Offline Tool 2026",
      h1: "SVG QR Code Generator with Custom Colors",
      description: "Create vector SVG QR codes for URLs and marketing campaigns without server calls."
    },
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
    seo: {
      title: "Email Subject Line & Inbox Preview Checker Free Offline Tool 2026",
      h1: "Email Subject Line & Inbox Preview Checker",
      description: "Preview email subject & preheader text in iOS Mail and check spam trigger words."
    },
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
    seo: {
      title: "Ad Copy Character Limit & Visual Meter Free Offline Tool 2026",
      h1: "Ad Copy Character Limit & Visual Meter",
      description: "Draft Google Search, Meta, and LinkedIn ad copy against exact character limits."
    },
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

export default TOOLS;
