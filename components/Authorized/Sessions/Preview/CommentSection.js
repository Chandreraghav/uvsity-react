import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Divider from "@mui/material/Divider";
import { useGetTopicDetail } from '../../../../hooks';
import { convertTopicsToCommentProps } from '../../../../converter';
import SessionStyle from "../../../../styles/Session.module.css";
import { Comment, navigateToProfile } from '../../Shared';
import Shimmer from './Shimmer/Shimmer';

const CommentSection = ({ topicId }) => {
  const router = useRouter();
  const { data, isLoading } = useGetTopicDetail(topicId);

  const commentsData = useMemo(() => {
    return convertTopicsToCommentProps(data?.topicTO?.topicComments || []);
  }, [data])

  return (
    <>
      <Shimmer visible={isLoading} />
      <Divider className={SessionStyle.preview__card__divider} />
      {!isLoading && (
        <section className="p-2">
          {commentsData.map((eachComment) => {
            return (
              <Comment key={eachComment.id} {...eachComment} onUserNameClick={(userDetailsId) => navigateToProfile(userDetailsId, router)}/>
            )
          })}
        </section>
      )}
    </>

  )
}

export default CommentSection;
