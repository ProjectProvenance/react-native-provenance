import React from 'react';
import { Status } from '../Status';
import { Capsule, defaultHeight as capsuleHeight } from '../Capsule';
import { Statement } from '../Statement';

const Tick = () => {
  return (
    <Capsule>
      <Status />
      <Statement />
    </Capsule>
  );
};

Tick.getHeight = () => capsuleHeight;

export { Tick };
