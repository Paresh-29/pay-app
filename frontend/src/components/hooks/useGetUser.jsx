import axios from "axios";
import { useEffect, useState } from "react";

const useGetUser = () => {
  const [user, setUser] = useState({});
  const [verify, setVerify] = useState(undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching user data...");
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found, setting verify to false.");
          setVerify(false);
          return;
        }
        const response = await axios.get("http://localhost:3000/api/v1/user/getuserinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("User data fetched successfully:", response.data.user);
        setUser(response.data.user);
        setVerify(true);
        setError(null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setVerify(false);
        setError(error);
      }
    };

    fetchData();
  }, []);

  console.log("User data:", user);
  console.log("Verify:", verify);
  console.log("Error:", error);

  return [user, verify, error];
};

export default useGetUser;
