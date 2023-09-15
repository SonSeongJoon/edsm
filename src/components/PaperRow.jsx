import React from 'react';
import {useNavigate} from "react-router-dom";

export default function PaperRow({product}) {
	const {id, title, file, date, state} = product;
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/detail/${id}`, { state: { product } });
	}
	return (
		<tr key={product.id}  className='cursor-pointer hover:bg-gray-100'>
			<td className="px-6 py-4 whitespace-nowrap hover:underline" onClick={handleClick}>{title}</td>
			<td className="px-6 py-4 whitespace-nowrap">{file}</td>
			<td className="px-6 py-4 whitespace-nowrap">{date}</td>
			<td className="px-6 py-4 whitespace-nowrap">{state}</td>
		</tr>
	);
}