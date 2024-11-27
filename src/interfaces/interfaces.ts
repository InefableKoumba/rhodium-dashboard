export interface EventResponseInterface {
  id: number;
  attributes: {
    title: string;
    description: string;
    date_start: string;
    date_end: string;
    isPrivate: boolean;
    likes: number;
    time_start: string;
    time_end: string;
    contact_phone_number: string;
    location_street: string;
    location_city: string;
    country: string;
    hasCost: boolean;
    isBoosted: boolean;
    isValidatedByAdmin: "VALIDATED" | "PENDING" | "REJECTED";
    scannerCode: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    hasCoupleOption?: boolean;
    images?: MediaResponse;
    videos?: MediaResponse;
    creator?: {
      data: {
        id: number;
        attributes: UserInterface;
      };
    };
    event_comments?: { data: any[] };
    event_categories?: { data: any[] };
    event_invitations?: { data: any[] };
    tickets_distribution?: { id: number };
    user_likes?: {
      data: {
        id: number;
        attributes: UserInterface;
      }[];
    };
    coverImage?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
    tickets_generated?: {
      data: TicketInterface[];
    };
    ImageEventInvitationCard?: { data: any };
  };
}

export interface MediaResponse {
  data?: MediaData[];
}

export interface MediaData {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    formats: {
      thumbnail?: MediaFormat;
      small?: MediaFormat;
      medium?: MediaFormat;
      large?: MediaFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface UserInterface {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  phone_number: string;
  firstname: string;
  lastname: string;
  birthdate: string | null;
  createdAt: string;
  updatedAt: string;
  referralCode: string;
  events?: EventResponseInterface[];
  event_comments?: { data: any[] };
  event_categories?: { data: any[] };
  emitted_event_invitations?: InvitationInterface[];
  received_event_invitations?: InvitationInterface[];
  eventTickets?: TicketInterface[];
  referred_users?: UserInterface[];
  referred_by?: UserInterface;
  avatar?: {
    url: string;
  };
}

export interface TicketInterface {
  id: number;
  attributes: {
    category: string;
    code: string;
    isScanned: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

interface InvitationInterface {
  id: number;
  state: "ACCEPTED" | "PENDING" | "REJECTED"; // Add other possible states if applicable
  is_read_by_user_receiver: boolean;
  createdAt: string; // Use `Date` if you want to work with Date objects
  updatedAt: string; // Use `Date` if you want to work with Date objects
  code: string;
  isScanned: boolean;
}
