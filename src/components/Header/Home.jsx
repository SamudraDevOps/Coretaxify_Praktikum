import React, { useEffect, useState, useRef } from 'react'
import img1 from '../../assets/images/BatasWaktuPelaporanSPT.png'
import img2 from '../../assets/images/BatasWaktuPembayaranSPT.png'
import img3 from '../../assets/images/Faktur07dan08TidakDapatDikreditkanolehPenerimaPajakMasukan.png'
import img4 from '../../assets/images/KebijakanSanksiAdministratifSesuaiUUKUP.png'
import img5 from '../../assets/images/KetentuanPembulatanPadaCoretaxDJP.png'


const images = [img1, img2, img3, img4, img5];

const Home = () => {
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);

    // Auto slide
    useEffect(() => {
        startAutoSlide();
        return () => {
            stopAutoSlide();
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
        // eslint-disable-next-line
    }, [current]);

    const startAutoSlide = () => {
        stopAutoSlide();
        intervalRef.current = setInterval(() => {
            handleNext();
        }, 3000);
    };

    const stopAutoSlide = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const handlePrev = () => {
        setPrev(current);
        setCurrent((prevIdx) => (prevIdx - 1 + images.length) % images.length);
        setIsSliding(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsSliding(false), 600);
        startAutoSlide();
    };

    const handleNext = () => {
        setPrev(current);
        setCurrent((prevIdx) => (prevIdx + 1) % images.length);
        setIsSliding(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsSliding(false), 600);
        startAutoSlide();
    };

    const handlePagination = (idx) => {
        if (idx === current) return;
        setPrev(current);
        setCurrent(idx);
        setIsSliding(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsSliding(false), 600);
        startAutoSlide();
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
            {/* Arrows */}
            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-blue-800 hover:bg-opacity-100 rounded-full shadow p-2 z-10 group"
                aria-label="Previous"
            >
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                    <path
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                        className="transition-colors duration-200 group-hover:stroke-white"
                    />
                </svg>
            </button>
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-blue-800 hover:bg-opacity-100 rounded-full shadow p-2 z-10 group"
                aria-label="Next"
            >
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                    <path
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                        className="transition-colors duration-200 group-hover:stroke-white"
                    />
                </svg>
            </button>
            {/* Image */}
            <img
                src={images[current]}
                alt="Banner"
                className="mx-auto h-[550px] object-contain transition-all duration-700"
                style={{ maxWidth: '100vw' }}
            />
            {/* Pagination */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => handlePagination(idx)}
                        className={`w-4 h-4 rounded-full border-2 ${current === idx ? 'bg-blue-700 border-blue-700' : 'bg-white border-gray-400'} transition`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;
