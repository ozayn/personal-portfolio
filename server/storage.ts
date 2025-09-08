import { users, contactMessages, photos, type User, type UpsertUser, type ContactMessage, type InsertContactMessage, type Photo, type InsertPhoto } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  createPhoto(photo: InsertPhoto): Promise<Photo>;
  getPhotos(): Promise<Photo[]>;
  deletePhoto(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db
      .select()
      .from(contactMessages)
      .orderBy(contactMessages.createdAt);
  }

  async createPhoto(photoData: InsertPhoto): Promise<Photo> {
    const [photo] = await db
      .insert(photos)
      .values(photoData)
      .returning();
    return photo;
  }

  async getPhotos(): Promise<Photo[]> {
    return await db
      .select()
      .from(photos)
      .orderBy(photos.createdAt);
  }

  async deletePhoto(id: number): Promise<void> {
    await db.delete(photos).where(eq(photos.id, id));
  }
}

// Lazy initialization to avoid immediate database connection
let _storage: DatabaseStorage | null = null;

export function getStorage(): DatabaseStorage {
  if (!_storage) {
    _storage = new DatabaseStorage();
  }
  return _storage;
}

// For backward compatibility
export const storage = new Proxy({} as DatabaseStorage, {
  get(target, prop) {
    return getStorage()[prop as keyof DatabaseStorage];
  }
});
