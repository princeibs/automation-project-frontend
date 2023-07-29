import React from 'react'
import { useParams } from 'react-router-dom'

const StaffDetails = () => {
    const {id} = useParams()
    // const id = 999
  return (
    <div>StaffDetails - {id}</div>
  )
}

export default StaffDetails