import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnK9IBfSZxf-UOXrnnj0n-hvanUT0rSs0",
  authDomain: "xskill-swapx.firebaseapp.com",
  databaseURL: "https://xskill-swapx-default-rtdb.firebaseio.com",
  projectId: "xskill-swapx",
  storageBucket: "xskill-swapx.appspot.com",
  messagingSenderId: "1037534658028",
  appId: "1:1037534658028:web:41b331b28546ec1cfb94c9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
