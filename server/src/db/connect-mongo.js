import { MongoClient } from "mongodb";
import { DB_NAME, MONGO_URI } from "./mongo.js";

let client;
let db;

export async function getDb() {
  if (db) return db;

  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();

    db = client.db(DB_NAME);

    await db.collection("agents").createIndex(
      { agentCode: 1 },
      { unique: true }
    );
    await db.collection("reports").createIndex(
      { agentCode: 1 },
      { unique: true }
    );

    return db;
  } catch (err) {
    console.log(err.message);
    client = null;
    db = null;
  }
}

export async function disconnect() {
  if (!client) return;

  await client.close();
  client = null;
  db = null;

  console.log("Mongo connection is closed");
}