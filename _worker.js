export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const optimizedHeaders = new Headers(request.headers);
    optimizedHeaders.set('Connection', 'keep-alive');
    optimizedHeaders.set('Cache-Control', 'no-cache');
    const optimizedRequest = new Request(request, {
      headers: optimizedHeaders,
      redirect: 'follow'
    });
    try {
      const response = await fetch(optimizedRequest);
      return new Response(response.body, response);
    } catch (error) {
      return new Response('Error: ' + error.message, { status: 502 });
    }
  }
};
