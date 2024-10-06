import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const author1 = await prisma.author.create({
    data: {
      authorname: "J.K. Rowling",
      authoremail: "author1@example.com",
      authorpassword: "author1",
    },
  });

  const author2 = await prisma.author.create({
    data: {
      authorname: "George R.R. Martin",
      authoremail: "author2@example.com",
      authorpassword: "author2", // Plain password
    },
  });

  // Seed users
  const user1 = await prisma.user.create({
    data: {
      fullname: "John Doe",
      email: "user1@example.com",
      password: "user1", // Plain password
    },
  });

  const user2 = await prisma.user.create({
    data: {
      fullname: "Jane Smith",
      email: "user2@example.com",
      password: "user2", // Plain password
    },
  });

  // Seed books
  const book1 = await prisma.book.create({
    data: {
      title: "Harry Potter",
      description: "A magical journey of a boy who discovers he is a wizard",
      rentalprice: 1.5,
      sellingprice: 20,
      authorAuthorid: author1.authorid,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "Game of Thrones",
      description:
        "A tale of fire and ice, of kings and queens, knights and renegades",
      rentalprice: 2.0,
      sellingprice: 25,
      authorAuthorid: author2.authorid,
    },
  });

  // Seed rentals
  await prisma.rental.create({
    data: {
      startdate: new Date("2024-10-01"),
      enddate: new Date("2024-10-05"),
      haveaccess: true,
      userUserid: user1.userid,
      bookBookid: book1.bookid,
    },
  });

  await prisma.rental.create({
    data: {
      startdate: new Date("2024-10-02"),
      enddate: new Date("2024-10-06"),
      haveaccess: true,
      userUserid: user2.userid,
      bookBookid: book2.bookid,
    },
  });

  await prisma.purchased.create({
    data: {
      purchasedate: new Date("2024-10-02"),
      userUserid: user1.userid,
      bookBookid: book2.bookid, // User 1 buys "Game of Thrones"
    },
  });

  await prisma.purchased.create({
    data: {
      purchasedate: new Date("2024-10-03"),
      userUserid: user2.userid,
      bookBookid: book1.bookid, // User 2 buys "Harry Potter"
    },
  });

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
