export function middleware(request) {
  // 1. IP Ban for ID
  const country = request.headers.get('x-vercel-ip-country') || '';
  if (country.toUpperCase() === 'ID') {
    return new Response('404 Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  // 2. i18n Auto-Routing Structure (Accept-Language based)
  const url = new URL(request.url);
  
  // Only intercept root or /timor for language redirects
  if (url.pathname === '/' || url.pathname === '/timor') {
    const acceptLanguage = request.headers.get('accept-language') || '';
    
    // If browser prefers English, optionally redirect to /timor-en
    // (We look for 'en' in the accept-language string before 'ru')
    const prefersEnglish = acceptLanguage.toLowerCase().startsWith('en') || 
                           (acceptLanguage.includes('en') && acceptLanguage.indexOf('en') < acceptLanguage.indexOf('ru'));
    
    // We only redirect if there's no specific override cookie/setting, 
    // but for now, simple structural routing:
    if (prefersEnglish) {
      url.pathname = '/timor-en';
      return Response.redirect(url, 302); // 302 temporary redirect based on lang
    }
  }
}

// Config to match specific paths so middleware doesn't run on every asset
export const config = {
  matcher: ['/', '/timor', '/timor-en', '/bali', '/bali-en'],
};
