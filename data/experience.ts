/** Full-time timeline. Dates and titles match my LinkedIn profile. */

export type Role = {
  id: string;
  title: string;
  start: string;
  end: string;
  duration: string;
  location: string;
  /** A short description, where there is one. First person. */
  summary?: string;
};

export type ExperienceGroup = {
  id: string;
  org: string;
  span?: string;
  href?: string;
  roles: Role[];
};

export const experience: ExperienceGroup[] = [
  {
    id: "digitalocean",
    org: "DigitalOcean",
    span: "3 years 3 months",
    href: "https://www.digitalocean.com/community/users/asinghwalia",
    roles: [
      {
        id: "do-lead",
        title: "Senior Technical Content Strategist II and Team Lead",
        start: "September 2025",
        end: "Present",
        duration: "1 year 3 months",
        location: "India",
      },
      {
        id: "do-writer",
        title: "Senior Technical Writer",
        start: "September 2023",
        end: "September 2025",
        duration: "2 years 1 month",
        location: "Remote",
        summary:
          "I wrote tutorials, knowledge bases, how-to guides, and technical documentation for developers, startups, and IT teams. The job was to make hard topics clear enough that a first-timer and an experienced engineer could both use DigitalOcean's cloud from the same page.",
      },
    ],
  },
  {
    id: "nutanix",
    org: "Nutanix",
    span: "4 years 8 months",
    roles: [
      {
        id: "amex",
        title:
          "Cloud Consultant for American Express Cloud and Infrastructure Operations team India",
        start: "January 2022",
        end: "August 2023",
        duration: "1 year 8 months",
        location: "Pune Division, Maharashtra, India",
      },
      {
        id: "sr-sre",
        title: "Sr. SRE",
        start: "January 2021",
        end: "January 2022",
        duration: "1 year 1 month",
        location: "Pune Division, Maharashtra, India",
      },
      {
        id: "sre",
        title: "SRE",
        start: "July 2019",
        end: "January 2021",
        duration: "1 year 7 months",
        location: "Pune/Pimpri-Chinchwad Area",
      },
      {
        id: "sre-intern",
        title: "Site Reliability Engineer - Intern",
        start: "January 2019",
        end: "June 2019",
        duration: "6 months",
        location: "Bengaluru, Karnataka, India",
      },
    ],
  },
  {
    id: "datascience-plus",
    org: "DataScience+",
    span: "6 years 3 months",
    href: "https://datascienceplus.com/author/anish-singh-walia/",
    roles: [
      {
        id: "ds-author",
        title: "Author",
        start: "June 2017",
        end: "August 2023",
        duration: "6 years 3 months",
        location: "Greater Boston",
        summary:
          "I wrote project-based data science, machine learning, and statistical modelling tutorials in R, with step-by-step instructions and worked examples. DataScience+ is a community for R and Python tutorials, where data scientists share work and get hired.",
      },
    ],
  },
];

/** VIT-era teams and a short internship. */
export const earlyDays: Role[] = [
  {
    id: "mic",
    title: "Technical Member",
    start: "January 2018",
    end: "April 2018",
    duration: "4 months",
    location: "Vellore Area, India",
    summary:
      "Microsoft Innovation Center at VIT Vellore. A non-profit for research, development, and education, in partnership with Microsoft.",
  },
  {
    id: "vinnovate",
    title: "Technical Member",
    start: "January 2016",
    end: "December 2017",
    duration: "2 years",
    location: "Vellore",
    summary:
      "VinnovateIT, the Cognizant research and innovation lab under VIT's School of Information Technology.",
  },
  {
    id: "selectdine",
    title: "Intern at Selectdine Services Pvt Ltd.",
    start: "March 2017",
    end: "April 2017",
    duration: "2 months",
    location: "India",
    summary:
      "Web developer intern at SelectDine. Front end in AngularJS, JavaScript, jQuery, Bootstrap, HTML, and CSS: the restaurant page, landing page, orders, and table reservations.",
  },
  {
    id: "mechnovate",
    title: "Technical Member at International Symposium Mechnovate'17, VIT University",
    start: "December 2016",
    end: "March 2017",
    duration: "4 months",
    location: "India",
    summary:
      "Built the ICMMM'17 website with the technical team. Client side in Angular, JavaScript, jQuery, and Bootstrap. Server side and routing in Node.js and Express.",
  },
  {
    id: "riviera",
    title: "Riviera 2017 Developers Team",
    start: "September 2016",
    end: "February 2017",
    duration: "6 months",
    location: "India",
    summary:
      "Client side of a live polling app for Riviera, VIT's cultural fest, in AngularJS, Node, and MongoDB. It decided which artists to invite.",
  },
  {
    id: "gravitas",
    title: "Gravitas 2016 Technical Team",
    start: "July 2016",
    end: "September 2016",
    duration: "3 months",
    location: "Vellore",
    summary:
      "Icons, backgrounds, and illustrations for the Gravitas website, in Adobe Illustrator.",
  },
];

export const education = [
  {
    school: "Vellore Institute of Technology",
    credential: "Bachelor's degree, Information Technology",
    years: "2015 to 2019",
  },
  {
    school: "Gautam international school",
    credential: null,
    years: "2013 to 2015",
  },
];

export const topSkills = ["AI Inference", "Linux Server", "Cloud Consulting"];

export const languages = [
  "Hindi",
  "English",
  "Punjabi",
  "German (Limited Working)",
];

export const certifications = [
  "Data Science 101",
  "Cloud Technical Series '23",
  "Kaggle R Tutorial on Machine Learning",
  "Linux: Bash Shell and Scripts",
];

/** Tools I use for research and search work. */
export const tools = [
  "Semrush",
  "Profound",
  "Ahrefs",
  "DataForSEO",
  "Google Search Console",
  "AI search monitoring tools",
];

/** The rest of the daily stack. */
export const stack = [
  "ChatGPT",
  "Claude",
  "Cursor",
  "Linux and shell",
  "Kubernetes",
  "Ansible",
  "Python",
  "R",
  "Containers and microservices",
];
