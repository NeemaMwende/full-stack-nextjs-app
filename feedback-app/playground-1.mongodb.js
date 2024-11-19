
// // Select the database to use.
// use('Feedback');

// // Insert a few documents into the users collection.
// db.getCollection('users').insertMany([
//   {
//     _id: { $oid: "673b53ae2d3d3a2f7c5fd89c" },
//     username: "neema",
//     email: "neema@example.com",
//     password: "$2b$10$hashedpassword1",
//     verifyCode: "123456",
//     verifyCodeExpiry: new Date("2024-11-20T10:00:00Z"),
//     isAcceptingMessage: true,
//     isVerified: false,
//     messages: [
//       {
//         content: "Hello, welcome to Feedback!",
//         createdAt: new Date("2024-11-18T08:30:00Z"),
//       }
//     ],
//   },
//   {
//     _id: { $oid: "673b53ae2d3d3a2f7c5fd89d" },
//     username: "john_doe",
//     email: "john.doe@example.com",
//     password: "$2b$10$hashedpassword2",
//     verifyCode: "654321",
//     verifyCodeExpiry: new Date("2024-11-25T12:00:00Z"),
//     isAcceptingMessage: false,
//     isVerified: true,
//     messages: [
//       {
//         content: "I am enjoying using Feedback!",
//         createdAt: new Date("2024-11-17T09:00:00Z"),
//       },
//       {
//         content: "Thanks for the great service!",
//         createdAt: new Date("2024-11-18T10:00:00Z"),
//       }
//     ],
//   },
// ]);

// // Print a message to the output window.
// console.log("Two user documents have been inserted into the 'users' collection.");
