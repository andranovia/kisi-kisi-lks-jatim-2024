<?php


$mainImage = imagecreatefromjpeg('media.jpg');
$watermark = imagecreatefrompng('watermark.png');

$mainWidth = imagesx($mainImage);
$mainHeight = imagesy($mainImage);
$watermarkWidth = imagesx($watermark);
$watermarkHeight = imagesy($watermark);
$padding = 10;
$watermarkX = $mainWidth - $watermarkWidth - $padding;
$watermarkY = $padding;
imagecopy($mainImage, $watermark, $watermarkX, $watermarkY, 0, 0, $watermarkWidth, $watermarkHeight);
header('Content-Type: image/jpeg');
imagejpeg($mainImage);
imagedestroy($mainImage);
imagedestroy($watermark);
