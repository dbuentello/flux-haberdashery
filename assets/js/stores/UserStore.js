(function() {

  var AppDispatcher = fh.dispatcher;
  var EventEmitter = fh.libs.eventemitter;

  var CHANGE_EVENT = 'change';

  var _users = null;
  var _currPage = null;

  var UserStore = assign({}, EventEmitter.prototype, {

    init: function(rawMessages) {
      rawMessages.forEach(function(message) {
        var threadID = message.threadID;
        var thread = _threads[threadID];
        if (thread && thread.lastTimestamp > message.timestamp) {
          return;
        }
        _threads[threadID] = {
          id: threadID,
          name: message.threadName,
          lastMessage: ChatMessageUtils.convertRawMessage(message, _currentID)
        };
      }, this);

      if (!_currentID) {
        var allChrono = this.getAllChrono();
        _currentID = allChrono[allChrono.length - 1].id;
      }

      _threads[_currentID].lastMessage.isRead = true;
    },

    emitChange: function() {
      this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    /**
     * @param {string} id
     */
    get: function(id) {
      return _threads[id];
    },

    getAll: function() {
      return _threads;
    },

    getAllChrono: function() {
      var orderedThreads = [];
      for (var id in _threads) {
        var thread = _threads[id];
        orderedThreads.push(thread);
      }
      orderedThreads.sort(function(a, b) {
        if (a.lastMessage.date < b.lastMessage.date) {
          return -1;
        } else if (a.lastMessage.date > b.lastMessage.date) {
          return 1;
        }
        return 0;
      });
      return orderedThreads;
    },

    getCurrentID: function() {
      return _currentID;
    },

    getCurrent: function() {
      return this.get(this.getCurrentID());
    }

  });

  ThreadStore.dispatchToken = ChatAppDispatcher.register(function(action) {

    switch(action.type) {

      case ActionTypes.CLICK_THREAD:
        _currentID = action.threadID;
        _threads[_currentID].lastMessage.isRead = true;
        ThreadStore.emitChange();
        break;

      case ActionTypes.RECEIVE_RAW_MESSAGES:
        ThreadStore.init(action.rawMessages);
        ThreadStore.emitChange();
        break;

      default:
      // do nothing
    }

  });


})();
