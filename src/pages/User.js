import UserForm from "../components/UserForm";
import { useParams } from "react-router-dom";
const User = () => {
  // get id from params
  const { id } = useParams();

  console.log(
    "user id is thiiiiiiiiiiiis yooooooooooooooo wooooooooooooooooooo",
    id
  );

  return <UserForm id={id} />;
};

export default User;
