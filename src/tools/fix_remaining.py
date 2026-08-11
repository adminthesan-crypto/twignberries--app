import os
import glob
import re

tools_dir = "/Users/shrimananandhan/.gemini/antigravity/scratch/twignberries/src/tools/"
files = glob.glob(tools_dir + "*.jsx")

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
        
    # space-y-3, 4 -> space-y-6
    content = re.sub(r'space-y-[34]', r'space-y-6', content)
    
    # "Grid layouts between major sections should have at least gap: 20"
    content = re.sub(r'gap:\s*12\b', 'gap: 24', content)
    content = re.sub(r'gap:\s*16\b', 'gap: 24', content)
    content = re.sub(r'gap-[34]\b', 'gap-6', content)
    content = re.sub(r'gap-[12]\b', 'gap-3', content)

    # padding: 12px -> padding: 24px
    content = re.sub(r'padding:\s*12\b', 'padding: 24', content)
    content = re.sub(r'padding:\s*16\b', 'padding: 24', content)
    content = re.sub(r'padding:\s*\'12px 16px\'', "padding: '24px 26px'", content)
    
    # p-3, p-4, p-5 -> p-6 on cards
    content = re.sub(r'\bp-[345]\b', 'p-6', content)

    # marginTop: 12 -> 24
    content = re.sub(r'marginTop:\s*12\b', 'marginTop: 24', content)
    
    with open(filepath, 'w') as f:
        f.write(content)

for filepath in files:
    fix_file(filepath)

print("Done")
