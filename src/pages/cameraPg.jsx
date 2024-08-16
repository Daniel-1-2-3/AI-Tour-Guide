import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import NavBar from '../components/NavBar';

const CameraPg = ({setPhoto}) => {
    const [buttonColor, setButtonColor] = useState('bg-gray-200')
    const videoRef = useRef(null);
    const [zoom, setZoom] = useState(1);
    const [isStreaming, setIsStreaming] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        //runs once to start a stream, contained by videoRef.current.srcObject 
        const startVideoStream = async () => { 
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' } //user | environment
                });
                if (videoRef.current){
                    //set up stream object
                    videoRef.current.srcObject = stream;
                    setIsStreaming(true);
                }
            } catch (error) {
                alert(error)
            }
        };
        startVideoStream();
        const currentVideoRef = videoRef.current;
        return () => {
            if (currentVideoRef && currentVideoRef.srcObject) {
                const stream = currentVideoRef.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const capturePhoto = () => {
        setButtonColor('bg-gray-400')
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (videoRef.current) {
            const { videoWidth, videoHeight } = videoRef.current;
            canvas.width = videoWidth * zoom;
            canvas.height = videoHeight * zoom;
            //draw the zoomed video frame onto the canvas
            //calculate crop area based on zoom level
            const cropWidth = videoWidth / (zoom);
            const cropHeight = videoHeight / (zoom);
            const cropX = (videoWidth - cropWidth) / 2;
            const cropY = (videoHeight - cropHeight) / 2;

            // Draw the zoomed area onto the canvas
            context.drawImage(
                videoRef.current,
                cropX, cropY, cropWidth, cropHeight,
                0, 0, canvas.width, canvas.height
            );
            setPhoto(canvas.toDataURL('image/png'));
            navigate('/info')
        }
        setTimeout(() => setButtonColor('bg-gray-200'), 200);
    };

    return (
        <>
            <NavBar cameraPage={true}/>
            <div className='max-h-screen overflow-hidden'>
                <div className='flex min-h-screen bg-black justify-center p-0'>
                    <div className='w-3/4 items-center justify-center mb-14 mt-5'>
                        <div className='overflow-hidden z-10'>
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className='w-full h-auto rounded-lg'
                                style={{ display: 'block',
                                        transform: `scale(${zoom})`,
                                        transformOrigin: 'center center'}}
                            >
                            </video>
                        </div>
                        {isStreaming && 
                            <>
                                <div className='flex justify-center absolute left-1/2 transform -translate-x-1/2 bottom-36 w-full'>
                                    <input type="range" id="zoom-slider" min={1} max={3} step={0.025} value={zoom} onChange={(event) => setZoom(event.target.value)} 
                                            style={{
                                                WebkitAppearance: 'none', /* Remove default appearance on WebKit browsers */
                                                appearance: 'none',
                                                width: '50%', 
                                                height: '15px',
                                                background: 'gray', 
                                                opacity: '70%',
                                                borderRadius: '5px', 
                                                scale: '1.3',
                                            }}
                                    />
                                </div>
                                <div className='flex justify-center text-center items-center bg-black p-4'>
                                    <button
                                        className={`flex h-20 w-20 focus:outline-none ${buttonColor} border-4 border-zinc-400 rounded-3xl items-center justify-center`}
                                        onClick={capturePhoto}
                                    >
                                        <div className='h-16 w-16 opacity-100 border-4 border-zinc-500 rounded-2xl' />
                                    </button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

CameraPg.propTypes = {
    setPhoto: PropTypes.func.isRequired,
}

export default CameraPg;
