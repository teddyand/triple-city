import Link from "next/link";

function ContatcPage() {
	return (
		<div>
			<ul>
				<li> Email: davidchen1977@live.com </li>
				<li> <Link href="https://weibo.com/teddyand">
          Weibo
        </Link></li>
				<li> <Link href="https://github.com/teddyand">
          Github
        </Link> </li>
			</ul>
		</div>
	)
};

export default ContatcPage;