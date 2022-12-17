import { FormHelperText } from '@mui/material';
import { HtmlEditor, Image, Inject, Link, PasteCleanup, QuickToolbar, RichTextEditorComponent, Count, MarkdownEditor, Toolbar, FileManager, Resize, Table } from '@syncfusion/ej2-react-richtexteditor';
import React, { useEffect, useState, useRef } from "react";
import { LOADING_MESSAGE_DEFAULT, RTE_TOOLBAR } from '../../../constants/constants';

function SyncFusionRTE(props) {
    let editorRef = useRef();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [created, setCreated] = useState(false);
    let toolbarSettings = {
        items: props?.toolbar ? props.toolbar : RTE_TOOLBAR.ADVANCED

    };
    const keyConfig = {
        'undo': 'ctrl+z',
        'redo': 'ctrl+y',
        'copy': 'ctrl+c',
        'paste': 'ctrl+v',
        'cut': 'ctrl+x'
    }
    
    const handleChange = (e) => {
        // do something when editor's content changed
        const _data = editorRef.current.value;
        if (props.getDataOnChange) {
            props.getDataOnChange(_data);
        }
        if (props.required) {
            if (!_data) {
                if (props.onError) {
                    props.onError(true);
                }
                setError(true);
            } else {
                setError(false);
                if (props.onError) {
                    props.onError(false);
                }
            }
        }
    }
    const handleBlur = (e) => {
        const _data = editorRef.current.value;
        if (props.getDataOnChange) {
            props.getDataOnChange(_data);
        }
        if (props.required) {
            if (!_data) {
                if (props.onError) {
                    props.onError(true);
                }
                setError(true);
            } else {
                setError(false);
                if (props.onError) {
                    props.onError(false);
                }
            }
        }
    }
    const handlePasteCleanup =(e)=>{
        handleChange(e)
    }
    const handleBeforePasteCleanup =(e)=>{
        handleChange(e)
    }
    const handleDestroy = (e) => {
        setCreated(false)
    }
    const handleCreate = (e) => {
        setCreated(true)
    }
    useEffect(() => {
        if (loading) setLoading(false)
        if(editorRef.current)
        editorRef.current.value=props?.data
        if(editorRef.current?.value){
            setError(false)
        }
    }, [props,loading])

    return ( 
        <React.Fragment>
            {!loading && (<React.Fragment>
                <RichTextEditorComponent
                    created={handleCreate}
                    destroyed={handleDestroy}
                    afterPasteCleanup={handlePasteCleanup}
                    beforePasteCleanup={handleBeforePasteCleanup}
                    onBlur={handleBlur}
                    alt={`RTE`}
                    value={props.data}
                    keyConfig={keyConfig}
                    height={props?.height??'auto'}
                    width={props?.width??'100%'}
                    enableAutoUrl={props?.properties?.enableAutoUrl ?? true}
                    enableResize={props?.properties?.enableResize ?? false}
                    enableTabKey={props?.properties?.enableTabKey ?? false}
                    enableXhtml={props?.properties?.enableXhtml ?? false}
                    enabled={props?.properties?.enabled ?? true}
                    maxLength={props?.properties?.maxLength ?? -1}
                    readOnly={props?.properties?.readOnly ?? false}
                    showCharCount={props?.properties?.showCharCount ?? false}
                    placeholder={props?.placeholder ?? 'Write something here...'}
                    ref={editorRef} toolbarSettings={toolbarSettings}>
                      
                    <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, PasteCleanup, FileManager, Resize, MarkdownEditor, Count, Table]} />
                </RichTextEditorComponent>
                {props.required && error && (
                    <FormHelperText className=" text-red-100">
                        {props?.errorText ? props.errorText : "Field is required"}
                    </FormHelperText>
                )}
            </React.Fragment>)}
            {loading && (<h2> {LOADING_MESSAGE_DEFAULT} </h2>)}
        </React.Fragment>
    )
}

export default SyncFusionRTE