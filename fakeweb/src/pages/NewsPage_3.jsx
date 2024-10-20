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
            <h1 className="m-0 text-4xl font-extrabold">Rumors of Kamala Harris's Alleged Alcohol Addiction Dismissed as Baseless by White House</h1>
            <div className='flex flex-row  gap-3'>
                <img src='/img/man.jpg' className='h-12 w-12 my-4 rounded-full' />
                <div className='flex flex-col'>
                    <p className='mx-2 mb-0'>By Sam Nickson, CNN</p>
                    <p className='mx-2 mt-0 text-gray-500'>3 minute read. Published 5:35 PM EDT, Fri October 18, 2024</p>
                </div>
            </div>
            <div className="flex flex-rol gap-8 mt-2">
                <div className="flex flex-col w-2/3 ">
                <img src='https://fakewebnew.vercel.app/img/fake9.jpg' className='m-0 w-[700px] h-[500px]  self-center' />
                <p className='mt-2 mb-0 text-gray-500 self-center'>Photo with Donald Trump and US flag</p>
                    <Divider/>
                        <p>The White House has swiftly dismissed recent rumors suggesting that Vice President Kamala Harris is struggling with alcohol addiction, calling the claims "entirely baseless" and "fabricated." The rumors, which began circulating on social media and various online forums, have garnered attention in recent days, despite the lack of credible sources or evidence to support the allegations.</p>
                        <p>A spokesperson for the vice president addressed the rumors directly, stating, "Vice President Harris is fully committed to her responsibilities and her health. These rumors are not only false but represent a clear attempt to smear her character. We urge the public to be cautious of misinformation campaigns."</p>
                        <img src='https://fakewebnew.vercel.app/img/fake7.png' className='m-0 self-center w-[450px] h-[700px] ' />
                        <p className='mt-2 mb-0 text-gray-500 self-center'>Rumor that Harris has undergone alcohol abstinence</p>
                        <p>The rumors appear to have originated from anonymous online posts, which quickly spread across platforms. Some political commentators have speculated that this is part of a larger disinformation campaign aimed at undermining Harris’s credibility as she continues to play a key role in the Biden administration.</p>
                        <p>Many public figures and allies of Harris have come to her defense, pointing out that these kinds of personal attacks are often used to discredit prominent women in politics. "It’s unfortunate that baseless rumors like this are used to distract from the important work Vice President Harris is doing," said California Congresswoman Barbara Lee. "This is clearly a tactic to detract from her leadership and accomplishments."</p>
                        <img src='https://fakewebnew.vercel.app/img/fake8.png' className='m-0 self-center w-[450px] h-[700px]' />
                        <p className='mt-2 mb-0 text-gray-500 self-center'>Harris attended court tiral in PA</p>
                        <p>Despite the spread of these false claims, there is little indication that they have significantly impacted Harris's standing within the administration or with her supporters. Political analysts believe that, given the lack of evidence and the rapid response from the White House, the rumors are unlikely to gain further traction.</p>
                        <p>However, the incident serves as a reminder of the pervasive nature of misinformation in today’s political landscape. Public figures, especially those in high office, often become targets of false narratives that can spread rapidly across social media, making it difficult to control the conversation.</p>
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