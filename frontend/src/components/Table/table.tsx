/* eslint-disable react/prop-types */
import React from 'react';
import { DefTable, ColumnStylesTable } from 'styles/reset';

interface ArrData {
  id: string;
  [key: string]: string | number | any;
}

export interface TableConfig {
  keyName: keyof ArrData;
  fnItemProp?: boolean; // Pass the entire RowData to the function bellow
  formatFn?: (item: any) => string | number | JSX.Element;
}

interface TableDefaultProps {
  head: string[];
  data?: ArrData[];
  columnStyle: ColumnStylesTable[];
  rowKeys: TableConfig[];
  actionRow?: (item: any) => JSX.Element;
}

const GenericTable: React.FC<TableDefaultProps> = ({
  head,
  data,
  columnStyle,
  rowKeys,
  actionRow,
}) => {
  return (
    <DefTable columnStyle={[...columnStyle]}>
      <thead>
        <tr>
          {head.map((item) => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(data === undefined || data.length === 0) && (
          <tr>
            <td className="emptyTable">
              <strong>Nenhum item encontrado</strong>
            </td>
          </tr>
        )}
        {data !== undefined &&
          data.length > 0 &&
          data.map((item) => (
            <tr key={item.id}>
              {rowKeys.map((key, index) => (
                // eslint-disable-next-line
                <td key={key.keyName ? key.keyName : index}>
                  {key.formatFn !== undefined
                    ? key.formatFn(key.fnItemProp ? item : item[key.keyName])
                    : item[key.keyName]}
                </td>
              ))}

              {actionRow && <td>{actionRow(item)}</td>}
            </tr>
          ))}
      </tbody>
    </DefTable>
  );
};

export default GenericTable;
