import React, {useEffect, useState} from 'react';

export default function Form(props) {
    const [song, setSong] = useState('thunder')
    const [drinkers, setDrinkers] = useState('')
    const [durations, setDurations] = useState([])
    const Button = (label, key, handler) => {
        let cls = key === song ? "bg-slate-100 text-black" : "bg-black text-slate-100"
        return <button key={key} className={"justify-center items-center center p-2 rounded shrink-0 w-1/4 " + cls} onClick={handler}>{label}</button>
    }

    const getSongLink = () => {
        return song === 'thunder' ? "https://open.spotify.com/embed/track/57bgtoPSgt236HzfBOd8kj?utm_source=generator&theme=0" : "https://open.spotify.com/embed/track/2VjrFvthQjw7BS8aS4VdZi?utm_source=generator"
    }

    useEffect(() => {
        const thunders = [
            30,
            33,
            37,
            40,
            44,
            48,
            51,
            55,
            58,
            62,
            71,
            78,
            85,
            93,
            101,
            112,
            163,
            166,
            170,
            174,
            223,
            227,
            230,
            234,
            252,
            255,
            258,
            259,
            263,
            266,
            269,
            273,
            276,
            280,
            292
        ]
        const bogs = [
            [16, 18],
            [32, 35],
            [48, 52],
            [65, 70],
            [82, 88],
            [101, 108],
            [121, 129],
            [132, 141],
            [164, 173],
            [185, 196],
            [209, 220],
            [233, 245],
            [257, 271],
            [283, 296],
        ]
        const getTotalDuration = (pos) => {
            if(song === 'thunder') {
                return thunders.reduce((previous, current, idx) => {
                    if((idx % drinkers ) + 1 === (pos)){
                        if(idx+1 === thunders.length){
                            return previous
                        }
                        return (previous + (thunders[idx+1] - current))
                    } else {
                        return previous
                    }
                }, 0)
            }
            else if (song === 'bog') {
                return bogs.reduce((previous, current, idx) => {
                    if((idx % drinkers) + 1 === pos) {
                        return previous + (current[1] - current[0])
                    } else { return previous }
                }, 0)
            }
        }
        if (!drinkers || isNaN(drinkers)) {
            setDurations([])
            setDrinkers('')
        }
        setDurations([...Array(drinkers||0).keys()].map((val, idx) => (
            getTotalDuration(idx+1)
        )))
    }, [setDurations, drinkers, song])


    const buttonHandler = (e, _song) => {
        e.preventDefault()
        setSong(_song)
    }

    const getResultCls = (duration) => {
        let color;
        if(duration === Math.max(...durations)) {
            color = "text-white border-red-600"
        } else if (duration === Math.min(...durations)) {
            color = "text-white border-green-600"
        }else {
            color = "text-white"
        }
        return `${color} rounded-md flex-grow p-2 border-2`
    }
    return (
    <form className="flex flex-col w-full">
        <div className="flex flex-row justify-center p-5 w-full space-x-4">
            {Button("Thunder", 'thunder', (e) => buttonHandler(e, 'thunder'))}
            {Button("Bog", 'bog', (e) => buttonHandler(e, 'bog'))}
        </div>

        <input pattern="\d*" value={drinkers} onChange={(e)=> (setDrinkers(parseInt(e.target.value)||''))} className='rounded-md p-2' type="number" placeholder="# of drinkers" min={1} max={10} />
        <div className='flex flex-col p-5 space-y-4 w-full justify-center'>
            {drinkers > 0 && durations.map((duration, idx) => (
                <div key={idx} className={getResultCls(duration)}>{idx+1}. {duration} seconds</div>
            ))}
        </div>
        <iframe sx={{borderRadius: '12px'}} src={getSongLink()} width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </form>
    )
}
