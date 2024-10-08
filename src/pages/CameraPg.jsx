import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import NavBar from '../components/NavBar';

const CameraPg = ({setPhoto, setManualLocation, manualLocation}) => {
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
                <div className='flex min-h-screen bg-gray-950 justify-center p-0'>
                    <div className='w-4/5 items-center justify-center mt-2'>
                        <div className='overflow-hidden rounded-lg'>
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
                            <div className='flex flex-col -mt-20 justify-center items-center w-full'>
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
                                <div className='h-5'></div>
                            </div>
                        </div>
                        {isStreaming && 
                            <>
                                <div className='flex justify-center text-center items-center bg-gray-9 pt-2 pb-20'>
                                    <input 
                                        className='pl-4 text-md placeholder-gray-500 mr-5 h-16 text-gray-900 rounded-lg bg-gray-200 focus:outline-none focus:bg-gray-300 px-2 border-2 border-gray-500'
                                        placeholder="Don't Specify"
                                        value={manualLocation}
                                        onChange={(event) => setManualLocation(event.target.value)}
                                    ></input>
                                    <button
                                        className={`flex h-20 w-20 focus:outline-none ${buttonColor} border-4 border-zinc-400 rounded-2xl items-center justify-center`}
                                        onClick={capturePhoto}
                                    >
                                        <div className='h-16 w-16 opacity-100 border-4 border-zinc-500 rounded-xl' />
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
    setManualLocation: PropTypes.func.isRequired,
    manualLocation: PropTypes.string.isRequired,
}

export default CameraPg;
