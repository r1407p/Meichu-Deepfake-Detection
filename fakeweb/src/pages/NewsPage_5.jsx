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
            <h1 className="m-0 text-4xl font-extrabold">Donald Trump and Elon Musk Share Stage in Surprise Dance Moment at Tech Conference</h1>
            <div className='flex flex-row  gap-3'>
                <img src='/img/man.jpg' className='h-12 w-12 my-4 rounded-full' />
                <div className='flex flex-col'>
                    <p className='mx-2 mb-0'>By Sam Nickson, CNN</p>
                    <p className='mx-2 mt-0 text-gray-500'>3 minute read. Published 5:35 PM EDT, Fri October 18, 2024</p>
                </div>
            </div>
            <div className="flex flex-rol gap-8 mt-2">
                <div className="flex flex-col w-2/3 ">
                    <video width="1024" height="768" controls >
                        <source src="https://fakewebnew.vercel.app/video/fake.mp4" type="video/mp4"/>
                    </video>
                    <p className='mt-2 mb-0 text-gray-500 self-center'>Dance clip of Donald Trump with Elon Musk go viral on Internet</p>
                    <Divider/>
                        <p>
                        In an unexpected and lighthearted moment that quickly went viral, former President Donald Trump and tech billionaire Elon Musk were seen dancing together at a high-profile technology conference in Miami. The two influential figures were both attending the "Future of Innovation" summit, where Musk was delivering a keynote speech on the future of space travel and artificial intelligence.
                        <br/><br/>
                        The surprise moment occurred after Trump, who was a guest speaker at the event, joined Musk on stage for a Q&A session. At the end of the session, upbeat music played over the speakers, prompting Musk to make a playful comment about Trump’s well-known "YMCA" dance from past rallies. In a spontaneous move, Trump began dancing, and to the crowd’s delight, Musk joined in.
                        <br/><br/>
                        The brief dance sparked a wave of laughter and applause from the audience, with attendees capturing the moment on their phones and quickly sharing it on social media. The sight of Trump and Musk dancing together became an instant meme, with many commenting on the unusual yet amusing pairing.
                        <br/><br/>
                        While the dance was brief, it added a surprising twist to an event otherwise focused on serious topics like AI regulation, space exploration, and the future of electric vehicles. Both Trump and Musk took the moment in stride, with Trump later joking, "We could take this act on the road," while Musk tweeted, "Who knew dancing could bring people together?"
                        <br/><br/>
                        Though the moment was playful, it showcased the strange intersection of politics and technology in today’s world, where even the most serious leaders can let loose on stage. The viral clip has since dominated headlines, overshadowing many of the summit’s more technical discussions.
                        </p>
                </div>
                <div className="flex flex-col w-1/3">
                    <p className='font-semibold border-lefts mt-0 pl-2 h-6'>MORE FROM CNN</p>
                    <div className='flex flex-row gap-2 my-2'>
                        <img src='https://fakewebnew.vercel.app/img/fake9_2.jpg' className='m-0 w-[180px] h-[180px]' />
                        <p className='my-2 hover:underline underline-offset-1' onClick={() => navigate(`/news/3`)}>Rumors of Kamala Harris's Alleged Alcohol Addiction Dismissed as Baseless by White House</p>
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