import React from 'react';
import MainButton from "./MainButton";
import Toggle from "./Toggle";
import {useNavigate} from "react-router-dom";

export default function Sidebar() {
	const navigate = useNavigate();
	const handleOnclick = () => {
		navigate(`/write`);
	}
	return (
		<div className='w-full flex flex-col border-r border-r-gray-300 bg-red-50 p-5'>
			<div className='w-full flex justify-center'>
				<MainButton onclick={handleOnclick}/>
			</div>
			<div className='w-full flex mt-5 justify-center'>
				<Toggle/>
			</div>
		</div>
	);
}
