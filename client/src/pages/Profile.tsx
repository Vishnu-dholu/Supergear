import { useEffect } from "react";
import { store } from "../lib/store";
import Container from "../ui/Container";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import UserInfo from "../ui/UserInfo";
import Registration from "../ui/Registration";
import Loading from "../ui/Loading";

const Profile = () => {
  const { currentUser, getUserInfo, isLoading } = store();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      getUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [getUserInfo]);
  return (
    <Container>
      {currentUser ? <UserInfo currentUser={currentUser} /> : <Registration />}

      {isLoading && <Loading />}
    </Container>
  );
};

export default Profile;
