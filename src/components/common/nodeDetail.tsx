import React, { useEffect } from 'react'
import { TreeNode } from '../../types/types';
import { LatLngExpression } from 'leaflet';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Share2 } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import MapComponent from './mapComponent';


const NodeDetail: React.FC<{ node: TreeNode; path: string[]; childNodeCount: any; }> = ({ node, path, childNodeCount }) => {

  const attributeCount = node.dataElementAttributes.length;
  
  const long = node.dataElementAttributes.map((attribute, index) => (
    <div key={`long-${index}`}>{attribute.longitude}</div>
  ));
  
  const lat = node.dataElementAttributes.map((attribute, index) => (
    <div key={`lat-${index}`}>{attribute.latitude}</div>
  ));
  
  const Address = node.dataElementAttributes.map((attribute, index) => (
    <div key={`address-${index}`}>{attribute.city} {attribute.street} {attribute.postalCode}</div>
  ));
  
  const latitude = node.dataElementAttributes.find((attribute: { kind: string; }) => attribute.kind === "GeoCoordinate")?.latitude || 52.5200;
  const longitude = node.dataElementAttributes.find(attribute => attribute.kind === "GeoCoordinate")?.longitude || 13.4050;
  const Add = node.dataElementAttributes.find(attribute => attribute.kind === "Address")?.city || "Berlin";

  const position: LatLngExpression = [latitude, longitude];

  const groups = childNodeCount.map((group: TreeNode, index: any) => (
    !group.dataPartitions ? <span key={`group-${index}`} className="dark:text-white dark:border-white">{group.name}, </span> : null
  ));
  
  const channels = childNodeCount.map((channel: TreeNode, index: any) => (
    channel.dataPartitions ? <span key={`channel-${index}`} className="dark:text-white dark:border-white">{channel.name}, </span> : null
  ));
  
  const attributeRows = node.dataElementAttributes.map((attribute, index) => (
    <TableRow key={index}>
      <TableCell className="dark:text-white dark:border-white">{attribute.name}</TableCell>
      <TableCell className="dark:text-white dark:border-white">{attribute.latitude !== undefined ? attribute.latitude : 'N/A'}</TableCell>
      <TableCell className="dark:text-white dark:border-white">{attribute.longitude !== undefined ? attribute.longitude : 'N/A'}</TableCell>
      <TableCell className="dark:text-white dark:border-white">
        {attribute.city !== undefined && attribute.street !== undefined && attribute.postalCode !== undefined
          ? `${attribute.city}, ${attribute.street}, ${attribute.postalCode}`
          : 'N/A'
        }
      </TableCell>
    </TableRow>
  ));

  return (
    <div>
      <div className="dark:text-white dark:border-white border border-gray-300 rounded">
        <div className="flex justify-between dark:text-white dark:border-white w-full p-2">
          <div>
            {node.dataPartitions ? (
              <h6 className="text-l">Channel Details [{node.name}]</h6>
            ) : (
              <h6 className="text-l">Group Details [{node.name}]</h6>
            )}
          </div>
          <div>
            <Button size='sm' className="dark:text-white dark:border-white text-xs mr-2" variant="outline">
              <Share2 className="pr-2" /> Share
            </Button>
            <Button size='sm' className="dark:text-white dark:border-white text-xs" variant="outline">
              <Trash2 className="pr-2" /> Delete
            </Button>
          </div>
        </div>
        <div style={{ padding: '10px', maxHeight: '700px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', padding: '10px' }}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell className="dark:text-white dark:border-white">Name</TableCell>
                  <TableCell className="dark:text-white dark:border-white">{node.name}</TableCell>
                  <TableCell className="flex justify-end">
                    <Button size='sm' className="dark:text-white dark:border-white text-xs" variant="outline">
                      Rename
                    </Button>
                  </TableCell>
                </TableRow>
                {!node.dataPartitions ? (
                  <>
                    <TableRow>
                      <TableCell className="dark:text-white dark:border-white">Sub Groups</TableCell>
                      <TableCell className="dark:text-white dark:border-white">{groups}</TableCell>
                      <TableCell className="flex justify-end">
                        <Button size='sm' className="dark:text-white dark:border-white text-xs" variant="outline">
                          Add Group
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="dark:text-white dark:border-white">Sub Channels</TableCell>
                      <TableCell className="dark:text-white dark:border-white">{channels}</TableCell>
                      <TableCell className="flex justify-end">
                        <Button size='sm' className="dark:text-white dark:border-white text-xs" variant="outline">
                          Add Channel
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                ) : null}
                <TableRow>
                  <TableCell className="dark:text-white dark:border-white">Attributes</TableCell>
                  <TableCell className="dark:text-white dark:border-white">{attributeCount}</TableCell>
                  <TableCell className="flex justify-end">
                    <Button size='sm' className="dark:text-white dark:border-white text-xs" variant="outline">
                      Add Attribute
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="dark:text-white dark:border-white">Path</TableCell>
                  <TableCell className="dark:text-white dark:border-white">{path.join('/')}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="dark:text-white dark:border-white">dataElementId</TableCell>
                  <TableCell className="dark:text-white dark:border-white">{node.dataElementId}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="dark:text-white dark:border-white">groupId</TableCell>
                  <TableCell className="dark:text-white dark:border-white">{node.groupId}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="dark:text-white dark:border-white">dataPartition</TableCell>
                  <TableCell className="dark:text-white dark:border-white">{node.dataPartitionId}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div></div>
          </div>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="dark:text-white dark:border-white">Longitude</TableCell>
                <TableCell className="dark:text-white dark:border-white">{long}</TableCell>
                <TableCell className="dark:text-white dark:border-white">Latitude</TableCell>
                <TableCell className="dark:text-white dark:border-white">{lat}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="dark:text-white dark:border-white">Address</TableCell>
                <TableCell className="dark:text-white dark:border-white">{Address}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableBody>
              <TableRow>
                <MapComponent latitude={latitude} longitude={longitude} address={Add} />
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default NodeDetail;
