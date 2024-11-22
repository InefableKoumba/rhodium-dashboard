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
    hasCoupleOption: any; // Replace with appropriate type if known
    images: MediaResponse;
    videos: MediaResponse;
    creator: {
      data: {
        id: number;
        attributes: CreatorAttributes;
      };
    };
    event_comments: { data: any[] }; // Replace with appropriate type if known
    event_categories: { data: any[] }; // Replace with appropriate type if known
    event_invitations: { data: any[] }; // Replace with appropriate type if known
    tickets_distribution: { id: number };
    user_likes: {
      data: {
        id: number;
        attributes: CreatorAttributes;
      }[];
    };
    coverImage?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
    tickets_generated: {
      data: TicketResponse[];
    };
    ImageEventInvitationCard: { data: any }; // Replace with appropriate type if known
  };
}

export interface MediaResponse {
  data: MediaData[];
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
    provider_metadata: any | null; // Replace with appropriate type if known
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

export interface CreatorAttributes {
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
}

export interface TicketResponse {
  id: number;
  attributes: {
    category: string;
    code: string;
    isScanned: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
