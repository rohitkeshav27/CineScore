import { ConnectButton, useConnection } from "@arweave-wallet-kit/react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const Home = () => {
  const { connected } = useConnection();

  return (
    <main>
      <Header />
      <div style={styles.blocks}>
        <div style={styles.div}>
          <div style={styles.block}>
            <h2 style={styles.h2}>Welcome to Cine Score ! </h2>
            <p style={styles.p}>A Decentralised Movie Rating System</p>
          </div>
          {connected ? (
            <button style={styles.viewPostsButton}>
              <Link to="/ratingPage" style={styles.viewPostsLink}>
                <span>Rate a Movie</span>
              </Link>
            </button>
          ) : (
            <ConnectButton style={styles.viewPostsButton} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

const styles = {
  blocks: {
    position: "relative",
    left: "180px",
  },
  p: {
    color: "#1A5276",
    // width: "250px",
    position: "relative",
    left: "490px",
  },
  h2: {
    color: "#0032CD",
    margin: "20px",
    fontWeight: "bold",
    fontSize: "30px",
    // width: "400px",
    position: "relative",
    left: "420px",
  },
  div: {
    height: "calc(100vh - 72px)",
    display: "flex",
    flexDirection: "column",
  },
  block: {
    padding: "80px",
  },
  viewPostsButton: {
    color: "#17202A",
    backgroundColor: "#3498DB",
    fontSize: "20px",
    border: "1px solid #2d63c8",
    borderRadius: "28px",
    padding: "15px 50px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",

    "&:hover": {
      backgroundColor: "#AED6F1",
    },
    width: "250px",
    position: "relative",
    left: "580px",
  },
  viewPostsLink: {
    color: "#fff",
    textDecoration: "none",
  },
};
