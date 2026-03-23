export const personalInfo = {
  name: 'Duvvada Jyothsna',
  role: 'Full-Stack Engineer',
  tagline: 'Architecting digital realities at the intersection of code & cosmos.',
  location: 'Andhra Pradesh, India',
  email: 'jyothsnaduvvada8@gmail.com',
  github: 'https://github.com/JYOTHSNA-DUVVADA',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  leetcode: "https://leetcode.com/u/jyothsna_Duvvada" ,
  resume: '/jyothsnaresume.pdf',
  bio: `I'm a Full-Stack Engineer with 2+ years building scalable web applications, AI-powered platforms, and cloud-native systems. I thrive at the intersection of elegant engineering and exceptional UX — turning complex problems into clean, performant solutions. Currently obsessed with AI/ML integration and edge computing architectures.`,
  highlights: [
    { icon: 'fa-solid fa-rocket', label: '2+ Years Exp.' },
    { icon: 'fa-solid fa-code-branch', label: '10+ Projects' },
    { icon: 'fa-solid fa-star', label: 'Problem solver' },
    { icon: 'fa-solid fa-graduation-cap', label: 'CS Degree, SRKR' },
  ],
}

export const skills = [
  {
    group: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'Python', 'FastAPI' , "REST API"],
  },
  {
    group: 'Languages',
    items: ['C', 'Java', 'Python'],
  },
  {
    group: 'Tooling',
    items: ['Git', 'Github', 'VS Code', 'Postman', 'Firebase', 'Vercel'],
  },
]

export const projects = [
  {
    id: 1,
    title: 'Student Registration Dashboard',
    description:
      'A full-stack dashboard system to manage student registrations, records, and administrative operations efficiently.',
    category: 'Full-Stack',
    image: null,
    color: '#38bdf8',
    tech: ['Node.js', 'Express', 'MongoDB', 'EJS / React'],
    features: [
      'Student data management',
      'CRUD operations',
      'Admin dashboard',
      'Secure backend',
    ],
    github: 'https://github.com/Ashok-Dd/student-dashboard',
    live: 'https://student-dashboard-two-sandy.vercel.app/',
    stars: 0,
  },

  {
    id: 2,
    title: 'AgriAssist – Smart Farming Assistant',
    description:
      'An AI-powered agriculture assistant that helps farmers with crop recommendations, disease detection, and smart farming insights.',
    category: 'AI',
    image: null,
    color: '#22c55e',
    tech: ['Python', 'Machine Learning', 'Flask', 'React'],
    features: [
      'Crop recommendation system',
      'Plant disease detection',
      'AI-based suggestions',
      'Farmer-friendly interface',
    ],
    github: 'https://github.com/Ashok-Dd/agriassist-backend',
    live: '#',
    stars: 0,
  },

  {
  id: 3,
  title: 'YC Directory – Startup Explorer',
  description:
    'A modern startup discovery platform inspired by Y Combinator, enabling users to explore, search, and analyze startups with a clean UI and structured data.',
  category: 'Full-Stack',
  image: null,
  color: '#f97316',
  tech: ['Next.js', 'TypeScript', 'Sanity', 'Tailwind CSS'],
  features: [
    'Startup listing & search',
    'Category-based filtering',
    'Dynamic CMS integration',
    'Modern UI/UX design',
  ],
  github: 'https://github.com/JYOTHSNA-DUVVADA/yc_directory',
  live: 'https://yc-directory-eprs.vercel.app/',
  stars: 0,
},


]

export const achievements = [
  { label: 'Projects Built', value: 10,description : "Multiple domains" , suffix: '+', color: '#00d4ff' },
  { label: 'LeetCode Problems', value: 160, suffix: '+', color: '#7c3aed' },
  { label: 'Certifications', value: 12, description : "Earned with consistency" , suffix: '', color: '#ffd700' },
  { label: 'Hackathons participated', value: 3, description : "Learned to build real time scalable projects" , suffix: '', color: '#ff6b35' },
]
