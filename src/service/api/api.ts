import { API_URL } from "@/constants/constants";
import {
  Admin,
  CreditPurchase,
  EventCategory,
  Ticket,
  TicketType,
  CreateUserInput,
  UpdateAdminInput,
  UpdateEventInput,
  UpdateUserInput,
  User,
  CreateTicketTypeInput,
  UpdateTicketTypeInput,
  CreateTicketInput,
  UpdateTicketInput,
  CreateCategoryInput,
  UpdateCategoryInput,
  CreateInvitationInput,
  UpdateInvitationInput,
  CreateCreditPackInput,
  UpdateCreditPackInput,
  CreateCreditPurchaseInput,
  UpdateCreditPurchaseInput,
  CreateAdminInput,
  Invitation,
  CreditPack,
  CreateAdvertisementInput,
  Advertisement,
  UpdateAdvertisementInput,
} from "@/types/types";
import { getSession } from "next-auth/react";

async function getAuthHeaders() {
  const session = await getSession();
  console.log(session);
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.user?.accessToken}`,
  };
}

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

export async function approveEvent(eventId: string): Promise<boolean> {
  const response = await fetch(`${API_URL}/events/approve`, {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify({
      eventId,
    }),
  });
  return response.ok;
}
export async function rejectEvent(
  eventId: string,
  reason: string
): Promise<Event> {
  const response = await fetch(`${API_URL}/events/reject`, {
    method: "PUT",
    headers: await getAuthHeaders(),
    body: JSON.stringify({ reason, eventId }),
  });
  return response.json();
}

export async function deleteEvent(id: string): Promise<void> {
  await fetch(`${API_URL}/events/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
}

// TicketType Actions
export async function createTicketType(
  eventId: string,
  data: CreateTicketTypeInput
): Promise<boolean> {
  const response = await fetch(`${API_URL}/events/${eventId}/ticket-types`, {
    method: "POST",
    headers: await getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return response.ok;
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

// Category Actions
export async function createCategory(
  data: CreateCategoryInput
): Promise<EventCategory> {
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
): Promise<EventCategory> {
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
