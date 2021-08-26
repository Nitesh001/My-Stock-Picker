import React from "react"
import { Alert } from "react-bootstrap"

const ErrorMessage:React.FC<{mssg ?:string, onClose?: any}> = ({mssg = "Sorry! Please try again. We don't have any record matching your criteria", onClose}) => {
  return (
    <Alert variant="info" onClose={onClose} dismissible>
      <p>
        {mssg}
      </p>
    </Alert>
  )
}

export default ErrorMessage;