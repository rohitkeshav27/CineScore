import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useConnection } from "@arweave-wallet-kit/react";
import { dryrun } from "@permaweb/aoconnect";
import { Outlet } from "react-router-dom";
import Card from "../components/Card";
import jw from "../assets/JohnWick.jpeg";
import ip from "../assets/Inception.jpeg";
import av from "../assets/Avatar.jpeg";
import gk from "../assets/Godzilla.jpeg";
import tt from "../assets/Tenet.jpg";
import kt from "../assets/Kantara.jpeg";

import PropagateLoader from "react-spinners/PropagateLoader";

let isFetching = true;
const ViewRatings = () => {
  const movieImageMap = {
    Tenet: tt,
    Kanthara: kt,
    Avatar: av,
    "Godzilla vs Kong": gk,
    Inception: ip,
    "John Wick": jw,
  };
  const { connected } = useConnection();
  const processId = "A1zJqaE8RkOswtmuhOawvXHE2p04ovGwjtyDyTPus2A";
  const [movieList, setMovieList] = useState([]);

  const fetchMovieList = async () => {
    try {
      const result = await dryrun({
        process: processId,
        data: "",
        tags: [{ name: "Action", value: "GetRatings" }],
        anchor: "1234",
      });
      const filteredResult = result.Messages.map((message) =>
        JSON.parse(message.Data)
      );
      console.log("Filtered result", filteredResult[0]);
      setMovieList(filteredResult[0]);
      isFetching = false;
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      isFetching = true;
    }
  };

  useEffect(() => {
    isFetching = true;
    fetchMovieList();
    isFetching = false;
  }, []);

  return (
    <main>
      <Header />
      <div style={styles.parentDiv}>
        <h2 style={styles.h2}>Cine Score Ratings</h2>
        {!isFetching ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <PropagateLoader color="#1548E7" />
          </div>
        ) : (
          <>
            <div>
              {movieList.map((movie) => (
                <Card
                  key={movie.Name}
                  name={movie.Name}
                  rating={Math.round(movie.AverageRating * 10) / 10}
                  image={movieImageMap[movie.Name]}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Outlet />
    </main>
  );
};

export default ViewRatings;

const styles = {
  h2: {
    color: "#163EF1",
    fontSize: "40px",
  },

  parentDiv: {
    height: "calc(100vh - 72px)",
    display: "flex",
    flexDirection: "column",
    padding: "40px",
  },
  horizontalRule: {
    border: 0,
    clear: "both",
    display: "block",
    width: "100%",
    backgroundColor: "#ccc",
    height: "1px",
  },
  postDiv: {
    padding: "10px 20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "10px",
  },
  postHeading: {
    margin: "0px",
    padding: "0px",
  },
  postContent: {
    margin: "0px",
    padding: "0px",
    color: "#555",
    fontSize: "14px",
  },
  postLink: {
    textDecoration: "none",
    color: "#555",
  },
};
