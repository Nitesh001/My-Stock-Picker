import React from "react"
import { ListGroup } from "react-bootstrap"

const PickerList:React.FC<{list: any[], onClick: any}> = ({list, onClick}) => {

  const finalList = () => {
    return <ListGroup>
      {
        list.map((elem: any) => {
          return <ListGroup.Item action key={elem["key"]} onClick={()=>onClick(elem["key"])}>{elem["value"]}</ListGroup.Item>
        })
      }
    </ListGroup>
  }

  return (
    <>
      {finalList()}
    </>
  )
}

export default PickerList;