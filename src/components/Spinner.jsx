import ClipLoader from 'react-spinners/ClipLoader'
import PropTypes from 'prop-types'

const Spinner = () => {
    const override = {
            display: 'block',
    }

    return (
        <ClipLoader 
            color = '#4338ca'
            loading={true}
            cssOverride={override}
            size={50}
        />
    )
}

Spinner.propTypes  = {
    loading: PropTypes.bool,
}


export default Spinner
