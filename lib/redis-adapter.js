// Generated by CoffeeScript 1.6.2
(function() {
  var RedisAdapter, redis;

  redis = require('redis');

  module.exports = RedisAdapter = (function() {
    function RedisAdapter(options) {
      var config;

      config = options.config || null;
      this.redisPubClient = redis.createClient(config);
      this.redisSubClient = redis.createClient(config);
    }

    RedisAdapter.prototype.pub = function(channel, data) {
      return this.redisPubClient.publish(channel, this._stringify(data));
    };

    RedisAdapter.prototype.sub = function(channel, callback) {
      return this.redisSubClient.subscribe(channel);
    };

    RedisAdapter.prototype.on = function(callback) {
      var _this = this;

      return this.redisSubClient.on('message', function(channel, message) {
        return callback(_this._parse(message));
      });
    };

    RedisAdapter.prototype.close = function() {
      this.redisPubClient.end();
      return this.redisSubClient.end();
    };

    RedisAdapter.prototype._stringify = function(data) {
      return JSON.stringify(data);
    };

    RedisAdapter.prototype._parse = function(data) {
      return JSON.parse(data);
    };

    return RedisAdapter;

  })();

}).call(this);