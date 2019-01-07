import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExternalLink from '@soundnode-redux/client/src/common/components/links/ExternalLink';
import RouterLink from '@soundnode-redux/client/src/common/components/links/RouterLink';
import { compose } from 'recompose';
import withImageFadeInOnLoad from '@soundnode-redux/client/src/common/hocs/withImageFadeInOnLoad';
import withImageFallbackOnError from '@soundnode-redux/client/src/common/hocs/withImageFallbackOnError';
// Not working!!
import { margins, paddings } from '@soundnode-redux/client/src/app/css/mixin';

const Wrapper = styled.div`
  position: relative;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  ${margins};
  ${paddings};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${props => props.rounded && '50%'};
  display: inline-block;
  opacity: ${props => (props.loaded ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

// Size tiny small medium large
function getWidthAndHeight(size) {
  switch (size) {
    case 'tiny':
      return '32px';
    case 'mini':
      return '50px';
    case 'small':
      return '100px';
    case 'medium':
      return '206px';
    case 'large':
      return '300px';
    case 'xlarge':
      return '350px';
    case 'fluid':
      return '100%';
    default:
      return null;
  }
}

// const cdnPrefix = 'http://res.cloudinary.com/drijsmsvv/image/fetch/w_400/';
function Image(props) {
  const {
    linkTo,
    externalLink,
    src,
    size,
    children,
    mt,
    mr,
    ml,
    mb,
    pt,
    pr,
    pb,
    pl,
    ...rest
  } = props;
  const WrapperLink = externalLink ? ExternalLink : RouterLink;
  const wh = getWidthAndHeight(size);

  // Reduce the image size by using cdn to resize.
  // const img = <StyledImage src={`${cdnPrefix}${props.src}`} {...rest} />;
  const img = (
    <Wrapper width={wh} height={wh} mt={mt} mr={mr} mb={mb} ml={ml} pt={pt} pr={pr} pl={pl} pb={pb}>
      <StyledImage src={src} {...rest} />
      {children}
    </Wrapper>
  );

  if (linkTo) {
    // Wrap within a link
    return <WrapperLink to={linkTo}>{img}</WrapperLink>;
  }
  return img;
}

Image.defaultProps = {
  // width: '100%',
  // height: '100%',
  linkTo: null,
  loaded: false,
  size: 'fluid',
  children: null,
  // Not used yet
  fadeIn: true,
  externalLink: false,
  fallbackSrc: null,
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['tiny', 'mini', 'small', 'medium', 'large', 'fluid']),
  // width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loaded: PropTypes.bool,
  fadeIn: PropTypes.bool,
  linkTo: PropTypes.string,
  externalLink: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default compose(withImageFallbackOnError, withImageFadeInOnLoad)(Image);
