export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  biography: string[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "gary-thompson",
    name: "Dr. Gary Thompson",
    title: "Dean, School of Sustainable Development",
    image:
      "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/Gary-thompson.jpg",
    biography: [
      "Dr. Thompson has been involved in the mining and mineral exploration industry, undertaking applied research in Newfoundland and Labrador for the past 13 years. He has 25 years of national and international research experience, has published in respected international journals, and is a registered professional geoscientist.",
      "He continues to work extensively with all sectors of the mineral industry in Newfoundland and Labrador, including industry partners, the Government of Newfoundland and Labrador Mines and Energy Branch, and Memorial University.",
      "Gary has led research involving grade determination, ore characterization, Laser Induced Breakdown Spectrometry, and hyperspectral imaging applications for mineral exploration. In 2019, he was named Geoscientist of the Year by the CIM Newfoundland and Labrador branch.",
    ],
  },
  {
    id: "derek-wilton",
    name: "Dr. Derek Wilton",
    title: "Faculty Research — Natural Resources (Economic Geology)",
    image:
      "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/derekwilton.jpg",
    biography: [
      "Derek Wilton is a St. John’s native with B.Sc. and Ph.D. degrees from Memorial University and an M.Sc. degree from the University of British Columbia.",
      "He has been engaged in mineral deposit research in Newfoundland and Labrador, elsewhere in Canada, and internationally since 1984. Much of his research has focused on Labrador.",
      "His awards include the inaugural Geoscientist of the Year award from the Newfoundland and Labrador branch of the Canadian Institute of Mining, Metallurgy and Petroleum, the Barlow Medal, the Gross Medal, and the PEGNL Education Award.",
    ],
  },
  {
    id: "michel-rosener",
    name: "Michel Rosener",
    title: "Faculty Researcher",
    image:
      "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/Michel-Rosener-s.jpg",
    biography: [
      "Michel Rosener is a faculty researcher with the Office of Applied Research and Innovation at College of the North Atlantic. His work focuses on non-destructive material characterization using hyperspectral imaging and X-ray fluorescence, primarily within geoscientific applications.",
      "Michel holds a Ph.D. in Geology and Petrophysics, an M.Sc. in Earth Sciences, and additional postgraduate training in geo-information science and hyperspectral remote sensing.",
      "He has more than two decades of international experience across academia, industry, and consulting, including computer vision, hyperspectral core logging, geoinformatics, machine learning, geothermal reservoir modelling, hardware design, and software development.",
    ],
  },
  {
    id: "janelle-skeard",
    name: "Janelle Skeard",
    title: "Director of Industry Innovation",
    image:
      "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/Janelle-Skeard-s.jpg",
    biography: [
      "Janelle Skeard holds a Ph.D., master’s degrees in Economic Geography and Bio/Medical Ethics, and a certificate in Advanced Project Management.",
      "Throughout her career, she has managed and led interdisciplinary research projects covering land-use planning, genetic data in electronic medical records, and workforce requirements for major construction projects.",
      "Janelle joined CNA in 2023 through the Mining Innovation Commercialization Accelerator project. She became Director of Industry Innovation in 2024 and continues to build strategic partnerships, support applied research, and strengthen collaboration among academia, industry, and communities.",
    ],
  },
  {
    id: "richard-spencer",
    name: "Richard Spencer",
    title: "Faculty Researcher — Artificial Intelligence and Machine Learning",
    image:
      "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/Richard-Spencer-s.jpg",
    biography: [
      "Richard Spencer is a faculty researcher with the Office of Applied Research and Innovation at College of the North Atlantic.",
      "His research applies artificial intelligence, machine learning, and data science to hyperspectral imagery through feature engineering, band ratios, principal component analysis, clustering, and supervised learning.",
      "Richard also supports CNA’s Applied Degree in Artificial Intelligence and Machine Learning and has more than a decade of experience in post-secondary education. He serves as a cloud computing expert with Skills Canada and WorldSkills International.",
    ],
  },
  {
    id: "jeannette-bursey",
    name: "Jeannette Bursey",
    title: "Departmental Program Coordinator",
    image:
      "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/Jeannette-Bursey-b.jpg",
    biography: [
      "Jeannette Bursey began her career in the mining equipment industry before joining College of the North Atlantic in 2010 after graduating from CNA’s Business Management Accounting program.",
      "She previously worked in contract training and as an organizational budget analyst before joining the Office of Applied Research in 2022.",
      "As Departmental Program Coordinator for the Hyperspectral Imaging Applications project, she coordinates project plans, schedules, budgets, expenditures, logistics, and available resources.",
    ],
  },
  {
    id: "kele-miguel",
    name: "Kele Miguel",
    title: "Mineral Laboratory Assistant",
    image:
      "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/Kele_Miguel.jpg",
    biography: [
      "Kele Miguel works as a Mineral Laboratory Assistant with the Office of Applied Research and Innovation.",
      "Kele supports the Hyperspectral Scanning Unit project as CNA advances its mobile hyperspectral imaging technology with mining and industry partners.",
      "Kele is a graduate of Memorial University’s Earth Sciences program and holds a bachelor’s degree in Geophysics.",
    ],
  },
  {
    id: "stewart-sharpe",
    name: "Stewart Sharpe",
    title: "Mineral Laboratory Technician",
    image:
      "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/stewart.jpg",
    biography: [
      "Stewart Sharpe joined the Office of Applied Research and Innovation in 2020.",
      "He works with the hyperspectral team as a Mineral Laboratory Technician, operating the mobile hyperspectral scanning unit and assisting with data management.",
      "Stewart completed CNA’s Industrial Engineering Technology program and later earned a Bachelor of Technology from Memorial University. He also has an interest in 3D modelling and design software.",
    ],
  },
  {
    id: "chantelle-troy",
    name: "Chantelle Troy",
    title: "Mining Network Development Officer",
    image:
      "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/Chantelle-Troy-s.jpg",
    biography: [
      "Born and raised on the Northern Peninsula of Newfoundland, Chantelle is a business development and project management professional with extensive experience supporting industry partnerships, contract training, and stakeholder engagement.",
      "With a Bachelor of Commerce from Memorial University of Newfoundland, she spent a number of years as a fundraising professional and public relations specialist working with rural hospitals in Ontario. During that time, Chantelle also obtained her Sommelier Certificate from Algonquin College.",
      "Since moving back to Newfoundland in 2012, Chantelle has had various roles with the College of the North Atlantic including Student Development Officer, Instructor in the Business Administration and Strategic Leadership & Project Management programs and Business Development Officer with Customized and Continuous Learning.",
    ],
  },
  {
    id: "jianbo-long",
    name: "Jianbo Long",
    title: "Faculty Researcher Chair in Critical and Strategic Minerals",
    image:
      "https://cna-webfiles.s3.us-east-1.amazonaws.com/webmedia/Jianbo-Long.jpg",
    biography: [
      "Jianbo Long holds B.Sc (Earth Sciences) and M.Sc (Geophysics) degrees from Central South University and a Ph.D. degree in geophysics from Memorial University of Newfoundland. He has conducted extensive research in mineral resource exploration using non-seismic geophysical techniques (e.g., potential field, electromagnetic, direct current resistivity, etc) since Ph.D. and in subsequent postdoctoral research scientist positions with Mount Allison University, NTNU (Norwegian University of Science and Technology) and Memorial University. He has worked over the past 10 years with both the academic and industry to advance geophysical research and to promote geoscience solutions in the context of natural resources exploration and characterization.",
      "His current research areas include developing advanced algorithms and software for the modelling and inversion of geophysical EM data (e.g., magnetotellurics, CSEM, TEM) and potential field data (i.e, gravity and magnetic), advanced numerical and computational methods (e.g., finite element methods and meshfree methods), incorporation of machine learning (i.e., artificial intelligence) algorithms in geoscience data analysis, and techniques for hyperspectral imaging and data processing with a potential integration of other imaging data (e.g., gamma ray, XRF, etc) for critical minerals. He is also interested in integrating emerging industry technologies such as drone-based and/or semi-airborne data acquisition into geoscience data processing and interpretation for mineral resources.",
    ],
  },
];