import sortBy from 'lodash/sortBy';
import get from 'lodash/get';
import truncate from 'lodash/truncate';
import includes from 'lodash/includes';
import find from 'lodash/find';
import { prefixLink } from 'gatsby-helpers';

export const getAbstract = (post, length = 240) => {
    const html = post.description || post.body;
    const truncateOptions = {
        length,
        separator: /,? +/,
    };

    return html ? truncate(html.replace(/<[^>]*>/g, ''), truncateOptions) : '';
};

export const truncateForTwitter = (text) => {
    const textLength = 80;
    const truncateOptions = {
        length: textLength,
        separator: /,? +/,
    };

    return truncate(text, truncateOptions);
};

export const getPublicPosts = (pages, lang = 'en', limit = 0, excludePage = {}) => {
    const sortedPages = sortBy(pages, (page) => {
        return get(page, 'data.date');
    }).reverse();

    const filteredPages = sortedPages.filter((page) => {
        return get(page, 'file.ext') === 'md' &&
            !includes(page.path, '/404') &&
            !get(page, 'data.draft') &&
            get(page, 'data.lang') === lang &&
            get(page, 'data.path') !== get(excludePage, 'data.path');
    });

    if (limit > 0) {
        return filteredPages.splice(0, limit);
    }

    return filteredPages;
};

const isServer = () => {
    return !(typeof window !== 'undefined' && window.document);
};

export const getEmail = () => {
    if (isServer()) {
        return 'spam-protected@email.com';
    }

    return 'moc.liamg@sabru.sirk'.split('').reverse().join('');
};

export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getCurrentPage = (pages, location) => {
    return find(pages, (page) => {
        return prefixLink(page.path) === location.pathname;
    });
};
