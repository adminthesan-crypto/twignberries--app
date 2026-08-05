import os
import re

TOOLS_DIR = 'src/tools'

def get_import_statement():
    return "import NativeShareButton from '../components/NativeShareButton';\n"

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    if 'NativeShareButton' in content:
        return False

    # PATTERN 1: <a> tag with href={var} and download="filename" or download={`filename`}
    # Example: <a href={resultUrl} download="Twignberries-Rotated.pdf" ...> ... </a>
    # We will look for <a ...> that contains Download ... </a>
    # It's tricky to parse JSX with regex. Let's find the closing </a> that is preceded by <a href={...} download=...
    
    # We will use a more targeted approach.
    # We find all <a> tags that have download attribute.
    # regex for <a href={xyz} download="abc" ... > ... </a>
    a_tag_pattern = re.compile(r'(<a\s+[^>]*href=\{([^}]+)\}[^>]*download=([^\s>]+)[^>]*>.*?</a>)', re.DOTALL)
    
    def a_tag_replacer(match):
        full_match = match.group(1)
        href_var = match.group(2)
        download_val = match.group(3)
        
        # If the <a> tag is already wrapped in our flex container, skip (shouldn't happen)
        return f'''<div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              {full_match}
              <NativeShareButton fileUrl={{{href_var}}} fileName={download_val} />
            </div>'''
            
    content = a_tag_pattern.sub(a_tag_replacer, content)

    # PATTERN 2: <button onClick={handleDownload} ...> Download ... </button>
    # In these files, there is a `handleDownload` function. But we don't know the url variable!
    # Let's search the handleDownload function to find what variable it passes to saveAs or creates a blob with.
    # This is too complex for regex.
    # FOR NOW, let's just do Pattern 1.

    if content != original_content:
        # Add import
        last_import_idx = content.rfind('import ')
        if last_import_idx != -1:
            end_of_last_import = content.find('\n', last_import_idx) + 1
            content = content[:end_of_last_import] + get_import_statement() + content[end_of_last_import:]
        else:
            content = get_import_statement() + content
            
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

if __name__ == '__main__':
    count = 0
    for root, dirs, files in os.walk(TOOLS_DIR):
        for file in files:
            if file.endswith('.jsx'):
                if process_file(os.path.join(root, file)):
                    print(f"Updated {file}")
                    count += 1
    print(f"Total updated: {count}")
