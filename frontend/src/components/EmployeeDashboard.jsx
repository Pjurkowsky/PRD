import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
function EmployeeDashboard() {
  return (
    <Button variant="contained" color="success" size="large" className="">
      <Link to={"/employee"}>Wnioski</Link>
    </Button>
  );
}

export default EmployeeDashboard;
