<?php

namespace App\Http\Controllers;

use App\Models\Offre;

class TourController extends Controller
{
    public function adventure()
    {
        $tours = Offre::adventureTours()->get();
        return view('tours.adventure', compact('tours'));
    }

    public function culture()
    {
        $tours = Offre::cultureTours()->get();
        return view('tours.culture', compact('tours'));
    }
}