'use strict';

import React, { Component } from 'react';
import { isAgent } from 'utils';

class Avatar extends Component {
  getVisitorSvg() {
    return (
      <svg width="16" height="19" viewBox="0 0 16 19">
        <path d="M11.5 5c0-1.933-1.567-3.5-3.5-3.5S4.5 3.067 4.5 5 6.067 8.5 8 8.5s3.5-1.567 3.5-3.5zM3 5c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5zM1.955 17.294c.21-.642.504-1.285.898-1.88C3.963 13.74 5.615 12.75 8 12.75c2.385 0 4.038.99 5.147 2.664.394.595.69 1.238.898 1.88.124.382.19.672.214.822.063.41.447.69.856.625.41-.063.69-.447.625-.856-.034-.225-.118-.59-.27-1.053-.247-.763-.598-1.527-1.073-2.244C13.024 12.51 10.917 11.25 8 11.25c-2.916 0-5.024 1.26-6.397 3.336-.475.717-.826 1.48-1.074 2.245-.152.463-.236.83-.27 1.054-.065.41.215.793.624.857.41.065.793-.215.857-.624.025-.15.09-.44.215-.822z" fill="#FFF" fillRule="evenodd"/>
      </svg>
    );
  }

  renderAvatar(entity) {
    const style = {};
    let child;
    if (entity && isAgent(entity.nick) && entity.avatar_path) {
      style.backgroundImage = `url('${entity.avatar_path}')`;
      style.backgroundColor = 'none';
    } else {
      child = this.getVisitorSvg();
    }

    return (
      <div className="avatar" style={style} title={entity ? entity.display_name : 'Agent'}>
        {child}
      </div>
    );
  }

  render() {
    return this.renderAvatar(this.props.entity);
  }
}

Avatar.displayName = 'Avatar';
Avatar.propTypes = {
  entity: React.PropTypes.object
};

export default Avatar;
