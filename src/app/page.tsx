import MyApiTable from '@/components/MyApiTable'
import Programs from '@/components/Programs'
import React from 'react'

const page = () => {
  const universities = [
    { id: 1, country: 'USA', offer: 'CD', team: 'DevOps', appId: 'app123' },
    { id: 2, country: 'UK', offer: 'FD', team: 'SecOps', appId: 'app456' }
  ]; // sample data format, you can replace with actual

  return (
    <div>
      <MyApiTable universities={universities} />
      <Programs />
    </div>
  )
}

export default page;
