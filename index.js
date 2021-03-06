'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends6 = require('babel-runtime/helpers/extends');

var _extends7 = _interopRequireDefault(_extends6);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

var SHOW = '@@DVA_LOADING/SHOW';
var HIDE = '@@DVA_LOADING/HIDE';
var NAMESPACE = 'loading';

function createLoading() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var namespace = opts.namespace || NAMESPACE;
    var initialState = {
        global: false,
        models: {}
    };
    if (opts.effects) {
        initialState.effects = {};
    }

    var getStatus = (function () {
        const storage = {};
        return (actionType, show) => {
            storage[actionType] = storage[actionType] || 0;
            show ? storage[actionType]++ : storage[actionType]--;
            return !!storage[actionType];
        }
    }());

    var extraReducers = (0, _defineProperty3.default)({}, namespace, function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var _ref = arguments[1];
        var type = _ref.type;
        var payload = _ref.payload;

        var _ref2 = payload || {};

        var namespace = _ref2.namespace;
        var actionType = _ref2.actionType;

        var ret = void 0;

        (function () {
            switch (type) {
                case SHOW:
                    ret = (0, _extends7.default)({}, state, {
                        global: true,
                        models: (0, _extends7.default)({}, state.models, (0, _defineProperty3.default)({}, namespace, getStatus(namespace, true)))
                    });
                    if (opts.effects) {
                        ret.effects = (0, _extends7.default)({}, state.effects, (0, _defineProperty3.default)({}, actionType, getStatus(actionType, true)));
                    }
                    break;
                case HIDE:
                    var models = (0, _extends7.default)({}, state.models, (0, _defineProperty3.default)({}, namespace, getStatus(namespace, false)));
                    var global = (0, _keys2.default)(models).some(function (namespace) {
                        return models[namespace];
                    });
                    ret = (0, _extends7.default)({}, state, {
                        global: global,
                        models: models
                    });
                    if (opts.effects) {
                        ret.effects = (0, _extends7.default)({}, state.effects, (0, _defineProperty3.default)({}, actionType, getStatus(actionType, false)));
                    }
                    break;
                default:
                    ret = state;
                    break;
            }
        })();

        return ret;
    });

    function onEffect(effect, _ref3, model, actionType) {
        var put = _ref3.put;
        var namespace = model.namespace;

        return _regenerator2.default.mark(function _callee() {
            var _args = arguments;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return put({type: SHOW, payload: {namespace: namespace, actionType: actionType}});

                        case 2:
                            _context.next = 4;
                            console.log(model, actionType);
                            return effect.apply(undefined, _args);

                        case 4:
                            _context.next = 6;
                            return put({type: HIDE, payload: {namespace: namespace, actionType: actionType}});

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        });
    }

    return {
        extraReducers: extraReducers,
        onEffect: onEffect
    };
}

exports.default = createLoading;
module.exports = exports['default'];