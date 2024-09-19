import { Button } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import auth from "@/firebase/configFirebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addAuth } from "@/redux/reducers/AuthReducers";
const provider = new GoogleAuthProvider();

provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
provider.setCustomParameters({
  login_hint: "tranquocduong311ts@gmail.com",
});

const SocialLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    try {
      console.log("Attempting to sign in with Google...");
      const result = await signInWithPopup(auth, provider);
      console.log("Sign-in result:", result);
      if (result) {
        const user = result.user;
        if (user) {
          const data = {
            name: user.displayName,
            email: user.email,
          };
          try {
            const result = await axios.post(
              "http://localhost:8080/v1/auth/google-login",
              data,

              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if(result.data.data) {
              dispatch(addAuth(result.data.data))
            }
            console.log(result);
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        console.log("Error signing in");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      loading={isLoading}
      onClick={handleLoginWithGoogle}
      style={{
        width: "100%",
        marginTop: "10px",
      }}
      size="large"
      icon={
        <img
          width={24}
          height={24}
          src="https://img.icons8.com/color/48/google-logo.png"
          alt="google-logo"
        />
      }
    >
      Google
    </Button>
  );
};

export default SocialLogin;
