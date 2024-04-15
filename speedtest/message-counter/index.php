<?php

$messages = file_get_contents('./message.json');
$data = json_decode($messages, true);

$total_message_sent = 0;
$total_message_received = 0;
$total_character_sent = 0;
$total_character_received = 0;
$word_frequency = [];

foreach ($data['messages'] as $message) {
    if ($message['type'] === 'sent') {

        $total_message_sent++;
        $total_character_sent += strlen($message['text']);
    } else if ($message['type'] === 'received') {
        $total_message_received++;
        $total_character_received += strlen($message['text']);
    }

    $words = preg_split('/\s+/', $message['text'], -1, PREG_SPLIT_NO_EMPTY);
    foreach ($words as $word) {
        $word = strtolower($word);
        if (!isset($word_frequency[$word])) {
            $word_frequency[$word] = 1;
        } else {
            $word_frequency[$word]++;
        }
    }
}

arsort($word_frequency);
$top_sent_word =  array_slice(array_keys($word_frequency), 0, 5);
$average_sent_length = $total_message_sent > 0 ? round($total_character_sent / $total_message_sent) : 0;
$average_received_length = $total_message_received > 0 ? round($total_character_received / $total_message_received) : 0;

echo "<ul>";
echo "<li> Top 5 Sent Words: <br/>";
foreach ($top_sent_word as $word) {
    echo "<li style='list-style-type: circle; margin-left: 3rem'>";
    echo "$word ($word_frequency[$word]x)";
    echo "</li>";
}
echo "<li> Total Messages Sent: $total_message_sent   <br/></li>";
echo "<li> Total Messages Received: $total_message_received   <br/></li>";
echo "<li> Average Character Length of Sent Messages: $average_sent_length <br/></li>";
echo "<li> Average Character Length of Received Messages: $average_received_length <br/></li>";
echo "</ul>";
