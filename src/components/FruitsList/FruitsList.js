import {useEffect} from 'react'
import { useQuery } from "@apollo/client";
import {FRUITS_LIST_REQUEST} from '../../graph-queries'

const FruitsList = ({showMore, onEdit, onDelete, shouldRefetch}) => {
    const { loading, error, data, refetch } = useQuery(FRUITS_LIST_REQUEST);
    useEffect(() => {
        if(shouldRefetch) {
            refetch()
        }
    }, [shouldRefetch, refetch])
    return <main>
        {loading && <span>Loading fruits...</span>}
        {error && <span>Error</span>}
        {!loading && !error && !data?.fruits.length && <span>Fruits list is empty</span>}
        {!loading && !error && data?.fruits.length > 0 && <ul>
            {data.fruits.map(fruit => <li key={fruit.id}>
                <div>Name: {fruit.fruit_name}</div>
                <div>Scientific name: {fruit.scientific_name}</div>
                <button onClick={() => showMore(fruit.id)}>Show more</button>
                <button onClick={() => onEdit(fruit.id)}>Edit</button>
                <button onClick={() => onDelete(fruit.id)}>Delete</button>
            </li>)}
            </ul>}
    </main>
}

export default FruitsList