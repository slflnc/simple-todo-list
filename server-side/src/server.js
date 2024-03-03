import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import multer from 'multer';

const app = express();
const PORT = process.env.PORT || 3000;

const CONNECTION_STRING = "mongodb+srv://admin:8TJ2lgKjl7dmUzmt@cluster0.sazq2l1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace <password> with your actual password
const DATABASE_NAME = "todoappdb";
let database;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
MongoClient.connect(CONNECTION_STRING, (error, client) => {
  if (error) {
    console.error("Mongo DB Connection Error:", error);
    return;
  }
  database = client.db(DATABASE_NAME);
  console.log("Mongo DB Connection Successful.");

  // Define routes inside the connect callback
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.get('/api/todoapp/GetNotes', (request,response)=>{
    database.collection("todoappcollection").find({}).toArray((error,result)=>{
      if (error) {
        console.error("Error fetching notes:", error);
        response.status(500).json({ error: "Internal server error" });
        return;
      }
      response.send(result);
    });
  });

  app.post('/api/todoapp/AddNotes', multer().none(), (request, response) => {
    database.collection("todoappcollection").countDocuments({}, function(error, numOfDocs) {
      if (error) {
        console.error("Error counting documents:", error);
        response.status(500).json({ error: "Internal server error" });
        return;
      }

      database.collection("todoappcollection").insertOne({
        id: (numOfDocs + 1).toString(),
        description: request.body.newNotes
      }, function(error, result) {
        if (error) {
          console.error("Error inserting document:", error);
          response.status(500).json({ error: "Internal server error" });
          return;
        }

        response.json("Added Successfully");
      });
    });
  });

  app.delete('/api/todoapp/DeleteNotes', (request, response) => {
    database.collection("todoappcollection").deleteOne({
      id: request.query.id
    }, function(error, result) {
      if (error) {
        console.error("Error deleting document:", error);
        response.status(500).json({ error: "Internal server error" });
        return;
      }

      response.json("Delete Successfully");
    });
  });
});

export { app };
