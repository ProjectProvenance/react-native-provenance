import React from 'react';
import { Status } from '../Status';
import { Capsule, height as capsuleHeight } from '../Capsule';
import { Statement } from '../Statement';

export const height = capsuleHeight;

export function ProofPoint() {
  return (
    <Capsule>
      <Statement beforeCompanyName={<Status size={12} />} />
    </Capsule>
  );
}
