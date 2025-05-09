"use server";
import {
  User,
  Admin,
  Event,
  TicketType,
  Ticket,
  Invitation,
  CreditPack,
  CreditPurchase,
  CreateEventInput,
  Advertisement,
  EventCategory,
  Sponsorship,
} from "@/types/types";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { API_URL } from "@/constants/constants";

async function getAuthHeaders() {
  const session = await getServerSession(authOptions);
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.user?.accessToken}`,
  };
}

export async function getPresignedUrl({
  key,
  contentType,
}: {
  key: string;
  contentType: string;
}): Promise<string> {
  const response = await fetch(`${API_URL}/uploads/presigned-url`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify({ key, contentType }),
  });
  const data = await response.json();
  return data;
}

export async function getSponsorships(): Promise<{
  sponsorships: Sponsorship[];
  total: number;
}> {
  const response = await fetch(`${API_URL}/sponsorships`, {
    headers: await getAuthHeaders(),
  });
  const responseData = await response.json();
  return responseData.data;
}

// User Actions
export async function getUsers(): Promise<{ users: User[]; total: number }> {
  const response = await fetch(`${API_URL}/users`, {
    headers: await getAuthHeaders(),
  });
  const responseData = await response.json();

  return responseData.data;
}

export async function getUser(id: string): Promise<User> {
  const response = await fetch(`${API_URL}/users/${id}`, {
    headers: await getAuthHeaders(),
  });
  const responseData = await response.json();
  return responseData.data;
}

// Admin Actions
export async function getAdmins(): Promise<{ admins: Admin[]; total: number }> {
  const response = await fetch(`${API_URL}/admins`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

export async function getAdmin(id: string): Promise<Admin> {
  const response = await fetch(`${API_URL}/admins/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

// Event Actions
export async function getEvents({
  organizerId,
}: {
  organizerId?: string;
}): Promise<{
  events: Event[];
  total: number;
}> {
  const response = await fetch(`${API_URL}/events?organizerId=${organizerId}`, {
    headers: await getAuthHeaders(),
  });
  const data = await response.json();

  return data;
}

export async function createEvent(data: CreateEventInput): Promise<boolean> {
  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });

  return response.ok;
}

export async function getEvent(id: string): Promise<Event> {
  const response = await fetch(`${API_URL}/events/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

export async function getTicketType(id: string): Promise<TicketType> {
  const response = await fetch(`${API_URL}/ticket-types/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

export async function getTicket(id: string): Promise<Ticket> {
  const response = await fetch(`${API_URL}/tickets/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

export async function getCategory(id: string): Promise<EventCategory> {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

export async function getInvitation(id: string): Promise<Invitation> {
  const response = await fetch(`${API_URL}/invitations/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

export async function getCreditPack(id: string): Promise<CreditPack> {
  const response = await fetch(`${API_URL}/credit-packs/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

export async function getCreditPurchase(id: string): Promise<CreditPurchase> {
  const response = await fetch(`${API_URL}/credit-purchases/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

// Advertisement Actions

export async function getAdvertisement(id: string): Promise<Advertisement> {
  const response = await fetch(`${API_URL}/advertisements/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

export async function getAdvertisements(): Promise<{
  advertisements: Advertisement[];
  total: number;
}> {
  const response = await fetch(`${API_URL}/advertisements`, {
    headers: await getAuthHeaders(),
  });
  const data = await response.json();
  return data;
}
