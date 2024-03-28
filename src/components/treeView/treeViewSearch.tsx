'use client'
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchDataElements } from '@/features/data/dataSlice';
import { DataElementAttribute, TreeNode } from '../../types/types';
import { setSelectedNode } from '@/features/iu/selectedNodeSlice';
import TreeViewItem from './treeViewItem';
import TreeViewNav from './treeViewNav';
import { X } from 'lucide-react';


const SearchTermTag: React.FC<{
  term: string;
  onRemove: () => void;
}> = ({ term, onRemove }) => (
  <div className="flex border border-gray-300	px-1 mr-2 rounded	 backdrop: items-center	">
    <div className="mr-1">{term}</div>
    <X  onClick={onRemove} className="cursor-pointer h-4 w-4" />
  </div>
);


const TreeViewSearch: React.FC = () => {
  const [searchTerms, setSearchTerms] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>("name");
  const data = useAppSelector((state) => state.treeData);
  const dispatch = useAppDispatch();
  console.log(data)
  useEffect(() => {
  
    dispatch(fetchDataElements());
  }, [dispatch ]);


  const matchingNodes = data.dataElements.filter((node: TreeNode) => {
    return searchTerms.some((term) => {
      const selectedValue = selectedKey
        ? node[selectedKey as keyof TreeNode]
        : undefined;
  
      const attributesMatch = node.dataElementAttributes?.some((attribute : any) => {
        const attributeValue = attribute[selectedKey as keyof DataElementAttribute];
        if (typeof attributeValue === 'string' || typeof attributeValue === 'number') {
          const stringValue = attributeValue.toString().toLowerCase();
          return stringValue.includes(term.toLowerCase());
        }
        return false;
      });
  
      if (typeof selectedValue === 'string' || typeof selectedValue === 'number') {
        const stringValue = selectedValue.toString().toLowerCase();
        return stringValue.includes(term.toLowerCase());
      }
  
      return attributesMatch || false;
    });
  });
  

  const handleRemoveSearchTerm = (index: number) => {
    const updatedSearchTerms = [...searchTerms];
    updatedSearchTerms.splice(index, 1);
    setSearchTerms(updatedSearchTerms);
    setSelectedNodes(null)
  };

  const keysToDisplay = [
    'groupId',
    'dataElementId',
    'name',
    'dataModel',
    'kind',
    'mevisMeanType',
    'integer'
    // Add more keys here
  ];

  matchingNodes.length > 0 ? (
    matchingNodes.map((matchingNode) => (
      dispatch(
        setSelectedNode({
          node: matchingNode,
          expanded: false,
          searchTerm: searchTerms.join(', '),
        })
      )
    ))
  ) : (
    <div>No matching nodes found.</div>
  );

  const [selectedNodes, setSelectedNodes] = useState<TreeNode | null>(null);

  return (
    
    <div >
      {matchingNodes.length > 0 ?<h1 className="text-2x1 font-bold my-2">Search</h1>: <h1 className="text-2x1 font-bold my-2">Treeview</h1>}
       
      <div className="flex ">
        <select 
          value={selectedKey || ''}
          onChange={(e) => setSelectedKey(e.target.value || null)}
          className="p-1 mr-2 text-base border border-slate-300 rounded bg-slate-100  dark:bg-slate-700 focus:outline-none focus:border-slate-500 dark:text-white dark:border-white text-sm	 cursor-pointer"

        >
          <option value="">Select Key</option>
          {keysToDisplay.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Add search term..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearchTerms([...searchTerms, e.currentTarget.value]);
              e.currentTarget.value = '';
            }
          }}
          className="w-full p-1 text-base text-sm	 border border-slate-300 rounded bg-slate-100  dark:bg-slate-700 focus:outline-none focus:border-slate-500 dark:text-white dark:border-white dark:focus:border-slate-500"
        />


      </div>
      <div className="flex flex-wrap m-2">
  {searchTerms.map((term, index) => (
    <SearchTermTag
      key={index}
      term={term}
      onRemove={() => handleRemoveSearchTerm(index)}
    />
  ))}
</div>
    <div  className={matchingNodes.length > 0 ? ' border border-slate-300 rounded p-1 w-1/3 h-[740px] overflow-y-auto' : ""}> {matchingNodes.length > 0 ? (
        matchingNodes.map((matchingNode) => (
          
         <TreeViewItem
         key={matchingNode.dataElementId}
         node={matchingNode}
         expanded={false}
         searchTerm={searchTerms.join(', ')}
         selectedNode={selectedNodes}
         setSelectedNode={setSelectedNodes}
        />
        ))
      ) : (
        <div ><TreeViewNav /></div>
      )}</div> 
    </div>
  );
};

export default TreeViewSearch;
