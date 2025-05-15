import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCalendarAlt, FaFilter, FaSearch, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";


const CreateKonsepPasal = () => {
    const [activeTab, setActiveTab] = useState("induk");
    const [showHeaderInduk, setShowHeaderInduk] = useState(false);

    const [showHeadera1, setShowHeadera1] = useState(false);
    const [showHeadera2, setShowHeadera2] = useState(false);
    const [showHeaderb1, setShowHeaderb1] = useState(false);
    const [showHeaderb2, setShowHeaderb2] = useState(false);
    const [showHeaderb3, setShowHeaderb3] = useState(false);
    const [showHeaderc, setShowHeaderc] = useState(false);

    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-auto p-3 bg-white rounded-md h-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-light text-yellow-500 mt-4">PEMOTONGAN PPH PASAL 21 DAN ATAU PASAL 26</h2>
                </div>
            </div>
        </div>
    )
}

export default CreateKonsepPasal
