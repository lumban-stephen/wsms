import React from 'react'
import PaperContainer from '../../components/MWSPaper'
import TableWSListEmpty from '../../components/MWSTableEmpty'

export default function MainTainWSEmpty() {
  return (
    <div>
      <PaperContainer>
        <TableWSListEmpty></TableWSListEmpty>
      </PaperContainer>
    </div>
  )
}