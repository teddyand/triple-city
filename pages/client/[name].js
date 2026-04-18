import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';

function UserData({ client }) {	
	return (
	  <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
	    <div className="w-full max-w-4xl">
	      {/* Header */}
	      <div className="mb-6 text-center">
	        <h1 className="text-3xl font-bold text-gray-900 mb-2">{client.name}'s Profile</h1>
	        <p className="text-gray-600">Detailed information about the client</p>
	      </div>
	      
	      {/* Main Content */}
	      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
	        {/* Profile Section */}
	        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6">
	          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
	            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white">
	              <Image 
	                src={client.profile_pic} 
	                alt={client.name} 
	                width={128} 
	                height={128} 
	                className="object-cover" 
	              />
	            </div>
	            <div className="text-center md:text-left">
	              <h2 className="text-2xl font-bold mb-2">{client.name}</h2>
	              <p className="text-purple-100 mb-1">{client.company}</p>
	              <p className="text-purple-100">{client.email}</p>
	            </div>
	          </div>
	        </div>
	        
	        {/* Details Section */}
	        <div className="p-6">
	          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
	            <div className="p-4 hover:bg-gray-50 rounded-lg">
	              <p className="text-gray-600 font-medium mb-1">Full Name</p>
	              <p className="text-gray-900">{client.name}</p>
	            </div>
	            <div className="p-4 hover:bg-gray-50 rounded-lg">
	              <p className="text-gray-600 font-medium mb-1">Gender</p>
	              <p className="text-gray-900">{client.gender}</p>
	            </div>
	            <div className="p-4 hover:bg-gray-50 rounded-lg">
	              <p className="text-gray-600 font-medium mb-1">Age</p>
	              <p className="text-gray-900">{client.age}</p>
	            </div>
	            <div className="p-4 hover:bg-gray-50 rounded-lg">
	              <p className="text-gray-600 font-medium mb-1">Dates</p>
	              <p className="text-gray-900">{client.dates_of_bd || 'N/A'}</p>
	            </div>
	            <div className="p-4 hover:bg-gray-50 rounded-lg">
	              <p className="text-gray-600 font-medium mb-1">Phone</p>
	              <p className="text-gray-900">{client.phone}</p>
	            </div>
	            <div className="p-4 hover:bg-gray-50 rounded-lg">
	              <p className="text-gray-600 font-medium mb-1">Address</p>
	              <p className="text-gray-900">{client.address}</p>
	            </div>
	          </div>
	          
	          {/* About Section */}
	          <div className="mt-6 p-4 hover:bg-gray-50 rounded-lg">
	            <p className="text-gray-600 font-medium mb-2">About</p>
	            <p className="text-gray-900">{client.about || 'No information available'}</p>
	          </div>
	          
	          {/* Attachments Section */}
	          {client.articles && client.articles.length > 0 && (
	            <div className="mt-6">
	              <p className="text-gray-600 font-medium mb-3">Attachments</p>
	              <div className="space-y-3">
	                {client.articles.map((item) => (
	                  <div key={item.name} className="border border-gray-200 rounded-lg p-3 hover:border-purple-300 transition-colors">
	                    <Link 
	                      href={item.article} 
	                      className="flex items-center justify-between text-purple-600 hover:text-purple-800"
	                      target="_blank"
	                      rel="noopener noreferrer"
	                    >
	                      <h3 className="font-medium">{item.name}</h3>
	                      <span className="text-sm text-gray-500">View</span>
	                    </Link>
	                  </div>
	                ))}
	              </div>
	            </div>
	          )}
	        </div>
	      </div>
	      
	      {/* Support Link */}
	      <a 
	        href="https://davidit.top/" 
	        target="_blank" 
	        rel="noopener noreferrer"
	        className="mt-8 inline-block bg-purple-600 px-4 py-2 rounded-lg text-white font-medium hover:bg-purple-700 transition-colors"
	      >
	        Support me
	      </a>
	    </div>
	  </div>
 ); 
}


export async function getServerSideProps({ query }) {
	const { name } = query;
	console.log(name);
	
	try {
		const res = await axios.get(
			`https://my-json-server.typicode.com/teddyand/myrestapi/clients/?name=${name}`,
			{ headers: { authorization: process.env.API_TOKEN } }
		);
		const repo = res.data;
		const userData = repo[0];
		
		if (!userData) {
			return {
				props: {
					name,
					data: null,
					error: 'User not found'
				}
			};
		}
		
		return {
			props: {
				name,
				data: userData,
				error: null
			}
		};
	} catch (err) {
		console.error(err);
		return {
			props: {
				name,
				data: null,
				error: 'Failed to fetch user data'
			}
		};
	}
}


function UserPage({ name, data, error }) {
	// All data is fetched on the server side
	// No need for client-side data fetching
	const loading = false; // Data is already loaded from server

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Navigation */}
			<nav className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<Link 
								href="/" 
								className="text-gray-900 font-medium hover:text-purple-600 transition-colors"
							>
								Back to Home
							</Link>
						</div>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
				{error && (
					<div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
								</svg>
							</div>
							<div className="ml-3">
								<h3 className="text-sm font-medium text-red-800">Error</h3>
								<div className="mt-2 text-sm text-red-700">
									<p>{error}</p>
								</div>
							</div>
						</div>
					</div>
				)}

				{data && <UserData client={data} />}
				
				{!data && !error && (
					<div className="flex flex-col items-center justify-center py-16">
						<p className="text-gray-600">No data available</p>
					</div>
				)}
			</main>
		</div>
	);
}







export default UserPage;


