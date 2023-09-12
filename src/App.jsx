import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import {Outlet} from "react-router-dom";
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
	return (
		<div className='flex flex-col h-screen'>
			<header>
				<Header/>
			</header>
			<div className='flex grow'>
				<div className='w-[300px] flex'>
					<Sidebar/>
				</div>
				<QueryClientProvider client={queryClient}>
					<main className='grow'>
						<Outlet/>
					</main>
				</QueryClientProvider>
			</div>
		</div>
	);
}

export default App;
