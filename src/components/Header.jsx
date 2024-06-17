import { ConnectButton } from "@arweave-wallet-kit/react";
import { Link } from "react-router-dom";
import logo1 from "../assets/logo.png";

const Header = () => {
  const navLinks = [
    {
      title: "View Ratings",
      path: "/view",
    },
    {
      title: "Rate a Movie",
      path: "/ratingpage",
    },
  ];
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logoLink}>
        {" "}
        <img src={logo1} alt="CineScore Logo" style={styles.logo} />{" "}
        {/* Add alt text */}
      </Link>
      <div>
        {navLinks.map((link) => {
          return (
            <Link key={link.title} to={link.path} style={styles.nav}>
              {link.title}
            </Link>
          );
        })}
      </div>
      <ConnectButton
        profileModal={true}
        showBalance={false}
        showProfilePicture={true}
        style={styles.wallet}
      />
    </header>
  );
};

const styles = {
  wallet: {
    color: "#17202A", // White text color
    backgroundColor: "#3498DB",
  },
  header: {
    backgroundColor: "#D4E6F1",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  logoLink: {
    margin: 0,
    textDecoration: "none",
  },
  logo: {
    width: "180px",
    height: "120px",
  },
  nav: {
    textDecoration: "none",
    color: "blue",
    margin: "20px",
    fontWeight: "bold",
    fontSize: "20px",
    marginLeft: "60px",
  },
};

export default Header;
