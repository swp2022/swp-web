import React from 'react';
import axios from "axios";

const Auth = async () => {
  const code = new URL(window.location.href).searchParams.get("code");
    try{
      const  result = await axios.get(

      );
      const accesstoken  = result;
      window.lacalStorage.setItem('accesstolen', accesstoken);
    }
    catch(error){
      console.log("error", error);
    }
};

export default Auth;