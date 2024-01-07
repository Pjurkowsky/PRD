import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function Home() {
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="flex flex-col">
          <div className="font-bold text-2xl">
            Wpisz się do rejestru mieszkańców już DZIŚ!
          </div>
          <div className="mt-24 text-center mb-10">
            Zajmie to ci tylko minutę!
          </div>
          <div className="flex justify-center">
            <Button variant="contained" color="success" size="large">
              <Link to={"/application"}>Złóż Wniosek</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
