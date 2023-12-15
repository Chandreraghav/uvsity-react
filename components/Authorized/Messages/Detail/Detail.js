import React, { useContext } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { MessageContext } from '../context';
import { MessageTypes } from "../../../../converter";
import MessageDetailSection from './MessageDetailSection';

const Detail = () => {
  const { detailsData, setDetailsData } = useContext(MessageContext) || {};
  const { messageType = '', id = ''} = detailsData || {};

  const isMessageType = messageType === MessageTypes.INBOX_MESSAGE || messageType === MessageTypes.SENT_MESSAGE;
  return (
    <section className="p-2">
      <nav className="flex justify-between">
        <ArrowBackIcon className="mr-4 cursor-pointer" onClick={() => setDetailsData(null)} />
        <DeleteOutlineOutlinedIcon className="mr-4 cursor-pointer" />
      </nav>
      <section className="mt-2">
        {
          isMessageType ? <MessageDetailSection messageId={id} /> : null
        }
      </section>
    </section>
  );
}

export default Detail;
