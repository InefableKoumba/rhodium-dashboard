// import { db } from "@/lib/db";
// import { whatsappMessages } from "@/lib/db/schema";

// async function main() {
//   // 1. Load messages
//   const messages = await db.select().from(whatsappMessages);

//   const validMessages = messages.filter((m) => m.type === "interactive");

//   // 2. Extract survey answers
//   type SurveyAnswer = Record<string, string | string[]>;
//   const surveyResults: SurveyAnswer[] = [];

//   for (const message of validMessages) {
//     try {
//       const parsed = JSON.parse(message.content);

//       if (
//         parsed.interactive &&
//         parsed.interactive.nfm_reply &&
//         parsed.interactive.nfm_reply.response_json
//       ) {
//         const answers = JSON.parse(parsed.interactive.nfm_reply.response_json);
//         surveyResults.push(answers);
//       }
//     } catch (error) {
//       console.error("Failed to parse message content:", message.content, error);
//     }
//   }

//   // 3. Aggregate counts with enhanced stats
//   type SurveyAggregates = Record<
//     string,
//     {
//       totalRespondents: number;
//       options: Record<string, number>;
//     }
//   >;

//   function aggregateSurveyResults(results: SurveyAnswer[]): SurveyAggregates {
//     const aggregates: SurveyAggregates = {};

//     for (const ans of results) {
//       for (const [question, value] of Object.entries(ans)) {
//         if (question === "flow_token") continue;

//         if (!aggregates[question]) {
//           aggregates[question] = {
//             totalRespondents: 0,
//             options: {},
//           };
//         }

//         // Increment total respondents for this question
//         aggregates[question].totalRespondents += 1;

//         // Aggregate counts for each option
//         if (Array.isArray(value)) {
//           for (const v of value) {
//             aggregates[question].options[v] =
//               (aggregates[question].options[v] || 0) + 1;
//           }
//         } else if (value) {
//           aggregates[question].options[value] =
//             (aggregates[question].options[value] || 0) + 1;
//         }
//       }
//     }

//     return aggregates;
//   }

//   const aggregates = aggregateSurveyResults(surveyResults);

//   // 4. Flow definition (shortened to essentials, paste your full JSON here)
//   const flow = {
//     screens: [
//       {
//         id: "screen_wdgsqn",
//         title: "A propos de Rhodium (1/3)",
//         question: "Choisissez les bonnes réponses",
//         options: [
//           {
//             id: "0_Application_d’événements",
//             title: "Application d’événements",
//           },
//           {
//             id: "1_Invitations_100%_numériques",
//             title: "Invitations 100% numériques",
//           },
//           {
//             id: "2_Location_de_voitures_de_luxe",
//             title: "Location de voitures de luxe",
//           },
//           {
//             id: "3_Disponible_uniquement_Android",
//             title: "Disponible uniquement Android",
//           },
//           {
//             id: "4_Vente_de_vêtements_en_ligne",
//             title: "Vente de vêtements en ligne",
//           },
//           {
//             id: "5_Réservation_billets_en_ligne",
//             title: "Réservation billets en ligne",
//           },
//           {
//             id: "6_Paiement_via_Airtel_ou_MTN",
//             title: "Paiement via Airtel ou MTN",
//           },
//           {
//             id: "7_Pas_besoin_d’imprimer_billets",
//             title: "Pas besoin d’imprimer billets",
//           },
//           {
//             id: "8_Appli_pour_trouver_un_emploi",
//             title: "Appli pour trouver un emploi",
//           },
//         ],
//         key: "screen_0_Choisissez_les_bonnes_rponses_0",
//       },
//       {
//         id: "QUESTION_ONE",
//         title: "Fonctionnalité préférée (2/3)",
//         question: "Choisissez une réponse",
//         options: [
//           { id: "0_Réservation_en_ligne", title: "Réservation en ligne" },
//           { id: "1_Création_d’événements", title: "Création d’événements" },
//           { id: "2_Invitations_numériques", title: "Invitations numériques" },
//           { id: "3_Découverte_d'évènements", title: "Découverte d'évènements" },
//           { id: "4_Commentaires", title: "Commentaires" },
//           { id: "5_Recherche_&_Filtre", title: "Recherche & Filtre" },
//         ],
//         key: "screen_1_Choisissez_une_rponse_0",
//       },
//       {
//         id: "screen_crngap",
//         title: "Suggestions (3/3)",
//         question: "Des suggestions?",
//         options: [], // free text
//         key: "screen_2_Des_suggestions_0",
//       },
//     ],
//   };

//   // 5. Merge aggregates with flow options and calculate percentages
//   function mergeResults(flow: typeof flow, aggregates: SurveyAggregates) {
//     const totalSurveyRespondents = surveyResults.length;

//     return flow.screens.map((screen) => {
//       const questionAggregates = aggregates[screen.key];
//       const totalQuestionRespondents = questionAggregates
//         ? questionAggregates.totalRespondents
//         : 0;
//       const counts = questionAggregates ? questionAggregates.options : {};

//       const mergedData = {
//         question: screen.question,
//         type: screen.options.length > 0 ? "choice" : "text",
//         totalRespondents: totalQuestionRespondents,
//         totalSurveyRespondents: totalSurveyRespondents,
//         percentageOfSurveyRespondents:
//           totalSurveyRespondents > 0
//             ? (totalQuestionRespondents / totalSurveyRespondents) * 100
//             : 0,
//       };

//       if (screen.options.length > 0) {
//         // For choice questions, calculate percentages for each option
//         return {
//           ...mergedData,
//           results: screen.options.map((opt) => {
//             const count = counts[opt.id] || 0;
//             return {
//               id: opt.id,
//               label: opt.title,
//               count: count,
//               percentage:
//                 totalQuestionRespondents > 0
//                   ? (count / totalQuestionRespondents) * 100
//                   : 0,
//             };
//           }),
//         };
//       } else {
//         // For free-text questions, just provide the raw counts
//         return {
//           ...mergedData,
//           results: counts,
//         };
//       }
//     });
//   }

//   const surveyStats = mergeResults(flow, aggregates);

//   console.dir(surveyStats, { depth: null });
// }

// main();
