import { openDB } from "idb";

// function to open/create the database
const initdb = async () =>
  // open the database
  openDB("jate", 1, {
    upgrade(db) {
      // if the database already exists, don't create a new one
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // create the new database
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// function to save data to the database
export const putDb = async (content) => {
  console.log("Put to the database");
  // open the database
  const jateDb = await openDB("jate", 1);
  // create a read/write transaction
  const transaction = jateDb.transaction("jate", "readwrite");
  // use the transaction to open the jate object store
  const store = transaction.objectStore("jate");
  // add the data to the object store
  const request = store.add({ content: content });
  const result = await request;
  console.log("Data has beensaved to the database", result);
};

// function to get data from the database
export const getDb = async () => {
  console.log("GET from the database");
  // open the database
  const jateDb = await openDB("jate", 1);
  // create a read/write transaction
  const transaction = jateDb.transaction("jate", "readonly");
  // use the transaction to open the jate object store
  const store = transaction.objectStore("jate");
  // get the data from the object store
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  return result.value;
};

initdb();
