import React from 'react';

import { dateConv } from '../../utils/utils';

const FormTimer = ({ request }) => {
  return (
    <div className="flex items-center justify-start py-4 gap-2">
      <div className="flex items-center justify-start gap-1">
        <img src="/images/Clock.svg" />
        <span className="text-sm">Time left to fulfill requests</span>
      </div>
      <span className="text-2xl font-semibold ">
        {dateConv(request.request_expires_at)}
      </span>
    </div>
  );
};

export default FormTimer;
