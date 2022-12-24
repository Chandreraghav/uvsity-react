import { Box, Chip, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'

function Breadcrumb(props) {

    const handleDelete = (e, object) => {
        if (props.handleEvent) {
            props.handleEvent(object, 'delete')
        }
    }
    const [breadcrumbs, setBreadCrumbs] = useState([])
    useEffect(() => {
        setBreadCrumbs(props.data ?? [])
    }, [props.data])
    return (
        <>
            {breadcrumbs.length > 0 && (
                <Box className="flex-wrap flex gap-2">
                    {breadcrumbs.filter((crumb) => crumb.title).map((crumb, idx) => (
                        <Tooltip title={crumb.title} key={idx}>
                            {crumb.deleteable ? (<Chip style={{ maxWidth: props.width ?? 300 }} color={props.color ?? 'primary'}
                                label={props.showKeys ? (<>{crumb.key && (<strong>{crumb.key}:</strong>)}{crumb.title}</>) : (<>{crumb.title}</>)} variant={props.variant ?? 'outlined'} onDelete={(e) => handleDelete(e, crumb)} />)
                                : (<Chip style={{ maxWidth: props.width ?? 300 }} color={props.color ?? 'primary'} label={props.showKeys ? (<>{crumb.key && (<strong>{crumb.key}:</strong>)}{crumb.title}</>) : (<>{crumb.title}</>)} variant={props.variant ?? 'outlined'} />)}
                        </Tooltip>))}
                </Box>
            )}

        </>
    )
}

export default Breadcrumb