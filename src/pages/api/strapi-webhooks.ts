import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

type ResponseData = {
  message: string;
};

const cors = Cors({
  methods: ["POST", "GET", "HEAD", "GET", "PUT"],
  origin: "*",
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await runMiddleware(req, res, cors);
  if (req.method === "POST") {
    const body = req.body;
    const models = [
      "event",
      "transaction",
      "event-invitation",
      "ticket",
      "order",
    ];
    if (body.event === "entry.create") {
    } else if (body.event === "entry.update") {
    } else if (body.event === "entry.delete") {
    } else if (body.event === "entry.publish") {
    } else if (body.event === "entry.unpublish") {
    }
    res.status(200).json({ message: "POST" });
  }
}

// {
//   event: 'entry.update',
//   createdAt: '2024-12-25T12:39:23.426Z',
//   model: 'invitation-product',
//   uid: 'api::invitation-product.invitation-product',
//   entry: {
//     id: 1,
//     createdAt: '2024-12-03T16:31:18.501Z',
//     updatedAt: '2024-12-25T12:39:23.411Z',
//     offers: [ [Object], [Object] ]
//   }
// }

// {
//   event: 'entry.update',
//   createdAt: '2024-12-25T12:38:08.648Z',
//   model: 'news-letter',
//   uid: 'api::news-letter.news-letter',
//   entry: {
//     id: 1,
//     createdAt: '2024-09-12T11:43:24.684Z',
//     updatedAt: '2024-12-25T12:38:08.633Z',
//     articles: [ [Object], [Object], [Object], [Object] ]
//   }
// }

// {
//   event: 'entry.update',
//   createdAt: '2024-12-25T12:36:47.681Z',
//   model: 'user',
//   uid: 'plugin::users-permissions.user',
//   entry: {
//     id: 3,
//     username: 'Franz',
//     email: 'franz.ossete@gmail.com',
//     provider: 'local',
//     confirmed: true,
//     blocked: false,
//     phone_number: '+242067248419',
//     firstname: 'Franz ',
//     lastname: 'Ossete',
//     birthdate: null,
//     createdAt: '2024-09-16T06:30:52.149Z',
//     updatedAt: '2024-12-25T12:36:47.655Z',
//     referralCode: 'FO4643',
//     invitation_credit: 0,
//     role: { count: 1 },
//     otp: { id: 273, expires_at: '2024-12-16T09:31:06.365Z', code: '4433' },
//     events: { count: 3 },
//     transactions: { count: 13 },
//     event_comments: { count: 0 },
//     avatar: {
//       id: 13,
//       name: '1726468347662764.png',
//       alternativeText: null,
//       caption: null,
//       width: 1290,
//       height: 2294,
//       formats: [Object],
//       hash: '1726468347662764_53f62f7e93',
//       ext: '.png',
//       mime: 'image/png',
//       size: 99.37,
//       url: '/uploads/1726468347662764_53f62f7e93.png',
//       previewUrl: null,
//       provider: 'local',
//       provider_metadata: null,
//       createdAt: '2024-09-16T06:32:31.319Z',
//       updatedAt: '2024-09-16T06:32:31.319Z'
//     },
//     emitted_event_invitations: { count: 14 },
//     received_event_invitations: { count: 4 },
//     liked_events: { count: 6 },
//     eventTickets: { count: 10 },
//     referred_users: { count: 1 },
//     referred_by: { count: 0 },
//     tables: { count: 1 },
//     transfers_emitted: { count: 0 },
//     transfers_received: { count: 0 },
//     wallets: { count: 1 },
//     orders: { count: 3 }
//   }
// }

// {
//   event: 'entry.update',
//   createdAt: '2024-12-25T12:35:29.402Z',
//   model: 'transaction',
//   uid: 'api::transaction.transaction',
//   entry: {
//     id: 26,
//     currency: 'XAF',
//     external_id: '9b273afa-f72d-4328-98d9-1b18b6e28e8c',
//     payer: { partyIdType: 'MSISDN', partyId: '242066632801' },
//     payer_message: 'Buy for tickets',
//     payee_note: 'payeeNote',
//     amount: '100',
//     createdAt: '2024-10-08T13:46:20.881Z',
//     updatedAt: '2024-12-25T12:35:29.395Z',
//     status: 'SUCCESSFUL',
//     financialTransactionId: '5122721805',
//     operation: null,
//     paymentService: null,
//     payload: null,
//     users_permissions_user: { count: 1 },
//     tickets: { count: 1 }
//   }
// }

// {
//   event: 'entry.update',
//   createdAt: '2024-12-25T12:33:54.482Z',
//   model: 'table',
//   uid: 'api::table.table',
//   entry: {
//     id: 39,
//     name: 'Table 4',
//     createdAt: '2024-12-16T12:49:09.065Z',
//     updatedAt: '2024-12-25T12:33:54.471Z',
//     users: { count: 1 },
//     event: { count: 1 }
//   }
// }

// {
//   event: 'entry.update',
//   createdAt: '2024-12-25T12:32:31.737Z',
//   model: 'order',
//   uid: 'api::order.order',
//   entry: {
//     id: 118,
//     operationAction: 'PURCHASE_TICKET',
//     paymentService: 'MOBILE_MONEY',
//     transaction: {
//       amount: '10',
//       currency: 'XAF',
//       externalId: '703ac2c4-5e95-4f36-8745-4ac059e4c8a5',
//       payer: [Object],
//       payerMessage: '',
//       payeeNote: '',
//       status: 'SUCCESSFUL',
//       financialTransactionId: '5397258587'
//     },
//     product: {
//       eventId: '5',
//       ticketsStandard: 1,
//       ticketsVip: 0,
//       ticketsVvip: 0,
//       ticketsCustom: null
//     },
//     hasProductBeenDelivered: true,
//     status: 'SUCCESSFUL',
//     createdAt: '2024-12-19T10:31:03.534Z',
//     updatedAt: '2024-12-25T12:32:31.728Z',
//     payer: { count: 1 },
//     tickets: { count: 1 }
//   }
// }

// {
//   event: 'entry.update',
//   createdAt: '2024-12-25T12:28:53.856Z',
//   model: 'event-invitation',
//   uid: 'api::event-invitation.event-invitation',
//   entry: {
//     id: 241,
//     state: 'DECLINED',
//     is_read_by_user_receiver: false,
//     createdAt: '2024-12-16T09:28:30.543Z',
//     updatedAt: '2024-12-25T12:28:53.847Z',
//     code: '.fe16155f-f7aa-4ec3-b508-62a6b2206a92.',
//     isScanned: false,
//     event: { count: 1 },
//     user_emitter: { count: 1 },
//     user_receiver: { count: 1 },
//     tickets: { count: 0 }
//   }
// }

// {
//   event: 'entry.update',
//   createdAt: '2024-12-25T12:26:59.480Z',
//   model: 'ticket',
//   uid: 'api::ticket.ticket',
//   entry: {
//     id: 80,
//     category: 'GOLDEN',
//     code: '468b1ebb-dd4c-49aa-b405-4349478570b8',
//     isScanned: false,
//     createdAt: '2024-10-30T09:08:11.741Z',
//     updatedAt: '2024-12-25T12:26:59.469Z',
//     event: { count: 1 },
//     owner: { count: 1 },
//     event_invitation: { count: 0 },
//     transaction: { count: 1 },
//     order: { count: 0 }
//   }
// }

// {
//   event: 'entry.create',
//   createdAt: '2024-12-25T11:35:14.440Z',
//   model: 'event',
//   uid: 'api::event.event',
//   entry: {
//     id: 40,
//     title: 'test',
//     description: null,
//     date_start: null,
//     date_end: null,
//     isPrivate: true,
//     likes: 0,
//     time_start: null,
//     time_end: null,
//     contact_phone_number: null,
//     location_street: null,
//     location_city: null,
//     country: null,
//     hasCost: false,
//     isBoosted: false,
//     isValidatedByAdmin: 'VALIDATED',
//     scannerCode: '1650',
//     createdAt: '2024-12-25T11:35:14.409Z',
//     updatedAt: '2024-12-25T11:35:14.409Z',
//     publishedAt: null,
//     hasCoupleOption: null,
//     address: null,
//     images: null,
//     videos: null,
//     creator: { count: 0 },
//     event_comments: { count: 0 },
//     event_categories: { count: 0 },
//     event_invitations: { count: 0 },
//     tickets_distribution: null,
//     user_likes: { count: 0 },
//     coverImage: null,
//     tickets_generated: { count: 0 },
//     tables: { count: 0 },
//     ImageEventInvitationCard: null
//   }
// }
