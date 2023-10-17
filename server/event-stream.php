<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

echo 'data: ' . rand(1, 100) . PHP_EOL . PHP_EOL;

ob_end_flush();
flush();
?>