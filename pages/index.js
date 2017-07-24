import React from 'react';
import PropTypes from 'prop-types';
import HeadMeta from 'components/HeadMeta';
import AuthorItem from 'components/AuthorItem/AuthorItem';
import PostItem from 'components/PostItem/PostItem';
import { getPublicPosts } from 'utils/helpers';

const BlogIndex = ({ route, lang }) => {
    const { page, pages } = route;
    const publicPages = getPublicPosts(pages, lang);

    return (
        <div className="wrapper">
            <HeadMeta {...page} />
            <AuthorItem />
            <div style={{ marginTop: '4.5em' }}>
                {publicPages.map((page, index) => (
                    <div key={index} style={{ marginBottom: '3em' }}>
                        <PostItem page={page} lang={lang} />
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    )
}

BlogIndex.propTypes = {
  route: PropTypes.shape({
      page: PropTypes.object,
      pages: PropTypes.array,
  }),
  lang: PropTypes.string,
}

export default BlogIndex;
