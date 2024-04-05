const express = require('express');
const app = express();
const port = 3030;

// Define your treeNodes array here (make sure to convert TypeScript to valid JavaScript, if necessary)
const treeNodes = [
    {
        dataElementId: 1,
        name: "Node1",
        externalId: "7657",
        groupId: null,
        Groups: [],
        dataPartitions: {},
        dataPartitionId: "45353",
        dataPartition: null,
        dataElementAttributes: [],
        showAttributes: true,
    },
    {
        dataElementId: 2,
        name: "Branch1-1",
        externalId: "7658",
        groupId: "1",
        Groups: [],
        dataPartitions: {},
        dataPartitionId: "45354",
        dataPartition: null,
        dataElementAttributes: [],
        showAttributes: false,
    },
    {
        dataElementId: 3,
        name: "Branch1-2",
        externalId: "7659",
        groupId: "1",
        Groups: [],
        dataPartitions: {},
        dataPartitionId: "45355",
        dataPartition: null,
        dataElementAttributes: [],
        showAttributes: true,
    },
    {
        dataElementId: 4,
        name: "Node2",
        externalId: "7660",
        groupId: "2",
        Groups: [],
        dataPartitions: {},
        dataPartitionId: "45356",
        dataPartition: null,
        dataElementAttributes: [],
        showAttributes: false,
    },
    // Adding 4 branches for Node3 as requested
    {
        dataElementId: "5",
        name: "Branch3-1",
        externalId: "7661",
        groupId: "3",
        Groups: [],
        dataPartitions: {},
        dataPartitionId: "45357",
        dataPartition: null,
        dataElementAttributes: [],
        showAttributes: true,
    },
    {
        dataElementId: "6",
        name: "Branch3-2",
        externalId: "7662",
        groupId: "3",
        Groups: [],
        dataPartitions: {},
        dataPartitionId: "45358",
        dataPartition: null,
        dataElementAttributes: [],
        showAttributes: false,
    },
    {
        dataElementId: "7",
        name: "Branch3-3",
        externalId: "7663",
        groupId: "3",
        Groups: [],
        dataPartitions: {},
        dataPartitionId: "45359",
        dataPartition: null,
        dataElementAttributes: [],
        showAttributes: true,
    },
    {
        dataElementId: "8",
        name: "Branch3-4",
        externalId: "7664",
        groupId: "3",
        Groups: [],
        dataPartitions: {},
        dataPartitionId: "45360",
        dataPartition: null,
        dataElementAttributes: [],
        showAttributes: false,
    },
    // Example for another node for clarity, assuming it continues the pattern
    {
        dataElementId: "9",
        name: "Node4",
        externalId: "7665",
        groupId: "4",
        Groups: [],
        dataPartitions: {},
        dataPartitionId: "45361",
        dataPartition: null,
        dataElementAttributes: [],
        showAttributes: true,
    },
    {
        dataElementId: "10",
        name: "Branch4-1",
        externalId: "7666",
        groupId: "4",
        Groups: [],
        dataPartitions: {},
        dataPartitionId: "45362",
        dataPartition: null,
        dataElementAttributes: [],
        showAttributes: false,
    },
    // Further branches and nodes can be added following the same pattern.
];


app.get('/api/treenodes', (req, res) => {
  res.json(treeNodes);
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
