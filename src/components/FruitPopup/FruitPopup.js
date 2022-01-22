import {useState} from 'react'
import './FruitPopup.css'

export const FruitPopup = ({mode, data = {}, onClose, onSubmit}) => {
    const [values, setValues] = useState(data)
    const handleChange = (value, property) => {
        setValues(values => ({...values, [property]: value}))
    }
    return <div className='popup-wrap'>
        <div className='popup'>
            {mode === 'add' && <h1>Add new fruit</h1>}
            <form onSubmit={e => {
                e.preventDefault()
                onSubmit(values, data.id)
            }}>
               <label><span>Fruit name</span> <input disabled={mode === 'view'} value={values?.fruit_name || ''} onChange={(e) => handleChange(e.target.value, 'fruit_name')} /></label>
               <label><span>Scientific name</span> <input disabled={mode === 'view'} value={values?.scientific_name || ''} onChange={(e) => handleChange(e.target.value, 'scientific_name')} /></label>
               <label><span>Tree name</span> <input disabled={mode === 'view'} value={values?.tree_name || ''} onChange={(e) => handleChange(e.target.value, 'tree_name')} /></label>
               <label><span>Family</span> <input disabled={mode === 'view'} value={values?.family || ''} onChange={(e) => handleChange(e.target.value, 'family')} /></label>
               <label><span>Origin</span> <input disabled={mode === 'view'} value={values?.origin || ''} onChange={(e) => handleChange(e.target.value, 'origin')} /></label>
               <label><span>Description</span> <textarea disabled={mode === 'view'} rows='5' value={values?.description || ''} onChange={(e) => handleChange(e.target.value, 'description')} /></label>
               <label><span>Bloom</span> <input disabled={mode === 'view'} value={values?.bloom || ''} onChange={(e) => handleChange(e.target.value, 'bloom')} /></label>
               <label><span>Maturation fruit</span> <input disabled={mode === 'view'} value={values?.maturation_fruit || ''} onChange={(e) => handleChange(e.target.value, 'maturation_fruit')} /></label>
               <label><span>Life cycle</span> <input disabled={mode === 'view'} value={values?.life_cycle || ''} onChange={(e) => handleChange(e.target.value, 'life_cycle')} /></label>
               <label><span>Climatic zone</span> <input disabled={mode === 'view'} value={values?.climatic_zone || ''} onChange={(e) => handleChange(e.target.value, 'climatic_zone')} /></label>
               {mode !== 'view' && <button type="submit">{mode === 'add' ? 'Add' : 'Save'}</button>}
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    </div>
}

export default FruitPopup