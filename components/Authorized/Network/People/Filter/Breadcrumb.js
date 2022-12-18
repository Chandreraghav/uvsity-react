import { Box, Chip, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'

function Breadcrumb(props) {
    const handleDelete = (e) => {

    }
    const [breadcrumbs, setBreadCrumbs] = useState([])
    useEffect(() => {
        setBreadCrumbs(props.data ?? [])
    }, [props.data])
    return (
        <>
            {breadcrumbs.length > 0 && (

                <Box className="flex-wrap flex gap-2">
                    {breadcrumbs.map((crumb, idx) => (<>
                        {crumb.deleteable ? (<Chip key={idx} color="primary" label={crumb.title} variant="outlined" onDelete={handleDelete} />) : (<Chip key={idx} color="primary" label={crumb.title} variant="outlined" />)}

                    </>))}
                </Box>
            )}

        </>
    )
}

export default Breadcrumb