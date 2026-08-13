import re
import json

seo_data = {
    # --- E-Commerce ---
    'etsy-fee': {'title': 'Etsy Fee & Profit Margin Calculator 2026 (USD)', 'h1': 'Etsy Fee Calculator (2026)', 'description': 'Calculate your real Etsy profit margin after listing fees, the 6.5% transaction cut, and offsite ads. 100% private and runs offline in your browser.'},
    'amazon-fba': {'title': 'Amazon FBA Profit & Referral Fee Calculator 2026', 'h1': 'Amazon FBA Margin Calculator', 'description': 'Calculate your real FBA margin after Amazon takes its share for fulfillment and referral fees (USD). Browser-based.'},
    'shopify-fee': {'title': 'Shopify Transaction Fee & Plan Break-Even Calculator', 'h1': 'Shopify Break-Even Calculator', 'description': 'Compare monthly Shopify plans against real credit card processing rates to find the break-even point for your store.'},
    'tiktok-shop': {'title': 'TikTok Shop Affiliate & Seller Commission Calculator', 'h1': 'TikTok Shop Fee Calculator', 'description': 'Figure out your exact take-home profit after the 6% TikTok Shop commission and affiliate creator cuts. 100% offline.'},
    'paypal-fee': {'title': 'PayPal Merchant Fee Calculator 2026 (Domestic & Intl)', 'h1': 'PayPal Fee Calculator', 'description': 'Calculate PayPal standard and micropayment rates to see your real payout before you invoice a client.'},
    'stripe-fee': {'title': 'Stripe Fee Calculator & Break-Even Payout Estimator', 'h1': 'Stripe Break-Even Calculator', 'description': 'Work backward from your target profit to calculate the exact amount you must charge to cover Stripe processing fees.'},
    'gst-calculator': {'title': 'Free GST Calculator India (Inclusive & Exclusive)', 'h1': 'GST Calculator', 'description': 'Flip between GST inclusive and exclusive prices instantly. No ads, no cloud uploads, just an offline tax calculator.'},
    
    # --- Freelance & Marketing ---
    'invoice-generator': {'title': 'Free Freelance Invoice Generator (PDF, No Watermark)', 'h1': 'Freelance Invoice Generator', 'description': 'Generate, preview, and download a clean PDF invoice instantly for free. No watermark, no signup, 100% private.'},
    'creator-platform': {'title': 'Patreon vs BuyMeACoffee Platform Fee Calculator', 'h1': 'Creator Platform Fees', 'description': 'Compare Patreon, BuyMeACoffee, and Ko-fi processing fees side-by-side to see which platform leaves you more profit.'},
    'saas-churn-ltv': {'title': 'SaaS MRR Churn & LTV:CAC Payback Calculator', 'h1': 'SaaS Churn & LTV Calculator', 'description': 'Calculate your real SaaS customer Lifetime Value (LTV) and CAC payback period. Perfect for bootstrapped startups.'},
    'youtube-rpm': {'title': 'YouTube AdSense RPM & CPM Estimator 2026', 'h1': 'YouTube RPM Estimator', 'description': 'Estimate realistic YouTube AdSense earnings across niches based on actual creator RPMs. Fast and offline.'},
    'utm-builder': {'title': 'Google Analytics 4 UTM Campaign URL Builder', 'h1': 'UTM Campaign Builder', 'description': 'Build clean GA4 campaign tracking URLs without typo headaches. Supports source, medium, campaign, and content tags.'},
    'roas-calculator': {'title': 'ROAS Break-Even & Facebook Ads Spend Calculator', 'h1': 'ROAS Break-Even Calculator', 'description': 'Know your exact break-even Return on Ad Spend (ROAS) before you turn on Meta or Google paid ads.'},
    'ai-token-cost': {'title': 'GPT-4o vs Claude 3.5 AI API Token Cost Calculator', 'h1': 'AI API Cost Calculator', 'description': 'Compare token pricing between OpenAI, Anthropic, and Google Gemini APIs before your bill surprises you.'},

    # --- PDF Tools (The "Intersection" Angle) ---
    'merge-pdf': {'title': 'Combine & Merge PDF Documents Offline (Private)', 'h1': 'Merge PDF Offline', 'description': 'Combine and merge multiple PDF documents in your browser. 100% offline, free, and no cloud server uploads required.'},
    'split-pdf': {'title': 'Split PDF & Extract Pages Offline (No Limits)', 'h1': 'Split PDF Offline', 'description': 'Extract specific pages or chop up a PDF without waiting on a server or hitting artificial file limits.'},
    'image-to-pdf': {'title': 'Convert Images to A4 PDF Offline (JPG/PNG)', 'h1': 'Images to PDF Converter', 'description': 'Turn your JPG, PNG, and screenshots into a clean A4 PDF document securely in your browser.'},
    'watermark-pdf': {'title': 'Stamp Watermarks & Confidential Text on PDF', 'h1': 'Watermark PDF Offline', 'description': 'Stamp custom text or confidential warnings across your PDF documents instantly without leaving your device.'},
    'protect-pdf': {'title': 'Password Protect & Encrypt PDF Documents Offline', 'h1': 'Protect PDF Offline', 'description': 'Lock sensitive PDF documents with AES encryption passwords securely in your local browser.'},
    'rotate-pdf': {'title': 'Rotate PDF Pages Offline (Fix Sideways Scans)', 'h1': 'Rotate PDF Pages', 'description': 'Fix upside-down or sideways PDF pages instantly. Processing happens locally so your NDA files never leave your device.'},
    'organize-pdf': {'title': 'Reorder & Delete PDF Pages Offline (Drag-and-Drop)', 'h1': 'Organize PDF Pages', 'description': 'Drag and drop to reorder, duplicate, or delete specific pages from your PDF entirely in your browser.'},
    'page-number-pdf': {'title': 'Stamp Page Numbers on PDF Documents Offline', 'h1': 'Add PDF Page Numbers', 'description': 'Add neat "Page X of Y" stamps to your PDF reports or legal packets without using slow online servers.'},
    'metadata-pdf': {'title': 'PDF Metadata Inspector & Privacy Scrubber', 'h1': 'PDF Privacy Scrubber', 'description': 'Inspect PDF author tags and scrub tracking metadata clean before sharing sensitive documents.'},
    'pdf-text-extractor': {'title': 'Extract Raw Text from PDF Documents Offline', 'h1': 'PDF to Plain Text', 'description': 'Extract raw, selectable plaintext from PDF pages locally in your browser. No signup required.'},
    'pdf-crop': {'title': 'Crop PDF Margins for Kindle & e-Readers Offline', 'h1': 'Crop PDF Margins', 'description': 'Trim white margins and resize PDF page boxes for optimal reading on Kindle and mobile devices.'},
    'pdf-booklet': {'title': 'PDF Booklet Imposition Maker for Saddle-Stitch Print', 'h1': 'PDF Booklet Planner', 'description': 'Plan signature sheets and page imposition for saddle-stitch print booklets. Print-ready and local.'},
    'pdf-to-image': {'title': 'Export PDF to High-Res JPG & PNG Offline', 'h1': 'PDF to Image Converter', 'description': 'Convert PDF pages to high-resolution JPG or PNG image files entirely offline in your browser.'},
    'compress-pdf': {'title': 'Compress PDF & Reduce File Size Offline', 'h1': 'Compress PDF Size', 'description': 'Reduce PDF file size offline with High Quality presets. Perfect for email attachments. 100% free and local.'},
    'word-to-pdf': {'title': 'Word DOCX to PDF Converter Offline (No Server)', 'h1': 'Word to PDF Offline', 'description': 'Convert Word documents (DOCX) or Markdown notes into clean A4 PDFs securely in your browser.'},
    'pdf-to-word': {'title': 'Convert PDF to Word DOC & Text Offline', 'h1': 'PDF to Word Converter', 'description': 'Extract text and convert PDFs to editable Word document formats without uploading to any cloud server.'},
    
    # --- Image & Media (The "Platform Constraint" Angle) ---
    'social-cropper': {'title': 'TikTok Shop & Instagram Aspect Ratio Image Cropper', 'h1': 'Social Media Image Cropper', 'description': 'Crop and frame images for TikTok Shop, Instagram Reels, or YouTube without accidentally cropping heads. Free & offline.'},
    'svg-to-image': {'title': 'SVG to High-Res Retina PNG/JPG Converter Offline', 'h1': 'SVG to PNG Converter', 'description': 'Convert scalable vector graphics (SVG) into crisp 1x-8x Retina PNG or JPG exports entirely in your browser.'},
    'color-palette': {'title': 'WCAG Color Contrast Checker & Palette Generator', 'h1': 'WCAG Contrast Checker', 'description': 'Check ADA/WCAG contrast ratios and copy clean SaaS color pairings. An essential free tool for designers.'},
    'pdf-markdown': {'title': 'Markdown to PDF Converter (GitHub Flavored)', 'h1': 'Markdown to PDF', 'description': 'Turn raw markdown notes or readmes into a polished, print-ready PDF document instantly and offline.'},
    'json-formatter': {'title': 'JSON Beautifier & TypeScript Type Generator', 'h1': 'JSON Formatter', 'description': 'Beautify messy JSON data, catch syntax bugs, and instantly export TypeScript interfaces offline.'},
    'regex-tester': {'title': 'Live Regex Tester & Pattern Match Explainer', 'h1': 'Regex Pattern Tester', 'description': 'Test complex regular expression (Regex) patterns with live group highlights and explanations.'},
    'og-preview': {'title': 'OpenGraph Social Card & Twitter Preview Simulator', 'h1': 'OpenGraph Preview', 'description': 'See exactly how your meta tags and OpenGraph image will look on Slack, X/Twitter, and LinkedIn before posting.'}
}

