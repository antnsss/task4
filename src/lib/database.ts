// src/lib/database.ts
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

interface Poll {
  title: string;
  description: string;
  options: string[];
}

export async function createPoll(poll: Poll) {
  try {
    const docRef = await addDoc(collection(db, "polls"), {
      title: poll.title,
      description: poll.description,
      options: poll.options.map((opt) => ({ text: opt, votes: 0 })),
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (err) {
    console.error("Error creating poll:", err);
    throw err;
  }
}
