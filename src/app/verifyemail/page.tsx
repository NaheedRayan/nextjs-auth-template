"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const verifyUserEmail = async () => {
        try {
            setLoading(true);
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        } catch (error) {
            setError(true);
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            } else {
                console.log(error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-gray-900">Email Verification</h1>

                {loading && (
                    <div className="p-4">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="h-12 w-12 bg-blue-200 rounded-full mb-4"></div>
                            <div className="text-sm text-gray-600">Verifying your email...</div>
                        </div>
                    </div>
                )}

                {verified && (
                    <div className="space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-medium text-gray-900">Email Verified Successfully</h2>
                        <p className="text-sm text-gray-600">Your email has been verified. You can now log in to your account.</p>
                        <Link
                            href="/login"
                            className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Go to Login
                        </Link>
                    </div>
                )}

                {error && (
                    <div className="space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-medium text-gray-900">Verification Failed</h2>
                        <p className="text-sm text-gray-600">We couldn't verify your email. The verification link may have expired or is invalid.</p>
                        <div className="flex flex-col space-y-2">
                            <Link
                                href="/login"
                                className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Go to Login
                            </Link>
                            <Link
                                href="/signup"
                                className="inline-block px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Create New Account
                            </Link>
                        </div>
                    </div>
                )}

                {!loading && !verified && !error && token && (
                    <p className="text-sm text-gray-600">Verifying your email address...</p>
                )}

                {!token && !loading && (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">No verification token found. Please check your email for the verification link.</p>
                        <Link
                            href="/login"
                            className="inline-block px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Return to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}