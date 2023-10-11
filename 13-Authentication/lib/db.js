/** @format */

import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://ravi-nextjs:raviprasad@mongodb@nextjs-max-project.cjtihsy.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );

  return client;
}
