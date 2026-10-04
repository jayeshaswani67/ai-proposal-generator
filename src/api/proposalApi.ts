import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

export interface CreateProposalRequest {
  title: string;
  clientName: string;
  clientEmail: string;
  requirements: string;
  budget: number;
  currency: string;
  timeline: number;
  timelineUnit: string;
  technologies: string[];
}

export interface Proposal {
  id: string;
  title: string;
  clientName: string;
  clientEmail: string;
  requirements: string;
  budget: number;
  currency: string;
  timeline: number;
  timelineUnit: string;
  technologies: string[];
  status: string;
  createdAt: string;
}

// POST /api/proposals
export const createProposal = async (
  data: CreateProposalRequest
): Promise<Proposal> => {
  const response = await axios.post<Proposal>(
    `${API_URL}/proposals`,
    data
  );

  return response.data;
};

// GET /api/proposals/{id}
export const getProposal = async (
  id: string
): Promise<Proposal> => {
  const response = await axios.get<Proposal>(
    `${API_URL}/proposals/${id}`
  );

  return response.data;
};