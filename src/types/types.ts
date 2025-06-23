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
  TECHNOLOGY = "TECHNOLOGY",
  RELIGION = "RELIGION",
  POLITICAL = "POLITICAL",
  PHILOSOPHY = "PHILOSOPHY",
  LITERATURE = "LITERATURE",
  ART = "ART",
  MUSIC = "MUSIC",
  OTHER = "OTHER",
}

export const EventCategoryLabels: Record<EventCategory, string> = {
  [EventCategory.CONFERENCE]: "Conférence",
  [EventCategory.WORKSHOP]: "Atelier",
  [EventCategory.SEMINAR]: "Séminaire",
  [EventCategory.CONCERT]: "Concert",
  [EventCategory.EXHIBITION]: "Exposition",
  [EventCategory.FESTIVAL]: "Festival",
  [EventCategory.SPORTS]: "Sports",
  [EventCategory.NETWORKING]: "Networking",
  [EventCategory.TECHNOLOGY]: "Technologie",
  [EventCategory.RELIGION]: "Religion",
  [EventCategory.POLITICAL]: "Politique",
  [EventCategory.PHILOSOPHY]: "Philosophie",
  [EventCategory.LITERATURE]: "Littérature",
  [EventCategory.ART]: "Art",
  [EventCategory.MUSIC]: "Musique",
  [EventCategory.OTHER]: "Autre",
};

export enum CreditPurchaseStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  sponsorshipCode?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  isBlocked?: boolean;
  role?: "USER" | "COMMERCIAL";
  credits?: number;
  tickets?: Ticket[];
  godsons?: User[];
  sponsor?: {
    id: string;
    name: string;
  };
}

export enum SponsorshipStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  REJECTED = "REJECTED",
}

export interface Sponsorship {
  id: string;
  sponsorId: string;
  price: number;
  sponsor: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    phoneNumber?: string;
    role: "USER" | "COMMERCIAL";
    sponsorshipCode: string;
  };
  godsonId: string;
  godson: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    phoneNumber?: string;
    role: "USER" | "COMMERCIAL";
  };
  status: SponsorshipStatus;
  rejectionReason?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Admin {
  id: string;
  email: string;
  lastname: string;
  firstname: string;
  role: "ADMIN" | "SUPER_ADMIN";
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startsAt: Date;
  endsAt: Date;
  city: string;
  location: string;
  scanCode: string;
  isPrivate: boolean;
  isFree: boolean;
  coverImageId?: string;
  imageIds: string[];
  videoId?: string;
  status: EventStatus;
  rejectionReason?: string;
  approvedById?: string;
  approvedAt?: Date;
  createdAt: Date;
  categories: EventCategory[];
  updatedAt?: Date;
  organizerId: string;
  tickets?: Ticket[];
  ticketTypes?: TicketType[];
  invitations?: Invitation[];
  organizer?: User;
  approvedBy?: {
    firstname: string;
    lastname: string;
  };
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  maxQuantity: number;
  eventId: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  ticketTypeId: string;
  ticketType?: TicketType;
  status: TicketStatus;
  event?: {
    id: string;
    title: string;
    coverImageId?: string;
  };
  createdAt: Date;
  updatedAt?: Date;
}

export interface Invitation {
  id: string;
  eventId: string;
  userId: string;
  status: InvitationStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreditPurchase {
  id: string;
  buyer: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    phoneNumber?: string;
  };
  creditPack: {
    id: string;
    name: string;
    credits: number;
    price: number;
  };
  phoneNumber: string;
  status: CreditPurchaseStatus;
  paymentId?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Advertisement {
  id: string;
  title: string;
  imageId?: string;
  videoId?: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt?: Date;
  expiresAt: Date;
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
  coverImageId?: string;
  categories: string[];
  imageIds?: string[];
  videoId?: string;
  ticketTypes?: CreateTicketTypeInput[];
}

export interface CreateTicketTypeInput {
  name: string;
  price: number;
  maxQuantity: number;
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
  isActive?: boolean;
}

export interface CreateCreditPurchaseInput {
  userId: string;
  creditPackId: string;
  amount: number;
  currency?: string;
  phoneNumber: string;
}

export interface CreateAdvertisementInput {
  imageId?: string;
  videoId?: string;
  content?: string;
  title: string;
  expiresAt: Date;
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
  isBlocked?: boolean;
  role?: string;
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
  coverImageId?: string;
  categories?: string[];
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
  isActive?: boolean;
}

export interface UpdateCreditPurchaseInput {
  status: CreditPurchaseStatus;
  paymentId?: string;
}

export interface UpdateAdvertisementInput {
  title?: string;
  expiresAt?: Date;
  content?: string;
  published?: boolean;
}
