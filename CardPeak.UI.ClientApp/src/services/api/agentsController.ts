import axios from 'axios'

export function GetAll(callback: (data: CardPeak.Types.Agent[]) => void) {
    axios.get('http://localhost:3001/api/agents').then((r) => {
        console.log('GetAll - api/agents');
        let data = r.data as CardPeak.Types.Agent[]
        callback(data);
    });
}