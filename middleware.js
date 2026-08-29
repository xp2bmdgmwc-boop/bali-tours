export function middleware(request) {
  // 1. IP Ban for ID
  const country = request.headers.get('x-vercel-ip-country') || '';
  if (country.toUpperCase() === 'ID') {
    return new Response('404 Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

// Config to match specific paths so middleware doesn't run on every asset
export const config = {
  matcher: ['/'],
};
