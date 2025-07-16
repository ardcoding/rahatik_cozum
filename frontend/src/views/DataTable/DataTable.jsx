import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useExpandableGroups } from '../../hooks/useExpandableGroups';
import GroupTableRows from './components/GroupTableRows';
import { fetchRecords } from '../../features/records/asyncThunk/recordsAsync';
import Loading from '../../components/Loading';
import ErrorPage from '../../components/ErrorPage';

const DataTable = () => {
  const dispatch = useDispatch();
  const { groups, loading, error } = useSelector(state => state.records);
  const [expandedGroups, toggleGroup] = useExpandableGroups();

  useEffect(() => {
    dispatch(fetchRecords());
  }, [dispatch]);

  const columns = [
    { key: 'hesap_kodu', title: 'Hesap Kodu' },
    { key: 'borc', title: 'Borç' }
  ];

  if (loading) return <Loading/>;
  if (error) return <ErrorPage error={error} />;

  return (
  <table className="border-collapse m-auto border-4 border-solid">
    <thead>
      <tr>
        {columns.map(col => (
          <th className="border p-2 bg-gray-200" key={col.key}>{col.title}</th>
        ))}
      </tr>
    </thead>
    <tbody >
      <GroupTableRows
        groups={groups}
        expandedGroups={expandedGroups}
        toggleGroup={toggleGroup}
        columns={columns}
      />
    </tbody>
  </table>
  );
}
export default DataTable;