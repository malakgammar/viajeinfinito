<?php

namespace App\Http\Controllers;

use App\Models\Forfait;
use Illuminate\Http\Request;

class ForfaitController extends Controller
{
    /**
     * Affiche tous les forfaits disponibles
     */
    public function index()
    {
        $forfaits = Forfait::all();
        
        // Ensure features is always an array when returned
        $forfaits->transform(function ($forfait) {
            $forfait->features = $this->parseFeatures($forfait->features);
            return $forfait;
        });
        
        return response()->json($forfaits);
    }
    
    /**
     * Parse features into consistent array format
     */
    protected function parseFeatures($features)
    {
        if (is_array($features)) {
            return $features;
        }
        
        if (is_string($features)) {
            $decoded = json_decode($features, true);
            return is_array($decoded) ? $decoded : [$features];
        }
        
        return [];
    }
}