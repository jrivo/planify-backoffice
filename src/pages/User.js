import UserForm from "../components/UserForm";
import { useParams } from "react-router-dom";
const User = () => {
  // get id from params
  const { id } = useParams();
  return <UserForm id={id} />;
};

export default User;
