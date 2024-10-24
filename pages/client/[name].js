import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from "next/image";


function UserData({ client }) {	
	return (
	  <div style={{ display: 'flex' }}>
      	  <img src={client.profile_pic} alt={client.name} width={125} height={125} />
		  <div>
			<div>
			   <b>Username:</b> {client.name}
			</div>
			<div>
			   <b>Age:</b> {client.age}
			</div>
			<div>
			   <b>Gender:</b> {client.gender}
			</div>
			<div>
			   <b>Company:</b> {client.company}
			</div>
			<div>
			   <b>Email:</b> {client.email}
			</div>
			<div>
			   <b>Phone:</b> {client.phone}
			</div>
			<div>
			   <b>Address:</b> {client.address}
			</div>
		  </div>	
	   </div>, 

<div class="min-h-screen flex items-center justify-center px-4">
    
    <div class="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
        <div class="p-4 border-b">
            <h2 class="text-2xl ">
                Applicant Information
            </h2>
            <p class="text-sm text-gray-500">
                Personal details and application. 
            </p>
            <Image                  
                  src={client.profile_pic}
                  width={125}
                  height={125}
                  alt={client.name}
                />                            
        </div>
        <div>
            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-gray-600">
                    全称
                </p>
                <p>
                    {client.name}
                </p>
            </div>
            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-gray-600">
                    性别
                </p>
                <p>
                    {client.gender}
                </p>
            </div>
            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-gray-600">
                    生卒年
                </p>
                <p>
                    {client.dates_of_bd}
                </p>
            </div>
            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-gray-600">
                    Email Address
                </p>
                <p>
                    {client.email}
                </p>
            </div>
            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-gray-600">
                    Company
                </p>
                <p>
                    {client.company}
                </p>
            </div>
            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-gray-600">
                    Address
                </p>
                <p>
                    {client.address}
                </p>
            </div>
            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-gray-600">
                    About
                </p>
                <p>
                    {client.about}
                </p>
            </div>
            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4">
                <p class="text-gray-600">
                    Attachments
                </p>
                <div class="space-y-2">
                {client.articles.map((item) => (
                    <div class="border-2 flex items-center p-2 rounded justify-between space-x-2">
                        
                        <Link href={item.article} class="text-purple-700 hover:underline">
                          <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{item.name}</h3>  
                        </Link>
                    </div>
                 ))}   
                </div>
            </div>
        </div>
    </div>

    
    <a href="https://www.buymeacoffee.com/danimai" target="_blank" class="bg-purple-600 p-2 rounded-lg text-white fixed right-0 bottom-0">
        Support me
    </a>
</div>

 );
}


export async function getServerSideProps({ query }) {
	const { name } = query;
	console.log(name);
	
	return {
    	props: {
    		name,    		
    		authorization: process.env.API_TOKEN
    	}
    };

}


function UserPage({ name,authorization }) {
	const [loading,setLoading] = useState(true);
	const [data,setData] = useState(null);

	useEffect( () => {		
		const fetchData = async () => {
	 const res = await axios.get(`https://my-json-server.typicode.com/teddyand/myrestapi/clients/?name=${name}`,
	   				{headers: { authorization }  }
	   );		
	 const repo = res.data;
	 const data = repo[0];
	 setLoading(false);
	 setData(data);
	 }
	 fetchData();
	}, []);

	return (
		<div>	
			<div>
			<Link href="/" >
			Back to home
			</Link>
		</div>
		<hr />		
			{loading &&<div>Loading user data...</div>}
			{data &&<UserData client ={data} />}
		</div>
		);
}







export default UserPage;


