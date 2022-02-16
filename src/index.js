const { response } = require("express");
const express = require("express");
const { get } = require("express/lib/response");
const mongodb = require("mongodb");

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("API Listening in on port 3000!");
});

app.get("/", (request, response) => {
  response.send("This is working!");
});

app.get("/users", (request, response) => {
  getUsers().then((users) => {
    response.send(users);
  });
});
app.post("/users", (request, response) => {
  insertUser(request.body).then(() => {
    response.send("Added User!");
  });
});

app.get("/products", (request, response) => {
  console.log("get /products");
  getProduct().then((products) => {
    response.send(products);
  });
});
//update
app.post("/products", (request, response) => {
  insertProduct(request.body).then(() => {
    response.send("Added Product!");
  });
});

const client = new mongodb.MongoClient(
  "mongodb+srv://admin:O61OO2O953@cluster0.031fm.mongodb.net/?retryWrites=true&w=majority"
);

const connectClient = async () => {
  await client.connect();
  console.log("Client Connected");
};

const getUserCollection = () => {
  const db = client.db("aurelies-db");
  const uCol = db.collection("users");

  return uCol;
};

const insertUser = async (user) => {
  const uCol = getUserCollection();
  await uCol.insertOne(user);
  console.log("User Inserted");
};

const getUsers = async () => {
  const uCol = getUserCollection();
  const users = await uCol.find({}).toArray();

  return users;
};

const getProductCollection = () => {
  const db = client.db("aurelies-db");
  const pCol = db.collection("product");

  return pCol;
};

const insertProduct = async (product) => {
  const pCol = getProductCollection();
  await pCol.insertOne(product);

  console.log("Product Inserted");
};

const getProduct = async () => {
  const pCol = getProductCollection();
  const products = await pCol.find({}).toArray();

  return products;
};

// const getOrderCollection = () => {
//   const db = client.db("aurelies-db");
//   const oCol = db.collection("orders");

//   return oCol;
// };

// const insertOrder = (order) => {
//   const oCol = getOrderCollection();
//   await oCol.insertOne(product);

//   console.log("Order Inserted");
// };

// const getOrder = async () => {
//   const oCol = getOrderCollection();
//   const order = await oCol.find({}).toArray();

//   return order;
// };

connectClient().then();
