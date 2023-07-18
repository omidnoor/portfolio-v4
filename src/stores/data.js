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
    url: "/PageAboutMe",
    componentUrl: null,
  },
  // {
  //   name: "Read More",
  //   position: [2, 25, 180],
  //   rotation: [0, Math.PI * 0.5, 0],
  //   imageUrl: "/icons/about-icon-v1.png",
  //   url: "/PageAboutMe",
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
  {
    name: "Projects",
    position: [-190, 25, 150],
    rotation: [0, -Math.PI * 1, 0],
    imageUrl: "/icons/portfolio-icon-v1.png",
    url: "/PageProjects",
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
          deployUrl: "https://nextjs-openai-app.uw.r.appspot.com/",
          githubUrl: "https://github.com/omidnoor/nextjs-openai-app",
        },
      },
      {
        name: "Project3",
        position: [-248, 25, 100],
        rotation: [0, Math.PI * 0.5, 0],
        imageUrl:
          "https://products.ls.graphics/mesh-gradients/images/06.-Wisteria-p-130x130q80.jpeg",
        url: null,
        contentUrl: "/content-images/portfoli-v4-project-showcase-2.jpg",
        plate: {
          title: "Portfolio",
          description: [
            "Developed using React.js, Next.js, Three.js, and React Fiber, showcasing the cutting edge of modern web development.",
            "Utilized MongoDB to create and manage a robust and flexible database for form submissions.",
            "Integrated server-side and client-side error handling to ensure a seamless user experience and data integrity.",
            "Established API endpoints to connect the client-side to the server-side and MongoDB.",
            "Developed procedural materials and 3D models using Blender, adding depth and interactivity to the website.",
            "Employed modular SCSS for styling, enhancing code reusability, maintainability, and facilitating a scalable design system across the entire project.",
            "Utilized the react-spring library for animating user interface elements, providing a more engaging and responsive user experience.",
            "Integrated CameraControls for smooth camera movements in 3D spaces, enhancing user navigation and interaction.",
            "Designed an intuitive 3D UI/UX, improving user engagement and usability.",
            "Incorporated an email transporter to receive emails directly from users, ensuring immediate and efficient communication.",
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
