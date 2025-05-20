<?php

namespace App\Http\Controllers;

use App\Models\Offre;

class HotelController extends Controller
{
    public function fiveStar()
    {
        $hotels = Offre::fiveStarHotels()->get();
        return view('hotel.5star', compact('hotels'));
    }

    public function budget()
    {
        $hotels = Offre::budgetHotels()->get();
        return view('hotel.budget', compact('hotels'));
    }
}