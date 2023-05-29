import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Notification() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <span className="inline-flex items-center gap-2 text-lg font-medium text-[#DD7D37]">
            <span className="">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0013 13.3332V9.99984M10.0013 6.6665H10.0096M18.3346 9.99984C18.3346 14.6022 14.6037 18.3332 10.0013 18.3332C5.39893 18.3332 1.66797 14.6022 1.66797 9.99984C1.66797 5.39746 5.39893 1.6665 10.0013 1.6665C14.6037 1.6665 18.3346 5.39746 18.3346 9.99984Z"
                  stroke="currentColor"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>{' '}
            New User? Learn how Ecomarket works
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <ul className="list-disc	space-y-3">
              <li>
                <Typography>Before creating an offer, first thing you do is fund your wallet with TRX. Click on View Wallet to fund your wallet.</Typography>
              </li>
              <li>
                <Typography>Once your Wallet has been funded, click on Create Offer to create your offer.</Typography>
              </li>
              <li>
                <Typography>Make sure your wallet is funded with enough TRX to cover your offer amount.</Typography>
              </li>
              <li>
                <Typography>Your offers will be listed below. Click on each one to view its details.</Typography>
              </li>
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
