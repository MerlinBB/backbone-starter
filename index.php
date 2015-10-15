<?php

    $devIps = array(
        '127.0.0.1',
        '192.168.1.144',
        '::1'
    );

    $local = in_array($_SERVER['REMOTE_ADDR'], $devIps);

    $env = ($local ? "local" : getenv('APP_ENV'));
?>

<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="HandheldFriendly" content="true">

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">

    <meta name="description" content="Welcome">

    <title>Backbone Starter</title>

    <link rel="stylesheet" type="text/css" media="all" href="/style.css?c7ee1c07">

    <link rel="shortcut icon" type="image/png" href="/img/favicons/logo-icon-32x32.png">
    <link rel="apple-touch-icon" href="/img/favicons/logo-icon-76x76.png" sizes="76x76">
    <link rel="apple-touch-icon" href="/img/favicons/logo-icon-120x120.png" sizes="120x120">
    <link rel="apple-touch-icon" href="/img/favicons/logo-icon-152x152.png" sizes="152x152">
    <meta name="msapplication-TileColor" content="#d25353">
    <meta name="msapplication-TileImage" content="/img/favicons/logo-icon-152x152.png">

</head>
<body>

<header class="view header"></header>

<section class="view page">
    <div class="spinner"></div>
</section>



<?php
    // If we're in production mode, include minified concatenated script
    // if not then pull them in unminified individually for easier debugging

    if ($env === 'production' || $env === 'staging') {
        echo ('
            <script src="/js/production.js?146147d0"></script>
        ');
    } else {
        echo ('
            <script src="/js/bower/jquery/dist/jquery.js"></script>
            <script src="/js/bower/underscore/underscore.js"></script>
            <script src="/js/bower/backbone/backbone.js"></script>
            <script src="/js/modernizr-custom.js"></script>

            <script src="/js/app.js"></script>
            <script src="/js/config.js"></script>

            <script src="/js/collections/users.collection.js"></script>

            <script src="/js/models/user.model.js"></script>

            <script src="/js/views/helpers/header.view.js"></script>
            <script src="/js/views/helpers/static.view.js"></script>

            <script src="/js/views/users.view.js"></script>
            <script src="/js/views/user.view.js"></script>

            <script src="/js/router.js"></script>
            <script src="/js/helpers.js"></script>
        ');
    }
?>

</body>
</html>
