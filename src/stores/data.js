export const pages = [
  {
    name: "Home",
    position: [36, 25, -123],
    rotation: [0, 0, 0],
    imageUrl: "/icons/home-icon-v1.png",
    url: "http://localhost:3000/PageHome",
    sub: null,
  },
  {
    name: "About Me",
    position: [1, 25, 180],
    rotation: [0, Math.PI * 0.5, 0],
    imageUrl: "/icons/about-icon-v1.png",
    url: "http://localhost:3000/PageAboutMe",
    sub: null,
  },
  {
    name: "Contact Me",
    position: [123, 25, -86],
    rotation: [0, -Math.PI * 0.5, 0],
    imageUrl: "/icons/contact-icon-v1.png",
    url: "http://localhost:3000/PageContactMe",
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
    sub: [
      {
        name: "Project1",
        position: [-250, 25, 220],
        rotation: [0, Math.PI * 0.5, 0],
        imageUrl: "/icons/portfolio-icon-v1.png",
        url: null,
        contentUrl: "/content-images/insta-v1.jpg",
      },
      {
        name: "Project2",
        position: [-190, 25, 250],
        rotation: [0, Math.PI * 1, 0],
        imageUrl:
          "https://products.ls.graphics/mesh-gradients/images/15.-Perfume_1-p-130x130q80.jpeg",
        url: null,
        contentUrl: "/content-images/metal-plate-scifi-utopai-v1.jpg",
      },
      {
        name: "Project3",
        position: [-250, 25, 150],
        rotation: [0, Math.PI * 0.5, 0],
        imageUrl:
          "https://products.ls.graphics/mesh-gradients/images/06.-Wisteria-p-130x130q80.jpeg",
        url: "http://localhost:3000/PageProjects",
      },
      {
        name: "Project4",
        position: [-250, 25, -150],
        rotation: [0, Math.PI * 0.5, 0],
        imageUrl:
          "https://products.ls.graphics/mesh-gradients/images/03.-Snowy-Mint_1-p-130x130q80.jpeg",
        url: "http://localhost:3000/PageProjects",
      },
      {
        name: "Project5",
        position: [-250, 25, -220],
        rotation: [0, Math.PI * 0.5, 0],
        imageUrl:
          "https://products.ls.graphics/mesh-gradients/images/04.-Hopbush_1-p-130x130q80.jpeg",
        url: "http://localhost:3000/PageProjects",
      },
      {
        name: "Project6",
        position: [-190, 25, -250],
        rotation: [0, Math.PI * 0, 0],
        imageUrl:
          "https://products.ls.graphics/mesh-gradients/images/09.-Light-Sky-Blue-p-130x130q80.jpeg",
        url: "http://localhost:3000/PageProjects",
      },
    ],
  },
];
