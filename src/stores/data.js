export const pages = [
  {
    name: "Home",
    position: [0, 25, -105],
    rotation: [0, 0, 0],
    imageUrl: "/icons/home-icon-v1.png",
    url: null,
    componentUrl: null,
    sub: null,
  },
  {
    name: "About Me",
    position: [2, 25, 200],
    rotation: [0, Math.PI * 0.5, 0],
    imageUrl: "/icons/about-icon-v1.png",
    url: "http://localhost:3000/PageAboutMe",
    componentUrl: null,
  },
  // {
  //   name: "Read More",
  //   position: [2, 25, 180],
  //   rotation: [0, Math.PI * 0.5, 0],
  //   imageUrl: "/icons/about-icon-v1.png",
  //   url: "http://localhost:3000/PageAboutMe",
  //   componentUrl: null,
  // },
  {
    name: "Contact Me",
    position: [123, 25, -86],
    rotation: [0, -Math.PI * 0.5, 0],
    imageUrl: "/icons/contact-icon-v1.png",
    url: null,
    componentUrl: "@/components/pageComponents/aboutMe/AboutMe",
    sub: null,
  },
  // {
  //   name: "Testimonials",
  //   position: [123, 25, -37],
  //   rotation: [0, -Math.PI * 0.5, 0],
  //   imageUrl:
  //     "https://products.ls.graphics/mesh-gradients/images/03.-Snowy-Mint_1-p-130x130q80.jpeg",
  //   url: "http://localhost:3000/PageTestimonials",
  //   sub: null,
  // },
  {
    name: "Projects",
    position: [-190, 25, 150],
    rotation: [0, -Math.PI * 1, 0],
    imageUrl: "/icons/portfolio-icon-v1.png",
    url: "http://localhost:3000/PageProjects",
    componentUrl: null,
    sub: [
      {
        name: "Project1",
        position: [-190, 25, 248],
        rotation: [0, Math.PI * 1, 0],
        imageUrl: "/icons/portfolio-icon-v1.png",
        url: null,
        contentUrl: "/content-images/insta-v1.jpg",
        plate: {
          title: "Instagram Clone App",
          description: [
            "Build a Next/React JS app",
            "Use Firebase for database and storage.",
            "Style with Tailwind CSS.",
            "Authenticate using next-auth.",
            "Apply like and comment functionality.",
            "Deploy on Vercel",
          ],
          frameWorks: [
            "Reactjs",
            "Nextjs",
            "Tailwind CSS",
            "Recoil",
            "next-auth",
            "Firebase",
          ],
          deployed: "Vercel",
          deployUrl: "https://nextjs-app-instagram.vercel.app/",
          githubUrl: "https://github.com/omidnoor/nextjs-app-instagram",
        },
      },
      {
        name: "Project2",
        position: [-248, 25, 218],
        rotation: [0, Math.PI * 0.5, 0],
        imageUrl:
          "https://products.ls.graphics/mesh-gradients/images/15.-Perfume_1-p-130x130q80.jpeg",
        url: null,
        contentUrl: "/content-images/metal-plate-scifi-utopai-v1.jpg",
        plate: {
          title: "Content Creator App Using OpenAI API",
          description: [
            "Build a Next/React JS app powered by AI and Next JS.",
            "Use OpenAI's GPT to implement AI generated content.",
            "Authenticate the Next/React JS app with Auth0.",
            "Style the app with Tailwind CSS.",
            "Store data for the app with MongoDB.",
            "Charge customers using stripe.",
            "Deploy on Google Cloud",
          ],
          frameWorks: [
            "Reactjs",
            "Nextjs",
            "Material-UI",
            "MongoDB",
            "Stripe",
            "Google Cloud",
            "Auth0",
          ],
          deployed: "Vercel",
          deployUrl: "https://nextjs-app-instagram.vercel.app/",
          githubUrl: "https://github.com/omidnoor/nextjs-openai-app",
        },
      },
      {
        name: "Project3",
        position: [-248, 25, 153],
        rotation: [0, Math.PI * 0.5, 0],
        imageUrl:
          "https://products.ls.graphics/mesh-gradients/images/06.-Wisteria-p-130x130q80.jpeg",
        url: null,
        plate: {
          title: "Project1",
          description: [
            "Build a Next/React JS app powered by AI and Next JS.",
            "Use OpenAI's GPT to implement AI generated content.",
            "Authenticate the Next/React JS app with Auth0.",
            "Style the app with Tailwind CSS.",
            "Store data for the app with MongoDB.",
            "Charge customers using stripe.",
            "Deploy on Google Cloud",
          ],
          frameWorks: ["Reactjs", "Nextjs", "Redux", "Material-UI"],
          deployed: "Vercel",
          deployUrl: "https://nextjs-app-instagram.vercel.app/",
          githubUrl: "https://github.com/omidnoor/nextjs-openai-app",
        },
      },
      {
        name: "Project4",
        position: [-248, 25, -150],
        rotation: [0, Math.PI * 0.5, 0],
        imageUrl:
          "https://products.ls.graphics/mesh-gradients/images/03.-Snowy-Mint_1-p-130x130q80.jpeg",
        url: null,
        plate: {
          title: "Project1",
          description: [
            "Build a Next/React JS app powered by AI and Next JS.",
            "Use OpenAI's GPT to implement AI generated content.",
            "Authenticate the Next/React JS app with Auth0.",
            "Style the app with Tailwind CSS.",
            "Store data for the app with MongoDB.",
            "Charge customers using stripe.",
            "Deploy on Google Cloud",
          ],
          frameWorks: ["Reactjs", "Nextjs", "Redux", "Material-UI"],
          deployed: "Vercel",
          deployUrl: "https://nextjs-app-instagram.vercel.app/",
          githubUrl: "https://github.com/omidnoor/nextjs-openai-app",
        },
      },
      {
        name: "Project5",
        position: [-248, 25, -218],
        rotation: [0, Math.PI * 0.5, 0],
        imageUrl:
          "https://products.ls.graphics/mesh-gradients/images/04.-Hopbush_1-p-130x130q80.jpeg",
        url: null,
        plate: {
          title: "Project1",
          description: [
            "Build a Next/React JS app powered by AI and Next JS.",
            "Use OpenAI's GPT to implement AI generated content.",
            "Authenticate the Next/React JS app with Auth0.",
            "Style the app with Tailwind CSS.",
            "Store data for the app with MongoDB.",
            "Charge customers using stripe.",
            "Deploy on Google Cloud",
          ],
          frameWorks: ["Reactjs", "Nextjs", "Redux", "Material-UI"],
          deployed: "Vercel",
          deployUrl: "https://nextjs-app-instagram.vercel.app/",
          githubUrl: "https://github.com/omidnoor/nextjs-app-instagram",
        },
      },
      {
        name: "Project6",
        position: [-190, 25, -248],
        rotation: [0, Math.PI * 0, 0],
        imageUrl:
          "https://products.ls.graphics/mesh-gradients/images/09.-Light-Sky-Blue-p-130x130q80.jpeg",
        url: null,
        plate: {
          title: "Project1",
          description: [
            "Build a Next/React JS app powered by AI and Next JS.",
            "Use OpenAI's GPT to implement AI generated content.",
            "Authenticate the Next/React JS app with Auth0.",
            "Style the app with Tailwind CSS.",
            "Store data for the app with MongoDB.",
            "Charge customers using stripe.",
            "Deploy on Google Cloud",
          ],
          frameWorks: ["Reactjs", "Nextjs", "Redux", "Material-UI"],
          deployed: "Vercel",
          deployUrl: "https://nextjs-app-instagram.vercel.app/",
          githubUrl: "https://github.com/omidnoor/nextjs-openai-app",
        },
      },
    ],
  },
];
