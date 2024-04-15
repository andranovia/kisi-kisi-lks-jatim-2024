<?php

$translations_json = file_get_contents('./translation.json');
$translations = json_decode($translations_json, true);

$selected_language = isset($_POST['language']) ? $_POST['language'] : 'en';

function translate($word, $language, $translations)
{
    if (isset($translations[$word][$language])) {
        return $translations[$word][$language];
    } else {
        return $word;
    }
}

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <p><?php echo translate('hello', $selected_language, $translations); ?></p>

    <form method="post">
        <select name="language" onchange="this.form.submit()">
            <option value="en" <?php if ($selected_language == 'en') echo 'selected'; ?>>English</option>
            <option value="fr" <?php if ($selected_language == 'fr') echo 'selected'; ?>>French</option>
        </select>
    </form>

</body>

</html>