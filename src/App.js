import {useState} from 'react'
import FruitPopup from './components/FruitPopup/FruitPopup';
import FruitsList from './components/FruitsList/FruitsList'
import {useLazyQuery, useMutation} from '@apollo/client'
import {FRUIT_DETAILS_REQUEST, ADD_FRUIT_REQUEST, EDIT_FRUIT_REQUEST, DELETE_FRUIT_REQUEST} from './graph-queries'
function App() {
  const [fruitPopupSettings, setFruitPopupSettings] = useState({visible: false, data: {}, mode: 'view'})
  const [shouldRefetchFruitsList, setShouldRefetchFruitsList] = useState(false)
  const [getFruitDetails, {data: fruitDetailsData}] = useLazyQuery(FRUIT_DETAILS_REQUEST)
  const [addFruit] = useMutation(ADD_FRUIT_REQUEST)
  const [editFruit] = useMutation(EDIT_FRUIT_REQUEST)
  const [deleteFruit] = useMutation(DELETE_FRUIT_REQUEST)
  const showFruitDetails = fruitId => {
    getFruitDetails({variables: {id: fruitId}}).then(() => setFruitPopupSettings(settings => ({...settings, visible: true})))
  }
  const onClosePopup = () => {
    setFruitPopupSettings({visible: false, data: {}, mode: 'view'})
  }
  const onEditFruit = (values, fruitId) => {
    addFruit({variables: {...values, id: fruitId}}).then(() => {
      setShouldRefetchFruitsList(true)
      onClosePopup()
      setShouldRefetchFruitsList(false)
    })
  }
  const onOpenEditPopup = (fruitId) => {
    getFruitDetails({variables: {id: fruitId}}).then(() => setFruitPopupSettings({visible: true, data:fruitDetailsData, mode: 'edit'}))
  }
  const onAddFruit = (values) => {
    const id = String(Math.floor(Math.random() * 1000000) + 100)
    editFruit({variables: {...values, id}}).then(() => {
      setShouldRefetchFruitsList(true)
      onClosePopup()
      setShouldRefetchFruitsList(false)
    })
  }
  const onDeleteFruit = fruidId => {
    deleteFruit({variables: { id: fruidId }}).then(() => {
      setShouldRefetchFruitsList(true)
      setShouldRefetchFruitsList(false)
    })
  }
  return (
    <div className="App">
      <h1>Fruits</h1>
      <button onClick={() => setFruitPopupSettings({visible: true, data: {}, mode: 'add'})}>Add fruit</button>
      <FruitsList shouldRefetch={shouldRefetchFruitsList} showMore={showFruitDetails} onEdit={onOpenEditPopup} onDelete={onDeleteFruit} />
      {fruitPopupSettings.visible && fruitDetailsData && fruitPopupSettings.mode !== 'add' && <FruitPopup onSubmit={onEditFruit} mode={fruitPopupSettings.mode} data={fruitDetailsData?.fruit} onClose={onClosePopup} />}
      {fruitPopupSettings.visible && fruitPopupSettings.mode === 'add' && <FruitPopup onSubmit={onAddFruit} mode='add' data={fruitPopupSettings.data} onClose={onClosePopup} />}
    </div>
  );
}

export default App;
