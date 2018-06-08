jQuery(document).on('turbolinks:load', function() {
    var $messages, $new_message_form, $new_message_body;
    $messages = $('#messages');
    $new_message_form = $('#new-message');
    $new_message_body = $new_message_form.find('#message-body');
    if($messages.length > 0) {
        return App.chat = App.cable.subscriptions.create({
            channel: 'ChatChannel'
        }, {
            connected: function () {},
            disconnected: function () {},
            received: function(data) {},
            send_message: function (message) {}
        });
    }
});