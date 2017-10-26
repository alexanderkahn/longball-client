import PropTypes from 'prop-types';

export const userProp = PropTypes.shape({
    name: PropTypes.string.isRequired,
});

export const currentViewProp = PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
});

export const leagueProp = PropTypes.shape({
    id: PropTypes.string.isRequired,
    attributes: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
});

export const teamProp = PropTypes.shape({
    id: PropTypes.string.isRequired,
    attributes: PropTypes.shape({
        abbreviation: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired,
    }).isRequired,
});

export const personProp = PropTypes.shape({
    attributes: PropTypes.shape({
        first: PropTypes.string.isRequired,
        last: PropTypes.string.isRequired,
    }).isRequired,
});

export const rosterPositionProp = PropTypes.shape({
    id: PropTypes.string.isRequired,
});
