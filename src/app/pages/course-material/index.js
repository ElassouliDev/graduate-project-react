import React from "react";
 import Table from '../../shared/components/table';
import { rows, headCells } from '../../shared/constants/TableData';

const CourseMaterial = () => {
 return (
     <Table
      rows={rows}
      headCells={headCells}
     />
 )
}
export default CourseMaterial;