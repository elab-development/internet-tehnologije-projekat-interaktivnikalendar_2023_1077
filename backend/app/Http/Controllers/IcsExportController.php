<?php

namespace App\Http\Controllers;

use App\Models\Dogadjaj;
use DateTime;

use Spatie\IcalendarGenerator\Components\Calendar;
use Spatie\IcalendarGenerator\Components\Event;

class IcsExportController extends Controller
{
    public function export(){
        
        $dogadjaji = Dogadjaj::all();

        // Kreiranje kalendara
        $calendar = Calendar::create('My Events');

        // Iteriranje kroz sve događaje i dodavanje u kalendar
        foreach ($dogadjaji as $dogadjaj) {
            $event = Event::create()
                ->name($dogadjaj->naziv)
                ->description($dogadjaj->opis)
                ->startsAt(DateTime::createFromFormat('Y-m-d H:i:s', $dogadjaj->datum));

            $calendar->event($event);
        }

        
        return response($calendar->get())
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET')
            ->header('Access-Control-Allow-Headers', 'Content-Type')
            ->header('Content-Type', 'text/calendar')
            ->header('Content-Disposition', 'attachment; filename="dogadjaji.ics"');
    }
}
