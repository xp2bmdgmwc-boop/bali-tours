export function middleware(request) {
  const country = request.headers.get('x-vercel-ip-country') || '';
  if (country.toUpperCase() === 'ID') {
    return new Response('404 Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}
