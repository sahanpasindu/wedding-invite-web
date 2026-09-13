<?php
/**
 * Optional RSVP Backend Handler for XAMPP / PHP Server
 * Saves submissions to ../data/rsvps.json safely
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Only POST requests allowed']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || empty($data['guestName'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid RSVP data received']);
    exit;
}

$dataFile = __DIR__ . '/../data/rsvps.json';
$existing = [];

if (file_exists($dataFile)) {
    $content = file_get_contents($dataFile);
    $existing = json_decode($content, true) ?: [];
}

$newEntry = [
    'id' => uniqid('rsvp_', true),
    'guestName' => htmlspecialchars($data['guestName']),
    'attendance' => htmlspecialchars($data['attendance'] ?? 'Yes'),
    'guestCount' => intval($data['guestCount'] ?? 1),
    'diet' => htmlspecialchars($data['diet'] ?? 'None'),
    'note' => htmlspecialchars($data['note'] ?? ''),
    'submittedAt' => date('c')
];

$existing[] = $newEntry;
file_put_contents($dataFile, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(['status' => 'success', 'message' => 'RSVP recorded successfully', 'data' => $newEntry]);
