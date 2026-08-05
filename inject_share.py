import os
import re

TOOLS_DIR = 'src/tools'

# A pattern to find standard download buttons in JSX
# Looking for something like: <button onClick={handleDownload}...> ... </button>
# Or <a href={downloadUrl} download> ... </a>
# We'll try a simpler approach: look for the download action and inject next to it.
# Actually, since JSX is complex, let's match the buttons that have "Download" in them
# and put the NativeShareButton right after them.

def inject_share_button():
    for root, dirs, files in os.walk(TOOLS_DIR):
        for file in files:
            if not file.endswith('.jsx'):
                continue
                
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # If already injected, skip
            if 'NativeShareButton' in content:
                continue
                
            # Check if there is a Download string or similar
            if 'Download' not in content and 'download' not in content:
                continue

            # Add import at the top
            import_statement = "import NativeShareButton from '../components/NativeShareButton';\n"
            
            # Find the last import
            last_import_idx = content.rfind('import ')
            if last_import_idx != -1:
                end_of_last_import = content.find('\n', last_import_idx) + 1
                content = content[:end_of_last_import] + import_statement + content[end_of_last_import:]
            else:
                content = import_statement + content

            # Let's try to find common download variables like 'pdfUrl', 'resultUrl', 'image'
            # This is highly variable per tool, we can't reliably automate the PROPS without parsing JSX.
            # Let's add a placeholder comment so the user can easily map the correct state variables.
            # But wait, the user wants it fully working. 
            # In most tools, the download is triggered by an <a> tag with href={url}
            # Let's find: <a href={([^}]*)} download={([^}]*)}
            
            new_content = re.sub(
                r'(<a[^>]*href={([^}]*)}[^>]*download={([^}]*)}[^>]*>.*?</a>)',
                r'\1\n              <NativeShareButton fileUrl={\2} fileName={\3} />',
                content,
                flags=re.DOTALL
            )
            
            # Or <button onClick={handleDownload} ... Download ... </button>
            # It's very risky to blindly regex replace. Let's just output a list of tools that need manual review.
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Injected into {path}")

if __name__ == '__main__':
    inject_share_button()
