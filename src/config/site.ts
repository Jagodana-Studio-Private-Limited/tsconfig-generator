export const siteConfig = {
  // ====== CUSTOMIZE THESE FOR EACH TOOL ======
  name: "tsconfig.json Generator",
  title: "tsconfig.json Generator — Visual TypeScript Config Builder",
  description:
    "Generate a perfect tsconfig.json for any TypeScript project. Choose your project type (Next.js, React, Node.js, Library), customize compiler options, and copy the ready-to-use config instantly. 100% free, no login required.",
  url: "https://tsconfig-generator.tools.jagodana.com",
  ogImage: "/opengraph-image",

  // Header
  headerIcon: "Code2",
  brandAccentColor: "#6366f1", // hex accent for OG image gradient (must match --brand-accent in globals.css)

  // SEO
  keywords: [
    "tsconfig generator",
    "tsconfig.json generator",
    "typescript config generator",
    "typescript compiler options",
    "tsconfig builder",
    "nextjs tsconfig",
    "nodejs tsconfig",
    "react tsconfig",
    "typescript configuration",
    "tsc options",
    "tsconfig template",
  ],
  applicationCategory: "DeveloperApplication",

  // Theme
  themeColor: "#3b82f6",

  // Branding
  creator: "Jagodana",
  creatorUrl: "https://jagodana.com",
  twitterHandle: "@jagodana",

  // Social Profiles (for Organization schema sameAs)
  socialProfiles: [
    "https://twitter.com/jagodana",
  ],

  // Links
  links: {
    github: "https://github.com/Jagodana-Studio-Private-Limited/tsconfig-generator",
    website: "https://jagodana.com",
  },

  // Footer
  footer: {
    about:
      "tsconfig.json Generator helps TypeScript developers quickly scaffold the perfect compiler configuration for any project type — Next.js, React, Node.js, or a reusable library.",
    featuresTitle: "Features",
    features: [
      "Project type presets",
      "All compiler options",
      "Live JSON preview",
      "Copy & download config",
    ],
  },

  // Hero Section
  hero: {
    badge: "Free TypeScript Tool",
    titleLine1: "Generate Your Perfect",
    titleGradient: "tsconfig.json",
    subtitle:
      "Pick a project type, tune the compiler options, and get a production-ready TypeScript config in seconds. No login, no ads — pure browser logic.",
  },

  // Feature Cards (shown on homepage)
  featureCards: [
    {
      icon: "⚙️",
      title: "Project Presets",
      description:
        "One-click presets for Next.js, React (Vite), Node.js, TypeScript Library, and vanilla Browser projects.",
    },
    {
      icon: "🔧",
      title: "Full Compiler Control",
      description:
        "Toggle strict mode, module resolution, JSX settings, paths, incremental builds, and every key compiler option.",
    },
    {
      icon: "📋",
      title: "Copy & Download",
      description:
        "Copy the generated config to your clipboard or download it directly as tsconfig.json — ready to drop into your project.",
    },
  ],

  // Related Tools (cross-linking to sibling Jagodana tools for internal SEO)
  relatedTools: [
    {
      name: "gitignore Generator",
      url: "https://gitignore-generator.tools.jagodana.com",
      icon: "🙈",
      description: "Generate a .gitignore tailored to your project stack.",
    },
    {
      name: "JSON Formatter",
      url: "https://json-formatter.tools.jagodana.com",
      icon: "📄",
      description: "Prettify and validate JSON in one click.",
    },
    {
      name: "Regex Playground",
      url: "https://regex-playground.tools.jagodana.com",
      icon: "🧪",
      description: "Build, test & debug regular expressions in real-time.",
    },
    {
      name: "JSON to TypeScript",
      url: "https://json-to-typescript.tools.jagodana.com",
      icon: "🔄",
      description: "Convert any JSON structure into TypeScript interfaces.",
    },
    {
      name: "Cron Expression Builder",
      url: "https://cron-expression-builder.tools.jagodana.com",
      icon: "⏰",
      description: "Build and validate cron expressions visually.",
    },
    {
      name: "README Generator",
      url: "https://readme-generator.tools.jagodana.com",
      icon: "📝",
      description: "Generate a professional README.md for any project.",
    },
  ],

  // HowTo Steps (drives HowTo JSON-LD schema for rich results)
  howToSteps: [
    {
      name: "Choose a project preset",
      text: "Select your project type from the presets: Next.js, React (Vite), Node.js, TypeScript Library, or vanilla Browser. The form pre-fills the most common options for that stack.",
      url: "",
    },
    {
      name: "Customize compiler options",
      text: "Toggle individual compiler options on or off — strict mode, JSX, module resolution, source maps, declaration files, and more. The live preview updates instantly.",
      url: "",
    },
    {
      name: "Copy or download your config",
      text: "Click 'Copy' to copy the tsconfig.json to your clipboard, or click 'Download' to save it directly as tsconfig.json, ready to drop into your project root.",
      url: "",
    },
  ],
  howToTotalTime: "PT1M",

  // FAQ (drives both the FAQ UI section and FAQPage JSON-LD schema)
  faq: [
    {
      question: "What is a tsconfig.json file?",
      answer:
        "tsconfig.json is a configuration file in the root of a TypeScript project. It tells the TypeScript compiler (tsc) how to compile your code — which files to include, which JavaScript version to target, how to handle modules, whether to enforce strict type checks, and much more.",
    },
    {
      question: "Which preset should I choose for a Next.js project?",
      answer:
        "Choose the 'Next.js' preset. It sets target to ES5, enables JSX with the 'preserve' option (so Next.js handles the transform), enables strict mode, sets moduleResolution to 'bundler', and enables paths support — matching the official Next.js recommendation.",
    },
    {
      question: "What does 'strict' mode do in tsconfig.json?",
      answer:
        "'strict: true' enables a bundle of strict type-checking flags: strictNullChecks, noImplicitAny, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, noImplicitThis, and useUnknownInCatchVariables. It's strongly recommended for new projects as it catches entire classes of bugs at compile time.",
    },
    {
      question: "What is the difference between 'module' and 'moduleResolution'?",
      answer:
        "'module' controls the output module format (e.g., CommonJS for Node.js, ESNext for modern bundlers). 'moduleResolution' controls how the compiler resolves import paths. For modern projects using bundlers like Vite or esbuild, use module: 'ESNext' with moduleResolution: 'bundler'. For Node.js 16+, use NodeNext for both.",
    },
    {
      question: "Should I set 'noEmit: true'?",
      answer:
        "Set noEmit: true when you only want type-checking from tsc and rely on another tool (like Next.js, Vite, or ts-jest) to produce the compiled output. This is the default for Next.js projects. For Node.js applications or libraries that compile with tsc directly, leave noEmit as false and set an outDir instead.",
    },
    {
      question: "Is this tool free and does it send my config anywhere?",
      answer:
        "Completely free, with no account required. Everything runs in your browser — no data is sent to any server. Your tsconfig settings stay private on your machine.",
    },
  ],

  // ====== PAGES (for sitemap + per-page SEO) ======
  pages: {
    "/": {
      title: "tsconfig.json Generator — Visual TypeScript Config Builder",
      description:
        "Generate a perfect tsconfig.json for any TypeScript project. Choose your project type, customize compiler options, and copy the ready-to-use config instantly.",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
