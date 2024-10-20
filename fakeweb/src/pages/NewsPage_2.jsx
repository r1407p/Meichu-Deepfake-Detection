import '../styles/index.css'
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

function NewsPage() {
    const navigate = useNavigate();
    return (
        <div><Navbar/>
        <div className="h-[100vh] px-6 py-4">
            <h1 className="m-0 text-4xl font-extrabold">Agent's swift action stopped gunman getting line of sight to Trump, Secret Service says</h1>
            <div className='flex flex-row  gap-3'>
                <img src='/img/man.jpg' className='h-12 w-12 my-4 rounded-full' />
                <div className='flex flex-col'>
                    <p className='mx-2 mb-0'>By Sam Nickson, CNN</p>
                    <p className='mx-2 mt-0 text-gray-500'>3 minute read. Published 5:35 PM EDT, Fri October 18, 2024</p>
                </div>
            </div>
            <div className="flex flex-rol gap-8 mt-2">
                <div className="flex flex-col w-2/3 ">
                    <img src='https://fakewebnew.vercel.app/img/real.jpg' className='m-0 w-[800px] h-[500px]  self-center' />
                    <p className='mt-2 mb-0 text-gray-500 self-center'>Photo with Donald Trump and US flag</p>
                    <Divider/>
                        <p>
                        Donald Trump was the target of an apparent assassination attempt on Sunday, a mere two months after the Republican presidential nominee was shot in the ear at a rally in Butler.
                        <br/> <br/>
                        There were no bullets fired by the suspect in Sunday's incident, thanks to what the Secret Service has labelled as a "hyper vigilant" agent who spotted a gun muzzle poking out from bushes at Trump's Florida golf course.
                        <br/> <br/>
                        The suspect, Ryan Wesley Routh, faced court today and was charged with federal gun crimes. He could potentially face more charges.
                        </p>
                        <img src='https://fakewebnew.vercel.app/img/real2.jpg' className='m-0 w-[800px] h-[500px]  self-center' />
                        <p className='mt-2 mb-0 text-gray-500 self-center'>Injured Trump was escorted to hospital</p>
                        <p>The FBI is investigating Routh's social media accounts, which show a man with a strong focus on the war in Ukraine. The 58-year-old also has a criminal history dating back to the 1990s.
                        <br/> <br/>
                        In his first public comments since the most recent incident, Trump described hearing "four or five shots" in a live event on X on Monday evening. "The Secret Service did a great job," he said, blaming "political foes" for "rhetoric" that preceded the shooting.
                        <br/> <br/>
                        There have been bi-partisan calls to better protect presidential candidates after this second disturbing incident in a matter of weeks. And there still 49 days until the presidential election.
                        <br/> <br/>
                        We are wrapping up our live coverage, but we have a host of further reading and videos on the topic.
                        </p>
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