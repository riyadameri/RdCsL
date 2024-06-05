const express = require('express');
const cors = require('cors');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('dist/frontend/browser'));

const firebaseConfig = {
  apiKey: "AIzaSyAsUeVTtzUctMVtlbEICId013fuJ-k06Ek",
  authDomain: "redoxcsl.firebaseapp.com",
  projectId: "redoxcsl",
  storageBucket: "redoxcsl.appspot.com",
  messagingSenderId: "43451970627",
  appId: "1:43451970627:web:87d951b48d34f3096b50f6",
  measurementId: "G-RWJWYCFQBQ"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const Learner = collection(db, 'Learners');

app.post('/create', async (req, res) => {
  const data = req.body;
  try {
    await addDoc(Learner, data);
    res.send({ msg: 'data received' });
    console.log('data of user added:', data);
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).send('Error adding data');
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
