export type ProjectSlug = "multi-uav" | "remote-4g-drone" | "mugen-no-sekai";
export type ProjectVisual = "mission" | "control" | "lab";
export type ProjectItem = {
  title: string;
  description?: string;
  tags?: string[];
};
type SectionBase = {
  id: string;
  title: string;
  introduction?: string;
  note?: string;
};
export type ProjectSection =
  | (SectionBase & { kind: "prose"; paragraphs: string[] })
  | (SectionBase & { kind: "pipeline"; steps: ProjectItem[] })
  | (SectionBase & { kind: "cards"; items: ProjectItem[] })
  | (SectionBase & { kind: "fragments"; fragments: string[] });
export type ArchiveEntry = {
  title: string;
  description: string;
  technologies: string[];
  url?: string;
};
export type Project = {
  id: string;
  slug: ProjectSlug;
  title: string;
  eyebrow: string;
  typeLabel: string;
  status: "ongoing" | "completed" | "archive";
  statusLabel: string;
  shortDescription: string;
  technologies: string[];
  visual: ProjectVisual;
  sections: ProjectSection[];
  repository?: string;
  externalLinks?: { label: string; url: string }[];
  archiveEntries?: ArchiveEntry[];
  preview: {
    title: string;
    category: string;
    description: string;
    tags: string[];
    diagram: "swarm" | "edge" | "lab";
  };
};
export const projects: Project[] = [
  {
    id: "01",
    slug: "multi-uav",
    title: "Multi-UAV Cooperative Search",
    eyebrow: "CURRENT / RESEARCH",
    typeLabel: "MASTER’S THESIS",
    status: "ongoing",
    statusLabel: "IN PROGRESS",
    shortDescription:
      "From natural-language instructions to structured cooperative search missions. A research platform for comparing how multiple UAVs plan, search and work together.",
    technologies: [
      "LLM mission interpretation",
      "Mission manager",
      "Search baselines",
      "RL / PPO",
      "Unity Fast2D",
      "PX4 / Gazebo SITL",
      "MAVSDK",
      "Reproducible evaluation",
    ],
    visual: "mission",
    preview: {
      title: "Multi-UAV cooperative search",
      category: "INTELLIGENT SYSTEMS",
      description:
        "Exploring how autonomous aircraft can search together. Language models, reinforcement learning and flight systems meet in a cooperative research platform.",
      tags: ["Multi-UAV", "LLM", "RL", "PX4", "Gazebo", "Unity", "MAVSDK"],
      diagram: "swarm",
    },
    sections: [
      {
        id: "problem",
        title: "The problem",
        kind: "prose",
        paragraphs: [
          "A mission begins as a human instruction. The challenge is to turn that instruction into a structured task that several aircraft can execute cooperatively.",
          "The platform brings mission interpretation and search strategies into the same experimental setting, so their behavior can be evaluated under reproducible conditions.",
        ],
      },
      {
        id: "system",
        title: "The system",
        kind: "pipeline",
        introduction: "A conceptual path from instruction to evaluation.",
        steps: [
          {
            title: "Natural language",
            description: "A mission expressed in words.",
          },
          {
            title: "LLM interpretation",
            description: "Translate intent into a structured mission.",
          },
          {
            title: "Mission manager",
            description: "Coordinate the mission and its execution.",
          },
          {
            title: "Search strategy",
            description: "Systematic baselines or an experimental policy.",
          },
          {
            title: "Multi-UAV execution",
            description: "Cooperative search in simulation.",
          },
          {
            title: "Evaluation",
            description: "Compare behavior across repeatable runs.",
          },
        ],
        note: "This is the research system under development, not a claim that every component is complete.",
      },
      {
        id: "environment",
        title: "Experimental environment",
        kind: "cards",
        items: [
          {
            title: "Unity Fast2D",
            description:
              "A lightweight simulation environment for search and cooperation experiments.",
          },
          {
            title: "PX4 / Gazebo SITL",
            description:
              "A flight-simulation environment alongside the faster search experiments.",
          },
          {
            title: "MAVSDK",
            description:
              "The interface to the flight stack and mission execution.",
          },
          {
            title: "Baselines + PPO",
            description:
              "Systematic search baselines and reinforcement-learning experimentation, including PPO.",
          },
        ],
      },
      {
        id: "evaluation",
        title: "Evaluation",
        kind: "cards",
        introduction:
          "The evaluation considers how a strategy searches, how aircraft cooperate and whether an experiment can be repeated.",
        items: [
          {
            title: "Search coverage",
            description:
              "How much of the search area is explored; where coverage overlaps or leaves gaps.",
          },
          {
            title: "Targets and mission time",
            description:
              "Target discovery and the time required to carry out a mission.",
          },
          {
            title: "Cooperation",
            description: "The distribution of search effort across UAVs.",
          },
          {
            title: "Repeatability",
            description:
              "Consistent scenarios and comparable runs across strategies.",
          },
        ],
        note: "These are evaluation dimensions under consideration. No final research results or scientific conclusions are reported here.",
      },
      {
        id: "status",
        title: "Current status",
        kind: "prose",
        paragraphs: [
          "The Master’s thesis is ongoing. Mission interpretation, search strategies and the evaluation environment remain active areas of development.",
          "This case study will grow with the research. Final measurements, conclusions and public materials will be added when they are ready.",
        ],
      },
    ],
  },
  {
    id: "02",
    slug: "remote-4g-drone",
    title: "Remote 4G Drone Control",
    eyebrow: "ENGINEERING / FINAL PROJECT",
    typeLabel: "COMPUTER ENGINEERING FINAL PROJECT",
    status: "completed",
    statusLabel: "COMPLETED",
    shortDescription:
      "A physical UAV connected to a remote operator over 4G. Embedded hardware, flight control, cloud infrastructure, telemetry and real-time video in one end-to-end system.",
    technologies: [
      "Raspberry Pi",
      "Pixhawk / PX4",
      "MAVLink / MAVSDK",
      "STM32 / FreeRTOS",
      "4G / VPS",
      "Angular / Node.js",
      "WebRTC / WHEP",
      "RTSP / MediaMTX",
    ],
    visual: "control",
    preview: {
      title: "Remote 4G drone control",
      category: "EDGE / EMBEDDED",
      description:
        "Connecting flight control, live video and a web interface over a mobile network. From the embedded board to the remote operator.",
      tags: [
        "PX4",
        "Raspberry Pi",
        "MAVSDK",
        "WebRTC",
        "Angular",
        "Node.js",
        "STM32",
      ],
      diagram: "edge",
    },
    sections: [
      {
        id: "idea",
        title: "The idea",
        kind: "prose",
        paragraphs: [
          "Remote UAV control through a mobile connection spans more than the aircraft. It needs a path between the operator, cloud infrastructure, companion computer and flight controller, alongside telemetry and live video.",
          "This completed Computer Engineering final project connects those layers into a physical, end-to-end engineering system.",
        ],
      },
      {
        id: "architecture",
        title: "Architecture",
        kind: "pipeline",
        introduction: "The control path, from the browser to the physical UAV.",
        steps: [
          { title: "Web client", description: "Angular operator interface." },
          {
            title: "VPS / Cloud",
            description: "Cloud infrastructure and the Node.js component.",
          },
          {
            title: "4G network",
            description: "Mobile connectivity to the aircraft.",
          },
          {
            title: "Raspberry Pi",
            description: "Companion computing aboard the UAV.",
          },
          {
            title: "MAVLink / MAVSDK",
            description: "Flight-controller communication.",
          },
          { title: "Pixhawk / PX4", description: "The flight-control stack." },
          { title: "UAV", description: "The physical aircraft." },
        ],
      },
      {
        id: "video",
        title: "Video path",
        kind: "pipeline",
        introduction:
          "A separate media path brings the camera feed to the operator.",
        steps: [
          { title: "USB camera" },
          { title: "FFmpeg" },
          { title: "RTSP" },
          { title: "MediaMTX" },
          { title: "WHEP / WebRTC" },
          { title: "Web client" },
        ],
      },
      {
        id: "embedded",
        title: "Embedded / Sensors",
        kind: "cards",
        items: [
          {
            title: "STM32 + FreeRTOS",
            description: "Embedded hardware and real-time software.",
          },
          {
            title: "IMU + Barometer",
            description: "Integrated motion and pressure sensing.",
          },
          {
            title: "UART / I2C",
            description: "Communication with embedded components and sensors.",
          },
          {
            title: "Raspberry Pi + Pixhawk",
            description:
              "Companion computing and the flight controller connected through MAVLink / MAVSDK.",
          },
        ],
      },
      {
        id: "capabilities",
        title: "Result / Capabilities",
        kind: "cards",
        items: [
          {
            title: "Real-time telemetry",
            description: "Aircraft telemetry available to the remote operator.",
          },
          {
            title: "Remote ARM / DISARM",
            description: "Arming-state control through the remote system.",
          },
          {
            title: "Video streaming",
            description: "Real-time camera video delivered to the web client.",
          },
          {
            title: "Hardware integration",
            description:
              "Flight-controller communication and embedded sensor integration.",
          },
        ],
      },
    ],
  },
  {
    id: "03",
    slug: "mugen-no-sekai",
    title: "Mugen no Sekai",
    eyebrow: "EARLY / PERSONAL LAB",
    typeLabel: "PERSONAL LAB",
    status: "archive",
    statusLabel: "EARLY EXPLORATION",
    shortDescription:
      "Not one project. A place where many of them started. A long-running personal space for building ideas, trying technologies and learning by making things work.",
    technologies: [
      "Android",
      "Web",
      "Firebase",
      "NFC",
      "Unity",
      "Backend",
      "Mobile",
      "Product experiments",
    ],
    visual: "lab",
    preview: {
      title: "Mugen no Sekai",
      category: "EARLY / PERSONAL LAB",
      description:
        "A long-running personal space for building ideas, experimenting with technologies and learning by making things.",
      tags: ["Android", "Web", "Firebase", "NFC", "Unity", "Backend"],
      diagram: "lab",
    },
    archiveEntries: [],
    sections: [
      {
        id: "lab",
        title: "The lab",
        kind: "prose",
        paragraphs: [
          "Mugen no Sekai was a personal space for building ideas, experimenting with technologies and making products and prototypes.",
          "It is better understood as a workbench than a single finished project: a place to learn through the act of building.",
        ],
      },
      {
        id: "experiments",
        title: "Experiments",
        kind: "fragments",
        introduction:
          "Different directions of exploration, rather than one centralized product or architecture.",
        fragments: [
          "Mobile",
          "Web",
          "Product experiments",
          "Backend",
          "Interactive prototypes",
        ],
        note: "Specific historical projects can be added to this archive as their details are documented.",
      },
      {
        id: "technologies",
        title: "Technologies",
        kind: "fragments",
        introduction:
          "A broad collection of tools and ideas explored in the lab.",
        fragments: ["Android", "Web", "Firebase", "NFC", "Unity", "Backend"],
      },
      {
        id: "next",
        title: "What came next",
        kind: "prose",
        paragraphs: [
          "That practice of learning by building sits alongside the later end-to-end engineering work of Remote 4G Drone Control and the current Multi-UAV research.",
          "These are different ways of making things: experimentation, engineering and research. The lab is the early, open-ended part of that story.",
        ],
      },
    ],
  },
];
export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
export function projectHref(project: Pick<Project, "slug">): string {
  return `/projects/${project.slug}`;
}