file_path = '/Users/shrimananandhan/.gemini/antigravity/scratch/twignberries/src/data/toolsData.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Iterate through every tool in the list
ids = re.findall(r"id:\s*'([^']+)'", content)

for tool_id in ids:
    # Skip if seo already exists
    if f"id: '{tool_id}',\n    seo:" in content or f"id: '{tool_id}',\r\n    seo:" in content:
        continue
        
    # Get custom SEO data or generate a generic one
    seo = seo_data.get(tool_id)
    if not seo:
        # Generic SEO fallback
        name_match = re.search(r"id:\s*'" + tool_id + r"'.*?name:\s*'([^']+)'", content, re.DOTALL)
        name = name_match.group(1) if name_match else tool_id.replace('-', ' ').title()
        
        desc_match = re.search(r"id:\s*'" + tool_id + r"'.*?description:\s*'([^']+)'", content, re.DOTALL)
        desc = desc_match.group(1) if desc_match else f"Free online {name} tool. Works 100% offline in your browser."
        
        seo = {
            'title': f"{name} Free Offline Tool 2026",
            'h1': name,
            'description': desc
        }
    
    # Format SEO block
    seo_str = f"seo: {{\n      title: {json.dumps(seo['title'])},\n      h1: {json.dumps(seo['h1'])},\n      description: {json.dumps(seo['description'])}\n    }},"
    
    # Replace
    pattern_text = f"id: '{tool_id}',"
    replacement_text = f"{pattern_text}\n    {seo_str}"
    content = content.replace(pattern_text, replacement_text)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully added SEO objects to {len(ids)} tools.")
