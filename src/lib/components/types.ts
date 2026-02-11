export interface IProject {
  name: string;
  desc: string;
  url?: string;
  git: string; // primary
  gitBackend?: string;
  tech: string[];
  img?: string;
  year: string;
  primaryCtaName?: string;
}

export interface IJob {
  role: string;
  company: string;
  period: string;
  details: string[];
}
