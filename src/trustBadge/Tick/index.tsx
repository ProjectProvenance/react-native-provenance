import React from 'react';
import { Status } from '../Status';
import { Capsule, height as capsuleHeight } from '../Capsule';
import { Statement } from '../Statement';

export const height = capsuleHeight;

export function Tick() {
  return (
    <Capsule>
      <Status />
      <Statement />
    </Capsule>
  );
}
