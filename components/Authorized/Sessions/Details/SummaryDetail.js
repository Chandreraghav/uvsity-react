
import React from 'react'
import Spacer from '../../../shared/Spacer'
import SummarizeIcon from '@mui/icons-material/Summarize';
import ReadMore from '../../../shared/ReadMore';
function SummaryDetail(props) {
    if (!props.summary) return (<></>)
    return (
        props?.summary?.html && (
            <div className="  border-0 p-2  shadow-md bg-repeat-round rounded-lg">
                <div className="text-md flex gap-2">
                    <SummarizeIcon className=" leading-3 font-semibold  text-xl text-gray-600" />{" "}
                    <span className="text-md leading-tight font-semibold text-gray-600">
                        Summary
                    </span>
                </div>

                <Spacer />
                <ReadMore parseHtml initialReadLimit={250}>
                    {props?.summary?.html}
                </ReadMore>

            </div>
        )
    )
}

export default SummaryDetail