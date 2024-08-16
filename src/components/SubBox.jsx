import PropTypes from 'prop-types'
import { useState } from 'react'

const SubBox = ({subtitle, text}) => {
  return (
    <div className='w-4/5 text-center justify-center bg-white mt-6 rounded-2xl'>
       <p className='pt-5 text-indigo-900 font-semibold'>{subtitle}</p>
       <p className='p-2'>{text}</p>
    </div>
  )
}
SubBox.propTypes = {
    subtitle: PropTypes.string,
    text: PropTypes.string,
}

export default SubBox
