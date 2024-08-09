//import Image from "next/image";
//import styles from "./page.module.css";

import { headers } from 'next/headers'

export default function Home() {

  const headersList = headers()
  let user = JSON.parse(headersList.get('user'))
  if (user == null){
    user = { email: 'Access Denied' }
  }

  return (
    <>
      <h4>Hello World !!!</h4>
      <h5>Email Authentication : {user.email}</h5>
    </>
  );
}
