import { useState, useMemo, useCallback, useEffect } from 'react'
import { DataTable } from '@/component/data-table'
import { useOemColumns, type OEMRowData } from '../config/oem.table'
import { useOEMList } from '../services/oem.hooks'
import AddOemModal from './AddOemModal';

interface OEMListProps {
  search?: string;
}

const OEMList = ({ search = "" }: OEMListProps) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set([]))
  const [editId, setEditId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const effectiveSearch = search.trim().length >= 2 ? search : undefined;
  const { data: oemList, isLoading } = useOEMList({ page, limit, search: effectiveSearch });

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
    setEditId(id);
  }

  console.log(oemList, 'oemList')

  const columns = useOemColumns(expandedIds, toggleExpand, handleEdit);

  const displayedData = useMemo(() => {
    if (!oemList?.data?.oems) return [];
    
    const rows: OEMRowData[] = [];
    oemList.data.oems.forEach(oem => {
      rows.push({
        ...oem,
        isParent: true,
        displayName: oem.oemName,
      });

      if (expandedIds.has(oem.id)) {
        oem.chargerModels.forEach(model => {
          rows.push({
            ...model,
            id: model.id,
            parentId: oem.id,
            isParent: false,
            displayName: model.chargerModelName,
            chargerModelType: model.chargerModelType,
            updatedAt: model.updatedAt,
            updatedByName: model.updatedByName,
          } as OEMRowData);
        });
      }
    });
    return rows;
  }, [oemList, expandedIds]);

  return (
    <div className="w-full">
        <DataTable 
          data={displayedData} 
          columns={columns} 
          isLoading={isLoading}
          search={search}
          isServerSide={true}
          totalItems={oemList?.data?.totalCount || 0}
          pagination={{
            pageIndex: page - 1,
            pageSize: limit,
          }}
          pageCount={Math.ceil(oemList?.data?.totalCount / limit) || 0}
          onPaginationChange={(updater) => {
            const next = typeof updater === "function" ? updater({ pageIndex: page - 1, pageSize: limit }) : updater;
            setPage(next.pageIndex + 1);
            setLimit(next.pageSize);
          }}
        />
        <AddOemModal 
          open={!!editId} 
          onOpenChange={(open) => !open && setEditId(null)} 
          editId={editId} 
        />
    </div>
  )
}

export default OEMList