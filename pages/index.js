import { useEffect,useState } from 'react';
import Link from 'next/link';
//import axios from 'axios';
import Image from "next/image";
import styles from "@/styles/Home.module.css";
function List ({ clients }) { 

	return (

    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
            suspendisse.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {clients.map((client) => (
            <li key={client.name}>
              <div className="flex items-center gap-x-6">
                <Image
                  className={styles.borderCircle}
                  src={client.profile_pic}
                  width={65}
                  height={65}
                  alt="作者的照片"
                />                
                <div>
                <Link
                    href={{
                      pathname: '/client/[name]',
                      query: { name: client.name },
                    }}
                    >
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{client.name}</h3>
                  </Link>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{client.company}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
		)
}


function Users() {
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState(null);

  useEffect( () => {
    const fetchData = async () => {
      const req = await fetch(`https://my-json-server.typicode.com/teddyand/myrestapi/clients`);
      const data = await req.json();  
      console.log(data);
      setLoading(false);
      setData(data);
    }

    fetchData();    
  }, []);
   
  return (
    <div>
      {loading &&<div>Loading users...</div>}
      {data &&<List clients={data} />}
    </div>
    );
  }





export default Users;