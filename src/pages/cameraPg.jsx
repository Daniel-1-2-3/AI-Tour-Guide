import { useState, useEffect, useRef } from 'react';

const CameraPg = () => {
    const [buttonColor, setButtonColor] = useState('bg-gray-200')
    const videoRef = useRef(null);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        //runs once to start a stream, contained by videoRef.current.srcObject 
        const startVideoStream = async () => { 
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' } //user | environment
                });
                videoRef.current.srcObject = (videoRef.current) ? stream : null
            } catch (error) {
                window.alert(error)
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
            canvas.width = videoWidth;
            canvas.height = videoHeight;
            context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
            setPhoto(canvas.toDataURL('image/png'));
        }
        setTimeout(() => setButtonColor('bg-gray-200'), 200);
    };

    return (
        <div className='max-h-screen overflow-scroll'>
            <div className='flex min-h-screen bg-black justify-center p-0'>
                <div className='w-4/5 items-center justify-center mb-14 mt-5'>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className='w-full h-auto rounded-lg'
                        style={{ display: 'block' }}
                    ></video>
                    <div className='flex justify-center text-center items-center bg-black p-4'>
                        <button
                            className={`flex h-20 w-20 focus:outline-none ${buttonColor} border-4 border-zinc-400 rounded-3xl items-center justify-center`}
                            onClick={capturePhoto}
                        >
                            <div className='h-16 w-16 opacity-100 border-4 border-zinc-500 rounded-2xl' />
                        </button>
                    </div>
                </div>
            </div>
            
            <div className='w-full flex items-center justify-center bg-black'>
                {photo && <img className='rounded-2xl object-center w-3/4 mt-8' src={photo} alt="Captured Frame" />}
            </div>
        </div>
    );
};

export default CameraPg;
