"use server";
import {
  User,
  Admin,
  Event,
  TicketType,
  Ticket,
  Category,
  Invitation,
  CreditPack,
  CreditPurchase,
  CreateUserInput,
  CreateAdminInput,
  CreateEventInput,
  CreateTicketTypeInput,
  CreateTicketInput,
  CreateCategoryInput,
  CreateInvitationInput,
  CreateCreditPackInput,
  CreateCreditPurchaseInput,
  UpdateUserInput,
  UpdateAdminInput,
  UpdateEventInput,
  UpdateTicketTypeInput,
  UpdateTicketInput,
  UpdateCategoryInput,
  UpdateInvitationInput,
  UpdateCreditPackInput,
  UpdateCreditPurchaseInput,
  CreateAdvertisementInput,
  UpdateAdvertisementInput,
  Advertisement,
} from "@/types/types";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

const API_URL = process.env.API_URL;

async function getAuthHeaders() {
  const session = await getServerSession(authOptions);
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.user?.accessToken}`,
  };
}

// User Actions
export async function createUser(data: CreateUserInput): Promise<User> {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateUser(
  id: string,
  data: UpdateUserInput
): Promise<User> {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteUser(id: string): Promise<void> {
  await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
}

export async function getUsers(): Promise<{ users: User[]; total: number }> {
  const response = await fetch(`${API_URL}/users`, {
    headers: await getAuthHeaders(),
  });
  const data = await response.json();
  console.log("data", data);
  return data;
}

export async function getUser(id: string): Promise<User> {
  const response = await fetch(`${API_URL}/users/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

// Admin Actions
export async function getAdmins(): Promise<{ admins: Admin[]; total: number }> {
  const response = await fetch(`${API_URL}/admins`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

export async function createAdmin(data: CreateAdminInput): Promise<Admin> {
  const response = await fetch(`${API_URL}/admins`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateAdmin(
  id: string,
  data: UpdateAdminInput
): Promise<Admin> {
  const response = await fetch(`${API_URL}/admins/${id}`, {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteAdmin(id: string): Promise<void> {
  await fetch(`${API_URL}/admins/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
}

export async function getAdmin(id: string): Promise<Admin> {
  const response = await fetch(`${API_URL}/admins/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

// Event Actions
export async function getEvents(): Promise<{ events: Event[]; total: number }> {
  const response = await fetch(`${API_URL}/events`, {
    headers: await getAuthHeaders(),
  });
  return await response.json();
}

export async function createEvent(data: CreateEventInput): Promise<Event> {
  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateEvent(
  id: string,
  data: UpdateEventInput
): Promise<Event> {
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteEvent(id: string): Promise<void> {
  await fetch(`${API_URL}/events/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
}

export async function getEvent(id: string): Promise<Event> {
  const response = await fetch(`${API_URL}/events/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

// TicketType Actions
export async function createTicketType(
  data: CreateTicketTypeInput
): Promise<TicketType> {
  const response = await fetch(`${API_URL}/ticket-types`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateTicketType(
  id: string,
  data: UpdateTicketTypeInput
): Promise<TicketType> {
  const response = await fetch(`${API_URL}/ticket-types/${id}`, {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteTicketType(id: string): Promise<void> {
  await fetch(`${API_URL}/ticket-types/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
}

export async function getTicketType(id: string): Promise<TicketType> {
  const response = await fetch(`${API_URL}/ticket-types/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

// Ticket Actions
export async function createTicket(data: CreateTicketInput): Promise<Ticket> {
  const response = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateTicket(
  id: string,
  data: UpdateTicketInput
): Promise<Ticket> {
  const response = await fetch(`${API_URL}/tickets/${id}`, {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteTicket(id: string): Promise<void> {
  await fetch(`${API_URL}/tickets/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
}

export async function getTicket(id: string): Promise<Ticket> {
  const response = await fetch(`${API_URL}/tickets/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

// Category Actions
export async function createCategory(
  data: CreateCategoryInput
): Promise<Category> {
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateCategory(
  id: string,
  data: UpdateCategoryInput
): Promise<Category> {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteCategory(id: string): Promise<void> {
  await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
}

export async function getCategory(id: string): Promise<Category> {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

// Invitation Actions
export async function createInvitation(
  data: CreateInvitationInput
): Promise<Invitation> {
  const response = await fetch(`${API_URL}/invitations`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateInvitation(
  id: string,
  data: UpdateInvitationInput
): Promise<Invitation> {
  const response = await fetch(`${API_URL}/invitations/${id}`, {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteInvitation(id: string): Promise<void> {
  await fetch(`${API_URL}/invitations/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
}

export async function getInvitation(id: string): Promise<Invitation> {
  const response = await fetch(`${API_URL}/invitations/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

// CreditPack Actions
export async function createCreditPack(
  data: CreateCreditPackInput
): Promise<CreditPack> {
  const response = await fetch(`${API_URL}/credit-packs`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateCreditPack(
  id: string,
  data: UpdateCreditPackInput
): Promise<CreditPack> {
  const response = await fetch(`${API_URL}/credit-packs/${id}`, {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteCreditPack(id: string): Promise<void> {
  await fetch(`${API_URL}/credit-packs/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
}

export async function getCreditPack(id: string): Promise<CreditPack> {
  const response = await fetch(`${API_URL}/credit-packs/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

// CreditPurchase Actions
export async function createCreditPurchase(
  data: CreateCreditPurchaseInput
): Promise<CreditPurchase> {
  const response = await fetch(`${API_URL}/credit-purchases`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateCreditPurchase(
  id: string,
  data: UpdateCreditPurchaseInput
): Promise<CreditPurchase> {
  const response = await fetch(`${API_URL}/credit-purchases/${id}`, {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteCreditPurchase(id: string): Promise<void> {
  await fetch(`${API_URL}/credit-purchases/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
}

export async function getCreditPurchase(id: string): Promise<CreditPurchase> {
  const response = await fetch(`${API_URL}/credit-purchases/${id}`, {
    headers: await getAuthHeaders(),
  });
  return response.json();
}

// Advertisement Actions
export async function createAdvertisement(
  data: CreateAdvertisementInput
): Promise<Advertisement> {
  const response = await fetch(`${API_URL}/advertisements`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateAdvertisement(
  id: string,
  data: UpdateAdvertisementInput
): Promise<Advertisement> {
  const response = await fetch(`${API_URL}/advertisements/${id}`, {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteAdvertisement(id: string): Promise<void> {
  await fetch(`${API_URL}/advertisements/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
}

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
