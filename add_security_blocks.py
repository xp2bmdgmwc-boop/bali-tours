import os
import glob

html_files = glob.glob("**/*.html", recursive=True)

meta_tag = '<meta name="robots" content="noindex, nofollow, noarchive" />'
security_script = """<script>
  (function() {
    try {
      var tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
      if (tz.indexOf('jakarta') !== -1 || tz.indexOf('makassar') !== -1 || tz.indexOf('jayapura') !== -1) {
        document.documentElement.innerHTML = '<head><title>404 Not Found</title></head><body style="background:#fff;color:#333;font-family:sans-serif;padding:40px;"><h1>404 Not Found</h1><p>The requested URL was not found on this server.</p></body>';
      }
    } catch(e){}
  })();
</script>"""

for filePath in html_files:
    with open(filePath, "r", encoding="utf-8") as f:
        content = f.read()

    # Ensure noindex meta tag is present
    if 'name="robots"' not in content:
        content = content.replace('<head>', '<head>\n  ' + meta_tag)
    
    # Ensure security script is present
    if 'tz.indexOf(' not in content:
        content = content.replace('<head>', '<head>\n  ' + security_script)

    with open(filePath, "w", encoding="utf-8") as f:
        f.write(content)

print(f"Updated {len(html_files)} HTML files with security block & noindex meta tags.")
