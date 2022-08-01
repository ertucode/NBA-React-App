import { NavLink } from "react-router-dom";

export default function Navbar() {
	return (
		<>
			<NavLink className="navbar" to="/">
				<h1 className="site-name">Basketball Stats</h1>
			</NavLink>
			<NavLink className="navbar" to="/player">
				Player
			</NavLink>
		</>
	);
}
