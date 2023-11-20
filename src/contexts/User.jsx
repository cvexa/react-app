import {createContext, useContext, useState} from "react";
import {getUser, setUser} from '../utils/user';

const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }) {
    const [user, setUserToState] = useState(getUser());

    return (
        <UserContext.Provider
            value={{
                user,
                setUser: (user) => {
                    localStorage.clear();
                    setUser(user);
                    setUserToState(user);
                },
            }}
        >
            {children}
        </UserContext.Provider>
    );
}