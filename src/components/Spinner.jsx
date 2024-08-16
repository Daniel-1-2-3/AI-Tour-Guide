import ClipLoader from 'react-spinners/ClipLoader'
import PropTypes from 'prop-types'

const Spinner = () => {
    const override = {
            display: 'block',
            margin: '50px auto'
    }

    return (
        <ClipLoader 
            color = '#4338ca'
            loading={true}
            cssOverride={override}
            size={150}
        />
    )
}

Spinner.propTypes  = {
    loading: PropTypes.bool,
}


export default Spinner
