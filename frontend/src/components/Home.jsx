import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useEffect } from "react";

function Home({ isEmployee, loggedIn }) {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isEmployee);
    if (loggedIn) {
      if (isEmployee) {
        navigate("/employee_dashboard");
      } else {
        navigate("/user_dashboard");
      }
    }
  }, [isEmployee, navigate]);
  return (
    <>
      <div className="flex flex-col h-screen justify-center ">
        <div className="font-bold text-7xl p-10 text-center mt-10">
          Dział Ewidencji Ludności
        </div>
        <div className="flex flex-col text-center   justify-center">
          <div className="font-bold text-2xl">
            Wpisz się do rejestru mieszkańców już DZIŚ!
          </div>
          <div className="mt-24 text-center mb-10">
            Zajmie to ci tylko minutę!
          </div>
          <div className="flex justify-center">
            <Button
              variant="contained"
              color="success"
              size="large"
              className=""
              sx={{ borderRadius: "20px", width: "200px", height: "50px" }}
            >
              <Link to={"/application"}>Złóż Wniosek</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
