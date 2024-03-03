import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import { app } from '../src/server.js'; 

describe("Server", () => {
  let mongoServer;
  let db;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db("todoappdb");
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  
  describe("GET /api/todoapp/GetNotes", () => {
    test("should fetch all notes", async () => {
      const response = await request(app).get('/api/todoapp/GetNotes');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe("POST /api/todoapp/AddNotes", () => {
    test("should add a new note", async () => {
      const newNote = {
        newNotes: "Test note" 
      };
      const response = await request(app)
        .post('/api/todoapp/AddNotes')
        .send(newNote);
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe("Added Successfully");
    });
  });
  
  describe("DELETE /api/todoapp/DeleteNotes", () => {
    test("should delete a note", async () => {
      const noteId = "1"; 
      const response = await request(app)
        .delete(`/api/todoapp/DeleteNotes?id=${noteId}`);
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe("Delete Successfully");
    });
  });
  
});
