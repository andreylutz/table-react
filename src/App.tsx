// import Table from "./components/Table";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getRecords } from './api/recordsAsync';
import { RootState, AppDispatch } from './store';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const heroes = useSelector((state: RootState) => state.recording.records);

  useEffect(() => {
    dispatch(getRecords(1));
  }, [dispatch]);

  console.warn(heroes);

  return (
    <div className="app"> 
      <h1>Heroes</h1>
    </div>
  );
};