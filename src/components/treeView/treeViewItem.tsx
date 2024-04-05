import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { TreeNode } from '../../types/types';
import NodeDetail from '../common/nodeDetail';
import { useAppSelector } from '@/redux/hooks';

const TreeViewItem: React.FC<{
  node: TreeNode;
  expanded: boolean;
  searchTerm: string;
  selectedNode: TreeNode | null;
  setSelectedNode: (node: TreeNode | null) => void;
}> = ({ node, expanded, searchTerm, selectedNode, setSelectedNode }) => {

  const [isExpanded, setIsExpanded] = useState(expanded);

  const data = useAppSelector((state: { treeData: any; }) => state.treeData);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNodeClick = (node: TreeNode) => {
    setSelectedNode(node);
  };

  const findPathToNode = (nodeId: string | null, path: string[] = []): string[] => {
    if (nodeId === null) {
      return path;
    }

    const currentNode = data.dataElements.find((item: { dataElementId: string; }) => item.dataElementId == nodeId);
    if (!currentNode) return path;

    path.unshift(currentNode.name);

    if (currentNode.groupId !== null) {
      return findPathToNode(currentNode.groupId, path);
    }

    return path;
  };

  const pathToNode = findPathToNode(node.dataElementId);
  
  const countChildNodes = (node: TreeNode) => {
    if (!node.dataElementId) {
      return 0;
    }
    const childNodes = data.dataElements.filter(
      (item: { groupId: string; }) => item.groupId == node.dataElementId
    );
    return childNodes;
  };
  return (
    <div >
      <div  >
        <div
          style={{
           
            fontWeight: 'dataPartitionId' in node ? 'thin' : 'bold', // Make the font thicker
            // color: node.dataPartitions ? 'primary.main' : 'secondary.main',
            backgroundColor: selectedNode && selectedNode.dataElementId === node.dataElementId
            ? "#72a3e01e" 
            : undefined,          }}
          className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 w-96"
        >
          <div className="flex items-center ">

            {node.dataPartitions ? null : (
              <span style={{ display: 'inline-flex' }} onClick={toggleExpand}>
                {isExpanded ? <ChevronDown className='h-4 w-4 mr-2'/> : <ChevronRight className='h-4 w-4 mr-2' />}
              </span>
            )}
            <span className=' text-sm	'  onClick={() => handleNodeClick(node)}>
              {node.name}
            </span>
          </div>
          {pathToNode.length > 0 && (
           <div className="dark:text-slate-400 text-slate-700 text-xs font-extralight		">Path: {pathToNode.join('/')}</div>
          )}
        </div>
        <div>
          {isExpanded && !node.dataPartitions && (
            <div className='ml-5'>
              {data.dataElements
                .filter((childNode: { groupId: string; }) => childNode.groupId == node.dataElementId)
                .map((childNode: TreeNode) => (
                  <TreeViewItem
                    key={childNode.dataElementId}
                    node={childNode}
                    expanded={false}
                    searchTerm={searchTerm}
                    selectedNode={selectedNode}
                    setSelectedNode={setSelectedNode}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      <div className='w-3/5' style={{ position: 'fixed', right: 60, top: 150, maxHeight:"400px"}}>
        {selectedNode && selectedNode.dataElementId === node.dataElementId && (
          <NodeDetail node={selectedNode} path = {pathToNode} childNodeCount={countChildNodes(selectedNode)} />
        )}
      </div>
    </div>
  );
};

export default TreeViewItem;
