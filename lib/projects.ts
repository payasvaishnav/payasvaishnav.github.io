export type Project = {
  title: string;
  description: string;
  href: string;
  external?: boolean;
  technologies: string[];
};

const projects: Project[] = [
  {
    title: "Network Packet Processing Suite",
    description: "A high-performance network instrumentation and packet-processing system.",
    href: "https://payasvaishnav.github.io/Network-Packet-Processing-Suite/",
    external: true,
    technologies: ["C++", "Kafka", "Docker"],
  },
];

export function getAllProjects(): Project[] {
  return projects;
}
