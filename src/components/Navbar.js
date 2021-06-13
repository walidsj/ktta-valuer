import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	function handleToggler(e) {
		setIsOpen(e);
	}

	return (
		<nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
			<div className="container">
				<Link className="navbar-brand" to="/">
					<img
						src={logo}
						alt=""
						width="30"
						class="d-inline-block align-text-top"
					/>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					onClick={() => handleToggler(!isOpen)}
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link
								to="/informasi"
								className="nav-link active"
								aria-current="page"
								href="#"
							>
								Informasi
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
