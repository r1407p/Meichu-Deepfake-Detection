import '../styles/index.css'
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

function NewsPage() {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar/>
        <div className="h-[100vh] px-6 py-4">
            <h1 className="m-0 text-4xl font-extrabold">Donald Trump was arrested for drunk driving</h1>
            <div className='flex flex-row  gap-3'>
                <img src='/img/man.jpg' className='h-12 w-12 my-4 rounded-full' />
                <div className='flex flex-col'>
                    <p className='mx-2 mb-0'>By Sam Nickson, CNN</p>
                    <p className='mx-2 mt-0 text-gray-500'>3 minute read. Published 5:35 PM EDT, Fri October 18, 2024</p>
                </div>
            </div>
            <div className="flex flex-rol gap-8 mt-2">
                <div className="flex flex-col w-2/3 ">
                    <img src='https://fakewebnew.vercel.app/img/fake21.png' className='m-0 w-[800px] h-[500px] self-center'/>
                    <p className='mt-2 mb-0 text-gray-500 self-center'>Donald Trump was arrested on the road yesterday</p>
                    <Divider/>
                    <p>In a shocking turn of events, former U.S. President Donald Trump was arrested late last night for driving under the influence (DUI) in Palm Beach, Florida. Authorities confirmed that Trump was pulled over by local police after reports of erratic driving near his Mar-a-Lago resort.</p>
                    <p>According to the Palm Beach Police Department, officers conducted a routine traffic stop, during which Trump allegedly failed a field sobriety test. He was then taken into custody. Sources close to the situation revealed that Trump was cooperative with law enforcement, but appeared visibly impaired at the time of the arrest.</p>
                    <img src='https://fakewebnew.vercel.app/img/fake1.png' className='m-0 w-[500px] h-[750px]  self-center' />
                    <p className='mt-2 mb-0 text-gray-500 self-center'>Donald Trump was released by Florida police</p>
                    <p>Political analysts are speculating on the potential fallout from the arrest, given Trump’s polarizing public image and his continued involvement in politics. Some supporters have already taken to social media to defend the former president, while critics have raised concerns about the example set by such an incident.</p>
                    <p>As more details emerge, this arrest marks yet another chapter in the ongoing public and legal scrutiny surrounding Donald Trump. More updates will follow as the story develops.</p>
                    <img src='https://fakewebnew.vercel.app/img/fake2.png' className='m-0 w-[500px] h-[750px] self-center' />
                    <p className='mt-2 mb-0 text-gray-500 self-center'>Donald Trump expressed madness on press</p>
                    <p>This unexpected incident comes as the former president continues to navigate legal challenges on multiple fronts. Trump was released on bail early this morning and is expected to address the media regarding the situation. His legal team has yet to issue an official statement, but sources close to the family have expressed concern over the circumstances.</p>
                </div>
                <div className="flex flex-col w-1/3">
                    <p className='font-semibold border-lefts mt-0 pl-2 h-6'>MORE FROM CNN</p>
                    <div className='flex flex-row gap-2 my-2'>
                        <img src='https://fakewebnew.vercel.app/img/fake20.png' className='m-0 w-[180px] h-[180px]' />
                        <p className='my-2 hover:underline underline-offset-1' onClick={() => navigate(`/news/5`)}>Donald Trump and Elon Musk Share Stage in Surprise Dance Moment at Tech Conference</p>
                    </div>
                    <Divider/>
                    <div className='flex flex-row gap-2 my-2'>
                        <img src='https://fakewebnew.vercel.app/img/fake8.jpg' className='m-0 w-[180px] h-[180px]' />
                        <p className='my-2 hover:underline underline-offset-1'>READ: Growing Support for Donald Trump Among Black Voters Sparks Debate</p>
                    </div>
                    <Divider/>
                    <div className='flex flex-row gap-2 my-2'>
                        <img src='https://fakewebnew.vercel.app/img/fake3.png' className='m-0 w-[180px] h-[180px]' />
                        <p className='my-2 hover:underline underline-offset-1'>Federal judge rejects Trump’s bid to delay release of special counsel documents in 2020 election subversion case</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
  }
  
export default NewsPage;