import React from "react"
import { ListGroup } from "react-bootstrap"

const PickerLoader = ({mssg = "loading..."}) => {
  return (
    <ListGroup><ListGroup.Item>{mssg}</ListGroup.Item></ListGroup>
  )
}

export default PickerLoader;