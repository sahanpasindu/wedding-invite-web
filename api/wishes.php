<?php
/**
 * Lightweight File-Based Wishes API (Zero Database Required)
 * Stores wishes directly in ../data/wishes.json
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/../data/wishes.json';

// Helper to read data safely
function getWishes($file) {
    if (!file_exists($file)) {
        return [];
    }
    $content = file_get_contents($file);
    // Strip UTF-8 BOM if present
    $content = preg_replace('/^\xEF\xBB\xBF/', '', $content);
    $decoded = json_decode(trim($content), true);
    return is_array($decoded) ? $decoded : [];
}

// Helper to save data safely
function saveWishes($file, $wishes) {
    return file_put_contents($file, json_encode(array_values($wishes), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $wishes = getWishes($dataFile);
    echo json_encode(['status' => 'success', 'wishes' => $wishes]);
    exit;
}

if ($method === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON body']);
        exit;
    }

    $action = $data['action'] ?? 'add';
    $wishes = getWishes($dataFile);

    if ($action === 'add') {
        $author = trim($data['author'] ?? '');
        $text = trim($data['text'] ?? '');

        if (empty($author) || empty($text)) {
            echo json_encode(['status' => 'error', 'message' => 'Name and message are required']);
            exit;
        }

        $newEntry = [
            'id' => uniqid('wish_', true),
            'author' => htmlspecialchars($author, ENT_QUOTES, 'UTF-8'),
            'text' => htmlspecialchars($text, ENT_QUOTES, 'UTF-8'),
            'time' => 'Just now',
            'timestamp' => time()
        ];

        // Insert at beginning of list
        array_unshift($wishes, $newEntry);
        saveWishes($dataFile, $wishes);

        echo json_encode(['status' => 'success', 'message' => 'Wish added successfully', 'wish' => $newEntry]);
        exit;
    }

    if ($action === 'delete') {
        $id = $data['id'] ?? '';
        if (empty($id)) {
            echo json_encode(['status' => 'error', 'message' => 'Wish ID is required for deletion']);
            exit;
        }

        $filtered = [];
        $found = false;
        foreach ($wishes as $w) {
            if (($w['id'] ?? '') === $id) {
                $found = true;
                continue; // delete
            }
            $filtered[] = $w;
        }

        if ($found) {
            saveWishes($dataFile, $filtered);
            echo json_encode(['status' => 'success', 'message' => 'Wish removed successfully', 'deletedId' => $id]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Wish not found']);
        }
        exit;
    }

    echo json_encode(['status' => 'error', 'message' => 'Unknown action']);
    exit;
}

echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);