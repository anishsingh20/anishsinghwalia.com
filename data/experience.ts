/** Full-time timeline from the LinkedIn profile export (source of truth). */

export type Role = {
  id: string;
  title: string;
  start: string;
  end: string;
  duration: string;
  location: string;
  /** His own words, only where the export includes a description. */
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
          "I am a Senior Technical Writer at DigitalOcean, where I specialize in creating detailed, user-friendly tutorials, knowledge bases, how-to guides, and technical documentation for developers, startups, and IT professionals. My work involves breaking down complex technical concepts into easily understandable content, ensuring that both novice and experienced users can leverage DigitalOcean's cloud services effectively.",
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
          "I write project-based data science, machine learning and statistical modelling tutorials with step-by-step instructions and examples in R. It is a platform to practice your skills from the basic to advanced R programming, across different topics including statistics, machine learning, data manipulation and visualization. It's an online community for showcasing R & Python tutorials. It operates as a networking platform for data scientists to promote their talent and get hired.",
      },
    ],
  },
];

/** VIT-era roles, kept short. Wording follows the LinkedIn export. */
export const earlyDays: Role[] = [
  {
    id: "mic",
    title: "Technical Member",
    start: "January 2018",
    end: "April 2018",
    duration: "4 months",
    location: "Vellore Area, India",
    summary:
      "Microsoft Innovation Center — VIT Vellore. A non-profit heading research, development, and education through a partnership with Microsoft at VIT.",
  },
  {
    id: "vinnovate",
    title: "Technical Member",
    start: "January 2016",
    end: "December 2017",
    duration: "2 years",
    location: "Vellore",
    summary:
      "VinnovateIT. Cognizant research and innovation lab under VIT's School of Information Technology.",
  },
  {
    id: "selectdine",
    title: "Intern at Selectdine Services Pvt Ltd.",
    start: "March 2017",
    end: "April 2017",
    duration: "2 months",
    location: "India",
    summary:
      "SelectDine. Web developer intern. Front end with AngularJS, JavaScript, jQuery, Bootstrap, HTML, and CSS: restaurant page, landing page, orders, and table reservation.",
  },
  {
    id: "mechnovate",
    title: "Technical Member at International Symposium Mechnovate'17, VIT University",
    start: "December 2016",
    end: "March 2017",
    duration: "4 months",
    location: "India",
    summary:
      "Technical team for the ICMMM'17 website. Client side in Angular, JavaScript, jQuery, and Bootstrap. Server side and routing in Node.js and Express.",
  },
  {
    id: "riviera",
    title: "Riviera 2017 Developers Team",
    start: "September 2016",
    end: "February 2017",
    duration: "6 months",
    location: "India",
    summary:
      "Riviera, VIT University. Client side of a live polling app (AngularJS, Node, and MongoDB) for which artists to invite.",
  },
  {
    id: "gravitas",
    title: "Gravitas 2016 Technical Team",
    start: "July 2016",
    end: "September 2016",
    duration: "3 months",
    location: "Vellore",
    summary:
      "Gravitas, VIT University. Icons, backgrounds, and illustrations for the website in Adobe Illustrator.",
  },
];

export const education = [
  {
    school: "Vellore Institute of Technology",
    credential: "Bachelor's degree, Information Technology",
    years: "2015–2019",
  },
  {
    school: "Gautam international school",
    credential: null,
    years: "2013–2015",
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

/** Tools named in the LinkedIn About. */
export const tools = [
  "Semrush",
  "Profound",
  "Ahrefs",
  "DataForSEO",
  "Google Search Console",
  "AI search monitoring tools",
];

/** Also named in interviews and the GitHub README. */
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
