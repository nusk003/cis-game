import { useStore } from "@src/store";
import { useCallback, useEffect, useState } from "react";
import { UserService, User } from "@src/utils/service";

export const useAuth = () => {
  const userService = UserService.instance;
  const { setLoggedIn, loggedIn } = useStore(
    useCallback(({ loggedIn, setLoggedIn }) => ({ loggedIn, setLoggedIn }), [])
  );

  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  const login = useCallback(
    async (email: string, password: string) => {
      await userService.login(email, password);
      setLoggedIn(true);
    },
    [setLoggedIn]
  );

  const getCurrentUser = useCallback(async () => {
    const user = await userService.getCurrentUser();
    setCurrentUser(user as User);
    setLoggedIn(true);
  }, [setLoggedIn, setCurrentUser, userService.getCurrentUser]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const registerUser = useCallback(
    async (name: string, email: string, password: string) => {
      await userService.registerUser(name, email, password);
    },
    []
  );

  const updateUser = useCallback(async (name: string, email: string) => {
    await userService.updateUser(name, email);
  }, []);

  const verifyUser = useCallback(
    async (code: string, email: string, password: string) => {
      await userService.verifyUser(code, async () => {
        await login(email, password);
      });
    },
    [login]
  );

  const logout = useCallback(async () => {
    await userService.logout();
    setLoggedIn(false);
  }, [setLoggedIn]);

  return {
    login,
    registerUser,
    verifyUser,
    logout,
    currentUser,
    loggedIn,
    updateUser,
  };
};
