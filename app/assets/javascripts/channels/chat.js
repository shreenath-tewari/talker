jQuery(document).on('turbolinks:load', function() {

    var $messages, $new_message_form, $new_message_body;

    $messages = $('#messages');
    $new_message_form = $('#new-message');
    $new_message_body = $new_message_form.find('#message-body');

    if($messages.length > 0) {
        App.chat = App.cable.subscriptions.create({
            channel: 'ChatChannel'
        }, {
            connected: function () {},
            disconnected: function () {},
            received: function(data) {
                if(data['message']) {
                    $new_message_body.val('');
                    $messages.append(data['message']);
                }
            },
            send_message: function (message) {
                return this.perform('send_message', {
                    message: message
                });
            }
        });

        return $new_message_form.submit(function(e) {
            var $this, message_body;
            $this = $(this);
            message_body = $new_message_body.val();
            if($.trim(message_body).length > 0) {
                App.chat.send_message(message_body);
            }
            e.preventDefault();
            return false
        });
    }

});