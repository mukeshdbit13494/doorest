import { CircularProgress } from "@material-ui/core";
import Axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import UserSignin from "../pages/user/signin";
import PartnerSignin from "../pages/partner/signin";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [partner, setPartner] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(async () => {
    const userCookie = Cookies.getJSON("_dUserToken");
    const partnerCookie = Cookies.getJSON("_dPartnerToken");
    if (userCookie !== "" && userCookie != null) {
      const { data: user } = await Axios.get("/api/user", {
        headers: {
          Authorization: `${userCookie.token}`,
        },
      });
      if (user.status) {
        setUser(user.data);
        setToken(userCookie.token);
      }
    }
    if (partnerCookie !== "" && partnerCookie != null) {
      const { data: partner } = await Axios.get("/api/partner", {
        headers: {
          Authorization: `${partnerCookie.token}`,
        },
      });
      if (partner.status) {
        setPartner(partner.data);
        setToken(partnerCookie.token);
      }
    }
  }, []);

  const setPartnerData = (data) => {
    setPartner(data);
  };

  const setUserData = async (data) => {
    setUser(data);
  };
  const setTokenData = (token) => {
    setToken(token);
  };

  const signout = (userType) => {
    switch (userType.toLowerCase()) {
      case "user":
        Cookies.remove("_dUserToken");
        setUser(null);
        break;
      case "partner":
        Cookies.remove("_dPartnerToken");
        setPartner(null);
        break;
      default:
        break;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticatedUser: !!user,
        user,
        isAuthenticatedPartner: !!partner,
        partner,
        token,
        signout,
        setTokenData,
        setPartnerData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const UserProtectedPage = ({ children }) => {
  const { isAuthenticatedUser } = useAuth();
  if (!isAuthenticatedUser) {
    return <UserSignin />;
  } else {
    return children;
  }
};

export const PartnerProtectedPage = ({ children }) => {
  const { isAuthenticatedPartner } = useAuth();
  if (!isAuthenticatedPartner) {
    return <PartnerSignin />;
  } else {
    return children;
  }
};
