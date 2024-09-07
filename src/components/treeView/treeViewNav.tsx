"use client"
import React, {  useEffect,useState  } from 'react';
import { ChevronDown } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { TreeView } from '@mui/x-tree-view/TreeView';
import {
  TreeItem,
  TreeItemProps,
  useTreeItem,
  TreeItemContentProps,
} from '@mui/x-tree-view/TreeItem';
import { Typography } from '@mui/material';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchDataElements } from '@/features/data/dataSlice';
import { TreeNode } from '../../types/types';
import NodeDetail from '../common/nodeDetail';
import { useSession } from 'next-auth/react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

const CustomContent = React.forwardRef(function CustomContent(
  props: TreeItemContentProps,
  ref,
) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event);
  };

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    handleSelection(event);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component="div"
        className={classes.label}
      >
        {label}
      </Typography>
    </div>
  );
});

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: TreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  return <TreeItem ContentComponent={CustomContent} {...props} ref={ref} />;
});




const TreeViewNav: React.FC = () => {
 
  const treeData = useAppSelector((state) => state.treeData);

  
  const dispatch = useAppDispatch();
 // Use useEffect only if the session is available
  useEffect(() => {
    // Ensure that the session is available before dispatching
    dispatch(fetchDataElements());
  }, [dispatch]);
  const { data: session } = useSession();
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  // Check if the session is available
  if (!session) {
    // Handle the case where the session is not available
    const errorMessage = "No session found. Please log in.";
    return (
      <div className="flex items-center justify-center h-[750px] border border-red-300 rounded text-red-700">
        <div>{errorMessage}</div>
      </div>
    );
  }

 
  // Handle the selection of a tree node
  const handleNodeClick = (node: TreeNode) => {
    setSelectedNode(node);
  };


  const renderTree = (nodes: TreeNode[] | undefined): JSX.Element[] => {
    if (!Array.isArray(nodes)) {
      return [];
    }

    const topLevelNodes: TreeNode[] = [];
    const groupedNodes: { [groupId: string]: TreeNode[] } = {};

    nodes.forEach((node) => {
      if (!node.groupId) {
        topLevelNodes.push(node);
      } else {
        if (!groupedNodes[node.groupId]) {
          groupedNodes[node.groupId] = [];
        }
        groupedNodes[node.groupId].push(node);
      }
    });

    const renderGroup = (groupNodes: TreeNode[]): JSX.Element[] =>
      groupNodes.map((node) => (
        <CustomTreeItem
          key={node.dataElementId}
          nodeId={node.dataElementId}
          label={renderNodeLabel(node)}
        >
          {groupedNodes[node.dataElementId] &&
            renderGroup(groupedNodes[node.dataElementId])}
        </CustomTreeItem>
      ));

    return topLevelNodes.map((node) => (
      <CustomTreeItem
        key={node.dataElementId}
        nodeId={node.dataElementId}
        label={renderNodeLabel(node)}
        style={{ color: 'navy blue' }} // Apply a style to channel nodes
        onClick={(e) => e.stopPropagation()} // Prevent expansion on click
      >
        {groupedNodes[node.dataElementId] &&
          renderGroup(groupedNodes[node.dataElementId])}
      </CustomTreeItem>
    ));
  };

  const renderNodeLabel = (node: TreeNode): JSX.Element => (
    <div
      style={{
        display: 'flex',
        alignItems: 'left',
        // color: 'dataPartitionId' in node ? 'primary.main' : 'secondary.main',
        fontWeight: 'dataPartitionId' in node ? 'thin' : 'bold', // Make the font thicker
      
      }}
      onClick={() => handleNodeClick(node)}
    >
     <div className="p-1 text-sm">

        {node.name}
      </div>
    </div>
  );

  const findPathToNode = (nodeId: string | null, path: string[] = []): string[] => {
    if (nodeId === null) {
      return path;
    }

    const currentNode = treeData.dataElements.find((item) => item.dataElementId == nodeId);
    if (!currentNode) return path;

    path.unshift(currentNode.name);

    if (currentNode.groupId !== null) {
      return findPathToNode(currentNode.groupId, path);
    }

    return path;
  };

  const pathToNode = selectedNode ? findPathToNode(selectedNode.dataElementId) : [];

  const countChildNodes = (node: TreeNode) => {
    if (!node.dataElementId) {
      return 0;
    }
    const childNodes = treeData.dataElements.filter(
      (item) => item.groupId === node.dataElementId
    );
    return childNodes;
  };

  return (
<div> <ResizablePanelGroup
      direction="horizontal"
      className=" min-h-fit max-w-screen "
    >
      <ResizablePanel defaultSize={25}>
        <div>
        <div className="min-h-screen overflow-y-auto border border-gray-300 p-2 rounded">
        <TreeView
          defaultCollapseIcon={<ChevronDown />}
          defaultExpandIcon={<ChevronRight />}
        >
          {treeData.loading && <div>Loading...</div>}
          {!treeData.loading && treeData.error ? (
            <div>Error: {treeData.error}</div>
          ) : null}
          {!treeData.loading && treeData.dataElements.length ? (
            <div>{renderTree(treeData.dataElements)}</div>
          ) : null}
        </TreeView>
      </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div>
        <div className="col-span-3">
      {selectedNode ? (
        <NodeDetail
          path={pathToNode}
          node={selectedNode}
          childNodeCount={countChildNodes(selectedNode)}
        />
      ) : (
        <div className="flex items-center justify-center h-screen  border border-gray-300 rounded">
          <div>Click on a tree node for information.</div>
        </div>
      )}
    </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup></div>
 

  );
};

export default TreeViewNav;