export type ServiceLink = {
  label: string;
  href: string;
  description?: string;
};

export type ServiceContent = {
  title: string;
  eyebrow: string;
  description: string;
  intro: string[];
  capabilities?: string[];
  outcomes?: string[];
  links?: ServiceLink[];
  cta?: ServiceLink;
};

export const servicesOverview: ServiceLink[] = [
  {
    label: "Hyperspectral Imaging (HSU)",
    href: "/services/hyperspectral-imaging",
    description:
      "High-resolution spectral imaging from VNIR through LWIR for material identification, mapping, and detailed characterization.",
  },
  {
    label: "Geotek Core Logging",
    href: "/services/geotek",
    description:
      "Integrated core analysis using X-ray fluorescence and spectral gamma-ray measurements to support geological characterization and interpretation.",
  },
  {
    label: "Laser Induced Breakdown Spectroscopy (LIBS)",
    href: "/services/libs",
    description:
      "Rapid elemental characterization using laser-induced plasma spectroscopy, expanding our analytical capabilities alongside hyperspectral imaging and XRF.",
  },
  {
    label: "3D Modelling",
    href: "/services/3d-modelling",
    description:
      "Three-dimensional visualization and modelling services for geological and project data.",
  },
  {
    label: "GRi Simulations",
    href: "/services/gri-simulations",
    description:
      "Simulation and visualization support for project planning, training, and technical communication.",
  },
];

