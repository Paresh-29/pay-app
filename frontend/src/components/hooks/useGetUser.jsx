import axios from "axios";
import { useEffect, useState } from "react";

const useGetUser = () => {
    const [user, setUser] = useState(null);
    const [verify, setVerify] = useState(undefined);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setVerify(false);
                    return;
                }

                const response = await axios.get("http://localhost:3000/api/v1/user/getuserinfo", {
                    headers: {
                        Authorization: token,
                    },
                });
                setUser(response.data.user);
                setVerify(true);
            } catch (error) {
                console.error("Error fetching user:", error);
                setVerify(false);
                setError(error);
            }
        };

        fetchData();
    }, []);

    return { user, verify, error };
};

export default useGetUser;
