import React, { useState, useMemo, useCallback } from 'react'
import { DataTable } from '@/component/data-table'
import { useOemColumns } from '../config/oem.table'
import { mockOemData } from '../mocks/oem.mock'
import { useOEMList } from '../services/oem.hooks'

const OEMList = () => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(["1"]))
    const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {data:oemList, isLoading} = useOEMList({page, limit});
    
  console.log(oemList, 'ajkdsk')



  const toggleExpand = useCallback((id: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);
  
  const handleEdit = (id: string) => {
    console.log("Edit OEM", id);
  }

  const columns = useOemColumns(expandedIds, toggleExpand);

  const displayedData = useMemo(() => {
    return mockOemData.filter(row => 
      row.isParent || (row.parentId && expandedIds.has(row.parentId))
    );
  }, [expandedIds]);

  return (
    <div className="w-full">
        <DataTable columns={columns} data={displayedData} />
    </div>
  )
}

export default OEMList