import mongoose from "mongoose";
//dotenv/config liest ".env" datei und fügt diese Werte zu Process.env hinzu
import "dotenv/config.js";

console.log(process.env.DB);
console.log(process.env.NODE_ENV);

const connction = await mongoose.connect(process.env.DB);
const isDeleted = await mongoose.connection.db.dropDatabase();

if (isDeleted) {
  console.log("Database is dropped");
} else {
  console.log("Dataase is not dropped");
}
