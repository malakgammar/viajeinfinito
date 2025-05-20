<?php

namespace App\Http\Controllers;

use App\Models\Offre;

class DestinationController extends Controller
{
    public function europe()
    {
        $destinations = Offre::europeDestinations()->get();
        return view('destinations.europe', compact('destinations'));
    }

    public function asia()
    {
        $destinations = Offre::asiaDestinations()->get();
        return view('destinations.asia', compact('destinations'));
    }

    public function africa()
    {
        $destinations = Offre::africaDestinations()->get();
        return view('destinations.africa', compact('destinations'));
    }
}