import{createContext, useState,ReactNode} from 'react';
import challenges from '../../challenges.json'

interface Challenge{
    type: 'body'|'eye';
    description:string;
    amount:number;
}

interface ChallengeContextData{
    level:number;
    currentExperience:number;
    challengesCompleted:number;
    activeChallenge:Challenge;
    levelUp:()=>void;
    startNewChallenge:()=>void;
    resetChallenge:()=>void;
}

interface ChallengesProviderProps{
    children:ReactNode // o reactNode aceita qualquer elemento children como filho(componente,texto,tag)
}

export const ChallengesContext = createContext({}as ChallengeContextData) ;

export function ChallengesProvider({children}:ChallengesProviderProps){
    const[level,setLevel]= useState(1);
    const[currentExperience, setCurrentExperience]= useState(0);
    const[challengesCompleted, setChallengesCompleted]=useState(0);
    const[activeChallenge,setActiveChallenge] = useState(null)
    function levelUp(){
        setLevel(level +1)
    }
    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }
    return(
        <ChallengesContext.Provider 
        value={{
            level,
            currentExperience,
            challengesCompleted,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge
            }}
            >
            {children}
        </ChallengesContext.Provider>
    )
}