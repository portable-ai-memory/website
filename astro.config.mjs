// @ts-check
import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";
import {sidebar} from './src/sidebar.mjs';

export default defineConfig({
    site: 'https://portable-ai-memory.org',
    output: 'static',
    integrations: [
        icon(),
        starlight({
            title: 'Portable AI Memory',
            customCss: ['./src/styles/custom.css'],
            head: [
                {
                    tag: 'meta',
                    attrs: {property: 'og:type', content: 'website'},
                },
                {
                    tag: 'meta',
                    attrs: {property: 'og:site_name', content: 'Portable AI Memory'},
                },
                {
                    tag: 'meta',
                    attrs: {name: 'twitter:card', content: 'summary_large_image'},
                },
                {
                    tag: 'meta',
                    attrs: {property: 'og:image', content: 'https://portable-ai-memory.org/og-image.png'},
                },
                {
                    tag: 'meta',
                    attrs: {name: 'twitter:image', content: 'https://portable-ai-memory.org/og-image.png'},
                },
                {
                    tag: 'link',
                    attrs: {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
                },
                {
                    tag: 'link',
                    attrs: {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
                },
                {
                    tag: 'link',
                    attrs: {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
                },
                {
                    tag: 'link',
                    attrs: {rel: 'manifest', href: '/site.webmanifest'},
                },
            ],
            defaultLocale: 'root',
            locales: {
                root: {
                    label: 'English',
                    lang: 'en',
                },
                'pt-br': {
                    label: 'Português (Brasil)',
                    lang: 'pt-BR',
                },
                fr: {
                    label: 'Français',
                    lang: 'fr',
                },
            },
            social: [
                {
                    icon: 'github',
                    label: 'GitHub',
                    href: 'https://github.com/portable-ai-memory/portable-ai-memory',
                },
            ],
            sidebar,
        }),
        sitemap(),
    ],
});
