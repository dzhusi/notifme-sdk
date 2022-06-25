'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Types
var WebsocketCentrifugoProvider = function () {
  function WebsocketCentrifugoProvider(_ref) {
    var _this = this;

    var apiUrl = _ref.apiUrl,
        apiKey = _ref.apiKey,
        apiSecret = _ref.apiSecret;
    (0, _classCallCheck3.default)(this, WebsocketCentrifugoProvider);
    this.id = 'websocket-centrifugo-provider';

    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
    this.apiSecret = apiSecret;
    this.authToken = _jsonwebtoken2.default.sign("system", apiSecret);
    this.client = _axios2.default.create({
      baseURL: this.apiUrl
    });
    this.client.interceptors.request.use(function (config) {
      config.headers = { Authorization: 'Bearer ' + _this.authToken };
    });
  }

  (0, _createClass3.default)(WebsocketCentrifugoProvider, [{
    key: 'send',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(request) {
        var _ref3, channel, body;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!request.customize) {
                  _context.next = 6;
                  break;
                }

                _context.next = 3;
                return request.customize(this.id, request);

              case 3:
                _context.t0 = _context.sent;
                _context.next = 7;
                break;

              case 6:
                _context.t0 = request;

              case 7:
                _ref3 = _context.t0;
                channel = _ref3.channel;
                body = _ref3.body;
                _context.next = 12;
                return this.client.post('/', {
                  'method': 'publish',
                  'params': {
                    'channel': channel,
                    'data': body
                  }
                });

              case 12:
                return _context.abrupt('return', _context.sent);

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function send(_x) {
        return _ref2.apply(this, arguments);
      }

      return send;
    }()
  }]);
  return WebsocketCentrifugoProvider;
}();

exports.default = WebsocketCentrifugoProvider;