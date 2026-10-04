export interface Client {
  id: string;
  userId: string;

  name: string;
  email: string;

  company?: string;

  phone?: string;

  website?: string;

  address?: string;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateClientRequest {
  name: string;
  email: string;

  company?: string;

  phone?: string;

  website?: string;

  address?: string;

  notes?: string;
}

export interface UpdateClientRequest {
  name?: string;
  email?: string;

  company?: string;

  phone?: string;

  website?: string;

  address?: string;

  notes?: string;
}