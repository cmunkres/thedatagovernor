import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://thedatagovernor.com',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
