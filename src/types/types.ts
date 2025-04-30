export enum EventStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum TicketStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}

export enum InvitationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}

export enum EventCategory {
  CONFERENCE = "CONFERENCE",
  WORKSHOP = "WORKSHOP",
  SEMINAR = "SEMINAR",
  CONCERT = "CONCERT",
  EXHIBITION = "EXHIBITION",
  FESTIVAL = "FESTIVAL",
  SPORTS = "SPORTS",
  NETWORKING = "NETWORKING",
  OTHER = "OTHER",
}

export enum CreditPurchaseStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export interface User {
  id: string;
  email: string;
  password: string;
  lastname: string;
  firstname: string;
  googleId?: string;
  avatar?: string;
  sponsorCode: string;
  sponsorId?: string;
  credits: number;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Admin {
  id: string;
  email: string;
  password: string;
  lastname: string;
  firstname: string;
  role: "ADMIN" | "SUPER_ADMIN";
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startsAt: Date;
  endsAt: Date;
  location: string;
  isPrivate: boolean;
  isFree: boolean;
  price?: number;
  capacity?: number;
  imageIds: string[];
  videoId?: string;
  status: EventStatus;
  rejectionReason?: string;
  approvedById?: string;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  organizerId: string;
  tickets?: Ticket[];
  invitations?: Invitation[];
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  maxQuantity: number;
  eventId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  ticketTypeId: string;
  status: TicketStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: EventCategory;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invitation {
  id: string;
  eventId: string;
  userId: string;
  status: InvitationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreditPurchase {
  id: string;
  userId: string;
  creditPackId: string;
  amount: number;
  currency: string;
  phoneNumber: string;
  status: CreditPurchaseStatus;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create types
export interface CreateUserInput {
  email: string;
  password: string;
  lastname: string;
  firstname: string;
  googleId?: string;
  avatar?: string;
  sponsorId?: string;
  phoneNumber?: string;
}

export interface CreateAdminInput {
  email: string;
  password: string;
  lastname: string;
  firstname: string;
  role?: "ADMIN" | "SUPER_ADMIN";
}

export interface CreateEventInput {
  title: string;
  description: string;
  startsAt: Date;
  endsAt: Date;
  location: string;
  isPrivate: boolean;
  isFree: boolean;
  price?: number;
  capacity?: number;
  imageIds?: string[];
  videoId?: string;
  organizerId: string;
}

export interface CreateTicketTypeInput {
  name: string;
  price: number;
  maxQuantity: number;
  eventId: string;
}

export interface CreateTicketInput {
  eventId: string;
  userId: string;
  ticketTypeId: string;
}

export interface CreateCategoryInput {
  name: EventCategory;
  description?: string;
}

export interface CreateInvitationInput {
  eventId: string;
  userId: string;
}

export interface CreateCreditPackInput {
  name: string;
  credits: number;
  price: number;
  currency?: string;
  isActive?: boolean;
}

export interface CreateCreditPurchaseInput {
  userId: string;
  creditPackId: string;
  amount: number;
  currency?: string;
  phoneNumber: string;
}

// Update types
export interface UpdateUserInput {
  email?: string;
  password?: string;
  lastname?: string;
  firstname?: string;
  googleId?: string;
  avatar?: string;
  sponsorId?: string;
  credits?: number;
  phoneNumber?: string;
}

export interface UpdateAdminInput {
  email?: string;
  password?: string;
  lastname?: string;
  firstname?: string;
  role?: "ADMIN" | "SUPER_ADMIN";
}

export interface UpdateEventInput {
  title?: string;
  description?: string;
  startsAt?: Date;
  endsAt?: Date;
  location?: string;
  isPrivate?: boolean;
  isFree?: boolean;
  price?: number;
  capacity?: number;
  imageIds?: string[];
  videoId?: string;
  status?: EventStatus;
  rejectionReason?: string;
  approvedById?: string;
  approvedAt?: Date;
}

export interface UpdateTicketTypeInput {
  name?: string;
  price?: number;
  maxQuantity?: number;
}

export interface UpdateTicketInput {
  status?: TicketStatus;
}

export interface UpdateCategoryInput {
  name?: EventCategory;
  description?: string;
}

export interface UpdateInvitationInput {
  status: InvitationStatus;
}

export interface UpdateCreditPackInput {
  name?: string;
  credits?: number;
  price?: number;
  currency?: string;
  isActive?: boolean;
}

export interface UpdateCreditPurchaseInput {
  status: CreditPurchaseStatus;
  paymentId?: string;
}
