import React from 'react'
import Header from '../../components/dashboard/Header'
import Design from '../../components/dashboard/Design'

const Dashboard = () => {
  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <Design />
    </div>
  )
}

export default Dashboard