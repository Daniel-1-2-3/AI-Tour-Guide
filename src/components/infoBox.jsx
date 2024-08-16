import PropTypes from 'prop-types'

const InfoBox = ({info=''}) => {
  const information = info
  console.log('information idplay', information)
  return (
    <div className='bg-white'>
      <p>{information}</p>
    </div>
  )
}

InfoBox.propTypes = {
    info: PropTypes.string,
}
export default InfoBox
