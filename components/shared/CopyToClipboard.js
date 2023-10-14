import { useEffect } from 'react';
import ClipboardJS from 'clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tooltip } from '@mui/material';
import { RESPONSE_TYPES } from '../../constants';
import { toast } from "react-toastify";
import { getWorkflowError } from '../../error-handler/handler';
import { handleResponse } from '../../toastr-response-handler/handler';

toast.configure();
function CopyToClipboard(props) {
    const textToCopy = props.copyText;
    const title=props.title||'Copy to clipboard'

    useEffect(() => {
        const clipboard = new ClipboardJS('.copy-button');

        clipboard.on('success', () => {
            //Success
            handleResponse(
                'Copied to clipboard',
                RESPONSE_TYPES.SUCCESS,
                toast.POSITION.BOTTOM_CENTER
              );
        });

        clipboard.on('error', (e) => {
            //Error
            handleResponse(
                'Failed to copy to clipboard',
                RESPONSE_TYPES.ERROR,
                toast.POSITION.BOTTOM_CENTER
              );
        });

        return () => clipboard.destroy();
    }, []);

    return (
        textToCopy ? (<Tooltip arrow title={title}><ContentCopyIcon style={{ background: '#1976D2', fontSize: '2rem', padding: 6 }} role="button" className="copy-button rounded-full" data-clipboard-text={textToCopy} /></Tooltip>)
            : (<></>)

    );
}

export default CopyToClipboard;
