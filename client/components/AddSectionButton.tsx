import { mock } from 'node:test';
import { useDispatch } from 'react-redux';
import { createSection } from '../actions/actions';

export default function AddSectionButton() {
  const dispatch = useDispatch();

  const handleClick = async () => {
    // fetch new section to api and receive back databaseId for store update
    // const id = await fetch('/api/createComponent', {method: 'POST'})
      // .then(data => data.json());

    // set id to random number while api is under construction
    const mockId =  (Math.random()*10).toString();
    // dispatch new empty section to store with retrieved id
    dispatch(createSection(mockId));

  }

  return (
    <div>
      <button onClick={() => handleClick()}>+</button>
    </div>
  )
}