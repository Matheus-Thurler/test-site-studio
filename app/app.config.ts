export default defineAppConfig({
  global: {
    meetingLink: 'https://cal.com/matheus-thurler/15min',
    available: true,
  },
  profile: {
    name: 'Matheus Thurler',
    job: 'DevOps',
    email: 'contato@matheusthurler.com.br',
    phone: '+55 (22) 9855-3008',
    picture: '../public/projects/matheus-summit.jpg',
  },
  socials: {
    github: 'https://github.com/Matheus-Thurler',
    // twitter: 'https://twitter.com/HugoRCD__',
    linkedin: 'https://www.linkedin.com/in/matheus-thurler-34519870/',
    youtube: 'https://www.youtube.com/@matheusthurler',
  },
  seo: {
    title: 'Personal blog and Portfolio',
    description: 'Personal blog and Portfolio',
    url: 'https://matheusthurler.com.br',
    lang: 'en',
  },
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'neutral',
    },
    notifications: {
      position: 'top-0 bottom-auto',
    },
    notification: {
      progress: {
        base: 'absolute bottom-0 end-0 start-0 h-0',
        background: 'bg-transparent dark:bg-transparent',
      },
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
      defaultVariants: {
        color: 'neutral',
      },
    },
    input: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    textarea: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    icons: {
      loading: 'lucide:loader',
    },
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
})
