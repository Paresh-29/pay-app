
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Button } from "./Button";
// import { useNavigate } from "react-router-dom";
// import { useDebounce } from "./hooks/useDebounce";

// export const Users = () => {
//     const [users, setUsers] = useState([]);
//     const [filter, setFilter] = useState("");
//     const [loading, setLoading] = useState(false); // Add loading state

//     const debouncedFilter = useDebounce(filter, 500);

//     useEffect(() => {
//         setLoading(true); // Set loading to true before making the request
//         axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + debouncedFilter)
//             .then(response => {
//                 setUsers(response.data.user);
//             })
//             .catch(error => {
//                 console.error("Error fetching users:", error);
//                 setUsers([]); // Clear users array on error
//             })
//             .finally(() => {
//                 setLoading(false); // Set loading to false after request completion
//             });
//     }, [debouncedFilter]);

//     return (
//         <>
//             <div className="font-bold mt-6 text-lg">
//                 Users
//             </div>
//             <div className="my-2">
//                 <input
//                     onChange={(e) => setFilter(e.target.value)}
//                     type="text"
//                     placeholder="Search users.."
//                     className="w-full px-2 py-1 border rounded border-slate-200"
//                 />
//             </div>
//             <div>
//                 {loading ? (
//                     <div>Loading...</div>
//                 ) : (
//                     users.map(user => <User key={user._id} user={user} />)
//                 )}
//             </div>
//         </>
//     );
// }

// function User ({ user }) {
//     const navigate = useNavigate();
//     return (
//         <div className="flex justify-between">
//             <div className="flex">
//                 <div className="rounded-full h-full w-12 bg-slate-200 flex justify-center mt-1 mr-2">
//                     <div className="flex flex-col justify-center h-full text-xl">
//                         {user.firstName[0]}
//                     </div>
//                 </div>
//                 <div className="flex flex-col justify-center h-full">
//                     <div>
//                         {user.firstName} {user.lastName}
//                     </div>
//                 </div>
//             </div>

//             <div className="flex flex-col justify-center h-full">
//                 <Button
//                     onClick={() => navigate("/send", { state: { id: user._id, name: user.firstName } })}
//                     label="Send Money"
//                 />
//             </div>
//         </div>
//     );
// }


import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user =>  <User  key={user._id} user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                 e.preventDefault();
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}