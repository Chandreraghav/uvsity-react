import { Button, Tooltip } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { SESSION } from '../../../../constants'
import SessionReviewDialog from '../../../shared/modals/SessionReviewDialog'

function ReviewSession(props) {
    const [reviewDialogOpened, setReviewDialogOpened] = useState(false)
    const [currentItemClicked, setCurrentItemClicked] = useState(null)

    const handleClick = (item) => {
        setCurrentItemClicked(item.title)
        setReviewDialogOpened(true)
    }
    const onReviewDialogClose = (obj) => {
        setReviewDialogOpened(false)
    }
    const getTooltip = useCallback((input) => {
        if (input.id == 2) {
            return input.tooltip.replace('<#X>', props.session.creator.firstName)
        }
        return input.tooltip
    }, [props.session.creator.firstName])
    return (
        <div className="flex gap-2">
            {SESSION.MENU[1].feedback.map((review) => (
                <div key={review.id}>
                    <Tooltip arrow title={getTooltip(review)}>
                        <Button onClick={() => handleClick(review)} variant="contained" startIcon={review.icon}>
                            {review.title}
                        </Button>
                    </Tooltip>

                </div>))}

            <SessionReviewDialog type={currentItemClicked} data={props.session} isOpen={reviewDialogOpened} dialogCloseRequest={onReviewDialogClose} />

        </div>
    )
}

export default ReviewSession