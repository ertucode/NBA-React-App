import { NavLink } from "react-router-dom";

export default function Navbar({ style }) {
	return (
		<div className="navbar-container" style={style || {}}>
			<div className="navbar-site-name-container">
				<NavLink className="navbar-link" to="/">
					<h1 className="site-name">Basketball Stats</h1>
				</NavLink>
			</div>
			<div className="navbar-page-links-container">
				<NavLink className="navbar-link" to="/player">
					Get Stats
				</NavLink>
				<NavLink className="navbar-link" to="/poster">
					Make Poster
				</NavLink>
			</div>
		</div>
	);
}
