import os
import re

tools_dir = 'src/tools'
modified_count = 0

def fix_file(filepath):
    global modified_count
    with open(filepath, 'r') as f:
        content = f.read()
        
    original_content = content
        
    if 'bg-[#1e1e24]' in content or 'bg-black/40' in content or 'border-white/10' in content or 'border-white/20' in content or 'text-white' in content:
        # Headers
        content = re.sub(r'<h1 className="text-2xl font-heading font-bold text-white">', r'<h1 className="text-2xl font-heading font-bold text-[#1f2532]">', content)
        content = re.sub(r'className="text-sm text-\[\#9ca3af\]"', r'className="text-sm text-[#676879]"', content)
        
        # Backgrounds
        content = content.replace('bg-[#1e1e24]', 'bg-[#f6f8fa]')
        content = content.replace('bg-black/30', 'bg-white')
        content = content.replace('bg-black/40', 'bg-white')
        content = content.replace('bg-black/50', 'bg-white')
        
        # Borders
        content = content.replace('border-white/10', 'border-[#e6e9ef]')
        content = content.replace('border-white/20', 'border-[#d0d4e4]')
        content = content.replace('border-white/30', 'border-[#d0d4e4]')
        
        # Transparents
        content = content.replace('bg-white/5', 'bg-white')
        content = content.replace('bg-white/10', 'bg-gray-100')
        content = content.replace('bg-white/[0.02]', 'bg-[#f6f8fa]')
        content = content.replace('bg-white/[0.04]', 'bg-white')
        
        # Text colors
        content = content.replace('text-white', 'text-[#1f2532]')
        
        # Restore button texts
        colors = ['blue', 'emerald', 'red', 'orange', 'green', 'indigo', 'purple', 'teal', 'fuchsia', 'rose', 'pink']
        for c in colors:
            content = content.replace(f'bg-{c}-500 text-[#1f2532]', f'bg-{c}-500 text-white')
            content = content.replace(f'bg-{c}-600 text-[#1f2532]', f'bg-{c}-600 text-white')
            content = content.replace(f'text-[#1f2532] font-semibold hover:bg-{c}-600', f'text-white font-semibold hover:bg-{c}-600')
            content = content.replace(f'text-[#1f2532] font-bold hover:bg-{c}-400', f'text-white font-bold hover:bg-{c}-400')
            content = content.replace(f'text-[#1f2532] font-bold hover:bg-{c}-600', f'text-white font-bold hover:bg-{c}-600')
        
        # Fix text color for specific badges
        content = content.replace('text-[#1f2532] text-xs font-bold hover:bg-[#4e4ee0]', 'text-white text-xs font-bold hover:bg-[#4e4ee0]')
        
        # Fix primary #6161ff buttons
        content = content.replace('bg-[#6161ff] text-[#1f2532]', 'bg-[#6161ff] text-white')
        
        if content != original_content:
            with open(filepath, 'w') as f:
                f.write(content)
            modified_count += 1

for filename in os.listdir(tools_dir):
    if filename.endswith('.jsx'):
        fix_file(os.path.join(tools_dir, filename))
        
print(f"Modified {modified_count} tools.")
