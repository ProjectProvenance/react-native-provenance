import React from 'react';
import { Status } from '../Status';
import { Capsule } from '../Capsule';
import { Statement } from '../Statement';
import { ClaimsList } from '../ClaimsList';

const height = 36;

const ProofPoint = ({ claimIcons }: { claimIcons: string[] }) => {
  return (
    <Capsule height={height}>
      <ClaimsList claimsIcons={claimIcons} />
      <Statement beforeCompanyName={<Status size={12} />} />
    </Capsule>
  );
};

ProofPoint.getHeight = () => height;

export { ProofPoint };
