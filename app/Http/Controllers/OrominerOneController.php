<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Orominer1Controller extends Controller
{
    public function get_xml_file(): void
    {

        $filePath = storage_path('oro_xml1.xml');
        // Check if file exists
            if (file_exists($filePath)) {
                // Read data from the file
                $data = file_get_contents($filePath);
               
            } else {
                $data = "File does not exist.";
            }
            echo json_encode($data);

    }
   
}
