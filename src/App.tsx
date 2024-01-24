import React, { useState } from 'react';
import { AudioManager } from "./components/AudioManager";
import LoginForm from "./components/LoginForm";
import Transcript from "./components/Transcript";
import { useTranscriber } from "./hooks/useTranscriber";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const transcriber = useTranscriber();

    const handleAuthentication = () => {
        setIsAuthenticated(true);
    };

    return (
        <div className='flex justify-center items-center min-h-screen'>
        {
            isAuthenticated ? (
                <div className='container flex flex-col justify-center items-center'>
                    <h1 className='text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl text-center'>
                        Audio Transcription
                    </h1>
                    <p className='mt-3 mb-5 px-4 text-center text-1xl font-semibold tracking-tight text-slate-900'>
                        Upload audio file to transcribe. Only accepts .m4a, .mp3 and .wav files.
                    </p>
                    <AudioManager transcriber={transcriber} />
                    <Transcript transcribedData={transcriber.output} />
                </div>
            ) : (
                <LoginForm onAuthentication={handleAuthentication} />
            )
        }
        </div>
    );
}

export default App;
