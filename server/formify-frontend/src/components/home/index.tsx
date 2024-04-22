import Navbar from "../navbar";
import useForm from "../../hooks/useForm";
import "./home.css";
import HomeList from "./home-list";

const Home = () => {
  const formData = useForm();

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Your Form</h1>
        <HomeList formData={formData} />
      </div>
    </>
  );
};

export default Home;
