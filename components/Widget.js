import { useState } from 'react';
import Head from 'next/head';

function Widget({pagename}) {
	const [active,setActive] = useState(false);
	if (active) {
		return (
		<>
			<Head>
				<title> Your're browsing the {pagename} page </title>
			</Head>
			<div>
				<button onClick={()=>setActive(false)}>
				  Restore original title
				</button>
				Take a look at the title!
			</div>
		</>
	);	
	}
	return (
		<>
		  <button onClick= {()=>setActive(true)}>
		  Change page title
		  </button>
		</>
		);
}

export default Widget;