export const serviceContent = {
  hyperspectral: {
    title: "Hyperspectral Imaging",
    eyebrow: "HSU services",
    description:
      "Spectral imaging services for mineral characterization, geological interpretation, research, and project-specific analysis.",
    intro: [
      "Hyperspectral imaging records reflected or emitted energy across many narrow wavelength bands. The resulting spectral signatures can be used to distinguish materials and map spatial variation that may not be visible in conventional imagery.",
      "HSU projects can be configured around the sample type, required spectral range, location, and level of interpretation. Project scope and deliverables are established before analysis begins.",
    ],
    capabilities: [
      "Drillcore and geological sample imaging",
      "Spectral characterization and mineral mapping",
      "Project-specific image and data processing",
      "Laboratory, mobile, handheld, and aerial workflows",
    ],
    outcomes: [
      "Processed hyperspectral imagery",
      "Spectral and mineralogical datasets",
      "Maps and visualizations",
      "Interpretive products or technical reporting when included in scope",
    ],
    links: [
      {
        label: "Mobile HSU",
        href: "/services/hyperspectral-imaging/mobile",
      },
      {
        label: "Handheld HSU",
        href: "/services/hyperspectral-imaging/handheld",
      },
      {
        label: "Aerial HSU",
        href: "/services/hyperspectral-imaging/aerial",
      },
      {
        label: "Videos",
        href: "/services/hyperspectral-imaging/videos",
      },
      {
        label: "Pricing & testimonials",
        href: "/pricing",
      },
    ],
    cta: {
      label: "Request an analysis",
      href: "/services/hyperspectral-imaging/request-analysis",
    },
  },

  mobileHsu: {
    title: "Mobile HSU",
    eyebrow: "Hyperspectral Imaging",
    description:
      "Transportable hyperspectral services for projects where samples or materials are best analyzed away from the main facility.",
    intro: [
      "Mobile deployment extends HSU capabilities to suitable project locations and can reduce the need to transport large or sensitive sample collections.",
      "Deployment requirements depend on the site, sample workflow, equipment configuration, project duration, and required outputs.",
    ],
    capabilities: [
      "Project-site deployment planning",
      "Imaging of suitable core and sample collections",
      "On-site data acquisition",
      "Post-deployment processing and delivery",
    ],
    cta: {
      label: "Discuss a mobile project",
      href: "/contact",
    },
  },

  handheldHsu: {
    title: "Handheld HSU",
    eyebrow: "Hyperspectral Imaging",
    description:
      "Portable spectral measurements for targeted samples, field materials, and rapid project investigations.",
    intro: [
      "Handheld measurements can support focused spectral observations where full imaging is unnecessary or impractical.",
      "The appropriate instrument and workflow depend on the material, environment, and analytical question being addressed.",
    ],
    capabilities: [
      "Targeted spot measurements",
      "Field and sample screening",
      "Rapid comparison of selected materials",
      "Integration with broader HSU projects where appropriate",
    ],
    cta: {
      label: "Discuss handheld analysis",
      href: "/contact",
    },
  },

  aerialHsu: {
    title: "Aerial HSU",
    eyebrow: "Hyperspectral Imaging",
    description:
      "Aerial hyperspectral workflows for suitable remote-sensing and site-scale applications.",
    intro: [
      "Aerial hyperspectral projects combine spectral imaging with spatial coverage to investigate suitable surface targets and project areas.",
      "Feasibility depends on the platform, target, site access, weather, spatial resolution, spectral requirements, and applicable operating requirements.",
    ],
    capabilities: [
      "Project and flight-planning support",
      "Spectral image acquisition for suitable targets",
      "Geospatial processing and visualization",
      "Project-specific data products",
    ],
    cta: {
      label: "Discuss an aerial project",
      href: "/contact",
    },
  },

  libs: {
    title: "Laser Induced Breakdown Spectroscopy (LIBS)",
    eyebrow: "Equipment & services",
    description:
      "Elemental characterization that can complement hyperspectral and mineralogical observations.",
    intro: [
      "LIBS uses a focused laser pulse to generate a small plasma from the material being analyzed. The emitted light can be measured to identify characteristic elemental signals.",
      "Within a project, LIBS can provide complementary information alongside imaging, mineralogical, and other analytical datasets. The exact analytical scope is determined by the sample type and project objective.",
    ],
    capabilities: [
      "Targeted elemental screening",
      "Spectral peak analysis",
      "Complementary characterization alongside HSU datasets",
      "Project-specific data exports and interpretation",
    ],
    outcomes: [
      "LIBS spectra and processed data",
      "Elemental indicators appropriate to project scope",
      "Integrated analytical products where multiple methods are used",
    ],
    links: [
      {
        label: "Videos",
        href: "/services/libs/videos",
      },
      {
        label: "Pricing & testimonials",
        href: "/pricing",
      },
    ],
    cta: {
      label: "Discuss LIBS analysis",
      href: "/contact",
    },
  },

  modelling: {
    title: "3D Modelling",
    eyebrow: "Equipment & services",
    description:
      "Three-dimensional modelling and visualization for suitable geological, spatial, and project datasets.",
    intro: [
      "3D models can help communicate spatial relationships, integrate multiple data sources, and support interpretation of complex project information.",
      "The modelling workflow is tailored to the available source data, required level of detail, and intended use of the final model.",
    ],
    outcomes: [
      "Project-specific 3D models",
      "Visualization outputs",
      "Derived figures or media for reports and presentations",
    ],
    links: [
      {
        label: "Videos",
        href: "/services/3d-modelling/videos",
      },
      {
        label: "Pricing & testimonials",
        href: "/pricing",
      },
    ],
    cta: {
      label: "Discuss a modelling project",
      href: "/contact",
    },
  },

  gri: {
    title: "GRi Simulations",
    eyebrow: "Equipment & services",
    description:
      "Simulation and visualization support for suitable technical, training, and project applications.",
    intro: [
      "GRi simulation projects are scoped around the intended audience, available source material, required interactions, and project objectives.",
      "Contact the team to determine whether simulation is appropriate for your use case and what source information is required.",
    ],
    outcomes: [
      "Project-specific simulation assets",
      "Visualization and demonstration materials",
      "Outputs configured for the agreed delivery platform",
    ],
    links: [
      {
        label: "Videos",
        href: "/services/gri-simulations/videos",
      },
      {
        label: "Pricing & testimonials",
        href: "/pricing",
      },
    ],
    cta: {
      label: "Discuss a simulation project",
      href: "/contact",
    },
  },

  geotek: {
    title: "Geotek Core Logging",
    eyebrow: "Equipment & services",
    description:
      "Integrated, non-destructive analysis of drill core using X-ray fluorescence and spectral gamma-ray measurements.",
    intro: [
      "The Geotek core logging system brings multiple analytical methods together in a consistent core-scanning workflow. It allows geological materials to be measured systematically while preserving the spatial relationship between observations.",
      "X-ray fluorescence and spectral gamma-ray measurements can support geological characterization, comparison between core intervals, and integration with hyperspectral and other project datasets.",
    ],
    capabilities: [
      "X-ray fluorescence measurements for elemental characterization",
      "Spectral gamma-ray measurements of naturally occurring radiation",
      "Systematic measurements along drill core and other suitable materials",
      "Integration with hyperspectral, mineralogical, and geological datasets",
      "Project-specific processing, visualization, and data delivery",
    ],
    outcomes: [
      "Processed XRF measurements",
      "Spectral gamma-ray datasets",
      "Depth-referenced analytical results",
      "Graphs, figures, and project-specific visualizations",
      "Integrated analytical products where multiple methods are used",
    ],
    links: [
      {
        label: "Hyperspectral Imaging",
        href: "/services/hyperspectral-imaging",
        description:
          "Explore complementary spectral imaging and mineral-mapping capabilities.",
      },
      {
        label: "Pricing & testimonials",
        href: "/pricing",
      },
    ],
    cta: {
      label: "Discuss Geotek analysis",
      href: "/contact",
    },
  },
} satisfies Record<string, ServiceContent>;