import { HtmlEditor, Image, Inject, Link, PasteCleanup, QuickToolbar, RichTextEditorComponent, Count, MarkdownEditor, Toolbar, FileManager, Resize, Table } from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import { RTE_TOOLBAR } from '../../../constants/constants';

function SyncFusionRTE(props) {
    let toolbarSettings = {
        items: props?.toolbar ? props.toolbar : RTE_TOOLBAR.ADVANCED

    };
    return (
        <RichTextEditorComponent toolbarSettings={toolbarSettings}>
            <div className="">&nbsp;</div>
            <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, PasteCleanup, FileManager, Resize, MarkdownEditor, Count, Table]} />
        </RichTextEditorComponent>

    )
}

export default SyncFusionRTE