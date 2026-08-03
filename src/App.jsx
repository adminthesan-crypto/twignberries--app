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

/* ─── Tool Definitions ───────────────────────────────────── */
const TOOLS = [
  {
    id: 'etsy-fee',
    name: 'Etsy Fee & Profit Calculator',
    category: 'E-Commerce',
    description: 'True net profit after the 6.5% transaction cut, listing fees, and offsite ads.',
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
    name: 'PayPal Fee & Net Payout',
    category: 'E-Commerce',
    description: 'Standard 2.99% + 49¢, micropayment rates, and break-even invoice totals.',
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
    name: 'Stripe Fee & Break-even Solver',
    category: 'E-Commerce',
    description: 'Calculate 2.9% + 30¢ domestic or international rates, reverse-price any charge.',
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
    name: 'GST Tax Inclusive & Exclusive',
    category: 'E-Commerce',
    description: 'Instant CGST / SGST split breakdown with inclusive and exclusive modes.',
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
    name: 'Amazon FBA Profit Calculator',
    category: 'E-Commerce',
    description: 'FBA fulfillment tiers, category referral cuts (8%–17%), and exact net profit.',
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
    name: 'TikTok Shop Commission Solver',
    category: 'E-Commerce',
    description: 'Calculate 6% TikTok commission, affiliate creator cuts, and seller net margin.',
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
    name: 'Shopify Plan Fee Estimator',
    category: 'E-Commerce',
    description: 'Compare Basic, Standard, and Advanced monthly CC rates and gateway penalties.',
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
    name: 'Freelance Invoice Generator PDF',
    category: 'Freelance',
    description: 'Create professional invoices in 30 seconds with instant PDF print/export.',
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
    description: 'Type or paste markdown notes, proposals, or readmes and export a clean PDF.',
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
    description: 'Compare Patreon Pro (8%), BuyMeACoffee (5%), and Ko-fi (0%) take-home pay.',
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
    description: 'Calculate LTV, LTV:CAC ratio health, and CAC payback period based on churn.',
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
    description: 'Estimate daily, monthly, and annual YouTube AdSense earnings across 2026 niches.',
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
    description: 'Build valid GA4 campaign tracking URLs with one-click copy and quick presets.',
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
    description: 'Calculate exact Break-Even ROAS, Target CPA, and paid ad profitability.',
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
    description: 'Compare GPT-4o, Claude 3.5, Gemini 1.5 Pro, and DeepSeek API token costs.',
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
    description: 'Combine multiple PDF files in custom order. 100% offline in browser memory.',
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
    description: 'Extract specific page ranges (e.g. 1-3, 5) or separate all pages offline.',
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
    description: 'Convert JPG, PNG, WEBP, and AVIF images into an A4 PDF document.',
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
    description: 'Stamp custom text or copyright notices across pages with angle and opacity sliders.',
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
    description: 'Secure documents with author metadata sealing and password strength checks.',
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
    description: 'Rotate individual or all PDF pages 90° clockwise, counter-clockwise, or 180° offline.',
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
    description: 'Visual page manager: drop specific pages, reverse order, or duplicate pages in RAM.',
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
    description: 'Stamp customizable sequential page numbers (Page X of Y) across PDF documents.',
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
    description: 'Read and edit internal PDF XMP metadata and strip hidden author tracking tags.',
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
    description: 'Render SVG files or raw XML code on HTML5 canvas and export as 1x–8x Retina PNG/JPG.',
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
    description: 'Fit and frame images for Instagram (1:1), Stories/Reels (9:16), YouTube (16:9), and banners.',
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
    description: 'Check ADA/WCAG 2.1 AA & AAA text contrast compliance and copy harmonious SaaS tints.',
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
    description: 'Beautify, minify, validate syntax errors, and instantly generate TypeScript interfaces offline.',
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
    description: 'Test regular expressions with live group capture, flag toggles, and developer presets offline.',
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
    description: 'Preview link cards across Google, Twitter/X, LinkedIn, and Facebook with 1-click HTML tags.',
    keywords: ['opengraph preview', 'og tags', 'social card preview', 'seo preview', 'twitter card preview'],
    color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    component: OpenGraphPreviewTool,
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
      {/* Monday.com Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-14 pt-6 pb-10 border-b border-gray-100">
        {/* Left: Headline & Description */}
        <div className="max-w-xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eceeff] text-[#6161ff] font-bold text-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-[#6161ff] animate-pulse"></span>
            Twignberries v6.0 — 30 Offline Enterprise Utilities
          </div>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 800,
            color: '#1f2532',
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            marginBottom: '20px'
          }}>
            You lead.<br />
            <span style={{ color: '#6161ff' }}>Utilities act.</span>
          </h1>
          <p style={{
            fontSize: '17px',
            color: '#676879',
            fontWeight: 500,
            lineHeight: 1.6,
            marginBottom: '32px'
          }}>
            Where creators, sellers, and utilities drive results together on one secure, zero-signup workspace. 100% client-side privacy.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#tools-grid"
              className="btn-primary"
              style={{
                fontSize: 15,
                padding: '13px 28px',
                background: 'linear-gradient(90deg, #6161ff, #7f56d9)',
                textDecoration: 'none'
              }}
            >
              Explore all {tools.length} utilities →
            </a>
            <span style={{ fontSize: 13, color: '#868894', fontWeight: 600 }}>
              ✓ No credit card needed &nbsp;•&nbsp; ✓ Free unlimited use
            </span>
          </div>
        </div>

        {/* Right: Monday.com Interactive Status Preview Widget */}
        <div
          className="w-full md:w-auto flex-1 max-w-md p-6 rounded-2xl bg-white border border-[#e6e9ef]"
          style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)' }}
        >
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#f0f2f5]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff3d8b]"></span>
              <span className="w-3 h-3 rounded-full bg-[#fdab3d]"></span>
              <span className="w-3 h-3 rounded-full bg-[#00c875]"></span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1f2532', marginLeft: 8 }}>
                Workspace Live Status
              </span>
            </div>
            <span className="badge badge-success" style={{ background: '#00c875', color: 'white' }}>
              Active
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#f7f9fc] border border-[#e6e9ef]">
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1f2532' }}>E-Commerce & Marketplaces</div>
                <div style={{ fontSize: 12, color: '#676879' }}>Etsy, Amazon FBA, TikTok Shop, Stripe</div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-[#00c875]">
                Done
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#f7f9fc] border border-[#e6e9ef]">
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1f2532' }}>Marketing & Paid Growth</div>
                <div style={{ fontSize: 12, color: '#676879' }}>ROAS Target, YouTube RPM, UTM Builder</div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-[#00c875]">
                Done
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#f7f9fc] border border-[#e6e9ef]">
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1f2532' }}>SaaS & Freelance Utilities</div>
                <div style={{ fontSize: 12, color: '#676879' }}>Invoices, SaaS LTV:CAC, Markdown PDF</div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-[#00c875]">
                Done
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#f7f9fc] border border-[#e6e9ef]">
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1f2532' }}>ILovePDF Private Suite (100% Client-Side)</div>
                <div style={{ fontSize: 12, color: '#676879' }}>Merge, Split, Rotate, Organize, Number, Metadata, Protect</div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-[#00c875]">
                Done
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#f7f9fc] border border-[#e6e9ef]">
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1f2532' }}>Image, AI & SEO Web Utilities</div>
                <div style={{ fontSize: 12, color: '#676879' }}>SVG to PNG, Cropper, WCAG, JSON, Regex, OpenGraph</div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-[#00c875]">
                Done
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#f0f2f5] flex items-center justify-between text-xs text-[#676879] font-medium">
            <span>Client-Side Encryption</span>
            <span className="text-[#6161ff] font-bold">100% Secure</span>
          </div>
        </div>
      </div>

      {/* Monday.com Trust Brand Strip */}
      <div className="text-center mb-14">
        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#868894', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
          Trusted by over 40,000 sellers & creators across major platforms
        </div>
        <div className="flex flex-wrap items-center justify-center gap-10 opacity-70">
          <span style={{ fontSize: 18, fontWeight: 900, color: '#323338', letterSpacing: '-0.04em' }}>SHOPIFY</span>
          <span style={{ fontSize: 18, fontWeight: 900, color: '#323338', letterSpacing: '-0.04em' }}>AMAZON</span>
          <span style={{ fontSize: 18, fontWeight: 900, color: '#323338', letterSpacing: '-0.04em' }}>ETSY</span>
          <span style={{ fontSize: 18, fontWeight: 900, color: '#323338', letterSpacing: '-0.04em' }}>STRIPE</span>
          <span style={{ fontSize: 18, fontWeight: 900, color: '#323338', letterSpacing: '-0.04em' }}>PAYPAL</span>
          <span style={{ fontSize: 18, fontWeight: 900, color: '#323338', letterSpacing: '-0.04em' }}>TIKTOK SHOP</span>
        </div>
      </div>

      {/* Grid Section Heading */}
      <div id="tools-grid" className="flex items-center justify-between mb-6 pt-4">
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1f2532', letterSpacing: '-0.03em' }}>
            {selectedCategory === 'All' ? 'All Workspace Utilities' : `${selectedCategory} Utilities`}
          </h2>
          <p style={{ fontSize: 14, color: '#676879', marginTop: 2 }}>
            Click any tool to launch instant interactive solver in your workspace.
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

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setActiveToolId(null); // go back to grid
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

            {/* Footer */}
            <footer
              className="no-print"
              style={{
                marginTop: 56, paddingTop: 24,
                borderTop: '1px solid var(--border)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                flexWrap: 'wrap', gap: 12,
                fontSize: 12, color: 'var(--text-4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <ShieldCheck size={13} color="var(--brand)" />
                Zero signups — 100% client-side privacy
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-light)' }}>
                v6.0.0 · 30 Tools & PDF Suite
              </span>
            </footer>
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
