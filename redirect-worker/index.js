// Deployed to thedatagovernor.info — permanently redirects all traffic to thedatagovernor.com.
// Keep this live for at least 12 months after domain migration to preserve SEO authority transfer.
export default {
  async fetch(request) {
    const url = new URL(request.url);
    url.hostname = 'thedatagovernor.com';
    return Response.redirect(url.toString(), 301);
  },
};
