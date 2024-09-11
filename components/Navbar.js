import Link from 'next/link';
function Navbar() {
	return (
		<div>
			<li><Link href='/blog/2021-01-01/happy-new-year'>Read post</Link></li>
			<li><Link href='/blog/2021-03-05/match-update'>Read post</Link></li>
			<li><Link href='/blog/2021-04-23/i-love-nextjs'>Read post</Link></li>
		</div>
		);
}

export default Navbar;