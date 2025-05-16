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
                <div className="w-full p-2 ml-0 border-t text-lg">
                    <Tabs defaultValue='induk' onValueChange={(val) => setActiveTab(val)} >
                        <TabsList className="flex justify-start gap-2 text-blue-700 text-lg">
                            <TabsTrigger value="induk">Induk</TabsTrigger>
                            <TabsTrigger value="a-1">A-1</TabsTrigger>
                            <TabsTrigger value="a-2">A-2</TabsTrigger>
                            <TabsTrigger value="b-1">B-1</TabsTrigger>
                            <TabsTrigger value="b-2">B-2</TabsTrigger>
                            <TabsTrigger value="b-3">B-3</TabsTrigger>
                            <TabsTrigger value="c">C</TabsTrigger>
                        </TabsList>
                        <TabsContent value="induk">
                            <div className="mt-4">
                                <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full" onClick={() => setShowHeaderInduk(!showHeaderInduk)}>
                                    <h3 className='text-lg font-semibold'>Header</h3>
                                    {showHeaderInduk ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {showHeaderInduk && (
                                    <div className="border rounded-md p-4 mb-2 cursor-pointer flex justify-between items-center bg-gray-100 w-full">
                                        <h3 className='text-lg font-semibold'>Header</h3>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default CreateKonsepPasal
