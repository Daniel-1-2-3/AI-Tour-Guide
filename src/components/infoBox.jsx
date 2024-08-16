import PropTypes from 'prop-types'

const InfoBox = (info='') => {
  return (
    <div className='bg-white'>
      <p>HELLO</p>
    </div>
  )
}

InfoBox.propTypes = {
    info: PropTypes.string.isRequired
}
export default InfoBox
