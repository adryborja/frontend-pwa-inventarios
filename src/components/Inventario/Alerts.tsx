import React, {FC} from "react";


interface AlertProps {
    message: string;
    type: "error" | "warning" | "info";
  }
  
  const alertClassMap = {
    error: "alert-danger",
    warning: "alert-warning",
    info: "alert-info",
  };
  
  export const Alert: FC<AlertProps> = ({ message, type }) => {
    return message ? <div className={`alert ${alertClassMap[type]}`}>{message}</div> : null;
  };