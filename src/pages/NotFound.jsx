import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-80">
				<h1 className="text-4xl font-bold mb-4">404</h1>
				<p className="text-gray-600 mb-4">Page Not Found</p>
				<button
					className="bg-brand text-white px-4 py-2 rounded hover:bg-red-700"
					onClick={() => navigate('/')}>
					Go to Home
				</button>
			</div>
		</div>
	);
}
