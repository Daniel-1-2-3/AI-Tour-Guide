import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'

const NavBar = ({cameraPage=true}) => {
    const camLinkColor = cameraPage ? 'bg-black' : 'bg-gray-900';
    const infoLinkColor = cameraPage ? 'bg-gray-900' : 'bg-black';
    return (
        <div className='w-full flex'>
            <Link to='/' className={`text-slate-200 ${camLinkColor} w-1/2 py-2 flex justify-center items-center`}>
                {!cameraPage && <FontAwesomeIcon icon={faArrowLeft} size="xs" className='mr-2'/>}
                <p className='font-mono text-md'>Camera</p>
            </Link>
            <Link to='/info' className={`text-slate-200 ${infoLinkColor} w-1/2 py-2 flex justify-center items-center`}>
                <p className='font-mono text-md'>Information</p>
                {cameraPage && <FontAwesomeIcon icon={faArrowRight} size="xs" className='ml-2'/>}
            </Link>
        </div>
    )
}
NavBar.propTypes = {
    cameraPage: PropTypes.bool,
    infoPage: PropTypes.bool,
}


export default NavBar
