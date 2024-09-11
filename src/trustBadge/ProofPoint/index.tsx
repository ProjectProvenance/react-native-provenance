import React from 'react';
import { Status } from '../Status';
import { Capsule } from '../Capsule';
import { Statement } from '../Statement';
import { ClaimsList } from '../ClaimsList';

const height = 36;

const mockClaimIcons = [
  'https://res.cloudinary.com/provenance/image/upload/c_scale,f_auto,w_88/f0ltte5bqins65r24v8aqxsn4qaq',
  '<svg>1</svg>',
  'https://res.cloudinary.com/provenance/image/upload/c_scale,f_auto,w_64/6v6mhfd5n93zoip8dvidzkw0kumo',
];

const ProofPoint = () => {
  return (
    <Capsule height={height}>
      <ClaimsList claimsIcons={mockClaimIcons} />
      <Statement beforeCompanyName={<Status size={12} />} />
    </Capsule>
  );
};

ProofPoint.getHeight = () => height;

export { ProofPoint };
