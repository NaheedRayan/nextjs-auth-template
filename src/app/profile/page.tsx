"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define the user interface to fix TypeScript errors
interface UserDetails {
    _id: string;
    username?: string;
    email?: string;
    [key: string]: any; // Allow for other properties that might be returned
}

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    const logout = async () => {
        try {
            setLoading(true);
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getUserDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/users/me');
            console.log(res.data);
            setData(res.data.data._id);
            setUserDetails(res.data.data);
        } catch (error: any) {
            toast.error("Failed to get user details");
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Manage your account details
                    </p>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    {data === 'nothing' ? (
                        <div className="text-center text-gray-500">
                            <p>Click the button below to load your profile information</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-600">User ID:</span>
                                <Link
                                    href={`/profile/${data}`}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                                >
                                    {data}
                                </Link>
                            </div>

                            {userDetails && (
                                <>
                                    {userDetails.username && (
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-600">Username:</span>
                                            <span className="text-sm text-gray-900">{userDetails.username}</span>
                                        </div>
                                    )}
                                    {userDetails.email && (
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-600">Email:</span>
                                            <span className="text-sm text-gray-900">{userDetails.email}</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <button
                        onClick={getUserDetails}
                        disabled={loading}
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
                    >
                        {loading ? "Loading..." : "Load Profile Information"}
                    </button>

                    <button
                        onClick={logout}
                        disabled={loading}
                        className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-200"
                    >
                        {loading ? "Processing..." : "Logout"}
                    </button>
                </div>
            </div>
        </div>
    );
}