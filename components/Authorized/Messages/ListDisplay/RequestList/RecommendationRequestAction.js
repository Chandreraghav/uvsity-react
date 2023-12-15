import React, { useState } from "react";
import Link from '@mui/material/Link';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useSendRecommendationRequest } from '../../../../../hooks';
import { createRecommendationRequestPayload } from '../../../../../converter';

const RecommendedRequestAction = ({ requestUIData }) => {
  const [showRecommendTextArea, setShowRecommendTextArea] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');

  const { mutate: sendRecommendation } = useSendRecommendationRequest();

  const triggerSendRecommendation = () => { 
    const payload = createRecommendationRequestPayload(requestUIData, textAreaValue)
    sendRecommendation(payload, { 
      onSuccess: () => {
        setShowRecommendTextArea(false);
      }
    });
  };

  return (
    <div className="mt-2 cursor-pointer">
      {!showRecommendTextArea && <Link variant="body2" onClick={() => setShowRecommendTextArea(true)}>Write Recommendation</Link>}
      {showRecommendTextArea && (
        <div className="flex mt-4 border rounded-2xl flex-col p-4">
          <textarea
            value={textAreaValue}
            className="p-2 border"
            placeholder="Reply Here"
            onChange={(event) => setTextAreaValue(event?.currentTarget?.value || '')}
          />
          <footer className="flex mt-2 items-center">
            <Button variant="contained" endIcon={<SendIcon />} className="mr-2" onClick={triggerSendRecommendation}>Send</Button>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => setShowRecommendTextArea(false)}>Discard</Button>
          </footer>
        </div>
      )}
    </div>
  )
};

export default RecommendedRequestAction;
