import '../styles/index.css'
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const _s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
const _uuid = () => {
    return _s4() + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + _s4() + _s4();
}

function HomePage() {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar/>
        <div className="h-[100vh] px-6 py-4">
            <h1 className="m-0 text-4xl font-extrabold">Politics</h1>
            <div className="flex flex-rol gap-6 mt-2">
                <div className="flex flex-col w-1/2 ">
                    <p className=' border-lefts pl-2'>LATEST HEADLINES</p>
                    <img src='https://fakewebnew.vercel.app/img/fake21.png' className='m-0 w-[750px] h-[500px] self-center' />
                    <p className='text-2xl font-bold my-2 hover:underline underline-offset-1'
                        onClick={() => navigate(`/news/1`)} 
                    >
                        Donald Trump was arrested for drunk driving
                    </p>
                    <Divider/>
                    <p className='font-normal hover:underline underline-offset-1' onClick={() => navigate(`/news/2`)}>Agent's swift action stopped gunman getting line of sight to Trump, Secret Service says</p>
                    <Divider/>
                    <p className='font-normal hover:underline underline-offset-1' onClick={() => navigate(`/news/3`)}>Rumors of Kamala Harris's Alleged Alcohol Addiction Dismissed as Baseless by White House</p>
                </div>
                <div className="flex flex-col w-1/4">
                    <p className='font-semibold border-lefts pl-2 h-6'>ANALYSIS</p>
                    <img src='https://fakewebnew.vercel.app/img/fake9.png' className='m-0 w-[360px] h-[300px]' />
                    <p className='text-2xl font-bold my-2 hover:underline underline-offset-1'>Cuba hit by second nationwide blackout amid worsening energy crisis</p>
                    <Divider/>
                    <p className='font-normal hover:underline underline-offset-1'>Lawmakers face jam-packed agenda after elections with government funding and debt limit on the horizon</p>
                    <Divider/>
                    <p className='font-normal hover:underline underline-offset-1'>Huge fundraising powers Democrats’ hopes to flip the House</p>
                    <Divider/>
                    <p className='font-normal hover:underline underline-offset-1'>China Airlines Launches Chiikawa Dessert Line in Partnership with WooTEA</p>
                    <Divider/>
                    <p className='font-normal hover:underline underline-offset-1'>Taiwanese Streamer Roger Sparks Controversy with insulting Comment</p>
                </div>
                <div className="flex flex-col w-1/4">
                    <p className='font-semibold border-lefts pl-2 h-6'>LATEST VIDEOS</p>
                    <img src='https://fakewebnew.vercel.app/img/fake20.png' className='m-0 w-[360px] h-[360px]' />
                    <p className='text-2xl font-bold my-2 hover:underline underline-offset-1' onClick={() => navigate(`/news/5`)}>Donald Trump and Elon Musk Share Stage in Surprise Dance Moment at Tech Conference</p>
                    
                    <img src='https://fakewebnew.vercel.app/img/fake5.png' className='m-0 mt-3 w-[360px] h-[300px]' />
                    <p className='text-2xl font-bold my-2 hover:underline underline-offset-1'>President Biden Considers Loosening Tobacco Regulations Amid Industry Pressure</p>

                </div>
            </div>
        </div>
        </div>
    );
  }
  
export default HomePage;

