import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

var _class, _temp;

import React from 'react';
import PropTypes from 'prop-types';
import Overlay from '../overlay';
import { func, obj, log } from '../util';
import BalloonInner from './inner';
import { normalMap, edgeMap } from './alignMap';

var noop = func.noop;
var Popup = Overlay.Popup;


var alignMap = normalMap;

/** Balloon */
var Balloon = (_temp = _class = function (_React$Component) {
    _inherits(Balloon, _React$Component);

    function Balloon(props, context) {
        _classCallCheck(this, Balloon);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        _this.state = {
            align: props.align,
            visible: 'visible' in props ? props.visible : props.defaultVisible
        };
        _this._onClose = _this._onClose.bind(_this);
        _this._onPosition = _this._onPosition.bind(_this);
        _this._onVisibleChange = _this._onVisibleChange.bind(_this);

        _this._contentId = props.id;
        return _this;
    }

    Balloon.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('visible' in nextProps) {
            this.setState({
                visible: nextProps.visible
            });
        }

        if ('align' in nextProps) {
            this.setState({
                align: nextProps.align
            });
        }
    };

    Balloon.prototype._onVisibleChange = function _onVisibleChange(visible, trigger) {
        // Not Controlled
        if (!('visible' in this.props)) {
            this.setState({
                visible: visible
            });
        }

        this.props.onVisibleChange(visible, trigger);

        if (!visible) {
            this.props.onClose();
        }
    };

    Balloon.prototype._onClose = function _onClose(e) {
        this._onVisibleChange(false, 'closeClick');

        //必须加上preventDefault,否则单测IE下报错,出现full page reload 异常
        e.preventDefault();
    };

    Balloon.prototype._onPosition = function _onPosition(res) {
        alignMap = this.props.alignEdge ? edgeMap : normalMap;
        var newAlign = res.align.join(' ');
        var resAlign = void 0;

        for (var key in alignMap) {
            if (alignMap[key].align === newAlign) {
                resAlign = key;

                break;
            }
        }
        resAlign = resAlign || this.state.align;
        if (resAlign !== this.state.align) {
            this.setState({
                align: resAlign
            });
        }
    };

    Balloon.prototype.render = function render() {
        var _props = this.props,
            type = _props.type,
            prefix = _props.prefix,
            className = _props.className,
            alignEdge = _props.alignEdge,
            trigger = _props.trigger,
            triggerType = _props.triggerType,
            children = _props.children,
            closable = _props.closable,
            shouldUpdatePosition = _props.shouldUpdatePosition,
            delay = _props.delay,
            needAdjust = _props.needAdjust,
            safeId = _props.safeId,
            autoFocus = _props.autoFocus,
            safeNode = _props.safeNode,
            onClick = _props.onClick,
            onHover = _props.onHover,
            animation = _props.animation,
            offset = _props.offset,
            style = _props.style,
            container = _props.container,
            popupContainer = _props.popupContainer,
            cache = _props.cache,
            popupStyle = _props.popupStyle,
            popupClassName = _props.popupClassName,
            popupProps = _props.popupProps,
            others = _objectWithoutProperties(_props, ['type', 'prefix', 'className', 'alignEdge', 'trigger', 'triggerType', 'children', 'closable', 'shouldUpdatePosition', 'delay', 'needAdjust', 'safeId', 'autoFocus', 'safeNode', 'onClick', 'onHover', 'animation', 'offset', 'style', 'container', 'popupContainer', 'cache', 'popupStyle', 'popupClassName', 'popupProps']);

        if (container) {
            log.deprecated('container', 'popupContainer', 'Balloon');
        }

        var align = this.state.align;


        alignMap = alignEdge ? edgeMap : normalMap;
        var _prefix = this.context.prefix || prefix;

        var _offset = [alignMap[align].offset[0] + offset[0], alignMap[align].offset[1] + offset[1]];
        var transformOrigin = alignMap[align].trOrigin;
        var _style = _extends({ transformOrigin: transformOrigin }, style);

        var content = React.createElement(
            BalloonInner,
            _extends({}, obj.pickOthers(Object.keys(Balloon.propTypes), others), {
                id: this._contentId,
                prefix: _prefix,
                closable: closable,
                onClose: this._onClose,
                className: className,
                style: _style,
                align: align,
                type: type,
                alignEdge: alignEdge
            }),
            children
        );

        var triggerProps = {};
        triggerProps['aria-describedby'] = this._contentId;
        triggerProps.tabIndex = '0';

        var newTrigger = React.cloneElement(trigger, triggerProps);

        return React.createElement(
            Popup,
            _extends({}, popupProps, {
                trigger: this._contentId ? newTrigger : trigger,
                cache: cache,
                safeId: safeId,
                triggerType: triggerType,
                align: alignMap[align].align,
                offset: _offset,
                visible: this.state.visible,
                onPosition: this._onPosition,
                onClick: onClick,
                onHover: onHover,
                afterClose: this.props.afterClose,
                onVisibleChange: this._onVisibleChange,
                shouldUpdatePosition: shouldUpdatePosition,
                needAdjust: needAdjust,
                animation: animation,
                delay: delay,
                autoFocus: autoFocus,
                safeNode: safeNode,
                container: popupContainer || container,
                className: popupClassName,
                style: popupStyle
            }),
            content
        );
    };

    return Balloon;
}(React.Component), _class.contextTypes = {
    prefix: PropTypes.string
}, _class.propTypes = {
    /**
     * 样式类名的品牌前缀
     */
    prefix: PropTypes.string,
    /**
     * 是否pure render
     */
    pure: PropTypes.bool,
    /**
     * 自定义类名
     */
    className: PropTypes.string,
    /**
     * 自定义内敛样式
     */
    style: PropTypes.object,
    /**
     * 浮层的内容
     */
    children: PropTypes.any,
    size: PropTypes.string,
    /**
     * 样式类型
     */
    type: PropTypes.oneOf(['normal', 'primary']),
    /**
     * 弹层当前显示的状态
     */
    visible: PropTypes.bool,
    /**
     * 弹层默认显示的状态
     */
    defaultVisible: PropTypes.bool,
    /**
     * 弹层在显示和隐藏触发的事件
     * @param {Boolean} visible 弹层是否隐藏和显示
     */
    onVisibleChange: PropTypes.func,
    /**
     * 弹出层对齐方式
     */
    alignEdge: PropTypes.bool,
    /**
     * 是否显示关闭按钮
     */
    closable: PropTypes.bool,
    /**
     * 弹出层位置
     * @enumdesc 上, 右, 下, 左, 上左, 上右, 下左, 下右, 左上, 左下, 右上, 右下 及其 两两组合
     */
    align: PropTypes.oneOf(['t', 'r', 'b', 'l', 'tl', 'tr', 'bl', 'br', 'lt', 'lb', 'rt', 'rb']),
    /**
     * 弹层相对于trigger的定位的微调
     */
    offset: PropTypes.array,
    /**
     * 触发元素
     */
    trigger: PropTypes.any,
    /**
     * 触发行为
     * 鼠标悬浮, 获取到焦点, 鼠标点击('hover'，'focus'，'click')或者它们组成的数组，如 ['hover', 'focus']
     */
    triggerType: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

    onClick: PropTypes.func,
    /**
     * 任何visible为false时会触发的事件
     */
    onClose: PropTypes.func,
    onHover: PropTypes.func,
    /**
     * 是否进行自动位置调整
     */
    needAdjust: PropTypes.bool,
    /**
     * 弹层在触发以后的延时显示, 单位毫秒 ms
     */
    delay: PropTypes.number,
    /**
     * 浮层关闭后触发的事件, 如果有动画，则在动画结束后触发
     */
    afterClose: PropTypes.func,
    /**
     * 强制更新定位信息
     */
    shouldUpdatePosition: PropTypes.bool,
    /**
     * 弹层出现后是否自动focus到内部第一个元素
     */
    autoFocus: PropTypes.bool,
    /**
     * 安全节点:对于triggetType为click的浮层,会在点击除了浮层外的其它区域时关闭浮层.safeNode用于添加不触发关闭的节点, 值可以是dom节点的id或者是节点的dom对象
     */
    safeNode: PropTypes.string,
    /**
     * 用来指定safeNode节点的id，和safeNode配合使用
     */
    safeId: PropTypes.string,
    /**
     * 配置动画的播放方式
     * @param {String} in 进场动画
     * @param {String} out 出场动画
     */
    animation: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),

    /**
     * 弹层的dom节点关闭时是否删除
     */
    cache: PropTypes.bool,
    /**
     * 指定浮层渲染的父节点, 可以为节点id的字符串，也可以返回节点的函数。
     */
    popupContainer: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    container: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * 弹层组件style，透传给Popup
     */
    popupStyle: PropTypes.object,
    /**
     * 弹层组件className，透传给Popup
     */
    popupClassName: PropTypes.string,
    /**
     * 弹层组件属性，透传给Popup
     */
    popupProps: PropTypes.object,
    /**
     * 弹层id, 传入值才会支持无障碍
     */
    id: PropTypes.string
}, _class.defaultProps = {
    prefix: 'next-',
    pure: false,
    type: 'normal',
    closable: true,
    defaultVisible: false,
    size: 'medium',
    alignEdge: false,
    align: 'b',
    offset: [0, 0],
    trigger: React.createElement('span', null),
    onClose: noop,
    afterClose: noop,
    onVisibleChange: noop,
    needAdjust: false,
    triggerType: 'hover',
    safeNode: undefined,
    safeId: null,
    autoFocus: false,
    animation: {
        in: 'zoomIn',
        out: 'zoomOut'
    },
    cache: false,
    popupStyle: {},
    popupClassName: '',
    popupProps: {}
}, _temp);
Balloon.displayName = 'Balloon';
export { Balloon as default };