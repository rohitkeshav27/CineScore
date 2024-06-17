import { ConnectButton, useConnection } from "@arweave-wallet-kit/react";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { dryrun } from "@permaweb/aoconnect";
import RiseLoader from "react-spinners/RiseLoader";
import PacmanLoader from "react-spinners/PacmanLoader";

const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let fetching = true;

const RatingPage = () => {
  const { connected } = useConnection();
  let [color, setColor] = useState("#5DADE2");
  const [isFetching, setIsFetching] = useState(true);
  const [movieMap, setMovieMap] = useState();
  const processId = "A1zJqaE8RkOswtmuhOawvXHE2p04ovGwjtyDyTPus2A";

  const fetchMovieList = async () => {
    console.log(connected, "Checking if connected");
    if (connected) {
      console.log("Wallet not connected");
      return;
    }

    try {
      const result1 = await dryrun({
        process: processId,
        data: "",
        tags: [{ name: "Action", value: "GetMovies" }],
        anchor: "1234",
      });
      console.log("Dry run result", result1);
      const filteredResult = result1.Messages.map((message) =>
        JSON.parse(message.Data)
      );
      console.log("Filtered result", filteredResult);
      const movieMap = new Map();

      const movies = filteredResult[0];

      movies.forEach((movie) => {
        movieMap.set(movie.Name, movie.MID);
      });
      setMovieMap(movieMap);
      const movieNames = filteredResult[0].map((movie) => movie.Name);
      setMovieList(movieNames);
      setSelectedMovie(movieNames[0]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      fetching = true;
    }
  };

  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedRating, setSelectedRating] = useState();
  const [isLocked, setIsLocked] = useState(false);

  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(parseInt(event.target.value));
  };

  const handleLockSelection = async () => {
    await setIsLocked(true);
    let rId = movieMap.get(selectedMovie);
    await postRating(rId, selectedRating);
  };

  const postRating = async (rId, rating) => {
    try {
      console.log(rId, rating);
      const result2 = await message({
        process: processId,
        tags: [
          { name: "Action", value: "RateMovie" },
          { name: "RId", value: rId.toString() },
          { name: "Rating", value: rating.toString() },
        ],
        data: "",
        signer: createDataItemSigner(window.arweaveWallet),
      });

      console.log("Post result", result2);

      const postResult = await result({
        process: processId,
        message: result2,
      });

      console.log({ postResult });
      if (postResult) {
        alert("Your Rating was Captured !!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetching = true;
    fetchMovieList();
    fetching = false;
    console.log(isFetching, "is Fetching Value");
  }, []);

  return (
    <>
      <Header />
      {connected ? (
        <div style={styles.div}>
          {!fetching ? (
            <RiseLoader color={color} size={30} />
          ) : (
            <>
              <div style={styles.dropdownContainer}>
                <select
                  value={selectedMovie}
                  onChange={handleMovieChange}
                  disabled={isLocked}
                  style={styles.select}
                >
                  {movieList.map((movie) => (
                    <option key={movie} value={movie}>
                      {movie}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedRating}
                  onChange={handleRatingChange}
                  disabled={isLocked}
                  style={styles.select}
                >
                  <option value={0}>Select Rating</option>
                  {ratings.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              {selectedRating && (
                <p style={styles.selection}>
                  You selected: {selectedMovie} with a rating of{" "}
                  {selectedRating}.
                </p>
              )}

              <button
                style={styles.lockButton}
                disabled={isLocked}
                onClick={handleLockSelection}
              >
                Rate Selection
              </button>
            </>
          )}
          {isLocked && (
            <div style={styles.div}>
              <PacmanLoader color="rgba(54, 215, 183, 1)" size={20} />
            </div>
          )}
        </div>
      ) : (
        <div style={styles.div}>
          <ConnectButton style={styles.viewPostsButton} />
        </div>
      )}
    </>
  );
};

const styles = {
  select: {
    padding: "10px",
    alignment: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },

  h2: {
    color: "#1B2FD5",
    fontSize: "40px",
  },
  div: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  dropdownContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "280px",
  },
  selection: {
    fontSize: "20px",
    color: "#CB4335",
    fontWeight: "bold",
    marginLeft: "70px",
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
    top: "100px",
    left: "50px",
  },
  lockButton: {
    padding: "10px 20px",
    color: "#17202A",
    backgroundColor: "#2E86C1",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
    fontSize: "20px",
    marginLeft: "60px",
  },
};

export default RatingPage;
