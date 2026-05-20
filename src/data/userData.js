export const userData = {
  personalInfo: {
    name: "Aarush Agarwal",
    phone: "317-486-3961",
    email: "agarw574@purdue.edu",
    linkedin: "https://www.linkedin.com/in/aarusha/",
    github: "https://github.com/AarushAgarwal-dev",
    location: "West Lafayette, IN",
    summary: "High-performance Computer Engineering undergraduate (4.0 GPA) with a rare blend of hardware mastery and full-stack AI expertise. Founder of two successful ventures and a researcher engineering autonomous data pipelines for 10,000+ commercial vehicles. Proven track record of shipping complex products—from custom RISC-V SoCs to emotionally intelligent AI agents. Seeking to leverage deep technical skills in GenAI, Data Engineering, and Embedded Systems to build world-changing technology."
  },
  education: {
    university: "Purdue University",
    location: "West Lafayette, IN",
    degree: "Bachelor of Science in Computer Engineering (Honors College)",
    gpa: "4.0/4.0",
    graduationDate: "May 2028",
    honors: "John Martinson Honors College, Semiconductor Student Alliance, IEEE, Purdue Student Union Board"
  },
  skills: {
    aiGenAi: "Large Language Models (LLMs), Google Gemini API, RAG Architecture, Prompt Engineering, Agentic Frameworks, Sentiment Analysis, Fine-tuning",
    dataEngineering: "DataOps Pipelines, SQL, Pandas, NumPy, Scikit-learn, Markov Chains, Parquet Processing, Quantitative Research, Predictive Analytics",
    languages: "Python, C, C++, JavaScript (ES6+), SystemVerilog, Verilog, MATLAB, Embedded C, Bash/Shell",
    cloudWeb: "AWS, Azure, GCP, Node.js, React.js (v19), Next.js, Vite, Docker, Linux (Ubuntu), CI/CD, Infrastructure-as-Code (IaC), Vercel Edge Functions",
    hardware: "RISC-V Architecture, RTL Design, Physical Design, Cadence Virtuoso, FPGA Prototyping, PCB Design, IoT, SX1276 Radio Modules",
    softSkills: "Start-up Leadership, Product Strategy, Technical Communication, Community Building, Agile Methodologies"
  },
  experience: [
    {
      role: "SoCET Researcher (System on Chip Extension Technologies)",
      company: "Purdue VIP (Vertically Integrated Projects)",
      location: "West Lafayette, IN",
      duration: "August 2025 -- Present",
      points: [
        "Spearheading the design of an industry-grade RISC-V System-on-Chip (SoC), mastering the entire semiconductor lifecycle from RTL definition to GDSII tape-out.",
        "Architecting high-performance analog and digital circuits using SystemVerilog, optimizing for power-performance-area (PPA) constraints across 7 specialized hardware domains.",
        "Leveraging industry-standard EDA tools (Cadence Virtuoso, Genus, Innovus) to execute complex physical design flows, ensuring signal integrity for next-gen computing hardware.",
        "Driving interdisciplinary innovation in FPGA prototyping and hardware-software co-design, bridging the gap between silicon architecture and high-level software applications."
      ],
    },
    {
      role: "Data Science Researcher",
      company: "The Data Mine (Corporate Partner: Allison Transmission)",
      location: "West Lafayette, IN",
      duration: "August 2025 -- Present",
      points: [
        "Engineering autonomous DataOps pipelines to ingest and process 5TB+ of high-frequency telematics data from 10,000+ commercial vehicles, directly impacting fleet reliability.",
        "Developing state-of-the-art predictive maintenance models using Markov Chain analysis and N-gram clustering to forecast Diagnostic Trouble Codes (DTCs) with 96% precision.",
        "Unlocking 5+ days of lead time for critical maintenance events by identifying latent failure patterns, saving significant operational costs for fleet operators.",
        "Optimized data query performance by restructuring Parquet file storage, significantly reducing latency for time-series analysis dashboards.",
        "Collaborating directly with corporate data science teams to deploy production-ready Python/SQL code into live commercial telematics environments."
      ],
    },
    {
      role: "Engineer",
      company: "Purdue Space Program: A SEDS Chapter",
      location: "Remote",
      duration: "May 2025 -- August 2025",
      points: [
        "Revolutionized ground station infrastructure by designing a custom IoT-enabled telemetry unit, replacing legacy wired connections with a robust, high-speed BLE interface.",
        "Optimized packet transmission protocols for SX1276 LoRa modules, achieving stable long-range data acquisition under critical flight conditions.",
        "Engineered mission-critical firmware using Embedded C, conducting rigorous latency testing to ensure zero-loss data capture during payload operations."
      ],
    },
    {
      role: "Founder & Content Creator",
      company: "Laughing Tots (Media Venture)",
      location: "Remote",
      duration: "August 2023 -- August 2025",
      points: [
        "Bootstrapped a profitable 3D animation media venture, scaling to 1,740+ subscribers and 738,000+ views by reverse-engineering YouTube's recommendation algorithms.",
        "Architected a professional-grade 3D production pipeline (Modeling, Rigging, Texturing, Rendering), delivering 92+ high-quality assets on a strict weekly release schedule.",
        "Maximized viewer retention (6,800+ total watch hours) through data-driven content pacing and iterative A/B testing of thumbnails and hooks."
      ],
    },
    {
      role: "Founder",
      company: "DoubtAnswered",
      location: "Remote",
      duration: "May 2023 -- August 2025",
      points: [
        "Architected and deployed a scalable, full-stack educational platform on Google Cloud Platform (GCP), serving a high-availability online community.",
        "Engineered automated CI/CD pipelines and Infrastructure-as-Code (IaC) workflows, reducing deployment time by 80% and ensuring 99.9% uptime.",
        "Gamified the learning experience with 'Question of the Week' mechanics, driving a 40% increase in daily active user engagement."
      ],
    },
    {
      role: "Volunteer Teacher",
      company: "One Hand For Happiness",
      location: "Remote",
      duration: "April 2021 -- August 2025",
      points: [
        "Mentored 30+ underprivileged students, designing and delivering a rigorous STEM curriculum (Python, Math, Chemistry) to bridge the digital divide.",
        "Innovated low-cost educational hardware solutions (e.g., DIY projectors), enabling interactive digital learning in resource-constrained environments."
      ],
    }
  ],
  projects: [
    {
      name: "Itsmigo: The \"Ride-or-Die\" AI Companion",
      tech: "React, AI/LLM, Sentiment Analysis, EQ Engine",
      year: "2025",
      points: [
        "Built the world's first AI companion engineered specifically for Emotional Intelligence (EQ), featuring a proprietary 'Persona-First' engine that prioritizes user validation over raw productivity.",
        "Designed 4 distinct, hyper-realistic personas (Mia, Leo, Gramps, Max) that adapt dynamically to user sentiment, creating a 'Ride-or-Die' connection missing in standard LLMs.",
        "Implemented a holistic 'Comfort Economy' business model, integrating Freemium subscriptions with digital wellness features to combat the global loneliness epidemic."
      ],
    },
    {
      name: "CS159 Pete V2.0: Gamified C Learning Platform",
      tech: "React 19, Vite, Google Gemini API, Vercel Edge Functions",
      year: "2025",
      points: [
        "Launched V2.0 of a revolutionary EdTech platform that gamifies the C programming curriculum, turning abstract concepts (pointers, memory) into a high-octane racing championship.",
        "Engineered 'Pit Crew AI', a context-aware tutor powered by Gemini that translates complex compiler errors into intuitive racing metaphors, significantly improving student retention.",
        "Designed a modular JavaScript engine to handle state management and gamified progression, simulating an autonomous agentic environment for student learning.",
        "Delivered a premium, 'Cyberpunk' glassmorphism UI with smart theming and full mobile responsiveness, setting a new standard for educational UX."
      ],
    },
    {
      name: "Debris Detection System for Dams",
      tech: "Python, Computer Vision, IoT, Arduino",
      year: "2023",
      points: [
        "Engineered a life-saving autonomous monitoring system using OpenCV and ultrasonic sensors to process 1,000+ real-time readings/minute, predicting flood risks with high accuracy.",
        "Interfaced predictive software with Arduino hardware to trigger physical maintenance mechanisms, creating a closed-loop autonomous system.",
        "Winner, 1st Place | Panchatatvam 2023 National Science Competition (outperforming 350+ schools)."
      ],
    },
    {
      name: "Estate Price Prediction System",
      tech: "Machine Learning, Python, Quantitative Research",
      year: "2023",
      points: [
        "Developed a high-precision machine learning model to forecast real estate market trends, replacing speculative guesswork with data-driven investment strategies.",
        "Winner, 1st Place | BIZECO 2023 Estate Investment Competition."
      ],
    }
  ],
  awards: [
    "Financial Wizardry Challenge - 1st Position (Highest Total Score)",
    "AP Scholar with Distinction (College Board)",
    "BIZECO 2023 Estate Investment Competition - 1st Place",
    "Innovix - 2nd Position",
    "International STEM Tinkering Olympiad (ISTO) - 2nd Rank Internationally (Top 0.0002%)",
    "SOF International English Olympiad - 14th Rank Internationally (Top 0.001%)"
  ],
  certifications: [
    "CS50: Introduction to Computer Science (Harvard University)",
    "J.P. Morgan Software Engineering Job Simulation (Forage)",
    "Developing Back-End Apps with Node.js and Express (IBM)",
    "Getting Started with Git and GitHub (IBM)",
    "Introduction to Cloud Computing (IBM)",
    "Introduction to Web Development (IBM)"
  ]
};
