import React from 'react'
import MyApiTable from '@/components/MyApiTable'
import Programs from '@/components/Programs'

const page = () => {
  return (
    <div>
      <MyApiTable universities={[]} />
      <Programs />
    </div>
  )
}

export default page;
