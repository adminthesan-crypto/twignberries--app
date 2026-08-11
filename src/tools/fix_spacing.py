import os
import glob
import re

tools_dir = "/Users/shrimananandhan/.gemini/antigravity/scratch/twignberries/src/tools/"
files = [
    "JsonFormatterTool.jsx",
    "JwtDecoderTool.jsx",
    "KeywordDensityTool.jsx",
    "MarkdownEditorTool.jsx",
    "MemeGeneratorTool.jsx",
    "MergePdfTool.jsx",
    "MetaRobotsTool.jsx",
    "OcrPdfTool.jsx",
    "OpenGraphPreviewTool.jsx",
    "OrganizePdfTool.jsx",
    "PageNumberPdfTool.jsx",
    "PasswordGeneratorTool.jsx",
    "PayPalFeeCalculator.jsx",
    "PdfBookletTool.jsx",
    "PdfCropTool.jsx",
    "PdfFormsTool.jsx",
    "PdfMarkdownConverter.jsx",
    "PdfMetadataTool.jsx",
    "PdfTextExtractorTool.jsx",
    "PdfToExcelTool.jsx"
]

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Root container gap too small
    content = re.sub(r'gap:\s*12(?!px)', r'gap: 24', content)
    content = re.sub(r'gap:\s*16(?!px)', r'gap: 24', content)
    content = re.sub(r'space-y-4', r'space-y-6', content)
    
    # 2. Internal padding too tight
    content = re.sub(r'className="([^"]*)p-4([^"]*)"', r'className="\1p-6\2"', content)
    content = re.sub(r'padding:\s*16px', r'padding: 26px', content)
    content = re.sub(r'padding:\s*16(?!px)', r'padding: 26', content)
    
    # 3. Inline style gap values that are too tight
    content = re.sub(r'gap:\s*4(?!px)', r'gap: 8', content)
    content = re.sub(r'gap:\s*8(?!px)', r'gap: 16', content)
    
    # 4. Grid gaps too narrow
    content = re.sub(r'className="([^"]*)gap-4([^"]*)"', r'className="\1gap-6\2"', content)
    
    # 5. Result sections crammed against inputs
    content = re.sub(r'marginTop:\s*12(?!px)', r'marginTop: 20', content)
    content = re.sub(r'marginTop:\s*16(?!px)', r'marginTop: 24', content)
    
    with open(filepath, 'w') as f:
        f.write(content)

for filename in files:
    filepath = os.path.join(tools_dir, filename)
    if os.path.exists(filepath):
        fix_file(filepath)

print("Done")
