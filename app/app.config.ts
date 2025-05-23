export default defineAppConfig({
  global: {
    meetingLink: 'https://cal.com/hugorcd/15min',
    available: true,
  },
  profile: {
    name: 'Matheus Thurler',
    job: 'DevOps',
    email: 'contato@matheusthurler.com.br',
    phone: '+55 (22) 9855-3008',
    picture: 'https://media.licdn.com/dms/image/v2/D4D03AQGuIuu9aRhlkw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1724237499593?e=1753315200&v=beta&t=w1Ayb9brPskPHs2_MvY0uV_DgSBXpXEI3l5rFtIaBvA',
  },
  socials: {
    github: 'https://github.com/Matheus-Thurler',
    twitter: 'https://twitter.com/HugoRCD__',
    linkedin: 'https://www.linkedin.com/in/matheus-thurler-34519870/',
    instagram: '',
    spotify: '',
  },
  seo: {
    title: 'Personal blog and Portfoliio',
    description: 'Canvas is a simple but beautiful portfolio template for designers and developers built with Nuxt and Tailwind CSS. Made with ❤️ by HugoRCD',
    url: 'https://canvas.hrcd.fr',
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