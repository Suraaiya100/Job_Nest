import React, { useEffect, useRef, useState, useContext } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { JobCategories, JobLocations } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const AddJob = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('Dhaka');
    const [category, setCategory] = useState('Programming');
    const [level, setLevel] = useState('Beginner level');
    const [salary, setSalary] = useState('2500');
    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const { backendUrl, companyToken } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const description = quillRef.current.root.innerHTML;
            const { data } = await axios.post(
                backendUrl + '/api/company/post-job',
                { title, description, location, salary, category, level },
                { headers: { token: companyToken } }
            );
            if (data.success) {
                toast.success(data.message);
                setTitle('');
                setSalary(0)
                quillRef.current.root.innerHTML = '';
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message );
        }
    };

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow'
            });
        }
    }, []);

    return (
        <form onSubmit={onSubmitHandler} className="container p-8 flex flex-col w-full items-start gap-6">
            <div className="w-full max-w-xl">
                <p className="mb-2 font-medium text-gray-700">Job Title</p>
                <input
                    type="text"
                    placeholder="Type here"
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
            </div>
            <div className="w-full max-w-xl">
                <p className="mb-2 font-medium text-gray-700">Job Description</p>
                <div
                    ref={editorRef}
                    className="bg-white border border-gray-300 rounded min-h-[120px] p-2"
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
                <div className="flex-1">
                    <p className="mb-1 text-gray-700">Job Category</p>
                    <select
                        onChange={e => setCategory(e.target.value)}
                        value={category}
                        className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
                    >
                        {JobCategories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <p className="mb-1 text-gray-700">Job Location</p>
                    <select
                        onChange={e => setLocation(e.target.value)}
                        value={location}
                        className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
                    >
                        {JobLocations.map((loc, index) => (
                            <option key={index} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <p className="mb-1 text-gray-700">Job Level</p>
                    <select
                        onChange={e => setLevel(e.target.value)}
                        value={level}
                        className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none"
                    >
                        <option value="Beginner level">Beginner level</option>
                        <option value="Intermediate level">Intermediate level</option>
                        <option value="Senior level">Senior level</option>
                    </select>
                </div>
            </div>
            <div className="w-full max-w-xl">
                <p className="mb-1 text-gray-700">Job Salary</p>
                <input
                    onChange={e => setSalary(e.target.value)}
                    type="number"
                    placeholder="2500"
                    value={salary}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                />
            </div>
            <button
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                ADD
            </button>
        </form>
    );
};

export default AddJob;