import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { TiArrowSortedDown } from "react-icons/ti";
import { MdPlayArrow } from "react-icons/md";

const GroupTableRows = ({ groups, expandedGroups, toggleGroup, columns }) => {
  let rowIndex = 0;

  return Object.entries(groups).map(([first3, g3]) => {
    const key3 = first3;
    const isExpanded3 = expandedGroups[key3];
    rowIndex++;
    const rowColor3 = rowIndex % 2 === 0 ? 'bg-teal-50' : 'bg-teal-100';

    return (
      <React.Fragment key={key3}>
        <TableRow
          className={`${rowColor3} indent-level-0 hover:bg-slate-100`}
          onClick={() => toggleGroup(key3)}
        >
          <TableCell className="cursor-pointer">
            <div className='flex items-center'>
              {isExpanded3 ? <TiArrowSortedDown size={24} /> : <MdPlayArrow size={24} />} 
              {first3}
            </div>
          </TableCell>
          <TableCell>{g3?.borc?.toFixed(2)}</TableCell>
        </TableRow>

        {isExpanded3 &&
          Object.entries(g3.children).map(([first5, g5]) => {
            const key5 = `${key3}.${first5}`;
            const isExpanded5 = expandedGroups[key5];
            rowIndex++;
            const rowColor5 = rowIndex % 2 === 0 ? 'bg-sky-50' : 'bg-sky-100';

            return (
              <React.Fragment key={key5}>
                <TableRow
                  className={`${rowColor5} indent-level-1 hover:bg-slate-100`}
                  onClick={() => toggleGroup(key5)}
                >
                  <TableCell className="cursor-pointer">
                    <div className='flex items-center'>
                      {isExpanded5 ? <TiArrowSortedDown size={24}/> : <MdPlayArrow size={24}/>} 
                      {first5}
                    </div>
                  </TableCell>
                  <TableCell>{g5?.borc?.toFixed(2)}</TableCell>
                </TableRow>

                {isExpanded5 &&
                  Object.entries(g5.children).map(([first8, rec]) => {
                    rowIndex++;
                    const rowColor8 = rowIndex % 2 === 0 ? 'bg-neutral-200' : 'bg-white';
                    return (
                      <TableRow key={first8} className={`${rowColor8} indent-level-2 hover:bg-gray-200`}>
                        {columns.map(col => (
                          <TableCell key={col.key}>{rec[col.key]}</TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
              </React.Fragment>
            );
          })}
      </React.Fragment>
    );
  });
}

export default GroupTableRows;