
import axios from "axios";
import { useEffect, useState } from "react";

export const AppBar = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/api/v1/user/current_user", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCurrentUser(response.data.user);
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };
        fetchUser();
    }, []);

    // Checking if currentUser exists and has the firstName property
    const userInitial = currentUser?.firstName ? currentUser.firstName[0].toUpperCase() : '';

    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                PayTM App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello
                </div>
                {currentUser && (
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                        <div className="flex flex-col justify-center h-full text-xl">
                            {userInitial}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
