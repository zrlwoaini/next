import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

var _class, _temp;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ConfigProvider from '../config-provider';

/**
 * Icon
 */
var Icon = (_temp = _class = function (_Component) {
    _inherits(Icon, _Component);

    function Icon() {
        _classCallCheck(this, Icon);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Icon.prototype.render = function render() {
        var _cx;

        var _props = this.props,
            prefix = _props.prefix,
            type = _props.type,
            size = _props.size,
            className = _props.className,
            other = _objectWithoutProperties(_props, ['prefix', 'type', 'size', 'className']);

        var classes = cx((_cx = {}, _cx[prefix + 'icon'] = true, _cx[prefix + 'icon-' + type] = !!type, _cx['' + prefix + size] = !!size, _cx[className] = !!className, _cx));
        return React.createElement('i', _extends({}, other, { className: classes }));
    };

    return Icon;
}(Component), _class.propTypes = {
    /**
    * 样式类名的品牌前缀
    */
    prefix: PropTypes.string,
    /**
     * 指定显示哪种图标
     */
    type: PropTypes.string,
    /**
     * 指定图标大小
     */
    size: PropTypes.oneOf(['xxs', 'xs', 'small', 'medium', 'large', 'xl', 'xxl', 'xxxl']),
    className: PropTypes.string
}, _class.defaultProps = {
    prefix: 'next-',
    size: 'medium'
}, _class._typeMark = 'icon', _temp);
Icon.displayName = 'Icon';


export default ConfigProvider.config(Icon);