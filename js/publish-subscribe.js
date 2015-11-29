/**
 * Publish-Subscribe
 *
 * @Reference:
 * https://davidwalsh.name/pubsub-javascript
 *
 */

// Pub-Sub module to help you publish to a topic and anyone can subscribe.
var events = (function() {
  var topics = {};

  return  {
    subscribe: function(topic, listener) {
      // Create the topic's object if not created.
      if(!topics.hasOwnProperty(topic)) topics[topic] = [];

      // Add the listener to queue
      var index = topics[topic].push(listener) - 1;

      // Provide handle back for removal of topic
      return {
        remove: function() {
          delete topics[topic][index];
        }
      }
    },
    publish: function(topic, info) {
      // If the topic doesn't exist, or there's no listeners in queue, just leave
      if(!topics.hasOwnProperty(topic)) return;

      // Cycle through topics queue, fire!
      topics[topic].forEach(function(item) {
        item(info != undefined ? info : {});
      })
    }
  }
})();


// Publishing to a topic
events.publish('/page/load', {
  url: '/some/url/path'   // any argument
});


// ...and subscribing to said topic in order to be notified of events:
var subscription = events.subscribe('/page.load', function(obj) {
  // Do something now that the event has occurred.
});

// ..sometime later where I no longer want subscription...
subscription.remove();