export type ProposalStatus =
  | "Draft"
  | "Sent"
  | "Accepted"
  | "Rejected";

export type TimelineUnit =
  | "days"
  | "weeks"
  | "months";

export interface ProposalTimeline {
  duration: number;
  unit: TimelineUnit;
}

export interface ProposalPricing {
  currency: string;
  total: number;
}

export interface ProposalMilestone {
  name: string;
  description: string;
  duration: string;
}

export interface Proposal {
  id: string;
  userId: string;
  clientId?: string;

  title: string;

  status: ProposalStatus;

  projectDescription: string;

  projectSummary?: string;

  requirements: string[];

  technologies: string[];

  scopeOfWork: string[];

  deliverables: string[];

  milestones?: ProposalMilestone[];

  assumptions: string[];

  outOfScope: string[];

  timeline: ProposalTimeline;

  pricing: ProposalPricing;

  createdAt: string;
  updatedAt: string;
}

export interface CreateProposalRequest {
  title: string;

  clientId?: string;

  projectDescription: string;

  requirements: string[];

  technologies: string[];

  scopeOfWork?: string[];

  deliverables?: string[];

  assumptions?: string[];

  outOfScope?: string[];

  timeline: number;

  timelineUnit: TimelineUnit;

  currency: string;

  budget?: number;
}

export interface UpdateProposalRequest {
  title?: string;

  clientId?: string;

  projectDescription?: string;

  requirements?: string[];

  technologies?: string[];

  scopeOfWork?: string[];

  deliverables?: string[];

  milestones?: ProposalMilestone[];

  assumptions?: string[];

  outOfScope?: string[];

  timeline?: number;

  timelineUnit?: TimelineUnit;

  currency?: string;

  budget?: number;

  status?: ProposalStatus;
}