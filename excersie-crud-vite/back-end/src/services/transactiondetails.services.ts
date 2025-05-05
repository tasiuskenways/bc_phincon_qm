// import { PrismaClient } from "@prisma/client";
// import { ProductTransaction } from "../types/product.type";

// const prisma = new PrismaClient();

// class TransactionDetailsServices {
//   async getTransactionDetailsByTransactionId(transactionId: string) {
//     try {
//       const transactionDetails = await prisma.transactionDetail.findMany({
//         where: { transactionId },
//         select: {
//           id: true,
//           transaction: {
//             select: {
//               id: true,
//               totalPrice: true,
//               cashier: {
//                 select: {
//                   id: true,
//                   username: true,
//                 },
//               },
//             },
//           },
//         },
//       });

//       if (condition) {

//       }

//       return transactionDetails;
//     } catch (error: any) {
//       throw new Error("Failed to get transaction details by transaction id");
//     }
//   }

//   async createTransactionDetail(
//     transactionId: string,
//     product: ProductTransaction[]
//   ) {
//     try {
//       const transactionDetail = await prisma.transactionDetail.create({
//         data: {
//           transactionId,
//           product: JSON.stringify(product),
//         },
//       });
//       return transactionDetail;
//     } catch (error: any) {
//       throw new Error("Failed to create transaction detail");
//     }
//   }
// }

// export default new TransactionDetailsServices();
