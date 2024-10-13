import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

// Function to generate a random URL
function generateRandomBookURL() {
  const randomNumber = Math.floor(Math.random() * 100000);
  return `https://example.com/book/${randomNumber}`;
}

async function main() {
  // Seed authors
  const authors = await prisma.$transaction([
    prisma.author.create({
      data: { authorname: "J.K. Rowling", authoremail: "author1@example.com", authorpassword: "author1" },
    }),
    prisma.author.create({
      data: { authorname: "George R.R. Martin", authoremail: "author2@example.com", authorpassword: "author2" },
    }),
    prisma.author.create({
      data: { authorname: "J.R.R. Tolkien", authoremail: "author3@example.com", authorpassword: "author3" },
    }),
    prisma.author.create({
      data: { authorname: "Agatha Christie", authoremail: "author4@example.com", authorpassword: "author4" },
    }),
    prisma.author.create({
      data: { authorname: "Stephen King", authoremail: "author5@example.com", authorpassword: "author5" },
    }),
  ]);

  // Seed users
  const users = await prisma.$transaction([
    prisma.user.create({
      data: { fullname: "John Doe", email: "user1@example.com", password: "user1" },
    }),
    prisma.user.create({
      data: { fullname: "Jane Smith", email: "user2@example.com", password: "user2" },
    }),
    prisma.user.create({
      data: { fullname: "Alice Johnson", email: "user3@example.com", password: "user3" },
    }),
    prisma.user.create({
      data: { fullname: "Bob Lee", email: "user4@example.com", password: "user4" },
    }),
    prisma.user.create({
      data: { fullname: "Charlie Brown", email: "user5@example.com", password: "user5" },
    }),
  ]);

  // Seed books (5 books per author)
  let books = [];
  const bookTitles = [
    "Book 1", "Book 2", "Book 3", "Book 4", "Book 5",
    "Book 6", "Book 7", "Book 8", "Book 9", "Book 10",
    "Book 11", "Book 12", "Book 13", "Book 14", "Book 15",
    "Book 16", "Book 17", "Book 18", "Book 19", "Book 20",
    "Book 21", "Book 22", "Book 23", "Book 24", "Book 25",
  ];

  for (let i = 0; i < 25; i++) {
    const author = authors[Math.floor(i / 5)]; // Distribute 5 books per author
    books.push(
      prisma.book.create({
        data: {
          title: bookTitles[i],
          description: `Description for ${bookTitles[i]}`,
          rentalprice: 1.0 + (i % 5), // Different prices for variety
          sellingprice: 15.0 + (i % 5),
          authorAuthorid: author.authorid,
          bookURL: generateRandomBookURL(), // Generate random book URL
        },
      })
    );
  }

  const createdBooks = await prisma.$transaction(books);

  // Seed rentals (use the actual book IDs from createdBooks)
  await prisma.$transaction([
    prisma.rental.create({
      data: {
        startdate: new Date("2024-10-01"),
        enddate: new Date("2024-10-05"),
        haveaccess: true,
        userUserid: users[0].userid,
        bookBookid: createdBooks[0].bookid,
      },
    }),
    prisma.rental.create({
      data: {
        startdate: new Date("2024-10-02"),
        enddate: new Date("2024-10-06"),
        haveaccess: true,
        userUserid: users[1].userid,
        bookBookid: createdBooks[1].bookid,
      },
    }),
    prisma.rental.create({
      data: {
        startdate: new Date("2024-10-03"),
        enddate: new Date("2024-10-07"),
        haveaccess: true,
        userUserid: users[2].userid,
        bookBookid: createdBooks[2].bookid,
      },
    }),
    prisma.rental.create({
      data: {
        startdate: new Date("2024-10-04"),
        enddate: new Date("2024-10-08"),
        haveaccess: true,
        userUserid: users[3].userid,
        bookBookid: createdBooks[3].bookid,
      },
    }),
    prisma.rental.create({
      data: {
        startdate: new Date("2024-10-05"),
        enddate: new Date("2024-10-09"),
        haveaccess: true,
        userUserid: users[4].userid,
        bookBookid: createdBooks[4].bookid,
      },
    }),
  ]);

  // Seed purchases (use the actual book IDs from createdBooks)
  await prisma.$transaction([
    prisma.purchased.create({
      data: {
        purchasedate: new Date("2024-10-02"),
        userUserid: users[0].userid,
        bookBookid: createdBooks[5].bookid, // User 1 buys book 6
      },
    }),
    prisma.purchased.create({
      data: {
        purchasedate: new Date("2024-10-03"),
        userUserid: users[1].userid,
        bookBookid: createdBooks[6].bookid, // User 2 buys book 7
      },
    }),
    prisma.purchased.create({
      data: {
        purchasedate: new Date("2024-10-04"),
        userUserid: users[2].userid,
        bookBookid: createdBooks[7].bookid, // User 3 buys book 8
      },
    }),
    prisma.purchased.create({
      data: {
        purchasedate: new Date("2024-10-05"),
        userUserid: users[3].userid,
        bookBookid: createdBooks[8].bookid, // User 4 buys book 9
      },
    }),
    prisma.purchased.create({
      data: {
        purchasedate: new Date("2024-10-06"),
        userUserid: users[4].userid,
        bookBookid: createdBooks[9].bookid, // User 5 buys book 10
      },
    }),
  ]);

  console.log("Seed data created successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
