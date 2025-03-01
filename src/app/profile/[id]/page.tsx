"use client";
import React from "react";
import Link from "next/link";

export default function UserProfile({ params }: any) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
                    <div className="mt-4 inline-block px-4 py-2 bg-blue-100 rounded-lg">
                        <span className="text-sm text-gray-600">User ID:</span>
                        <span className="ml-2 font-medium text-blue-700">{params.id}</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                        <h2 className="text-lg font-medium text-gray-900 mb-3">User Information</h2>
                        <p className="text-sm text-gray-500">
                            Detailed user information will appear here when loaded from the database.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Link
                            href="/profile"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Back to Main Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}