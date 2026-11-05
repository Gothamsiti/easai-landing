import { homedir } from 'os'
import { join } from 'path'
import { readdirSync } from 'fs'
console.log('[basicAuth]', {
  ENVIROMENT: process.env.ENVIROMENT,
  user: Boolean(process.env.BASIC_AUTH_USERNAME),
  pass: Boolean(process.env.BASIC_AUTH_PASSWORD),
})
const isCloudflare = Boolean(process.env.CF_PAGES)
  || (process.env.NITRO_PRESET || '').includes('cloudflare')
const iconsDir = './app/assets/icons'
const iconAliases = Object.fromEntries(
  readdirSync(iconsDir).filter(f => f.endsWith('.svg')).map(f => [f.slice(0, -4), `gotham:${f.slice(0, -4)}`])
)
const nitroCacheDir = process.env.NITRO_FS_CACHE_DIR || './.cache/nitro'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: [
    "~/assets/scss/main.scss",
    "~/assets/scss/sections.scss",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/vars.scss" as *;',
        },
      },
    },
    optimizeDeps: {
      include: [
        'vue3-select-component',
        'gsap',
      ]
    },
  },
  runtimeConfig: {
    domain: process.env.DOMAIN,
    defaultLanguage: process.env.DEFAULT_LANGUAGE,
    storyblokSpaceId: process.env.STORYBLOK_SPACE_ID,
    r2: {
      accessKey: process.env.R2_ACCESS_KEY,
      secretKey: process.env.R2_SECRET_KEY,
      bucket: process.env.R2_BUCKET,
      endpoint: process.env.R2_ENDPOINT,
    },
    public: {
      normalizeScroll: process.env.NORMALIZE_SCROLL === 'true',
    }
  },
  basicAuth: {
    enabled: process.env.ENVIROMENT !== 'production' && Boolean(process.env.BASIC_AUTH_USERNAME && process.env.BASIC_AUTH_PASSWORD),
    allowedRoutes: [
      "/api/.*",
    ],
    users: [
      {
        username: process.env.BASIC_AUTH_USERNAME || '',
        password: process.env.BASIC_AUTH_PASSWORD || '',
      },
    ],
  },
  modules: [
    "@storyblok/nuxt", 
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/fonts",
    "gothamstoryblok",
    "gothamform",
    "@kgierke/nuxt-basic-auth"
  ],
  fonts: {
    defaults: { subsets: ['latin'] },
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700], preload: true },
      { name: 'Instrument Serif', provider: 'google', styles: ['italic'], weights: [400], preload: true },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500] }
    ],
  },
  icon: {
    customCollections: [
      {
        prefix: 'gotham',
        dir: iconsDir
      }
    ],
    aliases: iconAliases,
  },
  storyblok: {
    accessToken: 'nullkey'
  },
  gothamstoryblok: {
    cloudflare: {
      zoneID: process.env.CLOUDFLARE_ZONE_ID,
      apiKey: process.env.CLOUDFLARE_API_KEY
    },
    storyblok: {
      version: process.env.STORYBLOK_VERSION as 'draft' | 'published',
      key: process.env.STORYBLOK_API_KEY,
      draftKey: process.env.STORYBLOK_DRAFT_API_KEY,
    },
    cache: {
      expire: process.env.DEFAULT_EXPIRE ? parseInt(process.env.DEFAULT_EXPIRE) : 0
    },
  },
  gothamutils: {
    analytics: {
      trackingId: process.env.GOOGLE_TAG_MANAGER_ID,
    }
  },
  gothamform: {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    brevo: {
      key: process.env.BREVO_API_KEY,
    }
  },
  image: {
    provider: "storyblok",
    format: ["webm"],
    storyblok: {
      baseURL: '/storyblokasset/' // proxando gli asset possiamo sfruttare la cache di cloudflare
    },
    none: {}
  },
  nitro: {
    ...(isCloudflare
      ? {}
      : {
          storage: {
            cache: { driver: 'fsLite', base: nitroCacheDir },
          },
        }),
    routeRules: {
      '/storyblokasset/**': { proxy: 'https://a.storyblok.com/**' },
      '/api/**': { cache: false },
      '/api/cache/**': { cache: false, headers: { 'cache-control': 'no-store' } },
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: process.env.DEFAULT_LANGUAGE },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: process.env.SITE_NAME,
      link: [
        { rel: "icon", type: "shortcut icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://a.storyblok.com" },
      ],
    }
  },
  devtools: { enabled: false },
  devServer: {
    https: {
      key: join(homedir(), '.certs/localhost-key.pem'),
      cert: join(homedir(), '.certs/localhost.pem'),
    },
  },
})
